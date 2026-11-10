import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, House } from 'lucide-react'
import { forestSpots } from '../data/forest-spots'

export function ForestMap() {
  const [selectedSpot, setSelectedSpot] = useState<typeof forestSpots[number] | null>(null)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <nav className="mb-2">
        <Link to="/" className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2">
          <ArrowLeft className="w-3 h-3" />
          Volver al bosque
        </Link>
      </nav>

      <section className="paper-card p-8 text-center border-black/20">
        <h2 className="text-3xl font-bold text-baloon text-[#5d4a3a] mb-2">
          Sitios para comer en el bosque
        </h2>
        <p className="text-[#5d4a3a]/80 max-w-2xl mx-auto leading-relaxed">
          Recorre el mapa del bosque y descubre los sitios donde los habitantes cocinan y comparten
          sus platos. Cada lugar tiene su propia especialidad y nivel de dificultad.
        </p>
      </section>

      {/* Mapa del bosque */}
      <section className="paper-card p-6 border-black/20 relative h-[600px] max-h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-[#f7f3ea]/30 opacity-50 pointer-events-none">
          {/* Árboles decorativos */}
          <div className="absolute top-10 left-5 text-6xl">🌳</div>
          <div className="absolute top-20 right-10 text-6xl">🌳</div>
          <div className="absolute bottom-20 left-10 text-6xl">🌳</div>
          <div className="absolute bottom-10 right-20 text-6xl">🌳</div>
          <div className="absolute top-40 left-40 text-5xl">🌲</div>
          <div className="absolute top-60 right-30 text-5xl">🌳</div>
          <div className="absolute top-10 left-80 text-5xl">🌳</div>
          {/* Casitas del bosque */}
          <div className="absolute top-15 left-15 text-4xl opacity-80">🏠</div>
          <div className="absolute top-25 right-15 text-4xl opacity-80">🏡</div>
          <div className="absolute bottom-15 left-15 text-4xl opacity-80">🏚️</div>
          <div className="absolute bottom-25 right-25 text-4xl opacity-80">🏘️</div>
          {/* Ríos y arroyos */}
          <div className="absolute top-30 left-10 w-8 h-8 rounded-full border-4 border-[#d1f2eb]/40" />
          <div className="absolute top-32 left-12 w-6 h-6 rounded-full border-4 border-[#d1f2eb]/30" />
          <div className="absolute bottom-40 left-60 w-10 h-10 rounded-full border-4 border-[#d1f2eb]/40" />
          <div className="absolute bottom-42 left-62 w-8 h-8 rounded-full border-4 border-[#d1f2eb]/30" />
          {/* Flores y setas */}
          <div className="absolute top-35 left-25 text-3xl opacity-90">🌸</div>
          <div className="absolute top-45 right-20 text-3xl opacity-90">🍄</div>
          <div className="absolute bottom-30 left-40 text-3xl opacity-90">🍄</div>
          <div className="absolute top-15 left-55 text-3xl opacity-90">🌸</div>
          <div className="absolute bottom-10 left-70 text-3xl opacity-90">🌸</div>
          {/* Nubes */}
          <div className="absolute top-5 left-20 text-5xl opacity-40">☁️</div>
          <div className="absolute top-8 right-20 text-5xl opacity-40">☁️</div>
          {/* Sol */}
          <div className="absolute top-5 right-5 text-6xl opacity-90">🌞</div>
        </div>
        <div className="relative h-full w-full bg-white/20 border border-black/10 rounded-2xl overflow-hidden">
          {/* Río */}
          <div className="absolute top-1/4 left-0 w-full h-4 bg-[#d1f2eb]/40 rounded-full opacity-60" />
          {/* Sendero */}
          <div className="absolute top-3/5 left-1/4 w-1 h-2/3 bg-[#ffe0b2]/50 rounded-full" />
          <div className="absolute top-1/2 left-3/4 w-2/3 h-1 bg-[#ffe0b2]/50 rounded-full" />

          {forestSpots.map((spot) => (
            <SpotMarker
              key={spot.id}
              spot={spot}
              selected={selectedSpot?.id === spot.id}
              onClick={() => setSelectedSpot(spot)}
            />
          ))}
        </div>
      </section>

      {/* Detalle del sitio seleccionado */}
      {selectedSpot && (
        <section className="paper-card p-8 border-black/20">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="text-6xl">{selectedSpot.image}</div>
            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-bold text-baloon text-[#5d4a3a] mb-1">
                {selectedSpot.name}
              </h2>
              <p className="text-lg font-semibold text-[#5d4a3a] mb-2">
                {selectedSpot.character} — {selectedSpot.characterAvatar}
              </p>
              <p className="text-[#5d4a3a]/80 leading-relaxed mb-4">{selectedSpot.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-[#5d4a3a]">Especialidad:</span>
                <span className="text-[#5d4a3a]/70">{selectedSpot.specialty}</span>
              </div>
              <Link
                to={`/habitante/${selectedSpot.id
                  .replace('casa-', '')
                  .replace('clearings', 'luna')
                  .replace('pond', 'peche')}`}
                className="btn-cute px-6 py-3 text-sm font-bold text-[#5d4a3a] flex items-center justify-center gap-2"
              >
                <House className="w-4 h-4" />
                Visitar perfil
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Lista de sitios */}
      <section className="paper-card p-6 border-black/20">
        <h3 className="text-2xl font-bold text-baloon text-[#5d4a3a] mb-6">Todos los sitios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forestSpots.map((spot) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              selected={selectedSpot?.id === spot.id}
              onClick={() => setSelectedSpot(spot)}
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
  spot: (typeof forestSpots)[number]
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`absolute cursor-pointer transition-all duration-200 transform group ${
        selected ? 'scale-125 z-10' : ''
      }`}
      style={{
        left: `${spot.x}%`,
        top: `${spot.y}%`,
      }}
      title={spot.name}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-black shadow-lg group-hover:scale-110 transition-transform ${
        selected ? 'ring-4 ring-black' : ''
      } bg-white`}>
        <span className="text-2xl">{spot.image}</span>
      </div>
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-full bg-[#5d4a3a] text-white text-xs font-bold shadow-md border border-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
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
  spot: (typeof forestSpots)[number]
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border border-black/20 cursor-pointer transition-all hover:scale-[1.02] ${
        selected ? 'ring-2 ring-black bg-[#f7f3ea]' : 'bg-white hover:bg-[#f7f3ea]'
      }`}
    >
      <div className="text-3xl mb-2">{spot.image}</div>
      <h4 className="font-bold text-baloon text-[#5d4a3a] mb-1">{spot.name}</h4>
      <p className="text-xs text-[#5d4a3a]/60 mb-3 line-clamp-2">{spot.description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-[#5d4a3a]">{spot.character}</span>
        <span className="text-[#5d4a3a]/50">{spot.specialty}</span>
      </div>
    </button>
  )
}
