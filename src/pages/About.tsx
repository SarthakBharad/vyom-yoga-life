import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ImagePlaceholder from '../components/ui/ImagePlaceholder'
import { useReveal } from '../hooks/useReveal'
import { setPageMeta } from '../components/utils/meta'

const values = [
  {
    icon: '🧘',
    title: 'Yoga for Every Body',
    desc: 'Flexibility is not a prerequisite — it is a by-product. Whether you are stiff, anxious, injured, or simply curious, there is a place for you in this practice.',
  },
  {
    icon: '🌬️',
    title: 'Breath as the Foundation',
    desc: 'Before posture comes breath. Every class is rooted in Pranayama — the conscious regulation of breath that calms the nervous system and deepens awareness.',
  },
  {
    icon: '❤️',
    title: 'Heart-Centred Teaching',
    desc: 'You will never be judged, rushed, or compared. The only measurement that matters is how you feel leaving the class versus how you felt walking in.',
  },
  {
    icon: '🌿',
    title: 'Sustainable Practice',
    desc: 'A practice that injures or exhausts you is not serving you. We prioritise longevity — small, consistent steps that compound into lasting transformation.',
  },
]

export default function About() {
  const storyRef = useReveal<HTMLElement>()
  const valuesRef = useReveal<HTMLElement>()
  const quoteRef = useReveal<HTMLElement>()

  useEffect(() => {
    setPageMeta(
      'About Avani | Yoga Teacher',
      'Learn about Avani, a dedicated yoga teacher with 5+ years of experience. Specializing in Ashtanga, Hatha, and Vinyasa yoga. From government employee to transformational yoga guide.'
    )
  }, [])

  return (
    <>
      <Navbar />

      <main id="main" className="pt-20">

        {/* ── Hero header — direct CSS animations ───────────────────────── */}
        <section className="section-pad bg-linen dark:bg-char transition-colors duration-300">
          <div className="container-custom grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label opacity-0 animate-fade-up">About</span>
              <h1 className="text-h1 mb-6 opacity-0 animate-fade-up-d1">
                Hello, I'm Avani —<br />
                <em className="not-italic text-terracotta">Yoga Teacher & Guide</em>
              </h1>
              <p className="text-bodylg text-text-secondary leading-relaxed mb-6 opacity-0 animate-fade-up-d2">
                I teach yoga because it gave me my life back. Twelve years ago I was a
                stressed Government employee with chronic back pain and a racing mind.
                Yoga was the last thing I expected to change everything — and it did.
              </p>
              <p className="text-body text-text-secondary leading-relaxed opacity-0 animate-fade-up-d3">
                Today I teach multi-style yoga (Ashtanga, Hatha, Vinyasa) to students
                across India and internationally. My classes blend physical postures,
                breathwork, meditation, and mantra chanting into a practice that
                nourishes the whole person — not just the body.
              </p>
            </div>
            <div className="opacity-0 animate-fade-up-d2">
              <ImagePlaceholder label="Avani — Founder" aspect="4/5" className="shadow-card-lg dark:shadow-dark-card" />
            </div>
          </div>
        </section>

        {/* ── Full story — scroll reveal ─────────────────────────────────── */}
        <section
          ref={storyRef}
          className="reveal section-pad bg-cream dark:bg-ink transition-colors duration-300"
        >
          <div className="container-custom max-w-3xl">
            <div className="reveal text-center mb-14">
              <span className="section-label">My Story</span>
              <h2 className="text-h2">The Full Journey</h2>
              <div className="divider" />
            </div>
            <div className="reveal reveal-delay-1 space-y-6 text-body text-text-secondary leading-relaxed">
              <p>
                Twelve years ago I was working long days in a Government job, chronically
                stressed, and dealing with back pain that no amount of physiotherapy seemed
                to fix. A colleague dragged me to a yoga class on a Tuesday evening. I
                couldn't touch my toes. I felt out of place. But something kept me coming back.
              </p>
              <p>
                Within six months the back pain was gone. Within a year, my anxiety had
                softened into something I could actually manage. Yoga didn't just stretch
                my body — it gave me a completely new way to respond to life. I started
                practising every morning before sunrise, quietly, before the day could
                crowd in.
              </p>
              <p>
                In 2018, after completing my 500-hour Yoga Teacher Training, I felt ready
                to share everything I had learned. I began teaching small groups and slowly
                built a community of students who, like me, were simply looking for a
                practice that truly worked. The rest is history.
              </p>
              <p>
                What I teach is multi-style — drawing from Ashtanga's discipline, Hatha's
                precision, and Vinyasa's flow. Every session includes asana, pranayama,
                and some form of meditation or mantra. I believe these four elements
                together create something far greater than any one of them alone.
              </p>
              <p>
                Today I have guided over 500 students. Some came to me with injuries.
                Some with anxiety. Some simply curious. The greatest joy of teaching is
                watching someone discover that yoga isn't about being flexible — it's
                about showing up for yourself, exactly as you are, day after day.
              </p>
            </div>
          </div>
        </section>

        {/* ── Values — scroll reveal ─────────────────────────────────────── */}
        <section
          ref={valuesRef}
          className="reveal section-pad bg-gradient-to-b from-linen via-linen to-linen/70 dark:from-char dark:via-char dark:to-ink transition-colors duration-300"
        >
          <div className="container-custom">
            <div className="reveal text-center mb-14">
              <span className="section-label">Guiding Principles</span>
              <h2 className="text-h2">What I Believe In</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal-group">
              {values.map((v) => (
                <div
                  key={v.title}
                  className={`reveal bg-white dark:bg-char rounded-2xl p-7 shadow-card dark:shadow-dark-card transition-all duration-300 hover:scale-105 hover:-translate-y-2`}
                >
                  <span className="text-3xl mb-4 block">{v.icon}</span>
                  <h3 className="font-display text-h4 mb-3">{v.title}</h3>
                  <p className="text-bodysm text-text-secondary leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quote CTA — scroll reveal ──────────────────────────────────── */}
        <section
          ref={quoteRef}
          className="reveal section-pad bg-gradient-to-br from-espresso via-walnut to-walnut dark:from-walnut dark:via-ink dark:to-ink transition-colors duration-300"
        >
          <div className="container-custom text-center max-w-3xl">
            <p className="reveal font-display text-h2 italic text-cream leading-relaxed mb-8">
              "Yoga is not about touching your toes. It's about what you learn on the way down."
            </p>
            <p className="reveal reveal-delay-1 text-bodysm text-cream/50 uppercase tracking-widest mb-10">
              — Jigar Gor
            </p>
            <Link
              to="/register"
              className="reveal reveal-delay-2 inline-block px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold text-bodysm hover:bg-caramel transition shadow-card"
            >
              Begin Your Journey
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}