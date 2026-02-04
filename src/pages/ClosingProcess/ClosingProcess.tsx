import Layout from "@/components/Layout";
import hero from "@assets/images/ocean.jpg";
import heroWebp from "@assets/images/ocean.webp";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import EventIcon from "@mui/icons-material/Event";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Box,
  Container,
  Divider,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const HeroSection = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "40vh",
  backgroundImage: `url(${heroWebp}), url(${hero})`,
  backgroundColor: "#2c3e50",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  color: "white",
  textAlign: "center",
  padding: theme.spacing(10, 2),
  "&::before": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: "rgba(0,0,0,0.4)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(6, 2),
    backgroundAttachment: "scroll",
    minHeight: "35vh",
  },
}));

const TimelineContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: "4px",
    height: "100%",
    background: "linear-gradient(to bottom, #3D6C45, #8CE21E)",
    borderRadius: "2px",
    [theme.breakpoints.down("md")]: {
      left: "20px",
    },
  },
}));

const TimelineItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isLeft" && prop !== "isLast",
})<{ isLeft?: boolean; isLast?: boolean }>(({ theme, isLeft, isLast }) => ({
  display: "flex",
  justifyContent: isLeft ? "flex-start" : "flex-end",
  paddingBottom: isLast ? 0 : theme.spacing(4),
  position: "relative",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    justifyContent: "flex-start",
    paddingLeft: "60px",
  },
}));

const TimelineContent = styled(Paper)(({ theme }) => ({
  width: "45%",
  padding: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const TimelineDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isLast",
})<{ isLast?: boolean }>(({ theme, isLast }) => ({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  background: "white",
  border: "4px solid #3D6C45",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#3D6C45",
  zIndex: 1,
  ...(isLast && {
    top: "auto",
    bottom: 0,
  }),
  [theme.breakpoints.down("md")]: {
    left: "20px",
    width: "40px",
    height: "40px",
  },
}));

const LinkCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  textAlign: "center",
  flex: "1 1 300px",
  maxWidth: "320px",
  width: "100%",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  },
}));

const steps = [
  {
    icon: <DescriptionIcon />,
    title: "Contract Signed",
    description:
      "The executed contract is submitted to the title company to begin the process.",
    step: 1,
  },
  {
    icon: <SearchIcon />,
    title: "Title Search & Due Diligence",
    description:
      "Title search (7–10 business days) and builder due diligence (up to 30 days).",
    step: 2,
  },
  {
    icon: <VerifiedUserIcon />,
    title: "Identity Verification",
    description: "Completed via ClosingLock or later with a notary.",
    step: 3,
  },
  {
    icon: <LocalShippingIcon />,
    title: "Documents Sent",
    description: "Closing documents are FedExed directly to you.",
    step: 4,
  },
  {
    icon: <HistoryEduIcon />,
    title: "Notarization",
    description:
      "Mobile notary or a notary of your choice if identity was verified earlier.",
    step: 5,
  },
  {
    icon: <AssignmentReturnIcon />,
    title: "Return Documents",
    description: "Documents returned to Steel City Title.",
    step: 6,
  },
  {
    icon: <EventIcon />,
    title: "Closing",
    description: "Closing takes place on the following Monday.",
    step: 7,
  },
  {
    icon: <AttachMoneyIcon />,
    title: "Proceeds Delivered",
    description: "Proceeds are overnighted to you via FedEx.",
    step: 8,
  },
];

const helpfulLinks = [
  {
    title: "Identity Verification",
    url: "https://closinglock.com",
    description: "Secure identity verification platform",
  },
  {
    title: "Title Company",
    url: "https://steelcitytitle.com",
    description: "Steel City Title - Our trusted partner",
  },
];

function ClosingProcess() {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            What to Expect from the Closing Process
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.1rem" },
            }}
          >
            Most closings take place on or before 45 days. Depending on contract
            terms, some may extend to 60 days. The process will move forward as
            quickly as possible.
          </Typography>
        </Container>
      </HeroSection>

      {/* Timeline Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Closing Timeline
        </Typography>

        <TimelineContainer>
          {steps.map((step, index) => (
            <TimelineItem
              key={step.step}
              isLeft={index % 2 === 0}
              isLast={index === steps.length - 1}
            >
              <TimelineDot isLast={index === steps.length - 1}>
                {step.icon}
              </TimelineDot>
              <TimelineContent elevation={0}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: "#3D6C45",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      mr: 1.5,
                    }}
                  >
                    {step.step}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 600 }}
                  >
                    {step.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ pl: 5 }}
                >
                  {step.description}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Container>

      {/* Helpful Links Section */}
      <Box sx={{ bgcolor: "grey.100", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{ mb: 6, fontWeight: 600 }}
          >
            Helpful Links
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: { xs: "center", sm: "stretch" },
              gap: 3,
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            {helpfulLinks.map((link) => (
              <LinkCard key={link.title} elevation={0}>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  {link.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {link.description}
                </Typography>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#3D6C45",
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Visit Website →
                </Link>
              </LinkCard>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container
        maxWidth="md"
        sx={{ py: { xs: 6, md: 10 }, textAlign: "center" }}
      >
        <Divider sx={{ mb: 6 }} />
        <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          Questions About Your Closing?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Our team is here to help guide you through every step of the process.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            href="tel:+19043256275"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "#3D6C45",
              fontWeight: 600,
              fontSize: "1.1rem",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            📞 (904) 325-6275
          </Link>
          <Link
            href="mailto:hello@risingtidecapital.us"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "#3D6C45",
              fontWeight: 600,
              fontSize: "1.1rem",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            📧 hello@risingtidecapital.us
          </Link>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4, fontStyle: "italic" }}
        >
          Rising Tide Capital Partners LLC
        </Typography>
      </Container>
    </Layout>
  );
}

export default ClosingProcess;
