import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/vyom_yogalife',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/avani.borisagar.1/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Google Maps',
    href: 'https://maps.app.goo.gl/zNXFpzWKvaybixNL8',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-linen dark:bg-char transition-colors duration-300">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 47px,#be8050 47px,#be8050 48px),' +
              'repeating-linear-gradient(90deg,transparent,transparent 47px,#be8050 47px,#be8050 48px)',
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/30 via-espresso/40 to-espresso/70" />

      {/* Content */}
      <div className="relative z-10 container-custom grid md:grid-cols-2 items-center gap-12 px-6">

        {/* LEFT — Logo */}
        <div className="flex justify-center md:justify-start opacity-0 animate-fade-up">
          <img
            src={logo}
            alt="Vyom Yoga Life Logo"
            className="w-[280px] md:w-[360px] rounded-2xl shadow-2xl shadow-black/40 dark:shadow-black/60 transition-all duration-700"
          />
        </div>

        {/* RIGHT — Text */}
        <div className="text-center md:text-left md:pl-12">

          <div className="opacity-0 animate-fade-up-d1">
            <span className="inline-block px-4 py-1.5 rounded-full border border-cream/30 text-cream/80 text-xs font-semibold uppercase tracking-[0.18em] mb-8">
              Yoga &amp; Meditation
            </span>
          </div>

          <h1 className="opacity-0 animate-fade-up-d2 font-display text-cream leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Rediscover<br />
            <em className="not-italic text-terracotta">Yourself</em>
          </h1>

          <p className="opacity-0 animate-fade-up-d3 text-bodylg text-cream/75 max-w-xl mb-10 leading-relaxed">
            A space to breathe, move, and reconnect.
          </p>

          {/* CTAs */}
          <div className="opacity-0 animate-fade-up-d4 flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
            <Link to="/register" className="px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold text-bodysm hover:bg-walnut transition shadow-card">
              Register Now
            </Link>
            <Link to="/portfolio" className="px-7 py-3.5 rounded-full border border-cream/40 text-cream font-semibold text-bodysm hover:bg-cream/10 transition">
              Explore Classes
            </Link>
          </div>

          {/* Socials */}
          <div className="opacity-0 animate-fade-up-d4 flex items-center justify-center md:justify-start gap-3">
            <span className="text-xs text-cream/40 uppercase tracking-[0.15em] mr-1">Follow</span>
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-cream/25 flex items-center justify-center text-cream/70 hover:text-cream hover:border-cream/60 hover:bg-cream/10 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50 opacity-0 animate-fade-in"
        style={{ animationDelay: '1s' }}
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <span className="block w-px h-10 bg-cream/30" />
      </div>
    </section>
  )
}
