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
