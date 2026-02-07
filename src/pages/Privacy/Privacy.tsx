import Layout from "@/components/Layout";
import { Box, Container, Typography } from "@mui/material";

function Privacy() {
  return (
    <Layout>
      <Box sx={{ py: 8, backgroundColor: "background.primary" }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{ mb: 4, fontWeight: "bold", color: "text.primary" }}
          >
            Privacy Policy
          </Typography>

          <Typography variant="body2" sx={{ mb: 4, color: "text.secondary" }}>
            Last Updated: February 7, 2026
          </Typography>

          <Section title="1. Introduction">
            Rising Tide Capital Partners LLC ("we," "us," or "our") respects
            your privacy and is committed to protecting your personal
            information. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website
            risingtidecapital.us, receive text messages from us, or otherwise
            interact with our services.
          </Section>

          <Section title="2. Information We Collect">
            <Typography variant="body1" sx={{ mb: 1 }}>
              We may collect the following types of information:
            </Typography>
            <BulletList
              items={[
                "Name and contact information (phone number, email address, mailing address)",
                "Property ownership information obtained from publicly available records (county assessor data, tax records, deed records)",
                "Communication records, including text messages and call logs related to property inquiries",
                "Website usage data (IP address, browser type, pages visited)",
                "Any information you voluntarily provide to us",
              ]}
            />
          </Section>

          <Section title="3. How We Use Your Information">
            <Typography variant="body1" sx={{ mb: 1 }}>
              We use the information we collect to:
            </Typography>
            <BulletList
              items={[
                "Contact property owners regarding potential land purchases",
                "Respond to your inquiries and communicate about potential transactions",
                "Process and complete real estate transactions",
                "Comply with legal obligations and enforce our agreements",
                "Improve our website and services",
              ]}
            />
          </Section>

          <Section title="4. Text Messaging (SMS/MMS)">
            <Typography variant="body1" sx={{ mb: 2 }}>
              Rising Tide Capital Partners may send text messages to property
              owners to inquire about purchasing their land. By engaging with our
              text messages, you acknowledge the following:
            </Typography>
            <BulletList
              items={[
                "Message frequency varies based on your engagement and our outreach campaigns",
                "Message and data rates may apply depending on your wireless carrier and plan",
                "You can opt out of text messages at any time by replying STOP to any message",
                "You can request help by replying HELP to any message",
                "We will not share your phone number or opt-in information with third parties for marketing purposes",
                "Consent to receive text messages is not a condition of purchasing any property or service",
              ]}
            />
          </Section>

          <Section title="5. How We Obtain Contact Information">
            We obtain property owner contact information from publicly available
            sources, including but not limited to county property records, tax
            assessor databases, and publicly recorded deeds. This information is
            used solely for the purpose of making legitimate real estate purchase
            inquiries.
          </Section>

          <Section title="6. Information Sharing">
            <Typography variant="body1" sx={{ mb: 1 }}>
              We do not sell, rent, or trade your personal information to third
              parties for marketing purposes. We may share your information with:
            </Typography>
            <BulletList
              items={[
                "Title companies and closing agents involved in a real estate transaction",
                "Legal professionals as necessary for transaction completion",
                "Service providers who assist with our business operations (subject to confidentiality agreements)",
                "Government authorities when required by law or legal process",
              ]}
            />
          </Section>

          <Section title="7. Data Security">
            We implement reasonable administrative, technical, and physical
            safeguards to protect your personal information. However, no method
            of transmission over the Internet or electronic storage is 100%
            secure, and we cannot guarantee absolute security.
          </Section>

          <Section title="8. Your Rights">
            <Typography variant="body1" sx={{ mb: 1 }}>
              You have the right to:
            </Typography>
            <BulletList
              items={[
                "Request access to the personal information we hold about you",
                "Request correction of inaccurate information",
                "Request deletion of your personal information (subject to legal obligations)",
                "Opt out of text message communications at any time by replying STOP",
                "Contact us with any privacy-related questions or concerns",
              ]}
            />
          </Section>

          <Section title="9. Data Retention">
            We retain your personal information only for as long as necessary to
            fulfill the purposes described in this policy, comply with legal
            obligations, resolve disputes, and enforce our agreements.
          </Section>

          <Section title="10. Changes to This Policy">
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page with an updated "Last Updated" date. We
            encourage you to review this policy periodically.
          </Section>

          <Section title="11. Contact Us">
            <Typography variant="body1">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
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

function BulletList({ items }: { items: string[] }) {
  return (
    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
      {items.map((item, i) => (
        <Typography
          key={i}
          component="li"
          variant="body1"
          sx={{ mb: 0.5, lineHeight: 1.8 }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  );
}

export default Privacy;
