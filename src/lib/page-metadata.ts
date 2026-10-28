export const SITE_URL = "https://risingtidecapital.us";
export const DEFAULT_META = {
  title: "Rising Tide Capital Partners - Real Estate Development & Investment",
  description:
    "Rising Tide Capital Partners LLC - Premier Florida real estate development and investment firm specializing in land acquisition, commercial properties, and multi-family development opportunities.",
  image: `${SITE_URL}/og-image.jpg`,
};
export const PAGE_METADATA: Record<string, typeof DEFAULT_META> = {
  "/closing-process": {
    title:
      "What to Expect from the Closing Process - Rising Tide Capital Partners",
    description:
      "Learn what to expect during the closing process with Rising Tide Capital Partners. Most closings complete within 45-60 days. View our step-by-step timeline.",
    image: `${SITE_URL}/og-image.jpg`,
  },
  "/contracting": {
    title: "Rising Tide Contracting | North Central Florida Land-Home GC",
    description:
      "General contracting for mobile and manufactured-home projects in North Central Florida. Permitting, our subcontractor team, installer coordination, and flat-fee GC services.",
    image: `${SITE_URL}/contracting-home.webp`,
  },
};
export function getPageMetadata(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const meta = PAGE_METADATA[path] || DEFAULT_META;
  return { ...meta, url: `${SITE_URL}${path}` };
}
export function metadataValues(pathname: string): Record<string, string> {
  const meta = getPageMetadata(pathname);
  return {
    title: meta.title,
    description: meta.description,
    "og:title": meta.title,
    "og:description": meta.description,
    "og:url": meta.url,
    "og:image": meta.image,
    "twitter:title": meta.title,
    "twitter:description": meta.description,
    "twitter:url": meta.url,
    "twitter:image": meta.image,
  };
}
// Support both source HTML and Vite's minified, unquoted attribute syntax.
export function renderPageMetadata(html: string, pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (!PAGE_METADATA[path]) return html;
  const meta = getPageMetadata(path);
  const values = metadataValues(path);
  const escape = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const attribute = (tag: string, name: string) =>
    tag
      .match(
        new RegExp(
          `\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
          "i",
        ),
      )
      ?.slice(1)
      .find((value) => value !== undefined);
  return html
    .replace(/<title>[^<]*<\/title>/i, `<title>${escape(meta.title)}</title>`)
    .replace(/<meta\b[^>]*>/gi, (tag) => {
      const kind = attribute(tag, "property") ? "property" : "name";
      const key = attribute(tag, kind);
      return key && values[key]
        ? `<meta ${kind}="${key}" content="${escape(values[key])}" />`
        : tag;
    })
    .replace(/<link\b[^>]*>/gi, (tag) =>
      attribute(tag, "rel") === "canonical"
        ? `<link rel="canonical" href="${meta.url}" />`
        : tag,
    );
}
