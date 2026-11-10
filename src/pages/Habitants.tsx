import { useState } from 'react'
import { Link } from 'react-router-dom'
import { inhabitants } from '../data/inhabitants'

const houseIcons: Record<string, string> = {
  'tejado-paja': '🏚️',
  'tejado-teja': '🏘️',
  'tejado-hoja': '🏡',
  'tejado-nieve': '🏠',
  'tejado-miel': '🍯',
  'tejado-hoja-seca': '🌿',
}

const personalityLabel: Record<string, string> = {
  dulce: 'Dulce',
  formal: 'Formal',
  energetico: 'Energetico',
  curioso: 'Curioso',
  sabio: 'Sabio',
  travieso: 'Travieso',
}

const houseCard: Record<string, string> = {
  '#f4c2c2': 'card-pink',
  '#d1f2eb': 'card-mint',
  '#ffe0b2': 'card-cream',
  '#e6e6fa': 'card-lavender',
  '#ffccbc': 'card-peach',
  '#e1bee7': 'card-lilac',
  '#d7ccc8': 'card-sky',
}

export function Habitants() {
  const [search, setSearch] = useState('')

  const filtered = inhabitants.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.species.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <nav className="mb-2">
        <Link to="/" className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2">
          <span className="w-3 h-3" dangerouslySetInnerHTML={{ __html: '&larr;' }} />
          Volver al bosque
        </Link>
      </nav>

      <div className="bg-pastel-paper p-6 text-center rounded-3xl border border-black/20 shadow-lg">
        <h2 className="text-3xl font-bold text-baloon text-[#5d4a3a] mb-2">Habitantes del foro</h2>
        <p className="text-[#5d4a3a]/70 mb-4">Haz clic en cualquier casita para entrar al perfil de ese habitante.</p>
        <input
          type="text"
          placeholder="Buscar habitante..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md mx-auto border border-black/20 px-4 py-2 rounded-full text-[#5d4a3a] focus:outline-none focus:ring-2 focus:ring-[#e5989b] text-baloon"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filtered.map((inhabitant) => (
          <InhabitantHouse key={inhabitant.id} inhabitant={inhabitant} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-10 text-[#5d4a3a]/50">
            No se encontró ningún habitante.
          </div>
        )}
      </div>
    </div>
  )
}

function InhabitantHouse({ inhabitant }: { inhabitant: any }) {
  const houseIcon = houseIcons[inhabitant.houseStyle] || '🏠'

  return (
    <Link
      to={`/habitante/${inhabitant.id}`}
      className="group cursor-pointer"
    >
      <div className={`p-6 text-center rounded-3xl shadow-lg transition-all hover:scale-[1.02] group ${houseCard[inhabitant.color] || 'card-sky'}`} style={{ borderColor: inhabitant.accent }}>
        <div className="text-4xl mb-3 mx-auto">{houseIcon}</div>
        <div className="w-12 h-12 rounded-full bg-white border border-black/20 mx-auto mb-2 flex items-center justify-center text-2xl">
          {inhabitant.avatar}
        </div>
        <h4 className="font-bold text-baloon text-[#5d4a3a] mb-1">{inhabitant.name}</h4>
        <p className="text-xs text-[#5d4a3a]/60 mb-3">{inhabitant.species}</p>
        <span className={`text-[10px] font-bold uppercase border border-black/20 px-2 py-0.5 rounded-full ${inhabitant.accent}/20 text-[#5d4a3a]`}>
          {personalityLabel[inhabitant.personality]}
        </span>
      </div>
    </Link>
  )
}
