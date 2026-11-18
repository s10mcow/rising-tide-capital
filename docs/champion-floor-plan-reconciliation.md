# Champion floor-plan reconciliation

Reviewed November 18, 2026. The reconciled catalog contains 365 Champion pages. It preserves the 252 existing addresses and adds 113 Lake City models across nine series. Thirty existing pages gained or corrected room counts or square footage. Five existing pages gained a drawing already present in the public media library. Five additional drawing matches are available in the internal review.

## Source decisions

1. Use the newest available Champion dealer sheet for each series. The August 10 Box set covers 13 standard series sheets and a separate D MODEL package sheet. The November 2–4 copies update seven standard sheets.
2. Match each order code to its series and finish. Use the factory drawing for the layout pictured. Distinguish conditioned area, porches and overall area wherever Champion gives separate measurements. For six new listings the figures differ by one square foot and the page reports both.
3. Use one existing page for finishes of a verified common model, and name the finish shown. Champion’s public Cherish 261 photos identify 2848H32053. The dealer drawing shows VOG, and the Ultra and VOG order sheets both list the model. [Champion Cherish 261](https://www.championhomes.com/models/embrace-cherish-261)
4. Keep a disputed count out of search filters. For Lake Manor 2856H42383, both sources give 1,493 sq ft and two baths. The drawing shows three bedrooms and the dealer sheet lists four. The detail page gives both counts.

## Remaining work

| Dealer rows | Disposition |
| ---: | --- |
| 60 | Matched to existing pages, including finish variants. |
| 113 | Added to the review catalog from a dealer sheet and a factory drawing. |
| 40 | Obtain a standard factory drawing that identifies the code and finish. |
| 13 | Confirm the room count, area, alternate layout or package with Lake City. |
| 2 | Confirm whether the standard Prime codes P1460H22P01 and P1466H32P01 use the Crest 261 and Zenith 261 marketing names. |

The 46 D MODEL rows are separate package references. Listings from other Champion plants require their own source sheets before making changes to their availability.

## Release and maintenance

Confirm retailer publication rights for the new dealer drawings before pushing the artwork to a public repository or deploying it. Several sheets carry a proprietary and confidential notice. Until rights are confirmed, the public catalog uses artwork already in its media library. The two C5644A pages identify the earlier drawing and give the area of the current standard.

Existing model packs use the values in their `model.json` files. Run `node tools/catalog-media/build-lake-city.mjs` when those change. The additional dealer models are in `src/data/lake-city-dealer-models.ts`. When adding a verified code, include its sitemap entry and any artwork cleared for public use. Check the detail page, section and brand filters, and PDF download.
