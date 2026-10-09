<div align="center">

<img src="src/assets/logo.png" alt="Vyom Yoga Life logo" width="150" />

# Vyom Yoga Life

**Yoga, breathwork and meditation with Avani, online and in Ahmedabad.**

A responsive website for a yoga teacher's practice. Visitors can explore classes, read the teacher's story, and register or get in touch.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white)](https://pnpm.io)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vyom-yoga-life.vercel.app)

[**Live site**](https://vyom-yoga-life.vercel.app) · [Getting started](#getting-started) · [Environment](#environment-variables) · [Deployment](#deployment)

</div>

---

## About

Vyom Yoga Life is the online home of **Avani**, a yoga teacher based in Ahmedabad, India. She teaches multi-style yoga (Ashtanga, Hatha and Vinyasa) to students in India and abroad. The site presents her story and her three class formats: private sessions, group classes and workshops. It also turns visitors into students through a detailed registration form and a contact form, and both forms store submissions in Cloud Firestore.

This is a client project, built and maintained by [Sarthak Bharad](https://github.com/SarthakBharad).

## Features

### For visitors

- **11 routes:** Home, About, Private Sessions, Group Classes, Workshops, Portfolio, Testimonials, FAQ, Contact, Register and a custom 404 page
- **Hero section** with a looping background video and links to Instagram, Facebook and Google Maps
- **Registration form** covering personal details, contact numbers, experience level, preferred timing and a short health screening
- **Contact form** with inline validation and clear success and error states
- **Light and dark themes.** The site follows the OS preference on the first visit and remembers the visitor's choice after that
- **Scroll-reveal animations** with staggered children. Motion is switched off for visitors who prefer reduced motion
- **Mobile-first layout** with a slide-in navigation drawer

### Under the hood

- **Route-level code splitting** with `React.lazy` and `Suspense`, plus manual vendor chunks (`react`, `router`, `firebase`, `firestore`)
- **Self-hosted, subset WOFF2 fonts** (Recia and Supreme) with `font-display: swap`. They cover Latin and Latin Extended at about 18–25 KB per weight
- **`ResponsiveImage` component** that serves AVIF, then WebP, then JPEG. It reserves the aspect ratio so the page doesn't shift and shows a placeholder if a file is missing
- **Per-page SEO:** `setPageMeta()` updates the title, description, Open Graph and Twitter tags for each page
- **Form safety:**
  - Firestore rules allow creating documents but not reading them
  - Optional Firebase App Check with reCAPTCHA Enterprise
  - A client-side throttle allows one submission per hour for each email or WhatsApp number
- **Analytics:**
  - Firebase Analytics loads lazily at idle time, only in production
  - Vercel Web Analytics is also enabled
- **Hardened hosting:** `vercel.json` sets a strict CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and COOP. Hashed assets get long-lived immutable caching
- **Accessibility:**
  - Skip-to-content link
  - Visible focus rings
  - `aria-expanded` and `aria-label` on interactive controls
  - Semantic landmarks
  - Respects `prefers-reduced-motion` and `prefers-color-scheme`

## Tech stack

| Layer      | Tools                                                              |
| ---------- | ------------------------------------------------------------------ |
| UI         | React 18, TypeScript 5 (strict)                                    |
| Build      | Vite 6, `@vitejs/plugin-react`                                     |
| Styling    | Tailwind CSS v4 via `@tailwindcss/vite` (no PostCSS config)        |
| Routing    | React Router v6                                                    |
| Backend    | Firebase: Cloud Firestore, App Check, Analytics                    |
| Hosting    | Vercel, with Vercel Web Analytics                                  |
| Tooling    | pnpm, ESLint 9 (flat config), FFmpeg (media pipeline)              |

## Pages

| Route                 | Page             | What's on it                                                                  |
| --------------------- | ---------------- | ----------------------------------------------------------------------------- |
| `/`                   | Home             | Hero video, journey, stats, philosophy, services, testimonial preview, contact form |
| `/about`              | About            | Avani's story, guiding principles, call to action                             |
| `/services/private`   | Private Sessions | What to expect, benefits, FAQ                                                 |
| `/services/group`     | Group Classes    | Weekly timetable, why group classes                                           |
| `/services/workshops` | Workshops        | Workshop calendar, what's included                                            |
| `/portfolio`          | Portfolio        | Gallery grid by category                                                      |
| `/testimonials`       | Testimonials     | Student stories                                                               |
| `/faq`                | FAQ              | Accordion grouped by topic                                                    |
| `/contact`            | Contact          | Phone, email, address, contact form                                           |
| `/register`           | Register         | Full registration form                                                        |
| `*`                   | Not Found        | Custom 404                                                                    |

## Getting started

### Prerequisites

- **Node.js 20+**
- **pnpm 10+**: `npm install -g pnpm`, or `corepack enable`
- A **Firebase project** with Cloud Firestore enabled

### Install and run

```bash
git clone https://github.com/SarthakBharad/vyom-yoga-life.git
cd vyom-yoga-life
pnpm install
```

Create a `.env.local` file in the project root (see [Environment variables](#environment-variables)), then start the dev server:

```bash
pnpm dev
```

The site runs at **http://localhost:5173**.

### Scripts

| Command        | Description                                         |
| -------------- | --------------------------------------------------- |
| `pnpm dev`     | Start the Vite dev server with HMR                  |
| `pnpm build`   | Type-check (`tsc -b`) and build to `dist/`          |
| `pnpm preview` | Serve the production build locally                  |
| `pnpm lint`    | Run ESLint across the project                       |

## Environment variables

All variables use the `VITE_` prefix so Vite exposes them to the client. Put them in `.env.local`. Files matching `*.local` are git-ignored.

```env
# Required
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Optional
VITE_FIREBASE_MEASUREMENT_ID=   # enables Firebase Analytics (production builds only)
VITE_RECAPTCHA_SITE_KEY=        # enables App Check with reCAPTCHA Enterprise
```

If a required variable is missing, the app logs its exact name to the browser console at startup.

> **Note:** Firebase web config values are not secrets, because they end up in the client bundle by design. The data is protected by Firestore security rules and App Check, not by hiding these keys.

## Firebase

### Collections

| Collection            | Written by          | Fields                                                                                                                                         |
| --------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `contact_submissions` | Contact form        | `name`, `email`, `message`, `submittedAt`, `status: "new"`                                                                                     |
| `registrations`       | Registration form   | `name`, `gender`, `age`, `height`, `weight`, `whatsapp`, `calling`, `level`, `timing`, `injuries`, `metabolic`, `endocrine`, `otherHealth`, `reason`, `submittedAt`, `status: "pending"` |

Submissions are reviewed in the Firebase console.

### Security rules

Registrations include health information, so **the public must never be able to read either collection**. The site only creates documents, and the duplicate check runs in `localStorage`, so it needs no read access.

<details>
<summary>Minimal create-only rules (example)</summary>

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contact_submissions/{id} {
      allow create: if request.resource.data.status == 'new';
      allow read, update, delete: if false;
    }
    match /registrations/{id} {
      allow create: if request.resource.data.status == 'pending';
      allow read, update, delete: if false;
    }
  }
}
```

The rules deployed in the Firebase console are the source of truth, and they can be stricter than this example (for example, field type and length checks).

</details>

### App Check (optional)

When `VITE_RECAPTCHA_SITE_KEY` is set, App Check runs with reCAPTCHA Enterprise. In development, the app turns on a debug token, which is printed to the browser console. Register that token under **Firebase console → App Check → Manage debug tokens** so local submissions are accepted.

## Deployment

The site is deployed on **Vercel**.

1. Import the repository into Vercel. The **Vite** framework preset is detected automatically.
2. Build command: `pnpm build`. Output directory: `dist`.
3. Add every variable from [Environment variables](#environment-variables) under **Settings → Environment Variables**, then redeploy.

`vercel.json` takes care of the rest:

- **SPA rewrites**, so deep links like `/services/private` work when the page is refreshed
- **Security headers**, including a strict Content-Security-Policy
- **Immutable caching** for `/assets/*` and static media

> If you add a new third-party service (for example a Google Maps iframe, a YouTube embed or another analytics script), add its domain to the `Content-Security-Policy` in `vercel.json`. Otherwise the browser will block it.

## Media pipeline

`optimize-media.ps1` is a PowerShell script that converts raw photos and video into web-ready assets with FFmpeg.

```powershell
# One-time setup
winget install Gyan.FFmpeg

# Hero video → MP4 (H.264) + WebM (VP9), 1280px, 24 fps, no audio, plus a poster image
.\optimize-media.ps1 -Mode video -InputPath .\src\assets\video_2.mp4

# Photo → 1600px and 800px versions in JPEG, WebP and AVIF
.\optimize-media.ps1 -Mode photo -InputPath "$HOME\Downloads\studio.jpg" -Name gallery-01
```

- Optimised files are written to `src/assets/`. Originals are moved (video) or copied (photo) to `media-src/`.
- The script warns if the MP4 is over the **1.5 MB** target and suggests a re-encode at 960px.
- Photo mode prints a ready-to-paste `<ResponsiveImage />` snippet for the new files.

## Design system

### Colour palette

| Token        | Colour | Used for |
| ------------ | ------ | -------- |
| `cream` | ![#fcf9f0](https://img.shields.io/badge/%23fcf9f0-fcf9f0?style=flat-square) | Page background (light) |
| `linen` | ![#ead2bc](https://img.shields.io/badge/%23ead2bc-ead2bc?style=flat-square) | Section backgrounds, borders |
| `terracotta` | ![#be8050](https://img.shields.io/badge/%23be8050-be8050?style=flat-square) | Primary accent, buttons, focus rings |
| `caramel` | ![#cd7d3e](https://img.shields.io/badge/%23cd7d3e-cd7d3e?style=flat-square) | Highlights, success states |
| `taupe` | ![#b59780](https://img.shields.io/badge/%23b59780-b59780?style=flat-square) | Muted accent |
| `walnut` | ![#6b4f3f](https://img.shields.io/badge/%236b4f3f-6b4f3f?style=flat-square) | Secondary text, hover states |
| `espresso` | ![#512815](https://img.shields.io/badge/%23512815-512815?style=flat-square) | Primary text, footer, feature sections |
| `char` | ![#2a160a](https://img.shields.io/badge/%232a160a-2a160a?style=flat-square) | Cards and sections (dark) |
| `ink` | ![#1a0c06](https://img.shields.io/badge/%231a0c06-1a0c06?style=flat-square) | Page background (dark) |

The text colours (`text-primary` and `text-secondary`) are CSS variables, so they switch automatically with the `.dark` class.

### Typography

- **Display and headings:** Recia (400–700, plus italic)
- **Body and UI:** Supreme (400, 500, 700). Weight 600 maps to the real Bold outlines instead of a synthetic semibold
- **Type scale** from `tailwind.config.js`: `text-h1` to `text-h4`, plus `text-body`, `text-bodylg` and `text-bodysm`

### Motion

- Page headers use CSS keyframe animations (`animate-fade-up`, `-d1` to `-d4`).
- Below-the-fold sections use the `useReveal` hook. It's an IntersectionObserver that adds `.revealed` to a section and all of its `.reveal` children, and `.reveal-group` adds the stagger.

## Project structure

```
vyom-yoga-life/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/               # logo, hero video and posters, fonts/ (WOFF2)
│   ├── components/
│   │   ├── layout/           # Navbar, Footer
│   │   ├── sections/         # Hero, Journey, Stats, Philosophy, Services,
│   │   │                     # TestimonialsPreview, TestimonialsGrid, GalleryGrid,
│   │   │                     # ContactForm, RegisterForm
│   │   ├── ui/               # Button, Card, ImagePlaceholder, ResponsiveImage
│   │   ├── utils/            # firebaseUtils.ts (form submissions), meta.ts (SEO)
│   │   └── ErrorBoundary.tsx
│   ├── config/               # firebase.ts (Firestore + App Check), analytics.ts
│   ├── context/              # ThemeContext.tsx (light/dark)
│   ├── hooks/                # useReveal.ts
│   ├── pages/
│   │   ├── services/         # private.tsx, group.tsx, workshops.tsx
│   │   └── *.tsx             # Home, About, Portfolio, Testimonials, FAQ,
│   │                         # Contact, Register, NotFound
│   ├── routes/               # AppRouter.tsx (lazy routes, scroll reset)
│   ├── styles/               # fonts.css (@font-face)
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css             # Tailwind entry, theme variables, reveal utilities
│   └── vite-env.d.ts
├── eslint.config.js
├── optimize-media.ps1        # FFmpeg media pipeline
├── tailwind.config.js        # palette, type scale, keyframes
├── vercel.json               # rewrites, security headers, caching
└── vite.config.ts            # plugins, vendor chunking
```

## Credits

- **Client:** Avani, [Vyom Yoga Life](https://www.instagram.com/vyom_yogalife)
- **Design and development:** [Sarthak Bharad](https://github.com/SarthakBharad)

## License

© Vyom Yoga Life. All rights reserved.

The source code is public for portfolio purposes. The brand name, logo, photography, video and written content belong to Vyom Yoga Life, and you may not reuse them without permission.