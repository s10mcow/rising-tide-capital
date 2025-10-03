import ContactModal from "@/components/ContactModal";
import styled from "@emotion/styled";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { SectionContainer } from "./styles";

const Email = styled.a`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const AddressLine = styled.div`
  display: flex;
  flex: 1;
  margin-top: 4px;
  justify-content: center;
`;

const PhoneLine = styled.a`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 8px;
`;

function ContactUsSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={open} handleClose={() => setOpen(false)} />

      <SectionContainer
        component="section"
        mb={10}
        aria-labelledby="contact-heading"
      >
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <Grid sx={{ textAlign: "center" }}>
                <Typography
                  component="h2"
                  variant="h2"
                  gutterBottom
                  id="contact-heading"
                  sx={{
                    margin: "0 auto",
                    my: 2,
                    width: {
                      xs: "75%",
                    },
                  }}
                >
                  Contact Us
                </Typography>
                <Typography component="p">
                  Have a project in mind? We would love to hear from you.
                </Typography>
              </Grid>
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Button
                  size="large"
                  variant={"contained"}
                  onClick={() => setOpen(true)}
                  aria-label="Open contact form"
                >
                  Contact us
                </Button>
              </Box>
              <Box
                component="address"
                sx={{ mt: 3, color: "#777", fontStyle: "normal" }}
              >
                <Email
                  href="mailto:hello@risingtidecapital.us"
                  aria-label="Send email to Rising Tide Capital Partners"
                >
                  hello@risingtidecapital.us
                </Email>
                <PhoneLine
                  href="tel:+19043256275"
                  aria-label="Call Rising Tide Capital Partners"
                >
                  Phone: (904) 325-6275
                </PhoneLine>
                <PhoneLine
                  href="tel:+13863092342"
                  aria-label="Fax Rising Tide Capital Partners"
                >
                  Fax: (386) 309-2342
                </PhoneLine>
                <AddressLine>PO Box 1242</AddressLine>
                <AddressLine>Flagler Beach, FL 32136</AddressLine>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </SectionContainer>
    </>
  );
}

export default ContactUsSection;
