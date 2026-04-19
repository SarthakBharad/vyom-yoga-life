import { useState } from 'react'

type Fields = { name: string; email: string; message: string }
type Errors  = Partial<Fields>

function inputClass(hasError: boolean) {
  return [
    'w-full p-4 rounded-xl text-body text-text-primary',
    'bg-white dark:bg-char/60 border',
    hasError ? 'border-taupe dark:border-caramel/60' : 'border-linen dark:border-walnut/30',
    'placeholder:text-text-secondary/50',
    'focus:outline-none focus:ring-2 focus:ring-terracotta dark:focus:ring-terracotta/70',
    'transition-colors duration-200',
  ].join(' ')
}

export default function ContactForm() {
  const [fields,    setFields]    = useState<Fields>({ name: '', email: '', message: '' })
  const [errors,    setErrors]    = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(): Errors {
    const e: Errors = {}
    if (!fields.name.trim())    e.name    = 'Name is required'
    if (!fields.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = 'Enter a valid email'
    if (!fields.message.trim()) e.message = 'Message is required'
    return e
  }

  function update(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields(prev => ({ ...prev, [key]: e.target.value }))
      setErrors(prev => ({ ...prev, [key]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
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
        <h3 className="font-display text-h3 text-text-primary mb-3">Message sent!</h3>
        <p className="text-body text-text-secondary">Thank you for reaching out. We'll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-5" noValidate>
      <div>
        <input type="text" placeholder="Your Name" value={fields.name} onChange={update('name')} className={inputClass(!!errors.name)} />
        {errors.name && <p className="text-xs text-taupe dark:text-caramel mt-1.5 ml-1">{errors.name}</p>}
      </div>
      <div>
        <input type="email" placeholder="Email Address" value={fields.email} onChange={update('email')} className={inputClass(!!errors.email)} />
        {errors.email && <p className="text-xs text-taupe dark:text-caramel mt-1.5 ml-1">{errors.email}</p>}
      </div>
      <div>
        <textarea rows={5} placeholder="Your Message" value={fields.message} onChange={update('message')} className={`${inputClass(!!errors.message)} resize-none`} />
        {errors.message && <p className="text-xs text-taupe dark:text-caramel mt-1.5 ml-1">{errors.message}</p>}
      </div>
      <button type="submit" className="w-full py-4 rounded-xl bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut transition shadow-card">
        Submit Your Inquiry
      </button>
    </form>
  )
}
