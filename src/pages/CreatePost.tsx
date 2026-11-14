import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'
import { recipes } from '../data/recipes'
import { useUserPosts } from '../lib/user-posts'

const TITLE_MAX = 80
const CONTENT_MAX = 500

export function CreatePost() {
  const navigate = useNavigate()
  const { addPost } = useUserPosts()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [recipeId, setRecipeId] = useState('')

  const canSubmit = title.trim().length > 0 && content.trim().length > 0

  const sortedRecipes = [...(recipes as any[])].sort((a, b) =>
    String(a.title).localeCompare(String(b.title), 'es'),
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    addPost({ title, content, recipeId })
    navigate('/perfil', { state: { tab: 'publicaciones' } })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <nav className="mb-2">
        <Link
          to="/"
          className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2 w-fit"
        >
          <ArrowLeft className="w-3 h-3" />
          Volver al bosque
        </Link>
      </nav>

      <section className="paper-card p-8 border-black/20 text-center">
        <h2 className="text-3xl font-bold text-baloon text-[#5d4a3a] mb-2">Publicar plato</h2>
        <p className="text-[#5d4a3a]/70">
          Cuéntale al bosque cómo te fue. Tu publicación aparecerá en el foro y en tu perfil.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="paper-card p-6 border-black/20 space-y-5">
        {/* Título */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="post-title" className="text-sm font-bold text-[#5d4a3a]">
              Título
            </label>
            <span className="text-[11px] text-[#5d4a3a]/50">
              {title.length}/{TITLE_MAX}
            </span>
          </div>
          <input
            id="post-title"
            type="text"
            value={title}
            maxLength={TITLE_MAX}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Mi primer plato: Galletas de Miel"
            className="w-full px-4 py-2.5 rounded-xl border border-black/20 bg-white text-[#5d4a3a] placeholder:text-[#5d4a3a]/40 focus:outline-none focus:ring-2 focus:ring-[#5d4a3a]/40"
          />
        </div>

        {/* Contenido */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="post-content" className="text-sm font-bold text-[#5d4a3a]">
              ¿Qué quieres contar?
            </label>
            <span className="text-[11px] text-[#5d4a3a]/50">
              {content.length}/{CONTENT_MAX}
            </span>
          </div>
          <textarea
            id="post-content"
            value={content}
            maxLength={CONTENT_MAX}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="¡Quedaron riquísimas! Se las mostré a todos y les encantó..."
            className="w-full px-4 py-2.5 rounded-xl border border-black/20 bg-white text-[#5d4a3a] placeholder:text-[#5d4a3a]/40 leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-[#5d4a3a]/40"
          />
        </div>

        {/* Receta relacionada (opcional) */}
        <div>
          <label htmlFor="post-recipe" className="block text-sm font-bold text-[#5d4a3a] mb-1.5">
            Receta relacionada <span className="font-normal text-[#5d4a3a]/50">(opcional)</span>
          </label>
          <select
            id="post-recipe"
            value={recipeId}
            onChange={(e) => setRecipeId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-black/20 bg-white text-[#5d4a3a] focus:outline-none focus:ring-2 focus:ring-[#5d4a3a]/40"
          >
            <option value="">Ninguna</option>
            {sortedRecipes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
          <Link
            to="/"
            className="sm:w-32 text-center px-5 py-3 rounded-full border border-black/20 text-sm font-bold text-[#5d4a3a] hover:bg-black/5 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex-1 btn-cute py-3 text-sm font-bold text-[#5d4a3a] inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
            Publicar
          </button>
        </div>
      </form>
    </div>
  )
}