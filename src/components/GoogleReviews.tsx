import { FormatQuote, Star } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { SectionContainer } from "../pages/Landing/styles";

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const QuoteIcon = styled(FormatQuote)(({ theme }) => ({
  fontSize: "2rem",
  color: theme.palette.primary.main,
  opacity: 0.3,
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    fontSize: "3rem",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const StarRating = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    marginBottom: theme.spacing(2),
  },
  "& svg": {
    color: "#FFD700",
    fontSize: "1.2rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.5rem",
    },
  },
}));

const ClientAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  margin: "0 auto",
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  fontSize: "1.5rem",
  fontWeight: "bold",
}));

const GoogleLogo = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  marginTop: "16px",
  "& img": {
    height: "20px",
  },
});

interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

interface GoogleReviewsProps {
  placeId: string; // Your Google Business Place ID
  apiEndpoint?: string; // Optional: Backend API endpoint
  maxReviews?: number;
}

function GoogleReviews({
  placeId,
  apiEndpoint,
  maxReviews = 6,
}: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number | null>(null);

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      if (!apiEndpoint) {
        // eslint-disable-next-line no-console
        console.log("No API endpoint provided. Skipping reviews fetch.");
        return;
      }

      setLoading(true);
      try {
        // Fetch from your backend API (keeps API key secure)
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();

        if (data.reviews) {
          setReviews(data.reviews);
          setAverageRating(data.rating);
          setTotalReviews(data.totalReviews);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error fetching Google reviews:", err);
        setError("Unable to load reviews. Please check back later.");
      } finally {
        setLoading(false);
      }
    };

    //maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ5wSN9-0beYgR9Dc3OjBZNXA&fields=reviews,rating,user_ratings_total&key=AIzaSyAzJ7F84wyb7nEZCQqW_uDyxTyHfYH-rqI

    fetchGoogleReviews();
  }, [apiEndpoint]);

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        style={{ color: index < rating ? "#FFD700" : "#E0E0E0" }}
      />
    ));
  };

  const formatTimeAgo = (timestamp: number): string => {
    const seconds = Math.floor(Date.now() / 1000 - timestamp);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [name, secondsInInterval] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInInterval);
      if (interval >= 1) {
        return interval === 1
          ? `${interval} ${name} ago`
          : `${interval} ${name}s ago`;
      }
    }
    return "just now";
  };

  const displayReviews = reviews.slice(0, maxReviews);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <SectionContainer
      component="section"
      aria-labelledby="google-reviews-heading"
      sx={{ py: 8 }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 6 } }}>
              <Typography
                component="h2"
                variant="h2"
                gutterBottom
                id="google-reviews-heading"
                sx={{
                  mb: 2,
                  fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                  lineHeight: 1.2,
                  px: { xs: 1, sm: 2 },
                }}
              >
                Google Reviews
              </Typography>

              {averageRating && totalReviews && (
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    {renderStars(Math.round(averageRating))}
                  </Box>
                  <Typography variant="h6" color="text.secondary">
                    {averageRating.toFixed(1)} out of 5 stars
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Based on {totalReviews} reviews
                  </Typography>
                </Box>
              )}

              <Typography
                component="p"
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: "800px",
                  mx: "auto",
                  fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.25rem" },
                  lineHeight: 1.4,
                  px: { xs: 1, sm: 2 },
                }}
              >
                See what our clients are saying about us on Google
              </Typography>
            </Box>
          </Grid>

          {displayReviews.length > 0 ? (
            displayReviews.map((review, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <TestimonialCard>
                  <QuoteIcon />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      pt: { xs: 2, sm: 4 },
                    }}
                  >
                    <StarRating>{renderStars(review.rating)}</StarRating>

                    <Typography
                      component="p"
                      variant="body1"
                      sx={{
                        flexGrow: 1,
                        fontStyle: "italic",
                        mb: { xs: 2, sm: 3 },
                        lineHeight: 1.5,
                        fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                      }}
                    >
                      "
                      {review.text.length > 200
                        ? `${review.text.substring(0, 200)}...`
                        : review.text}
                      "
                    </Typography>

                    <Box sx={{ textAlign: "center", mt: "auto" }}>
                      {review.profile_photo_url ? (
                        <ClientAvatar
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          sx={{
                            width: { xs: 40, sm: 60 },
                            height: { xs: 40, sm: 60 },
                          }}
                        />
                      ) : (
                        <ClientAvatar
                          sx={{
                            width: { xs: 40, sm: 60 },
                            height: { xs: 40, sm: 60 },
                            fontSize: { xs: "1rem", sm: "1.5rem" },
                          }}
                        >
                          {getInitials(review.author_name)}
                        </ClientAvatar>
                      )}
                      <Typography
                        component="h4"
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          mb: 0.5,
                          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                        }}
                      >
                        {review.author_name}
                      </Typography>
                      <Typography
                        component="p"
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        {review.relative_time_description ||
                          formatTimeAgo(review.time)}
                      </Typography>
                    </Box>
                  </CardContent>
                </TestimonialCard>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No reviews available. Please check back later.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Google Reviews Badge */}
        <GoogleLogo>
          <Typography variant="body2" color="text.secondary">
            Powered by
          </Typography>
          <svg
            width="80"
            height="26"
            viewBox="0 0 80 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.5 13.2c0 3.9-3 6.8-6.7 6.8-3.7 0-6.7-2.9-6.7-6.8s3-6.8 6.7-6.8c3.7 0 6.7 2.9 6.7 6.8zm-2.9 0c0-2.4-1.7-4-3.8-4s-3.8 1.6-3.8 4 1.7 4 3.8 4 3.8-1.6 3.8-4z"
              fill="#EA4335"
            />
            <path
              d="M48.4 13.2c0 3.9-3 6.8-6.7 6.8-3.7 0-6.7-2.9-6.7-6.8s3-6.8 6.7-6.8c3.7 0 6.7 2.9 6.7 6.8zm-2.9 0c0-2.4-1.7-4-3.8-4s-3.8 1.6-3.8 4 1.7 4 3.8 4 3.8-1.6 3.8-4z"
              fill="#FBBC05"
            />
            <path
              d="M60.9 6.8v12.3c0 5.1-3 7.1-6.5 7.1-3.3 0-5.3-2.2-6-4l2.5-1c.4 1 1.5 2.1 3.5 2.1 2.3 0 3.7-1.4 3.7-4.1v-1h-.1c-.7.8-2 1.5-3.6 1.5-3.4 0-6.5-3-6.5-6.8s3.1-6.8 6.5-6.8c1.6 0 2.9.7 3.6 1.5h.1V7h2.8zm-2.6 6.4c0-2.4-1.6-4.1-3.6-4.1s-3.8 1.7-3.8 4.1 1.8 4 3.8 4 3.6-1.6 3.6-4z"
              fill="#4285F4"
            />
            <path d="M65.9 1v19h-2.9V1h2.9z" fill="#34A853" />
            <path
              d="M77.8 15.5l2.3 1.5c-.7 1.1-2.5 3-5.5 3-3.8 0-6.6-2.9-6.6-6.8 0-4 2.8-6.8 6.3-6.8 3.5 0 5.2 2.8 5.8 4.3l.3.8-9 3.7c.7 1.4 1.8 2.1 3.3 2.1 1.5 0 2.6-.8 3.4-2.1zm-7.1-2.4l6-2.5c-.3-.8-1.3-1.4-2.5-1.4-1.5 0-3.6 1.3-3.5 3.9z"
              fill="#EA4335"
            />
            <path
              d="M11.3 11v2.9h7.4c-.2 1.6-.8 2.8-1.6 3.6-.9.9-2.4 2-5.8 2-4.6 0-8.2-3.7-8.2-8.3s3.6-8.3 8.2-8.3c2.5 0 4.3 1 5.6 2.2l2-2c-1.7-1.6-4-2.9-7.6-2.9C5.2 0 .5 4.6.5 10.2s4.7 10.2 10.8 10.2c3.2 0 5.6-1 7.4-3 1.9-1.9 2.5-4.5 2.5-6.7 0-.7 0-1.3-.1-1.8H11.3z"
              fill="#4285F4"
            />
          </svg>
        </GoogleLogo>

        {/* Link to leave review */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography
            component="a"
            href={`https://search.google.com/local/writereview?placeid=${placeId}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              fontWeight: "bold",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Leave us a review on Google →
          </Typography>
        </Box>
      </Container>
    </SectionContainer>
  );
}

export default GoogleReviews;
