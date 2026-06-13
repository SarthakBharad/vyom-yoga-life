import { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useReveal } from '../hooks/useReveal'
import { setPageMeta } from '../components/utils/meta'

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
    ],
  },
]

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const ref = useReveal<HTMLElement>()

  useEffect(() => {
    setPageMeta(
      'Frequently Asked Questions - Yoga Classes',
      'Find answers to common questions about yoga classes, private sessions, workshops, pricing, and health considerations.'
    )
  }, [])

  const toggleQuestion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <>
      <Navbar />

      <main id="main" className="pt-20">

        {/* Header */}
        <section className="section-pad bg-linen dark:bg-char text-center transition-colors duration-300">
          <div className="container-custom">
            <span className="section-label opacity-0 animate-fade-up">Questions</span>
            <h1 className="text-h1 mb-4 opacity-0 animate-fade-up-d1">Frequently Asked Questions</h1>
            <p className="text-body text-text-secondary max-w-xl mx-auto opacity-0 animate-fade-up-d2">
              Have questions? We've compiled answers to the most common inquiries about our yoga programs.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section ref={ref} className="reveal section-pad bg-cream dark:bg-ink transition-colors duration-300">
          <div className="container-custom max-w-3xl">

            {faqs.map((section, sectionIndex) => (
              <div key={section.category} className="mb-16">
                <h2 className="reveal text-h3 text-text-primary mb-8 pb-4 border-b border-linen dark:border-walnut/20">
                  {section.category}
                </h2>

                <div className="reveal-group space-y-4">
                  {section.items.map((faq, itemIndex) => {
                    const globalIndex = faqs.slice(0, sectionIndex).reduce((sum, s) => sum + s.items.length, 0) + itemIndex
                    const isExpanded = expandedIndex === globalIndex

                    return (
                      <div
                        key={faq.q}
                        className="reveal bg-white dark:bg-char rounded-2xl shadow-card dark:shadow-dark-card transition-all duration-300 overflow-hidden hover:shadow-card-lg"
                      >
                        <button
                          onClick={() => toggleQuestion(globalIndex)}
                          className="w-full px-8 py-6 text-left flex items-start justify-between gap-4 hover:bg-linen dark:hover:bg-walnut/10 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                          aria-expanded={isExpanded}
                        >
                          <h3 className="font-display text-h4 text-text-primary flex-1">
                            {faq.q}
                          </h3>
                          <span className="text-2xl text-terracotta flex-shrink-0 transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            ▼
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="px-8 pb-6 border-t border-linen dark:border-walnut/20 animate-fade-in">
                            <p className="text-body text-text-secondary leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* CTA */}
        <section className="section-pad bg-gradient-to-b from-linen to-cream dark:from-char dark:to-ink text-center transition-colors duration-300">
          <div className="container-custom max-w-2xl">
            <p className="text-h3 text-text-primary mb-6">Still have questions?</p>
            <p className="text-body text-text-secondary mb-8">
              We're here to help. Reach out to us directly and we'll be happy to answer any questions you have.
            </p>
            <a
              href="/contact"
              className="inline-block px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut transition shadow-card"
            >
              Get in Touch
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}