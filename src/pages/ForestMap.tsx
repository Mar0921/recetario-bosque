import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, House } from 'lucide-react'
import { foodSpots, houseSpots, mapSpots, type MapSpot } from '../data/forest-spots'

export function ForestMap() {
  const [selectedSpot, setSelectedSpot] = useState<MapSpot | null>(null)

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
          Mapa del bosque
        </h2>
        <p className="text-[#5d4a3a]/80 max-w-2xl mx-auto leading-relaxed">
          Recorre el mapa para descubrir los sitios donde los habitantes cocinan y comparten sus platos,
          y encuentra también sus casas. Son lugares distintos de cada personaje.
        </p>
      </section>

      <section className="paper-card p-6 border-black/20 relative h-[600px] max-h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-[#f7f3ea]/30 opacity-50 pointer-events-none">
          <div className="absolute top-10 left-5 text-6xl">🌳</div>
          <div className="absolute top-20 right-10 text-6xl">🌳</div>
          <div className="absolute bottom-20 left-10 text-6xl">🌳</div>
          <div className="absolute bottom-10 right-20 text-6xl">🌳</div>
          <div className="absolute top-40 left-40 text-5xl">🌲</div>
          <div className="absolute top-60 right-30 text-5xl">🌳</div>
          <div className="absolute top-10 left-80 text-5xl">🌳</div>
          <div className="absolute top-35 left-25 text-3xl opacity-90">🌸</div>
          <div className="absolute top-45 right-20 text-3xl opacity-90">🍄</div>
          <div className="absolute bottom-30 left-40 text-3xl opacity-90">🍄</div>
          <div className="absolute top-15 left-55 text-3xl opacity-90">🌸</div>
          <div className="absolute bottom-10 left-70 text-3xl opacity-90">🌸</div>
          <div className="absolute top-5 left-20 text-5xl opacity-40">☁️</div>
          <div className="absolute top-8 right-20 text-5xl opacity-40">☁️</div>
          <div className="absolute top-5 right-5 text-6xl opacity-90">🌞</div>
        </div>
        <div className="relative h-full w-full bg-white/20 border border-black/10 rounded-2xl overflow-hidden">
          <div className="absolute top-1/4 left-0 w-full h-4 bg-[#d1f2eb]/40 rounded-full opacity-60" />
          <div className="absolute top-3/5 left-1/4 w-1 h-2/3 bg-[#ffe0b2]/50 rounded-full" />
          <div className="absolute top-1/2 left-3/4 w-2/3 h-1 bg-[#ffe0b2]/50 rounded-full" />

          {mapSpots.map((spot) => (
            <SpotMarker
              key={spot.id}
              spot={spot}
              selected={selectedSpot?.id === spot.id}
              onClick={() => setSelectedSpot(spot)}
            />
          ))}
        </div>
      </section>

      {selectedSpot && (
        <section className="paper-card p-8 border-black/20">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {selectedSpot.kind === 'casa' ? (
              <img
                src={selectedSpot.image}
                alt={selectedSpot.name}
                className="w-full md:w-64 h-40 md:h-48 rounded-xl object-cover border-4 border-white shadow-md shrink-0"
              />
            ) : (
              <div className="w-28 h-28 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center text-5xl shrink-0">
                {selectedSpot.image}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={`/pf/${selectedSpot.inhabitantId}.jpeg`}
                  alt={selectedSpot.character}
                  className="w-14 h-14 rounded-full object-cover border-2 border-black/20"
                />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5d4a3a]/60 mb-0.5">
                    {selectedSpot.kind === 'casa' ? 'Casa' : 'Sitio para comer'}
                  </div>
                  <h2 className="text-3xl font-bold text-baloon text-[#5d4a3a]">
                    {selectedSpot.name}
                  </h2>
                  <p className="text-lg font-semibold text-[#5d4a3a]">
                    {selectedSpot.character} {selectedSpot.characterAvatar}
                  </p>
                </div>
              </div>
              <p className="text-[#5d4a3a]/80 leading-relaxed mb-4">{selectedSpot.description}</p>
              {selectedSpot.specialty && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-[#5d4a3a]">Especialidad:</span>
                  <span className="text-[#5d4a3a]/70">{selectedSpot.specialty}</span>
                </div>
              )}
              <Link
                to={`/habitante/${selectedSpot.inhabitantId}`}
                className="btn-cute px-6 py-3 text-sm font-bold text-[#5d4a3a] inline-flex items-center justify-center gap-2"
              >
                <House className="w-4 h-4" />
                Visitar perfil
              </Link>
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
              onClick={() => setSelectedSpot(spot)}
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
  spot: MapSpot
  selected: boolean
  onClick: () => void
}) {
  const isHouse = spot.kind === 'casa'
  return (
    <button
      onClick={onClick}
      className={`absolute cursor-pointer transition-all duration-200 transform group ${
        selected ? 'scale-110 z-10' : ''
      }`}
      style={{
        left: `${spot.x}%`,
        top: `${spot.y}%`,
      }}
      title={spot.name}
    >
      <div className="relative">
        <div
          className={`overflow-hidden border-4 border-black shadow-lg group-hover:scale-105 transition-transform ${
            selected ? 'ring-4 ring-black' : ''
          } ${isHouse ? 'w-20 h-16 rounded-xl bg-white' : 'w-14 h-14 rounded-full bg-white flex items-center justify-center text-2xl'}`}
        >
          {isHouse ? (
            <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
          ) : (
            spot.image
          )}
        </div>
        <img
          src={`/pf/${spot.inhabitantId}.jpeg`}
          alt={spot.character}
          className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full object-cover border-2 border-white shadow-md"
        />
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
  spot: MapSpot
  selected: boolean
  onClick: () => void
}) {
  const isHouse = spot.kind === 'casa'
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border border-black/20 cursor-pointer transition-all hover:scale-[1.02] text-left ${
        selected ? 'ring-2 ring-black bg-[#f7f3ea]' : 'bg-white hover:bg-[#f7f3ea]'
      }`}
    >
      {isHouse ? (
        <img
          src={spot.image}
          alt={spot.name}
          className="w-full h-32 object-cover rounded-lg border border-black/20 mb-3"
        />
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
