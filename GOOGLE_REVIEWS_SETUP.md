# Google Reviews Integration Guide

This guide will help you integrate real Google reviews into your Rising Tide Capital website.

## 📋 Prerequisites

1. A Google Business Profile (formerly Google My Business)
2. Google Cloud Platform account (for API key)
3. At least a few Google reviews on your business

---

## 🚀 Quick Start (3 Options)

### **Option 1: Simple Google Review Link** ⭐ (Easiest - 2 minutes)

Just add a link to your Google reviews:

```tsx
// Add to your Landing page
<Box sx={{ textAlign: "center", py: 4 }}>
  <Button
    variant="contained"
    size="large"
    href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
    target="_blank"
    rel="noopener noreferrer"
  >
    View Our Google Reviews
  </Button>
</Box>
```

### **Option 2: Third-Party Widget** ⭐⭐ (Easy - 10 minutes)

Use a service like [Elfsight](https://elfsight.com/google-reviews-widget/), [Trustmary](https://trustmary.com/), or [EmbedSocial](https://embedsocial.com/):

1. Sign up for a free trial
2. Connect your Google Business
3. Customize the widget
4. Copy the embed code
5. Add to your site

**Pros:** No coding, beautiful designs, auto-updates
**Cons:** May have monthly cost ($5-50/month)

### **Option 3: Full API Integration** ⭐⭐⭐ (Advanced - 30 minutes)

Fetch and display reviews programmatically with full control.

---

## 📖 Option 3: Full Setup Instructions

### Step 1: Find Your Google Place ID

1. Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Search for "Rising Tide Capital Partners" or your business address
3. Click on your business marker
4. Copy the `Place ID` (looks like: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

**Alternative method:**

```bash
# Visit this URL (replace with your business name)
https://www.google.com/maps/search/Rising+Tide+Capital+Partners

# Look at the URL - the Place ID is after "!1s" or you'll see it in the URL
```

### Step 2: Get Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing):

   - Click "Select a project" → "New Project"
   - Name: "Rising Tide Website"
   - Click "Create"

3. Enable Places API:

   - Go to "APIs & Services" → "Library"
   - Search for "Places API"
   - Click "Enable"

4. Create API Key:

   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your API key (looks like: `AIzaSyBk...`)

5. **Restrict your API key** (IMPORTANT for security):
   - Click on your API key
   - Under "API restrictions":
     - Select "Restrict key"
     - Check "Places API"
   - Under "Application restrictions":
     - Select "HTTP referrers"
     - Add: `https://risingtidecapital.us/*`
     - Add: `http://localhost:*` (for development)
   - Click "Save"

### Step 3: Deploy Backend Function (Netlify)

Since you're using Netlify, create a Netlify Function:

1. Create the function file:

```bash
mkdir -p netlify/functions
```

2. Copy the function (already created at `infrastructure/functions/google-reviews.ts`):

```bash
cp infrastructure/functions/google-reviews.ts netlify/functions/
```

3. Add to your `netlify.toml`:

```toml
[build]
  functions = "netlify/functions"

[build.environment]
  GOOGLE_PLACES_API_KEY = ""
  GOOGLE_PLACE_ID = ""
```

4. Add environment variables in Netlify Dashboard:
   - Go to Site settings → Environment variables
   - Add `GOOGLE_PLACES_API_KEY` = your API key
   - Add `GOOGLE_PLACE_ID` = your Place ID

### Step 4: Add GoogleReviews Component to Your Site

Update your `Landing.tsx`:

```tsx
import GoogleReviews from "../../components/GoogleReviews";

function Landing() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <WhoWeAreSection />
      <ProcessSection />
      <BenefitsSection />

      {/* Add Google Reviews */}
      <GoogleReviews
        placeId="YOUR_PLACE_ID_HERE"
        apiEndpoint="/.netlify/functions/google-reviews"
        maxReviews={6}
      />

      {/* Keep or remove TestimonialsSection - your choice */}
      <TestimonialsSection />

      <FAQSection />
      <CTASection />
      <ContactUsSection />
    </Layout>
  );
}
```

### Step 5: Test Locally

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Set environment variables locally
echo "GOOGLE_PLACES_API_KEY=your_key_here" > .env
echo "GOOGLE_PLACE_ID=your_place_id_here" >> .env

# Run locally
netlify dev

# Your site should be available at http://localhost:8888
```

### Step 6: Deploy

```bash
npm run build
git add .
git commit -m "Add Google Reviews integration"
git push origin main

# Netlify will auto-deploy
```

---

## 🎨 Customization Options

### Change Number of Reviews Displayed

```tsx
<GoogleReviews maxReviews={3} /> // Show only 3 reviews
<GoogleReviews maxReviews={9} /> // Show 9 reviews
```

### Styling

The component uses your existing theme. To customize further, edit:

- `src/components/GoogleReviews.tsx`
- Modify the `styled` components at the top of the file

### Show Reviews in Multiple Places

```tsx
// Show compact version in footer
<GoogleReviews
  placeId="YOUR_PLACE_ID"
  apiEndpoint="/.netlify/functions/google-reviews"
  maxReviews={3}
/>

// Show full version in dedicated section
<GoogleReviews
  placeId="YOUR_PLACE_ID"
  apiEndpoint="/.netlify/functions/google-reviews"
  maxReviews={12}
/>
```

---

## 🔍 Troubleshooting

### Reviews not showing?

1. **Check console for errors**: Open DevTools (F12) → Console
2. **Verify API endpoint**: Test `https://risingtidecapital.us/.netlify/functions/google-reviews`
3. **Check environment variables**: Netlify Dashboard → Site settings → Environment variables
4. **API Key restrictions**: Make sure your domain is allowed
5. **Check Google Business**: Make sure you have public reviews

### Common Errors

**"Failed to fetch reviews"**

- API key invalid or not set
- Place ID incorrect
- API not enabled in Google Cloud Console

**CORS errors**

- Backend function not deployed
- API endpoint URL incorrect

**No reviews in response**

- Your business might not have any Google reviews yet
- Reviews might be filtered by Google

### Testing the Backend Function

```bash
# Test locally
curl http://localhost:8888/.netlify/functions/google-reviews

# Test production
curl https://risingtidecapital.us/.netlify/functions/google-reviews
```

---

## 💰 Costs

- **Google Places API**:

  - Free tier: First $200/month free (covers ~20,000 requests)
  - After: $17 per 1,000 requests
  - With caching (1 hour), costs should be minimal

- **Third-party widgets**:
  - Elfsight: ~$6-10/month
  - Trustmary: Free tier available
  - EmbedSocial: ~$29/month

---

## 📱 Best Practices

1. **Cache reviews**: The backend function caches for 1 hour to reduce API costs
2. **Monitor usage**: Check Google Cloud Console → APIs & Services → Dashboard
3. **Encourage reviews**: Add "Leave a review" link prominently
4. **Respond to reviews**: Reply to all reviews (good and bad) on Google
5. **Show recent reviews**: Keep reviews fresh and relevant

---

## 🔐 Security Checklist

- ✅ API key restricted to your domain
- ✅ API key restricted to Places API only
- ✅ API key stored in environment variables (not in code)
- ✅ Backend function handles API calls (not frontend)
- ✅ CORS properly configured
- ✅ Rate limiting in place (via caching)

---

## 📞 Need Help?

- Google Places API Docs: https://developers.google.com/maps/documentation/places/web-service/overview
- Netlify Functions: https://docs.netlify.com/functions/overview/
- Your Google Cloud Console: https://console.cloud.google.com/

---

## 🎯 Quick Decision Guide

**Use Option 1** if:

- You just want a link to your Google reviews
- Minimal setup time needed

**Use Option 2** if:

- You want it working today with zero coding
- Budget allows $5-30/month
- You want automatic updates

**Use Option 3** if:

- You want full control and customization
- You want it to match your site design perfectly
- You're comfortable with API setup
- You want to avoid ongoing costs

---

**Recommendation for Rising Tide Capital**: Start with **Option 2** (third-party widget) for immediate results, then migrate to **Option 3** (full integration) when you have time for a more custom solution.
