import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import ImagePlaceholder from '../../components/ui/ImagePlaceholder'
import { useReveal } from '../../hooks/useReveal'
import { setPageMeta } from '../../components/utils/meta'

const upcomingWorkshops = [
  { title: 'Introduction to Pranayama',      date: 'Coming Soon', duration: '2 hours',    level: 'All Levels',              desc: 'A deep dive into the science and practice of breathwork. Learn the foundational techniques — Nadi Shodhana, Kapalabhati, Bhramari — and understand how each affects the nervous system.' },
  { title: 'Mastering the Headstand',        date: 'Coming Soon', duration: '90 minutes', level: 'Intermediate',            desc: 'A focused workshop on Sirsasana — from building prerequisite shoulder and core strength, to safely entering, holding, and exiting the pose. Open to students who can comfortably hold Downward Dog for 1 minute.' },
  { title: 'Yoga for Stress & Anxiety',      date: 'Coming Soon', duration: '2 hours',    level: 'All Levels',              desc: 'A therapeutic session drawing from Yin Yoga, restorative postures, guided breath retention, and Yoga Nidra. Designed for anyone navigating high stress, burnout, or anxiety.' },
  { title: 'Ashtanga Primary Series — Half Day', date: 'Coming Soon', duration: '3 hours', level: 'Intermediate to Advanced', desc: 'An immersive exploration of the Ashtanga Primary Series. We will work through the full sequence with detailed instruction on each pose, the vinyasa count, and drishti (gaze points).' },
]

const whatYouGet = [
  { icon: '📖', label: 'Deep-dive instruction on a focused topic' },
  { icon: '🎙️', label: 'Q&A time with the instructor' },
  { icon: '📋', label: 'Practice notes and resources shared after' },
  { icon: '🤝', label: 'Small group size for personal attention' },
  { icon: '🌐', label: 'Available online and offline — join however suits you' },
  { icon: '🔁', label: 'Recording available for registered participants' },
]

export default function Workshops() {
  const introRef    = useReveal<HTMLElement>()
  const calendarRef = useReveal<HTMLElement>()
  const includesRef = useReveal<HTMLElement>()
  const ctaRef      = useReveal<HTMLElement>()

  useEffect(() => {
    setPageMeta(
      'Yoga Workshops - Pranayama, Headstands & More',
      'Focused yoga workshops on breathwork, inversions, stress relief and the Ashtanga Primary Series. Small groups, held online and offline.'
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
            <h1 className="text-h1 mb-4 opacity-0 animate-fade-up-d1">Workshops</h1>
            <p className="text-body text-text-secondary max-w-xl mx-auto opacity-0 animate-fade-up-d2">
              Focused, immersive sessions that go beyond the regular class — exploring specific
              techniques, poses, or aspects of yoga philosophy in depth.
              Held <strong className="text-text-primary">both online and offline</strong>.
            </p>
          </div>
        </section>

        {/* Intro — scroll reveal */}
        <section ref={introRef} className="reveal section-pad bg-cream dark:bg-ink transition-colors duration-300">
          <div className="container-custom grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal reveal-delay-1">
              <ImagePlaceholder label="Workshop Session" aspect="4/5" className="shadow-card-lg dark:shadow-dark-card" />
            </div>
            <div className="reveal reveal-delay-2">
              <span className="section-label">About Workshops</span>
              <h2 className="text-h2 mb-6">Go Deeper</h2>
              <div className="space-y-4 text-body text-text-secondary leading-relaxed">
                <p>Regular classes build a broad foundation. Workshops are where you go deeper into a single subject — a specific pose, a breathing technique, a philosophical concept, or a therapeutic application of yoga.</p>
                <p>Each workshop is carefully designed around one central theme. You will leave with a thorough understanding, practical techniques you can immediately apply, and resources to continue exploring independently.</p>
                <p>Workshops are available <strong className="text-text-primary">both online and offline</strong>, and are kept intentionally small to maintain the quality of instruction and ensure every participant feels seen and heard.</p>
              </div>
              <Link to="/contact" className="inline-block mt-8 px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut transition shadow-card">
                Register Your Interest
              </Link>
            </div>
          </div>
        </section>

        {/* Calendar — scroll reveal */}
        <section ref={calendarRef} className="reveal section-pad bg-linen dark:bg-char transition-colors duration-300">
          <div className="container-custom">
            <div className="reveal text-center mb-14">
              <span className="section-label">Upcoming</span>
              <h2 className="text-h2">Workshop Calendar</h2>
              <p className="text-body text-text-secondary mt-3 max-w-md mx-auto">
                Dates will be announced via WhatsApp and Instagram. Register your interest to be notified first.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingWorkshops.map((w, i) => (
                <div key={w.title} className={`reveal reveal-delay-${(i % 2) + 1} bg-white dark:bg-ink rounded-2xl p-8 shadow-card dark:shadow-dark-card transition-colors duration-300 flex flex-col`}>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-terracotta bg-terracotta/10 dark:bg-terracotta/20 px-3 py-1 rounded-full">{w.level}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary bg-linen dark:bg-walnut/20 px-3 py-1 rounded-full">{w.duration}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary bg-linen dark:bg-walnut/20 px-3 py-1 rounded-full">{w.date}</span>
                  </div>
                  <h3 className="font-display text-h4 mb-3">{w.title}</h3>
                  <p className="text-bodysm text-text-secondary leading-relaxed flex-grow">{w.desc}</p>
                  <Link to="/contact" className="mt-6 inline-flex items-center gap-1.5 text-bodysm font-semibold text-terracotta hover:text-walnut transition group/link">
                    Notify me when available
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included — scroll reveal */}
        <section ref={includesRef} className="reveal section-pad bg-cream dark:bg-ink transition-colors duration-300">
          <div className="container-custom max-w-3xl">
            <div className="reveal text-center mb-14">
              <span className="section-label">Included</span>
              <h2 className="text-h2">What Every Workshop Includes</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {whatYouGet.map((w, i) => (
                <div key={w.label} className={`reveal reveal-delay-${(i % 2) + 1} flex items-center gap-4 bg-white dark:bg-char rounded-xl px-6 py-4 shadow-card dark:shadow-dark-card transition-colors duration-300`}>
                  <span className="text-2xl">{w.icon}</span>
                  <p className="text-body text-text-primary">{w.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — scroll reveal */}
        <section ref={ctaRef} className="reveal section-pad bg-espresso dark:bg-ink text-center transition-colors duration-300">
          <div className="container-custom max-w-2xl">
            <p className="reveal font-display text-h2 italic text-cream leading-relaxed mb-8">
              "The student who attends a workshop leaves with something that cannot be learned in a regular class — they leave with understanding."
            </p>
            <div className="reveal reveal-delay-1 flex flex-wrap justify-center gap-4">
              <Link to="/register" className="px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut transition shadow-card">Register Your Interest</Link>
              <Link to="/contact"  className="px-7 py-3.5 rounded-full border border-cream/30 text-cream font-semibold text-bodysm hover:bg-cream/10 transition">Ask a Question</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
