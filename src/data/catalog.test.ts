import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  MANUFACTURERS,
  catalog,
  catalogSlug,
  filterPlans,
  formatDimensions,
  groupPlans,
  parseCatalogQuery,
  planDimensions,
  planFactLine,
  similarPlans,
  type CatalogPlan,
} from "./catalog";

const sample = {
  manufacturer: "cavco" as const,
  series: "Iron Ranch",
  model: "Iron Ranch 16603A",
  modelNumber: "16603A",
  beds: 3,
  baths: 2,
  sqft: 960,
  widthFeet: 15,
  widthInches: 6,
  lengthFeet: 60,
  lengthInches: 0,
  sections: "single" as const,
  sectionLabel: "Single-wide",
  price: null,
  features: [],
  photos: [],
  floorPlanImage: null,
  sourceUrl: "https://www.cavcohomes.com/example",
  slug: "cavco-iron-ranch-16603a",
};

function plan(
  overrides: Partial<CatalogPlan> &
    Pick<CatalogPlan, "slug" | "model" | "manufacturer">,
): CatalogPlan {
  return {
    ...sample,
    series: "Alpha",
    modelNumber: "1",
    beds: 3,
    baths: 2,
    sqft: 1000,
    widthFeet: 28,
    widthInches: 0,
    lengthFeet: 56,
    lengthInches: 0,
    sections: "double",
    sectionLabel: "Double-wide",
    price: null,
    features: [],
    photos: [],
    floorPlanImage: null,
    sourceUrl: "https://www.cavcohomes.com/example",
    ...overrides,
  };
}

describe("catalog formatting", () => {
  it("builds a manufacturer-series-model slug and published dimensions", () => {
    expect(
      catalogSlug({
        manufacturer: "cavco",
        series: "Iron Ranch",
        model: "Iron Ranch 16603A",
      }),
    ).toBe("cavco-iron-ranch-16603a");
    expect(
      catalogSlug({
        manufacturer: "palm-harbor",
        series: "Elite",
        model: "Chase 40402A",
      }),
    ).toBe("palm-harbor-elite-chase-40402a");
    expect(formatDimensions(15, 6, 76, 0)).toBe("15' 6\" x 76'");
    expect(formatDimensions(40, 0, 76, 0)).toBe("40' x 76'");
    expect(
      catalogSlug({
        manufacturer: "clayton",
        series: "TRU series",
        model: "Cedar",
        modelNumber: "42TRT28563CH",
      }),
    ).toBe("clayton-tru-series-cedar-42trt28563ch");
  });
});

describe("catalog grouping, sort, and filters", () => {
  const plans = [
    plan({
      slug: "cavco-b",
      manufacturer: "cavco",
      model: "B",
      beds: 2,
      sqft: 1400,
      series: "Edge",
      sections: "double",
      baths: 2,
    }),
    plan({
      slug: "cavco-a",
      manufacturer: "cavco",
      model: "A",
      beds: 2,
      sqft: 900,
      series: "Edge",
      sections: "single",
      baths: 1,
    }),
    plan({
      slug: "palm-a",
      manufacturer: "palm-harbor",
      model: "Palm",
      beds: 4,
      sqft: 2000,
      series: "Elite",
      sections: "triple",
      baths: 3,
      sourceUrl: "https://www.palmharbor.com/example",
    }),
  ];

  it("groups by manufacturer and sorts beds then square feet", () => {
    const groups = groupPlans(plans);
    expect(groups.map((group) => group.id)).toEqual([
      "clayton",
      "cavco",
      "palm-harbor",
      "champion",
    ]);
    expect(groups[1].plans.map((item) => item.slug)).toEqual([
      "cavco-a",
      "cavco-b",
    ]);
    expect(groups[0].plans).toEqual([]);
    expect(groups[3].plans).toEqual([]);
  });

  it("filters by square feet, beds, baths, sections, manufacturer, series, and search", () => {
    const filters = parseCatalogQuery(
      new URLSearchParams(
        "q=palm&beds=3&baths=2&sections=triple&sqftMin=1500&sqftMax=2200&series=Elite&manufacturer=palm-harbor&sort=sqft-desc",
      ),
    );
    expect(filterPlans(plans, filters).map((item) => item.slug)).toEqual([
      "palm-a",
    ]);
    expect(
      filterPlans(plans, { ...filters, sqftMin: 2500 }).map(
        (item) => item.slug,
      ),
    ).toEqual([]);
  });

  it("keeps multi-section and unknown sections out of double and triple filters", () => {
    const mixed = [
      plan({
        slug: "champion-multi",
        manufacturer: "champion",
        model: "Multi Home",
        sections: "multi",
        sectionLabel: "Multi-Section",
        widthFeet: undefined,
        widthInches: undefined,
        lengthFeet: undefined,
        lengthInches: undefined,
        sourceUrl: "https://www.championhomes.com/models/multi-home",
      }),
      plan({
        slug: "clayton-unknown",
        manufacturer: "clayton",
        model: "Cedar",
        sections: undefined,
        sectionLabel: undefined,
        widthFeet: undefined,
        widthInches: undefined,
        lengthFeet: undefined,
        lengthInches: undefined,
        sourceUrl: "https://www.claytonhomes.com/locations/example",
      }),
      plan({
        slug: "cavco-double",
        manufacturer: "cavco",
        model: "Double Home",
        sections: "double",
        sectionLabel: "Double-wide",
      }),
    ];
    const query = { q: "", series: "", sort: "beds" as const };
    expect(
      filterPlans(mixed, { ...query, sections: "double" }).map(
        (item) => item.slug,
      ),
    ).toEqual(["cavco-double"]);
    expect(
      filterPlans(mixed, { ...query, sections: "triple" }).map(
        (item) => item.slug,
      ),
    ).toEqual([]);
    expect(
      filterPlans(mixed, { ...query, sections: "multi" }).map(
        (item) => item.slug,
      ),
    ).toEqual(["champion-multi"]);
    expect(filterPlans(mixed, query).map((item) => item.slug)).toEqual([
      "champion-multi",
      "clayton-unknown",
      "cavco-double",
    ]);
    expect(planDimensions(mixed[0])).toBeNull();
    expect(planFactLine(mixed[1])).toBe("3 beds | 2 baths | 1,000 sq ft");
  });

  it("sorts within a manufacturer by the requested square-foot order", () => {
    const grouped = groupPlans(plans, { sort: "sqft-desc" });
    expect(grouped[1].plans.map((item) => item.slug)).toEqual([
      "cavco-b",
      "cavco-a",
    ]);
  });

  it("suggests similar plans from the same manufacturer", () => {
    const more = [
      ...plans,
      plan({
        slug: "cavco-c",
        manufacturer: "cavco",
        model: "C",
        beds: 2,
        sqft: 910,
      }),
    ];
    expect(similarPlans(more[1], more).map((item) => item.slug)).toEqual([
      "cavco-c",
      "cavco-b",
    ]);
  });
});

describe("published floor plans", () => {
  it("keeps verified specs, null prices, and manufacturer source pages", () => {
    const source = readFileSync("src/data/catalog.ts", "utf8");
    expect(source).not.toMatch(/\$\d/);
    expect(source.toLowerCase()).not.toContain("sliceoflife");
    expect(catalog.length).toBeGreaterThanOrEqual(40);
    const counts = Object.fromEntries(
      MANUFACTURERS.map((maker) => [
        maker.id,
        catalog.filter((item) => item.manufacturer === maker.id).length,
      ]),
    );
    expect(counts.cavco).toBeGreaterThan(0);
    expect(counts["palm-harbor"]).toBeGreaterThan(0);
    expect(counts.clayton).toBeGreaterThan(0);
    expect(counts.champion).toBeGreaterThan(0);
    const hosts: Record<string, string> = {
      cavco: "https://www.cavcohomes.com/",
      "palm-harbor": "https://www.palmharbor.com/",
      clayton: "https://www.claytonhomes.com/",
      champion: "https://www.championhomes.com/",
    };
    const slugs = new Set<string>();
    for (const item of catalog) {
      expect(item.price).toBeNull();
      for (const photo of item.photos) {
        expect(photo.startsWith("/catalog-media/")).toBe(true);
        expect(existsSync(`public${photo}`)).toBe(true);
      }
      if (item.floorPlanImage) {
        expect(item.floorPlanImage.startsWith("/catalog-media/")).toBe(true);
        expect(existsSync(`public${item.floorPlanImage}`)).toBe(true);
      }
      expect(item.slug).toBe(
        catalogSlug({
          manufacturer: item.manufacturer,
          series: item.series,
          model: item.model,
          modelNumber: item.modelNumber,
        }),
      );
      expect(slugs.has(item.slug)).toBe(false);
      slugs.add(item.slug);
      expect(item.beds).toBeGreaterThan(0);
      expect(item.baths).toBeGreaterThan(0);
      expect(item.sqft).toBeGreaterThan(0);
      if (item.widthFeet != null) {
        expect(item.widthFeet).toBeGreaterThan(0);
        expect(item.lengthFeet).toBeGreaterThan(0);
        expect(item.widthInches).not.toBeUndefined();
        expect(item.lengthInches).not.toBeUndefined();
        expect(planDimensions(item)).toMatch(/'/);
      } else {
        expect(planDimensions(item)).toBeNull();
      }
      if (item.sections === "multi") {
        expect(item.sectionLabel).toBe("Multi-Section");
        expect(item.widthFeet).toBeUndefined();
      }
      if (item.sections) {
        expect(["single", "double", "triple", "multi"]).toContain(
          item.sections,
        );
      }
      expect(item.sourceUrl.startsWith(hosts[item.manufacturer])).toBe(true);
    }
    const cedar = catalog.find((item) => item.modelNumber === "42TRT28563CH");
    expect(cedar).toMatchObject({
      manufacturer: "clayton",
      series: "TRU series",
      model: "Cedar",
      beds: 3,
      baths: 2,
      sqft: 1475,
    });
    expect(cedar?.widthFeet).toBeUndefined();
    expect(cedar?.sections).toBeUndefined();
    const multi = catalog.find((item) => item.model === "Crestpointe H4684A");
    expect(multi).toMatchObject({
      manufacturer: "champion",
      sections: "multi",
      sectionLabel: "Multi-Section",
      beds: 4,
      baths: 2,
      sqft: 1813,
    });
    expect(multi?.widthFeet).toBeUndefined();
    const jenkins = catalog.find((item) => item.model === "Jenkins 28522A");
    expect(jenkins).toMatchObject({
      manufacturer: "palm-harbor",
      series: "Palm Harbor LL",
      beds: 2,
      baths: 2,
      sqft: 1393,
      widthFeet: 26,
      widthInches: 8,
      lengthFeet: 52,
      lengthInches: 0,
      sections: "double",
      sectionLabel: "Double-wide",
    });
    const draper = catalog.find((item) => item.model === "Draper 40764A");
    expect(draper).toMatchObject({
      beds: 4,
      baths: 3,
      sqft: 3040,
      sections: "triple",
      widthFeet: 40,
      lengthFeet: 76,
    });
  });
});
