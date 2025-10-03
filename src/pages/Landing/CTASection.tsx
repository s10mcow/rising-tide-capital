import ContactModal from "@/components/ContactModal";
import { Assessment, Phone } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { SectionContainer } from "./styles";

const CTACard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: "white",
  "& .MuiTypography-root": {
    color: "white",
  },
}));

const LeadMagnetCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  textAlign: "center",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  "& svg": {
    fontSize: "3rem",
    color: theme.palette.primary.main,
  },
}));

const ContactForm = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

function CTASection() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        // eslint-disable-next-line
        console.log("Form successfully submitted");
        alert("Thank you! We'll get back to you within 24 hours.");
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error("Form submission error:", error);
        alert(
          "There was an error submitting your form. Please try again or call us directly.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const leadMagnets = [
    {
      title: "Free Property Evaluation",
      description:
        "Get a professional assessment of your property's investment potential and current market value.",
      icon: <Assessment />,
      buttonText: "Get Free Evaluation",
      action: () => setContactModalOpen(true),
    },
    {
      title: "Land Consultation Call",
      description:
        "Schedule a free 30-minute consultation to discuss your land and get expert advice on your options.",
      icon: <Phone />,
      buttonText: "Schedule Call",
      action: () => setContactModalOpen(true),
    },
  ];

  return (
    <>
      <ContactModal
        isOpen={contactModalOpen}
        handleClose={() => setContactModalOpen(false)}
      />

      <SectionContainer
        component="section"
        aria-labelledby="cta-heading"
        sx={{ py: 8 }}
      >
        <Container>
          {/* Main CTA */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12}>
              <CTACard>
                <Typography
                  component="h2"
                  variant="h2"
                  gutterBottom
                  id="cta-heading"
                  sx={{
                    mb: 3,
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    lineHeight: 1.2,
                    wordBreak: "break-word",
                    px: { xs: 1, sm: 2 },
                  }}
                >
                  Ready to Explore Real Estate Opportunities?
                </Typography>
                <Typography
                  component="p"
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                    lineHeight: 1.4,
                    wordBreak: "break-word",
                    px: { xs: 1, sm: 2 },
                  }}
                >
                  Whether you're looking to sell property or explore investment
                  opportunities, Rising Tide Capital Partners is here to help
                  you achieve your real estate goals.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    px: { xs: 1, sm: 2 },
                  }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => setContactModalOpen(true)}
                    sx={{
                      minWidth: { xs: "100%", sm: "200px" },
                      maxWidth: { xs: "280px", sm: "none" },
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                    }}
                  >
                    Get Started Today
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    sx={{
                      minWidth: { xs: "100%", sm: "200px" },
                      maxWidth: { xs: "280px", sm: "none" },
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                      borderColor: "white",
                      color: "white",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                    href="tel:+19043256275"
                  >
                    Call (904) 325-6275
                  </Button>
                </Box>
              </CTACard>
            </Grid>
          </Grid>

          {/* Lead Magnets */}
          <Grid container spacing={4} sx={{ mb: 8 }} justifyContent="center">
            <Grid item xs={12}>
              <Typography
                component="h3"
                variant="h3"
                align="center"
                gutterBottom
                sx={{ mb: 4 }}
              >
                Free Resources & Services
              </Typography>
            </Grid>

            {leadMagnets.map((magnet, index) => (
              <Grid item xs={12} md={4} key={index}>
                <LeadMagnetCard>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <IconWrapper>{magnet.icon}</IconWrapper>
                    <Typography
                      component="h4"
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: "bold", mb: 2 }}
                    >
                      {magnet.title}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body1"
                      color="text.secondary"
                      sx={{ flexGrow: 1, mb: 3 }}
                    >
                      {magnet.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={magnet.action}
                      sx={{ mt: "auto" }}
                    >
                      {magnet.buttonText}
                    </Button>
                  </CardContent>
                </LeadMagnetCard>
              </Grid>
            ))}
          </Grid>

          {/* Contact Form */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} sx={{ mx: "auto" }}>
              <ContactForm>
                <Typography
                  component="h3"
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{
                    mb: 3,
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    lineHeight: 1.2,
                    px: { xs: 1, sm: 2 },
                  }}
                >
                  Tell Us About Your Property
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  sx={{
                    mb: 4,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    lineHeight: 1.4,
                    px: { xs: 1, sm: 2 },
                  }}
                >
                  Fill out the form below and we'll get back to you within 24
                  hours with information about how Rising Tide Capital Partners
                  can help with your real estate needs.
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  name="property-inquiry"
                  method="POST"
                >
                  <input
                    type="hidden"
                    name="form-name"
                    value="property-inquiry"
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        type="text"
                        variant="outlined"
                        required
                        size="small"
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            padding: { xs: "12px 14px", sm: "16px 14px" },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        variant="outlined"
                        required
                        size="small"
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            padding: { xs: "12px 14px", sm: "16px 14px" },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        variant="outlined"
                        required
                        size="small"
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            padding: { xs: "12px 14px", sm: "16px 14px" },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Property County"
                        name="propertyCounty"
                        type="text"
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            padding: { xs: "12px 14px", sm: "16px 14px" },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Property Address or APN"
                        name="propertyAddress"
                        type="text"
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            padding: { xs: "12px 14px", sm: "16px 14px" },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Notes or letter offer code"
                        name="message"
                        type="text"
                        multiline
                        rows={3}
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            padding: { xs: "12px 14px", sm: "16px 14px" },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ textAlign: "center" }}>
                        <Button
                          type="submit"
                          size="large"
                          variant="contained"
                          color="primary"
                          disabled={loading}
                          sx={{
                            minWidth: { xs: "100%", sm: "200px" },
                            maxWidth: { xs: "280px", sm: "none" },
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            py: { xs: 1, sm: 1.5 },
                          }}
                        >
                          {loading ? "Sending..." : "Send Message"}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </ContactForm>
            </Grid>
          </Grid>
        </Container>
      </SectionContainer>
    </>
  );
}

export default CTASection;
