export type CharacterId = 'peche' | 'noa' | 'brisa'

export interface Character {
  id: CharacterId
  name: string
  species: string
  catchphrase: string
  color: string
  accent: string
  font: string
  personality: 'dulce' | 'formal' | 'energetico'
  bio: string
  avatar: string
  difficulty: 'facil' | 'medio' | 'dificil'
  quote: string
}

export const characters: Character[] = [
  {
    id: 'peche',
    name: 'Pêche',
    species: 'Oso',
    catchphrase: '¡Dulzura para todos!',
    color: '#f4c2c2',
    accent: '#e5989b',
    font: "'Fredoka', 'Nunito', cursive",
    personality: 'dulce',
    bio: 'Un oso golosino que ama los postres suaves y las meriendas con té. Siempre tiene una galleta guardada en el bolsillo.',
    avatar: '🐻',
    difficulty: 'facil',
    quote: '¡Todo sabe mejor con un poco de amor!',
  },
  {
    id: 'noa',
    name: 'Noa',
    species: 'Búho',
    catchphrase: 'Con precisión y calma.',
    color: '#d1f2eb',
    accent: '#81c784',
    font: "'Nunito', system-ui, sans-serif",
    personality: 'formal',
    bio: 'Un búho bibliotecario que mide cada gramo y cuenta cada minuto. Sus recetas son equilibradas y nutritivas.',
    avatar: '🦉',
    difficulty: 'medio',
    quote: 'La cocina es ciencia aplicada con paciencia.',
  },
  {
    id: 'brisa',
    name: 'Brisa',
    species: 'Ardilla',
    catchphrase: '¡A toda velocidad!',
    color: '#ffe0b2',
    accent: '#ffb74d',
    font: "'Fredoka', 'Nunito', cursive",
    personality: 'energetico',
    bio: 'Una ardilla inquieta que cocina entre saltos y risas. Sus platos son atrevidos, coloridos y llenos de energía.',
    avatar: '🐿️',
    difficulty: 'dificil',
    quote: '¡Si no hay un poco de caos, no es divertido!',
  },
]

export const characterById = (id: CharacterId): Character =>
  characters.find((c) => c.id === id)!
