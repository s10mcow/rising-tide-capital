import { Apartment, Home, Landscape } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SectionContainer } from "./styles";

const Item = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  backgroundColor: theme.palette.grey[300],
  textAlign: "left",
  padding: theme.spacing(4),
  borderRadius: "4px",
  [theme.breakpoints.up("md")]: {
    minHeight: "300px",
  },
}));

function AboutSection() {
  const featureList = [
    {
      title: "Multi-Family",
      description:
        "From duplexes to larger multi unit apartments, nothing is too small or too big.",
      icon: (
        <Box sx={{ color: "info.main" }}>
          <Apartment sx={{ fontSize: 40 }} />
        </Box>
      ),
    },
    {
      title: "Land",
      description: "Land located in the USA.",
      icon: (
        <Box sx={{ color: "success.main" }}>
          <Landscape sx={{ fontSize: 40 }} />
        </Box>
      ),
    },
    {
      title: "Single Family Houses",
      description: "Single family houses located in the USA.",
      icon: (
        <Box sx={{ color: "warning.main" }}>
          <Home sx={{ fontSize: 40 }} />
        </Box>
      ),
    },
  ];

  return (
    <SectionContainer component="section" aria-labelledby="about-heading">
      <Container>
        <Grid container>
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <Grid sx={{ textAlign: "center" }}>
                <Typography
                  component="h2"
                  variant="h2"
                  gutterBottom
                  id="about-heading"
                >
                  What we do
                </Typography>
                <Typography component="p" gutterBottom color="grey.600">
                  Rising Tide Capital Partners focuses on investments through
                  real estate. We have three areas of focus: multi-family
                  properties, land development, and single family houses.
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={4} mt={2}>
            {featureList.map((feature, index) => (
              <Grid xs={12} sm={12} md={4} key={index} item>
                <Item>
                  {feature.icon}
                  <Typography component="h3" variant="h4" sx={{ mt: 2 }}>
                    {feature.title}
                  </Typography>
                  <Box mt={1.5}>
                    <Typography component="p" color={"rgb(139, 143, 163)"}>
                      {feature.description}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  );
}

export default AboutSection;
