import Header from "@/components/Header";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Footer = () => {
  return (
    <Box
      component={"footer"}
      sx={{
        py: 6,
        px: 2,
        mt: 3,
        backgroundColor: (theme) => theme.palette.grey[800],
        color: "white",
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Company Info */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Rising Tide Capital Partners
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
              A Florida-based global real estate development and capital
              investment firm engaged in acquisitions, development and
              repositioning of land, residential, and commercial properties.
            </Typography>
          </Box>

          {/* Contact Info */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Contact Information
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              📧 hello@risingtidecapital.us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              📞 (904) 325-6275
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              📠 (386) 309-2342
            </Typography>
            <Typography variant="body2">
              📍 PO Box 1242
              <br />
              Flagler Beach, FL 32136
            </Typography>
          </Box>

          {/* BBB Badge */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <a
              href="https://www.bbb.org/us/fl/flagler-beach/profile/real-estate/rising-tide-capital-partners-0403-236031027/#sealclick"
              target="_blank"
              rel="nofollow noreferrer"
              style={{ border: 0, display: "inline-block" }}
            >
              <img
                src="https://seal-northeastflorida.bbb.org/seals/blue-seal-69-145-bbb-236031027.png"
                style={{
                  border: 0,
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                }}
                alt="Rising Tide Capital Partners BBB Business Review"
              />
            </a>
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            pt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            © {new Date().getFullYear()} Rising Tide Capital Partners. All
            rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography
              variant="body2"
              component={Link}
              to="/privacy"
              sx={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                "&:hover": { color: "white" },
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="body2"
              component={Link}
              to="/terms"
              sx={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                "&:hover": { color: "white" },
              }}
            >
              Terms & Conditions
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="tel:+19043256275"
              sx={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                "&:hover": { color: "white" },
              }}
            >
              Call Us: (904) 325-6275
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr auto",
          paddingTop: "56px", // Account for fixed header
        }}
      >
        <Box component="main" role="main">
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
