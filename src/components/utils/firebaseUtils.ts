import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../config/firebase'

// ============================================
// SPAM THROTTLE (client-side, no Firestore read)
// ============================================
// The old version queried Firestore to find duplicates. That only works if the
// security rules allow ANYONE to READ contact_submissions and registrations —
// which would expose every visitor's name, phone number and health answers.
// Rules now allow create-only, so the throttle lives in localStorage instead.

const ONE_HOUR = 60 * 60 * 1000

function throttleKey(kind: string, id: string) {
  return `vyom:${kind}:${id.toLowerCase().trim()}`
}

function wasSubmittedRecently(kind: string, id: string): boolean {
  try {
    const last = localStorage.getItem(throttleKey(kind, id))
    if (!last) return false
    return Date.now() - Number(last) < ONE_HOUR
  } catch {
    return false
  }
}

function markSubmitted(kind: string, id: string): void {
  try {
    localStorage.setItem(throttleKey(kind, id), String(Date.now()))
  } catch {
    /* private browsing — throttle is best-effort */
  }
}

function describe(error: unknown): string {
  const code = (error as { code?: string })?.code ?? ''
  if (code === 'permission-denied') {
    return 'Submission was blocked by the server. Please contact us directly.'
  }
  if (code === 'unavailable' || code === 'failed-precondition') {
    return 'Could not reach the server. Check your connection and try again.'
  }
  return 'Failed to submit. Please try again.'
}

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
    markSubmitted('contact', data.email)
    console.log('✅ Contact submitted with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('❌ Error submitting contact:', error)
    throw new Error(describe(error))
  }
}

export async function isDuplicateContact(email: string): Promise<boolean> {
  return wasSubmittedRecently('contact', email)
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
    markSubmitted('registration', data.whatsapp)
    console.log('✅ Registration submitted with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('❌ Error submitting registration:', error)
    throw new Error(describe(error))
  }
}

export async function isDuplicateRegistration(whatsapp: string): Promise<boolean> {
  return wasSubmittedRecently('registration', whatsapp)
}