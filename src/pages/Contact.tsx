import { Link }     from 'react-router-dom'
import Navbar      from '../components/layout/Navbar'
import Footer      from '../components/layout/Footer'
import ContactForm from '../components/sections/ContactForm'

const details = [
  {
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>),
    label: 'Phone', value: '+91 94083 24836', href: 'tel:+919408324836',
  },
  {
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>),
    label: 'Email', value: 'avaninv11@gmail.com', href: 'mailto:avaninv11@gmail.com',
  },
  {
    icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
    label: 'Location', value: 'B-102, Orchid Woods, Corporate Rd, Prahlad Nagar, Ahmedabad, Gujarat 380015, India', href: null,
  },
]

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="section-pad">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-16 items-start">

              <div>
                <span className="section-label">Connect</span>
                <h1 className="text-h1 mb-5">Get in Touch</h1>
                <p className="text-body text-text-secondary leading-relaxed mb-10">
                  Have questions about classes, bookings, or which style of yoga suits you best? Send us a message and we will get back to you.
                </p>
                <ul className="flex flex-col gap-6 mb-10">
                  {details.map(d => (
                    <li key={d.label} className="flex items-center gap-4">
                      <span className="w-11 h-11 rounded-full bg-terracotta/10 dark:bg-terracotta/20 flex items-center justify-center text-terracotta flex-shrink-0">{d.icon}</span>
                      <div>
                        <p className="text-xs text-text-secondary uppercase tracking-wider mb-0.5">{d.label}</p>
                        {d.href
                          ? <a href={d.href} className="text-body font-medium text-text-primary hover:text-terracotta transition">{d.value}</a>
                          : <p className="text-body font-medium text-text-primary">{d.value}</p>
                        }
                      </div>
                    </li>
                  ))}
                </ul>

                {/* FAQ nudge */}
                <div className="flex items-center gap-3 p-5 rounded-2xl bg-linen dark:bg-char border border-linen dark:border-walnut/20 transition-colors duration-300">
                  <span className="text-2xl">💡</span>
                  <p className="text-bodysm text-text-secondary">
                    Before reaching out, check our{' '}
                    <Link to="/faq" className="font-semibold text-terracotta hover:text-walnut transition underline underline-offset-2">
                      Frequently Asked Questions
                    </Link>
                    {' '}— your answer might already be there.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-char rounded-2xl p-8 md:p-10 shadow-card dark:shadow-dark-card transition-colors duration-300">
                <h2 className="font-display text-h3 mb-2">Questions?</h2>
                <p className="text-bodysm text-text-secondary mb-8">Fill in the form below and we'll be in touch soon.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
