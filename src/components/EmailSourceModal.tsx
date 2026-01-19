import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormEvent, useEffect, useState } from "react";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.spacing(2),
    overflow: "hidden",
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: "white",
  padding: theme.spacing(3),
  textAlign: "center",
  position: "relative",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

export default function EmailSourceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for the source=email query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("source");

    if (source === "email") {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Remove the query parameter from URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.delete("source");
    window.history.replaceState({}, "", url.toString());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        // eslint-disable-next-line
        console.log("Form successfully submitted");
        alert("Thank you! We'll get back to you within 24 hours.");
        handleClose();
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error("Form submission error:", error);
        alert(
          "There was an error submitting your form. Please try again or call us directly.",
        );
      });
    setLoading(false);
  };

  return (
    <StyledDialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <HeaderBox>
        <CloseButton aria-label="close" onClick={handleClose} size="small">
          <Close />
        </CloseButton>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          Thanks for clicking through from our email!
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.95 }}>
          Let's connect and get started on your free offer.
        </Typography>
      </HeaderBox>
      <DialogContent>
        <DialogContentText sx={{ mt: 2 }}>
          To send us a message, please fill out the following form:
        </DialogContentText>
        <form onSubmit={handleSubmit} name="contact" method="POST">
          <input type="hidden" name="form-name" value="contact" />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            required
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            name="email"
            required
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="outlined"
            name="phone"
            required
          />
          <TextField
            margin="dense"
            id="propertyCounty"
            label="Property County"
            type="text"
            fullWidth
            variant="outlined"
            name="propertyCounty"
          />
          <TextField
            margin="dense"
            id="propertyAddress"
            label="Property Address or APN"
            type="text"
            fullWidth
            variant="outlined"
            name="propertyAddress"
          />
          <TextField
            margin="dense"
            id="message"
            label="Notes or letter offer code"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            name="message"
          />
          <FormControlLabel
            control={<Checkbox id="acceptTerms" name="acceptTerms" />}
            label="I consent to receive text messages from our team"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              mb: 1,
            }}
          >
            <a
              href="https://www.bbb.org/us/fl/flagler-beach/profile/real-estate/rising-tide-capital-partners-0403-236031027/#sealclick"
              target="_blank"
              rel="nofollow noreferrer"
              style={{ border: 0, display: "inline-block" }}
            >
              <img
                src="https://seal-northeastflorida.bbb.org/seals/blue-seal-160-82-bbb-236031027.png"
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

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit" disabled={loading}>
              Send
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </StyledDialog>
  );
}
