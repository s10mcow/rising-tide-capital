import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="site-main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="site-container">
          <div className="footer-grid">
            <div className="footer-intro">
              <Link to="/" aria-label="Rising Tide home">
                <Brand />
              </Link>
              <p>
                Florida roots. A practical approach to land, homes, and what
                comes next.
              </p>
            </div>
            <div>
              <h2>Explore</h2>
              <Link to="/#our-work">Land & property</Link>
              <Link to="/contracting">General contracting</Link>
              <Link to="/closing-process">Closing guide</Link>
              <Link to="/#about">Meet our team</Link>
            </div>
            <div>
              <h2>Let’s connect</h2>
              <a href="tel:+19043256275">(904) 325-6275</a>
              <a href="mailto:hello@risingtidecapital.us">
                hello@risingtidecapital.us
              </a>
              <address>
                PO Box 1242
                <br />
                Flagler Beach, FL 32136
              </address>
            </div>
            <div>
              <h2>Get to know us</h2>
              <a
                href="https://www.bbb.org/us/fl/flagler-beach/profile/real-estate/rising-tide-capital-partners-0403-236031027/"
                target="_blank"
                rel="noreferrer"
              >
                Our BBB profile ↗
              </a>
              <a
                href="https://www.google.com/search?q=Rising+Tide+Capital+Partners+LLC+Reviews"
                target="_blank"
                rel="noreferrer"
              >
                Google reviews ↗
              </a>
              <Link to="/sms-optin">SMS updates</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Rising Tide Capital Partners LLC
            </span>
            <div>
              <Link to="/privacy">Privacy policy</Link>
              <Link to="/terms">Terms & conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
