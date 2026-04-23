# 💊 Med Tracker — Parents' Medication & Vitals App

A personal Progressive Web App (PWA) for tracking daily medications and vital signs. Built for Sayed M. Pervez. No login required, works offline, installable on iPhone/iPad/Android.

---

## Features

- **Today's Meds** — Check off each medication as taken. Resets automatically each day.
- **Vitals & Fluids Log** — Log weight, temperature, blood pressure, pulse, respiration, pain level, and fluid intake.
- **Fluid Restriction Tracker** — Live progress bar toward the 1,500 mL/day limit.
- **Offline Support** — Service worker caches the app so it works without internet.
- **Installable PWA** — Add to home screen on any device for a native-app experience.
- **Large text & touch targets** — Designed for easy use without reading glasses.

---

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **localStorage** for data persistence (no backend required)
- **Service Worker** for offline capability
- **PWA Manifest** for home-screen install

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Deploy to Netlify

### Option 1 — Connect GitHub repo (recommended)

1. Push this repo to GitHub.
2. Go to [netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**.
3. Select your repo. Netlify auto-detects `netlify.toml` and runs `npm run build`.
4. Click **Deploy site**. Done.

### Option 2 — Manual drag-and-drop

```bash
npm run build
```

Drag the `dist/` folder onto the Netlify dashboard.

---

## Generate PWA Icons

The app needs two icon files in `/public/icons/`:

- `icon-192.png` (192×192 px)
- `icon-512.png` (512×512 px)

Create simple pill/medical icons using any image editor, or use [realfavicongenerator.net](https://realfavicongenerator.net) to generate them from any image.

Placeholder icons can be generated with this one-liner (requires `imagemagick`):

```bash
mkdir -p public/icons
convert -size 192x192 xc:"#1A3A5C" -fill white -font Helvetica -pointsize 90 -gravity center -annotate 0 '💊' public/icons/icon-192.png
convert -size 512x512 xc:"#1A3A5C" -fill white -font Helvetica -pointsize 240 -gravity center -annotate 0 '💊' public/icons/icon-512.png
```

---

## Install on iPhone/iPad (iOS)

1. Open Safari and navigate to the Netlify URL.
2. Tap the **Share** button (box with arrow).
3. Tap **Add to Home Screen**.
4. Tap **Add**. The app appears on the home screen like a native app.

---

## Updating Medications

Medications are hardcoded in:

```
src/data/medications.js
```

Edit that file, commit, and push. Netlify will auto-redeploy in ~30 seconds.

---

## Data & Privacy

All data is stored **locally on the device** using `localStorage`. No data is ever sent to any server. No analytics. No ads. Completely private.

> **Note:** Clearing browser data or "website data" in Safari settings will erase saved records. For backup, consider periodically exporting entries (future feature) or screenshotting the vitals log.
