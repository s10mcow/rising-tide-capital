/**
 * Serverless function to fetch Google Reviews
 * This keeps your API key secure on the backend
 *
 * Uses Netlify Functions 2.0 format (returns Response object)
 */

// Google Places API v1 Response Interface
interface GooglePlaceV1Response {
  reviews?: Array<{
    name: string;
    relativePublishTimeDescription: string;
    rating: number;
    text: {
      text: string;
      languageCode: string;
    };
    originalText: {
      text: string;
      languageCode: string;
    };
    authorAttribution: {
      displayName: string;
      uri: string;
      photoUri: string;
    };
    publishTime: string;
  }>;
  rating?: number;
  userRatingCount?: number;
}

export default async (request: Request) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  // Handle OPTIONS request for CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;

    if (!GOOGLE_API_KEY || !GOOGLE_PLACE_ID) {
      return new Response(
        JSON.stringify({
          error: "Configuration error",
          message:
            "Missing required environment variables. Please set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in Netlify.",
          missingVars: {
            GOOGLE_PLACES_API_KEY: !GOOGLE_API_KEY,
            GOOGLE_PLACE_ID: !GOOGLE_PLACE_ID,
          },
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }
    // Fetch reviews from Google Places API v1
    // Fields: reviews, rating, userRatingCount
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}?fields=reviews,rating,userRatingCount&key=${GOOGLE_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google API error: ${response.status} - ${errorText}`);
    }

    const data: GooglePlaceV1Response = await response.json();

    // Transform v1 API response to match our component's expected format
    const transformedReviews = (data.reviews || []).map((review) => ({
      author_name: review.authorAttribution.displayName,
      author_url: review.authorAttribution.uri,
      profile_photo_url: review.authorAttribution.photoUri,
      rating: review.rating,
      text: review.text.text || review.originalText.text,
      time: new Date(review.publishTime).getTime() / 1000, // Convert to Unix timestamp
      relative_time_description: review.relativePublishTimeDescription,
    }));

    // Return reviews in the format our component expects
    return new Response(
      JSON.stringify({
        reviews: transformedReviews,
        rating: data.rating || 0,
        totalReviews: data.userRatingCount || 0,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        },
      },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching Google reviews:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch reviews",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
};
