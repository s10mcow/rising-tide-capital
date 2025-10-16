import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const WidgetContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  backgroundColor: theme.palette.background.default,
}));

interface GoogleReviewsWidgetProps {
  placeId: string; // Your Google Business Place ID
}

function GoogleReviewsWidget({ placeId }: GoogleReviewsWidgetProps) {
  return (
    <WidgetContainer>
      <Container>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Google Reviews
        </Typography>

        {/* Elfsight Google Reviews Widget - Simple embed option */}
        {/* Instructions: Go to https://elfsight.com/google-reviews-widget/ */}
        {/* Or use native Google reviews embed below */}

        {/* Native Google Reviews - Simple iframe */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
            "& iframe": {
              width: "100%",
              border: "none",
              minHeight: "400px",
            },
          }}
        >
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=place_id:${placeId}&zoom=15`}
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Reviews"
          />
        </Box>

        {/* Alternative: Link to Google Reviews */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            <a
              href={`https://search.google.com/local/writereview?placeid=${placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Leave us a review on Google →
            </a>
          </Typography>
        </Box>
      </Container>
    </WidgetContainer>
  );
}

export default GoogleReviewsWidget;
