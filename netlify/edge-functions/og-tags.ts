import type { Context } from "@netlify/edge-functions";
import {
  PAGE_METADATA,
  renderPageMetadata,
} from "../../src/lib/page-metadata.ts";

export default async function handler(request: Request, context: Context) {
  const pathname = new URL(request.url).pathname.replace(/\/+$/, "") || "/";
  if (!PAGE_METADATA[pathname]) return context.next();

  const response = await context.next();
  if (!response.headers.get("content-type")?.includes("text/html"))
    return response;

  const html = renderPageMetadata(await response.text(), pathname);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("etag");
  return new Response(html, { status: response.status, headers });
}
