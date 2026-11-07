import Layout from "@/components/Layout";
import {
  CATALOG_DISCLAIMER,
  catalog,
  formatBaths,
  formatSqft,
  getPlanBySlug,
  manufacturerById,
  planDimensions,
  similarPlans,
  type CatalogPlan,
} from "@/data/catalog";
import { safePhotoSrc } from "@/data/homes";
import { useState } from "react";
import { Link } from "react-router-dom";
import HomeContactSection from "../Homes/HomeContactSection";
import CatalogCard from "./CatalogCard";

function PhotoCarousel({ plan }: { plan: CatalogPlan }) {
  const photos = plan.photos
    .map((photo) => safePhotoSrc(photo))
    .filter((photo): photo is string => Boolean(photo));
  const [index, setIndex] = useState(0);
  const current = photos[index] ?? photos[0];
  return (
    <div className="catalog-carousel" aria-roledescription="carousel">
      {current ? (
        <img src={current} alt={`${plan.model} photo ${index + 1}`} />
      ) : (
        <div className="catalog-photo-fallback">Photo not shown</div>
      )}
      {photos.length > 1 ? (
        <div className="catalog-carousel-controls">
          <button
            type="button"
            onClick={() =>
              setIndex((value) => (value - 1 + photos.length) % photos.length)
            }
          >
            Previous photo
          </button>
          <button
            type="button"
            onClick={() => setIndex((value) => (value + 1) % photos.length)}
          >
            Next photo
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default function CatalogDetail({
  slug,
  plans = catalog,
}: {
  slug: string;
  plans?: readonly CatalogPlan[];
}) {
  const plan = getPlanBySlug(slug, plans);
  if (!plan) {
    return (
      <Layout>
        <div className="homes-page">
          <section className="page-hero" aria-labelledby="missing-plan-heading">
            <div className="site-container">
              <Link className="text-link light" to="/homes">
                ← Floor plans
              </Link>
              <p className="eyebrow light">FLOOR PLANS</p>
              <h1 id="missing-plan-heading">Floor plan not found.</h1>
              <p>That model is not in the catalog. Browse the plans we list.</p>
            </div>
          </section>
        </div>
      </Layout>
    );
  }
  const maker = manufacturerById(plan.manufacturer);
  const floorPlan = plan.floorPlanImage
    ? safePhotoSrc(plan.floorPlanImage)
    : null;
  const related = similarPlans(plan, plans);
  return (
    <Layout>
      <div className="homes-page">
        <section
          className="page-hero listing-hero"
          aria-labelledby="plan-heading"
        >
          <div className="site-container">
            <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
              <Link to="/homes">Floor plans</Link>
              <span aria-hidden="true"> / </span>
              <Link to={`/homes/${plan.manufacturer}`}>{maker.name}</Link>
              <span aria-hidden="true"> / </span>
              <span>{plan.model}</span>
            </nav>
            <p className="eyebrow light">
              {maker.name} / {plan.series}
            </p>
            <h1 id="plan-heading">{plan.model}</h1>
            <p>
              Manufacturer floor plan. Not an in-stock home. Call for pricing.
            </p>
          </div>
        </section>
        <section className="site-section site-container">
          <div className="catalog-detail">
            <div>
              <PhotoCarousel plan={plan} />
              <figure className="catalog-floorplan">
                <figcaption>Floor plan</figcaption>
                {floorPlan ? (
                  <img src={floorPlan} alt={`${plan.model} floor plan`} />
                ) : (
                  <div className="catalog-photo-fallback">
                    Floor plan not shown
                  </div>
                )}
              </figure>
              {plan.features.length > 0 ? (
                <>
                  <h2>Features</h2>
                  <ul className="catalog-features">
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
            <aside className="catalog-spec-card">
              <h2>Specifications</h2>
              <dl className="listing-specs">
                <div>
                  <dt>Manufacturer</dt>
                  <dd>{maker.name}</dd>
                </div>
                <div>
                  <dt>Series</dt>
                  <dd>{plan.series}</dd>
                </div>
                <div>
                  <dt>Beds</dt>
                  <dd>{plan.beds}</dd>
                </div>
                <div>
                  <dt>Baths</dt>
                  <dd>{formatBaths(plan.baths)}</dd>
                </div>
                <div>
                  <dt>Sq ft</dt>
                  <dd>{formatSqft(plan.sqft)}</dd>
                </div>
                {planDimensions(plan) ? (
                  <div>
                    <dt>Dimensions</dt>
                    <dd>{planDimensions(plan)}</dd>
                  </div>
                ) : null}
                {plan.sectionLabel ? (
                  <div>
                    <dt>Sections</dt>
                    <dd>{plan.sectionLabel}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Price</dt>
                  <dd>Call for pricing</dd>
                </div>
              </dl>
              <a className="site-button dark" href="#home-inquiry">
                Request info <span aria-hidden="true">↗</span>
              </a>
              <p>
                <a href={plan.sourceUrl} rel="noreferrer">
                  Manufacturer page <span aria-hidden="true">↗</span>
                </a>
              </p>
            </aside>
          </div>
          <p className="homes-disclaimer">{CATALOG_DISCLAIMER}</p>
          {related.length > 0 ? (
            <div className="catalog-similar">
              <h2>Similar floor plans</h2>
              <div className="catalog-grid">
                {related.map((item) => (
                  <CatalogCard key={item.slug} plan={item} />
                ))}
              </div>
            </div>
          ) : null}
        </section>
        <HomeContactSection regarding={plan.model} />
      </div>
    </Layout>
  );
}
