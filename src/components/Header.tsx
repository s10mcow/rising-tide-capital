import { Phone } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  color: theme.palette.text.primary,
}));

const Logo = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  cursor: "pointer",
  minWidth: 0, // Allow shrinking
  overflow: "hidden",
}));

const LogoImage = styled("img")(({ theme }) => ({
  height: "40px",
  width: "40px",
  marginRight: theme.spacing(2),
}));

const LogoText = styled(Typography)({
  fontFamily: "SF Pro Text, Arial, sans-serif",
  fontWeight: "bold",
  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
  textTransform: "uppercase",
  textDecoration: "none",
  color: "black",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: { xs: "100px", sm: "120px", md: "none" },
  "&:hover": {
    textDecoration: "none",
  },
});

const NavButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: "white",
  },
}));

const PhoneButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Logo onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <LogoImage
              src="/favicon.png"
              alt="Rising Tide Capital Partners Logo"
            />
            <LogoText>Rising Tide Capital Partners</LogoText>
          </Logo>

          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <NavButton onClick={() => scrollToSection("benefits-heading")}>
              Benefits
            </NavButton>
            <NavButton onClick={() => scrollToSection("process-heading")}>
              How It Works
            </NavButton>
            <NavButton onClick={() => scrollToSection("testimonials-heading")}>
              Testimonials
            </NavButton>
            <NavButton onClick={() => scrollToSection("faq-heading")}>
              FAQ
            </NavButton>
            <NavButton onClick={() => scrollToSection("cta-heading")}>
              Contact
            </NavButton>
            <PhoneButton
              variant="contained"
              startIcon={<Phone />}
              href="tel:+19043256275"
              size="small"
            >
              (904) 325-6275
            </PhoneButton>
          </Box>

          {/* Mobile menu - simplified for now */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              flexShrink: 0,
              minWidth: 0,
            }}
          >
            <PhoneButton
              variant="contained"
              size="small"
              href="tel:+19043256275"
              sx={{
                fontSize: "0.75rem",
                px: 1.5,
                py: 0.5,
                minWidth: "auto",
              }}
            >
              Call
            </PhoneButton>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}

export default Header;
