export type InhabitantId = 'lila' | 'renato' | 'rock' | 'tadeo'

export type RecipeDifficulty = 'facil' | 'medio' | 'dificil'

export interface InhabitantRecipes {
  facil: string
  medio: string
  dificil: string
}

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
  recipes: InhabitantRecipes
}

export const inhabitants: Inhabitant[] = [
  {
    id: 'lila',
    name: 'Lila Castaña',
    species: 'Ardilla',
    catchphrase: '¡Qué rico huele el bosque!',
    avatar: '🐿️',
    color: '#e1bee7',
    accent: '#ce93d8',
    personality: 'curioso',
    bio: 'Le encanta probar sabores nuevos y recorrer el bosque buscando ingredientes para sus recetas.',
    playlist: ['Paseo entre castaños', 'Brisa de otoño', 'Dulce dormitar'],
    favoriteFlavors: ['Dulce y ácido'],
    bestFriend: 'renato',
    birthday: '12 de octubre',
    difficulty: 'facil',
    houseStyle: 'tejado-hoja-seca',
    recipes: { facil: 'batido-tarta-limon', medio: 'lasagna-picante', dificil: 'empanadas-res-papas' },
  },
  {
    id: 'renato',
    name: 'Renato Zorro',
    species: 'Zorro',
    catchphrase: '¡Qué travesura tan rica!',
    avatar: '🦊',
    color: '#ffccbc',
    accent: '#ffab91',
    personality: 'travieso',
    bio: 'Zorro pícaro que convierte las frutas del huerto en postres imposibles de resistir.',
    playlist: ['Zorro en fuga', 'Ritmo de zapatillas', 'Canto de medianoche'],
    favoriteFlavors: ['Sabores intensos, exóticos y especiados'],
    bestFriend: 'lila',
    birthday: '24 de julio',
    difficulty: 'dificil',
    houseStyle: 'tejado-teja',
    recipes: { facil: 'club-sandwich-vegetales', medio: 'pollo-naranja', dificil: 'tamales-carne-mole' },
  },
  {
    id: 'rock',
    name: 'Rock Oso',
    species: 'Oso',
    catchphrase: '¡Dulzura para todos!',
    avatar: '🐻',
    color: '#f4c2c2',
    accent: '#e5989b',
    personality: 'dulce',
    bio: 'Oso golosino que ama los postres suaves y las meriendas con té. Siempre guarda una galleta en el bolsillo.',
    playlist: ['Canción de cuna del bosque', 'Té de la tarde', 'Susurros de miel'],
    favoriteFlavors: ['Sabores ahumados y reconfortantes'],
    bestFriend: 'tadeo',
    birthday: '5 de noviembre',
    difficulty: 'facil',
    houseStyle: 'tejado-miel',
    recipes: { facil: 'tarta-bayas', medio: 'gelatina-fresas-crema', dificil: 'volovanes-natilla-coco-chocolate' },
  },
  {
    id: 'tadeo',
    name: 'Tadeo Búho',
    species: 'Búho',
    catchphrase: 'Con precisión y calma.',
    avatar: '🦉',
    color: '#d1f2eb',
    accent: '#81c784',
    personality: 'formal',
    bio: 'Búho bibliotecario que mide cada gramo y cuenta cada minuto. Sus recetas son equilibradas y nutritivas.',
    playlist: ['Piano de medianoche', 'Lluvia suave sobre hojas', 'Silencio de la biblioteca'],
    favoriteFlavors: ['Sabores sutiles y amargos'],
    bestFriend: 'rock',
    birthday: '21 de diciembre',
    difficulty: 'medio',
    houseStyle: 'tejado-paja',
    recipes: { facil: 'ensalada-papas-hierbas', medio: 'risotto-quinua-champinones', dificil: 'timbal-quinua-pollo' },
  },
]

export const inhabitantById = (id: InhabitantId): Inhabitant =>
  inhabitants.find((i) => i.id === id)!