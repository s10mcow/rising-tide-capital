import { FormatQuote, Star } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SectionContainer } from "./styles";

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

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michael Rodriguez",
      role: "Land Owner",
      location: "Texas",
      rating: 5,
      text: "Rising Tide Capital Partners made selling our vacant land incredibly smooth. They provided a fair offer and handled all the paperwork. The whole process took just 35 days from start to finish. Couldn't be happier!",
      initials: "MR",
    },
    {
      name: "Sarah Chen",
      role: "Property Owner",
      location: "Colorado",
      rating: 5,
      text: "I inherited 20 acres that I didn't know what to do with. Rising Tide Capital Partners gave me a no-obligation offer that was fair and reasonable. They were professional throughout and made the sale stress-free.",
      initials: "SC",
    },
    {
      name: "David Thompson",
      role: "Land Seller",
      location: "Arizona",
      rating: 5,
      text: "After years of paying taxes on land I wasn't using, Rising Tide Capital Partners offered a quick solution. They understood the local market and provided an offer that made sense. Great experience overall.",
      initials: "DT",
    },
    {
      name: "Lisa Martinez",
      role: "Land Owner",
      location: "Nevada",
      rating: 5,
      text: "I was skeptical about selling to a land buyer, but Rising Tide Capital Partners exceeded my expectations. They were transparent about their process and closed exactly when they said they would - 42 days.",
      initials: "LM",
    },
    {
      name: "Robert Johnson",
      role: "Property Seller",
      location: "New Mexico",
      rating: 5,
      text: "Rising Tide Capital Partners' straightforward approach impressed me. No hidden fees, no surprises, just a fair offer and professional service. They made selling my land simple and hassle-free.",
      initials: "RJ",
    },
    {
      name: "Amanda Foster",
      role: "First-time Land Seller",
      location: "Utah",
      rating: 5,
      text: "As someone who had never sold land before, I appreciated how Rising Tide Capital Partners explained everything clearly. They answered all my questions and made the entire process easy to understand.",
      initials: "AF",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        style={{ color: index < rating ? "#FFD700" : "#E0E0E0" }}
      />
    ));
  };

  return (
    <SectionContainer
      component="section"
      aria-labelledby="testimonials-heading"
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
                id="testimonials-heading"
                sx={{
                  mb: 2,
                  fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                  lineHeight: 1.2,
                  px: { xs: 1, sm: 2 },
                }}
              >
                What Our Clients Say
              </Typography>
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
                Don't just take our word for it. Here's what land owners across
                the USA have to say about selling their land to Rising Tide
                Capital Partners.
              </Typography>
            </Box>
          </Grid>

          {testimonials.map((testimonial, index) => (
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
                  <StarRating>{renderStars(testimonial.rating)}</StarRating>

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
                    "{testimonial.text}"
                  </Typography>

                  <Box sx={{ textAlign: "center", mt: "auto" }}>
                    <ClientAvatar
                      sx={{
                        width: { xs: 40, sm: 60 },
                        height: { xs: 40, sm: 60 },
                        fontSize: { xs: "1rem", sm: "1.5rem" },
                      }}
                    >
                      {testimonial.initials}
                    </ClientAvatar>
                    <Typography
                      component="h4"
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 0.5,
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      {testimonial.role}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      color="primary.main"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      {testimonial.location}
                    </Typography>
                  </Box>
                </CardContent>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>

        {/* Trust Indicators */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography component="h3" variant="h4" gutterBottom sx={{ mb: 4 }}>
            Trusted by Land Owners Across the USA
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} sm={3}>
              <Typography
                variant="h3"
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                100+
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Properties Bought & Sold
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography
                variant="h3"
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                8+
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Years Experience
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography
                variant="h3"
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                30-45
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Day Average Closing
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography
                variant="h3"
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                100%
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Satisfied Sellers
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </SectionContainer>
  );
}

export default TestimonialsSection;
