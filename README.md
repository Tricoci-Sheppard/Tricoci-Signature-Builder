# Tricoci University Signature Builder with Firebase Auth

This app uses Firebase Authentication to restrict access to users in the @tricociuniversity.edu domain.

## 🚀 Setup

1. Create a Firebase project and enable Google Sign-In.
2. Add your Vercel domain under "Authorized Domains" in Firebase.
3. Copy your Firebase config into a `.env` file based on `.env.example`.
4. Deploy to Vercel.

## 🧪 Local Dev

```bash
npm install
npm run dev
```

## 🔐 Environment Variables

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_APP_ID

Add them to Vercel Project → Settings → Environment Variables.

## 🛡️ Crawling Protection

- `robots.txt` blocks all crawlers.
- `<meta name="robots" content="noindex, nofollow" />` in index.html.

## 🧭 Deployment on Vercel

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm ci` (or `npm install`)

Once deployed, only authenticated @tricociuniversity.edu users can access the app.
