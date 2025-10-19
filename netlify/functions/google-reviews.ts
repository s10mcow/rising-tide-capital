/**
 * Serverless function to fetch Google Reviews
 * This keeps your API key secure on the backend
 *
 * Uses Netlify Functions 2.0 format (returns Response object)
 */

interface GooglePlaceDetailsResponse {
  result: {
    reviews: Array<{
      author_name: string;
      author_url: string;
      profile_photo_url: string;
      rating: number;
      text: string;
      time: number;
      relative_time_description: string;
    }>;
    rating: number;
    user_ratings_total: number;
  };
  status: string;
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
            GOOGLE_PLACES_API_KEY: GOOGLE_API_KEY,
            GOOGLE_PLACE_ID: GOOGLE_PLACE_ID,
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

    // Fetch reviews from Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data: GooglePlaceDetailsResponse = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Google API returned status: ${data.status}`);
    }

    // Return reviews
    return new Response(
      JSON.stringify({
        reviews: data.result.reviews || [],
        rating: data.result.rating,
        totalReviews: data.result.user_ratings_total,
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
