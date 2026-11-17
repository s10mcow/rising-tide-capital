/**
 * Build src/data/lake-city-catalog.ts and the Lake City sitemap block
 * from public/catalog-media/champion-lake-city.
 *
 * The catalog module is TypeScript, not JSON, because the Netlify edge
 * bundler follows it from the OG function and rejects JSON imports.
 *
 * Specs come only from each pack's model.json. Model numbers are matched
 * to the existing Champion catalog as whole tokens (case-insensitive), not
 * by decoding a number into beds or square feet.
 *
 * Run: node tools/catalog-media/build-lake-city.mjs
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const mediaRoot = join(root, "public/catalog-media/champion-lake-city");
const manifest = JSON.parse(
  readFileSync(join(mediaRoot, "manifest.json"), "utf8"),
);
const catalogSrc = readFileSync(join(root, "src/data/catalog.ts"), "utf8");

const HEADINGS = new Set([
  "construction",
  "exterior",
  "exterior doors",
  "electrical",
  "interior",
  "interior drywall",
  "appliances",
  "kitchen",
  "baths",
  "bath",
  "warranty",
  "plumbing",
  "hvac",
  "general",
  "cabinets",
  "flooring",
  "windows",
  "doors",
  "insulation",
  "structural",
]);

function norm(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function tokens(value) {
  return String(value ?? "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function slugPart(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function catalogSlug(input) {
  const series = slugPart(input.series);
  const model = slugPart(input.model);
  const modelPart = model.startsWith(`${series}-`)
    ? model.slice(series.length + 1)
    : model;
  let slug = `${input.manufacturer}-${series}-${modelPart}`;
  const number = input.modelNumber ? slugPart(input.modelNumber) : "";
  if (number && !slug.endsWith(`-${number}`) && !slug.endsWith(number)) {
    slug = `${slug}-${number}`;
  }
  return slug;
}

function positiveNumber(value) {
  if (value == null || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return parsed;
}

function matterportUrl(link) {
  try {
    const url = new URL(String(link));
    if (url.protocol !== "https:" || url.hostname !== "my.matterport.com") {
      return null;
    }
    if (url.pathname !== "/show/") return null;
    const id = url.searchParams.get("m");
    if (!id || !/^[A-Za-z0-9]+$/.test(id)) return null;
    return `https://my.matterport.com/show/?m=${id}`;
  } catch {
    return null;
  }
}

function isBlockedTour(tour) {
  const name = norm(tour.model_name_on_sheet);
  if (name === "p256h42p01" || name.includes("p256h42p01")) return true;
  const link = String(tour.link ?? "");
  if (link.includes("DwgJSgkjXF2")) return true;
  return false;
}

function isHeading(line) {
  const key = line.toLowerCase().replace(/[:.]$/, "").trim();
  if (HEADINGS.has(key)) return true;
  return (
    line.length <= 32 &&
    line === line.toUpperCase() &&
    /[A-Z]/.test(line) &&
    !/\d/.test(line)
  );
}

function isBoilerplate(line) {
  return (
    line.startsWith("#") ||
    line.startsWith("Source:") ||
    line.startsWith("These are") ||
    line.startsWith("Individual homes") ||
    line.includes("Confirm with") ||
    line.includes("not a model-specific")
  );
}

function parseFeatures(text) {
  const sections = [];
  let current = { heading: "", items: [] };
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/\*\*/g, "").replace(/`/g, "").trim();
    if (!line || isBoilerplate(line) || /\$\s?\d/.test(line)) continue;
    if (isHeading(line)) {
      if (current.heading || current.items.length) sections.push(current);
      current = { heading: line.replace(/[:.]$/, "").trim(), items: [] };
      continue;
    }
    current.items.push(line);
  }
  if (current.heading || current.items.length) sections.push(current);
  return sections.filter((section) => section.heading || section.items.length);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

const catalogPlans = [];
const planPattern =
  /manufacturer:\s*"(clayton|cavco|palm-harbor|champion)",\s*series:\s*"([^"]+)",\s*model:\s*"([^"]+)",\s*modelNumber:\s*"([^"]+)"/g;
let match;
while ((match = planPattern.exec(catalogSrc))) {
  const plan = {
    manufacturer: match[1],
    series: match[2],
    model: match[3],
    modelNumber: match[4],
  };
  plan.slug = catalogSlug(plan);
  catalogPlans.push(plan);
}

const championPlans = catalogPlans.filter(
  (plan) => plan.manufacturer === "champion",
);
const usedSlugs = new Set(catalogPlans.map((plan) => plan.slug));

function exactModelMatch(lakeNumber) {
  const lake = norm(lakeNumber);
  if (lake.length < 4) return [];
  return championPlans.filter((plan) => {
    const full = norm(plan.modelNumber);
    const last = tokens(plan.modelNumber).at(-1) ?? "";
    return full === lake || last === lake;
  });
}

function holdReasons(entry, files) {
  const reasons = [];
  const number = norm(entry.modelNumber);
  const name = String(entry.modelName ?? "");
  const slug = entry.packSlug;
  if (
    number === "rh1351zll" ||
    norm(name).includes("rh1351zll") ||
    slug.includes("rh1351zll")
  ) {
    reasons.push(
      "RH1351ZLL is a custom home and must never be added to the website.",
    );
  }
  if (
    slug === "model-2444" ||
    number === "2444" ||
    /^model\s*2444$/i.test(name)
  ) {
    reasons.push(
      "Model 2444 series is unconfirmed. The pack uses a Lake Manor rendering and Lake Manor series features because of a color-plan filename.",
    );
  }
  if (/carlee/i.test(slug) || /carlee/i.test(name) || /carlee/i.test(number)) {
    reasons.push(
      "The Carlee series is unconfirmed. The color floor plan is filed under Cypress Manor and the photos under Lake Manor.",
    );
  }
  if (number === "2848h32053" || slug === "embrace-cherish-2848h32053") {
    reasons.push(
      "Embrace Cherish model number 2848H32053 comes from a color floor-plan filename, not from the Cherish photo filenames.",
    );
  }
  if (number === "hc522a" || slug.includes("hc522a")) {
    reasons.push(
      "HC522A may be a typo for HC4522A or HC3522A. It was not merged into either model.",
    );
  }
  if (!files.hero && files.gallery.length === 0 && !files.floorPlanImage) {
    reasons.push(
      "Tour-only pack with no hero, gallery, or floor plan, so there is nothing visual to publish.",
    );
  }
  return reasons;
}

function publicUrl(relativePath) {
  return `/${relativePath.split("/public/")[1] || relativePath}`;
}

const featureSets = {};
const publications = [];
const held = [];
const notes = [];

for (const row of manifest.models) {
  const packDir = join(root, row.pack_path);
  const modelPath = join(packDir, "model.json");
  const model = existsSync(modelPath) ? readJson(modelPath) : {};
  const modelNumber =
    typeof model.model_number === "string" && model.model_number.trim()
      ? model.model_number.trim()
      : null;
  const entry = {
    packSlug: row.slug,
    brand: model.brand || row.brand,
    series: model.series || row.series,
    modelName: model.model_name || row.model_name,
    modelNumber,
  };

  const heroPath = join(packDir, "hero.webp");
  const galleryManifestPath = join(packDir, "gallery/manifest.json");
  const gallery = [];
  if (existsSync(galleryManifestPath)) {
    for (const image of readJson(galleryManifestPath)) {
      const file = join(packDir, image.file);
      if (existsSync(file)) gallery.push(publicUrl(file));
    }
  } else if (existsSync(join(packDir, "gallery"))) {
    for (const name of readdirSync(join(packDir, "gallery")).sort()) {
      if (name.endsWith(".webp")) {
        gallery.push(publicUrl(join(packDir, "gallery", name)));
      }
    }
  }
  const floorWebp = join(packDir, "floorplan.webp");
  const floorPdf = join(packDir, "floorplan.pdf");
  const photos = [];
  if (existsSync(heroPath)) {
    const heroUrl = publicUrl(heroPath);
    photos.push(heroUrl);
  }
  for (const image of gallery) {
    if (!photos.includes(image)) photos.push(image);
  }
  const files = {
    hero: existsSync(heroPath),
    gallery,
    floorPlanImage: existsSync(floorWebp) ? publicUrl(floorWebp) : null,
    floorPlanPdf: existsSync(floorPdf) ? publicUrl(floorPdf) : null,
  };

  const reasons = holdReasons(entry, files);
  if (reasons.length > 0) {
    held.push({ ...entry, reasons });
    continue;
  }

  const tours = [];
  const seenTours = new Set();
  const tourPath = join(packDir, "tour.json");
  if (existsSync(tourPath)) {
    const tourFile = readJson(tourPath);
    for (const tour of tourFile.tours ?? []) {
      if (isBlockedTour(tour)) {
        notes.push(
          `Dropped the unconfirmed P256H42P01 tour from ${entry.packSlug}. The confirmed Prime 2856H42P01 tour is the only one published for that model.`,
        );
        continue;
      }
      const href = matterportUrl(tour.link);
      if (!href || seenTours.has(href)) continue;
      seenTours.add(href);
      tours.push({
        href,
        label: String(tour.model_name_on_sheet || entry.modelName),
      });
    }
  }

  let featureSetId = null;
  const featuresPath = join(packDir, "features.md");
  if (existsSync(featuresPath) && model.has_features !== false) {
    const sections = parseFeatures(readFileSync(featuresPath, "utf8"));
    if (sections.length > 0) {
      featureSetId = createHash("sha1")
        .update(JSON.stringify(sections))
        .digest("hex")
        .slice(0, 8);
      featureSets[featureSetId] = sections;
    }
  }

  const publication = {
    packSlug: entry.packSlug,
    brand: entry.brand,
    series: entry.series,
    modelName: entry.modelName,
    modelNumber: entry.modelNumber,
    beds: positiveNumber(model.beds),
    baths: positiveNumber(model.baths),
    sqft: positiveNumber(model.sqft),
    dimensionsText:
      typeof model.dimensions === "string" && model.dimensions.trim()
        ? model.dimensions.trim()
        : null,
    photos,
    floorPlanImage: files.floorPlanImage,
    floorPlanPdf: files.floorPlanPdf,
    tours,
    featureSetId,
  };

  const matches = exactModelMatch(entry.modelNumber);
  if (matches.length === 1) {
    const existing = matches[0];
    publications.push({
      action: "enrich",
      slug: existing.slug,
      matchModelNumber: existing.modelNumber,
      ...publication,
    });
    if (norm(existing.series) !== norm(entry.series)) {
      notes.push(
        `Enriched existing ${existing.series} / ${existing.model} (${existing.modelNumber}) with Lake City pack ${entry.packSlug} (${entry.series} / ${entry.modelNumber}). The model numbers match; the plant folder uses a different series name.`,
      );
    }
    continue;
  }

  if (matches.length > 1) {
    notes.push(
      `Lake City ${entry.packSlug} (${
        entry.modelNumber
      }) matched more than one catalog model number (${matches
        .map((item) => item.modelNumber)
        .join(", ")}). Added as its own floor plan instead of enriching.`,
    );
  }

  let slug = catalogSlug({
    manufacturer: "champion",
    series: entry.series,
    model: entry.modelName,
    modelNumber: entry.modelNumber ?? undefined,
  });
  if (usedSlugs.has(slug)) {
    throw new Error(`Slug collision for ${entry.packSlug}: ${slug}`);
  }
  usedSlugs.add(slug);
  publications.push({
    action: "add",
    slug,
    matchModelNumber: null,
    ...publication,
  });

  const lakeCode = norm(entry.modelNumber);
  for (const existing of championPlans) {
    const last = tokens(existing.modelNumber).at(-1) ?? "";
    if (
      last.length < 4 ||
      !lakeCode.endsWith(last) ||
      lakeCode.length === last.length
    ) {
      continue;
    }
    const prefix = lakeCode.slice(0, lakeCode.length - last.length);
    if (!/^[a-z]{1,4}$/.test(prefix)) continue;
    const seriesA = norm(entry.series);
    const seriesB = norm(existing.series);
    if (
      seriesA === seriesB ||
      seriesA.includes(seriesB) ||
      seriesB.includes(seriesA)
    ) {
      notes.push(
        `Not merged (plant code is not the exact catalog model number): ${entry.series} / ${entry.modelName} (${entry.modelNumber}) stays separate from ${existing.series} / ${existing.model} (${existing.modelNumber}).`,
      );
    }
  }

  const addedName = norm(entry.modelName);
  for (const existing of championPlans) {
    const existingName = norm(existing.model);
    if (
      existing.series === entry.series &&
      addedName.length >= 6 &&
      (existingName.startsWith(addedName) ||
        addedName.startsWith(existingName)) &&
      existingName !== addedName
    ) {
      notes.push(
        `Not merged (model numbers differ): new ${entry.series} / ${
          entry.modelName
        } (${
          entry.modelNumber || "no plant model number"
        }) stays separate from existing ${existing.model} (${
          existing.modelNumber
        }).`,
      );
    }
  }
}

publications.sort((a, b) => a.slug.localeCompare(b.slug));
held.sort((a, b) => a.packSlug.localeCompare(b.packSlug));

const usedFeatureIds = new Set(
  publications.map((item) => item.featureSetId).filter(Boolean),
);
for (const id of Object.keys(featureSets)) {
  if (!usedFeatureIds.has(id)) delete featureSets[id];
}

const summary = {
  packs: manifest.models.length,
  added: publications.filter((item) => item.action === "add").length,
  enriched: publications.filter((item) => item.action === "enrich").length,
  held: held.length,
};

if (summary.added + summary.enriched + summary.held !== summary.packs) {
  throw new Error(`Pack accounting failed: ${JSON.stringify(summary)}`);
}
if (
  publications.some(
    (item) =>
      norm(item.modelNumber) === "rh1351zll" ||
      item.packSlug.includes("rh1351zll"),
  ) ||
  held.some((item) => item.packSlug.includes("rh1351zll"))
) {
  throw new Error(
    "RH1351ZLL was packed and must not be published or listed as a normal hold.",
  );
}

const catalogModule = `// Generated by tools/catalog-media/build-lake-city.mjs. Do not edit.
const lakeCityCatalog = ${JSON.stringify(
  { featureSets, publications },
  null,
  2,
)} as {
  featureSets: Record<string, { heading: string; items: string[] }[]>;
  publications: {
    action: "add" | "enrich";
    packSlug: string;
    slug: string;
    matchModelNumber: string | null;
    brand: string;
    series: string;
    modelName: string;
    modelNumber: string | null;
    beds: number | null;
    baths: number | null;
    sqft: number | null;
    dimensionsText: string | null;
    photos: string[];
    floorPlanImage: string | null;
    floorPlanPdf: string | null;
    tours: { href: string; label: string }[];
    featureSetId: string | null;
  }[];
};

export default lakeCityCatalog;
`;
writeFileSync(join(root, "src/data/lake-city-catalog.ts"), catalogModule);
writeFileSync(
  join(root, "src/data/lake-city-review.json"),
  `${JSON.stringify({ held, notes, summary }, null, 2)}\n`,
);

const sitemapPath = join(root, "public/sitemap.xml");
const sitemap = readFileSync(sitemapPath, "utf8");
const urls = [
  "https://risingtidecapital.us/homes/champion?brand=Homes%20of%20Merit",
  "https://risingtidecapital.us/homes/champion?brand=Embrace",
  ...publications.map(
    (item) => `https://risingtidecapital.us/homes/${item.slug}`,
  ),
];
const block = [
  "  <!-- lake-city-preview-start -->",
  ...urls.map(
    (loc) =>
      `  <url><loc>${loc}</loc><lastmod>2026-11-16</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`,
  ),
  "  <!-- lake-city-preview-end -->",
].join("\n");
const start = "  <!-- lake-city-preview-start -->";
const end = "  <!-- lake-city-preview-end -->";
let nextSitemap;
if (sitemap.includes(start) && sitemap.includes(end)) {
  nextSitemap = sitemap.replace(new RegExp(`${start}[\\s\\S]*?${end}`), block);
} else {
  nextSitemap = sitemap.replace("</urlset>", `${block}\n</urlset>`);
}
writeFileSync(sitemapPath, nextSitemap);

console.log(JSON.stringify(summary, null, 2));
console.log("--- held ---");
for (const item of held) {
  console.log(`- ${item.packSlug}: ${item.reasons.join(" ")}`);
}
console.log("--- notes ---");
for (const note of notes) console.log(`- ${note}`);
console.log(
  "photos",
  publications.reduce((sum, item) => sum + item.photos.length, 0),
  "feature sets",
  Object.keys(featureSets).length,
);
