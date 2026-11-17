import type { ReactNode } from "react";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  CATALOG_DISCLAIMER,
  SERIES_FEATURES_LABEL,
  catalog,
  catalogSlug,
} from "@/data/catalog";
import CatalogRoute from "./CatalogRoute";

const JENKINS = catalogSlug({
  manufacturer: "palm-harbor",
  series: "Palm Harbor LL",
  model: "Jenkins 28522A",
});

describe("floor plan catalog", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  function render(path: string) {
    act(() => {
      root.render(
        <MemoryRouter key={path} initialEntries={[path]}>
          <Routes>
            <Route path="/homes" element={<CatalogRoute />} />
            <Route path="/homes/:slug" element={<CatalogRoute />} />
          </Routes>
        </MemoryRouter>,
      );
    });
  }

  function renderNode(node: ReactNode) {
    act(() => {
      root.render(<MemoryRouter>{node}</MemoryRouter>);
    });
  }

  it("groups plans by manufacturer with filters in the url", () => {
    render("/homes");
    for (const name of ["Clayton", "Cavco", "Palm Harbor", "Champion"]) {
      expect(container.textContent).toContain(name);
    }
    expect(container.textContent).toContain("Jenkins 28522A");
    expect(container.textContent).toContain(
      "2 beds | 2 baths | 1,393 sq ft | 26' 8\" x 52'",
    );
    expect(container.textContent).toContain("Call for pricing");
    expect(container.textContent).toContain("View details");
    expect(container.textContent).toContain("Photo not shown");
    expect(container.textContent).toContain(CATALOG_DISCLAIMER);
    expect(container.textContent).not.toContain("DH/1154962/1");
    expect(container.querySelector(".dealer-license")).toBeNull();
    expect(container.querySelector(".catalog-grid")).not.toBeNull();
    expect(container.querySelector('a[href="#palm-harbor"]')).not.toBeNull();
    expect(container.querySelector('a[href="/homes-for-sale"]')).not.toBeNull();
    expect(container.querySelector('a[href="/homes"]')).not.toBeNull();
    expect(container.textContent).not.toMatch(/\$\d/);

    render("/homes/cavco?sections=single");
    expect(container.textContent).toContain("Wall 16401A");
    expect(container.textContent).not.toContain("Jenkins 28522A");
    expect(
      container.querySelector('.catalog-tabs a[aria-current="page"]')
        ?.textContent,
    ).toBe("Cavco");
    const firstModel = container.querySelector(".catalog-card h3");
    expect(firstModel?.textContent).toBe("Wall 16401A");

    render("/homes?manufacturer=palm-harbor&beds=4&sections=triple");
    expect(container.textContent).toContain("Draper 40764A");
    expect(container.textContent).not.toContain("Jenkins 28522A");

    render("/homes/clayton");
    expect(container.textContent).toContain("Cedar");
    expect(container.textContent).toContain("3 beds | 2 baths | 1,475 sq ft");
    expect(container.querySelector(".catalog-card")?.textContent).not.toMatch(
      /\d+'/,
    );

    render("/homes/champion?sections=multi");
    expect(container.textContent).toContain("Crestpointe H4684A");
    expect(container.textContent).toContain("Multi-Section");
    const multiCard = Array.from(
      container.querySelectorAll(".catalog-card"),
    ).find((card) => card.textContent?.includes("Crestpointe H4684A"));
    expect(multiCard?.textContent).toContain("Multi-Section");
    expect(multiCard?.textContent).not.toMatch(/\d+'/);
    render("/homes/champion?sections=double");
    expect(container.textContent).toContain(
      "No floor plans match these filters.",
    );
    expect(container.textContent).not.toContain("Crestpointe H4684A");
  });

  it("opens a detail page with the manufacturer disclaimer and a prefilled inquiry", () => {
    render(`/homes/${JENKINS}`);
    expect(container.textContent).toContain("Floor plans");
    expect(container.textContent).toContain("Palm Harbor");
    expect(container.textContent).toContain("Jenkins 28522A");
    expect(container.textContent).toContain("26' 8\" x 52'");
    expect(container.textContent).toContain("Double-wide");
    expect(container.textContent).toContain("Call for pricing");
    expect(container.textContent).toContain("Photo not shown");
    expect(container.textContent).not.toContain("Floor plan not shown");
    expect(container.textContent).toContain("Request info");
    expect(container.textContent).toContain("Similar floor plans");
    expect(container.textContent).toContain(CATALOG_DISCLAIMER);
    expect(container.textContent).not.toContain("DH/1154962/1");
    expect(container.querySelector(".dealer-license")).toBeNull();
    expect(container.textContent).toContain("Asking about: Jenkins 28522A");
    expect(container.querySelector('a[href="#home-inquiry"]')).not.toBeNull();
    const images = Array.from(container.querySelectorAll("img")).map((img) =>
      img.getAttribute("src"),
    );
    expect(images).toContain(
      "/catalog-media/palm-harbor-palm-harbor-ll-jenkins-28522a-plan.webp",
    );
    expect(
      images.some((src) =>
        /palmharbor|cavco|claytonhomes|championhomes|sliceoflife/i.test(
          src ?? "",
        ),
      ),
    ).toBe(false);
  });

  it("shows a contact path when the slug is not a published plan", () => {
    render("/homes/not-a-plan");
    expect(container.textContent).toContain("Floor plan not found.");
    expect(container.textContent).not.toContain("DH/1154962/1");
    expect(container.querySelector(".dealer-license")).toBeNull();
    expect(container.querySelector(".catalog-spec-card")).toBeNull();
  });

  it("shows Lake City gallery, tour, and Embrace models without prices", () => {
    render("/homes/champion?brand=Homes%20of%20Merit");
    expect(container.textContent).toContain("Homes of Merit");
    expect(container.textContent).toContain("RH1351A");
    expect(container.textContent).not.toContain("Embrace Serenity");
    expect(container.textContent).not.toMatch(/\$\d/);

    render("/homes/champion-trinity-rh1351a");
    expect(container.textContent).toContain("Homes of Merit");
    expect(container.textContent).toContain("Call for pricing");
    expect(container.textContent).toContain(SERIES_FEATURES_LABEL);
    expect(container.textContent).toContain("Download floor plan (PDF)");
    expect(container.querySelector("iframe")).toBeNull();
    const lazy = container.querySelectorAll(
      ".catalog-gallery img[loading='lazy']",
    );
    expect(lazy.length).toBeGreaterThan(1);
    const loadTour = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent?.includes("Load 3D tour"),
    );
    expect(loadTour).toBeTruthy();
    act(() => {
      loadTour?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector("iframe")?.getAttribute("src")).toMatch(
      /^https:\/\/my\.matterport\.com\/show\/\?m=[A-Za-z0-9]+$/,
    );
    expect(container.textContent).not.toContain("DwgJSgkjXF2");

    const tourOnly = catalog.find(
      (plan) =>
        plan.plant === "lake-city" &&
        plan.photos.length === 0 &&
        (plan.tours?.length ?? 0) > 0,
    );
    expect(tourOnly).toBeTruthy();
    render(`/homes/${tourOnly?.slug}`);
    expect(container.textContent).toContain("Photo not shown");
    expect(container.textContent).toContain("Load 3D tour");
    expect(container.querySelector("iframe")).toBeNull();

    render("/homes/champion-embrace-serenity-2864h42a7c");
    expect(container.textContent).toContain("Embrace");
    expect(container.textContent).toContain("Embrace Serenity 2864H42A7C");
    expect(container.textContent).toContain("1,707 sq ft");
    expect(container.textContent).toContain("Call for pricing");
    expect(container.textContent).not.toMatch(/\$\d/);
    expect(container.querySelector(".dealer-license")).toBeNull();
  });

  it("keeps the floor plan and in-stock links in navigation", () => {
    renderNode(<CatalogRoute />);
    expect(container.querySelector('a[href="/homes"]')).not.toBeNull();
    expect(container.querySelector('a[href="/homes-for-sale"]')).not.toBeNull();
  });
});
