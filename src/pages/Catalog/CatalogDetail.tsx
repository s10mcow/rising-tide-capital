import Layout from "@/components/Layout";
import {
  CATALOG_DISCLAIMER,
  SERIES_FEATURES_LABEL,
  catalog,
  formatBaths,
  formatSqft,
  getPlanBySlug,
  manufacturerById,
  matterportTourSrc,
  planDimensions,
  planLineage,
  similarPlans,
  type CatalogPlan,
} from "@/data/catalog";
import { safePhotoSrc } from "@/data/homes";
import { useState } from "react";
import { Link } from "react-router-dom";
import HomeContactSection from "../Homes/HomeContactSection";
import CatalogCard from "./CatalogCard";

function PhotoGallery({ plan }: { plan: CatalogPlan }) {
  const photos = plan.photos
    .map((photo) => safePhotoSrc(photo))
    .filter((photo): photo is string => Boolean(photo));
  const [index, setIndex] = useState(0);
  const current = photos[index] ?? photos[0];
  return (
    <div className="catalog-gallery-block">
      <div className="catalog-carousel" aria-roledescription="carousel">
        {current ? (
          <img
            src={current}
            alt={`${plan.model} photo ${index + 1}`}
            decoding="async"
          />
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
      {photos.length > 1 ? (
        <div className="catalog-gallery">
          {photos.map((photo, photoIndex) => (
            <button
              key={`${photo}-${photoIndex}`}
              type="button"
              aria-label={`Show photo ${photoIndex + 1} of ${plan.model}`}
              aria-current={photoIndex === index ? "true" : undefined}
              onClick={() => setIndex(photoIndex)}
            >
              <img
                src={photo}
                alt=""
                loading={photoIndex < 6 ? "eager" : "lazy"}
                decoding="async"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FloorPlanFigure({ plan }: { plan: CatalogPlan }) {
  const floorPlan = plan.floorPlanImage
    ? safePhotoSrc(plan.floorPlanImage)
    : null;
  const pdf = plan.floorPlanPdf ? safePhotoSrc(plan.floorPlanPdf) : null;
  return (
    <figure className="catalog-floorplan">
      <figcaption>Floor plan</figcaption>
      {floorPlan ? (
        <img
          src={floorPlan}
          alt={`${plan.model} floor plan`}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="catalog-photo-fallback">Floor plan not shown</div>
      )}
      {pdf ? (
        <a className="catalog-download" href={pdf} download>
          Download floor plan (PDF)
        </a>
      ) : null}
    </figure>
  );
}

function Tours({ plan }: { plan: CatalogPlan }) {
  const tours = (plan.tours ?? [])
    .map((tour) => ({ ...tour, href: matterportTourSrc(tour.href) }))
    .filter((tour): tour is { href: string; label: string } =>
      Boolean(tour.href),
    );
  const [open, setOpen] = useState<number | null>(null);
  if (tours.length === 0) return null;
  return (
    <div className="catalog-tours">
      <h2>3D tour</h2>
      {tours.map((tour, index) => (
        <div key={tour.href} className="catalog-tour">
          {open === index ? (
            <iframe
              title={`${plan.model} 3D tour${
                tours.length > 1 ? ` ${index + 1}` : ""
              }`}
              src={tour.href}
              loading="lazy"
              allowFullScreen
              allow="fullscreen; xr-spatial-tracking"
            />
          ) : (
            <button
              type="button"
              className="site-button dark"
              onClick={() => setOpen(index)}
            >
              {tours.length > 1 ? `Load 3D tour ${index + 1}` : "Load 3D tour"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function SeriesFeatures({ plan }: { plan: CatalogPlan }) {
  const sections = plan.seriesFeatures ?? [];
  if (sections.length === 0) return null;
  return (
    <div className="catalog-series-features">
      <h2>{SERIES_FEATURES_LABEL}</h2>
      {sections.map((section, sectionIndex) => (
        <div key={`${section.heading}-${sectionIndex}`}>
          {section.heading ? <h3>{section.heading}</h3> : null}
          <ul className="catalog-features">
            {section.items.map((feature, index) => (
              <li key={`${section.heading}-${index}`}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
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
            <p className="eyebrow light">{planLineage(plan, maker.name)}</p>
            <h1 id="plan-heading">{plan.model}</h1>
            <p>
              Manufacturer floor plan. Not an in-stock home. Call for pricing.
            </p>
          </div>
        </section>
        <section className="site-section site-container">
          <div className="catalog-detail">
            <div>
              <PhotoGallery plan={plan} />
              <FloorPlanFigure plan={plan} />
              <Tours plan={plan} />
              <SeriesFeatures plan={plan} />
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
                {plan.brand ? (
                  <div>
                    <dt>Brand</dt>
                    <dd>{plan.brand}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Series</dt>
                  <dd>{plan.series}</dd>
                </div>
                {plan.beds != null ? (
                  <div>
                    <dt>Beds</dt>
                    <dd>{plan.beds}</dd>
                  </div>
                ) : null}
                {plan.baths != null ? (
                  <div>
                    <dt>Baths</dt>
                    <dd>{formatBaths(plan.baths)}</dd>
                  </div>
                ) : null}
                {plan.sqft != null ? (
                  <div>
                    <dt>Sq ft</dt>
                    <dd>{formatSqft(plan.sqft)}</dd>
                  </div>
                ) : null}
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
              {plan.configurationNote && <p>{plan.configurationNote}</p>}
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
