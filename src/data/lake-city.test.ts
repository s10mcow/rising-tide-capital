import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { catalog, catalogSlug, filterPlans, planFactLine } from "./catalog";
import { CATALOG_SLUG_REDIRECTS } from "./catalog-redirects";
import { lakeCityPublications } from "./lake-city-data";

const review = JSON.parse(
  readFileSync("src/data/lake-city-review.json", "utf8"),
) as {
  held: {
    packSlug: string;
    modelName: string;
    modelNumber: string | null;
    reasons: string[];
  }[];
  notes: string[];
  summary: { packs: number; added: number; enriched: number; held: number };
};

const BLOCKED_TOUR = "DwgJSgkjXF2";
const CONFIRMED_PRIME_TOUR = "7ei6K9Ng48f";

describe("Lake City Champion preview", () => {
  it("accounts for every pack and keeps uncertain models out of the catalog", () => {
    expect(review.summary).toEqual({
      packs: 96,
      added: 49,
      enriched: 19,
      held: 28,
    });
    expect(lakeCityPublications).toHaveLength(68);
    expect(review.held).toHaveLength(28);
    const publishedSlugs = new Set(
      lakeCityPublications.map((item) => item.packSlug),
    );
    const heldSlugs = new Set(review.held.map((item) => item.packSlug));
    expect(publishedSlugs.size + heldSlugs.size).toBe(96);
    for (const slug of publishedSlugs) expect(heldSlugs.has(slug)).toBe(false);

    const catalogText = JSON.stringify(catalog);
    expect(catalogText).not.toContain("RH1351ZLL");
    expect(catalogText).not.toContain("rh1351zll");
    expect(catalogText).not.toContain(BLOCKED_TOUR);
    expect(catalogText).toContain(CONFIRMED_PRIME_TOUR);
    expect(catalogText).not.toContain("2848H32053");
    expect(catalogText).not.toContain("HC522A");
    expect(catalog.find((item) => item.model === "Model 2444")).toBeUndefined();
    expect(catalog.find((item) => item.model === "The Carlee")?.plant).toBe(
      undefined,
    );
    expect(catalog.find((item) => item.model === "The Carlee")?.tours).toBe(
      undefined,
    );
    expect(
      catalog.find((item) => item.modelNumber === "embrace-cherish-261")?.plant,
    ).toBeUndefined();

    for (const required of [
      "model-2444",
      "lake-manor-the-carlee",
      "embrace-cherish-2848h32053",
      "homc-hc522a",
    ]) {
      expect(heldSlugs.has(required)).toBe(true);
    }
    const heldBySlug = new Map(
      review.held.map((item) => [item.packSlug, item.reasons.join(" ")]),
    );
    expect(heldBySlug.get("model-2444")).toMatch(/unconfirmed/i);
    expect(heldBySlug.get("lake-manor-the-carlee")).toMatch(/unconfirmed/i);
    expect(heldBySlug.get("embrace-cherish-2848h32053")).toMatch(/2848H32053/);
    expect(heldBySlug.get("homc-hc522a")).toMatch(/typo/i);
    expect(
      review.held.filter((item) =>
        item.reasons.some((reason) => /nothing visual/i.test(reason)),
      ).length,
    ).toBeGreaterThan(10);
    expect(review.notes.join("\n")).toContain("P256H42P01");
    expect(review.notes.join("\n")).not.toContain(BLOCKED_TOUR);
  });

  it("enriches exact model numbers and adds the rest without invented specs or prices", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    expect(sitemap).toContain(
      "https://risingtidecapital.us/homes/champion?brand=Homes%20of%20Merit",
    );
    expect(sitemap).toContain(
      "https://risingtidecapital.us/homes/champion?brand=Embrace",
    );
    for (const publication of lakeCityPublications) {
      const plan =
        publication.action === "enrich"
          ? catalog.find(
              (item) =>
                item.manufacturer === "champion" &&
                item.modelNumber === publication.matchModelNumber,
            )
          : catalog.find((item) => item.slug === publication.slug);
      expect(plan, publication.packSlug).toBeTruthy();
      if (!plan) continue;
      expect(plan.plant).toBe("lake-city");
      expect(plan.brand === "Homes of Merit" || plan.brand === "Embrace").toBe(
        true,
      );
      expect(plan.price).toBeNull();
      expect(plan.slug).toBe(
        publication.action === "add"
          ? catalogSlug({
              manufacturer: "champion",
              series: publication.series,
              model: publication.modelName,
              modelNumber: publication.modelNumber ?? undefined,
            })
          : publication.slug,
      );
      expect(sitemap).toContain(
        `https://risingtidecapital.us/homes/${plan.slug}`,
      );
      if (publication.photos.length > 0) {
        expect(plan.photos).toEqual(publication.photos);
      } else if (publication.action === "add") {
        expect(plan.photos).toEqual([]);
      }
      for (const photo of publication.photos) {
        expect(photo.startsWith("/catalog-media/champion-lake-city/")).toBe(
          true,
        );
        expect(existsSync(`public${photo}`)).toBe(true);
      }
      if (publication.action === "add") {
        if (publication.beds == null) expect(plan.beds).toBeUndefined();
        else expect(plan.beds).toBe(publication.beds);
        if (publication.baths == null) expect(plan.baths).toBeUndefined();
        else expect(plan.baths).toBe(publication.baths);
        if (publication.sqft == null) {
          expect(plan.sqft).toBeUndefined();
          expect(planFactLine(plan)).not.toContain("sq ft");
        } else {
          expect(plan.sqft).toBe(publication.sqft);
        }
      }
      expect(JSON.stringify(plan)).not.toMatch(/\$\d/);
      const tourIds = (plan.tours ?? []).map((tour) => tour.href);
      expect(tourIds).not.toContain(
        `https://my.matterport.com/show/?m=${BLOCKED_TOUR}`,
      );
    }

    const embrace = filterPlans(catalog, {
      q: "",
      series: "",
      brand: "Embrace",
      sort: "beds",
      manufacturer: "champion",
    });
    expect(embrace.length).toBeGreaterThan(0);
    expect(embrace.every((plan) => plan.brand === "Embrace")).toBe(true);
    const merit = filterPlans(catalog, {
      q: "",
      series: "",
      brand: "Homes of Merit",
      sort: "beds",
      manufacturer: "champion",
    });
    expect(merit.length).toBeGreaterThan(embrace.length);
    expect(merit.every((plan) => plan.brand === "Homes of Merit")).toBe(true);
  });

  it("lists the four plant Prime model numbers under the Prime series", () => {
    const expected = [
      ["1666H32P01", "Prime 1666H32P01", "champion-prime-1666h32p01"],
      ["2856H32P01", "Prime Apex 2856H32P01", "champion-prime-apex-2856h32p01"],
      ["2868H42P01", "Prime 2868H42P01", "champion-prime-2868h42p01"],
      ["2876H53P01", "Prime 2876H53P01", "champion-prime-2876h53p01"],
    ] as const;
    const primeSlugs = new Set(
      filterPlans(catalog, {
        q: "",
        series: "Prime",
        sort: "beds",
        manufacturer: "champion",
      }).map((plan) => plan.slug),
    );
    expect(primeSlugs.has("champion-prime-2448h32p02")).toBe(true);

    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    const redirects = readFileSync("netlify.toml", "utf8");
    for (const [modelNumber, model, slug] of expected) {
      const plan = catalog.find((item) => item.modelNumber === modelNumber);
      expect(plan, modelNumber).toMatchObject({
        series: "Prime",
        model,
        slug,
        price: null,
        plant: "lake-city",
        brand: "Homes of Merit",
      });
      expect(plan?.photos.length).toBeGreaterThan(0);
      expect(plan?.floorPlanImage).toBeTruthy();
      expect(plan?.floorPlanPdf).toBeTruthy();
      expect(plan?.tours?.length).toBeGreaterThan(0);
      expect(plan?.features.length).toBeGreaterThan(0);
      expect(plan?.seriesFeatures?.length).toBeGreaterThan(0);
      expect(primeSlugs.has(slug)).toBe(true);
      expect(sitemap).toContain(`https://risingtidecapital.us/homes/${slug}`);
      const oldPath = `/homes/champion-lake-manor-${modelNumber.toLowerCase()}`;
      expect(sitemap).not.toContain(oldPath);
      expect(CATALOG_SLUG_REDIRECTS[oldPath]).toBe(`/homes/${slug}`);
      expect(redirects).toContain(`from = "${oldPath}"`);
      expect(redirects).toContain(`to = "/homes/${slug}"`);
      expect(redirects).toContain(`from = "${oldPath}/"`);
    }

    expect(
      catalog.find((item) => item.modelNumber === "lake-manor-2856h42383"),
    ).toMatchObject({
      series: "Lake Manor",
      model: "Lake Manor 2856H42383",
      slug: "champion-lake-manor-2856h42383",
    });
    expect(
      catalog.find((item) => item.slug === "champion-lake-manor-3260h32p03")
        ?.series,
    ).toBe("Lake Manor");
  });
});
