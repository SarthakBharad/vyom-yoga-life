import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'
import instructor from '../../assets/Instructor.jpeg'

export default function Journey() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} className="reveal section-pad bg-cream dark:bg-ink transition-colors duration-300">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="section-label">My Story</span>
          <h2 className="text-h2">My Yoga Journey</h2>
          <p className="text-body text-text-secondary mt-3 max-w-md mx-auto">
            From a stressed Government employee to a dedicated yoga teacher – here's how yoga transformed me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image of teacher */}
          <div className="reveal reveal-delay-1">
            <div className="aspect-[4/5] shadow-card-lg dark:shadow-dark-card rounded-2xl overflow-hidden">
              <img
                src={instructor}
                alt="Avani – Founder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Story text */}
          <div className="reveal reveal-delay-2 space-y-4">
            <p className="text-body text-text-secondary leading-relaxed">
              Twelve years ago I was working long days in a Government job, chronically stressed, and dealing with back pain. A colleague dragged me to a yoga class – I couldn't touch my toes and felt completely out of place. But something kept me coming back.
            </p>
            <p className="text-body text-text-secondary leading-relaxed">
              Within six months my back pain vanished. Within a year, my anxiety had softened. Yoga didn't just stretch my body – it gave me a new way to respond to life. I started practising every morning before sunrise, and after completing my 500-hour Teacher Training in 2018, I began sharing this gift with others.
            </p>
            <p className="text-body text-text-secondary leading-relaxed">
              Today I've guided over 500 students. My greatest joy is watching someone realise that yoga isn't about being flexible – it's about showing up for yourself, exactly as you are.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-bodysm font-semibold text-terracotta hover:text-walnut transition group/link mt-4"
            >
              Read Full Story
              <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}