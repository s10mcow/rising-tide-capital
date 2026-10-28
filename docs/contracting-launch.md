# Contracting page

The proposed landing URL is `https://risingtidecapital.us/contracting`.
The draft uses Rising Tide Contracting, North Central Florida, the
company's existing phone/email, and a flat GC fee without a published amount.
The homepage, desktop/mobile navigation, and footer link to the new page.

## Before publishing

- Confirm the DBA registration and the qualified contracting business identity.
- Add the confirmed GC license number visibly to the contracting page and the
  homepage service section. No license number or registration status was supplied
  for this draft; none has been invented.
- Confirm the fee exclusions and service scope in the draft match the actual offer.
- Verify Netlify form detection is enabled, redeploy, and confirm
  `contracting-inquiry` appears in Forms. Configure its notification destination.
  A new form does not automatically inherit notifications for another form.
- Send one authorized test inquiry on the deployed site and verify receipt in
  Netlify Forms and the notification destination. Local tests mock the Netlify
  response and cannot establish delivery.

## Campaign links

Use `/contracting?utm_source=facebook&utm_medium=social&utm_campaign=land_home`
for organic posts, or `utm_medium=paid_social` for ads. A flyer QR can add
`source=qr`. The form retains these fields; homepage lead modals do not interrupt
the contracting page. No customer details are sent to analytics.

## Checks

```sh
npx vitest run src/pages/Contracting/ContractingInquiry.test.tsx src/lib/page-metadata.test.ts
npm run typecheck
npm run build
```

## Illustration

`public/contracting-home.webp` was generated with the built-in image generation
tool, then encoded as WebP. It is an illustrative rendering, identified on the
page, and is not presented as a completed company project.

Generation prompt: Create a wide 3:2 architectural illustration of a modest
double-wide manufactured home on a grassy North Central Florida lot, with light
warm siding, charcoal gabled roof, skirting, simple entry steps, live oak and pine
trees, and soft late-afternoon light. Slightly angled front perspective with the
entire home framed for a website hero. Natural architectural texture, sandy
neutrals, deep greens and blue-gray sky to complement navy, cream and teal. No
people, water, machinery, text, logos, badges, watermarks, border, luxury mansion
or RV. Opaque background.
