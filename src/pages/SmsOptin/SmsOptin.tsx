import Layout from "@/components/Layout";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useState } from "react";

function SmsOptin() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !consent) return;
    // In production this would POST to an API
    setSubmitted(true);
  };

  return (
    <Layout>
      <Box
        sx={{ py: 8, backgroundColor: "background.primary", minHeight: "80vh" }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
          >
            SMS Updates
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            Sign up to receive text messages from Rising Tide Capital Partners
            regarding property purchase inquiries and real estate opportunities.
          </Typography>

          {submitted ? (
            <Alert severity="success" sx={{ mb: 4 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                You're signed up!
              </Typography>
              <Typography variant="body2">
                You may receive text messages from Rising Tide Capital Partners
                at the number provided. Message frequency varies. Message and
                data rates may apply. Reply STOP at any time to opt out. Reply
                HELP for assistance.
              </Typography>
            </Alert>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                backgroundColor: "background.paper",
                p: 4,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <TextField
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                required
                variant="outlined"
                placeholder="(555) 123-4567"
                type="tel"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    I agree to receive text messages from Rising Tide Capital
                    Partners LLC regarding property purchase inquiries. Message
                    frequency varies. Message and data rates may apply. Reply
                    STOP to opt out at any time. Reply HELP for help. View our{" "}
                    <a href="/privacy" style={{ color: "#1976d2" }}>
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/terms" style={{ color: "#1976d2" }}>
                      Terms of Service
                    </a>
                    .
                  </Typography>
                }
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!phone || !consent}
                sx={{ py: 1.5 }}
              >
                Sign Up for SMS Updates
              </Button>

              <Typography
                variant="caption"
                sx={{ color: "text.secondary", textAlign: "center" }}
              >
                By submitting this form, you expressly consent to receive
                recurring text messages from Rising Tide Capital Partners LLC at
                the phone number provided. Consent is not a condition of
                purchase. Message frequency varies. Message and data rates may
                apply. Reply STOP to cancel. Reply HELP for help.
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
            >
              How It Works
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
              • We may contact property owners via text message to inquire about
              purchasing their land.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
              • Messages include property purchase inquiries and follow-up
              conversations.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
              • You can opt in by texting <strong>START</strong> to{" "}
              <strong>(904) 906-9630</strong> or by completing this form.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
              • To stop receiving messages, reply <strong>STOP</strong> at any
              time.
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              • For help, reply <strong>HELP</strong> or contact us at{" "}
              <a
                href="mailto:hello@risingtidecapital.us"
                style={{ color: "#1976d2" }}
              >
                hello@risingtidecapital.us
              </a>
              .
            </Typography>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}

export default SmsOptin;
