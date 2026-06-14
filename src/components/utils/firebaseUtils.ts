import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

// Import Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore'

// ============================================
// CONTACT FORM SUBMISSION
// ============================================

export async function submitContactForm(data: {
  name: string
  email: string
  message: string
}): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'contact_submissions'), {
      name: data.name,
      email: data.email,
      message: data.message,
      submittedAt: Timestamp.now(),
      status: 'new',
    })
    console.log('✅ Contact submitted with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('❌ Error submitting contact:', error)
    throw new Error('Failed to submit. Please try again.')
  }
}

/**
 * Check for duplicate contact (same email within 1 hour)
 * Prevents spam submissions
 */
export async function isDuplicateContact(email: string): Promise<boolean> {
  try {
    const oneHourAgo = Timestamp.fromDate(
      new Date(Date.now() - 60 * 60 * 1000)
    )
    const q = query(
      collection(db, 'contact_submissions'),
      where('email', '==', email),
      where('submittedAt', '>=', oneHourAgo)
    )
    const result = await getDocs(q)
    return result.size > 0
  } catch (error) {
    console.error('Error checking duplicate contact:', error)
    return false
  }
}

// ============================================
// REGISTRATION FORM SUBMISSION
// ============================================

export async function submitRegistration(data: {
  name: string
  gender: string
  age: string
  height: string
  weight: string
  whatsapp: string
  calling: string
  level: string
  timing: string
  injuries: string
  metabolic: string
  endocrine: string
  otherHealth: string
  reason: string
}): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'registrations'), {
      name: data.name,
      gender: data.gender,
      age: data.age,
      height: data.height,
      weight: data.weight,
      whatsapp: data.whatsapp,
      calling: data.calling,
      level: data.level,
      timing: data.timing,
      injuries: data.injuries,
      metabolic: data.metabolic,
      endocrine: data.endocrine,
      otherHealth: data.otherHealth,
      reason: data.reason,
      submittedAt: Timestamp.now(),
      status: 'pending',
    })
    console.log('✅ Registration submitted with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('❌ Error submitting registration:', error)
    throw new Error('Failed to submit. Please try again.')
  }
}

/**
 * Check for duplicate registration (same WhatsApp within 1 hour)
 * Prevents spam submissions
 */
export async function isDuplicateRegistration(whatsapp: string): Promise<boolean> {
  try {
    const oneHourAgo = Timestamp.fromDate(
      new Date(Date.now() - 60 * 60 * 1000)
    )
    const q = query(
      collection(db, 'registrations'),
      where('whatsapp', '==', whatsapp),
      where('submittedAt', '>=', oneHourAgo)
    )
    const result = await getDocs(q)
    return result.size > 0
  } catch (error) {
    console.error('Error checking duplicate registration:', error)
    return false
  }
}