import { useState } from 'react'
import ImagePlaceholder from './ImagePlaceholder'

type Props = {
  /** Import the optimised files: import g1 from '../../assets/gallery-01-1600.jpg' */
  src?: string
  /** Optional modern formats — served first when the browser supports them. */
  avif?: string
  webp?: string
  /** Smaller variant for phones, e.g. the -800 output of optimize-media.sh */
  srcSmall?: string
  alt: string
  /** CSS aspect ratio, e.g. '4/3' or '16/9'. REQUIRED — this is what stops layout shift. */
  aspect?: string
  className?: string
  /** Set to 'eager' for anything visible without scrolling. Everything else stays lazy. */
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

/**
 * Drop-in replacement for ImagePlaceholder that renders the real photo once
 * you have one, and the placeholder until then. Three things it does that a
 * bare <img> does not:
 *
 *  1. Reserves the box via aspect-ratio, so the page never jumps when the
 *     image arrives (Cumulative Layout Shift = 0).
 *  2. Serves AVIF → WebP → JPEG, so modern browsers download ~40% less.
 *  3. Fades in on decode instead of popping, and falls back to the placeholder
 *     if the file 404s — so a missing asset never leaves a broken-image icon
 *     on the client's live site.
 */
export default function ResponsiveImage({
  src,
  avif,
  webp,
  srcSmall,
  alt,
  aspect = '4/3',
  className = '',
  loading = 'lazy',
  priority = false,
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <ImagePlaceholder label={alt} aspect={aspect} className={className} loading={loading} />
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-linen dark:bg-char ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <picture>
        {avif && <source srcSet={avif} type="image/avif" />}
        {webp && <source srcSet={webp} type="image/webp" />}
        <img
          src={src}
          srcSet={srcSmall ? `${srcSmall} 800w, ${src} 1600w` : undefined}
          sizes={srcSmall ? '(max-width: 768px) 100vw, 50vw' : undefined}
          alt={alt}
          loading={priority ? 'eager' : loading}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </picture>
    </div>
  )
}
