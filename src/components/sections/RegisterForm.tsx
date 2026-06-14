import { useState } from 'react'
import { submitRegistration, isDuplicateRegistration } from '../utils/firebaseUtils'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function RegisterForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    whatsapp: '',
    calling: '',
    level: '',
    timing: '',
    injuries: '',
    metabolic: '',
    endocrine: '',
    otherHealth: '',
    reason: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation
  function validate(): Record<string, string> {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.gender) e.gender = 'Gender is required'
    if (!formData.age.trim()) e.age = 'Age is required'
    if (!formData.height.trim()) e.height = 'Height is required'
    if (!formData.weight.trim()) e.weight = 'Weight is required'
    if (!formData.whatsapp.trim()) e.whatsapp = 'WhatsApp number is required'
    if (!formData.calling.trim()) e.calling = 'Calling number is required'
    if (!formData.level) e.level = 'Experience level is required'
    if (!formData.timing) e.timing = 'Preferred timing is required'
    if (!formData.reason.trim()) e.reason = 'Reason is required'
    return e
  }

  // Handle input change
  function handleChange(key: string, value: string) {
    setFormData(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: '' }))
  }

  // Submit form
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validate
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    setError('')

    try {
      // Check for spam (duplicate registrations)
      const isDuplicate = await isDuplicateRegistration(formData.whatsapp)
      if (isDuplicate) {
        setError('You already registered recently. Please wait 1 hour before registering again.')
        setLoading(false)
        return
      }

      // Submit to Firebase
      await submitRegistration({
        name: formData.name.trim(),
        gender: formData.gender,
        age: formData.age.trim(),
        height: formData.height.trim(),
        weight: formData.weight.trim(),
        whatsapp: formData.whatsapp.trim(),
        calling: formData.calling.trim(),
        level: formData.level,
        timing: formData.timing,
        injuries: formData.injuries,
        metabolic: formData.metabolic,
        endocrine: formData.endocrine,
        otherHealth: formData.otherHealth,
        reason: formData.reason.trim(),
      })

      // Success!
      setSubmitted(true)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
      setLoading(false)
    }
  }

  // Success state
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full bg-caramel/20 dark:bg-caramel/10 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-caramel"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-h3 text-text-primary mb-3">Registration Received! ✨</h3>
        <p className="text-body text-text-secondary mb-2">
          Thank you for registering with Vyom Yoga Life.
        </p>
        <p className="text-body text-text-secondary mb-8">
          We'll review your registration and contact you soon with your class details.
        </p>
        <div className="inline-block p-4 bg-linen dark:bg-walnut/20 rounded-lg">
          <p className="text-bodysm text-text-primary">
            <strong>Hari Om! 🙏</strong>
          </p>
        </div>
      </div>
    )
  }

  // Form state
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto" noValidate>
      {/* Error alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 rounded-lg border border-red-300 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-300 font-medium">{error}</p>
        </div>
      )}

      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="font-display text-h4 mb-6 text-text-primary">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.name}
              onChange={e => handleChange('name', e.target.value)}
              disabled={loading}
              className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors ${
                errors.name ? 'border-red-500' : 'border-linen dark:border-walnut/30'
              } placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
            />
            {errors.name && <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.name}</p>}
          </div>

          {/* Gender */}
          <div>
            <select
              value={formData.gender}
              onChange={e => handleChange('gender', e.target.value)}
              disabled={loading}
              className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors ${
                errors.gender ? 'border-red-500' : 'border-linen dark:border-walnut/30'
              } focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
            >
              <option value="">Select Gender *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.gender}</p>}
          </div>

          {/* Age */}
          <div>
            <input
              type="text"
              placeholder="Age (e.g., 25) *"
              value={formData.age}
              onChange={e => handleChange('age', e.target.value)}
              disabled={loading}
              className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors ${
                errors.age ? 'border-red-500' : 'border-linen dark:border-walnut/30'
              } placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
            />
            {errors.age && <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.age}</p>}
          </div>

          {/* Height - FIXED: Removed escaped quote */}
          <div>
            <input
              type="text"
              placeholder="Height (e.g., 5 ft 8 in) *"
              value={formData.height}
              onChange={e => handleChange('height', e.target.value)}
              disabled={loading}
              className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors ${
                errors.height ? 'border-red-500' : 'border-linen dark:border-walnut/30'
              } placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
            />
            {errors.height && <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.height}</p>}
          </div>

          {/* Weight */}
          <div>
            <input
              type="text"
              placeholder="Weight (e.g., 70kg) *"
              value={formData.weight}
              onChange={e => handleChange('weight', e.target.value)}
              disabled={loading}
              className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors ${
                errors.weight ? 'border-red-500' : 'border-linen dark:border-walnut/30'
              } placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
            />
            {errors.weight && <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.weight}</p>}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-8">
        <h3 className="font-display text-h4 mb-6 text-text-primary">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-5">
          {/* WhatsApp */}
          <div>
            <input
              type="tel"
              placeholder="WhatsApp Number (with country code) *"
              value={formData.whatsapp}
              onChange={e => handleChange('whatsapp', e.target.value)}
              disabled={loading}
              className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors ${
                errors.whatsapp ? 'border-red-500' : 'border-linen dark:border-walnut/30'
              } placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
            />
            {errors.whatsapp && <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.whatsapp}</p>}
          </div>

          {/* Calling */}
          <div>
            <input
              type="tel"
              placeholder="Calling Number (with country code) *"
              value={formData.calling}
              onChange={e => handleChange('calling', e.target.value)}
              disabled={loading}
              className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors ${
                errors.calling ? 'border-red-500' : 'border-linen dark:border-walnut/30'
              } placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
            />
            {errors.calling && <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.calling}</p>}
          </div>
        </div>
      </div>

      {/* Yoga Experience */}
      <div className="mb-8">
        <h3 className="font-display text-h4 mb-6 text-text-primary">Yoga Experience</h3>
        <div className="grid md:grid-cols-2 gap-5">
          {/* Level */}
          <div>
            <select
              value={formData.level}
              onChange={e => handleChange('level', e.target.value)}
              disabled={loading}
              className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors ${
                errors.level ? 'border-red-500' : 'border-linen dark:border-walnut/30'
              } focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
            >
              <option value="">Select Level *</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {errors.level && <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.level}</p>}
          </div>

          {/* Timing */}
          <div>
            <select
              value={formData.timing}
              onChange={e => handleChange('timing', e.target.value)}
              disabled={loading}
              className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors ${
                errors.timing ? 'border-red-500' : 'border-linen dark:border-walnut/30'
              } focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
            >
              <option value="">Select Timing *</option>
              <option value="Morning (6-7 AM)">Morning (6-7 AM)</option>
              <option value="Evening (5-7 PM)">Evening (5-7 PM)</option>
              <option value="Flexible">Flexible</option>
            </select>
            {errors.timing && <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.timing}</p>}
          </div>
        </div>
      </div>

      {/* Health Information */}
      <div className="mb-8">
        <h3 className="font-display text-h4 mb-6 text-text-primary">Health Information</h3>
        <div className="grid md:grid-cols-2 gap-5">
          {/* Injuries */}
          <div>
            <select
              value={formData.injuries}
              onChange={e => handleChange('injuries', e.target.value)}
              disabled={loading}
              className="w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border border-linen dark:border-walnut/30 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50"
            >
              <option value="">Any Injuries?</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* Metabolic */}
          <div>
            <select
              value={formData.metabolic}
              onChange={e => handleChange('metabolic', e.target.value)}
              disabled={loading}
              className="w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border border-linen dark:border-walnut/30 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50"
            >
              <option value="">Metabolic Syndrome?</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* Endocrine */}
          <div>
            <select
              value={formData.endocrine}
              onChange={e => handleChange('endocrine', e.target.value)}
              disabled={loading}
              className="w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border border-linen dark:border-walnut/30 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50"
            >
              <option value="">Endocrine Issues?</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* Other Health */}
          <div>
            <input
              type="text"
              placeholder="Other Health Issues (optional)"
              value={formData.otherHealth}
              onChange={e => handleChange('otherHealth', e.target.value)}
              disabled={loading}
              className="w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border border-linen dark:border-walnut/30 placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Reason */}
      <div className="mb-8">
        <h3 className="font-display text-h4 mb-6 text-text-primary">Why Join Us?</h3>
        <textarea
          rows={4}
          placeholder="Tell us your reason for joining yoga classes... *"
          value={formData.reason}
          onChange={e => handleChange('reason', e.target.value)}
          disabled={loading}
          className={`w-full p-4 rounded-xl text-body text-text-primary bg-white dark:bg-char/60 border transition-colors resize-none ${
            errors.reason ? 'border-red-500' : 'border-linen dark:border-walnut/30'
          } placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50`}
        />
        {errors.reason && <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 ml-1">{errors.reason}</p>}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut disabled:opacity-50 disabled:cursor-not-allowed transition shadow-card"
      >
        {loading ? 'Submitting...' : 'Complete Registration'}
      </button>

      <p className="text-xs text-text-secondary text-center mt-6">
        * Required fields. We respect your privacy and will only use your information for yoga classes.
      </p>
    </form>
  )
}