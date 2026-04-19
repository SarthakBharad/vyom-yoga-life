import { Link } from 'react-router-dom'

const navLinks = [
  { to: '/',             label: 'Home'         },
  { to: '/portfolio',    label: 'Portfolio'    },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact',      label: 'Contact'      },
  { to: '/faq',          label: 'FAQ'          },
]

export default function Footer() {
  return (
    <footer className="bg-espresso dark:bg-ink text-cream transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-cream/10">

          <div>
            <h3 className="font-display text-h4 text-cream mb-3">Vyom Yoga Life</h3>
            <p className="text-bodysm text-cream/60 leading-relaxed max-w-xs">
              Mindful movement. Conscious breathing. A space to reconnect with
              yourself through the ancient practice of yoga.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta dark:text-caramel mb-5">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-bodysm text-cream/70 hover:text-cream transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta dark:text-caramel mb-5">
              Get in Touch
            </p>
            <ul className="flex flex-col gap-3 text-bodysm text-cream/70">
              <li><a href="tel:+919408324836" className="hover:text-cream transition">+91 94083 24836</a></li>
              <li><a href="mailto:avaninv11@gmail.com" className="hover:text-cream transition">avaninv11@gmail.com</a></li>
              <li className="text-cream/50 leading-relaxed">
                B-102, Orchid Woods, Corporate Rd,<br />
                Prahlad Nagar, Ahmedabad,<br />
                Gujarat 380015, India
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} Vyom Yoga. All rights reserved.</p>
          <p>Crafted with intention.</p>
        </div>
      </div>
    </footer>
  )
}
