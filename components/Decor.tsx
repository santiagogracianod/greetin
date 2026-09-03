'use client'

import type { CSSProperties } from 'react'
import { Heart } from 'lucide-react'

export function Sun({ className = '' }: { className?: string }) {
  return (
    <svg className={`sun-glyph ${className}`} viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="25" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity=".8">
        <path d="M60 8v16M60 96v16M8 60h16M96 60h16M24 24l11 11M85 85l11 11M96 24L85 35M35 85L24 96" />
      </g>
    </svg>
  )
}

export function Stars({ count = 6, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`stars-field ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 41 + 7) % 100}%`,
            top: `${(i * 29 + 5) % 70}%`,
            animationDelay: `${(i % 5) * 0.6}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  )
}

export function Fog() {
  return (
    <div className="fog-layers" aria-hidden="true">
      <i /><i /><i />
    </div>
  )
}

export function Drift({ count = 8, tone = 'blue' }: { count?: number; tone?: 'blue' | 'gold' }) {
  return (
    <div className={`drift drift-${tone}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 53 + 9) % 100}%`,
            animationDelay: `${(i % 6) * 0.9}s`,
            animationDuration: `${7 + (i % 4) * 2}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  )
}

export function Hearts({ count = 18 }: { count?: number }) {
  return (
    <div className="hearts-rise" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={i % 2 === 0 ? 'heart-gold' : 'heart-blue'}
          style={{
            left: `${(i * 47 + 6) % 100}%`,
            animationDelay: `${(i % 8) * 0.28}s`,
            animationDuration: `${3.8 + (i % 4) * 0.6}s`,
          } as CSSProperties}
        >
          <Heart size={11 + (i % 3) * 4} fill="currentColor" strokeWidth={0} />
        </span>
      ))}
    </div>
  )
}

export function Petals({ count = 26 }: { count?: number }) {
  return (
    <div className="petals-fall" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={i % 3 === 0 ? 'petal-gold' : i % 3 === 1 ? 'petal-blue' : 'petal-green'}
          style={{
            left: `${(i * 37 + 3) % 100}%`,
            animationDelay: `${(i % 10) * 0.25}s`,
            animationDuration: `${3.4 + (i % 5) * 0.5}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  )
}
