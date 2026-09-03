'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowLeft, ArrowRight, Heart, Sparkles } from 'lucide-react'
import { SectionEyebrow, Sunflower, Whale, WaveLines } from './MediaPlaceholder'
import { Drift, Fog, Hearts, Petals, Stars, Sun } from './Decor'
import { MemoryCard, MemoryModal, type Memory } from './MemoryModal'

const chapters = ['El comienzo', 'Nuestra historia', 'Lo bonito', 'Lo difícil', 'Lo que entendí', 'La pregunta']

const memories: Memory[] = [
  {
    key: 'pintura',
    title: 'Pintando juntos',
    teaser: 'Una tarde-noche de macetas de cerámica y risas.',
    caption: 'Esta tarde la recuerdo con mucho cariño. Llevábamos poco tiempo y, por lo general, no hacíamos este tipo de cosas, pero lo planeé justo después de una conversación donde me contaste que te gustaba pintar. Creo que fue la primera vez que me di a la tarea de escuchar algo para luego armar un plan y sorprenderte. Recuerdo que te gustó demasiado, e incluso tiempo después me dijiste que era algo que no te esperabas, y que te gustó mucho saber que escuchaba tus gustos para luego hacer cosas relacionadas con eso. Por desgracia, pasaron cosas jajaja y el cactus falleció, pero te juro que la maceta aún existe.',
    src: '/pintura.jpg',
  },
  {
    key: 'murillo',
    title: 'Murillo',
    teaser: 'Uno de nuestros viajes favoritos, (en el top 3).',
    caption: 'Nuestro primer viaje juntos, y según nuestras conversaciones, siempre entraba en el top 3 de tus viajes favoritos. Lo recuerdo bastante bien: nos arriesgábamos a viajar juntos y a disfrutar de estos lugares maravillosos, y esta fue una combinación perfecta. El frío que hacía era increíble, pero también dormir juntos y darnos calor mutuamente fue lo mejor. ¿Lo recuerdas? Luego estaba la caminata, los paisajes, los termales, y ese brillo en tus ojos de lo encantada que estabas con todo.',
    src: '/murillo.jpg',
  },
]

const beautifulMemories: Memory[] = [
  {
    key: 'combinados',
    title: 'Combinados',
    teaser: 'Lo que nunca te dije sobre combinar.',
    caption: 'Siempre te molestaba con eso: cada que combinábamos, te decía que eras una envidiosa por querer vestir de los mismos colores que yo. Pero en realidad, esa era mi forma de decirte que me encantaba que nos combináramos, que me gustaba que nos viéramos parecidos y que me gustaba que nos viéramos juntos. Y aunque no lo creas, eso me hacía sentir más cerca de ti. Recuerdo que ese día nos organizamos y nos veíamos tan lindos que decidimos hacer nuestra sesión de fotos improvisada. De por sí ya íbamos tarde, pero no importó, y hasta que no sacamos la foto que nos gustaba, no nos fuimos.',
    src: '/combinados.jpg',
  },
  {
    key: 'baile',
    type: 'video',
    title: 'Nuestro baile',
    teaser: 'Ese baile entre nerviosismo y emoción.',
    caption: 'Este baile es uno de mis recuerdos favoritos. Porque, aunque salió genial, no fue algo planeado. Incluso diría que fuimos obligados a bailar, todo fue presión social, porque era un momento de nuestras vidas donde nos volvíamos a ver, pero ninguno era capaz de mirar a los ojos. Y aunque había un sentimiento mutuo, no nos atrevíamos a decirlo, y se notaban los nervios y, al mismo tiempo, la emoción de estar juntos. Ese día regresé con el corazón un poquito más feliz y enamorado a mi casa. Todo el camino de regreso recordaba el baile y sonreía. Y aunque no lo planeamos, fue un momento que quedará en mi memoria para siempre.',
    src: '/baile.mp4',
  },
  {
    key: 'regalo',
    type: 'video',
    title: 'Un regalo',
    teaser: 'La cara que pusiste al abrirlo.',
    caption: 'Cada vez que veo este video me hace sonreír, sobre todo por tu reacción al leer la frase y saber que ya la habías visto antes — cómo asociaste eso con que ya te había dado pistas, jajaja. La historia detrás de este regalo, por supuesto, empieza por tus me gusta y tus compartidos. Me fijé en eso y lo fui guardando en mi memoria; sabía que no podía dejar que fueras espectadora. Así que fui sacando sutilmente información, como cuál era el libro que le seguía al que estabas leyendo, para ir a comprarlo e invitarte a un café porque sí, con una pequeña mentira de que tenía que comprar algo y quería invitarte a un café. Así fue como se elaboró todo el plan en una semana. Y tu reacción fue la mejor: me hiciste sonreír y me hiciste sentir que valió la pena todo el esfuerzo de hacerte ese regalo. Aunque este recuerdo sea de un regalo que te di yo, la verdad es que tú siempre has sido la de las manualidades y los regalos, sabes exactamente qué escoger y cuándo sorprenderme, y eso también quería dejarlo escrito aquí.',
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
    try {
      localStorage.setItem('journey_answer', value)
    } catch {
      // localStorage can be unavailable (private mode, etc.) — not critical here.
    }
    fetch('/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: value }),
    }).catch((err) => console.error('No se pudo guardar la respuesta', err))
  }
  useEffect(() => {
    try {
      const saved = localStorage.getItem('journey_answer')
      if (saved === 'yes' || saved === 'no') setAnswer(saved)
    } catch {
      // Ignore — she'll just see the question again.
    }
  }, [])
  useEffect(() => {
    if (answer) resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [answer])
  return <main className={`journey step-${step}`}>
    <header className="topbar"><div className="brand"><Heart size={15} fill="currentColor" /> para nosotros</div><span className="chapter-name">{chapters[step]}</span><span className="date-mark">una historia en construcción</span></header>
    <Progress step={step} />
    <div className="screen">
      {step === 0 && <section className="welcome section-inner"><div className="welcome-copy"><SectionEyebrow>UNA CARTA ABIERTA</SectionEyebrow><h1>Algunas historias<br /><em>merecen</em> otra mirada.</h1><p className="lead">Este pequeño viaje guarda recuerdos, aprendizajes y todo eso que todavía se queda bailando dentro.</p><button className="circle-btn" onClick={next} aria-label="Comenzar"><ArrowDown size={22} /></button><span className="scroll-label">comenzar el viaje</span></div><OceanArt /></section>}
      {step === 1 && <section className="section-inner story"><Sun className="dawn-sun" /><SectionEyebrow>NUESTROS INICIOS</SectionEyebrow><div className="title-row"><h2>Nuestros <br /><em>Comienzos.</em></h2><p>Hay momentos que parecen pequeños cuando suceden, pero con el tiempo descubrimos que estaban marcando el inicio de algo.</p></div><div className="timeline"><div className="timeline-line" />{memories.map((m) => <article key={m.key}><MemoryCard memory={m} onOpen={() => setOpenMemory(m.key)} /></article>)}</div></section>}
      {step === 2 && <section className="section-inner beautiful"><Sun className="field-sun" /><div className="sunflower-field"><Sunflower delay={0} /><Sunflower delay={.4} /><Sunflower delay={.8} /><Sunflower delay={.2} /></div><Drift count={10} tone="gold" /><SectionEyebrow>LOS DÍAS BONITOS</SectionEyebrow><h2>Lo que todavía<br /><em>florece.</em></h2><p className="intro">Hay recuerdos que, incluso con el paso del tiempo, siguen teniendo un lugar especial en el corazón.</p><div className="timeline"><div className="timeline-line" />{beautifulMemories.map((m) => <article key={m.key}><MemoryCard memory={m} onOpen={() => setOpenMemory(m.key)} /></article>)}</div></section>}
      {step === 3 && <section className="section-inner difficult"><Fog /><SectionEyebrow>CON HONESTIDAD</SectionEyebrow><div className="difficult-layout"><div><h2>No todo fue<br /><em>fácil.</em></h2><p className="lead">También hubo silencios, distancia y errores. No quiero borrar esa parte de nuestra historia; prefiero mirarla con calma, reconocer que nos equivocamos, que existieron muchas cosas que en su momento no supe ver, y que, efectivamente, se puede aprender de ellas para hacer las cosas mejor.</p><p className="note">Si tú lo recuerdas distinto, o hay algo que sientes que no dije aquí, me encantaría saberlo.</p></div><div className="real-media video large"><video src="/momento.mp4" controls playsInline /></div></div></section>}
      {step === 4 && <section className="section-inner growth"><Sun className="clear-sun" /><div className="growth-art"><Whale /><div className="mini-field"><Sunflower /><Sunflower delay={.3} /></div></div><SectionEyebrow>LO QUE ENTENDÍ</SectionEyebrow><h2>Quizás crecer es<br /><em>aprender a mirar.</em></h2><p className="intro">Con el tiempo aprendí que el amor es importante, pero por sí solo no basta. Amar también es escuchar, admirar, cuidar los detalles y no huir cuando las cosas se ponen difíciles.</p><p className="intro">Porque es justo ahí cuando se elige quedarse, hablar y tener el valor de hacerlo desde un lugar más sincero.</p><p className="intro">Aprendí a reconocer mis errores, y que amar también es aprender a cuidar mejor a quien tienes al lado. No puedes huirle a las dificultades, porque entonces corres el riesgo de perder <em>lo que nunca debiste haber perdido</em>.</p><div className="real-media photo growth-media"><Image src="/juntos.jpeg" alt="Caminando juntos hacia el mar al atardecer" fill className="object-cover" sizes="420px" /></div></section>}
      {step === 5 && <section className={`section-inner final ${answer ? `answered-${answer}` : ''}`}><Sun className="finale-sun" /><Stars count={8} /><div className="finale-motifs"><Whale /><Sunflower delay={.2} /><Sunflower delay={.6} /></div><div className="final-heart"><Heart size={25} fill="currentColor" /></div><SectionEyebrow>UNA PREGUNTA SINCERA</SectionEyebrow><h2>Por eso hoy te pregunto:<br /><em>¿te gustaría que hablemos?</em></h2>{!answer && <div className="real-media photo final-media"><Image src="/parque.jpg" alt="Nosotros en el parque" fill className="object-cover" sizes="420px" /></div>}{!answer && <p className="answer-rule">Importante: solo cuenta tu primera respuesta — elige con el corazón 💛</p>}{!answer && <div className="answer-row"><button className="answer-primary" onClick={() => submitAnswer('yes')}>Sí, me gustaría <Heart size={15} /></button><button className="answer-secondary" onClick={() => submitAnswer('no')}>Prefiero que no</button></div>}{answer === 'yes' && <div className="celebration" ref={resultRef}><div className="celebration-icon"><Heart size={22} fill="currentColor" /><Sparkles size={22} /><Heart size={22} fill="currentColor" /></div><h3>Gracias por decir que sí.</h3><p>Tu respuesta ya se envió a Santi. Muy pronto vas a recibir instrucciones (o alguna sorpresa) de su parte, mantente atenta a tus mensajes.</p></div>}{answer === 'no' && <div className="grace-note" ref={resultRef}><div className="grace-icon"><Heart size={22} /></div><h3>Gracias por tu sinceridad.</h3><p>Respeto tu decisión y te deseo, de corazón, cosas bonitas.</p></div>}{answer === 'yes' && <Petals />}{answer === 'yes' && <Hearts />}</section>}
    </div>
    <Nav step={step} next={next} back={back} />
    {openMemory && (() => {
      const memory = [...memories, ...beautifulMemories].find((m) => m.key === openMemory)
      return memory ? <MemoryModal memory={memory} onClose={() => setOpenMemory(null)} /> : null
    })()}
  </main>
}
