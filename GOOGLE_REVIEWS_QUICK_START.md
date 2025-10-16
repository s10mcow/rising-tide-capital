# 🚀 Google Reviews - Quick Start

## 5-Minute Setup (Recommended)

### Step 1: Find Your Place ID (2 min)

```
1. Go to: https://www.google.com/maps
2. Search for "Rising Tide Capital Partners"
3. Click on your business
4. Look at URL - copy the long string after "place/" or use Place ID Finder:
   https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
```

### Step 2: Get API Key (3 min)

```
1. Go to: https://console.cloud.google.com/
2. Create new project: "Rising Tide Website"
3. Enable API: "Places API"
4. Create Credentials → API Key
5. Restrict to: "Places API" + "https://risingtidecapital.us/*"
```

### Step 3: Add to Netlify

```
1. Netlify Dashboard → Your Site → Site Settings → Environment Variables
2. Add variable:
   - Key: GOOGLE_PLACES_API_KEY
   - Value: [paste your API key]
3. Add variable:
   - Key: GOOGLE_PLACE_ID
   - Value: [paste your Place ID]
```

### Step 4: Update Landing Page

```tsx
// src/pages/Landing/Landing.tsx

import GoogleReviews from "../../components/GoogleReviews";

// Add where you want reviews to appear:
<GoogleReviews
  placeId="YOUR_PLACE_ID"
  apiEndpoint="/.netlify/functions/google-reviews"
  maxReviews={6}
/>;
```

### Step 5: Deploy

```bash
git add .
git commit -m "Add Google Reviews integration"
git push origin main
```

---

## ⚡ Alternative: Use Elfsight (Even Faster)

### 2-Minute Setup:

1. Go to: https://elfsight.com/google-reviews-widget/
2. Sign up (free trial)
3. Connect your Google Business
4. Customize widget
5. Copy embed code
6. Paste in your Landing.tsx

**Cost:** ~$6/month after trial

---

## 📍 Files Created

- ✅ `src/components/GoogleReviews.tsx` - Main component
- ✅ `netlify/functions/google-reviews.ts` - Backend API
- ✅ `netlify.toml` - Netlify configuration
- ✅ `GOOGLE_REVIEWS_SETUP.md` - Full documentation
- ✅ `src/pages/Landing/Landing.example.tsx` - Usage examples

---

## 🎯 Where to Add Reviews?

**Replace testimonials:**

```tsx
// Remove or comment out:
// <TestimonialsSection />

// Add:
<GoogleReviews placeId="..." apiEndpoint="..." maxReviews={6} />
```

**Add below testimonials:**

```tsx
<TestimonialsSection />
<GoogleReviews placeId="..." apiEndpoint="..." maxReviews={3} />
```

**Add at bottom:**

```tsx
<ContactUsSection />
<GoogleReviews placeId="..." apiEndpoint="..." maxReviews={12} />
```

---

## 🐛 Troubleshooting

**Not showing?**

- Check browser console (F12) for errors
- Test API: `curl https://risingtidecapital.us/.netlify/functions/google-reviews`
- Verify environment variables in Netlify

**Common Issues:**

- ❌ Wrong Place ID → Reviews won't load
- ❌ API key not set → Function returns error
- ❌ Domain not whitelisted → API blocked

---

## 💡 Pro Tips

1. **Encourage reviews:** Add "Leave a Review" CTA button
2. **Respond to all reviews:** Shows you care
3. **Monitor monthly:** Google Cloud Console → Usage
4. **Cache enabled:** Reviews update every hour (reduces costs)

---

## 📞 Need Help?

See full guide: `GOOGLE_REVIEWS_SETUP.md`

Or contact:

- Google Cloud Support: https://cloud.google.com/support
- Netlify Support: https://www.netlify.com/support/
