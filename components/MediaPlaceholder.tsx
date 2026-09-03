'use client'

import { Camera, Play, Plus } from 'lucide-react'

type Props = { type?: 'photo' | 'video'; label?: string; className?: string }

export function MediaPlaceholder({ type = 'photo', label = 'Tu recuerdo va aquí', className = '' }: Props) {
  const Icon = type === 'video' ? Play : Camera
  return (
    <div className={`media-placeholder group ${className}`} role="img" aria-label={`${type === 'video' ? 'Video' : 'Foto'}: ${label}`}>
      <div className="media-icon"><Icon size={20} strokeWidth={1.5} /></div>
      <span>{label}</span>
      <small><Plus size={12} /> Agregar {type === 'video' ? 'video' : 'foto'}</small>
    </div>
  )
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span /> {children}</p>
}

export function Whale() {
  return (
    <span className="whale-rig">
      <svg className="whale" viewBox="0 0 300 150" aria-label="Ballena nadando" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path strokeWidth="2" d="M90,66 C130,40 175,30 215,30 C240,30 258,34 268,40 C278,44 285,50 285,60 C285,70 285,76 278,82 C268,90 250,96 215,98 C175,102 130,104 98,94 C93,87 90,78 90,66 Z"/><path strokeWidth="2" d="M192,30 C186,19 180,13 172,14 C170,22 168,28 166,31 C175,29 184,29 192,30 Z"/><path strokeWidth="2" d="M90,66 C60,50 30,42 20,38 C30,52 42,58 48,61 C40,64 26,76 18,94 C34,84 62,80 96,92 C90,84 86,74 90,66 Z"/><path strokeWidth="2" d="M232,88 C244,102 250,114 245,124 C232,112 220,102 220,94 C224,91 228,89 232,88 Z"/><circle cx="262" cy="54" r="2.5" fill="currentColor" stroke="none"/><path strokeWidth="1.5" opacity=".5" d="M14,108c-12,7-22,8-32,5M4,122c-10,6-18,7-27,3"/></g></svg>
      <span className="whale-spout" aria-hidden="true"><i /><i /><i /></span>
    </span>
  )
}

export function Sunflower({ delay = 0 }: { delay?: number }) {
  return <svg className="sunflower" style={{ animationDelay: `${delay}s` }} viewBox="0 0 80 150" aria-hidden="true"><path d="M40 145C42 111 39 74 41 45" stroke="currentColor" strokeWidth="3" fill="none"/><path d="M40 105c-20-8-26-21-27-32 17 2 25 10 28 24M40 87c18-7 25-18 27-29-16 1-24 9-28 20" stroke="currentColor" strokeWidth="2" fill="none"/><g fill="#f4c542"><ellipse cx="40" cy="35" rx="10" ry="24"/><ellipse cx="40" cy="35" rx="10" ry="24" transform="rotate(45 40 35)"/><ellipse cx="40" cy="35" rx="10" ry="24" transform="rotate(90 40 35)"/><ellipse cx="40" cy="35" rx="10" ry="24" transform="rotate(135 40 35)"/></g><circle cx="40" cy="35" r="10" fill="#71451e"/></svg>
}

export function WaveLines() { return <div className="wave-lines" aria-hidden="true"><i/><i/><i/></div> }
