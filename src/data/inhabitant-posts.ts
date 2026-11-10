import type { InhabitantPost } from '../types/inhabitant'

export const inhabitantPosts: Record<string, InhabitantPost[]> = {
  peche: [
    {
      id: 'p-peche-1',
      title: 'Galletas de miel para el desayuno',
      content: 'Hice galletas con miel del bosque y avena. Quedaron crujientes por fuera y suaves por dentro. ¡Ideales para acompañar el té!',
      image: '🍪',
      likes: 14,
      comments: 3,
      createdAt: 'hace 2 d',
    },
    {
      id: 'p-peche-2',
      title: 'Té de flores bajo la luna',
      content: 'Recolecté flores bajo la luna llena. El té queda calmante y huele a bosque encantado.',
      image: '🌸',
      likes: 9,
      comments: 2,
      createdAt: 'hace 5 d',
    },
  ],
  noa: [
    {
      id: 'p-noa-1',
      title: 'Sopa cremosa de setas',
      content: 'Seguí mi propia receta paso a paso. La sopa quedó perfecta para una tarde lluviosa en el bosque.',
      image: '🍄',
      likes: 11,
      comments: 1,
      createdAt: 'hace 1 d',
    },
    {
      id: 'p-noa-2',
      title: 'Pan integral de avena',
      content: 'Midé cada gramo con cuidado. El pan quedó esponjoso y con una corteza dorada.',
      image: '🍞',
      likes: 7,
      comments: 0,
      createdAt: 'hace 3 d',
    },
  ],
  brisa: [
    {
      id: 'p-brisa-1',
      title: 'Brochetas arcoíris locas',
      content: 'Corté la fruta en estrellas y la ensarté en orden arcoíris. ¡El viento del bosque pasa por las brochetas!',
      image: '🍓',
      likes: 16,
      comments: 4,
      createdAt: 'hace 6 h',
    },
    {
      id: 'p-brisa-2',
      title: 'Mousse de mora salvaje',
      content: 'Las moras más dulces crecen al pie del sauz llorón. Este mousse lleva ese secreto.',
      image: '🫐',
      likes: 13,
      comments: 2,
      createdAt: 'hace 2 d',
    },
  ],
  luna: [
    {
      id: 'p-luna-1',
      title: 'Mi primer plato: Galletas de Pêche',
      content: 'Probé las galletas de Pêche y me encantaron. Le pedí la receta y me la dio con una sonrisa.',
      image: '🍪',
      likes: 12,
      comments: 1,
      createdAt: 'hace 5 h',
    },
  ],
  tilo: [
    {
      id: 'p-tilo-1',
      title: 'Sopa de setas de Noa',
      content: 'Seguí el tutorial de Noa. Quedó cremosa y calentita. Perfecta para el atardecer.',
      image: '🍄',
      likes: 8,
      comments: 0,
      createdAt: 'hace 1 d',
    },
  ],
  robi: [
    {
      id: 'p-robi-1',
      title: 'Brochetas arcoíris de Brisa',
      content: 'Brisa tiene razón, el caos es divertido. Las brochetas quedaron coloridas y sabrosas.',
      image: '🍓',
      likes: 15,
      comments: 1,
      createdAt: 'hace 1 d',
    },
  ],
}
