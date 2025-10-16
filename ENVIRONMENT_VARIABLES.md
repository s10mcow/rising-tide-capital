# Environment Variables

## Required for Google Reviews

Add these to your Netlify Dashboard (Site Settings → Environment Variables):

### GOOGLE_PLACES_API_KEY

- **Value:** Your Google Places API key
- **Get it:** https://console.cloud.google.com/
- **Example:** `AIzaSyBk_your_actual_api_key_here`

### GOOGLE_PLACE_ID

- **Value:** Your Google Business Place ID
- **Get it:** https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
- **Example:** `ChIJN1t_tDeuEmsRUsoyG83frY4`

---

## Local Development

For testing locally with `netlify dev`:

1. Create a `.env` file in project root (it's gitignored)
2. Add:
   ```
   GOOGLE_PLACES_API_KEY=your_key_here
   GOOGLE_PLACE_ID=your_place_id_here
   ```
3. Run: `netlify dev`

---

## Security Notes

- ✅ Never commit API keys to git
- ✅ Always restrict API keys to your domain
- ✅ Use environment variables for sensitive data
- ✅ Keep `.env` in `.gitignore`
