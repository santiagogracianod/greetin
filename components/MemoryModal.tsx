'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Play, X } from 'lucide-react'

export type Memory = {
  key: string
  type?: 'photo' | 'video'
  title: string
  teaser: string
  caption: string
  src: string
}

export function MemoryCard({ memory, onOpen }: { memory: Memory; onOpen: () => void }) {
  return (
    <button className="memory-row" onClick={onOpen}>
      <div>
        <h3>{memory.title}</h3>
        <p>{memory.teaser}</p>
        <span className="memory-hint">Ver el recuerdo →</span>
      </div>
      <div className="memory-thumb">
        {memory.type === 'video' ? (
          <>
            <video src={memory.src} muted playsInline preload="metadata" />
            <span className="memory-thumb-play" aria-hidden="true"><Play size={15} fill="currentColor" /></span>
          </>
        ) : (
          <Image src={memory.src} alt={memory.title} fill className="object-cover" sizes="200px" />
        )}
      </div>
    </button>
  )
}

export function MemoryModal({ memory, onClose }: { memory: Memory; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="memory-modal-backdrop" onClick={onClose}>
      <div className="memory-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="memory-modal-close" onClick={onClose} aria-label="Cerrar"><X size={17} /></button>
        <div className="memory-modal-photo">
          {memory.type === 'video' ? (
            <video src={memory.src} controls playsInline className="memory-modal-video" />
          ) : (
            <Image src={memory.src} alt={memory.title} fill className="object-cover" sizes="560px" />
          )}
        </div>
        <div className="memory-modal-footer">
          <span className="memory-modal-title">{memory.title}</span>
          <p className="memory-modal-caption">{memory.caption}</p>
        </div>
      </div>
    </div>
  )
}
