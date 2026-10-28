import Layout from "@/components/Layout";
import ContractingInquiry from "./ContractingInquiry";
import "./contracting.css";

const services = [
  {
    number: "01",
    title: "Permitting",
    text: "We manage the permitting process for our contracted scope and coordinate the documents, trades, and inspections your project needs.",
  },
  {
    number: "02",
    title: "Our subcontractor team",
    text: "We provide and manage the subcontractors. You have one GC partner keeping the trades and their schedules connected.",
  },
  {
    number: "03",
    title: "Project oversight",
    text: "We coordinate the work and your licensed home installer, follow progress, and keep you informed as your project moves forward.",
  },
];

const steps = [
  {
    title: "Tell us about your project",
    text: "Share the county, property, home plans, and where you are in the process.",
  },
  {
    title: "Agree on the scope and fee",
    text: "We review the project with you and put the GC responsibilities, fee, and project costs in writing.",
  },
  {
    title: "Put the team to work",
    text: "We coordinate permitting, our subcontractors, and your installer around the agreed project plan.",
  },
];

export default function Contracting() {
  return (
    <Layout>
      <div className="contracting-page">
        <section
          className="contracting-hero"
          aria-labelledby="contracting-heading"
        >
          <div className="contracting-container">
            <div className="contracting-brand">
              <span className="contracting-brand-mark" aria-hidden="true">
                ↗
              </span>
              <span>
                RISING TIDE<span>CONTRACTING</span>
              </span>
            </div>
            <div className="contracting-hero-grid">
              <div className="contracting-hero-copy">
                <p className="contracting-eyebrow">
                  <span aria-hidden="true" /> NORTH CENTRAL FLORIDA
                </p>
                <h1 id="contracting-heading">
                  Your land-home project.
                  <br />
                  <em>Our team.</em>
                </h1>
                <p className="contracting-lede">
                  General contracting for mobile and manufactured-home
                  investments. We handle permitting, provide the subs, and
                  manage the work.
                </p>
                <div className="contracting-actions">
                  <a className="contracting-button" href="#project-inquiry">
                    Let’s talk about your project{" "}
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a className="contracting-text-link" href="#our-scope">
                    Explore our services <span aria-hidden="true">↓</span>
                  </a>
                </div>
                <p className="contracting-hero-note">
                  Flat-fee GC services. Scope agreed up front.
                </p>
              </div>
              <figure className="contracting-hero-image">
                <img
                  src="/contracting-home.webp"
                  alt="Illustration of a manufactured home on a wooded Florida lot"
                  width={1536}
                  height={1024}
                  loading="eager"
                />
                <figcaption>
                  Land. Home. A team to bring it together.
                  <span>Illustrative rendering</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className="contracting-service-strip">
          <div className="contracting-container">
            <span>Permitting</span>
            <span>Our subcontractors</span>
            <span>Installer coordination</span>
            <span>Project oversight</span>
          </div>
        </div>

        <section
          className="contracting-section contracting-container"
          id="our-scope"
          aria-labelledby="contracting-scope-heading"
        >
          <div className="contracting-section-heading">
            <p className="contracting-eyebrow">A PARTNER ON THE GROUND</p>
            <h2 id="contracting-scope-heading">
              You see the opportunity.
              <br />
              We manage the moving parts.
            </h2>
            <p>
              For investors planning a land-home package for resale or rental,
              we bring the trade team and day-to-day coordination that turn a
              plan into a managed project.
            </p>
          </div>
          <div className="contracting-services">
            {services.map((service) => (
              <article key={service.number}>
                <span className="contracting-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
          <aside className="contracting-installer-note">
            <span aria-hidden="true">↔</span>
            <p>
              <strong>Working alongside your home installer.</strong> The home
              installation stays with a licensed installer. We coordinate that
              work with the rest of the project and the subcontractors we
              provide.
            </p>
          </aside>
        </section>

        <section
          className="contracting-fee-section"
          aria-labelledby="contracting-fee-heading"
        >
          <div className="contracting-container contracting-fee-grid">
            <div>
              <p className="contracting-eyebrow">
                CLEAR SCOPE. PREDICTABLE GC FEE.
              </p>
              <h2 id="contracting-fee-heading">
                Know what your
                <br />
                GC fee covers.
              </h2>
            </div>
            <div>
              <p>
                Our GC services are offered for a flat fee based on your agreed
                scope. We’ll review your property and plans before quoting it.
              </p>
              <p className="contracting-muted">
                The GC fee is separate from construction costs, subcontractor
                work, materials, permit fees, and other project expenses. Your
                proposal sets out what’s included and how changes are handled.
              </p>
              <a href="#project-inquiry" className="contracting-text-link">
                Talk through your scope <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section
          className="contracting-section contracting-container"
          aria-labelledby="contracting-process-heading"
        >
          <div className="contracting-section-heading">
            <p className="contracting-eyebrow">FROM THE FIRST CONVERSATION</p>
            <h2 id="contracting-process-heading">A clear place to start.</h2>
          </div>
          <ol className="contracting-process">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="contracting-faq-section"
          aria-labelledby="contracting-faq-heading"
        >
          <div className="contracting-container contracting-faq-grid">
            <div>
              <p className="contracting-eyebrow">BEFORE WE GET STARTED</p>
              <h2 id="contracting-faq-heading">
                Good questions.
                <br />
                Clear answers.
              </h2>
            </div>
            <div className="contracting-faq">
              <details>
                <summary>Where do you work?</summary>
                <p>
                  Our focus is North Central Florida. Send us your county and
                  property location so we can confirm coverage and project fit.
                </p>
              </details>
              <details>
                <summary>Do I need to find my own subcontractors?</summary>
                <p>
                  No. We provide and manage the subcontractors for our agreed
                  scope. If you already have a home dealer or installer, let us
                  know so we can coordinate with them.
                </p>
              </details>
              <details>
                <summary>Is the flat fee the total project price?</summary>
                <p>
                  No. It is the fee for our GC services. Construction,
                  subcontractor, material, permitting, and other project costs
                  are separate and addressed in your proposal.
                </p>
              </details>
              <details>
                <summary>
                  Can I use an owner-builder permit for an investment project?
                </summary>
                <p>
                  Florida’s ordinary owner-builder exemption is for the owner’s
                  own use or occupancy, with the property not offered for sale
                  or lease. A sale, lease, or offer within one year after
                  completion creates a presumption that the construction was
                  undertaken for that purpose. Review the applicable
                  requirements before choosing your permitting approach.
                </p>
                <p>
                  <a
                    href="https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0489/Sections/0489.103.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read Florida Statutes §489.103(7){" "}
                    <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </details>
              <details>
                <summary>Do I still need a licensed home installer?</summary>
                <p>
                  Yes. Mobile-home installation requires the appropriate
                  installer license. Our GC service coordinates with that
                  installer and the other trades. An installer can also
                  subcontract within their authorized scope; the right
                  arrangement depends on your project and local permitting
                  requirements.
                </p>
                <p>
                  <a
                    href="https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0320/Sections/0320.8249.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Installer licensing requirements{" "}
                    <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </details>
            </div>
          </div>
        </section>

        <section
          className="contracting-section contracting-container contracting-contact-grid"
          id="project-inquiry"
          aria-labelledby="contracting-contact-heading"
        >
          <div className="contracting-contact-copy">
            <p className="contracting-eyebrow">LET’S BUILD A PLAN</p>
            <h2 id="contracting-contact-heading">
              Have a project
              <br />
              in mind?
            </h2>
            <p>
              Whether you’re evaluating a lot or have a home lined up, tell us
              where you’re starting. We’ll discuss the scope and whether our
              team is the right fit.
            </p>
            <div className="contracting-direct-contact">
              <a href="tel:+19043256275">
                (904) 325-6275 <span aria-hidden="true">↗</span>
              </a>
              <a href="mailto:hello@risingtidecapital.us">
                hello@risingtidecapital.us <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="contracting-affiliation">
              Rising Tide Contracting
              <br />
              <span>A Rising Tide Capital Partners service</span>
            </p>
          </div>
          <ContractingInquiry />
        </section>
      </div>
    </Layout>
  );
}
