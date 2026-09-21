import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
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