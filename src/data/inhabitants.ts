export type InhabitantId = 'peche' | 'noa' | 'brisa' | 'luna' | 'tilo' | 'robi'

export interface Inhabitant {
  id: InhabitantId
  name: string
  species: string
  catchphrase: string
  avatar: string
  color: string
  accent: string
  personality: 'dulce' | 'formal' | 'energetico' | 'curioso' | 'travieso' | 'sabio'
  bio: string
  playlist: string[]
  favoriteFlavors: string[]
  bestFriend: InhabitantId
  birthday: string
  difficulty: 'facil' | 'medio' | 'dificil'
  houseStyle: 'tejado-paja' | 'tejado-teja' | 'tejado-hoja' | 'tejado-nieve' | 'tejado-miel' | 'tejado-hoja-seca'
}

export const inhabitants: Inhabitant[] = [
  {
    id: 'peche',
    name: 'Pêche',
    species: 'Oso',
    catchphrase: '¡Dulzura para todos!',
    avatar: '🐻',
    color: '#f4c2c2',
    accent: '#e5989b',
    personality: 'dulce',
    bio: 'Oso golosino que ama los postres suaves y las meriendas con té. Siempre tiene una galleta guardada en el bolsillo.',
    playlist: ['Canción de cuna del bosque', 'Té de la tarde', 'Susurros de miel'],
    favoriteFlavors: ['miel', 'avena', 'vainilla', 'frutilla'],
    bestFriend: 'luna',
    birthday: '15 de marzo',
    difficulty: 'facil',
    houseStyle: 'tejado-miel',
  },
  {
    id: 'noa',
    name: 'Noa',
    species: 'Búho',
    catchphrase: 'Con precisión y calma.',
    avatar: '🦉',
    color: '#d1f2eb',
    accent: '#81c784',
    personality: 'formal',
    bio: 'Búho bibliotecario que mide cada gramo y cuenta cada minuto. Sus recetas son equilibradas y nutritivas.',
    playlist: ['Piano de medianoche', 'Lluvia suave sobre hojas', 'Silencio de la biblioteca'],
    favoriteFlavors: ['setas', 'romero', 'limón', 'avena integral'],
    bestFriend: 'tilo',
    birthday: '3 de octubre',
    difficulty: 'medio',
    houseStyle: 'tejado-teja',
  },
  {
    id: 'brisa',
    name: 'Brisa',
    species: 'Ardilla',
    catchphrase: '¡A toda velocidad!',
    avatar: '🐿️',
    color: '#ffe0b2',
    accent: '#ffb74d',
    personality: 'energetico',
    bio: 'Ardilla inquieta que cocina entre saltos y risas. Sus platos son atrevidos, coloridos y llenos de energía.',
    playlist: ['Corre ardilla corre', 'Fiesta en la copla', 'Trompeta del viento'],
    favoriteFlavors: ['mora', 'piña', 'chile', 'limón'],
    bestFriend: 'robi',
    birthday: '20 de junio',
    difficulty: 'dificil',
    houseStyle: 'tejado-hoja',
  },
  {
    id: 'luna',
    name: 'Luna',
    species: 'Coneja',
    catchphrase: 'Salto y pruebo.',
    avatar: '🐰',
    color: '#e1bee7',
    accent: '#ce93d8',
    personality: 'curioso',
    bio: 'Coneja saltarina que prueba cada plato nuevo del bosque y cuenta lo que siente en cada bocado.',
    playlist: ['Saltos bajo la luna', 'Trino de grillos', 'Dulce dormitar'],
    favoriteFlavors: ['frutilla', 'flores', 'menta', 'miel'],
    bestFriend: 'peche',
    birthday: '8 de abril',
    difficulty: 'facil',
    houseStyle: 'tejado-paja',
  },
  {
    id: 'tilo',
    name: 'Tilo',
    species: 'Erizo',
    catchphrase: 'Poco a poco, todo se sabe.',
    avatar: '🦔',
    color: '#d7ccc8',
    accent: '#bcaaa4',
    personality: 'sabio',
    bio: 'Erizo tranquilo que observa el bosque desde su seto. Sabe el nombre de cada seta y cada piedra.',
    playlist: ['Susurro del seto', 'Toc-toc de lluvia', 'Música para leer'],
    favoriteFlavors: ['setas', 'nueces', 'miel de bosque', 'tomillo'],
    bestFriend: 'noa',
    birthday: '12 de noviembre',
    difficulty: 'medio',
    houseStyle: 'tejado-hoja-seca',
  },
  {
    id: 'robi',
    name: 'Robi',
    species: 'Zorro',
    catchphrase: '¡Qué travesura tan rica!',
    avatar: '🦊',
    color: '#ffccbc',
    accent: '#ffab91',
    personality: 'travieso',
    bio: 'Zorro pícaro que roba frutas del huerto y las convierte en postres imposibles de resistir.',
    playlist: ['Zorro en fuga', 'Ritmo de zapatillas', 'Canto de medianoche'],
    favoriteFlavors: ['mora', 'frambuesa', 'canela', 'naranja'],
    bestFriend: 'brisa',
    birthday: '25 de agosto',
    difficulty: 'dificil',
    houseStyle: 'tejado-nieve',
  },
]

export const inhabitantById = (id: InhabitantId): Inhabitant =>
  inhabitants.find((i) => i.id === id)!
