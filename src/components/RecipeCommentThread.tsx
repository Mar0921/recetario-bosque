import { useState } from 'react'
import { Send } from 'lucide-react'
import {
  MAX_COMMENT_LENGTH,
  formatRelative,
  useRecipeComments,
} from '../lib/recipe-comments'
import { inhabitants } from '../data/inhabitants'
import { DeletePostButton } from './DeletePostButton'

interface RecipeCommentThreadProps {
  recipeId: string
  replies?: { author: string; text: string }[]
}

/**
 * Comentarios de una receta: combina las respuestas de los habitantes
 * (recibidas por `replies`) con los comentarios guardados del usuario,
 * todo bajo una única sección "Comentarios".
 */
export function RecipeCommentThread({ recipeId, replies = [] }: RecipeCommentThreadProps) {
  const { comments, addComment, removeComment } = useRecipeComments()
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const mine = comments.filter((c) => c.recipeId === recipeId)
  const remaining = MAX_COMMENT_LENGTH - text.length

  const submit = () => {
    if (!text.trim()) {
      setError('Escribe algo antes de comentar.')
      return
    }
    const created = addComment(recipeId, text)
    if (!created) {
      setError('No se pudo guardar el comentario.')
      return
    }
    setText('')
    setError(null)
  }

  return (
    <div className="mt-4 pt-4 border-t border-black/20 space-y-3">
      {(replies.length > 0 || mine.length > 0) && (
        <div className="text-[11px] font-bold text-[#5d4a3a] uppercase tracking-wider">
          Comentarios
        </div>
      )}

      {replies.length > 0 && (
        <div className="space-y-2">
          {replies.map((reply, i) => {
            const replyAuthor = inhabitants.find((inh) => inh.name === reply.author)
            return (
              <div
                key={`reply-${i}`}
                className="p-2.5 bg-[#f7f3ea] border border-black/10 rounded-lg text-sm text-[#3e2a20] leading-relaxed flex items-start gap-2"
              >
                {replyAuthor ? (
                  <img
                    src={`/pf/${replyAuthor.id}.jpeg`}
                    alt={reply.author}
                    className="w-8 h-8 rounded-full object-cover shrink-0 border border-black/20"
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-white border border-black/20 flex items-center justify-center text-sm shrink-0">
                    {reply.author.charAt(0)}
                  </span>
                )}
                <div>
                  <span className="font-bold text-[#3e2a20]">{reply.author}:</span> {reply.text}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {mine.length > 0 && (
        <div className="space-y-2">
          {mine.map((c) => (
            <div
              key={c.id}
              className="p-2.5 bg-[#f7f3ea] border border-black/10 rounded-lg text-sm text-[#3e2a20] leading-relaxed flex items-start gap-2"
            >
              <img
                src="/oveja pf.png"
                alt="Tu avatar"
                className="w-8 h-8 rounded-full object-cover shrink-0 border border-black/20"
                draggable={false}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-bold text-[#3e2a20]">Tú:</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#d1f2eb] text-[#1d4a33] border border-black/20">
                    Tuyo
                  </span>
                  <span className="text-xs font-medium text-[#5d4a3a]">{formatRelative(c.createdAt)}</span>
                  <span className="ml-auto">
                    <DeletePostButton
                      label="Eliminar comentario"
                      onConfirm={() => removeComment(c.id)}
                    />
                  </span>
                </div>
                <p className="whitespace-pre-line break-words">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value.slice(0, MAX_COMMENT_LENGTH))
            setError(null)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              submit()
            }
          }}
          placeholder="Escribe un comentario..."
          aria-label="Escribe un comentario sobre esta receta"
          className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-black/30 bg-white text-sm text-[#3e2a20] placeholder:text-[#5d4a3a] focus:outline-none focus:ring-2 focus:ring-[#5d4a3a]/50"
        />
        <button
          type="button"
          onClick={submit}
          className="btn-cute px-4 py-2 text-xs font-bold text-[#3e2a20] inline-flex items-center gap-1.5 shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          Comentar
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 min-h-[1rem]">
        {error ? (
          <p role="alert" className="text-xs font-bold text-[#7a3030]">
            {error}
          </p>
        ) : (
          <span />
        )}
        {remaining < 40 && (
          <span
            className={`text-[11px] font-bold ${
              remaining < 20 ? 'text-[#7a3030]' : 'text-[#5d4a3a]'
            }`}
          >
            {remaining} caracteres restantes
          </span>
        )}
      </div>
    </div>
  )
}