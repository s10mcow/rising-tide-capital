import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
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

describe("competitor reference data stays private", () => {
  it("does not put Slice of Life prices in the public catalog", () => {
    const gitignore = readFileSync(".gitignore", "utf8");
    expect(gitignore).toContain("internal-catalog-data/");
    const catalog = readFileSync("src/data/catalog.ts", "utf8");
    expect(catalog.toLowerCase()).not.toContain("sliceoflife");
    expect(catalog).not.toContain("DH/1154962");
    const app = readFileSync("src/App.tsx", "utf8");
    expect(app).toContain('path="/homes"');
  });

  it("does not ship Slice of Life material in a production build", () => {
    const files = walk("dist").filter((file) =>
      /\.(js|css|html|json|map)$/.test(file),
    );
    if (files.length === 0) return;
    const bundled = files.map((file) => readFileSync(file, "utf8")).join("\n");
    expect(bundled.toLowerCase()).not.toContain("sliceoflife");
    expect(bundled).not.toContain("SENTINEL-PRICE");
    expect(bundled).not.toContain("internal-catalog-data");
  });
});
