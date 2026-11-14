import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'recetario:saved-recipes'
const EMPTY: string[] = []

const listeners = new Set<() => void>()
let cache: string[] | null = null

function read(): string[] {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    cache = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
  } catch {
    cache = []
  }
  return cache
}

function write(ids: string[]) {
  cache = ids
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
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

export function useSavedRecipes() {
  const savedIds = useSyncExternalStore(subscribe, read, () => EMPTY)

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds])

  const save = useCallback((id: string) => {
    const current = read()
    if (!current.includes(id)) write([id, ...current])
  }, [])

  const remove = useCallback((id: string) => {
    write(read().filter((x) => x !== id))
  }, [])

  const toggle = useCallback(
    (id: string) => {
      if (read().includes(id)) remove(id)
      else save(id)
    },
    [save, remove],
  )

  return { savedIds, isSaved, save, remove, toggle }
}