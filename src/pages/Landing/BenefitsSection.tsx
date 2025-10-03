import {
  Assessment,
  HandshakeOutlined,
  LocationOn,
  Security,
  Speed,
  TrendingUp,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SectionContainer } from "./styles";

const BenefitCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  textAlign: "center",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
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
    fontSize: "2.5rem",
    color: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
      fontSize: "3rem",
    },
  },
}));

function BenefitsSection() {
  const benefits = [
    {
      title: "No Fees or Commissions",
      description:
        "Working with us costs you nothing. We don't charge any fees or commissions - you keep what we offer.",
      icon: <TrendingUp />,
    },
    {
      title: "Professional Service",
      description:
        "We handle all the paperwork and coordinate with the title company so you only need to sign when ready.",
      icon: <HandshakeOutlined />,
    },
    {
      title: "Sell Land As-Is",
      description:
        "No need for repairs, cleanup, or improvements. We buy your land in its current condition.",
      icon: <Assessment />,
    },
    {
      title: "Stop Worrying About Taxes",
      description:
        "You can say goodbye to property taxes, insurance, and other ongoing land expenses.",
      icon: <Security />,
    },
    {
      title: "Nationwide Experience",
      description:
        "We understand land values across the USA and work with trusted title companies nationwide for smooth closings.",
      icon: <LocationOn />,
    },
    {
      title: "Reliable & Trustworthy",
      description:
        "We always close when we make an offer. Our process is transparent and designed for your peace of mind.",
      icon: <Speed />,
    },
  ];

  return (
    <SectionContainer
      component="section"
      aria-labelledby="benefits-heading"
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
                id="benefits-heading"
                sx={{
                  mb: 2,
                  fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                  lineHeight: 1.2,
                  px: { xs: 1, sm: 2 },
                }}
              >
                Why Sell Your Land to Rising Tide Capital Partners
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
                Working with us allows you to sell your land without having to
                put in any time or effort in a worry-free manner. Here's what
                you can expect when you work with Rising Tide Capital Partners.
              </Typography>
            </Box>
          </Grid>

          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BenefitCard>
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <IconWrapper>{benefit.icon}</IconWrapper>
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
                    {benefit.title}
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
                    {benefit.description}
                  </Typography>
                </CardContent>
              </BenefitCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionContainer>
  );
}

export default BenefitsSection;
