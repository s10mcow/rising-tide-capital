import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_META,
  getPageMetadata,
  renderPageMetadata,
} from "./page-metadata";

describe("contracting share metadata", () => {
  const source = readFileSync("index.html", "utf8");
  it.each(["/contracting", "/contracting/"])(
    "renders the title and canonical URL before JavaScript for %s",
    (path) => {
      const doc = new DOMParser().parseFromString(
        renderPageMetadata(source, path),
        "text/html",
      );
      expect(doc.title).toContain("Rising Tide Contracting |");
      expect(
        doc.querySelector('meta[property="og:title"]')?.getAttribute("content"),
      ).toBe(doc.title);
      expect(
        doc.querySelector('meta[name="description"]')?.getAttribute("content"),
      ).toContain("subcontractor team");
      expect(
        doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      ).toBe("https://risingtidecapital.us/contracting");
      expect(
        doc.querySelector('meta[property="og:image"]')?.getAttribute("content"),
      ).toContain("contracting-home.webp");
      expect(
        doc
          .querySelector('meta[property="twitter:url"]')
          ?.getAttribute("content"),
      ).toBe("https://risingtidecapital.us/contracting");
      expect(
        doc.querySelector('form[name="contracting-inquiry"]'),
      ).not.toBeNull();
    },
  );
  it("supports minified and reordered HTML attributes", () => {
    const input =
      '<title>Old</title><meta content="Old" property=og:title><meta name=description content="Old"><link href="/" rel=canonical>';
    const doc = new DOMParser().parseFromString(
      renderPageMetadata(input, "/contracting"),
      "text/html",
    );
    expect(
      doc.querySelector('meta[property="og:title"]')?.getAttribute("content"),
    ).toBe(doc.title);
    expect(
      doc.querySelector('meta[name="description"]')?.getAttribute("content"),
    ).toContain("North Central Florida");
    expect(
      doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    ).toBe("https://risingtidecapital.us/contracting");
  });
  it("preserves the existing closing page and homepage metadata", () => {
    expect(renderPageMetadata(source, "/closing-process")).toContain(
      "What to Expect from the Closing Process",
    );
    expect(renderPageMetadata(source, "/")).toBe(source);
    expect(getPageMetadata("/").title).toBe(DEFAULT_META.title);
  });
});

describe("homes for sale metadata", () => {
  const source = readFileSync("index.html", "utf8");
  const fixture = {
    id: "test-home",
    title: "Test Home",
    status: "available" as const,
    year: 1999,
    makeModel: "Test Make Model",
    sizeSqft: "24 x 40, 960 sq ft",
    beds: 3,
    baths: 1.5,
    price: 123456.5,
    location: "Test City, FL",
    photos: [] as string[],
    description: "Test description for the fixture only.",
  };

  it.each(["/homes-for-sale", "/homes-for-sale/"])(
    "renders the homes title and canonical URL before JavaScript for %s",
    (path) => {
      const doc = new DOMParser().parseFromString(
        renderPageMetadata(source, path),
        "text/html",
      );
      expect(doc.title).toBe("Homes for Sale | Rising Tide Capital Partners");
      expect(
        doc.querySelector('meta[name="description"]')?.getAttribute("content"),
      ).toContain("licensed Florida mobile and manufactured home dealer");
      expect(
        doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      ).toBe("https://risingtidecapital.us/homes-for-sale");
      expect(
        doc.querySelector('meta[property="og:image"]')?.getAttribute("content"),
      ).toContain("og-image.jpg");
    },
  );

  it("leaves unknown listing urls on the default document", () => {
    expect(renderPageMetadata(source, "/homes-for-sale/missing")).toBe(source);
    expect(getPageMetadata("/homes-for-sale/missing").title).toContain(
      "Listing not found",
    );
  });

  it("uses a confirmed listing’s own title, description, and photo", () => {
    const listed = renderPageMetadata(source, "/homes-for-sale/test-home", [
      fixture,
    ]);
    const doc = new DOMParser().parseFromString(listed, "text/html");
    expect(doc.title).toContain("Test Home");
    expect(
      doc.querySelector('meta[name="description"]')?.getAttribute("content"),
    ).toBe(fixture.description);
    expect(
      doc.querySelector('meta[property="og:image"]')?.getAttribute("content"),
    ).toContain("og-image.jpg");

    const withPhoto = getPageMetadata("/homes-for-sale/test-home", [
      {
        ...fixture,
        photos: [
          "javascript:alert(1)",
          "/photos/test-home.jpg",
          "https://example.com/ignored-later.jpg",
        ],
      },
    ]);
    expect(withPhoto.image).toBe(
      "https://risingtidecapital.us/photos/test-home.jpg",
    );
    expect(
      getPageMetadata("/homes-for-sale/test-home", [
        { ...fixture, photos: ["https://example.com/test-home.jpg"] },
      ]).image,
    ).toBe("https://example.com/test-home.jpg");
  });
});
