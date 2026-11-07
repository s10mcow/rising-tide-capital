import {
  catalog,
  formatBaths,
  getPlanBySlug,
  isManufacturerId,
  manufacturerById,
  planDimensions,
  type CatalogPlan,
} from "../data/catalog.ts";
import {
  absolutePhotoUrl,
  getHomeById,
  homes,
  type HomeListing,
} from "../data/homes.ts";

export const SITE_URL = "https://risingtidecapital.us";
export const DEFAULT_META = {
  title: "Rising Tide Capital Partners - Real Estate Development & Investment",
  description:
    "Florida-based real estate investment and land acquisition, with general contracting for mobile and manufactured-home projects in North Central Florida.",
  image: `${SITE_URL}/og-image.jpg`,
};
export const PAGE_METADATA: Record<string, typeof DEFAULT_META> = {
  "/privacy": {
    ...DEFAULT_META,
    title: "Privacy Policy | Rising Tide Capital Partners",
  },
  "/terms": {
    ...DEFAULT_META,
    title: "Terms & Conditions | Rising Tide Capital Partners",
  },
  "/sms-optin": {
    ...DEFAULT_META,
    title: "SMS Updates | Rising Tide Capital Partners",
  },
  "/closing-process": {
    title:
      "What to Expect from the Closing Process - Rising Tide Capital Partners",
    description:
      "Learn what to expect during the closing process with Rising Tide Capital Partners. Most closings complete within 45-60 days. View our step-by-step timeline.",
    image: `${SITE_URL}/og-image.jpg`,
  },
  "/contracting": {
    title: "Rising Tide Contracting | North Central Florida Land-Home GC",
    description:
      "General contracting for mobile and manufactured-home projects in North Central Florida. Permitting, our subcontractor team, installer coordination, and flat-fee GC services.",
    image: `${SITE_URL}/contracting-home.webp`,
  },
  "/homes-for-sale": {
    title: "Homes for Sale | Rising Tide Capital Partners",
    description:
      "Rising Tide Capital Partners is a licensed Florida mobile and manufactured home dealer. See current homes for sale, or contact us while new inventory is on the way.",
    image: `${SITE_URL}/og-image.jpg`,
  },
  "/homes": {
    title: "Floor Plans | Rising Tide Capital Partners",
    description:
      "Floor plans published by Clayton, Cavco, Palm Harbor, and Champion. These are model references, not homes in stock. Call for pricing.",
    image: `${SITE_URL}/og-image.jpg`,
  },
  "/homes/clayton": {
    title: "Clayton Floor Plans | Rising Tide Capital Partners",
    description:
      "Clayton floor plans published by the manufacturer. These are model references, not homes in stock. Call for pricing.",
    image: `${SITE_URL}/og-image.jpg`,
  },
  "/homes/cavco": {
    title: "Cavco Floor Plans | Rising Tide Capital Partners",
    description:
      "Cavco floor plans published by the manufacturer. These are model references, not homes in stock. Call for pricing.",
    image: `${SITE_URL}/og-image.jpg`,
  },
  "/homes/palm-harbor": {
    title: "Palm Harbor Floor Plans | Rising Tide Capital Partners",
    description:
      "Palm Harbor floor plans published by the manufacturer. These are model references, not homes in stock. Call for pricing.",
    image: `${SITE_URL}/og-image.jpg`,
  },
  "/homes/champion": {
    title: "Champion Floor Plans | Rising Tide Capital Partners",
    description:
      "Champion floor plans published by the manufacturer. These are model references, not homes in stock. Call for pricing.",
    image: `${SITE_URL}/og-image.jpg`,
  },
};

function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

export function homeListingIdFromPath(pathname: string): string | null {
  const match = /^\/homes-for-sale\/([^/]+)$/.exec(normalizePath(pathname));
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export function catalogSlugFromPath(pathname: string): string | null {
  const match = /^\/homes\/([^/]+)$/.exec(normalizePath(pathname));
  if (!match) return null;
  let slug = match[1];
  try {
    slug = decodeURIComponent(slug);
  } catch {
    /* Keep the raw segment. */
  }
  return isManufacturerId(slug) ? null : slug;
}

function planImage(plan: CatalogPlan): string {
  const candidates = [...plan.photos];
  if (plan.floorPlanImage) candidates.push(plan.floorPlanImage);
  for (const photo of candidates) {
    const absolute = absolutePhotoUrl(photo, SITE_URL);
    if (absolute) return absolute;
  }
  return DEFAULT_META.image;
}

function metadataForPlan(plan: CatalogPlan, path: string) {
  const maker = manufacturerById(plan.manufacturer).name;
  const dimensions = planDimensions(plan);
  const description = `${plan.model} by ${maker}, ${plan.series}. ${
    plan.beds
  } bedrooms, ${formatBaths(plan.baths)} bathrooms, ${plan.sqft} sq ft${
    dimensions ? `, ${dimensions}` : ""
  }${
    plan.sectionLabel ? `, ${plan.sectionLabel}` : ""
  }. Manufacturer floor plan, not an in-stock home. Call for pricing.`;
  return {
    title: `${plan.model} | Floor Plans | Rising Tide Capital Partners`,
    description,
    image: planImage(plan),
    url: `${SITE_URL}${path}`,
  };
}

function listingImage(home: HomeListing): string {
  for (const photo of home.photos) {
    const absolute = absolutePhotoUrl(photo, SITE_URL);
    if (absolute) return absolute;
  }
  return DEFAULT_META.image;
}

function metadataForHomeListing(home: HomeListing, path: string) {
  const description =
    home.description.trim() ||
    `${home.title}. Contact Rising Tide Capital Partners for current details. Prices, availability, and specifications are confirmed at sale.`;
  return {
    title: `${home.title} | Homes for Sale | Rising Tide Capital Partners`,
    description,
    image: listingImage(home),
    url: `${SITE_URL}${path}`,
  };
}

export function getPageMetadata(
  pathname: string,
  listings: readonly HomeListing[] = homes,
) {
  const path = normalizePath(pathname);
  const staticMeta = PAGE_METADATA[path];
  if (staticMeta) return { ...staticMeta, url: `${SITE_URL}${path}` };
  const planSlug = catalogSlugFromPath(path);
  if (planSlug) {
    const plan = getPlanBySlug(planSlug, catalog);
    if (plan) return metadataForPlan(plan, path);
    return {
      title: "Floor plan not found | Rising Tide Capital Partners",
      description:
        "That floor plan is not listed. These pages show orderable manufacturer models, not homes in stock.",
      image: DEFAULT_META.image,
      url: `${SITE_URL}${path}`,
    };
  }
  const id = homeListingIdFromPath(path);
  if (id) {
    const home = getHomeById(id, listings);
    if (home) return metadataForHomeListing(home, path);
    return {
      title: "Listing not found | Rising Tide Capital Partners",
      description:
        "New inventory coming soon, contact us. Rising Tide Capital Partners is a licensed Florida mobile and manufactured home dealer.",
      image: DEFAULT_META.image,
      url: `${SITE_URL}${path}`,
    };
  }
  return { ...DEFAULT_META, url: `${SITE_URL}${path}` };
}

export function shouldRewriteMetadata(
  pathname: string,
  listings: readonly HomeListing[] = homes,
): boolean {
  const path = normalizePath(pathname);
  if (PAGE_METADATA[path]) return true;
  const planSlug = catalogSlugFromPath(path);
  if (planSlug && getPlanBySlug(planSlug, catalog)) return true;
  const id = homeListingIdFromPath(path);
  return Boolean(id && getHomeById(id, listings));
}

export function metadataValues(
  pathname: string,
  listings?: readonly HomeListing[],
): Record<string, string> {
  const meta = getPageMetadata(pathname, listings);
  return {
    title: meta.title,
    description: meta.description,
    "og:title": meta.title,
    "og:description": meta.description,
    "og:url": meta.url,
    "og:image": meta.image,
    "twitter:title": meta.title,
    "twitter:description": meta.description,
    "twitter:url": meta.url,
    "twitter:image": meta.image,
  };
}
// Support both source HTML and Vite's minified, unquoted attribute syntax.
export function renderPageMetadata(
  html: string,
  pathname: string,
  listings: readonly HomeListing[] = homes,
): string {
  const path = normalizePath(pathname);
  if (!shouldRewriteMetadata(path, listings)) return html;
  const meta = getPageMetadata(path, listings);
  const values = metadataValues(path, listings);
  const escape = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const attribute = (tag: string, name: string) =>
    tag
      .match(
        new RegExp(
          `\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
          "i",
        ),
      )
      ?.slice(1)
      .find((value) => value !== undefined);
  return html
    .replace(/<title>[^<]*<\/title>/i, `<title>${escape(meta.title)}</title>`)
    .replace(/<meta\b[^>]*>/gi, (tag) => {
      const kind = attribute(tag, "property") ? "property" : "name";
      const key = attribute(tag, kind);
      return key && values[key]
        ? `<meta ${kind}="${key}" content="${escape(values[key])}" />`
        : tag;
    })
    .replace(/<link\b[^>]*>/gi, (tag) =>
      attribute(tag, "rel") === "canonical"
        ? `<link rel="canonical" href="${meta.url}" />`
        : tag,
    );
}
