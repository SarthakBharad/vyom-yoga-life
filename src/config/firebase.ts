import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Loud, early failure instead of a silent 400 from Firestore later.
const missing = Object.entries(firebaseConfig)
  .filter(([key, value]) => key !== 'measurementId' && !value)
  .map(([key]) => `VITE_FIREBASE_${key.replace(/[A-Z]/g, c => '_' + c).toUpperCase()}`)

if (missing.length > 0) {
  console.error(
    '🔥 Firebase config is incomplete. Missing env vars:',
    missing.join(', '),
    '\nLocal: create .env.local in the project root and restart `pnpm dev`.',
    '\nVercel: add them under Settings → Environment Variables, then redeploy.'
  )
}

// Reuse the existing app instead of creating a second one (HMR / double import safe).
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// ============================================
// APP CHECK
// ============================================
// Without this, anyone can read your API key out of the JS bundle and write
// directly to Firestore with curl — security rules alone cannot tell your
// website apart from a script. App Check attaches a reCAPTCHA v3 attestation
// token to every request, and (once enforcement is on) Firebase rejects
// anything that arrives without one.
//
// Setup:
//   1. google.com/recaptcha/admin → register a site → reCAPTCHA v3
//      → add vyomyogalife.com AND localhost → copy the SITE key
//   2. Firebase Console → Build → App Check → register your web app
//      → reCAPTCHA v3 → paste the SECRET key
//   3. Add VITE_RECAPTCHA_SITE_KEY to .env.local and Vercel
//   4. Watch App Check → Metrics for a few days. Only once ~100% of requests
//      are verified, click Enforce on Cloud Firestore.
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY

if (recaptchaSiteKey) {
  // Lets you test against a real App Check-enforced backend from localhost.
  // Run `pnpm dev`, open the console, copy the debug token it prints, and
  // register it under App Check → Manage debug tokens.
  if (import.meta.env.DEV) {
    ;(self as unknown as Record<string, unknown>).FIREBASE_APPCHECK_DEBUG_TOKEN = true
  }

  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(recaptchaSiteKey),
      isTokenAutoRefreshEnabled: true,
    })
  } catch (error) {
    console.error('App Check failed to initialize:', error)
  }
} else if (import.meta.env.DEV) {
  // DEV only — a production console should be clean for anyone who opens it.
  console.info('App Check is disabled (VITE_RECAPTCHA_SITE_KEY not set).')
}

export const db: Firestore = getFirestore(app)

// Analytics must never run at module load: it throws without measurementId,
// on http://localhost, and when an ad blocker kills the gtag request.
export let analytics: Analytics | null = null

if (import.meta.env.PROD && firebaseConfig.measurementId) {
  isSupported()
    .then(supported => {
      if (supported) analytics = getAnalytics(app)
    })
    .catch(() => {
      /* analytics is optional — never let it break the app */
    })
}

export default app