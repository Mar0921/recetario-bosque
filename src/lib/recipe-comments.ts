import { useCallback, useSyncExternalStore } from 'react'
import { recipeById } from '../data/recipes'

export interface RecipeComment {
  id: string
  recipeId: string
  text: string
  createdAt: number // timestamp en ms
}

export const MAX_COMMENT_LENGTH = 280

const STORAGE_KEY = 'recetario:recipe-comments'
const EMPTY: RecipeComment[] = []

const listeners = new Set<() => void>()
let cache: RecipeComment[] | null = null

function isComment(x: any): x is RecipeComment {
  return (
    x &&
    typeof x.id === 'string' &&
    typeof x.recipeId === 'string' &&
    typeof x.text === 'string' &&
    typeof x.createdAt === 'number'
  )
}

function read(): RecipeComment[] {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    cache = Array.isArray(parsed) ? parsed.filter(isComment) : []
  } catch {
    cache = []
  }
  return cache
}

function write(comments: RecipeComment[]) {
  cache = comments
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
  } catch {
    // Si el almacenamiento no está disponible, igual funciona durante la sesión
  }
  listeners.forEach((l) => l())
}

function subscribe(callback: () => void) {
  listeners.add(callback)

  // Mantiene sincronizadas otras pestañas del navegador
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null
      callback()
    }
  }
  window.addEventListener('storage', onStorage)

  return () => {
    listeners.delete(callback)
    window.removeEventListener('storage', onStorage)
  }
}

function newId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

/** "justo ahora", "hace 5 min", "hace 3 h", "hace 2 d" */
export function formatRelative(ts: number): string {
  const min = Math.floor(Math.max(0, Date.now() - ts) / 60000)
  if (min < 1) return 'justo ahora'
  if (min < 60) return `hace ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `hace ${h} h`
  return `hace ${Math.floor(h / 24)} d`
}

export function useRecipeComments() {
  // Siempre el más reciente primero
  const comments = useSyncExternalStore(subscribe, read, () => EMPTY)

  /**
   * Solo permite comentar recetas que ya existen.
   * Devuelve el comentario creado o null si no es válido.
   */
  const addComment = useCallback((recipeId: string, text: string): RecipeComment | null => {
    const clean = text.trim()
    if (!clean || clean.length > MAX_COMMENT_LENGTH) return null
    if (!recipeById(recipeId)) return null

    const comment: RecipeComment = {
      id: newId(),
      recipeId,
      text: clean,
      createdAt: Date.now(),
    }
    write([comment, ...read()])
    return comment
  }, [])

  const removeComment = useCallback((id: string) => {
    write(read().filter((c) => c.id !== id))
  }, [])

  return { comments, addComment, removeComment }
}