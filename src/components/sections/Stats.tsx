import { Link } from 'react-router-dom'
import ImagePlaceholder from '../ui/ImagePlaceholder'
import { useReveal } from '../../hooks/useReveal'

const stats = [
  { value: '500+', label: 'Students Transformed' },
  { value: '5+',   label: 'Years of Practice'    },
  { value: '4.9★', label: 'Average Rating'       },
]

export default function Stats() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} className="reveal section-pad bg-linen dark:bg-ink transition-colors duration-300">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div className="reveal reveal-delay-1 relative">
            <ImagePlaceholder label="Studio / Instructor Photo" aspect="4/5" className="shadow-card-lg dark:shadow-dark-card" />
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-char rounded-xl px-5 py-4 shadow-card dark:shadow-dark-card max-w-[220px] transition-colors duration-300">
              <p className="font-display text-bodysm italic text-text-primary leading-snug">
                "Yoga is the journey of the self, through the self."
              </p>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <span className="section-label">Experience</span>
            <h2 className="text-h2 mb-5">Five Years of Transforming Lives Through Yoga</h2>
            <p className="text-body text-text-secondary mb-10 leading-relaxed">
              With over five years of dedicated practice and teaching, I have cultivated a deeply personal approach to yoga — one that fosters both physical strength and mental well-being in every student.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-h2 text-terracotta">{stat.value}</p>
                  <p className="text-xs text-text-secondary mt-1 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link to="/contact" className="inline-block px-7 py-3.5 rounded-full bg-espresso dark:bg-char text-cream font-semibold text-bodysm hover:bg-walnut dark:hover:bg-walnut transition">
              Book a Session
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
