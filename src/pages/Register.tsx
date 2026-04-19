import Navbar       from '../components/layout/Navbar'
import Footer       from '../components/layout/Footer'
import RegisterForm from '../components/sections/RegisterForm'

export default function Register() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="section-pad">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="section-label">Join Us</span>
              <h1 className="text-h1 mb-3">Online Yoga Classes Registration</h1>
              <p className="text-body text-text-secondary max-w-2xl mx-auto">
                Please fill the form below to begin your journey with Vyom Yoga. Classes are for serious practitioners only – consistency is key. Hari OM!
              </p>
            </div>
            <div className="bg-white dark:bg-char rounded-2xl p-6 md:p-10 shadow-card dark:shadow-dark-card transition-colors duration-300">
              <RegisterForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
