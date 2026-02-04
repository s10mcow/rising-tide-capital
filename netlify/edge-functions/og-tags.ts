import type { Context } from "@netlify/edge-functions";

const pageMetaTags: Record<
  string,
  { title: string; description: string; image?: string }
> = {
  "/closing-process": {
    title:
      "What to Expect from the Closing Process - Rising Tide Capital Partners",
    description:
      "Learn what to expect during the closing process with Rising Tide Capital Partners. Most closings complete within 45-60 days. View our step-by-step timeline.",
  },
};

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Only process pages that have custom meta tags
  const pageMeta = pageMetaTags[pathname];
  if (!pageMeta) {
    return context.next();
  }

  // Get the original response
  const response = await context.next();
  const html = await response.text();

  // Replace meta tags for this specific page
  const baseUrl = "https://risingtidecapital.us";
  const ogImage = pageMeta.image || `${baseUrl}/og-image.jpg`;

  const modifiedHtml = html
    // Update title tag
    .replace(/<title>.*?<\/title>/, `<title>${pageMeta.title}</title>`)
    // Update meta title
    .replace(
      /<meta name="title" content=".*?".*?\/>/,
      `<meta name="title" content="${pageMeta.title}" />`,
    )
    // Update meta description
    .replace(
      /<meta name="description" content=".*?".*?\/>/,
      `<meta name="description" content="${pageMeta.description}" />`,
    )
    // Update OG URL
    .replace(
      /<meta property="og:url" content=".*?".*?\/>/,
      `<meta property="og:url" content="${baseUrl}${pathname}" />`,
    )
    // Update OG title
    .replace(
      /<meta property="og:title" content=".*?".*?\/>/,
      `<meta property="og:title" content="${pageMeta.title}" />`,
    )
    // Update OG description
    .replace(
      /<meta property="og:description" content=".*?".*?\/>/,
      `<meta property="og:description" content="${pageMeta.description}" />`,
    )
    // Update OG image
    .replace(
      /<meta property="og:image" content=".*?".*?\/>/,
      `<meta property="og:image" content="${ogImage}" />`,
    )
    // Update Twitter URL
    .replace(
      /<meta property="twitter:url" content=".*?".*?\/>/,
      `<meta property="twitter:url" content="${baseUrl}${pathname}" />`,
    )
    // Update Twitter title
    .replace(
      /<meta property="twitter:title" content=".*?".*?\/>/,
      `<meta property="twitter:title" content="${pageMeta.title}" />`,
    )
    // Update Twitter description
    .replace(
      /<meta property="twitter:description" content=".*?".*?\/>/,
      `<meta property="twitter:description" content="${pageMeta.description}" />`,
    )
    // Update Twitter image
    .replace(
      /<meta property="twitter:image" content=".*?".*?\/>/,
      `<meta property="twitter:image" content="${ogImage}" />`,
    )
    // Update canonical URL
    .replace(
      /<link rel="canonical" href=".*?".*?\/>/,
      `<link rel="canonical" href="${baseUrl}${pathname}" />`,
    );

  return new Response(modifiedHtml, {
    status: response.status,
    headers: response.headers,
  });
}
