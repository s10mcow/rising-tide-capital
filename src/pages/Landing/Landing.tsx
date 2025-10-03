import Layout from "@/components/Layout";
import BenefitsSection from "./BenefitsSection";
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";
import HeroSection from "./HeroSection";
import ProcessSection from "./ProcessSection";
import TestimonialsSection from "./TestimonialsSection";
import WhoWeAreSection from "./WhoWeAreSection";

function Landing() {
  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <TestimonialsSection />
      <WhoWeAreSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
}

export default Landing;
