# Tricoci University Signature Builder (Firebase Auth, Vite + React)

This app is restricted to @tricociuniversity.edu users via Firebase Authentication.

## Local Dev
```bash
npm install
cp .env.example .env.local  # fill with your Firebase values
npm run dev
```

## Deploy to Vercel
- Add env vars in Project → Settings → Environment Variables:
  - VITE_FIREBASE_API_KEY
  - VITE_FIREBASE_AUTH_DOMAIN
  - VITE_FIREBASE_PROJECT_ID
  - VITE_FIREBASE_APP_ID
- Build Command: `npm run build`
- Output Directory: `dist`

## Notes
- `index.html` includes `<meta name="robots" content="noindex, nofollow" />`.
- `public/robots.txt` blocks all crawlers.
- Only @tricociuniversity.edu users can access.
