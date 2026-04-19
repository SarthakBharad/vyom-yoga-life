import { Link } from 'react-router-dom'
import ImagePlaceholder from '../ui/ImagePlaceholder'
import { useReveal } from '../../hooks/useReveal'

export default function Philosophy() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} className="reveal section-pad bg-cream dark:bg-ink overflow-hidden transition-colors duration-300">
      <div className="container-custom">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Guiding Principles</span>
          <h2 className="text-h2 mb-6">My Teaching Philosophy</h2>
          <p className="text-body text-text-secondary leading-relaxed">
            I believe yoga is for every body – not just the flexible, but the stiff, the anxious, the busy, and the skeptical. My classes are a space where you can move at your own pace, ask questions, and leave feeling more connected to yourself.
          </p>
          <div className="divider" />
          <Link to="/contact" className="inline-block px-7 py-3 rounded-full bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut transition mt-4">
            Experience a Class
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-6 items-end">
          <div className="reveal reveal-delay-1 col-span-1">
            <ImagePlaceholder label="Studio" aspect="3/4" className="shadow-card dark:shadow-dark-card" />
          </div>
          <div className="reveal reveal-delay-2 col-span-1 -translate-y-8">
            <ImagePlaceholder label="Outdoor Practice" aspect="2/3" className="shadow-card dark:shadow-dark-card" />
          </div>
          <div className="reveal reveal-delay-3 col-span-1">
            <ImagePlaceholder label="Meditation" aspect="3/4" className="shadow-card dark:shadow-dark-card" />
          </div>
        </div>

        <div className="mt-16 py-10 px-8 md:px-16 bg-espresso dark:bg-char rounded-2xl text-center reveal transition-colors duration-300">
          <p className="font-display text-h3 italic text-cream leading-relaxed">
            "We believe in nurturing the mind, body, and spirit — creating a harmonious balance that enhances overall well-being."
          </p>
        </div>
      </div>
    </section>
  )
}
