import marco from "@assets/images/marco.jpeg";
import sten from "@assets/images/sten.jpg";
import { LinkedIn } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { SectionContainer } from "./styles";

function WhoWeAreSection() {
  return (
    <SectionContainer mb={10}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Grid sx={{ textAlign: "center" }}>
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  margin: "0 auto",
                  my: 2,
                  width: {
                    xs: "75%",
                  },
                }}
              >
                Who we are
              </Typography>
              <Typography>
                Rising Tide Capital is a real estate investment company
                comprised of 2 members.
              </Typography>
            </Grid>

            <Grid
              container
              spacing={6}
              sx={{
                mt: {
                  xs: 1,
                  md: 8,
                },
              }}
            >
              <Grid item xs={12} md={6}>
                <Card>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} sx={{ padding: 4 }}>
                      <Avatar
                        alt="Sten Muchow"
                        src={sten}
                        sx={{ width: "100%", height: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          Sten Muchow
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Sten is a real estate investor and entrepreneur.
                          Having studied computer science and math at school, he
                          leveraged his knowledge to build a real estate
                          investment business. He has been investing in real
                          estate since 2016. He is passionate about helping
                          others achieve financial freedom through real estate
                          investing. He is also a big believer in the power of
                          community and is excited to be a part of the Rising
                          Tide Capital team.
                        </Typography>
                      </CardContent>
                      <Box display="flex" justifyContent="center" sx={{ p: 1 }}>
                        <Link
                          href="https://www.linkedin.com/in/stenmuchow"
                          target="_blank"
                        >
                          <IconButton aria-label="linkedin" size="large">
                            <LinkedIn />
                          </IconButton>
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} sx={{ padding: 4 }}>
                      <Avatar
                        alt="Marco Varlesi"
                        src={marco}
                        sx={{ width: "100%", height: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          Marco Varlesi
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Marco is an experienced general contractor, formerly
                          owning a construction company in Oregon before moving
                          to Florida. His deep knowledge in construction
                          management allows him to handle complex projects
                          efficiently. Marco is passionate about sustainable
                          building and community development. Committed to
                          excellence and collaboration, he continues to help
                          others achieve their real estate goals.
                        </Typography>
                      </CardContent>
                      <Box display="flex" justifyContent="center" sx={{ p: 1 }}>
                        <Link
                          href="https://www.linkedin.com/in/marco-antonio-varlesi-a4681551/"
                          target="_blank"
                        >
                          <IconButton aria-label="linkedin" size="large">
                            <LinkedIn />
                          </IconButton>
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  );
}

export default WhoWeAreSection;
