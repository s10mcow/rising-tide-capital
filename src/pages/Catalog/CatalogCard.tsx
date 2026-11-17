import {
  manufacturerById,
  planFactLine,
  planLineage,
  type CatalogPlan,
} from "@/data/catalog";
import { safePhotoSrc } from "@/data/homes";
import { Link } from "react-router-dom";

export default function CatalogCard({ plan }: { plan: CatalogPlan }) {
  const maker = manufacturerById(plan.manufacturer).name;
  const photo = plan.photos
    .map((item) => safePhotoSrc(item))
    .find((item): item is string => Boolean(item));
  const facts = planFactLine(plan);
  return (
    <article className="catalog-card">
      {photo ? (
        <img
          src={photo}
          alt={`${plan.model} by ${maker}`}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="catalog-photo-fallback">Photo not shown</div>
      )}
      <div className="catalog-card-body">
        <p className="listing-status">{planLineage(plan, maker)}</p>
        <h3>{plan.model}</h3>
        {plan.sectionLabel ? (
          <p className="catalog-section">{plan.sectionLabel}</p>
        ) : null}
        {facts ? <p className="catalog-facts">{facts}</p> : null}
        <p className="listing-price">Call for pricing</p>
        <Link className="site-button" to={`/homes/${plan.slug}`}>
          View details <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
