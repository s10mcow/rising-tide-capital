# Rising Tide website redesign

The homepage now presents land/property acquisition and North Central Florida contracting as two clear paths. The shared navy, cream, and teal styling covers navigation, footer, the closing guide, policy pages, and SMS information.

The original user-supplied wave artwork is stored in `public/rising-tide-logo-reference.png`. `Brand.tsx` displays its wave region and renders accessible text for either Capital Partners or Contracting. No generated logo variant is used. The earlier home illustration remains labeled as an illustrative rendering.

The property inquiry keeps the existing Netlify `contact` form and fields. Failed HTTP responses now show an error and preserve the message. QR/email campaign forms also reject failed HTTP responses. The contracting form is unchanged.

The former SMS web form displayed success without sending or recording consent. The page now directs visitors to the existing advertised START-to-(904)-906-9630 flow and distinguishes opening the messaging app from sending START. No SMS subscription was submitted during verification.

Policy text and the eight closing stages remain intact. Internal fragment navigation waits for lazy routes to mount and scrolls below the fixed header. The sitemap lists page routes instead of obsolete homepage fragments. Obsolete ocean-image preload code is removed.

Run focused checks with:

```sh
npx vitest run src/components/ContactModal.test.tsx src/components/PageMetadata.test.tsx src/pages/Contracting/ContractingInquiry.test.tsx src/lib/page-metadata.test.ts
npm run typecheck
npm run lint
npm run build
```

Netlify notification routing, production lead delivery, and the SMS provider's START handling require operational verification. No new environment variables or dependencies are required. The separate AWS/Pulumi workflow retains its pre-existing missing-credentials failure.
