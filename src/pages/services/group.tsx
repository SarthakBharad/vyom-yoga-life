import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import ImagePlaceholder from '../../components/ui/ImagePlaceholder'
import { useReveal } from '../../hooks/useReveal'

const features = [
  { icon: '👥', title: 'Community Energy',    desc: 'Practising alongside others creates a shared energy that is genuinely motivating and hard to replicate alone.' },
  { icon: '🔄', title: 'Consistent Structure', desc: 'Group sessions follow a thoughtful sequence every time — enough familiarity to build mastery, enough variety to keep it fresh.' },
  { icon: '👁️', title: 'Individual Attention', desc: 'Even in a group setting, adjustments and modifications are offered to each student throughout the session.' },
  { icon: '🌐', title: 'Online & Offline',      desc: 'Join us in person or from anywhere in the world via video call — both formats are fully supported and equally personal.' },
  { icon: '📅', title: 'Regular Schedule',     desc: 'Consistency is the foundation of progress. Regular group slots help you build a practice that becomes part of your routine.' },
  { icon: '💰', title: 'Accessible Pricing',   desc: 'Group classes are a more accessible entry point to structured, high-quality yoga instruction.' },
]

const classTypes = [
  { name: 'Morning Flow',      time: 'Mon, Wed, Fri — 6:30 AM', level: 'All Levels',           desc: 'A dynamic Vinyasa-influenced sequence to energise the body and clear the mind before the day begins. Includes pranayama and a short closing meditation.' },
  { name: 'Evening Restore',   time: 'Tue, Thu — 6:00 PM',       level: 'All Levels',           desc: 'A slower-paced Hatha and Yin-influenced class designed to release tension accumulated through the day. Perfect for beginners or those managing stress.' },
  { name: 'Weekend Ashtanga',  time: 'Saturday — 7:00 AM',       level: 'Intermediate',         desc: 'A more structured Ashtanga-based session for students who want to build strength, discipline, and a deeper understanding of traditional yoga sequencing.' },
]

export default function GroupClasses() {
  const introRef    = useReveal<HTMLElement>()
  const scheduleRef = useReveal<HTMLElement>()
  const featuresRef = useReveal<HTMLElement>()
  const ctaRef      = useReveal<HTMLElement>()

  return (
    <>
      <Navbar />

      <main className="pt-20">

        {/* Header — direct CSS animations */}
        <section className="section-pad bg-linen dark:bg-char text-center transition-colors duration-300">
          <div className="container-custom">
            <span className="section-label opacity-0 animate-fade-up">Services</span>
            <h1 className="text-h1 mb-4 opacity-0 animate-fade-up-d1">Group Classes</h1>
            <p className="text-body text-text-secondary max-w-xl mx-auto opacity-0 animate-fade-up-d2">
              Practise alongside a warm community of students — guided, structured, and energising.
              Available both <strong className="text-text-primary">online and offline</strong>, so you can join from wherever you are.
            </p>
          </div>
        </section>

        {/* Intro — scroll reveal */}
        <section ref={introRef} className="reveal section-pad bg-cream dark:bg-ink transition-colors duration-300">
          <div className="container-custom grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal reveal-delay-1">
              <span className="section-label">About Group Classes</span>
              <h2 className="text-h2 mb-6">Better Together</h2>
              <div className="space-y-4 text-body text-text-secondary leading-relaxed">
                <p>There is something about practising with others that quietly lifts your effort. You breathe a little deeper, hold a pose a little longer, and leave feeling part of something larger than your own mat.</p>
                <p>Our group classes are small enough that every student receives adjustments and is seen — never lost in a crowd. Sessions draw from Ashtanga, Hatha, and Vinyasa, and always include pranayama alongside the physical practice.</p>
                <p>Classes are available <strong className="text-text-primary">both online and offline</strong>. Whether you are joining us in person or connecting via video call from another city or country, the experience is equally warm and attentive.</p>
              </div>
              <Link to="/register" className="inline-block mt-8 px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut transition shadow-card">
                Join a Group Class
              </Link>
            </div>
            <div className="reveal reveal-delay-2">
              <ImagePlaceholder label="Group Class" aspect="4/5" className="shadow-card-lg dark:shadow-dark-card" />
            </div>
          </div>
        </section>

        {/* Schedule — scroll reveal */}
        <section ref={scheduleRef} className="reveal section-pad bg-linen dark:bg-char transition-colors duration-300">
          <div className="container-custom">
            <div className="reveal text-center mb-14">
              <span className="section-label">Schedule</span>
              <h2 className="text-h2">Current Class Timetable</h2>
              <p className="text-body text-text-secondary mt-3 max-w-md mx-auto">
                Timings are indicative — please confirm current slots at registration.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {classTypes.map((c, i) => (
                <div key={c.name} className={`reveal reveal-delay-${i + 1} bg-white dark:bg-ink rounded-2xl p-8 shadow-card dark:shadow-dark-card transition-colors duration-300 flex flex-col`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-h4">{c.name}</h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-terracotta bg-terracotta/10 dark:bg-terracotta/20 px-3 py-1 rounded-full">{c.level}</span>
                  </div>
                  <p className="text-xs text-text-secondary uppercase tracking-wider mb-4">{c.time}</p>
                  <p className="text-bodysm text-text-secondary leading-relaxed flex-grow">{c.desc}</p>
                  <Link to="/register" className="mt-6 inline-flex items-center gap-1.5 text-bodysm font-semibold text-terracotta hover:text-walnut transition group/link">
                    Register for this class
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features — scroll reveal */}
        <section ref={featuresRef} className="reveal section-pad bg-cream dark:bg-ink transition-colors duration-300">
          <div className="container-custom">
            <div className="reveal text-center mb-14">
              <span className="section-label">Why Group?</span>
              <h2 className="text-h2">What Makes It Special</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div key={f.title} className={`reveal reveal-delay-${(i % 3) + 1} flex gap-5`}>
                  <span className="text-2xl flex-shrink-0 mt-1">{f.icon}</span>
                  <div>
                    <h3 className="font-display text-h4 mb-2">{f.title}</h3>
                    <p className="text-bodysm text-text-secondary leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — scroll reveal */}
        <section ref={ctaRef} className="reveal section-pad bg-espresso dark:bg-ink text-center transition-colors duration-300">
          <div className="container-custom max-w-2xl">
            <h2 className="reveal font-display text-h2 text-cream mb-4">Come Join the Community</h2>
            <p className="reveal reveal-delay-1 text-body text-cream/70 mb-8">
              Register and we'll confirm your spot in the next available group class — online or in person.
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