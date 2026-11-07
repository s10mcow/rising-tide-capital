# Internal floor-plan reference

The public site lists orderable floor plans at `/homes`. This tool is separate.
It is for local study on this machine, it is not linked from the public site,
and it is not deployed to Netlify.

Anything placed in `internal-catalog-data/` is gitignored. Do not copy that
directory into `src/`, `public/`, `dist/`, or a pull request. Slice of Life
Homes prices stay in that private folder. They are not RTC quotes and they
are not published on `/homes`.

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
