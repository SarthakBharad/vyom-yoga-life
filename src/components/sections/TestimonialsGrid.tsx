import { useReveal } from '../../hooks/useReveal'

const testimonials = [
  {
    initials: 'NJ', name: 'Niki Jain', role: 'Private Student', rating: 5,
    quote: "A truly wonderful yoga EXPERIENCE 🧘‍♀️ I've been with these Yoga classes for more than two years now (both online and offline). Avni ma'am is knowledgeable, welcoming, and creates a very calm, positive atmosphere. I always leave feeling stronger, more relaxed, and refreshed. The sessions are perfectly balanced between challenge and relaxation, and I always walk out feeling grounded and energized. Highly recommended...",
  },
  {
    initials: 'DB', name: 'Disha B.', role: 'Group Class Member', rating: 4,
    quote: "As a mother, I have been connected to Vyom Yoga Life's online classes for the last 3 years and it has truly been life-changing experience. Avni ma'am explains every posture clearly, gives personal attention, and always motivates in a very positive and friendly way. Due to regular practice, I have seen amazing results — I lost weight naturally, improved my flexibility, and now feel more active and peaceful throughout the day. Highly recommended for mothers who are unable to go out for yoga classes or gym... 🙏💫",
  },
  {
    initials: 'PM', name: 'Pretesh M.', role: 'Workshop Attendee', rating: 5,
    quote: "I have been doing regular yoga classes with Vyom Yoga Life for over a year now. I have seen improvements in my flexibility, core strength and my body has toned up. I have particularly seen my improvement with the Sirsasana (The Headstand); I could barely lift up my legs before and now I am able to comfortably do so. I'm looking forward to continuing my yoga practice and improving my core strength and flexibility.",
  },
  {
    initials: 'IH', name: 'Illa H.', role: 'Private Student', rating: 5,
    quote: "I have been doing online Yoga with Avni for the last two years. She gives clear instructions, adapts sessions to the class' ability, and always encourages us to push ourselves to gain confidence with poses. Avni also starts and ends the class with Pranayam. This is very relaxing, peaceful and healing. The breathing techniques improve mindfulness and self awareness. I thoroughly recommend her and her classes.",
  },
  {
    initials: 'VA', name: 'Vineeta A.', role: 'Online Student', rating: 5,
    quote: "I have been with Vyom Yoga classes since the past 2 years. It's a great experience and it has helped me a lot. Our instructor Avni is very polite and is excellent in teaching various yoga techniques.",
  },
  {
    initials: 'HG', name: 'Harshita G.', role: 'Group Class Member', rating: 5,
    quote: "I've been attending Avani Ma'am's online yoga classes for a while now, and they've been amazing! Her sessions are very well-structured, making it easy to follow along, even on busy days. She explains everything so well, and her calm energy keeps you motivated. Whether you're a beginner or have been practicing for years, you'll always take something valuable from her classes.",
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 fill-terracotta text-terracotta" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.643 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.951-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsGrid() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="reveal max-w-5xl mx-auto px-6 lg:px-8 pb-24">
      <div className="grid sm:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <article
            key={t.name}
            className={`reveal reveal-delay-${(i % 2) + 1} bg-white dark:bg-char rounded-2xl p-8 shadow-card dark:shadow-dark-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300`}
          >
            <Stars count={t.rating} />
            <blockquote className="font-display text-bodylg italic text-text-primary leading-relaxed mt-4 mb-6">
              "{t.quote}"
            </blockquote>
            <div className="flex items-center gap-3 pt-4 border-t border-linen dark:border-walnut/20">
              <div className="w-10 h-10 rounded-full bg-terracotta/15 dark:bg-terracotta/20 flex items-center justify-center text-terracotta font-semibold text-xs flex-shrink-0">
                {t.initials}
              </div>
              <div>
                <p className="font-semibold text-bodysm text-text-primary">{t.name}</p>
                <p className="text-xs text-text-secondary">{t.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
