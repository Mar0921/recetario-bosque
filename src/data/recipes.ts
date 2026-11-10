import type { CharacterId } from './characters'
import { characters, characterById } from './characters'

export { characters, characterById }

export type Difficulty = 'facil' | 'medio' | 'dificil'

export interface Recipe {
  id: string
  characterId: CharacterId
  title: string
  difficulty: Difficulty
  time: string
  serves: string
  tags: string[]
  ingredients: string[]
  steps: string[]
  lore: string
  loreUnlocked: boolean
  image: string
}

export const recipes: Recipe[] = [
  {
    id: 'galletas-miel',
    characterId: 'peche',
    title: 'Galletas de Miel y Avena',
    difficulty: 'facil',
    time: '25 min',
    serves: '6 unidades',
    tags: ['postre', 'dulce', 'facil'],
    ingredients: ['200 g harina', '100 g mantequilla', '80 g miel', '1 huevo', '1 cucharadita de avena'],
    steps: [
      'Mezcla la harina con la mantequilla hasta formar arena.',
      'Añade la miel y el huevo, amasa suavemente.',
      'Incorpora la avena y forma bolitas.',
      'Hornea a 180°C durante 12 minutos.',
      'Déjalas enfriar y espolvorea canela.',
    ],
    lore:
      'Pêche guarda una receta secreta de su abuela: añadir una pizca de lavanda seca a la masa hace que quien las pruebe recuerde su sueño más feliz.',
    loreUnlocked: false,
    image: '🍪',
  },
  {
    id: 'te-flores',
    characterId: 'peche',
    title: 'Té de Flores del Bosque',
    difficulty: 'facil',
    time: '10 min',
    serves: '2 tazas',
    tags: ['bebida', 'calmante', 'facil'],
    ingredients: ['1 taza agua caliente', '2 cucharaditas flores secas', '1 cucharada miel', 'rodaja de limón'],
    steps: [
      'Calienta el agua sin que hierva del todo.',
      'Añade las flores secas y deja reposar 5 min.',
      'Endulza con miel al gusto.',
      'Sirve con una rodaja de limón.',
    ],
    lore:
      'Las flores que usa Pêche crecen solo bajo la luna llena, cerca del roble viejo del claro del bosque.',
    loreUnlocked: false,
    image: '🌸',
  },
  {
    id: 'tarta-frutilla',
    characterId: 'peche',
    title: 'Mini Tarta de Frutilla',
    difficulty: 'facil',
    time: '40 min',
    serves: '4 porciones',
    tags: ['postre', 'fruta', 'facil'],
    ingredients: ['1 base de hojaldre', '200 g frutillas', '150 g crema pastelera', '1 huevo para barnizar'],
    steps: [
      'Estira la base de hojaldre en un molde.',
      'Rellena con crema pastelera.',
      'Decora con frutillas cortadas.',
      'Barniza los bordes con huevo.',
      'Hornea a 200°C durante 20 minutos.',
    ],
    lore:
      'Pêche cultiva sus propias frutillas en un invernadero escondido detrás de la cascada.',
    loreUnlocked: false,
    image: '🍓',
  },
  {
    id: 'ensalada-nido',
    characterId: 'noa',
    title: 'Ensalada Nido de Búho',
    difficulty: 'medio',
    time: '35 min',
    serves: '2 porciones',
    tags: ['ensalada', 'vegetariana', 'medio'],
    ingredients: ['50 g espinaca baby', '1 aguacate', '50 g nueces', 'queso feta', 'vinagreta de mostaza'],
    steps: [
      'Lava y seca bien la espinaca.',
      'Corta el aguacate en láminas finas.',
      'Tuesta ligeramente las nueces.',
      'Mezcla todo con la vinagreta.',
      'Espolvorea queso feta desmenuzado.',
    ],
    lore:
      'Noa aprende el nombre de cada planta del bosque y anota sus propiedades en un cuaderno de cuero gastado.',
    loreUnlocked: false,
    image: '🥗',
  },
  {
    id: 'sopa-setas',
    characterId: 'noa',
    title: 'Sopa Cremosa de Setas',
    difficulty: 'medio',
    time: '45 min',
    serves: '4 porciones',
    tags: ['sopa', 'caliente', 'medio'],
    ingredients: ['300 g setas variadas', '1 cebolla', '2 papas', '500 ml caldo vegetal', '100 ml crema de leche'],
    steps: [
      'Pica la cebolla y sofríe en aceite.',
      'Añade las setas troceadas y cocina.',
      'Incorpora las papas y el caldo.',
      'Cocina 20 min y tritura todo.',
      'Añade la crema y sirve caliente.',
    ],
    lore:
      'Solo las setas que crecen al norte del bosque son aptas para esta sopa; Noa las identifica por el color de sus sombrillas.',
    loreUnlocked: false,
    image: '🍄',
  },
  {
    id: 'pan-ave',
    characterId: 'noa',
    title: 'Pan Integral de Avena',
    difficulty: 'medio',
    time: '90 min',
    serves: '1 pan',
    tags: ['pan', 'horneado', 'medio'],
    ingredients: ['500 g harina integral', '200 g avena', '1 sobre levadura', '300 ml agua tibia', '1 cucharada sal'],
    steps: [
      'Mezcla harina, avena y sal en un bol.',
      'Disuelve la levadura en agua tibia.',
      'Amasa hasta obtener una masa elástica.',
      'Deja levar 1 hora en lugar cálido.',
      'Hornea a 220°C durante 35 minutos.',
    ],
    lore:
      'Noa mide la temperatura del agua con un termómetro de mercurio antes de disolver la levadura.',
    loreUnlocked: false,
    image: '🍞',
  },
  {
    id: 'brochetas-frutas',
    characterId: 'brisa',
    title: 'Brochetas de Fruta Arcoíris',
    difficulty: 'dificil',
    time: '30 min',
    serves: '4 brochetas',
    tags: ['fruta', 'divertido', 'dificil'],
    ingredients: ['fresas', 'uvas', 'piña', 'melón', 'kiwi', 'palitos de brocheta'],
    steps: [
      'Lava y corta toda la fruta en cubos.',
      'Ensarta los colores en orden: rojo, naranja, amarillo, verde, violeta.',
      'Riega con un poco de miel.',
      'Sirve frío.',
    ],
    lore:
      'Brisa corta la fruta con forma de estrella para que el viento del bosque pueda pasar por las brochetas.',
    loreUnlocked: false,
    image: '🍓',
  },
  {
    id: 'tortilla-bosque',
    characterId: 'brisa',
    title: 'Tortilla del Bosque',
    difficulty: 'dificil',
    time: '40 min',
    serves: '4 porciones',
    tags: ['huevo', 'sabroso', 'dificil'],
    ingredients: ['6 huevos', '3 papas', '1 cebolla', 'aceite de oliva', 'sal y pimienta'],
    steps: [
      'Pica papas y cebolla en cubos pequeños.',
      'Sofríe todo en aceite hasta dorar.',
      'Bate los huevos y mezcla con las verduras.',
      'Cocina la tortilla por ambos lados.',
      'Voltea con un plato y sirve.',
    ],
    lore:
      'Brisa le pone nombre a cada huevo antes de romperlo y le pide permiso al bosque.',
    loreUnlocked: false,
    image: '🥚',
  },
  {
    id: 'mousse-mora',
    characterId: 'brisa',
    title: 'Mousse de Mora Salvaje',
    difficulty: 'dificil',
    time: '60 min',
    serves: '4 vasitos',
    tags: ['postre', 'fruta', 'dificil'],
    ingredients: ['200 g moras', '200 ml crema de leche', '3 claras de huevo', '50 g azúcar', 'gelatina'],
    steps: [
      'Hidrata la gelatina en agua fría.',
      'Tritura las moras y cuela las semillas.',
      'Monta las claras a punto de nieve.',
      'Mezcla todo con movimientos envolventes.',
      'Refrigera al menos 2 horas.',
    ],
    lore:
      'Las moras más dulces crecen al pie del sauz llorón, donde Brisa tiene su escondite secreto.',
    loreUnlocked: false,
    image: '🫐',
  },
]

export const recipesByCharacter = (characterId: CharacterId): Recipe[] =>
  recipes.filter((r) => r.characterId === characterId)

export const recipeById = (id: string): Recipe | undefined => recipes.find((r) => r.id === id)

export const recipesByDifficulty = (difficulty: Difficulty): Recipe[] =>
  recipes.filter((r) => r.difficulty === difficulty)
