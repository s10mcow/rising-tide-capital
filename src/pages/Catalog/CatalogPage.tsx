import Layout from "@/components/Layout";
import {
  CATALOG_DISCLAIMER,
  MANUFACTURERS,
  catalog,
  catalogPath,
  filterPlans,
  groupPlans,
  isManufacturerId,
  parseCatalogQuery,
  seriesOptions,
  type CatalogPlan,
  type CatalogQuery,
  type ManufacturerId,
  type SectionCount,
} from "@/data/catalog";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CatalogCard from "./CatalogCard";

const BEDS = [1, 2, 3, 4, 5];
const BATHS = [1, 2, 3];
const SECTIONS: { value: SectionCount; label: string }[] = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double-wide" },
  { value: "triple", label: "Triple-wide" },
  { value: "multi", label: "Multi-Section" },
];

export default function CatalogPage({
  plans = catalog,
  manufacturer,
}: {
  plans?: readonly CatalogPlan[];
  manufacturer?: ManufacturerId;
}) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const query = parseCatalogQuery(params);
  const active = manufacturer ?? query.manufacturer;
  const effective: CatalogQuery = { ...query, manufacturer: active };
  const filtered = filterPlans(plans, effective);
  const groups = groupPlans(filtered, effective).filter(
    (group) => !active || group.id === active,
  );
  const series = seriesOptions(plans, active);

  function apply(next: Partial<CatalogQuery>, maker = active) {
    navigate(
      catalogPath(maker, { ...effective, ...next, manufacturer: maker }),
    );
  }

  return (
    <Layout>
      <div className="homes-page">
        <section className="page-hero" aria-labelledby="catalog-heading">
          <div className="site-container">
            <p className="eyebrow light">FLOOR PLANS</p>
            <h1 id="catalog-heading">
              Floor plans.
              <br />
              <em>Grouped by maker.</em>
            </h1>
            <p>
              Floor plans published by Clayton, Cavco, Palm Harbor, and
              Champion. These are model references, not homes in stock. Specs
              and pictures come from the manufacturer page for that model. Call
              to ask about pricing and what we can order.
            </p>
            <div className="site-actions">
              <Link className="site-button" to="/homes-for-sale">
                Homes for sale <span aria-hidden="true">↗</span>
              </Link>
              <a className="text-link light" href="tel:+19043256275">
                Call (904) 325-6275
              </a>
            </div>
          </div>
        </section>
        <section
          className="site-section site-container"
          aria-labelledby="catalog-results-heading"
        >
          <h2 id="catalog-results-heading" className="visually-hidden">
            Floor plan results
          </h2>
          <nav className="catalog-tabs" aria-label="Manufacturers">
            <Link
              to={catalogPath(undefined, effective)}
              aria-current={active ? undefined : "page"}
            >
              All
            </Link>
            {MANUFACTURERS.map((maker) => (
              <Link
                key={maker.id}
                to={catalogPath(maker.id, effective)}
                aria-current={active === maker.id ? "page" : undefined}
              >
                {maker.name}
              </Link>
            ))}
          </nav>
          {active ? null : (
            <nav className="catalog-jumps" aria-label="Jump to a manufacturer">
              {MANUFACTURERS.map((maker) => (
                <a key={maker.id} href={`#${maker.id}`}>
                  {maker.name}
                </a>
              ))}
            </nav>
          )}
          <form
            className="catalog-filters"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <label>
              Search
              <input
                name="q"
                type="search"
                value={query.q}
                placeholder="Model, series, or maker"
                onChange={(event) => apply({ q: event.target.value })}
              />
            </label>
            <label>
              Manufacturer
              <select
                name="manufacturer"
                value={active ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  apply(
                    { series: "" },
                    value && isManufacturerId(value) ? value : undefined,
                  );
                }}
              >
                <option value="">All</option>
                {MANUFACTURERS.map((maker) => (
                  <option key={maker.id} value={maker.id}>
                    {maker.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Series
              <select
                name="series"
                value={series.includes(query.series) ? query.series : ""}
                onChange={(event) => apply({ series: event.target.value })}
              >
                <option value="">All</option>
                {series.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Sort
              <select
                name="sort"
                value={query.sort}
                onChange={(event) =>
                  apply({
                    sort: event.target.value as CatalogQuery["sort"],
                  })
                }
              >
                <option value="beds">Beds, then sq ft</option>
                <option value="sqft-asc">Sq ft, low to high</option>
                <option value="sqft-desc">Sq ft, high to low</option>
              </select>
            </label>
            <label>
              Beds
              <select
                name="beds"
                value={query.beds ?? ""}
                onChange={(event) =>
                  apply({
                    beds: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  })
                }
              >
                <option value="">Any</option>
                {BEDS.map((beds) => (
                  <option key={beds} value={beds}>
                    {beds}+
                  </option>
                ))}
              </select>
            </label>
            <label>
              Baths
              <select
                name="baths"
                value={query.baths ?? ""}
                onChange={(event) =>
                  apply({
                    baths: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  })
                }
              >
                <option value="">Any</option>
                {BATHS.map((baths) => (
                  <option key={baths} value={baths}>
                    {baths}+
                  </option>
                ))}
              </select>
            </label>
            <label>
              Sections
              <select
                name="sections"
                value={query.sections ?? ""}
                onChange={(event) =>
                  apply({
                    sections: event.target.value
                      ? (event.target.value as SectionCount)
                      : undefined,
                  })
                }
              >
                <option value="">Any</option>
                {SECTIONS.map((section) => (
                  <option key={section.value} value={section.value}>
                    {section.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Min sq ft
              <input
                name="sqftMin"
                inputMode="numeric"
                value={query.sqftMin ?? ""}
                onChange={(event) =>
                  apply({
                    sqftMin: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  })
                }
              />
            </label>
            <label>
              Max sq ft
              <input
                name="sqftMax"
                inputMode="numeric"
                value={query.sqftMax ?? ""}
                onChange={(event) =>
                  apply({
                    sqftMax: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  })
                }
              />
            </label>
          </form>
          <p className="homes-disclaimer">{CATALOG_DISCLAIMER}</p>
          {groups.map((group) => {
            const published = plans.some(
              (plan) => plan.manufacturer === group.id,
            );
            return (
              <section
                key={group.id}
                id={group.id}
                className="catalog-group"
                aria-labelledby={`${group.id}-heading`}
              >
                <h2 id={`${group.id}-heading`}>{group.name}</h2>
                {group.plans.length > 0 ? (
                  <div className="catalog-grid">
                    {group.plans.map((plan) => (
                      <CatalogCard key={plan.slug} plan={plan} />
                    ))}
                  </div>
                ) : (
                  <p className="catalog-empty">
                    {published
                      ? "No floor plans match these filters."
                      : group.gap}
                  </p>
                )}
              </section>
            );
          })}
        </section>
      </div>
    </Layout>
  );
}
