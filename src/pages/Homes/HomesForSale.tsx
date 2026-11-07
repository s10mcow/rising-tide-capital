import Layout from "@/components/Layout";
import { homes, type HomeListing } from "@/data/homes";
import { DEALER_LICENSE_LINE } from "@/lib/dealer-license";
import { Link } from "react-router-dom";
import HomeContactSection from "./HomeContactSection";
import ListingCard from "./ListingCard";
import { HOME_SALES_DISCLAIMER } from "./listing-format";

export function HomeInventory({
  listings = homes,
}: {
  listings?: readonly HomeListing[];
}) {
  return (
    <section
      className="site-section site-container"
      aria-labelledby="inventory-heading"
    >
      {listings.length === 0 ? (
        <div className="homes-empty">
          <p className="eyebrow">CURRENT INVENTORY</p>
          <h2 id="inventory-heading">New inventory coming soon, contact us.</h2>
          <p>
            There are no homes listed yet. Call or email and we’ll talk through
            what you’re looking for.
          </p>
          <div className="site-actions">
            <a className="site-button dark" href="tel:+19043256275">
              Call (904) 325-6275 <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="mailto:hello@risingtidecapital.us">
              hello@risingtidecapital.us <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="homes-disclaimer">{HOME_SALES_DISCLAIMER}</p>
        </div>
      ) : (
        <>
          <div className="section-intro">
            <div>
              <p className="eyebrow">CURRENT INVENTORY</p>
              <h2 id="inventory-heading">Homes we can show you.</h2>
            </div>
            <p>
              Each listing shows the details on file. Ask us to confirm them
              before you decide.
            </p>
          </div>
          <p className="homes-disclaimer">{HOME_SALES_DISCLAIMER}</p>
          <div className="listing-grid">
            {listings.map((home) => (
              <ListingCard key={home.id} home={home} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default function HomesForSale() {
  return (
    <Layout>
      <div className="homes-page">
        <section className="page-hero" aria-labelledby="homes-heading">
          <div className="site-container">
            <p className="eyebrow light">FLORIDA LICENSED DEALER</p>
            <h1 id="homes-heading">
              Homes for sale.
              <br />
              <em>Mobile & manufactured.</em>
            </h1>
            <p>
              Rising Tide Capital Partners is a licensed Florida mobile and
              manufactured home dealer. When a home is available, its details
              are listed here.
            </p>
            <p className="dealer-license">{DEALER_LICENSE_LINE}</p>
            <div className="site-actions">
              <a className="site-button" href="#home-inquiry">
                Contact us about a home <span aria-hidden="true">↗</span>
              </a>
              <Link className="text-link light" to="/homes">
                Floor plans
              </Link>
              <a className="text-link light" href="tel:+19043256275">
                Call (904) 325-6275
              </a>
            </div>
          </div>
        </section>
        <HomeInventory />
        <HomeContactSection />
      </div>
    </Layout>
  );
}
