/**
 * Serverless function to fetch Google Reviews
 * This keeps your API key secure on the backend
 *
 * Deploy this as a serverless function (AWS Lambda, Vercel, Netlify, etc.)
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handler(event: any) {
  // Handle CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;

    if (!GOOGLE_API_KEY || !GOOGLE_PLACE_ID) {
      throw new Error("Missing required environment variables");
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
    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
      body: JSON.stringify({
        reviews: data.result.reviews || [],
        rating: data.result.rating,
        totalReviews: data.result.user_ratings_total,
      }),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching Google reviews:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to fetch reviews",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
}

// For Netlify Functions, export as default
export default handler;
