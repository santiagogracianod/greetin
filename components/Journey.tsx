'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, Heart, Sparkles } from 'lucide-react'
import { MediaPlaceholder, SectionEyebrow, Sunflower, Whale, WaveLines } from './MediaPlaceholder'
import { Drift, Fog, Hearts, Petals, Stars, Sun } from './Decor'
import { MemoryCard, MemoryModal, type Memory } from './MemoryModal'

const chapters = ['El comienzo', 'Nuestra historia', 'Lo bonito', 'Lo difícil', 'Lo que entendí', 'La pregunta']

const memories: Memory[] = [
  {
    key: 'pintura',
    title: 'Pintando juntos',
    teaser: 'Una noche de macetas de cerámica y risas.',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    src: '/pintura.jpg',
  },
  {
    key: 'murillo',
    title: 'Murillo',
    teaser: 'Nuestro viaje favorito, hasta ahora.',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.',
    src: '/murillo.jpg',
  },
]

const beautifulMemories: Memory[] = [
  {
    key: 'combinados',
    title: 'Combinados',
    teaser: 'El día que combinamos la ropa sin ponernos de acuerdo del todo.',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vivamus euismod nunc nec facilisis lacinia, nunc nunc lacinia nunc, nec lacinia nunc nunc nec.',
    src: '/combinados.jpg',
  },
  {
    key: 'baile',
    type: 'video',
    title: 'Nuestro baile',
    teaser: 'Ese baile que terminó siendo nuestro.',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    src: '/baile.mp4',
  },
  {
    key: 'regalo',
    type: 'video',
    title: 'Un regalo',
    teaser: 'La cara que pusiste al abrirlo.',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
    src: '/regalo.mp4',
  },
]

function Progress({ step }: { step: number }) {
  return <div className="progress-wrap" aria-label={`Recuerdo ${step + 1} de ${chapters.length}`}><div className="progress"><i style={{ width: `${((step + 1) / chapters.length) * 100}%` }} /></div></div>
}

function Nav({ step, next, back }: { step: number; next: () => void; back: () => void }) {
  return <div className="journey-nav">{step > 0 ? <button className="back-btn" onClick={back} aria-label="Volver"><ArrowLeft size={16} /> Atrás</button> : <span />}{step < 5 && <button className="next-btn" onClick={next}>Continuar <ArrowRight size={16} /></button>}</div>
}

function OceanArt() {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', String((e.clientX - r.left) / r.width - 0.5))
    el.style.setProperty('--my', String((e.clientY - r.top) / r.height - 0.5))
  }
  const reset = () => {
    ref.current?.style.setProperty('--mx', '0')
    ref.current?.style.setProperty('--my', '0')
  }
  return (
    <div className="ocean-art" ref={ref} onMouseMove={onMove} onMouseLeave={reset}>
      <div className="moon" />
      <div className="whale-parallax"><Whale /></div>
      <WaveLines />
      <span className="star-field">✦　·　✧　·　✦</span>
      <Drift count={6} tone="blue" />
    </div>
  )
}

export default function Journey() {
  const [step, setStep] = useState(0)
  const [answer, setAnswer] = useState<string | null>(null)
  const [openMemory, setOpenMemory] = useState<string | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const next = () => setStep((s) => Math.min(5, s + 1))
  const back = () => setStep((s) => Math.max(0, s - 1))
  const submitAnswer = (value: 'yes' | 'no') => {
    setAnswer(value)
    fetch('/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: value }),
    }).catch((err) => console.error('No se pudo guardar la respuesta', err))
  }
  useEffect(() => {
    if (answer) resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [answer])
  return <main className={`journey step-${step}`}>
    <header className="topbar"><div className="brand"><Heart size={15} fill="currentColor" /> para nosotros</div><span className="chapter-name">{chapters[step]}</span><span className="date-mark">una historia en construcción</span></header>
    <Progress step={step} />
    <div className="screen">
      {step === 0 && <section className="welcome section-inner"><div className="welcome-copy"><SectionEyebrow>UNA CARTA ABIERTA</SectionEyebrow><h1>Algunas historias<br /><em>merecen</em> otra mirada.</h1><p className="lead">Este pequeño viaje guarda recuerdos, aprendizajes y todo eso que todavía se queda bailando dentro.</p><button className="circle-btn" onClick={next} aria-label="Comenzar"><ArrowDown size={22} /></button><span className="scroll-label">comenzar el viaje</span></div><OceanArt /></section>}
      {step === 1 && <section className="section-inner story"><Sun className="dawn-sun" /><SectionEyebrow>NUESTROS INICIOS</SectionEyebrow><div className="title-row"><h2>Donde todo<br /><em>comenzó.</em></h2><p>Hay momentos que parecen pequeños cuando suceden, pero con el tiempo descubrimos que estaban marcando el inicio de algo.</p></div><div className="timeline"><div className="timeline-line" />{memories.map((m) => <article key={m.key}><MemoryCard memory={m} onOpen={() => setOpenMemory(m.key)} /></article>)}</div></section>}
      {step === 2 && <section className="section-inner beautiful"><Sun className="field-sun" /><div className="sunflower-field"><Sunflower delay={0} /><Sunflower delay={.4} /><Sunflower delay={.8} /><Sunflower delay={.2} /></div><Drift count={10} tone="gold" /><SectionEyebrow>LOS DÍAS BONITOS</SectionEyebrow><h2>Lo que todavía<br /><em>florece.</em></h2><p className="intro">Aquí van las cosas que hicieron que valiera la pena: los bailes, las risas sin sentido y esos instantes que se sintieron como casa.</p><div className="timeline"><div className="timeline-line" />{beautifulMemories.map((m) => <article key={m.key}><MemoryCard memory={m} onOpen={() => setOpenMemory(m.key)} /></article>)}</div></section>}
      {step === 3 && <section className="section-inner difficult"><Fog /><SectionEyebrow>CON HONESTIDAD</SectionEyebrow><div className="difficult-layout"><div><h2>No todo fue<br /><em>fácil.</em></h2><p className="lead">También hubo silencios, distancia y errores. No quiero borrar esa parte de la historia; quiero mirarla con más calma y reconocer lo que pude hacer mejor.</p><p className="note">Este espacio puede convertirse en tus propias palabras: honestas, sencillas y sin culpas.</p></div><MediaPlaceholder type="photo" label="Una imagen para este capítulo" className="large" /></div></section>}
      {step === 4 && <section className="section-inner growth"><Sun className="clear-sun" /><div className="growth-art"><Whale /><div className="mini-field"><Sunflower /><Sunflower delay={.3} /></div></div><SectionEyebrow>LO QUE ENTENDÍ</SectionEyebrow><h2>Quizás crecer es<br /><em>aprender a mirar.</em></h2><p className="intro">Con el tiempo entendí que querer también es escuchar, cuidar los detalles y tener el valor de hablar desde un lugar más sincero.</p><MediaPlaceholder type="video" label="Un video de lo que hemos aprendido" className="growth-media" /></section>}
      {step === 5 && <section className={`section-inner final ${answer ? `answered-${answer}` : ''}`}><Sun className="finale-sun" /><Stars count={8} /><div className="finale-motifs"><Whale /><Sunflower delay={.2} /><Sunflower delay={.6} /></div><div className="final-heart"><Heart size={25} fill="currentColor" /></div><SectionEyebrow>UNA PREGUNTA SINCERA</SectionEyebrow><h2>¿Te gustaría que<br /><em>hablemos?</em></h2>{!answer && <MediaPlaceholder type="photo" label="Nuestra foto especial" className="final-media" />}{!answer && <div className="answer-row"><button className="answer-primary" onClick={() => submitAnswer('yes')}>Sí, me gustaría <Heart size={15} /></button><button className="answer-secondary" onClick={() => submitAnswer('no')}>Prefiero que no</button></div>}{answer === 'yes' && <div className="celebration" ref={resultRef}><div className="celebration-icon"><Heart size={22} fill="currentColor" /><Sparkles size={22} /><Heart size={22} fill="currentColor" /></div><h3>Gracias por decir que sí.</h3><p>Cuando quieras, aquí estoy — con tiempo, con calma y con ganas de escucharte.</p></div>}{answer === 'no' && <div className="grace-note" ref={resultRef}><div className="grace-icon"><Heart size={22} /></div><h3>Gracias por tu sinceridad.</h3><p>Respeto tu decisión y te deseo, de corazón, cosas bonitas.</p></div>}{answer === 'yes' && <Petals />}{answer === 'yes' && <Hearts />}</section>}
    </div>
    <Nav step={step} next={next} back={back} />
    {openMemory && (() => {
      const memory = [...memories, ...beautifulMemories].find((m) => m.key === openMemory)
      return memory ? <MemoryModal memory={memory} onClose={() => setOpenMemory(null)} /> : null
    })()}
  </main>
}
