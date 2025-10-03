import {
  Assessment,
  CheckCircle,
  Construction,
  Handshake,
  Search,
  TrendingUp,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SectionContainer } from "./styles";

const ProcessCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  textAlign: "center",
  position: "relative",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const StepNumber = styled(Box)(({ theme }) => ({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2rem",
  fontWeight: "bold",
  margin: "0 auto 12px auto",
  [theme.breakpoints.up("sm")]: {
    width: "60px",
    height: "60px",
    fontSize: "1.5rem",
    margin: "0 auto 16px auto",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    marginBottom: theme.spacing(2),
  },
  "& svg": {
    fontSize: "2rem",
    color: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5rem",
    },
  },
}));

function ProcessSection() {
  const steps = [
    {
      title: "Tell Us About Your Land",
      description:
        "Contact us with basic information about your property. We'll respond promptly to discuss your situation.",
      icon: <Search />,
    },
    {
      title: "We Assess Your Property",
      description:
        "Our team researches your land's value using current market data, comparable sales, and local expertise.",
      icon: <Assessment />,
    },
    {
      title: "Receive Your Offer",
      description:
        "We'll send you a fair, no-obligation offer based on your land's true value. Take your time to consider it.",
      icon: <TrendingUp />,
    },
    {
      title: "Simple Agreement",
      description:
        "If you accept, we'll send a straightforward purchase agreement. We handle all the complex paperwork for you.",
      icon: <Handshake />,
    },
    {
      title: "Professional Title Work",
      description:
        "We work with trusted title companies to handle all legal requirements and ensure a smooth, secure transaction.",
      icon: <Construction />,
    },
    {
      title: "Close Safely & Securely",
      description:
        "Complete the sale with confidence. We cover all closing costs and ensure you receive your funds safely.",
      icon: <CheckCircle />,
    },
  ];

  return (
    <SectionContainer
      component="section"
      aria-labelledby="process-heading"
      sx={{ py: 8, backgroundColor: "grey.50" }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 6 } }}>
              <Typography
                component="h2"
                variant="h2"
                gutterBottom
                id="process-heading"
                sx={{
                  mb: 2,
                  fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                  lineHeight: 1.2,
                  px: { xs: 1, sm: 2 },
                }}
              >
                How We Buy Your Land
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
                Our process is clear, transparent, and designed to make selling
                your land as simple and stress-free as possible.
              </Typography>
            </Box>
          </Grid>

          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProcessCard>
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <StepNumber>{index + 1}</StepNumber>
                  <IconWrapper>{step.icon}</IconWrapper>
                  <Typography
                    component="h3"
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      mb: { xs: 1, sm: 2 },
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    component="p"
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      flexGrow: 1,
                      fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                      lineHeight: 1.5,
                    }}
                  >
                    {step.description}
                  </Typography>
                </CardContent>
              </ProcessCard>
            </Grid>
          ))}
        </Grid>

        {/* Timeline View for Desktop */}
        <Box
          sx={{
            mt: { xs: 4, sm: 6, md: 8 },
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography
            component="h3"
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              mb: 4,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              lineHeight: 1.2,
              px: { xs: 1, sm: 2 },
            }}
          >
            Typical Timeline: 30-45 Days
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ maxWidth: "800px", width: "100%" }}>
              <Stepper alternativeLabel>
                {steps.map((step, index) => (
                  <Step key={index} completed>
                    <StepLabel>{step.title}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
        </Box>
      </Container>
    </SectionContainer>
  );
}

export default ProcessSection;
