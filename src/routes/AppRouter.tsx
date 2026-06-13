import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

// Lazy load all page components for code splitting
const Home = lazy(() => import('../pages/Home'))
const Portfolio = lazy(() => import('../pages/Portfolio'))
const Testimonials = lazy(() => import('../pages/Testimonials'))
const Contact = lazy(() => import('../pages/Contact'))
const Register = lazy(() => import('../pages/Register'))
const FAQ = lazy(() => import('../pages/FAQ'))
const About = lazy(() => import('../pages/About'))
const PrivateSessions = lazy(() => import('../pages/services/private'))
const GroupClasses = lazy(() => import('../pages/services/group'))
const Workshops = lazy(() => import('../pages/services/workshops'))
const NotFound = lazy(() => import('../pages/NotFound'))

/**
 * ScrollToTop component - scrolls to top on route change
 * Uses 'instant' behavior to override smooth scroll CSS
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

/**
 * PageLoader - fallback UI while pages are loading
 */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-ink">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-linen dark:border-walnut border-t-terracotta animate-spin mx-auto mb-4" />
        <p className="text-body text-text-secondary">Loading...</p>
      </div>
    </div>
  )
}

/**
 * AppRouter - Main router component with code splitting and error handling
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/private" element={<PrivateSessions />} />
          <Route path="/services/group" element={<GroupClasses />} />
          <Route path="/services/workshops" element={<Workshops />} />
          
          {/* 404 Catch-all route - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}