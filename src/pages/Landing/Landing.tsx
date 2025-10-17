import GoogleReviews from "@/components/GoogleReviews";
import Layout from "@/components/Layout";
import BenefitsSection from "./BenefitsSection";
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";
import HeroSection from "./HeroSection";
import ProcessSection from "./ProcessSection";
import TestimonialsSection from "./TestimonialsSection";
import WhoWeAreSection from "./WhoWeAreSection";

function Landing() {
  // Your Google Place ID - Get it from: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
  // Search for "Rising Tide Capital Partners" and copy the Place ID
  const GOOGLE_PLACE_ID = import.meta.env.NETLIFY_ENV_GOOGLE_PLACE_ID || "";
  const x = import.meta.env;
  // eslint-disable-next-line no-console
  console.log(x);
  // eslint-disable-next-line no-console
  console.log(GOOGLE_PLACE_ID);
  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <TestimonialsSection />

      {/* Google Reviews Section */}
      {GOOGLE_PLACE_ID && (
        <GoogleReviews
          placeId={GOOGLE_PLACE_ID}
          apiEndpoint="/.netlify/functions/google-reviews"
          maxReviews={6}
        />
      )}

      <WhoWeAreSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
}

export default Landing;
