import { useEffect, useRef, useState } from 'react'
import { Trash2 } from 'lucide-react'

interface DeletePostButtonProps {
  onConfirm: () => void | Promise<void>
}

export function DeletePostButton({ onConfirm }: DeletePostButtonProps) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [paused, setPaused] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const yesRef = useRef<HTMLButtonElement>(null)
  const restoreFocus = useRef(false)

  // Al entrar en confirmación, el foco va a "Sí"
  useEffect(() => {
    if (confirming) yesRef.current?.focus()
  }, [confirming])

  // Al salir, devuelve el foco al botón de eliminar
  useEffect(() => {
    if (!confirming && restoreFocus.current) {
      restoreFocus.current = false
      triggerRef.current?.focus()
    }
  }, [confirming])

  // Vuelve al estado normal a los 8 segundos, con pausa al interactuar
  useEffect(() => {
    if (!confirming || paused || loading) return
    const t = setTimeout(() => {
      restoreFocus.current = true
      setConfirming(false)
    }, 8000)
    return () => clearTimeout(t)
  }, [confirming, paused, loading])

  // Escape cancela la confirmación
  useEffect(() => {
    if (!confirming) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        restoreFocus.current = true
        setConfirming(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [confirming])

  const cancel = () => {
    restoreFocus.current = true
    setConfirming(false)
    setError(false)
  }

  const handleConfirm = async () => {
    setLoading(true)
    setError(false)
    try {
      await onConfirm()
      setConfirming(false)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <span
      className="inline-flex items-center gap-2 text-xs font-semibold"
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
      }}
    >
      {!confirming ? (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setConfirming(true)}
          aria-label="Eliminar publicación"
          className="inline-flex items-center gap-1.5 text-[#5d4a3a]/50 hover:text-[#8d4a4a] transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Eliminar
        </button>
      ) : (
        <>
          <span className="text-[#8d4a4a]">¿Eliminar?</span>
          <button
            ref={yesRef}
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            aria-label="Confirmar eliminación"
            className="px-2.5 py-0.5 rounded-full bg-[#8d4a4a] text-white hover:bg-[#7a3d3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Eliminando…' : 'Sí'}
          </button>
          <button
            type="button"
            onClick={cancel}
            disabled={loading}
            aria-label="Cancelar eliminación"
            className="px-2.5 py-0.5 rounded-full border border-black/20 text-[#5d4a3a] hover:bg-black/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            No
          </button>
          {error && (
            <span role="alert" className="text-[#8d4a4a]">
              No se pudo eliminar
            </span>
          )}
        </>
      )}
    </span>
  )
}