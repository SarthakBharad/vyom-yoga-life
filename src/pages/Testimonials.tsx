import { useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import TestimonialsGrid from '../components/sections/TestimonialsGrid'
import { setPageMeta } from '../components/utils/meta'

export default function Testimonials() {
  useEffect(() => {
    setPageMeta(
      'Student Testimonials & Success Stories',
      'Read real testimonials from our yoga students. Transform your life through our classes - over 500 students have already benefited.'
    )
  }, [])

  return (
    <>
      <Navbar />
      <main id="main" className="pt-20">
        <section className="bg-espresso dark:bg-ink section-pad text-center transition-colors duration-300">
          <div className="container-custom">
            <span className="section-label text-terracotta dark:text-caramel opacity-0 animate-fade-up">Stories</span>
            <h1 className="text-h1 text-cream mb-4 opacity-0 animate-fade-up-d1">Student Testimonials</h1>
            <p className="text-body text-cream/60 max-w-xl mx-auto opacity-0 animate-fade-up-d2">
              Hear from those who have transformed their lives through yoga. Real stories from our community.
            </p>
          </div>
        </section>
        <section className="section-pad bg-cream dark:bg-ink transition-colors duration-300">
          <TestimonialsGrid />
        </section>
      </main>
      <Footer />
    </>
  )
}