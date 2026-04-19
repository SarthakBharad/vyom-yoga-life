import Navbar      from '../components/layout/Navbar'
import Footer      from '../components/layout/Footer'
import GalleryGrid from '../components/sections/GalleryGrid'

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-linen dark:bg-char section-pad text-center transition-colors duration-300">
          <div className="container-custom">
            <span className="section-label opacity-0 animate-fade-up">Our Work</span>
            <h1 className="text-h1 mb-4 opacity-0 animate-fade-up-d1">Portfolio</h1>
            <p className="text-body text-text-secondary max-w-xl mx-auto opacity-0 animate-fade-up-d2">
              A glimpse into our yoga sessions, workshops, and the community we are building together — one breath at a time.
            </p>
          </div>
        </section>
        <section className="section-pad">
          <GalleryGrid />
        </section>
      </main>
      <Footer />
    </>
  )
}
