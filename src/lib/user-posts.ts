import { useCallback, useSyncExternalStore } from 'react'

export interface UserPost {
  id: string
  title: string
  content: string
  recipeId?: string
  likes: number
  comments: number
  createdAt: number // timestamp en ms
}

const STORAGE_KEY = 'recetario:user-posts'
const EMPTY: UserPost[] = []

const listeners = new Set<() => void>()
let cache: UserPost[] | null = null

function isPost(x: any): x is UserPost {
  return (
    x &&
    typeof x.id === 'string' &&
    typeof x.title === 'string' &&
    typeof x.content === 'string' &&
    typeof x.createdAt === 'number'
  )
}

function read(): UserPost[] {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    cache = Array.isArray(parsed) ? parsed.filter(isPost) : []
  } catch {
    cache = []
  }
  return cache
}

function write(posts: UserPost[]) {
  cache = posts
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
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
    : `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
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

export function useUserPosts() {
  // Siempre la más reciente primero
  const posts = useSyncExternalStore(subscribe, read, () => EMPTY)

  const addPost = useCallback(
    (data: { title: string; content: string; recipeId?: string }) => {
      const post: UserPost = {
        id: newId(),
        title: data.title.trim(),
        content: data.content.trim(),
        recipeId: data.recipeId || undefined,
        likes: 0,
        comments: 0,
        createdAt: Date.now(),
      }
      write([post, ...read()])
      return post
    },
    [],
  )

  const removePost = useCallback((id: string) => {
    write(read().filter((p) => p.id !== id))
  }, [])

  return { posts, addPost, removePost }
}