import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'

const featured = {
  quote:    'As a mother, I have been connected to Vyom Yoga Life\'s online classes for the last 3 years and it has truly been a life-changing experience. Even though the classes are online, I always feel connected, guided, and supported.',
  name:     'Disha B.',
  role:     'Group Class Member',
  initials: 'DB',
}

const stats = [
  { value: '200+', label: 'Happy Students' },
  { value: '5★',   label: 'Average Rating' },
  { value: '3yrs', label: 'Teaching Since'  },
]

export default function TestimonialsPreview() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} className="reveal section-pad bg-espresso dark:bg-ink transition-colors duration-300">
      <div className="container-custom">

        <div className="grid grid-cols-3 gap-6 pb-14 border-b border-cream/10 mb-14">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-display text-h2 text-terracotta">{s.value}</p>
              <p className="text-xs text-cream/50 mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <span className="section-label text-terracotta">Testimonials</span>
          <h2 className="text-h2 text-cream mb-8">Happy Testimonials</h2>

          <blockquote className="font-display text-h3 italic text-cream/85 leading-relaxed mb-10">
            "{featured.quote}"
          </blockquote>

          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-terracotta flex items-center justify-center text-white font-semibold text-bodysm">
              {featured.initials}
            </div>
            <div className="text-left">
              <p className="font-semibold text-cream text-bodysm">{featured.name}</p>
              <p className="text-cream/50 text-xs">{featured.role}</p>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-terracotta text-terracotta" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.643 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.951-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <Link to="/testimonials" className="inline-block px-7 py-3.5 rounded-full border border-cream/30 text-cream font-semibold text-bodysm hover:bg-cream/10 transition">
            Read All Stories
          </Link>
        </div>
      </div>
    </section>
  )
}
