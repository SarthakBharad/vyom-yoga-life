import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { setPageMeta } from '../components/utils/meta'

export default function NotFound() {
  useEffect(() => {
    setPageMeta(
      'Page Not Found',
      'The page you are looking for does not exist. Explore yoga classes, private sessions and workshops at Vyom Yoga Life.'
    )
  }, [])

  return (
    <>
      <Navbar />
      <main id="main" className="pt-20 min-h-screen flex flex-col items-center justify-center bg-cream dark:bg-ink transition-colors duration-300">
        <div className="text-center max-w-md px-6">
          <div className="text-9xl font-display text-terracotta mb-8 opacity-0 animate-fade-up">404</div>
          <h1 className="text-h2 mb-3 text-text-primary opacity-0 animate-fade-up-d1">Page Not Found</h1>
          <p className="text-body text-text-secondary mb-10 leading-relaxed opacity-0 animate-fade-up-d2">
            The page you're looking for doesn't exist. Let's get you back on your yoga journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up-d3">
            <Link
              to="/"
              className="px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-walnut transition shadow-card"
            >
              Back to Home
            </Link>
            <Link
              to="/services/private"
              className="px-7 py-3.5 rounded-full border border-terracotta text-terracotta font-semibold hover:bg-terracotta/5 transition"
            >
              Explore Classes
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-full border border-text-secondary text-text-secondary font-semibold hover:bg-linen dark:hover:bg-walnut/20 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
