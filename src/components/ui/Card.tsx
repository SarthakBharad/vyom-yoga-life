type Props = { title: string; description: string }

export default function Card({ title, description }: Props) {
  return (
    <div className="bg-white dark:bg-char rounded-lg p-8 shadow-sm dark:shadow-dark-card hover:shadow-md transition duration-300">
      <h3 className="font-display text-h4 text-text-primary mb-4">{title}</h3>
      <p className="text-body text-text-secondary">{description}</p>
    </div>
  )
}
