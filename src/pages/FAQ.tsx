import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useReveal } from '../hooks/useReveal'

const faqs = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'Do I need any prior experience to join?',
        a: 'Not at all. Our classes welcome complete beginners as warmly as seasoned practitioners. Every session is structured so you can move at your own pace, and modifications are always offered for each pose.',
      },
      {
        q: 'What should I bring to my first class?',
        a: 'Just yourself and comfortable clothing that allows free movement. A yoga mat is helpful but not essential — we have mats available. You may also bring a small towel and a water bottle.',
      },
      {
        q: 'How do I register for a class?',
        a: 'You can register using the Register Now button on the homepage or navigate to the Register page. Fill in your details and we will get in touch to confirm your schedule and answer any questions.',
      },
    ],
  },
  {
    category: 'Classes & Schedule',
    items: [
      {
        q: 'What styles of yoga do you teach?',
        a: 'We practice a multi-style approach including Ashtanga, Hatha, and Vinyasa. Each session typically incorporates Asana (postures), Pranayama (breathwork), Dhyana (meditation), and Mantra Chanting — giving you a well-rounded practice every time.',
      },
      {
        q: 'How long is each class?',
        a: 'Standard classes run for 60 minutes. Workshop sessions are longer — typically 90 to 120 minutes — to allow deeper exploration of specific topics. Private sessions can be adjusted to your preferred duration.',
      },
      {
        q: 'Do you offer online classes?',
        a: 'Yes. All class formats — private, group, and workshops — are available online via video call. Many of our students have been practising with us online for two or more years and find the experience just as personal and effective as in-person sessions.',
      },
      {
        q: 'What timings are available?',
        a: 'We currently offer morning slots (6–8 AM) and evening slots (5–7 PM). Flexible timings can be arranged for private sessions. You can indicate your preference during registration.',
      },
    ],
  },
  {
    category: 'Private Sessions',
    items: [
      {
        q: 'What is the difference between private and group classes?',
        a: 'Private sessions are one-on-one and the entire class is designed around your specific goals, health conditions, and current level. Group classes bring together a community of practitioners and follow a shared sequence with individual adjustments offered throughout.',
      },
      {
        q: 'Can private sessions help with a specific injury or health condition?',
        a: 'Yes, and this is one of the greatest strengths of private sessions. We ask about your health history during registration so the practice can be thoughtfully adapted. We have worked with students managing back pain, thyroid conditions, metabolic syndrome, and anxiety, among others.',
      },
    ],
  },
  {
    category: 'Health & Safety',
    items: [
      {
        q: 'I have a medical condition. Is yoga safe for me?',
        a: 'Yoga is generally safe and often therapeutic, but every body is different. Please disclose any medical conditions or injuries during registration. We will design your practice accordingly and, where needed, recommend you consult your doctor before starting.',
      },
      {
        q: 'What if I feel pain during a pose?',
        a: 'Pain is never the goal. If something hurts — as opposed to the natural sensation of a stretch — stop and let the instructor know immediately. Every pose has gentler variations, and honouring your body\'s signals is part of the practice.',
      },
    ],
  },
  {
    category: 'Fees & Policies',
    items: [
      {
        q: 'How much do classes cost?',
        a: 'Please contact us directly for the current fee structure. Pricing varies by class format (private, group, workshop) and session frequency. We are happy to discuss what works for your budget.',
      },
      {
        q: 'What is your cancellation policy?',
        a: 'We ask for at least 24 hours notice for cancellations or rescheduling of private sessions. Group class spots can generally be transferred to another session in the same week. Full details will be shared when you register.',
      },
      {
        q: 'Is there a trial class available?',
        a: 'Yes. We offer a trial session so you can experience the teaching style before committing to a regular schedule. Reach out via the Contact page to arrange yours.',
      },
    ],
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-linen dark:border-walnut/20 last:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="font-display text-bodylg text-text-primary group-hover:text-terracotta transition-colors duration-200">
          {q}
        </span>
        <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full border border-linen dark:border-walnut/30 flex items-center justify-center text-terracotta">
          <svg
            className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
            fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-body text-text-secondary leading-relaxed pr-8">{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const bodyRef = useReveal<HTMLElement>()
  const ctaRef  = useReveal<HTMLDivElement>()

  return (
    <>
      <Navbar />

      <main className="pt-20">

        {/* Page header — direct CSS animations (immediately in viewport) */}
        <section className="bg-linen dark:bg-char section-pad text-center transition-colors duration-300">
          <div className="container-custom">
            <span className="section-label opacity-0 animate-fade-up">Help</span>
            <h1 className="text-h1 mb-4 opacity-0 animate-fade-up-d1">
              Frequently Asked Questions
            </h1>
            <p className="text-body text-text-secondary max-w-xl mx-auto opacity-0 animate-fade-up-d2">
              Everything you need to know before stepping onto the mat.
              Can't find your answer?{' '}
              <a href="/contact" className="text-terracotta hover:text-walnut transition underline underline-offset-2">
                Get in touch.
              </a>
            </p>
          </div>
        </section>

        {/* FAQ body — scroll reveal */}
        <section
          ref={bodyRef}
          className="reveal section-pad bg-cream dark:bg-ink transition-colors duration-300"
        >
          <div className="container-custom max-w-3xl">
            {faqs.map((group, i) => (
              <div
                key={group.category}
                className={`reveal reveal-delay-${(i % 4) + 1} mb-14`}
              >
                <span className="section-label">{group.category}</span>
                <div className="bg-white dark:bg-char rounded-2xl px-6 shadow-card dark:shadow-dark-card transition-colors duration-300">
                  {group.items.map((item) => (
                    <AccordionItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still have questions CTA — scroll reveal */}
        <div ref={ctaRef} className="reveal px-6 pb-24 bg-cream dark:bg-ink transition-colors duration-300">
          <div className="container-custom max-w-3xl">
            <div className="reveal text-center py-12 px-8 bg-linen dark:bg-char rounded-2xl transition-colors duration-300">
              <h3 className="font-display text-h3 mb-3">Still have questions?</h3>
              <p className="text-body text-text-secondary mb-6">
                We'd love to hear from you. Send us a message and we'll reply within 24 hours.
              </p>
              <a
                href="/contact"
                className="inline-block px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut transition shadow-card"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  )
}
