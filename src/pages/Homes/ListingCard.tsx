import { safePhotoSrc } from "@/data/homes";
import type { HomeListing } from "@/data/homes";
import { Link } from "react-router-dom";
import {
  displayText,
  formatHomePrice,
  listingFacts,
  statusLabel,
} from "./listing-format";

export default function ListingCard({ home }: { home: HomeListing }) {
  const photo = home.photos
    .map((item) => safePhotoSrc(item))
    .find((item): item is string => Boolean(item));
  return (
    <article className="listing-card">
      <Link to={`/homes-for-sale/${encodeURIComponent(home.id)}`}>
        {photo ? (
          <img src={photo} alt={home.title} />
        ) : (
          <div className="listing-photo-fallback">No photo on file</div>
        )}
        <div className="listing-card-body">
          <p className="listing-status">{statusLabel(home.status)}</p>
          <h3>{displayText(home.title)}</h3>
          <p className="listing-location">{displayText(home.location)}</p>
          <p className="listing-price">{formatHomePrice(home.price)}</p>
          <dl className="listing-specs">
            {listingFacts(home).map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <span className="text-link">
            View this home <span aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
