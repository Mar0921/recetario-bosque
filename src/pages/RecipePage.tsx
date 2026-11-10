import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ForkKnife, BookOpen, Sparkles, User, Star } from 'lucide-react'
import { recipeById } from '../data/recipes'
import { characters } from '../data/characters'

export function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showLore, setShowLore] = useState(false)

  const recipe = recipeById(id || '')
  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f3ea]">
        <div className="paper-card p-8 text-center border-black/20">
          <h2 className="text-2xl font-bold text-baloon text-[#5d4a3a]">Receta no encontrada</h2>
          <Link to="/" className="btn-cute px-5 py-2 mt-4 inline-block text-sm font-bold text-[#5d4a3a]">
            Volver al bosque
          </Link>
        </div>
      </div>
    )
  }

  const character = characters.find((c: { id: string; color: string; name: string }) => c.id === recipe.characterId)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <nav className="mb-2">
        <Link
          to="/"
          onClick={() => navigate(-1)}
          className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2"
        >
          <ArrowLeft className="w-3 h-3" />
          Volver
        </Link>
      </nav>

      {/* Recipe header */}
      <section className={`p-8 rounded-3xl shadow-lg ${recipe.difficulty === 'facil' ? 'card-pink' : recipe.difficulty === 'medio' ? 'card-mint' : 'card-cream'}`}>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="text-6xl shrink-0">{recipe.image}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className={recipe.difficulty === 'facil' ? 'bg-[#f4c2c2] text-[#8d4a4a]' : recipe.difficulty === 'medio' ? 'bg-[#d1f2eb] text-[#2d6a4f]' : 'bg-[#ffe0b2] text-[#b45309]'}>
                <span className="w-2 h-2 rounded-full bg-current mr-1.5" />
                {recipe.difficulty}
              </span>
              <span className="text-xs text-[#5d4a3a]/60">· {recipe.time}</span>
              <span className="text-xs text-[#5d4a3a]/60">· {recipe.serves}</span>
            </div>
            <h1 className={`text-4xl font-bold text-baloon mb-2`} style={{ color: character?.color || '#5d4a3a' }}>
              {recipe.title}
            </h1>
            <p className="text-[#5d4a3a]/70 italic">Receta de {character?.name || 'desconocido'}</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              {recipe.tags.map((tag: string) => (
                <span key={tag} className="text-[10px] bg-white border border-black/20 px-2 py-0.5 rounded-full text-[#5d4a3a]/70">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl border border-black/20 ${recipe.difficulty === 'facil' ? 'bg-[#f4c2c2]/30' : recipe.difficulty === 'medio' ? 'bg-[#d1f2eb]/30' : 'bg-[#ffe0b2]/30'}">
            <h4 className="flex items-center gap-2 text-[#5d4a3a] font-bold mb-3">
              <ForkKnife className="w-4 h-4" />
              Ingredientes
            </h4>
            <ul className="space-y-2 text-[#5d4a3a]/80 text-sm">
              {recipe.ingredients.map((ing: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#e5989b]">•</span>
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="p-4 rounded-xl border border-black/20 ${recipe.difficulty === 'facil' ? 'bg-[#f4c2c2]/30' : recipe.difficulty === 'medio' ? 'bg-[#d1f2eb]/30' : 'bg-[#ffe0b2]/30'}">
            <h4 className="flex items-center gap-2 text-[#5d4a3a] font-bold mb-3">
              <BookOpen className="w-4 h-4" />
              Preparación
            </h4>
            <ol className="space-y-3 text-[#5d4a3a]/80 text-sm">
              {recipe.steps.map((step: string, i: number) => (
                <li key={i} className="flex items-start gap-3 leading-relaxed">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-black/20 shrink-0 ${
                    i % 2 === 0 ? 'bg-[#f4c2c2] text-[#8d4a4a]' : 'bg-[#d1f2eb] text-[#2d6a4f]'
                  }`}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Lore reveal */}
        <div className="mt-6">
          <button
            onClick={() => setShowLore(!showLore)}
            className={`w-full btn-pastel ${recipe.difficulty === 'facil' ? 'btn-pink' : recipe.difficulty === 'medio' ? 'btn-mint' : 'btn-cream'} py-3 text-sm font-bold text-[#5d4a3a] flex items-center justify-center gap-2`}
          >
            {showLore ? (
              <>
                <Star className="w-4 h-4" />
                Ocultar secreto del bosque
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Revelar secreto exclusivo de {character?.name}
              </>
            )}
          </button>
          {showLore && (
            <div className="mt-4 p-5 bg-[#e6e6fa]/40 border border-[#b19cd9]/40 rounded-xl text-[#5d4a3a] leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5">📖</span>
                <p className="italic">{recipe.lore}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Action bar */}
      <div className="flex gap-3">
        <Link to="/perfil" className="flex-1 btn-cute py-3 text-center text-sm font-bold text-[#5d4a3a]">
          <User className="w-4 h-4 mr-2" />
          Guardar en mi perfil
        </Link>
        <button className="flex-1 btn-cute py-3 text-center text-sm font-bold text-[#5d4a3a]" onClick={() => navigate('/crear-publicacion')}>
          <Sparkles className="w-4 h-4 mr-2" />
          Compartir mi plato
        </button>
      </div>
    </div>
  )
}
