import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { SectionContainer } from "./styles";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: `${theme.spacing(1)} 0`,
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  "&.Mui-expanded": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  "& .MuiAccordionSummary-content": {
    margin: `${theme.spacing(1)} 0`,
    [theme.breakpoints.up("sm")]: {
      margin: `${theme.spacing(2)} 0`,
    },
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
}));

function FAQSection() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const faqs = [
    {
      id: "panel1",
      question: "What types of land do you buy?",
      answer:
        "We buy all types of vacant land across the USA including residential lots, agricultural land, commercial land, industrial parcels, and raw acreage. Whether your land is developed or undeveloped, we're interested in making you a fair offer.",
    },
    {
      id: "panel2",
      question: "What states do you buy land in?",
      answer:
        "We buy land nationwide across all 50 states. While we're based in Florida, we have experience and trusted partners throughout the USA to ensure smooth transactions regardless of where your property is located.",
    },
    {
      id: "panel3",
      question: "How do you determine the value of my land?",
      answer:
        "We use comprehensive market analysis including recent comparable sales, current market trends, zoning information, and development potential. Our team reviews county records, assesses accessibility, utilities, and other factors that affect land value to provide you with a fair offer.",
    },
    {
      id: "panel4",
      question: "Do I need to pay any fees or commissions?",
      answer:
        "No, there are absolutely no fees, commissions, or hidden costs when you sell your land to us. We handle all closing costs and work with trusted title companies to ensure a smooth transaction. You receive the full agreed-upon amount.",
    },
    {
      id: "panel5",
      question: "How long does the selling process take?",
      answer:
        "Our typical timeline is 30-45 days from initial contact to closing. This includes property evaluation, title research, and closing preparation. We can often move faster if needed, and we'll keep you informed throughout the entire process.",
    },
    {
      id: "panel6",
      question: "What if my land has issues like back taxes or liens?",
      answer:
        "We can often work with properties that have complications like back taxes, liens, or title issues. Our team has experience resolving these matters as part of the transaction. Contact us to discuss your specific situation - we may still be able to help.",
    },
    {
      id: "panel7",
      question: "Do I need to clean up or improve the land before selling?",
      answer:
        "No, we buy land in as-is condition. You don't need to clear brush, remove debris, or make any improvements. We handle any necessary cleanup or development after the purchase, saving you time and money.",
    },
    {
      id: "panel8",
      question:
        "What makes Rising Tide Capital Partners different from other land buyers?",
      answer:
        "We combine professional expertise with personal service. Our background in real estate development and investment ensures fair pricing, while our commitment to transparency means no surprises. We work with established title companies and maintain clear communication throughout the process.",
    },
    {
      id: "panel9",
      question: "How do I get started selling my land?",
      answer:
        "Simply contact us through our website form, email us at hello@risingtidecapital.us, or call us at (904) 325-6275. We'll ask some basic questions about your property and can often provide an initial assessment within 24 hours.",
    },
    {
      id: "panel10",
      question: "Is there any obligation when I request an offer?",
      answer:
        "Absolutely not. Our property evaluations and offers are completely free with no obligation. You can take time to consider our offer, get a second opinion, or simply use it for your own planning purposes. There's no pressure to sell.",
    },
  ];

  return (
    <SectionContainer
      component="section"
      aria-labelledby="faq-heading"
      sx={{ py: 8, backgroundColor: "grey.50" }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 6 } }}>
              <Typography
                component="h2"
                variant="h2"
                gutterBottom
                id="faq-heading"
                sx={{
                  mb: 2,
                  fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                  lineHeight: 1.2,
                  px: { xs: 1, sm: 2 },
                }}
              >
                Frequently Asked Questions
              </Typography>
              <Typography
                component="p"
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: "800px",
                  mx: "auto",
                  fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.25rem" },
                  lineHeight: 1.4,
                  px: { xs: 1, sm: 2 },
                }}
              >
                Get answers to common questions about selling your land to
                Rising Tide Capital Partners. Don't see your question? Contact
                us directly.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={10} sx={{ mx: "auto" }}>
            {faqs.map((faq) => (
              <StyledAccordion
                key={faq.id}
                expanded={expanded === faq.id}
                onChange={handleChange(faq.id)}
              >
                <StyledAccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`${faq.id}-content`}
                  id={`${faq.id}-header`}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    sx={{
                      fontWeight: "medium",
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      lineHeight: 1.3,
                    }}
                  >
                    {faq.question}
                  </Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                  <Typography
                    component="p"
                    variant="body1"
                    sx={{
                      lineHeight: 1.6,
                      fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </StyledAccordionDetails>
              </StyledAccordion>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", mt: { xs: 3, sm: 4 } }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" },
                  lineHeight: 1.2,
                  px: { xs: 1, sm: 2 },
                }}
              >
                Still have questions?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 3,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  lineHeight: 1.4,
                  px: { xs: 1, sm: 2 },
                }}
              >
                We're here to help. Contact us for personalized answers to your
                specific situation.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "center",
                  gap: { xs: 1, sm: 2 },
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}
                >
                  📧 <strong>Email:</strong> hello@risingtidecapital.us
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}
                >
                  📞 <strong>Phone:</strong> (904) 325-6275
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  );
}

export default FAQSection;
