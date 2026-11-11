import type { InhabitantId } from './inhabitants'

export type MapSpotKind = 'comida' | 'casa'

export interface MapSpot {
  id: string
  kind: MapSpotKind
  inhabitantId: InhabitantId
  name: string
  description: string
  character: string
  characterAvatar: string
  specialty?: string
  image: string
  x: number
  y: number
}

export const foodSpots: MapSpot[] = [
  {
    id: 'comida-lila',
    kind: 'comida',
    inhabitantId: 'lila',
    name: 'Castañal de Lila',
    description: 'Un claro entre castaños donde el aire huele a canela, miel y nuevas aventuras.',
    character: 'Lila Castaña',
    characterAvatar: '🐿️',
    specialty: 'Batidos, pastas y sabores curiosos',
    image: '🌰',
    x: 18,
    y: 28,
  },
  {
    id: 'comida-renato',
    kind: 'comida',
    inhabitantId: 'renato',
    name: 'Mesa de Naranjos de Renato',
    description: 'Un rincón soleado entre naranjos, perfumado con especias y travesuras dulces.',
    character: 'Renato Zorro',
    characterAvatar: '🦊',
    specialty: 'Platos intensos, tamales y pollo a la naranja',
    image: '🍊',
    x: 72,
    y: 24,
  },
  {
    id: 'comida-rock',
    kind: 'comida',
    inhabitantId: 'rock',
    name: 'Merendero de Rock',
    description: 'Una mesa bajo los árboles con aroma a miel, vainilla y postres recién preparados.',
    character: 'Rock Oso',
    characterAvatar: '🐻',
    specialty: 'Postres suaves, tartas y meriendas con té',
    image: '🍰',
    x: 24,
    y: 72,
  },
  {
    id: 'comida-tadeo',
    kind: 'comida',
    inhabitantId: 'tadeo',
    name: 'Rincón de Lectura de Tadeo',
    description: 'Un espacio tranquilo entre ramas donde se comparten platos equilibrados y nutritivos.',
    character: 'Tadeo Búho',
    characterAvatar: '🦉',
    specialty: 'Platos equilibrados, quinua y recetas nutritivas',
    image: '📚',
    x: 74,
    y: 70,
  },
]

export const houseSpots: MapSpot[] = [
  {
    id: 'casa-lila',
    kind: 'casa',
    inhabitantId: 'lila',
    name: 'Casa de Lila Castaña',
    description: 'La acogedora casa de Lila, rodeada de castaños y aromas dulces.',
    character: 'Lila Castaña',
    characterAvatar: '🐿️',
    image: '/casa_lila_castana.jpg',
    x: 30,
    y: 40,
  },
  {
    id: 'casa-renato',
    kind: 'casa',
    inhabitantId: 'renato',
    name: 'Casa de Renato Zorro',
    description: 'La casa de Renato, un refugio lleno de personalidad entre los árboles.',
    character: 'Renato Zorro',
    characterAvatar: '🦊',
    image: '/casa_renato_zorro.jpg',
    x: 84,
    y: 38,
  },
  {
    id: 'casa-rock',
    kind: 'casa',
    inhabitantId: 'rock',
    name: 'Casa de Rock Oso',
    description: 'El hogar cálido de Rock, siempre listo para una merienda con amigos.',
    character: 'Rock Oso',
    characterAvatar: '🐻',
    image: '/casa_rock_oso.jpg',
    x: 38,
    y: 58,
  },
  {
    id: 'casa-tadeo',
    kind: 'casa',
    inhabitantId: 'tadeo',
    name: 'Casa de Tadeo Búho',
    description: 'La casa de Tadeo, tranquila y ordenada, perfecta para leer y cocinar.',
    character: 'Tadeo Búho',
    characterAvatar: '🦉',
    image: '/tadeo_buho_casa.jpg',
    x: 60,
    y: 54,
  },
]

export const mapSpots: MapSpot[] = [...foodSpots, ...houseSpots]
