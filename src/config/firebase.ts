import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

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

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY

if (recaptchaSiteKey) {
  if (import.meta.env.DEV) {
    ;(self as unknown as Record<string, unknown>).FIREBASE_APPCHECK_DEBUG_TOKEN = true
  }

  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(recaptchaSiteKey),
      isTokenAutoRefreshEnabled: true,
    })
  } catch (error) {
    console.error('App Check failed to initialize:', error)
  }
} else if (import.meta.env.DEV) {
  console.info('App Check is disabled (VITE_RECAPTCHA_SITE_KEY not set).')
}

export const db: Firestore = getFirestore(app)
export default app