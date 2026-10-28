import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ContactModal from "@/components/ContactModal";
import sten from "@assets/images/sten.jpg";
import marco from "@assets/images/marco.jpeg";

const team = [
  {
    name: "Sten Muchow",
    role: "Real estate & investment",
    image: sten,
    text: "A real estate investor and entrepreneur investing since 2016. Sten brings a background in technology and a practical eye for property opportunities.",
    link: "https://www.linkedin.com/in/stenmuchow",
  },
  {
    name: "Marco Varlesi",
    role: "Construction & project management",
    image: marco,
    text: "With experience owning a construction business in Oregon before moving to Florida, Marco brings hands-on construction knowledge and project management experience.",
    link: "https://www.linkedin.com/in/marco-antonio-varlesi-a4681551/",
  },
];
const steps = [
  {
    title: "Start with the property",
    text: "Share the location, parcel details, and what you’re looking to do. We’ll talk through your situation.",
  },
  {
    title: "Understand the opportunity",
    text: "We review the property and discuss a purchase offer or the scope of your contracting project.",
  },
  {
    title: "Move forward with a plan",
    text: "Agree on the details in writing. From the title company to the trade team, you’ll know the next step.",
  },
];
export default function Landing() {
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <Layout>
      <div className="home-page">
        <section className="home-hero" aria-labelledby="home-heading">
          <div className="site-container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow light">LAND. HOMES. OPPORTUNITY.</p>
              <h1 id="home-heading">
                See the potential.
                <br />
                <em>Build what’s next.</em>
              </h1>
              <p className="hero-lede">
                Real estate investment and hands-on contracting, brought
                together by a Florida-based team.
              </p>
              <div className="site-actions">
                <Link className="site-button" to="/contracting">
                  Explore contracting <span aria-hidden="true">↗</span>
                </Link>
                <a className="text-link light" href="#land">
                  Have land to sell? <span aria-hidden="true">↗</span>
                </a>
              </div>
              <p className="hero-footnote">
                Florida roots. Clear communication. A plan to move forward.
              </p>
            </div>
            <figure className="home-hero-image">
              <img
                src="/contracting-home.webp"
                alt="Illustration of a manufactured home on a wooded Florida lot"
                width={1536}
                height={1024}
              />
              <figcaption>
                <span>NORTH CENTRAL FLORIDA</span>
                <strong>Land. Home. A place to begin.</strong>
                <small>Illustrative rendering</small>
              </figcaption>
            </figure>
          </div>
        </section>
        <div className="home-strip">
          <div className="site-container">
            <span>Land acquisition</span>
            <span>Property investment</span>
            <span>General contracting</span>
          </div>
        </div>
        <section
          className="site-section site-container"
          id="our-work"
          aria-labelledby="work-heading"
        >
          <div className="section-intro">
            <div>
              <p className="eyebrow">ONE TEAM. TWO WAYS FORWARD.</p>
              <h2 id="work-heading">
                The right people.
                <br />
                For your next step.
              </h2>
            </div>
            <p>
              Whether you’re ready to sell a property or bring a land-home
              project to life, start with a conversation with the people doing
              the work.
            </p>
          </div>
          <div className="work-grid">
            <article className="work-panel" id="land">
              <div className="panel-top">
                <span>01 / CAPITAL PARTNERS</span>
                <span aria-hidden="true">↗</span>
              </div>
              <h3>
                Your land.
                <br />A fresh possibility.
              </h3>
              <p>
                We acquire land and invest in residential and commercial
                property. Tell us what you own and what you have in mind. We’ll
                review the opportunity with you.
              </p>
              <ul className="line-list">
                <li>Vacant land & residential lots</li>
                <li>Property acquisition & development</li>
                <li>Direct conversations with our team</li>
              </ul>
              <button
                className="text-link"
                onClick={() => setContactOpen(true)}
              >
                Discuss your property <span aria-hidden="true">↗</span>
              </button>
            </article>
            <article className="work-panel contracting-panel">
              <div className="panel-top">
                <span>02 / RISING TIDE CONTRACTING</span>
                <span aria-hidden="true">↗</span>
              </div>
              <h3>
                Your land-home project.
                <br />
                Our team.
              </h3>
              <p>
                General contracting for mobile and manufactured-home investments
                in North Central Florida. We handle permitting, provide the
                subs, and manage the work.
              </p>
              <ul className="line-list">
                <li>Permitting & project oversight</li>
                <li>Our subcontractor team</li>
                <li>Flat GC fee for an agreed scope</li>
              </ul>
              <Link className="text-link light" to="/contracting">
                Explore our GC services <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </div>
        </section>
        <section
          className="process-band"
          id="process-heading"
          aria-labelledby="approach-heading"
        >
          <div className="site-container">
            <div className="section-intro">
              <div>
                <p className="eyebrow">A PRACTICAL APPROACH</p>
                <h2 id="approach-heading">
                  Less guesswork.
                  <br />
                  More forward motion.
                </h2>
              </div>
              <Link className="text-link" to="/closing-process">
                Selling land? Read the closing guide{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <ol className="home-steps">
              {steps.map((step, i) => (
                <li key={step.title}>
                  <span>0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section
          className="site-section site-container"
          id="about"
          aria-labelledby="team-heading"
        >
          <div className="section-intro">
            <div>
              <p className="eyebrow">THE PEOPLE BEHIND RISING TIDE</p>
              <h2 id="team-heading">
                Different experience.
                <br />
                Shared direction.
              </h2>
            </div>
            <p>
              Real estate perspective meets construction experience. Sten and
              Marco bring both sides of the work to the same table.
            </p>
          </div>
          <div className="team-grid">
            {team.map((person) => (
              <article className="team-profile" key={person.name}>
                <img
                  src={person.image}
                  alt={person.name}
                  width={420}
                  height={480}
                  loading="lazy"
                />
                <div>
                  <p className="eyebrow">{person.role}</p>
                  <h3>{person.name}</h3>
                  <p>{person.text}</p>
                  <a
                    className="text-link"
                    href={person.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Connect on LinkedIn <span aria-hidden="true">↗</span>
                    <span className="visually-hidden"> with {person.name}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          className="home-faq-band"
          id="faq-heading"
          aria-labelledby="questions-heading"
        >
          <div className="site-container faq-grid">
            <div>
              <p className="eyebrow">A FEW THINGS TO KNOW</p>
              <h2 id="questions-heading">
                Start with
                <br />
                clear answers.
              </h2>
            </div>
            <div className="site-faq">
              <details>
                <summary>Where do you work?</summary>
                <p>
                  Our contracting services focus on North Central Florida. Our
                  property acquisition business considers land across the United
                  States. Send us the location so we can discuss the fit.
                </p>
              </details>
              <details>
                <summary>Can I talk to you before I own land?</summary>
                <p>
                  Yes. If you’re evaluating land for a mobile or
                  manufactured-home project, tell us the county and where you
                  are in the process. We can discuss the proposed contracting
                  scope.
                </p>
              </details>
              <details>
                <summary>Do I need to bring my own subcontractors?</summary>
                <p>
                  No. For our contracted GC scope, we provide and manage the
                  subcontractor team and coordinate with your licensed home
                  installer.
                </p>
              </details>
              <details>
                <summary>
                  What happens after I contact you about selling?
                </summary>
                <p>
                  We’ll discuss your property, review the details, and decide
                  whether it fits our acquisition plans. Any purchase terms are
                  set out in a written agreement.
                </p>
                <Link className="text-link" to="/closing-process">
                  See the closing process ↗
                </Link>
              </details>
            </div>
          </div>
        </section>
        <section
          className="home-contact"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="site-container contact-grid">
            <div>
              <p className="eyebrow light">YOUR NEXT STEP STARTS HERE</p>
              <h2 id="contact-heading">
                Let’s put your
                <br />
                plans in motion.
              </h2>
              <p>
                A property to sell. A project to build. A question to work
                through. We’d like to hear it.
              </p>
              <div className="site-actions">
                <button
                  className="site-button"
                  onClick={() => setContactOpen(true)}
                >
                  Tell us about your property <span aria-hidden="true">↗</span>
                </button>
                <Link
                  className="text-link light"
                  to="/contracting#project-inquiry"
                >
                  Discuss a build ↗
                </Link>
              </div>
            </div>
            <div className="contact-details">
              <span>CALL OR EMAIL US</span>
              <a href="tel:+19043256275">(904) 325-6275 ↗</a>
              <a href="mailto:hello@risingtidecapital.us">
                hello@risingtidecapital.us ↗
              </a>
              <p>Based in Flagler Beach, Florida</p>
            </div>
          </div>
        </section>
      </div>
      <ContactModal
        isOpen={contactOpen}
        handleClose={() => setContactOpen(false)}
      />
    </Layout>
  );
}
