type Props = {
  label?: string
  className?: string
  aspect?: string
  loading?: 'lazy' | 'eager'
}

export default function ImagePlaceholder({ 
  label = 'Image', 
  className = '', 
  aspect = '4/3',
  loading = 'lazy'
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-linen dark:bg-char flex items-center justify-center transition-colors duration-300 ${className}`}
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={label}
    >
      <style>{`
        .placeholder-light { --grid-line: #c8d4de; }
        .dark .placeholder-light { --grid-line: #7a5c4a; }
      `}</style>
      <div className="placeholder-light absolute inset-0 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 31px,var(--grid-line) 31px,var(--grid-line) 32px),' +
            'repeating-linear-gradient(90deg,transparent,transparent 31px,var(--grid-line) 31px,var(--grid-line) 32px)',
        }}
      />
      <div className="relative flex flex-col items-center gap-2 text-text-secondary select-none">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="opacity-50"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-widest opacity-60">{label}</span>
        {loading === 'lazy' && (
          <span className="text-xs opacity-40 mt-1">Lazy loading</span>
        )}
      </div>
    </div>
  )
}