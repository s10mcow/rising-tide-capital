import ContactModal from "@/components/ContactModal";
import hero from "@assets/images/ocean.jpg";
import heroWebp from "@assets/images/ocean.webp";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

export const ImageWrapper = styled(Box)({
  width: "100%",
  height: "80vh",
  // Use WebP with fallback to JPEG
  backgroundImage: `url(${heroWebp}), url(${hero})`,
  backgroundColor: "#2c3e50", // Better fallback color
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  // Optimize for LCP - ensure image loads quickly
  willChange: "transform",
  "&:before": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: "rgba(0,0,0,0.3)",
    // Optimize overlay rendering
    willChange: "opacity",
  },
  // Performance optimization for mobile
  "@media (max-width: 768px)": {
    backgroundAttachment: "scroll",
    // Reduce height on mobile for better performance
    height: "70vh",
  },
  // Preload hint for better performance
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${heroWebp})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0,
    pointerEvents: "none",
    zIndex: -1,
  },
});
function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={open} handleClose={() => setOpen(false)} />
      <ImageWrapper component="section" role="banner" aria-label="Hero section">
        <Box sx={{ zIndex: 1, width: "100%", px: { xs: 2, sm: 4, md: 6 } }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            paragraph
            sx={{
              color: "white",
              px: { xs: 1, sm: 2 },
              fontSize: {
                xs: "2.5rem",
                sm: "2.8rem",
                md: "3.5rem",
              },
              mb: 3,
              fontWeight: "bold",
              fontFamily: "SF Pro Text",
              lineHeight: 1.1,
              wordBreak: "break-word",
              textTransform: "uppercase",
            }}
          >
            Rising Tide Capital Partners
          </Typography>

          <Typography
            component="p"
            variant="h6"
            align="center"
            paragraph
            sx={{
              color: "white",
              px: { xs: 1, sm: 2 },
              fontSize: {
                xs: "1rem",
                sm: "1.3rem",
                md: "1.5rem",
              },
              mb: 4,
              lineHeight: 1.4,
              wordBreak: "break-word",
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            A FLORIDA-BASED GLOBAL REAL ESTATE DEVELOPMENT AND CAPITAL
            INVESTMENT FIRM ENGAGED IN ACQUISITIONS, DEVELOPMENT AND
            REPOSITIONING OF LAND, RESIDENTIAL, AND COMMERCIAL PROPERTIES.
          </Typography>

          <Typography
            component="p"
            variant="h6"
            align="center"
            sx={{
              color: "white",
              px: { xs: 1, sm: 2 },
              fontSize: {
                xs: "0.8rem",
                sm: "1rem",
                md: "1.3rem",
              },
              mb: 4,
              fontWeight: "medium",
              lineHeight: 1.4,
              wordBreak: "break-word",
            }}
          >
            ✓ Multi-Family Development ✓ Land Acquisition ✓ Commercial
            Properties ✓ Investment Opportunities
          </Typography>

          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              px: { xs: 1, sm: 0 },
            }}
          >
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
              aria-label="Contact Rising Tide Capital Partners"
              sx={{
                minWidth: { xs: "100%", sm: "200px" },
                maxWidth: { xs: "250px", sm: "none" },
                fontSize: { xs: "0.9rem", sm: "1.1rem" },
                py: 1.5,
                px: 3,
              }}
            >
              Contact Us
            </Button>
            <Button
              size="large"
              variant="outlined"
              href="tel:+19043256275"
              sx={{
                minWidth: { xs: "100%", sm: "200px" },
                maxWidth: { xs: "250px", sm: "none" },
                fontSize: { xs: "0.8rem", sm: "1.1rem" },
                py: 1.5,
                px: 3,
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Call (904) 325-6275
            </Button>
          </Box>
        </Box>
      </ImageWrapper>
    </>
  );
}

export default HeroSection;
