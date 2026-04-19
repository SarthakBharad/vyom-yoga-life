import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home            from '../pages/Home'
import Portfolio       from '../pages/Portfolio'
import Testimonials    from '../pages/Testimonials'
import Contact         from '../pages/Contact'
import Register        from '../pages/Register'
import FAQ             from '../pages/FAQ'
import About           from '../pages/About'
import PrivateSessions from '../pages/services/private'
import GroupClasses    from '../pages/services/group'
import Workshops       from '../pages/services/workshops'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"                   element={<Home />}            />
        <Route path="/portfolio"          element={<Portfolio />}       />
        <Route path="/testimonials"       element={<Testimonials />}    />
        <Route path="/contact"            element={<Contact />}         />
        <Route path="/register"           element={<Register />}        />
        <Route path="/faq"                element={<FAQ />}             />
        <Route path="/about"              element={<About />}           />
        <Route path="/services/private"   element={<PrivateSessions />} />
        <Route path="/services/group"     element={<GroupClasses />}    />
        <Route path="/services/workshops" element={<Workshops />}       />
      </Routes>
    </BrowserRouter>
  )
}
