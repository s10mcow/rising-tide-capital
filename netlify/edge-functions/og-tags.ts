import type { Context } from "@netlify/edge-functions";
import { CATALOG_SLUG_REDIRECTS } from "../../src/data/catalog-redirects.ts";
import {
  renderPageMetadata,
  shouldRewriteMetadata,
} from "../../src/lib/page-metadata.ts";

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, "") || "/";
  const movedTo = CATALOG_SLUG_REDIRECTS[pathname];
  if (movedTo) {
    url.pathname = movedTo;
    return new Response(null, {
      status: 301,
      headers: { Location: url.toString() },
    });
  }
  if (!shouldRewriteMetadata(pathname)) return context.next();

  const response = await context.next();
  if (!response.headers.get("content-type")?.includes("text/html"))
    return response;

  const html = renderPageMetadata(await response.text(), pathname);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("etag");
  return new Response(html, { status: response.status, headers });
}
