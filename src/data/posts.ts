export interface Post {
  id: string
  author: string
  avatar: string
  title: string
  content: string
  image: string
  likes: number
  comments: Comment[]
  createdAt: string
}

export interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  createdAt: string
}

export const posts: Post[] = [
  {
    id: 'post-1',
    author: 'Luna',
    avatar: '🐰',
    title: 'Mi primer plato: Galletas de Miel',
    content: '¡Hola bosque! Hoy probé las galletas de Pêche y quedaron riquísimas. Me encantó el toque de avena.',
    image: '🍪',
    likes: 12,
    comments: [
      {
        id: 'c1',
        author: 'Pêche',
        avatar: '🐻',
        content: '¡Me alegra tanto que te hayan gustado! Pruébalas con un té de flores.',
        createdAt: 'hace 2 h',
      },
    ],
    createdAt: 'hace 5 h',
  },
  {
    id: 'post-2',
    author: 'Tilo',
    avatar: '�',
    title: 'Sopa de setas de Noa',
    content: 'Seguí el tutorial de Noa paso a paso. La sopa quedó cremosa y calentita. ¡Perfecto para la tarde!',
    image: '🍄',
    likes: 8,
    comments: [],
    createdAt: 'hace 1 d',
  },
  {
    id: 'post-3',
    author: 'Robi',
    avatar: '🦊',
    title: 'Brochetas arcoíris de Brisa',
    content: 'Brisa tiene razón, el caos es divertido. Quedaron coloridas y sabrosas.',
    image: '🍓',
    likes: 15,
    comments: [
      {
        id: 'c2',
        author: 'Brisa',
        avatar: '🐿️',
        content: '¡A toda velocidad! La próxima prueba la tortilla.',
        createdAt: 'hace 12 h',
      },
    ],
    createdAt: 'hace 1 d',
  },
]
