import { initializeApp, getApps, getApp } from 'firebase/app'
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

export let analytics: Analytics | null = null

export async function initAnalytics(): Promise<void> {
  if (analytics || !import.meta.env.PROD || !firebaseConfig.measurementId) return

  try {
    if (!(await isSupported())) return
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
    analytics = getAnalytics(app)
  } catch {
    // Analytics is optional (ad blockers, privacy modes) — never let it break the site.
  }
}
