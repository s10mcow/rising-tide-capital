import type { HomeListing, HomeListingStatus } from "@/data/homes";

export const HOME_SALES_DISCLAIMER =
  "Prices, availability, and specifications are subject to change and are confirmed at the time of sale.";

const STATUS_LABEL: Record<HomeListingStatus, string> = {
  available: "Available",
  pending: "Pending",
  sold: "Sold",
};

export function statusLabel(status: HomeListingStatus): string {
  return STATUS_LABEL[status];
}

export function displayText(value: string): string {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "Not listed";
}

export function formatCount(value: number): string {
  return Number.isFinite(value) ? String(value) : "Not listed";
}

export function formatHomePrice(price: number): string {
  if (!Number.isFinite(price)) return "Not listed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function listingFacts(home: HomeListing) {
  return [
    { label: "Year", value: formatCount(home.year) },
    { label: "Make / model", value: displayText(home.makeModel) },
    { label: "Size / sq ft", value: displayText(home.sizeSqft) },
    { label: "Beds", value: formatCount(home.beds) },
    { label: "Baths", value: formatCount(home.baths) },
  ];
}
