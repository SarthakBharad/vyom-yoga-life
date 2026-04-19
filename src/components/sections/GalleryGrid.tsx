import ImagePlaceholder from '../ui/ImagePlaceholder'
import { useReveal } from '../../hooks/useReveal'

const items = [
  { label: 'Private Session',    category: 'Private',     aspect: '4/3' },
  { label: 'Group Flow Class',   category: 'Group',       aspect: '4/3' },
  { label: 'Outdoor Practice',   category: 'Outdoor',     aspect: '4/3' },
  { label: 'Yin Yoga',           category: 'Restorative', aspect: '4/3' },
  { label: 'Meditation Session', category: 'Meditation',  aspect: '4/3' },
  { label: 'Weekend Workshop',   category: 'Workshop',    aspect: '4/3' },
  { label: 'Studio Session',     category: 'Studio',      aspect: '4/3' },
  { label: 'Sunrise Practice',   category: 'Outdoor',     aspect: '4/3' },
  { label: 'Breathwork',         category: 'Healing',     aspect: '4/3' },
]

export default function GalleryGrid() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="reveal max-w-7xl mx-auto px-6 lg:px-8 pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`reveal reveal-delay-${(i % 3) + 1} group relative overflow-hidden rounded-2xl cursor-pointer shadow-card dark:shadow-dark-card hover:shadow-card-lg transition-shadow duration-300`}
          >
            <div className="group-hover:scale-105 transition-transform duration-500">
              <ImagePlaceholder label={item.label} aspect={item.aspect} className="rounded-none" />
            </div>
            <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/40 dark:bg-ink/0 dark:group-hover:bg-ink/50 transition-colors duration-300 flex items-end p-5">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-terracotta text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
