/**
 * Download manufacturer photos and floor plans for catalog models.
 * Only keeps an image when the source page ties it to that model.
 */
import { existsSync } from "node:fs";
import { mkdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { catalog } from "../../src/data/catalog.ts";

const require = createRequire(path.join(rootFromUrl(), "package.json"));
const sharp = require("sharp");

function rootFromUrl() {
  return path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
}

const root = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../..",
);
const outDir = path.join(root, "public/catalog-media");
const mediaFile = path.join(root, "src/data/catalog-media.ts");
const coverageFile = path.join(root, "src/data/catalog-media-coverage.json");

const headers = { "User-Agent": "Mozilla/5.0", Accept: "*/*" };

async function fetchBuf(url, extra = {}) {
  const response = await fetch(url, {
    headers: { ...headers, ...extra },
    redirect: "follow",
  });
  if (response.status === 429 || response.headers.get("x-vercel-mitigated")) {
    throw new Error(`blocked ${response.status}`);
  }
  if (!response.ok) throw new Error(`http ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

async function saveWebp(buffer, dest) {
  await sharp(buffer)
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 74 })
    .toFile(dest);
}

function resolveRef(data, ref) {
  if (!ref || typeof ref !== "object" || !ref.$ref) return ref;
  const key = ref.$ref.split("/").pop();
  return data.page?.[key];
}

function mediaAssets(node) {
  const assets = [];
  const walk = (value) => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value.mediaAsset)) {
      for (const asset of value.mediaAsset) assets.push(asset);
    }
    for (const child of Object.values(value)) {
      if (child && typeof child === "object") walk(child);
    }
  };
  walk(node);
  return assets;
}

function variantUrl(asset) {
  const image = asset?.ximage;
  return (
    image?.medium?.url ||
    image?.large?.url ||
    image?.small?.url ||
    image?.original?.url ||
    null
  );
}

function matchesModel(asset, plan) {
  const alt = String(asset?.imageAltText || "").toLowerCase();
  const url = String(variantUrl(asset) || "").toLowerCase();
  const number = plan.modelNumber.toLowerCase();
  const name = plan.model.toLowerCase();
  if (number && (alt.includes(number) || url.includes(number))) return true;
  if (name.length >= 5 && alt.includes(name)) return true;
  return false;
}

function pickCavco(data, plan) {
  let model = null;
  const walk = (value) => {
    if (!value || typeof value !== "object" || model) return;
    if (value.modelNumber === plan.modelNumber && value.squareFootage != null) {
      model = value;
      return;
    }
    for (const child of Object.values(value)) walk(child);
  };
  walk(data);
  if (!model) return {};
  const photos = mediaAssets(resolveRef(data, model.photos)).filter((asset) =>
    matchesModel(asset, plan),
  );
  const lines = mediaAssets(resolveRef(data, model.lineDrawings)).filter(
    (asset) => matchesModel(asset, plan),
  );
  const photo =
    photos.find((asset) =>
      /exterior/i.test(`${asset.imageAltText} ${variantUrl(asset)}`),
    ) || photos[0];
  const floor =
    lines.find((asset) =>
      /blackline|line|floor/i.test(
        `${asset.imageAltText} ${variantUrl(asset)}`,
      ),
    ) || lines[0];
  return {
    photo: photo ? variantUrl(photo) : null,
    floorPlan: floor ? variantUrl(floor) : null,
  };
}

function pickClayton(html, plan) {
  const text = html.replace(/\\"/g, '"');
  const marker = `"modelName":"${plan.model}"`;
  const start = text.indexOf(marker);
  if (start < 0) return {};
  const slice = text.slice(Math.max(0, start - 5000), start + 80000);
  const images = [];
  const re = /"src":"(https:\/\/media\.ffycdn\.net[^"]+)","alt":"([^"]*)"/g;
  let match;
  while ((match = re.exec(slice))) {
    images.push({ src: match[1], alt: match[2] });
  }
  const named = images.filter((image) =>
    image.alt.toLowerCase().startsWith(plan.model.toLowerCase()),
  );
  const photo =
    named.find(
      (image) => /exterior/i.test(image.alt) && !/floor plan/i.test(image.alt),
    ) || named.find((image) => !/floor plan/i.test(image.alt));
  const floor = named.find((image) => /floor plan/i.test(image.alt));
  return {
    photo: photo?.src || null,
    floorPlan: floor?.src || null,
  };
}

function championMatches(url, slug) {
  const file = decodeURIComponent(url).toLowerCase();
  const parts = slug.toLowerCase().split("-").filter(Boolean);
  if (file.includes(slug.toLowerCase())) return true;
  if (file.includes(parts.join(""))) return true;
  for (let index = 0; index < parts.length - 1; index += 1) {
    const pair = `${parts[index]}-${parts[index + 1]}`;
    if (pair.length >= 6 && file.includes(pair)) return true;
  }
  return parts.some((part) => part.length >= 6 && file.includes(part));
}

function pickChampion(html, plan) {
  const urls = [
    ...html.matchAll(
      /https:\/\/s7d9\.scene7\.com\/is\/image\/championhomes\/[^"'\s?]+/g,
    ),
  ].map((match) => match[0]);
  const unique = [...new Set(urls)].filter((url) =>
    championMatches(url, plan.modelNumber),
  );
  const drawing =
    /floorplan|floor-plan|floor_plan|blackline|layout|-standard(?:-|$)/i;
  const photos = unique.filter((url) => !drawing.test(url));
  const photo =
    photos.find((url) =>
      /exterior|main-image|main_image|elevation/i.test(url),
    ) ||
    photos.find((url) => !/bath|bed|kitchen|closet|dining/i.test(url)) ||
    photos[0];
  const floor = unique.find((url) => drawing.test(url));
  return {
    photo: photo ? `${photo}?wid=1400&hei=1000&fit=crop` : null,
    floorPlan: floor ? `${floor}?wid=1600&fit=constrain` : null,
  };
}

async function sourceImages(plan) {
  if (plan.manufacturer === "clayton") {
    const html = await (await fetch(plan.sourceUrl, { headers })).text();
    if (html.includes("Vercel Security Checkpoint")) throw new Error("blocked");
    return pickClayton(html, plan);
  }
  if (plan.manufacturer === "champion") {
    const html = await (await fetch(plan.sourceUrl, { headers })).text();
    if (html.includes("Vercel Security Checkpoint")) throw new Error("blocked");
    return pickChampion(html, plan);
  }
  const api = new URL(plan.sourceUrl);
  api.pathname = `/resourceapi${api.pathname}`;
  const response = await fetch(api, {
    headers: {
      ...headers,
      "Accept-Version": "1.0",
      Accept: "application/json",
    },
  });
  if (!response.ok) throw new Error(`http ${response.status}`);
  const data = await response.json();
  if (
    JSON.stringify(data).includes("pagenotfound") &&
    !JSON.stringify(data).includes(plan.modelNumber)
  ) {
    throw new Error("page not found");
  }
  return pickCavco(data, plan);
}

async function pool(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: limit }, run));
  return results;
}

await mkdir(outDir, { recursive: true });
const media = {};
const missing = [];
let done = 0;

await pool(catalog, 5, async (plan) => {
  const record = {
    slug: plan.slug,
    manufacturer: plan.manufacturer,
    photo: null,
    floorPlan: null,
    error: null,
  };
  try {
    const found = await sourceImages(plan);
    for (const kind of ["photo", "floorPlan"]) {
      const remote = found[kind];
      if (!remote) continue;
      try {
        const filename = `${plan.slug}${
          kind === "floorPlan" ? "-plan" : ""
        }.webp`;
        const dest = path.join(outDir, filename);
        const existing = existsSync(dest) ? await stat(dest) : null;
        if (!existing || existing.size < 2000) {
          const buffer = await fetchBuf(remote);
          if (buffer.length < 2500) continue;
          await saveWebp(buffer, dest);
        }
        record[kind] = `/catalog-media/${filename}`;
        record[`${kind}Source`] = remote;
      } catch (error) {
        record[`${kind}Error`] =
          error instanceof Error ? error.message : "download failed";
      }
    }
  } catch (error) {
    record.error = error instanceof Error ? error.message : "fetch failed";
  }
  for (const [kind, suffix] of [
    ["photo", ""],
    ["floorPlan", "-plan"],
  ]) {
    const dest = path.join(outDir, `${plan.slug}${suffix}.webp`);
    if (!record[kind] && existsSync(dest)) await unlink(dest);
  }
  if (!record.photo)
    missing.push({
      slug: plan.slug,
      model: plan.model,
      manufacturer: plan.manufacturer,
      sourceUrl: plan.sourceUrl,
      error: record.error || "no matched photo",
    });
  if (!record.floorPlan) {
    missing.push({
      slug: plan.slug,
      model: plan.model,
      manufacturer: plan.manufacturer,
      sourceUrl: plan.sourceUrl,
      error: record.error || "no matched floor plan",
      kind: "floorPlan",
    });
  }
  media[plan.slug] = record;
  done += 1;
  if (done % 20 === 0) console.log(`progress ${done}/${catalog.length}`);
});

const published = {};
for (const [slug, record] of Object.entries(media)) {
  const entry = {};
  if (record.photo) entry.photo = record.photo;
  if (record.floorPlan) entry.floorPlan = record.floorPlan;
  if (Object.keys(entry).length) published[slug] = entry;
}

const lines = [
  "/** Local copies of manufacturer images, keyed by catalog slug. */",
  "export type CatalogMedia = { photo?: string; floorPlan?: string };",
  `export const catalogMedia: Record<string, CatalogMedia> = ${JSON.stringify(
    published,
    null,
    2,
  )};`,
  "",
];
await writeFile(mediaFile, lines.join("\n"));
await writeFile(
  coverageFile,
  JSON.stringify(
    {
      total: catalog.length,
      photos: Object.values(published).filter((item) => item.photo).length,
      floorPlans: Object.values(published).filter((item) => item.floorPlan)
        .length,
      missing,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify({
    total: catalog.length,
    photos: Object.values(published).filter((item) => item.photo).length,
    floorPlans: Object.values(published).filter((item) => item.floorPlan)
      .length,
    missing: missing.length,
  }),
);
