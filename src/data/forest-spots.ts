export type ForestSpotId =
  | 'casa-peche'
  | 'casa-noa'
  | 'casa-brisa'
  | 'casa-luna'
  | 'casa-tilo'
  | 'casa-robi'
  | 'clearings'
  | 'pond'

export interface ForestSpot {
  id: ForestSpotId
  name: string
  description: string
  character: string
  characterAvatar: string
  specialty: string
  image: string
  x: number
  y: number
}

export const forestSpots: ForestSpot[] = [
  {
    id: 'casa-peche',
    name: 'Casa de Pêche',
    description: 'Un árbol hueco con olor a galletas recién horneadas y miel caliente.',
    character: 'Pêche',
    characterAvatar: '🐻',
  specialty: 'Postres dulces y meriendas con té',
    image: '🍪',
    x: 15,
    y: 25,
  },
  {
    id: 'casa-noa',
    name: 'La Biblioteca de Noa',
    description: 'Una casa entre las ramas con libros de cocina y setas secas colgando.',
    character: 'Noa',
    characterAvatar: '🦉',
    specialty: 'Sopas cremosas y panes integrales',
    image: '🍄',
    x: 50,
    y: 15,
  },
  {
    id: 'casa-brisa',
    name: 'El Taller de Brisa',
    description: 'Una cabaña colorida en la copa de un árbol, siempre con música y risas.',
    character: 'Brisa',
    characterAvatar: '🐿️',
    specialty: 'Brochetas de fruta y platos atrevidos',
    image: '🍓',
    x: 85,
    y: 35,
  },
  {
    id: 'casa-luna',
    name: 'Madriguera de Luna',
    description: 'Un refugio bajo tierra con flores silvestres y olor a menta.',
    character: 'Luna',
    characterAvatar: '🐰',
    specialty: 'Ensaladas frescas y platos ligeros',
    image: '🥗',
    x: 30,
    y: 60,
  },
  {
    id: 'casa-tilo',
    name: 'El Seto de Tilo',
    description: 'Un seto espeso con una mesa de piedra y té caliente todo el día.',
    character: 'Tilo',
    characterAvatar: '🦔',
    specialty: 'Setas al horno y platos sabios',
    image: '🍄',
    x: 65,
    y: 55,
  },
  {
    id: 'casa-robi',
    name: 'La Guarida de Robi',
    description: 'Una cueva entre rocas con frutas robadas y postres imposibles.',
    character: 'Robi',
    characterAvatar: '🦊',
    specialty: 'Postres de mora y travesuras dulces',
    image: '🫐',
    x: 90,
    y: 75,
  },
  {
    id: 'clearings',
    name: 'El Claro del Bosque',
    description: 'Un espacio abierto donde todos se reúnen para compartir sus platos.',
    character: 'Todos',
    characterAvatar: '🌲',
    specialty: 'Picnics compartidos y platos del foro',
    image: '🍽️',
    x: 50,
    y: 85,
  },
  {
    id: 'pond',
    name: 'El Estanque de los Lirios',
    description: 'Agua quieta con nenúfares, perfecto para un té tranquilo.',
    character: 'Pêche',
    characterAvatar: '🐻',
    specialty: 'Té de flores y galletas',
    image: '🌸',
    x: 10,
    y: 75,
  },
]

export const spotById = (id: ForestSpotId): ForestSpot =>
  forestSpots.find((s) => s.id === id)!
