export interface InhabitantPost {
  id: string
  recipeId: string
  title: string
  content: string
  image: string
  likes: number
  comments: number
  createdAt: string
  replies?: { author: string; text: string }[]
}
