import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
const steps = [
  {
    title: "Contract Signed",
    text: "The executed contract is submitted to the title company to begin the process.",
  },
  {
    title: "Title Search & Due Diligence",
    text: "Title search (7–10 business days) and builder due diligence (up to 30 days).",
  },
  {
    title: "Identity Verification",
    text: "Completed via ClosingLock or later with a notary.",
  },
  {
    title: "Documents Sent",
    text: "Closing documents are FedExed directly to you.",
  },
  {
    title: "Notarization",
    text: "Mobile notary or a notary of your choice if identity was verified earlier.",
  },
  {
    title: "Return Documents",
    text: "Documents returned to Steel City Title.",
  },
  { title: "Closing", text: "Closing takes place on the following Monday." },
  {
    title: "Proceeds Delivered",
    text: "Proceeds are overnighted to you via FedEx.",
  },
];
export default function ClosingProcess() {
  return (
    <Layout>
      <div className="closing-page">
        <section className="page-hero">
          <div className="site-container">
            <Link className="text-link light" to="/">
              ← Back to Rising Tide
            </Link>
            <p className="eyebrow light">THE LAND SELLER’S GUIDE</p>
            <h1>
              A clear path
              <br />
              <em>to closing.</em>
            </h1>
            <p>
              From a signed agreement to proceeds delivered, here’s what to
              expect when you sell your land to Rising Tide.
            </p>
            <div className="timeline-note">
              <strong>Typically 45–60 days</strong>
              <span>
                Timing depends on your contract and the title process.
              </span>
            </div>
          </div>
        </section>
        <section
          className="site-section site-container closing-grid"
          aria-labelledby="closing-heading"
        >
          <div className="closing-intro">
            <p className="eyebrow">STEP BY STEP</p>
            <h2 id="closing-heading">
              Know what
              <br />
              comes next.
            </h2>
            <p>
              Our team and the title company will guide you through the details.
              Your agreement and closing instructions set the timing for your
              transaction.
            </p>
            <a className="text-link" href="tel:+19043256275">
              Have a question? Call us ↗
            </a>
          </div>
          <ol className="closing-timeline">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="step-index">0{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="process-band">
          <div className="site-container">
            <p className="eyebrow">HELPFUL RESOURCES</p>
            <h2>Your closing team.</h2>
            <div className="resource-grid">
              <a
                href="https://steelcitytitle.com"
                target="_blank"
                rel="noreferrer"
              >
                <span>THE TITLE COMPANY ↗</span>
                <h3>Steel City Title</h3>
                <p>Title work and transaction coordination.</p>
              </a>
              <a
                href="https://closinglock.com"
                target="_blank"
                rel="noreferrer"
              >
                <span>IDENTITY VERIFICATION ↗</span>
                <h3>ClosingLock</h3>
                <p>Secure identity verification during closing.</p>
              </a>
            </div>
          </div>
        </section>
        <section className="site-section site-container closing-contact">
          <p className="eyebrow">WE’RE HERE TO HELP</p>
          <h2>Questions along the way?</h2>
          <p>Reach out to our team about your property or closing.</p>
          <div className="site-actions">
            <a className="site-button dark" href="tel:+19043256275">
              Call (904) 325-6275 ↗
            </a>
            <a className="text-link" href="mailto:hello@risingtidecapital.us">
              Email our team ↗
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
