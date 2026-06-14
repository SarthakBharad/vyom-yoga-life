import { useState } from 'react'
import { submitContactForm, isDuplicateContact } from '../utils/firebaseUtils'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Validation
  function validate() {
    const e: Record<string, string> = {}
    if (!fields.name.trim()) e.name = 'Name is required'
    if (!fields.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = 'Enter a valid email'
    if (!fields.message.trim()) e.message = 'Message is required'
    else if (fields.message.length < 10) e.message = 'Message should be at least 10 characters'
    return e
  }

  // Handle input change
  function update(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields(prev => ({ ...prev, [key]: e.target.value }))
      setErrors(prev => ({ ...prev, [key]: '' }))
    }
  }

  // Submit form
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    // Validate
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setState('loading')
    setErrorMessage('')

    try {
      // Check for spam (duplicate submissions)
      const isDuplicate = await isDuplicateContact(fields.email)
      if (isDuplicate) {
        setState('error')
        setErrorMessage('You already submitted a message recently. Please wait 1 hour before submitting again.')
        return
      }

      // Submit to Firebase
      await submitContactForm({
        name: fields.name.trim(),
        email: fields.email.trim(),
        message: fields.message.trim(),
      })

      // Success!
      setState('success')
      setFields({ name: '', email: '', message: '' })
    } catch (error) {
      setState('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.')
    }
  }

  // Success state
  if (state === 'success') {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full bg-caramel/20 dark:bg-caramel/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-caramel" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-h3 text-text-primary mb-3">Message Received! ✨</h3>
        <p className="text-body text-text-secondary mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        <button
          onClick={() => setState('idle')}
          className="px-6 py-2.5 rounded-full border border-terracotta text-terracotta font-semibold hover:bg-terracotta/5 transition"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  // Form state
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-5" noValidate>
      {/* Error alert */}
      {state === 'error' && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg border border-red-300 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-300 font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Name field */}
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={fields.name}
          onChange={update('name')}
          disabled={state === 'loading'}
          className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors ${
            errors.name ? 'border-red-500' : 'border-linen dark:border-walnut/30'
          } placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
        />
        {errors.name && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.name}</p>
        )}
      </div>

      {/* Email field */}
      <div>
        <input
          type="email"
          placeholder="Email Address"
          value={fields.email}
          onChange={update('email')}
          disabled={state === 'loading'}
          className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors ${
            errors.email ? 'border-red-500' : 'border-linen dark:border-walnut/30'
          } placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
        />
        {errors.email && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.email}</p>
        )}
      </div>

      {/* Message field */}
      <div>
        <textarea
          rows={5}
          placeholder="Your Message"
          value={fields.message}
          onChange={update('message')}
          disabled={state === 'loading'}
          className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors resize-none ${
            errors.message ? 'border-red-500' : 'border-linen dark:border-walnut/30'
          } placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
        />
        {errors.message && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.message}</p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full py-4 rounded-xl bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut disabled:opacity-50 disabled:cursor-not-allowed transition shadow-card"
      >
        {state === 'loading' ? 'Submitting...' : 'Submit Your Inquiry'}
      </button>
    </form>
  )
}