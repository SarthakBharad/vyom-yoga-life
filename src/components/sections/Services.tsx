import { Link } from 'react-router-dom'
import ImagePlaceholder from '../ui/ImagePlaceholder'
import { useReveal } from '../../hooks/useReveal'

const services = [
  { icon: '🌿', title: 'Private Sessions', desc: 'Personalized yoga sessions designed to meet your individual needs, goals, and schedule. Available online & offline.', href: '/services/private' },
  { icon: '🪷', title: 'Group Classes',    desc: 'Join our community in uplifting group classes that foster connection, growth, and joy. Available online & offline.',    href: '/services/group'   },
  { icon: '☀️', title: 'Workshops',        desc: 'Immersive sessions that deepen your practice and explore the full breadth of yoga philosophy. Available online & offline.', href: '/services/workshops' },
]

export default function Services() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} className="reveal section-pad bg-linen dark:bg-ink transition-colors duration-300">
      <div className="container-custom">

        <div className="text-center mb-14">
          <span className="section-label">What We Offer</span>
          <h2 className="text-h2">Yoga Services</h2>
          <p className="text-body text-text-secondary mt-3 max-w-md mx-auto">
            Tailored offerings to meet you exactly where your practice is today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <article
              key={svc.title}
              className={`reveal reveal-delay-${i + 1} bg-white dark:bg-char rounded-2xl overflow-hidden shadow-card dark:shadow-dark-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className="overflow-hidden">
                <div className="group-hover:scale-105 transition-transform duration-500">
                  <ImagePlaceholder label={svc.title} aspect="16/9" className="rounded-none" />
                </div>
              </div>
              <div className="p-6">
                <span className="text-2xl mb-3 block">{svc.icon}</span>
                <h3 className="font-display text-h4 mb-2">{svc.title}</h3>
                <p className="text-bodysm text-text-secondary leading-relaxed mb-5">{svc.desc}</p>
                <Link to={svc.href} className="inline-flex items-center gap-1.5 text-bodysm font-semibold text-terracotta hover:text-walnut transition group/link">
                  Learn More
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
