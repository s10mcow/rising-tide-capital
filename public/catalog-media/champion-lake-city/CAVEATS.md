# Champion Lake City (Homes of Merit / Embrace) — Caveats

Copied from the dealer web-pack README. Read before publishing any of these assets on risingtidecapital.us.

## Caveats — read before publishing

1. **Content may be outdated.** The Champion Dealer Box root note says material may be outdated or can change without notice, and dealers should confirm with their zone representative. That note was last edited in 2020.
2. **Confirm usage rights with Champion / the zone rep** before putting files on a public retailer site. This share is dealer marketing material; there is no general photo license in the folder (only stock-music licenses under Model 2444 videos). Follow the Homes of Merit Style Guide for logo use (trademark symbol required; don’t distort or recolor the mark). The style guide also refers to Champion brand guidelines, which are not in this share.
3. **Decor, elevations, and options may be model-specific.** Do not present option photos as standard on every home.
4. **Internal documents were not packed.** Base-price sheets, sales order forms, service-zone maps, and installation manuals stay in the mirror only.
5. **Some flyers and older photoshoots are from 2017–2022.** Prefer the retouched “261” sets and 2025/staged folders when a model has both.
6. **Do not add RH1351ZLL** to the website (custom; flagged on the virtual-tours sheet).

## Sources

All originals remain in the Champion dealer Box share (`Lake City  FL`). This staging copy contains only derivatives (resized WebP images, a copied floor-plan PDF, and JSON/Markdown sidecars).

## Inventory (this build)

- **96 model packs** (57 with photo galleries, 39 tour-only or plan-only).
- 54 heroes, 63 floor plans, 94 with at least one Matterport tour, 70 with series features.
- Pack files total about **319 MB**. Videos were not copied; `video.json` points at the mirror.
- **RH1351ZLL** is not packed.
- Photo packs with no hero (no usable exterior in the share): Bay Manor BM722, Southern Comfort 2 (BMALM060-4), The Carlee (interiors only).
- Photo packs with no floor plan in the share: Embrace Sunlight, Grand Park 1437 and 1451, HOMC HC4443C and HC4543E, Prime Daybreak, Signature SIG3482C, Southern Comfort 2.
- See `index.csv` / `index.json` for the full asset matrix, and the `uncertain` list in `index.json` for matching caveats (Cherish model number, P256 typo tour, HC522A, The Carlee series, Model 2444 series).

## Staging notes

- Heroes were resized to a max width of 1600px and re-encoded as WebP (quality 72).
- Gallery images were resized to a max width of 1024px and re-encoded as WebP (quality 72). A first pass at the originally planned 1280px / quality 78 came out to 143 MB, over the ~100 MB branch budget, largely because the floor-plan PDFs are 25 MB and many landscaped exteriors compress poorly. Dimensions and quality were tightened only enough to land under that budget; heroes stayed at 1600px.
- Floor-plan PNGs were converted to WebP at a max width of 1600px (quality 72). Original `floorplan.pdf` files were kept as-is.
- `video.json` was not copied (it only points at box-local paths). Source videos were not included.
- RH1351ZLL is excluded (custom; flagged “DO NOT ADD TO WEBSITE”). Trinity RH1351A is a different model and is included.
- These files are staged under `public/catalog-media/champion-lake-city/` and are not linked from the site yet.

