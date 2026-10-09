import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import ImagePlaceholder from '../../components/ui/ImagePlaceholder'
import { useReveal } from '../../hooks/useReveal'
import { setPageMeta } from '../../components/utils/meta'

const benefits = [
  { icon: '🎯', title: 'Fully Personalised',     desc: 'Every session is built around your goals, health history, current level, and schedule — no generic sequences.' },
  { icon: '🩺', title: 'Health-Aware Sequencing', desc: 'We work around injuries, chronic conditions, and physical limitations rather than ignoring them.' },
  { icon: '📈', title: 'Faster Progress',          desc: 'Individual attention means corrections are immediate and precise, accelerating your development considerably.' },
  { icon: '🕐', title: 'Flexible Timing',          desc: 'Sessions can be scheduled to suit your routine — morning, evening, or weekends.' },
  { icon: '🌐', title: 'Online & Offline',          desc: 'Available both in person and via video call. Many students have been practising privately with us online for years — the experience is just as personal.' },
  { icon: '🙏', title: 'Complete Practice',         desc: 'Each session includes asana, pranayama, and some form of meditation — not just physical movement.' },
]

const faqs = [
  { q: 'How often should I do private sessions?',            a: 'Most students see strong results with 2–3 sessions per week. We will recommend a frequency based on your goals during your first session.' },
  { q: 'Can I do private sessions alongside group classes?', a: 'Absolutely. Many students combine both — using private sessions to work on specific goals while enjoying the community energy of group classes.' },
  { q: 'What do I need for an online private session?',      a: 'A stable internet connection, a yoga mat, and enough floor space to extend your arms and legs fully. A camera that lets me see your full body during poses is ideal.' },
]

export default function PrivateSessions() {
  const introRef    = useReveal<HTMLElement>()
  const benefitsRef = useReveal<HTMLElement>()
  const faqRef      = useReveal<HTMLElement>()
  const ctaRef      = useReveal<HTMLElement>()

  useEffect(() => {
    setPageMeta(
      'Private Yoga Sessions - Online & Offline',
      'One-on-one yoga with Avani, designed around your goals, health history and schedule. Private sessions available online and in person.'
    )
  }, [])

  return (
    <>
      <Navbar />

      <main id="main" className="pt-20">

        {/* Header — direct CSS animations */}
        <section className="section-pad bg-linen dark:bg-char text-center transition-colors duration-300">
          <div className="container-custom">
            <span className="section-label opacity-0 animate-fade-up">Services</span>
            <h1 className="text-h1 mb-4 opacity-0 animate-fade-up-d1">Private Sessions</h1>
            <p className="text-body text-text-secondary max-w-xl mx-auto opacity-0 animate-fade-up-d2">
              One-on-one yoga designed entirely around you — your body, your goals, your pace.
              Available <strong className="text-text-primary">both online and offline</strong> to fit your lifestyle.
            </p>
          </div>
        </section>

        {/* Intro split — scroll reveal */}
        <section ref={introRef} className="reveal section-pad bg-cream dark:bg-ink transition-colors duration-300">
          <div className="container-custom grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal reveal-delay-1">
              <ImagePlaceholder label="Private Session" aspect="4/5" className="shadow-card-lg dark:shadow-dark-card" />
            </div>
            <div className="reveal reveal-delay-2">
              <span className="section-label">What to Expect</span>
              <h2 className="text-h2 mb-6">Your Practice, Your Rules</h2>
              <div className="space-y-4 text-body text-text-secondary leading-relaxed">
                <p>A private session begins with a short conversation — how you are feeling that day, any discomfort, what you want to work on. From that, the entire session is shaped. No two private classes are ever identical.</p>
                <p>We typically move through a warm-up, a main sequence tailored to your focus area, and a closing with pranayama and relaxation. If you have a specific goal — improving a particular pose, managing back pain, building core strength — the session is structured entirely around that.</p>
                <p>Private sessions are available <strong className="text-text-primary">both online and offline</strong>. Whether you join us in person or connect via video call from home or abroad, the quality of attention remains exactly the same.</p>
              </div>
              <Link to="/register" className="inline-block mt-8 px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut transition shadow-card">
                Book a Private Session
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits — scroll reveal */}
        <section ref={benefitsRef} className="reveal section-pad bg-linen dark:bg-char transition-colors duration-300">
          <div className="container-custom">
            <div className="reveal text-center mb-14">
              <span className="section-label">Why Private?</span>
              <h2 className="text-h2">The Benefits</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <div key={b.title} className={`reveal reveal-delay-${(i % 3) + 1} bg-white dark:bg-ink rounded-2xl p-7 shadow-card dark:shadow-dark-card transition-colors duration-300`}>
                  <span className="text-3xl mb-4 block">{b.icon}</span>
                  <h3 className="font-display text-h4 mb-2">{b.title}</h3>
                  <p className="text-bodysm text-text-secondary leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs — scroll reveal */}
        <section ref={faqRef} className="reveal section-pad bg-cream dark:bg-ink transition-colors duration-300">
          <div className="container-custom max-w-2xl">
            <div className="reveal text-center mb-14">
              <span className="section-label">Questions</span>
              <h2 className="text-h2">Private Sessions FAQ</h2>
            </div>
            <div className="flex flex-col gap-6">
              {faqs.map((f, i) => (
                <div key={f.q} className={`reveal reveal-delay-${i + 1} bg-white dark:bg-char rounded-2xl p-7 shadow-card dark:shadow-dark-card transition-colors duration-300`}>
                  <h3 className="font-display text-h4 mb-3">{f.q}</h3>
                  <p className="text-body text-text-secondary leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — scroll reveal */}
        <section ref={ctaRef} className="reveal section-pad bg-espresso dark:bg-ink text-center transition-colors duration-300">
          <div className="container-custom max-w-2xl">
            <h2 className="reveal font-display text-h2 text-cream mb-4">Ready to Begin?</h2>
            <p className="reveal reveal-delay-1 text-body text-cream/70 mb-8">
              Register today and we will be in touch to schedule your first session — online or in person — and learn more about your goals.
            </p>
            <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4">
              <Link to="/register" className="px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut transition shadow-card">Register Now</Link>
              <Link to="/contact"  className="px-7 py-3.5 rounded-full border border-cream/30 text-cream font-semibold text-bodysm hover:bg-cream/10 transition">Ask a Question</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
