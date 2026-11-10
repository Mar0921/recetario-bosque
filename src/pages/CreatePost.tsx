import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'

export function CreatePost() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('🍽️')

  const emojis = ['🍪', '🍓', '🍄', '🥗', '🥚', '🫐', '🍞', '🍽️']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <nav className="mb-6">
        <Link to="/" className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2">
          <ArrowLeft className="w-3 h-3" />
          Volver al bosque
        </Link>
      </nav>

      <section className="paper-card p-8 border-black/20">
        <h2 className="text-2xl font-bold text-baloon text-[#5d4a3a] mb-6">
          Comparte tu plato con el bosque
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-[#5d4a3a] mb-2">Título de tu publicación</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Mis galletas de miel favoritas"
              className="w-full border border-black/20 px-4 py-3 rounded-xl text-[#5d4a3a] focus:outline-none focus:ring-2 focus:ring-[#e5989b] text-baloon"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#5d4a3a] mb-2">¿Qué cocinaste?</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="Cuenta tu experiencia preparando la receta..."
              className="w-full border border-black/20 px-4 py-3 rounded-xl text-[#5d4a3a] focus:outline-none focus:ring-2 focus:ring-[#e5989b] text-baloon"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#5d4a3a] mb-2">Imagen del plato</label>
            <div className="flex gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setImage(emoji)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl border ${
                    image === emoji ? 'border-[#5d4a3a] bg-[#f7f3ea]' : 'border-black/20 bg-white hover:bg-[#f7f3ea]'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#5d4a3a]/50 mt-1">Seleccionado: {image}</p>
          </div>

          <button
            type="submit"
            className="w-full btn-cute py-4 text-lg font-bold text-[#5d4a3a] flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Publicar en el foro
          </button>
        </form>
      </section>
    </div>
  )
}
