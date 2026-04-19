import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const links = [
  { to: '/',             label: 'Home',         end: true  },
  { to: '/portfolio',    label: 'Portfolio',    end: false },
  { to: '/testimonials', label: 'Testimonials', end: false },
  { to: '/contact',      label: 'Contact',      end: false },
]

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"  x2="12" y2="3"  />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1"  y1="12" x2="3"  y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 bg-linen hover:bg-terracotta/20 text-walnut dark:bg-walnut/20 dark:hover:bg-terracotta/20 dark:text-linen focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50"
    >
      <span className={`absolute transition-all duration-300 ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-90'}`}>
        <SunIcon />
      </span>
      <span className={`absolute transition-all duration-300 ${!isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'}`}>
        <MoonIcon />
      </span>
    </button>
  )
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 dark:bg-ink/95 backdrop-blur-md border-b border-linen dark:border-walnut/20 shadow-card dark:shadow-dark-card'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">

          <Link to="/" onClick={closeMobile} className="font-display text-h4 text-text-primary hover:text-terracotta transition">
            Vyom Yoga Life
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `text-bodysm font-semibold tracking-wide transition ${isActive ? 'text-terracotta' : 'text-text-primary hover:text-terracotta'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <ThemeToggle />
            <Link to="/register" className="ml-2 px-5 py-2.5 rounded-full bg-terracotta text-white text-bodysm font-semibold hover:bg-walnut transition shadow-sm">
              Register Now
            </Link>
          </nav>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 p-2 text-text-primary"
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 ${mobileOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-espresso/40 dark:bg-ink/70 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMobile}
        />
        <div className={`absolute top-0 right-0 h-full w-72 bg-cream dark:bg-char shadow-card-lg flex flex-col pt-24 px-8 pb-10 transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col gap-6">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `font-display text-h3 transition ${isActive ? 'text-terracotta' : 'text-text-primary hover:text-terracotta'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="my-8 h-px bg-linen dark:bg-walnut/30" />
          <div className="mt-auto">
            <Link to="/register" onClick={closeMobile} className="block text-center px-6 py-3 rounded-full bg-terracotta text-white font-semibold hover:bg-walnut transition">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
