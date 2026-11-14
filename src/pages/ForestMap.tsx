import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, House, X } from 'lucide-react'
import { foodSpots, houseSpots, mapSpots, type MapSpot } from '../data/forest-spots'

type Filter = 'all' | 'comer' | 'casa'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'comer', label: 'Sitios para comer' },
  { id: 'casa', label: 'Casas' },
]

// Tamaño de las casas en el mapa (clases de Tailwind por breakpoint).
// Más pequeño: 'w-12 sm:w-14 md:w-16' | Más grande: 'w-20 sm:w-24 md:w-28'
const HOUSE_SIZE = 'w-16 sm:w-20 md:w-24'

type Decor = { emoji: string; x: number; y: number; size: number; opacity?: number }

const DECOR: Decor[] = [
  { emoji: '🌞', x: 93, y: 7, size: 56, opacity: 0.95 },
  { emoji: '☁️', x: 18, y: 7, size: 48, opacity: 0.45 },
  { emoji: '☁️', x: 62, y: 5, size: 40, opacity: 0.4 },
  { emoji: '🌳', x: 5, y: 20, size: 60 },
  { emoji: '🌳', x: 94, y: 30, size: 60 },
  { emoji: '🌲', x: 30, y: 38, size: 48 },
  { emoji: '🌳', x: 70, y: 14, size: 48 },
  { emoji: '🌳', x: 8, y: 82, size: 60 },
  { emoji: '🌳', x: 90, y: 88, size: 60 },
  { emoji: '🌲', x: 52, y: 92, size: 48 },
  { emoji: '🌸', x: 22, y: 30, size: 28, opacity: 0.9 },
  { emoji: '🌸', x: 45, y: 16, size: 28, opacity: 0.9 },
  { emoji: '🌸', x: 66, y: 90, size: 28, opacity: 0.9 },
  { emoji: '🍄', x: 82, y: 45, size: 28, opacity: 0.9 },
  { emoji: '🍄', x: 36, y: 78, size: 28, opacity: 0.9 },
]

export function ForestMap() {
  const [selectedSpot, setSelectedSpot] = useState<MapSpot | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const detailRef = useRef<HTMLElement | null>(null)

  const visibleSpots = useMemo(
    () =>
      mapSpots.filter((s) =>
        filter === 'all' ? true : filter === 'casa' ? s.kind === 'casa' : s.kind !== 'casa',
      ),
    [filter],
  )

  const handleSelect = (spot: MapSpot) => {
    setSelectedSpot(spot)
    // Espera a que el panel se renderice y luego baja hasta él
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <nav className="mb-2">
        <Link
          to="/"
          className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2 w-fit"
        >
          <ArrowLeft className="w-3 h-3" />
          Volver al bosque
        </Link>
      </nav>

      <section className="paper-card p-8 text-center border-black/20">
        <h2 className="text-3xl font-bold text-baloon text-[#5d4a3a] mb-2">Mapa del bosque</h2>
        <p className="text-[#5d4a3a]/80 max-w-2xl mx-auto leading-relaxed">
          Recorre el mapa para descubrir los sitios donde los habitantes cocinan y comparten sus platos,
          y encuentra también sus casas. Son lugares distintos de cada personaje.
        </p>
      </section>

      <section className="paper-card p-4 md:p-6 border-black/20 space-y-4">
        {/* Filtros + leyenda */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar el mapa">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${
                  filter === f.id
                    ? 'bg-[#5d4a3a] text-white border-[#5d4a3a]'
                    : 'bg-white text-[#5d4a3a] border-black/20 hover:bg-[#f7f3ea]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-[#5d4a3a]/70">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-white border-2 border-black inline-flex items-center justify-center text-[9px]">
                🍽️
              </span>
              Sitio para comer
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-base leading-none">🏠</span>
              Casa
            </span>
          </div>
        </div>

        {/* Lienzo del mapa */}
        <div className="relative h-[560px] md:h-[620px] max-h-[75vh] rounded-2xl overflow-hidden border border-black/10 bg-gradient-to-b from-[#e9f5ee] via-[#f7f3ea] to-[#e3eed2]">
          {/* Río y caminos */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M -5 24 C 15 14, 30 34, 50 24 S 85 14, 105 26"
              fill="none"
              stroke="#bfe6df"
              strokeWidth="26"
              strokeLinecap="round"
              opacity="0.55"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M -5 24 C 15 14, 30 34, 50 24 S 85 14, 105 26"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2 14"
              opacity="0.7"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 26 100 C 24 78, 40 68, 48 55 S 60 40, 78 38"
              fill="none"
              stroke="#f3d9a8"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.7"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 48 55 C 62 62, 78 58, 100 66"
              fill="none"
              stroke="#f3d9a8"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.7"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Decoración */}
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
            {DECOR.map((d, i) => (
              <span
                key={i}
                className="absolute leading-none"
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  fontSize: d.size,
                  opacity: d.opacity ?? 0.75,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {d.emoji}
              </span>
            ))}
          </div>

          {/* Marcadores */}
          {visibleSpots.map((spot) => (
            <SpotMarker
              key={spot.id}
              spot={spot}
              selected={selectedSpot?.id === spot.id}
              onClick={() => handleSelect(spot)}
            />
          ))}
        </div>
      </section>

      {selectedSpot && (
        <section
          ref={detailRef}
          className="paper-card p-6 md:p-8 border-black/20 relative scroll-mt-4"
        >
          <button
            type="button"
            onClick={() => setSelectedSpot(null)}
            aria-label="Cerrar detalle"
            className="absolute top-4 right-4 p-2 rounded-full text-[#5d4a3a]/60 hover:text-[#5d4a3a] hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {selectedSpot.kind === 'casa' ? (
              // Casa: solo la imagen, sin fondo, borde ni sombra de caja
              <img
                src={selectedSpot.image}
                alt={selectedSpot.name}
                className="w-full max-w-xs md:w-64 h-auto max-h-56 object-contain shrink-0 drop-shadow-[0_8px_8px_rgba(0,0,0,0.25)]"
              />
            ) : (
              <div className="w-28 h-28 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center text-5xl shrink-0">
                {selectedSpot.image}
              </div>
            )}

            <div className="flex-1 min-w-0 w-full">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`/pf/${selectedSpot.inhabitantId}.jpeg`}
                  alt={selectedSpot.character}
                  className="w-16 h-16 rounded-full object-cover border-2 border-black/20 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5d4a3a]/60 mb-0.5">
                    {selectedSpot.kind === 'casa' ? 'Casa' : 'Sitio para comer'}
                  </div>
                  <h2 className="text-3xl font-bold text-baloon text-[#5d4a3a] leading-tight">
                    {selectedSpot.name}
                  </h2>
                  <p className="text-lg font-semibold text-[#5d4a3a]">
                    {selectedSpot.character} {selectedSpot.characterAvatar}
                  </p>
                </div>
              </div>

              <p className="text-[#5d4a3a]/80 leading-relaxed mb-4">{selectedSpot.description}</p>

              {selectedSpot.specialty && (
                <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-[#f7f3ea] border border-black/10 text-sm">
                  <span className="font-bold text-[#5d4a3a]">Especialidad:</span>
                  <span className="text-[#5d4a3a]/70">{selectedSpot.specialty}</span>
                </div>
              )}

              <div>
                <Link
                  to={`/habitante/${selectedSpot.inhabitantId}`}
                  className="btn-cute px-6 py-3 text-sm font-bold text-[#5d4a3a] inline-flex items-center justify-center gap-2"
                >
                  <House className="w-4 h-4" />
                  Visitar perfil
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="paper-card p-6 border-black/20">
        <h3 className="text-2xl font-bold text-baloon text-[#5d4a3a] mb-6">Sitios para comer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {foodSpots.map((spot) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              selected={selectedSpot?.id === spot.id}
              onClick={() => handleSelect(spot)}
            />
          ))}
        </div>
      </section>

      <section className="paper-card p-6 border-black/20">
        <h3 className="text-2xl font-bold text-baloon text-[#5d4a3a] mb-6">Casas de los personajes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {houseSpots.map((spot) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              selected={selectedSpot?.id === spot.id}
              onClick={() => handleSelect(spot)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function SpotMarker({
  spot,
  selected,
  onClick,
}: {
  spot: MapSpot
  selected: boolean
  onClick: () => void
}) {
  const isHouse = spot.kind === 'casa'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={spot.name}
      aria-pressed={selected}
      className={`group absolute cursor-pointer focus:outline-none -translate-x-1/2 -translate-y-1/2 ${
        selected ? 'z-30' : 'z-10 hover:z-20 focus-visible:z-20'
      }`}
      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
    >
      <div
        className={`relative transition-transform duration-200 ${
          selected ? 'scale-110' : 'group-hover:scale-105 group-focus-visible:scale-105'
        }`}
      >
        {isHouse ? (
          // Casa SIN fondo: solo la imagen. El drop-shadow sigue la silueta, no dibuja caja.
          <img
            src={spot.image}
            alt=""
            draggable={false}
            className={`block ${HOUSE_SIZE} h-auto object-contain select-none ${
              selected
                ? 'drop-shadow-[0_8px_8px_rgba(0,0,0,0.35)]'
                : 'drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
            }`}
          />
        ) : (
          <div
            className={`w-14 h-14 rounded-full bg-white border-4 border-black shadow-lg flex items-center justify-center text-2xl ${
              selected ? 'ring-4 ring-[#5d4a3a]/40' : ''
            }`}
          >
            {spot.image}
          </div>
        )}

        <img
          src={`/pf/${spot.inhabitantId}.jpeg`}
          alt=""
          draggable={false}
          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full object-cover border-2 border-white shadow-md"
        />
      </div>

      {/* Etiqueta: hover/foco, y siempre visible si está seleccionado */}
      <div
        className={`pointer-events-none absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-[#5d4a3a] text-white text-xs font-bold shadow-md border border-black/20 transition-opacity ${
          selected
            ? 'opacity-100'
            : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
        }`}
      >
        {spot.name}
      </div>
    </button>
  )
}

function SpotCard({
  spot,
  selected,
  onClick,
}: {
  spot: MapSpot
  selected: boolean
  onClick: () => void
}) {
  const isHouse = spot.kind === 'casa'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`p-4 rounded-xl border cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md text-left ${
        selected
          ? 'border-[#5d4a3a] ring-2 ring-[#5d4a3a]/60 bg-[#f7f3ea]'
          : 'border-black/20 bg-white hover:bg-[#f7f3ea]'
      }`}
    >
      {isHouse ? (
        // Casa sin borde ni fondo propio
        <div className="w-full h-32 mb-3 flex items-center justify-center">
          <img
            src={spot.image}
            alt={spot.name}
            className="max-w-full max-h-full object-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
          />
        </div>
      ) : (
        <div className="w-full h-32 rounded-lg border border-black/20 mb-3 bg-[#f7f3ea] flex items-center justify-center text-5xl">
          {spot.image}
        </div>
      )}

      <div className="flex items-center gap-3 mb-2">
        <img
          src={`/pf/${spot.inhabitantId}.jpeg`}
          alt={spot.character}
          className="w-10 h-10 rounded-full object-cover border border-black/20 shrink-0"
        />
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#5d4a3a]/50">
            {isHouse ? 'Casa' : 'Sitio para comer'}
          </div>
          <h4 className="font-bold text-baloon text-[#5d4a3a] leading-tight">{spot.name}</h4>
          <p className="text-xs font-semibold text-[#5d4a3a]">{spot.character}</p>
        </div>
      </div>

      <p className="text-xs text-[#5d4a3a]/60 mb-2 line-clamp-2">{spot.description}</p>

      {spot.specialty && (
        <div className="text-xs text-[#5d4a3a]/70">
          <span className="font-bold text-[#5d4a3a]">Especialidad:</span> {spot.specialty}
        </div>
      )}
    </button>
  )
}