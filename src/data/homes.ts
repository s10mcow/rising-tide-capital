export type HomeListingStatus = "available" | "pending" | "sold";

/**
 * A mobile or manufactured home Rising Tide is offering.
 * Publish a record only when every field is confirmed.
 */
export type HomeListing = {
  /** Stable id used in /homes-for-sale/:id. */
  id: string;
  title: string;
  status: HomeListingStatus;
  year: number;
  /** Make and model. */
  makeModel: string;
  /** Size and square footage, written as confirmed for this home. */
  sizeSqft: string;
  beds: number;
  baths: number;
  /** Asking price in US dollars. */
  price: number;
  location: string;
  /** Public photo URLs. Use an empty array when no photos are on file. */
  photos: string[];
  description: string;
};

/*
Example schema (comment only — this object is not inventory):

{
  id: "example-id",
  title: "Example title",
  status: "available",
  year: 0,
  makeModel: "Make / model",
  sizeSqft: "Size / sq ft",
  beds: 0,
  baths: 0,
  price: 0,
  location: "Location",
  photos: [],
  description: "Description",
}
*/

/** Confirmed homes only. Ship this empty until a listing is ready to publish. */
export const homes: HomeListing[] = [];

export function getHomeById(
  id: string,
  listings: readonly HomeListing[] = homes,
): HomeListing | undefined {
  return listings.find((home) => home.id === id);
}

/** Img src for a photo on file: a site path or an http(s) URL. */
export function safePhotoSrc(photo: string): string | null {
  const value = photo.trim();
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") return url.href;
  } catch {
    return null;
  }
  return null;
}

export function absolutePhotoUrl(
  photo: string,
  siteUrl: string,
): string | null {
  const src = safePhotoSrc(photo);
  if (!src) return null;
  if (src.startsWith("/")) return `${siteUrl}${src}`;
  return src;
}
