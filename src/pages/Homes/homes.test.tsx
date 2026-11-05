import { readFileSync } from "node:fs";
import type { ReactNode } from "react";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { homes } from "@/data/homes";
import type { HomeListing } from "@/data/homes";
import {
  DEALER_LICENSE_LINE,
  DEALER_LICENSE_NUMBER,
} from "@/lib/dealer-license";
import HomeInquiry from "./HomeInquiry";
import { HomeInventory } from "./HomesForSale";
import HomesForSale from "./HomesForSale";
import { HomeListingRoute } from "./HomeListingPage";
import ListingCard from "./ListingCard";
import ListingDetail from "./ListingDetail";
import { HOME_SALES_DISCLAIMER } from "./listing-format";

const fixture: HomeListing = {
  id: "test-home",
  title: "Test Home",
  status: "available",
  year: 1999,
  makeModel: "Test Make Model",
  sizeSqft: "24 x 40, 960 sq ft",
  beds: 3,
  baths: 1.5,
  price: 123456.5,
  location: "Test City, FL",
  photos: [],
  description: "Test description for the fixture only.",
};

const LICENSE_LINE =
  "Florida Licensed Mobile Home Dealer, License # DH/1154962/1";

describe("homes for sale", () => {
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
    vi.unstubAllGlobals();
  });

  function render(node: ReactNode) {
    act(() => {
      root.render(<MemoryRouter>{node}</MemoryRouter>);
    });
  }

  it("ships with no listings and the issued dealer license", () => {
    expect(homes).toEqual([]);
    expect(DEALER_LICENSE_NUMBER).toBe("DH/1154962/1");
    expect(DEALER_LICENSE_LINE).toBe(LICENSE_LINE);
    const data = readFileSync("src/data/homes.ts", "utf8");
    const license = readFileSync("src/lib/dealer-license.ts", "utf8");
    expect(data).toContain("export const homes: HomeListing[] = [];");
    expect(data).toContain("Example schema");
    expect(data).toContain("makeModel");
    expect(data).toContain("sizeSqft");
    expect(license).not.toContain("TODO");
    expect(license).not.toContain("PLACEHOLDER");
    expect(HOME_SALES_DISCLAIMER).not.toContain("*");
  });

  it("shows an empty inventory state, the license line, and contact links", () => {
    render(<HomesForSale />);
    expect(container.textContent).toContain(
      "New inventory coming soon, contact us.",
    );
    expect(container.textContent).toContain(LICENSE_LINE);
    expect(container.textContent).toContain(HOME_SALES_DISCLAIMER);
    expect(container.textContent).not.toMatch(/\$\d/);
    expect(
      container.querySelector('a[href="tel:+19043256275"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('a[href="mailto:hello@risingtidecapital.us"]'),
    ).not.toBeNull();
    expect(container.querySelector('a[href="/homes-for-sale"]')).not.toBeNull();
    expect(container.querySelector(".listing-card")).toBeNull();
  });

  it("renders a listing card and detail from confirmed fields", () => {
    render(
      <>
        <ListingCard home={fixture} />
        <ListingDetail
          home={{
            ...fixture,
            photos: [
              "javascript:alert(1)",
              "https://example.com/test-home.jpg",
            ],
          }}
        />
      </>,
    );
    expect(container.textContent).toContain("Test Home");
    expect(container.textContent).toContain("Test Make Model");
    expect(container.textContent).toContain("24 x 40, 960 sq ft");
    expect(container.textContent).toContain("1999");
    expect(container.textContent).toContain("1.5");
    expect(container.textContent).toContain("$123,456.50");
    expect(container.textContent).toContain("Test City, FL");
    expect(container.textContent).toContain("Available");
    expect(container.textContent).toContain(
      "Test description for the fixture only.",
    );
    expect(container.textContent).toContain("No photo on file");
    expect(container.textContent).toContain(HOME_SALES_DISCLAIMER);
    expect(container.textContent).toContain("Asking about: Test Home");
    const images = Array.from(container.querySelectorAll("img")).map((img) =>
      img.getAttribute("src"),
    );
    expect(images).toContain("https://example.com/test-home.jpg");
    expect(images.some((src) => src?.startsWith("javascript:"))).toBe(false);
    expect(
      container.querySelector('a[href="/homes-for-sale/test-home"]'),
    ).not.toBeNull();
  });

  it("shows listings on the page when inventory is added", () => {
    render(<HomeInventory listings={[fixture]} />);
    expect(container.textContent).toContain("Homes we can show you.");
    expect(container.textContent).toContain("Test Home");
    expect(container.textContent).not.toContain(
      "New inventory coming soon, contact us.",
    );
  });

  it("shows a contact path when a listing id is not on file", () => {
    act(() => {
      root.render(
        <MemoryRouter initialEntries={["/homes-for-sale/missing"]}>
          <Routes>
            <Route path="/homes-for-sale/:id" element={<HomeListingRoute />} />
          </Routes>
        </MemoryRouter>,
      );
    });
    expect(container.textContent).toContain(
      "New inventory coming soon, contact us.",
    );
    expect(container.textContent).toContain(LICENSE_LINE);
    expect(container.textContent).not.toMatch(/\$\d/);
    expect(container.querySelector(".listing-specs")).toBeNull();
  });

  it("opens the listing route for a home once it is in the data", () => {
    act(() => {
      root.render(
        <MemoryRouter initialEntries={["/homes-for-sale/test-home"]}>
          <Routes>
            <Route
              path="/homes-for-sale/:id"
              element={<HomeListingRoute listings={[fixture]} />}
            />
          </Routes>
        </MemoryRouter>,
      );
    });
    expect(container.textContent).toContain(
      "Test description for the fixture only.",
    );
    expect(container.textContent).toContain("$123,456.50");
    expect(container.textContent).toContain(LICENSE_LINE);
  });
});

describe("home inquiry", () => {
  let container: HTMLDivElement;
  let root: Root;
  const fetchMock = vi.fn();

  beforeEach(() => {
    Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  function render(regarding?: string) {
    act(() => {
      root.render(<HomeInquiry regarding={regarding} />);
    });
  }

  function fill() {
    for (const [name, value] of Object.entries({
      name: "  Test Buyer  ",
      email: "buyer@example.com",
      phone: "9045550100",
      message: "  Looking for a home.  ",
    })) {
      document.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        `[name="${name}"]`,
      )!.value = value;
    }
  }

  async function submit() {
    await act(async () => {
      document
        .querySelector("form")!
        .dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        );
    });
  }

  it("reuses the existing contact form fields", () => {
    render();
    const staticDoc = new DOMParser().parseFromString(
      readFileSync("index.html", "utf8"),
      "text/html",
    );
    const schema = staticDoc.querySelector('form[name="contact"]')!;
    for (const field of Array.from(document.querySelectorAll("form [name]"))) {
      expect(
        schema.querySelector(`[name="${field.getAttribute("name")}"]`),
      ).not.toBeNull();
    }
  });

  it("sends the home being asked about with the contact message", async () => {
    fetchMock.mockResolvedValue({ ok: true });
    render("Test Home");
    fill();
    await submit();
    const data = new URLSearchParams(fetchMock.mock.calls[0][1].body);
    expect(data.get("form-name")).toBe("contact");
    expect(data.get("name")).toBe("Test Buyer");
    expect(data.get("message")).toBe(
      "Asking about: Test Home\n\nLooking for a home.",
    );
    expect(document.querySelector('[role="status"]')?.textContent).toContain(
      "Message received",
    );
  });

  it("keeps the message when sending fails", async () => {
    fetchMock.mockResolvedValue({ ok: false });
    render();
    fill();
    await submit();
    expect(document.querySelector('[role="alert"]')?.textContent).toContain(
      "couldn’t send",
    );
    expect(
      document.querySelector<HTMLTextAreaElement>("textarea")!.value,
    ).toContain("Looking for a home.");
  });
});
