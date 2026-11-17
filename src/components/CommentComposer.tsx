import { useState } from 'react'
import { Send } from 'lucide-react'
import { recipes } from '../data/recipes'
import { MAX_COMMENT_LENGTH, useRecipeComments } from '../lib/recipe-comments'

interface CommentComposerProps {
  /** Si se pasa, el comentario va fijo a esa receta (sin selector) */
  recipeId?: string
  onSubmitted?: () => void
}

export function CommentComposer({ recipeId, onSubmitted }: CommentComposerProps) {
  const { addComment } = useRecipeComments()
  const [selected, setSelected] = useState<string>(recipeId ?? '')
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const targetId = recipeId ?? selected
  const remaining = MAX_COMMENT_LENGTH - text.length

  const submit = () => {
    if (!targetId) {
      setError('Elige la receta que quieres comentar.')
      return
    }
    if (!text.trim()) {
      setError('Escribe algo antes de comentar.')
      return
    }
    const created = addComment(targetId, text)
    if (!created) {
      setError('No se pudo guardar el comentario.')
      return
    }
    setText('')
    setError(null)
    onSubmitted?.()
  }

  return (
    <div className="p-4 rounded-2xl bg-[#f7f3ea] border border-black/10 space-y-3">
      {!recipeId && (
        <div>
          <label htmlFor="comment-recipe" className="block text-xs font-bold text-[#5d4a3a] mb-1">
            Receta
          </label>
          <select
            id="comment-recipe"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value)
              setError(null)
            }}
            className="w-full px-3 py-2 rounded-xl border border-black/20 bg-white text-sm text-[#5d4a3a] focus:outline-none focus:ring-2 focus:ring-[#5d4a3a]/40"
          >
            <option value="">Elige una receta…</option>
            {recipes.map((r: any) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="comment-text" className="block text-xs font-bold text-[#5d4a3a] mb-1">
          Tu comentario
        </label>
        <textarea
          id="comment-text"
          value={text}
          onChange={(e) => {
            setText(e.target.value.slice(0, MAX_COMMENT_LENGTH))
            setError(null)
          }}
          rows={3}
          placeholder="¿Qué te pareció esta receta?"
          className="w-full px-3 py-2 rounded-xl border border-black/20 bg-white text-sm text-[#5d4a3a] resize-none focus:outline-none focus:ring-2 focus:ring-[#5d4a3a]/40"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <span
          className={`text-[11px] font-semibold ${
            remaining < 20 ? 'text-[#8d4a4a]' : 'text-[#5d4a3a]/50'
          }`}
        >
          {remaining} caracteres restantes
        </span>
        <button
          type="button"
          onClick={submit}
          className="btn-cute px-4 py-2 text-xs font-bold text-[#5d4a3a] inline-flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          Comentar
        </button>
      </div>

      {error && (
        <p role="alert" className="text-xs font-semibold text-[#8d4a4a]">
          {error}
        </p>
      )}
    </div>
  )
}