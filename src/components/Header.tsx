import { Phone } from "@mui/icons-material";
import {
  AppBar,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Container,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  color: theme.palette.text.primary,
}));

const Logo = styled(Box)<
  BoxProps & { component?: React.ElementType; to?: string }
>(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
}));

const LogoImage = styled("img")(() => ({
  height: "40px",
  width: "40px",
}));

const NavButton = styled(Button)<
  ButtonProps & { component?: React.ElementType; to?: string }
>(({ theme }) => ({
  marginLeft: theme.spacing(1),
  color: theme.palette.text.primary,
  whiteSpace: "nowrap",
  fontSize: "0.85rem",
  padding: "6px 12px",
  minWidth: "auto",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: "white",
  },
}));

const PhoneButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.main,
  color: "white",
  whiteSpace: "nowrap",
  fontSize: "0.85rem",
  padding: "6px 12px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

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
          <Logo component={Link} to="/" sx={{ textDecoration: "none" }}>
            <LogoImage
              src="/favicon.png"
              alt="Rising Tide Capital Partners Logo"
            />
          </Logo>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              ml: "auto",
            }}
          >
            {isHomePage ? (
              <>
                <NavButton onClick={() => scrollToSection("benefits-heading")}>
                  Benefits
                </NavButton>
                <NavButton onClick={() => scrollToSection("process-heading")}>
                  How It Works
                </NavButton>
                <NavButton
                  onClick={() => scrollToSection("testimonials-heading")}
                >
                  Testimonials
                </NavButton>
                <NavButton onClick={() => scrollToSection("faq-heading")}>
                  FAQ
                </NavButton>
                <NavButton onClick={() => scrollToSection("cta-heading")}>
                  Contact
                </NavButton>
              </>
            ) : (
              <NavButton component={Link} to="/">
                Home
              </NavButton>
            )}
            <NavButton
              component={Link}
              to="/closing-process"
              sx={{
                backgroundColor:
                  location.pathname === "/closing-process"
                    ? "rgba(61, 108, 69, 0.1)"
                    : "transparent",
              }}
            >
              Closing Process
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

          {/* Mobile menu */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1,
              ml: "auto",
            }}
          >
            <NavButton
              component={Link}
              to="/closing-process"
              size="small"
              sx={{
                fontSize: "0.75rem",
                px: 1.5,
                py: 0.5,
                backgroundColor:
                  location.pathname === "/closing-process"
                    ? "rgba(61, 108, 69, 0.1)"
                    : "transparent",
              }}
            >
              Closing Process
            </NavButton>
            <PhoneButton
              variant="contained"
              startIcon={<Phone />}
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
