import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, variant = 'primary', className = '', ...props }: Props) {
  const base   = 'px-6 py-3 rounded-md font-semibold transition duration-300 cursor-pointer'
  const styles = variant === 'primary'
    ? 'bg-terracotta text-white hover:bg-walnut'
    : 'bg-taupe text-white hover:opacity-80'

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  )
}
