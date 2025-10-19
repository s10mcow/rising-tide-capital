import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { SectionContainer } from "./styles";

function TestimonialsSection() {
  return (
    <SectionContainer aria-labelledby="testimonials-heading" sx={{ py: 8 }}>
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
          <Grid item xs={12} sx={{ textAlign: "center", mt: -4 }}>
            <Button
              variant="contained"
              size="large"
              href="https://www.google.com/search?sca_esv=a45e90ee3e925b06&sxsrf=AE3TifPptqjEDTCFjxeMp45uPvJoGNOztA:1760904820417&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E7M_pqXec7TPQYykjt-X6xXpRhwCr3x8gvlkJ9syG_qNS3yuGB1AKAhRS2dhRm_OmUEwkWz7LW-TDlJF0WEBD9Tb8d77ygrncK48eWAin8tp7uxIJ8wmI1mQWA89m19C54Vb-VM%3D&q=Rising+Tide+Capital+Partners+LLC+Reviews&sa=X&ved=2ahUKEwiZrrfSibGQAxW8MtAFHZ0iDaIQ0bkNegQIQhAD&cshid=1760904828161162&biw=2514&bih=1178&dpr=1"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                boxShadow: "0 8px 24px rgba(25, 118, 210, 0.4)",
                borderRadius: 2,
                textTransform: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)",
                  boxShadow: "0 12px 32px rgba(25, 118, 210, 0.6)",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "translateY(0px)",
                },
              }}
            >
              View Our Google Reviews ⭐⭐⭐⭐⭐
            </Button>
          </Grid>
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
