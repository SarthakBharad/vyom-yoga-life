import { useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Journey from '../components/sections/Journey'
import Stats from '../components/sections/Stats'
import Philosophy from '../components/sections/Philosophy'
import Services from '../components/sections/Services'
import TestimonialsPreview from '../components/sections/TestimonialsPreview'
import ContactForm from '../components/sections/ContactForm'
import { setPageMeta } from '../components/utils/meta'

export default function Home() {
  useEffect(() => {
    setPageMeta(
      'Professional Yoga Classes Online & Offline',
      'Transform your life through professional yoga instruction. Private sessions, group classes, and workshops with Avani. Online and offline availability.'
    )
  }, [])

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Journey />
        <Stats />
        <Philosophy />
        <Services />
        <TestimonialsPreview />
        <section className="section-pad bg-cream dark:bg-ink transition-colors duration-300">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="section-label">Connect</span>
              <h2 className="text-h2 mb-3">Get in Touch</h2>
              <p className="text-body text-text-secondary max-w-sm mx-auto">Reach out for any enquiries about classes, bookings, or your yoga journey.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}