import HomeInquiry from "./HomeInquiry";

export default function HomeContactSection({
  regarding,
}: {
  regarding?: string;
}) {
  return (
    <section
      className="site-section site-container homes-contact"
      id="home-inquiry"
      aria-labelledby="home-inquiry-heading"
    >
      <div className="homes-inquiry">
        <div>
          <p className="eyebrow">ASK ABOUT A HOME</p>
          <h2 id="home-inquiry-heading">Contact us.</h2>
          <p>
            Call, email, or send a note. We’ll reply about current homes and
            what you’re looking for.
          </p>
          <div className="homes-direct-contact">
            <a href="tel:+19043256275">
              (904) 325-6275 <span aria-hidden="true">↗</span>
            </a>
            <a href="mailto:hello@risingtidecapital.us">
              hello@risingtidecapital.us <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <HomeInquiry regarding={regarding} />
      </div>
    </section>
  );
}
