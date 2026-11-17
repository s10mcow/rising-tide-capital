/**
 * Old catalog paths that must 301 to the current slug.
 * Paths have no trailing slash. Netlify also lists these in netlify.toml,
 * ahead of the SPA rewrite, and the OG edge function redirects the same paths.
 */
export const CATALOG_SLUG_REDIRECTS: Readonly<Record<string, string>> = {
  "/homes/champion-lake-manor-1666h32p01": "/homes/champion-prime-1666h32p01",
  "/homes/champion-lake-manor-2856h32p01":
    "/homes/champion-prime-apex-2856h32p01",
  "/homes/champion-lake-manor-2868h42p01": "/homes/champion-prime-2868h42p01",
  "/homes/champion-lake-manor-2876h53p01": "/homes/champion-prime-2876h53p01",
};
