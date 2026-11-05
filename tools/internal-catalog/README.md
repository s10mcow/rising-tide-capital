# Internal floor-plan reference

This tool is for local study on this machine. It is not part of the public
site, and it is not deployed to Netlify.

Reference records, prices, and images belong in `internal-catalog-data/`,
which is gitignored. Do not copy that directory into `src/`, `public/`,
`dist/`, or a pull request.

## Start

```bash
node tools/internal-catalog/start.mjs
```

The process listens on `127.0.0.1` only. The sign-in token is written to
`internal-catalog-data/.token` and is not printed. Open the local URL and
paste the token. Data is returned only after the server accepts the token
and sets an HttpOnly session cookie.

## Slice of Life Homes

Prices and images were not imported. A request from this environment to
`https://sliceoflifehomes.com/homes` received HTTP 429 and a Vercel Security
Checkpoint (`x-vercel-mitigated: challenge`). That checkpoint was not
bypassed. When a normal browser session can open the public pages, an export
can be placed in `internal-catalog-data/reference.json`. Each price must keep
its exact source URL, retrieval date, and the label "Slice of Life Homes
reference price — not an RTC quote". Do not publish those files.
