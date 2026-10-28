import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ContractingSection() {
  return (
    <Box
      component="section"
      aria-labelledby="contracting-intro-heading"
      sx={{ bgcolor: "#102d40", color: "#fff", py: { xs: 6, md: 8 }, mt: 8 }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          gap: 4,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ maxWidth: 700 }}>
          <Typography
            sx={{
              color: "#92dcd2",
              fontSize: ".75rem",
              fontWeight: 700,
              letterSpacing: ".12em",
              mb: 2,
            }}
          >
            RISING TIDE CONTRACTING
          </Typography>
          <Typography
            id="contracting-intro-heading"
            component="h2"
            sx={{
              fontSize: { xs: "1.9rem", md: "2.5rem" },
              fontWeight: 700,
              lineHeight: 1.15,
              mb: 2,
            }}
          >
            Your land-home project. Our team.
          </Typography>
          <Typography sx={{ color: "#d1dfe4", maxWidth: 610 }}>
            Building a mobile or manufactured-home project in North Central
            Florida? We handle permitting, provide the subcontractors, and
            manage the work.
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/contracting"
          variant="contained"
          sx={{
            bgcolor: "#92dcd2",
            color: "#102d40",
            px: 3,
            py: 1.5,
            whiteSpace: "nowrap",
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "none",
            "&:hover": { bgcolor: "#b5e9e1", boxShadow: "none" },
          }}
        >
          Explore contracting ↗
        </Button>
      </Container>
    </Box>
  );
}
