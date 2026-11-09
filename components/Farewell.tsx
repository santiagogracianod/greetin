'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'

export default function Farewell() {
  useEffect(() => {
    fetch('/api/visit', { method: 'POST' }).catch(() => {})
  }, [])

  return (
    <main className="farewell">
      <Image
        src="/separados.webp"
        alt=""
        fill
        priority
        className="farewell-bg"
        sizes="100vw"
      />
      <div className="farewell-veil" />
      <div className="farewell-content">
        <Heart size={20} className="farewell-heart" />
        <p className="farewell-line">Los recuerdos ya no están aquí, pero eso no significa que hayan perdido su valor.</p>
        <p className="farewell-line">Gracias por todo lo que fuimos, por los momentos, las sonrisas y por cada instante que alguna vez nos hizo felices.</p>
        <p className="farewell-line">Hoy elijo dejarte ir en paz. No porque hayas dejado de importarme, sino porque fuiste importante.</p>
        <p className="farewell-line">Y aunque nuestra historia no haya tenido el final que había imaginado, siempre habrá una parte de mí agradecida de haberte conocido y haber vivido nuestro pedacito de historia.</p>
      </div>
    </main>
  )
}
