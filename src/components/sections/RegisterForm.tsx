import { useState } from 'react'

type FormData = {
  name: string; gender: string; age: string
  height: string; weight: string; whatsapp: string
  calling: string; level: string; timing: string
  injuries: string; metabolic: string; endocrine: string
  otherHealth: string; reason: string
}
type Errors = Partial<FormData>

const labelClass = 'block text-bodysm font-semibold text-espresso dark:text-cream mb-1'
const inputClass = (hasError = false) => [
  'w-full p-4 rounded-xl text-body text-text-primary',
  'bg-linen dark:bg-char/60 border',
  hasError ? 'border-taupe dark:border-caramel/60' : 'border-taupe/50 dark:border-walnut/30',
  'placeholder:text-text-secondary/70',
  'focus:outline-none focus:ring-2 focus:ring-terracotta dark:focus:ring-terracotta/70 focus:border-transparent',
  'shadow-sm transition-all duration-200',
].join(' ')
const errorClass = 'text-xs text-taupe dark:text-caramel mt-1 ml-1'
const sectionHeadClass = 'font-display text-h4 text-espresso dark:text-cream'
const pillClass = (selected: boolean) =>
  `px-5 py-3 rounded-full cursor-pointer transition-all ${
    selected
      ? 'bg-terracotta text-white shadow-md'
      : 'bg-linen dark:bg-walnut/20 text-text-primary border border-taupe/50 dark:border-walnut/30 hover:bg-linen/80 dark:hover:bg-walnut/30 shadow-sm'
  }`

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '', gender: '', age: '', height: '', weight: '',
    whatsapp: '', calling: '', level: '', timing: '',
    injuries: '', metabolic: '', endocrine: '', otherHealth: '', reason: '',
  })
  const [errors,    setErrors]    = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): Errors => {
    const e: Errors = {}
    if (!formData.name.trim())   e.name     = 'Name is required'
    if (!formData.gender)        e.gender   = 'Gender is required'
    if (!formData.age)           e.age      = 'Age is required'
    if (!formData.height)        e.height   = 'Height is required'
    if (!formData.weight)        e.weight   = 'Weight is required'
    if (!formData.whatsapp)      e.whatsapp = 'WhatsApp number is required'
    if (!formData.calling)       e.calling  = 'Calling number is required'
    if (!formData.level)         e.level    = 'Please select your level'
    if (!formData.timing)        e.timing   = 'Please select preferred timing'
    if (!formData.reason.trim()) e.reason   = 'Please tell us why you want to join'
    return e
  }

  const updateField = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }))
      setErrors(prev  => ({ ...prev, [field]: undefined }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full bg-caramel/20 dark:bg-caramel/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-caramel" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-h3 text-text-primary mb-3">Registration Received!</h3>
        <p className="text-body text-text-secondary">Thank you for your interest. We will contact you shortly to confirm your class schedule.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Intro card */}
      <div className="bg-gradient-to-r from-linen/50 to-linen/30 dark:from-walnut/20 dark:to-walnut/10 p-6 rounded-2xl border border-taupe/30 dark:border-walnut/20 shadow-inner transition-colors duration-300">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🙏</span>
          <p className="font-display text-h4 text-espresso dark:text-cream">Hari OM</p>
        </div>
        <p className="text-body text-text-secondary leading-relaxed">
          A disciplined practice of multi‑style Yoga (Ashtanga, Hatha, Vinyasa) will be followed. Classes include Asana, Pranayama, Dhyana, and Mantra Chanting. Please fill the details so we can design sessions keeping your health in mind.
        </p>
      </div>

      {/* Personal Details */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 border-b border-taupe/30 dark:border-walnut/20 pb-2">
          <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <h3 className={sectionHeadClass}>Personal Details</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Your Name <span className="text-terracotta">*</span></label>
            <input type="text" value={formData.name} onChange={updateField('name')} className={inputClass(!!errors.name)} placeholder="Full name" />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>
          <div>
            <label className={labelClass}>Gender <span className="text-terracotta">*</span></label>
            <select value={formData.gender} onChange={updateField('gender')} className={inputClass(!!errors.gender)}>
              <option value="">Select</option>
              <option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option>
            </select>
            {errors.gender && <p className={errorClass}>{errors.gender}</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {(['age', 'height', 'weight'] as const).map(field => (
            <div key={field}>
              <label className={labelClass}>{field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-terracotta">*</span></label>
              <input type={field === 'age' ? 'number' : 'text'} value={formData[field]} onChange={updateField(field)} className={inputClass(!!errors[field])} placeholder={field === 'age' ? 'Years' : field === 'height' ? "e.g. 5'6\" or 168 cm" : 'e.g. 65 kg'} />
              {errors[field] && <p className={errorClass}>{errors[field]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Numbers */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 border-b border-taupe/30 dark:border-walnut/20 pb-2">
          <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          <h3 className={sectionHeadClass}>Contact Numbers</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {(['whatsapp', 'calling'] as const).map(field => (
            <div key={field}>
              <label className={labelClass}>{field === 'whatsapp' ? 'WhatsApp Number' : 'Calling Number'} <span className="text-terracotta">*</span></label>
              <input type="tel" value={formData[field]} onChange={updateField(field)} className={inputClass(!!errors[field])} placeholder="+91 98765 43210" />
              {errors[field] && <p className={errorClass}>{errors[field]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Practice Preferences */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 border-b border-taupe/30 dark:border-walnut/20 pb-2">
          <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          <h3 className={sectionHeadClass}>Practice Preferences</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={`${labelClass} mb-3`}>Current Level <span className="text-terracotta">*</span></label>
            <div className="flex flex-wrap gap-3">
              {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                <label key={level} className={pillClass(formData.level === level)}>
                  <input type="radio" name="level" value={level} checked={formData.level === level} onChange={updateField('level')} className="sr-only" />
                  <span className="text-bodysm font-medium">{level}</span>
                </label>
              ))}
            </div>
            {errors.level && <p className={errorClass}>{errors.level}</p>}
          </div>
          <div>
            <label className={`${labelClass} mb-3`}>Preferred Timing <span className="text-terracotta">*</span></label>
            <div className="flex flex-wrap gap-3">
              {['Morning (6-8 AM)', 'Evening (5-7 PM)', 'Flexible'].map(time => (
                <label key={time} className={pillClass(formData.timing === time)}>
                  <input type="radio" name="timing" value={time} checked={formData.timing === time} onChange={updateField('timing')} className="sr-only" />
                  <span className="text-bodysm font-medium">{time}</span>
                </label>
              ))}
            </div>
            {errors.timing && <p className={errorClass}>{errors.timing}</p>}
          </div>
        </div>
      </div>

      {/* Health Information */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 border-b border-taupe/30 dark:border-walnut/20 pb-2">
          <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          <h3 className={sectionHeadClass}>Health Information</h3>
        </div>
        <div>
          <label className={labelClass}>Any accidental injuries? If yes, please describe.</label>
          <textarea rows={3} value={formData.injuries} onChange={updateField('injuries')} className={`${inputClass()} resize-none`} placeholder="Describe any past injuries..." />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {([{ field: 'metabolic' as const, label: 'Any Metabolic Syndrome?' }, { field: 'endocrine' as const, label: 'Suffering from any Endocrine Disorder?' }]).map(({ field, label }) => (
            <div key={field}>
              <label className={`${labelClass} mb-3`}>{label}</label>
              <div className="flex flex-wrap gap-3">
                {['Yes', 'No', 'Not sure'].map(opt => (
                  <label key={opt} className={pillClass(formData[field] === opt)}>
                    <input type="radio" name={field} value={opt} checked={formData[field] === opt} onChange={updateField(field)} className="sr-only" />
                    <span className="text-bodysm font-medium">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <label className={labelClass}>Any other health conditions we should know?</label>
          <textarea rows={3} value={formData.otherHealth} onChange={updateField('otherHealth')} className={`${inputClass()} resize-none`} placeholder="e.g. allergies, chronic conditions..." />
        </div>
      </div>

      {/* Motivation */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 border-b border-taupe/30 dark:border-walnut/20 pb-2">
          <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <h3 className={sectionHeadClass}>Your Motivation</h3>
        </div>
        <div>
          <label className={labelClass}>Why do you want to join yoga classes? <span className="text-terracotta">*</span></label>
          <textarea rows={3} value={formData.reason} onChange={updateField('reason')} className={`${inputClass(!!errors.reason)} resize-none`} placeholder="Your motivation..." />
          {errors.reason && <p className={errorClass}>{errors.reason}</p>}
        </div>
      </div>

      {/* Fee note */}
      <div className="bg-linen/30 dark:bg-walnut/10 p-6 rounded-xl border border-taupe/30 dark:border-walnut/20 shadow-sm transition-colors duration-300">
        <p className="font-display text-h4 text-espresso dark:text-cream mb-2">Fee and Class Schedule</p>
        <p className="text-body text-text-secondary">Please contact us for the fee structure and class timings. We'll share the details.</p>
      </div>

      <button type="submit" className="w-full py-5 rounded-xl bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        Submit Registration
      </button>
    </form>
  )
}
