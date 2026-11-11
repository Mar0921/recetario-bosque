import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { inhabitants, type InhabitantId } from '../data/inhabitants'

/**
 * Ruta base de las imágenes. Con Vite, los archivos dentro de /public
 * se sirven desde la raíz ("/casa_lila_castana.jpg").
 * Si están en una subcarpeta, cambia por ejemplo a '/images/'.
 */
const IMG_BASE = '/'

// Correspondencias exactas casa -> personaje
const IMAGES: Record<InhabitantId, { house: string; character: string }> = {
  lila: { house: 'casa_lila_castana.jpg', character: 'lila_castana_render.jpg' },
  renato: { house: 'casa_renato_zorro.jpg', character: 'renato_zorro_render.jpg' },
  rock: { house: 'casa_rock_oso.jpg', character: 'rock_oso_render.jpg' },
  tadeo: { house: 'tadeo_buho_casa.jpg', character: 'tadeo_buho_render.jpg' },
}

// Desvanece los bordes de las imágenes para que no se vean como un rectángulo
const softMask: React.CSSProperties = {
  WebkitMaskImage:
    'radial-gradient(ellipse at center, #000 52%, rgba(0,0,0,0) 74%)',
  maskImage: 'radial-gradient(ellipse at center, #000 52%, rgba(0,0,0,0) 74%)',
}

export function Habitants() {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const touchStartX = useRef<number | null>(null)

  // Solo los 4 personajes definidos en data/inhabitants
  const entries = useMemo(
    () => inhabitants.map((inh) => ({ inh, ...IMAGES[inh.id] })),
    [],
  )
  const N = entries.length

  const next = useCallback(() => setActive((a) => (a + 1) % N), [N])
  const prev = useCallback(() => setActive((a) => (a - 1 + N) % N), [N])

  // Navegación con teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const current = entries[active]
  const inh = current.inh
  const accent = inh.accent

  const goToProfile = (id: InhabitantId) => navigate(`/habitante/${id}`)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
    touchStartX.current = null
  }

  // Click en una casa:
  // - central -> perfil del habitante
  // - lateral -> pasa al centro
  const handleHouseClick = (index: number, isCenter: boolean) => {
    if (!isCenter) {
      setActive(index)
      return
    }
    goToProfile(entries[index].inh.id)
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] min-h-[calc(100vh-8rem)] select-none">
      <style>{`
        @keyframes characterIn {
          from { opacity: 0; transform: translateY(28px) scale(.88); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes textIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Fondo inmersivo que cambia con el color de la casa activa */}
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 55%, ${accent}55 0%, ${accent}22 35%, transparent 70%), linear-gradient(180deg, #fff8ec 0%, #f3e6d2 100%)`,
        }}
      />
      <div
        className="absolute left-1/2 bottom-[14%] -translate-x-1/2 w-[70%] max-w-[760px] h-24 rounded-[50%] blur-2xl opacity-40 transition-colors duration-700"
        style={{ backgroundColor: accent }}
      />

      <div className="relative z-10 px-4 pt-8 pb-6 flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-baloon text-[#5d4a3a] text-center">
          Habitantes del Bosque
        </h2>
        <p className="text-[#5d4a3a]/70 text-center mt-1 text-sm sm:text-base">
          Haz clic en la casa para conocer a quien vive dentro
        </p>

        {/* ESCENARIO DEL CARRUSEL */}
        <div
          className="relative w-full max-w-6xl mt-6 h-[min(58vh,500px)] min-h-[320px]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {entries.map((h, i) => {
            let d = (i - active + N) % N
            if (d > N / 2) d -= N
            const offset = d // -1 izquierda, 0 centro, 1 derecha
            const visible = Math.abs(offset) <= 1
            const isCenter = offset === 0

            const scale = isCenter ? 1 : 0.62
            const opacity = !visible ? 0 : isCenter ? 1 : 0.5
            const name = h.inh.name

            return (
              <div
                key={h.house}
                className="absolute left-1/2 bottom-0 w-[min(60vw,430px)] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                style={
                  {
                    '--step': 'clamp(140px, 31vw, 400px)',
                    transform: `translateX(calc(-50% + ${offset} * var(--step))) scale(${scale})`,
                    transformOrigin: 'bottom center',
                    opacity,
                    zIndex: isCenter ? 20 : 10,
                    pointerEvents: visible ? 'auto' : 'none',
                    filter: isCenter ? 'none' : 'saturate(.8) brightness(.97)',
                  } as React.CSSProperties
                }
              >
                <button
                  type="button"
                  onClick={() => handleHouseClick(i, isCenter)}
                  aria-label={
                    isCenter
                      ? `Entrar al perfil de ${name}`
                      : `Seleccionar casa de ${name}`
                  }
                  title={isCenter ? `Ver perfil de ${name}` : undefined}
                  className="group block w-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#5d4a3a]/30 rounded-3xl"
                  tabIndex={visible ? 0 : -1}
                >
                  <img
                    src={`${IMG_BASE}${h.house}`}
                    alt={`Casa de ${name}`}
                    draggable={false}
                    className={`w-full h-[min(50vh,420px)] object-contain mix-blend-multiply transition-transform duration-300 ${
                      isCenter ? 'group-hover:scale-[1.04]' : 'group-hover:scale-[1.02]'
                    }`}
                    style={softMask}
                  />
                </button>

                {/* Personaje: SOLO existe en el DOM para la casa central */}
                {isCenter && (
                  <button
                    type="button"
                    key={`char-${h.character}`}
                    onClick={() => goToProfile(h.inh.id)}
                    aria-label={`Ver perfil de ${name}`}
                    className="absolute bottom-0 -right-[24%] w-[58%] h-[min(44vh,360px)] cursor-pointer focus:outline-none"
                    style={{
                      animation:
                        'characterIn .6s cubic-bezier(.22,1,.36,1) .3s both, floaty 4s ease-in-out 1s infinite',
                    }}
                  >
                    <img
                      src={`${IMG_BASE}${h.character}`}
                      alt={name}
                      draggable={false}
                      className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl"
                      style={softMask}
                    />
                  </button>
                )}
              </div>
            )
          })}

          {/* Flechas laterales */}
          <button
            type="button"
            onClick={prev}
            aria-label="Casa anterior"
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 border-2 border-[#5d4a3a]/30 text-[#5d4a3a] shadow-lg flex items-center justify-center hover:scale-110 hover:bg-white active:scale-95 transition"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 5 8 12 15 19" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Casa siguiente"
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 border-2 border-[#5d4a3a]/30 text-[#5d4a3a] shadow-lg flex items-center justify-center hover:scale-110 hover:bg-white active:scale-95 transition"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 5 16 12 9 19" />
            </svg>
          </button>
        </div>

        {/* Información del habitante seleccionado */}
        <div
          key={inh.id}
          className="mt-6 text-center max-w-xl"
          style={{ animation: 'textIn .5s ease .25s both' }}
        >
          <h3
            className="text-4xl sm:text-5xl font-bold text-baloon"
            style={{ color: inh.color }}
          >
            {inh.name}
          </h3>
          <p className="text-sm font-semibold text-[#5d4a3a]/70 mt-1">
            {inh.species}
          </p>
          <p className="text-[#5d4a3a]/60 italic mt-2">"{inh.catchphrase}"</p>

          <Link
            to={`/habitante/${inh.id}`}
            className="inline-flex items-center gap-2 mt-5 px-7 py-3 rounded-full border-2 bg-white font-bold text-[#5d4a3a] shadow-md hover:-translate-y-1 hover:shadow-lg transition-all"
            style={{ borderColor: accent }}
          >
            Entrar a la casa →
          </Link>
        </div>

        {/* Indicadores */}
        <div className="flex gap-2 mt-6">
          {entries.map((e, i) => (
            <button
              key={e.inh.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ir a la casa ${i + 1}`}
              className="h-2.5 rounded-full transition-all duration-500"
              style={{
                width: i === active ? 32 : 10,
                backgroundColor: i === active ? accent : '#5d4a3a33',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}