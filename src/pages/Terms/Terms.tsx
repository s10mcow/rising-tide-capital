import Layout from "@/components/Layout";
import { Box, Container, Typography } from "@mui/material";

function Terms() {
  return (
    <Layout>
      <Box sx={{ py: 8, backgroundColor: "background.primary" }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{ mb: 4, fontWeight: "bold", color: "text.primary" }}
          >
            Terms &amp; Conditions
          </Typography>

          <Typography variant="body2" sx={{ mb: 4, color: "text.secondary" }}>
            Last Updated: February 7, 2026
          </Typography>

          <Section title="1. Agreement to Terms">
            By accessing or using the website risingtidecapital.us or by
            receiving text messages from Rising Tide Capital Partners LLC ("we,"
            "us," or "our"), you agree to be bound by these Terms and
            Conditions. If you do not agree, please discontinue use of our
            services and opt out of text messages by replying STOP.
          </Section>

          <Section title="2. About Our Services">
            Rising Tide Capital Partners LLC is a Florida-based real estate
            investment company engaged in the acquisition of land and properties.
            We contact property owners to make purchase offers and facilitate
            real estate transactions. Our services include property acquisition
            inquiries via text message, phone, email, and direct mail.
          </Section>

          <Section title="3. Text Messaging Program">
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Program Name
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              Rising Tide Capital Partners — Property Purchase Inquiries
            </Typography>

            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Program Description
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              We send text messages to property owners to inquire about
              purchasing their land. Messages may include initial outreach,
              follow-up communications, offer details, and transaction-related
              updates.
            </Typography>

            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Message Frequency
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              Message frequency varies. You may receive initial outreach messages
              and follow-up communications based on your property and
              engagement. We will not send more than 10 messages per month
              unless you are actively engaged in a conversation with us.
            </Typography>

            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Message &amp; Data Rates
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              Message and data rates may apply. Check with your wireless carrier
              for details about your messaging plan.
            </Typography>

            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Opt-Out Instructions
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              You can opt out of receiving text messages at any time by replying{" "}
              <strong>STOP</strong> to any message from us. You will receive a
              confirmation message and will no longer receive text messages from
              this campaign. You may also text CANCEL, END, QUIT, UNSUBSCRIBE,
              or OPTOUT to opt out.
            </Typography>

            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Help &amp; Support
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              For help, reply <strong>HELP</strong> to any text message, or
              contact us at hello@risingtidecapital.us or (904) 325-6275.
            </Typography>

            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Opt-In
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              You may opt in to receive messages by texting START to (904)
              906-9630. Consent to receive text messages is not required as a
              condition of purchasing any property or using any service.
            </Typography>
          </Section>

          <Section title="4. No Obligation">
            Receiving a text message or other communication from us does not
            obligate you to sell your property, enter into any agreement, or
            respond. All property transactions are voluntary and subject to
            mutually agreed-upon terms documented in a written purchase
            agreement.
          </Section>

          <Section title="5. Not Professional Advice">
            Our communications do not constitute legal, financial, tax, or real
            estate advice. We recommend consulting with appropriate
            professionals before making decisions regarding your property. We are
            real estate investors, not licensed real estate agents or brokers
            (unless otherwise stated).
          </Section>

          <Section title="6. Property Information">
            Property information referenced in our communications is obtained
            from publicly available records. While we strive for accuracy, we do
            not guarantee the completeness or accuracy of property data and
            encourage you to verify all information independently.
          </Section>

          <Section title="7. Privacy">
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Your privacy is important to us. Please review our{" "}
              <a
                href="/privacy"
                style={{ color: "#1976d2", textDecoration: "underline" }}
              >
                Privacy Policy
              </a>{" "}
              for detailed information about how we collect, use, and protect
              your personal information.
            </Typography>
          </Section>

          <Section title="8. Intellectual Property">
            All content on this website, including text, graphics, logos, and
            images, is the property of Rising Tide Capital Partners LLC and is
            protected by applicable copyright and trademark laws.
          </Section>

          <Section title="9. Limitation of Liability">
            To the fullest extent permitted by law, Rising Tide Capital Partners
            LLC shall not be liable for any indirect, incidental, special, or
            consequential damages arising from your use of our website or
            services, or from any communications received from us.
          </Section>

          <Section title="10. Governing Law">
            These Terms and Conditions are governed by the laws of the State of
            Florida. Any disputes arising from these terms shall be resolved in
            the courts of Flagler County, Florida.
          </Section>

          <Section title="11. Changes to These Terms">
            We reserve the right to update these Terms and Conditions at any
            time. Changes will be posted on this page with an updated "Last
            Updated" date. Continued use of our services after changes
            constitutes acceptance of the revised terms.
          </Section>

          <Section title="12. Contact Us">
            <Typography variant="body1">
              If you have questions about these Terms and Conditions, contact us:
            </Typography>
            <Box sx={{ mt: 2, pl: 2 }}>
              <Typography variant="body1">
                <strong>Rising Tide Capital Partners LLC</strong>
              </Typography>
              <Typography variant="body1">
                PO Box 1242, Flagler Beach, FL 32136
              </Typography>
              <Typography variant="body1">
                Email: hello@risingtidecapital.us
              </Typography>
              <Typography variant="body1">
                Phone: (904) 325-6275
              </Typography>
            </Box>
          </Section>
        </Container>
      </Box>
    </Layout>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
      >
        {title}
      </Typography>
      {typeof children === "string" ? (
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          {children}
        </Typography>
      ) : (
        children
      )}
    </Box>
  );
}

export default Terms;
