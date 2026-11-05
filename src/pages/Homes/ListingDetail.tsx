import { safePhotoSrc } from "@/data/homes";
import type { HomeListing } from "@/data/homes";
import { DEALER_LICENSE_LINE } from "@/lib/dealer-license";
import { Link } from "react-router-dom";
import HomeContactSection from "./HomeContactSection";
import {
  HOME_SALES_DISCLAIMER,
  displayText,
  formatHomePrice,
  listingFacts,
  statusLabel,
} from "./listing-format";

export default function ListingDetail({ home }: { home: HomeListing }) {
  const photos = home.photos
    .map((item) => safePhotoSrc(item))
    .filter((item): item is string => Boolean(item));
  const title = displayText(home.title);
  return (
    <>
      <section
        className="page-hero listing-hero"
        aria-labelledby="listing-heading"
      >
        <div className="site-container">
          <Link className="text-link light" to="/homes-for-sale">
            ← All homes
          </Link>
          <p className="eyebrow light">{statusLabel(home.status)}</p>
          <h1 id="listing-heading">{title}</h1>
          <p>{displayText(home.location)}</p>
          <p className="dealer-license">{DEALER_LICENSE_LINE}</p>
        </div>
      </section>
      <section
        className="site-section site-container"
        aria-labelledby="listing-details-heading"
      >
        <p className="homes-disclaimer">{HOME_SALES_DISCLAIMER}</p>
        <div className="listing-detail-grid">
          <div>
            {photos.length > 0 ? (
              <div className="listing-gallery">
                {photos.map((photo, index) => (
                  <img
                    key={photo}
                    src={photo}
                    alt={
                      photos.length > 1 ? `${title}, photo ${index + 1}` : title
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="listing-photo-fallback">No photo on file</div>
            )}
          </div>
          <div>
            <h2 id="listing-details-heading">Details on file</h2>
            <p className="listing-price">{formatHomePrice(home.price)}</p>
            <dl className="listing-specs">
              {listingFacts(home).map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <h2 id="listing-description-heading">Description</h2>
            <p className="listing-description" id="listing-description">
              {displayText(home.description)}
            </p>
          </div>
        </div>
      </section>
      <HomeContactSection regarding={title} />
    </>
  );
}
