import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function walk(dir: string, found: string[] = []): string[] {
  if (!existsSync(dir)) return found;
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, found);
    else found.push(full);
  }
  return found;
}

describe("public catalog privacy", () => {
  it("keeps reference data out of the public app and gitignore", () => {
    const gitignore = readFileSync(".gitignore", "utf8");
    expect(gitignore).toContain("internal-catalog-data/");
    expect(existsSync("src/data/catalog.ts")).toBe(false);
    expect(existsSync("src/pages/Catalog")).toBe(false);
    const app = readFileSync("src/App.tsx", "utf8");
    expect(app).not.toContain('path="/homes"');
    expect(app).not.toContain("CatalogRoute");
    const header = readFileSync("src/components/Header.tsx", "utf8");
    expect(header).not.toContain('to: "/homes"');
    const metadata = readFileSync("src/lib/page-metadata.ts", "utf8");
    expect(metadata).not.toContain("catalog");
    const netlify = readFileSync("netlify.toml", "utf8");
    expect(netlify).not.toContain('path = "/homes"');
    expect(netlify).not.toContain('path = "/homes/*"');
  });

  it("does not ship reference records in a production build", () => {
    const files = walk("dist").filter((file) =>
      /\.(js|css|html|json|map)$/.test(file),
    );
    if (files.length === 0) return;
    const bundled = files.map((file) => readFileSync(file, "utf8")).join("\n");
    expect(bundled).not.toContain("sliceoflifehomes.com");
    expect(bundled).not.toContain("SENTINEL-PRICE");
    expect(bundled).not.toContain("42TRT28563CH");
    expect(bundled).not.toContain("Crestpointe H4684A");
    expect(bundled).not.toContain("internal-catalog-data");
  });
});
