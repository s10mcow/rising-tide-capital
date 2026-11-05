import Layout from "@/components/Layout";
import { getHomeById, homes } from "@/data/homes";
import type { HomeListing } from "@/data/homes";
import { DEALER_LICENSE_LINE } from "@/lib/dealer-license";
import { Link, useParams } from "react-router-dom";
import HomeContactSection from "./HomeContactSection";
import ListingDetail from "./ListingDetail";
import { HOME_SALES_DISCLAIMER } from "./listing-format";

export function HomeListingRoute({
  listings = homes,
}: {
  listings?: readonly HomeListing[];
}) {
  const { id } = useParams();
  const home = id ? getHomeById(id, listings) : undefined;
  return (
    <Layout>
      <div className="homes-page">
        {home ? (
          <ListingDetail home={home} />
        ) : (
          <>
            <section
              className="page-hero"
              aria-labelledby="missing-listing-heading"
            >
              <div className="site-container">
                <Link className="text-link light" to="/homes-for-sale">
                  ← All homes
                </Link>
                <p className="eyebrow light">HOMES FOR SALE</p>
                <h1 id="missing-listing-heading">Listing not found.</h1>
                <p>
                  We couldn’t find that listing. New inventory coming soon,
                  contact us.
                </p>
                <p className="dealer-license">{DEALER_LICENSE_LINE}</p>
              </div>
            </section>
            <section className="site-section site-container">
              <p className="homes-disclaimer">{HOME_SALES_DISCLAIMER}</p>
            </section>
            <HomeContactSection />
          </>
        )}
      </div>
    </Layout>
  );
}

export default function HomeListingPage() {
  return <HomeListingRoute />;
}
