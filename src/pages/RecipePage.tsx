import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ForkKnife, BookOpen, Sparkles, User, Star } from 'lucide-react'
import { recipeById } from '../data/recipes'
import { inhabitants, type Inhabitant } from '../data/inhabitants'

const inhabitantImages: Record<string, string> = {
  lila: '/pf/lila.jpeg',
  renato: '/pf/renato.jpeg',
  rock: '/pf/rock.jpeg',
  tadeo: '/pf/tadeo.jpeg',
}

const staggerDelay = (index: number) => `${Math.min(index * 80, 400)}ms`

export function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showLore, setShowLore] = useState(false)
  const ingredientsRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const [visibleIngredients, setVisibleIngredients] = useState<Set<number>>(new Set())
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index)
            if (index < 100) {
              setVisibleIngredients((prev) => new Set(prev).add(index))
            } else {
              setVisibleSteps((prev) => new Set(prev).add(index - 100))
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    ingredientsRef.current?.querySelectorAll('[data-index]').forEach((el) => observer.observe(el))
    stepsRef.current?.querySelectorAll('[data-index]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

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

  const inhabitant = inhabitants.find((inh: Inhabitant) =>
    Object.values(inh.recipes).includes(recipe.id)
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <nav className="mb-2">
        <Link
          to="/"
          onClick={() => navigate(-1)}
          className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-3 h-3 transition-transform hover:-translate-x-1" />
          Volver
        </Link>
      </nav>

      {/* Recipe header */}
      <section className={`p-8 rounded-3xl shadow-lg transition-all duration-500 hover:shadow-xl ${recipe.difficulty === 'facil' ? 'card-pink' : recipe.difficulty === 'medio' ? 'card-mint' : 'card-cream'}`}>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="text-6xl shrink-0 animate-float">{recipe.image}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className={recipe.difficulty === 'facil' ? 'bg-[#f4c2c2] text-[#8d4a4a]' : recipe.difficulty === 'medio' ? 'bg-[#d1f2eb] text-[#2d6a4f]' : 'bg-[#ffe0b2] text-[#b45309]'} style={{ transitionDelay: staggerDelay(0) }}>
                <span className="w-2 h-2 rounded-full bg-current mr-1.5 animate-pulse" />
                {recipe.difficulty}
              </span>
              <span className="text-xs text-[#5d4a3a]/60">· {recipe.time}</span>
              <span className="text-xs text-[#5d4a3a]/60">· {recipe.serves}</span>
            </div>
            <div className="flex items-start gap-4" style={{ transitionDelay: staggerDelay(1) }}>
              {inhabitant && (
                <img
                  src={inhabitantImages[inhabitant.id]}
                  alt={inhabitant.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white/80 shadow-lg shrink-0"
                />
              )}
              <div className="min-w-0">
                <h1 className={`text-4xl font-bold text-baloon mb-2 animate-slide-up`} style={{ color: inhabitant?.color || '#5d4a3a' }}>
                  {recipe.title}
                </h1>
                <p className="text-[#5d4a3a]/70 italic">Receta de {inhabitant?.name || 'desconocido'}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap" style={{ transitionDelay: staggerDelay(3) }}>
              {recipe.tags.map((tag: string, i: number) => (
                <span key={tag} className="text-[10px] bg-white border border-black/20 px-2 py-0.5 rounded-full text-[#5d4a3a]/70 hover:bg-[#f7f3ea] hover:border-[#5d4a3a]/40 transition-all duration-300 cursor-default" style={{ transitionDelay: staggerDelay(i + 4) }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mt-6" ref={ingredientsRef}>
          <h4 className="flex items-center gap-2 text-[#5d4a3a] font-bold mb-4 text-lg animate-slide-up">
            <ForkKnife className="w-5 h-5 animate-bounce-subtle" />
            Ingredientes
          </h4>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing: string, i: number) => (
              <li
                key={i}
                data-index={i}
                className={`flex items-center gap-5 py-4 transition-all duration-500 ${
                  visibleIngredients.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: staggerDelay(i) }}
              >
                {recipe.ingredientImages?.[ing] && (
                  <img
                    src={recipe.ingredientImages[ing]}
                    alt={ing}
                    className="w-28 h-28 object-cover shrink-0 transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-lg cursor-pointer"
                  />
                )}
                <span className="text-[#e5989b] text-xl animate-bounce-subtle" style={{ animationDelay: `${i * 100}ms` }}>•</span>
                <span className="text-lg">{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="mt-8" ref={stepsRef}>
          <h4 className="flex items-center gap-2 text-[#5d4a3a] font-bold mb-4 text-lg animate-slide-up">
            <BookOpen className="w-5 h-5" />
            Preparación
          </h4>
          <ol className="space-y-4 text-[#5d4a3a]/80 text-base leading-relaxed">
            {recipe.steps.map((step: string, i: number) => (
              <li
                key={i}
                data-index={i + 100}
                className={`flex items-start gap-4 transition-all duration-500 ${
                  visibleSteps.has(i) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: staggerDelay(i + recipe.ingredients.length) }}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-black/20 shrink-0 transition-all duration-300 hover:scale-110 hover:shadow-md ${
                  i % 2 === 0 ? 'bg-[#f4c2c2] text-[#8d4a4a]' : 'bg-[#d1f2eb] text-[#2d6a4f]'
                }`}>
                  {i + 1}
                </span>
                <p className="relative pl-2 border-l-2 border-black/10">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Lore reveal */}
        <div className="mt-6">
          <button
            onClick={() => setShowLore(!showLore)}
            className={`w-full btn-pastel ${recipe.difficulty === 'facil' ? 'btn-pink' : recipe.difficulty === 'medio' ? 'btn-mint' : 'btn-cream'} py-3 text-sm font-bold text-[#5d4a3a] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] hover:shadow-md`}
          >
            {showLore ? (
              <>
                <Star className="w-4 h-4 animate-spin-slow" />
                Ocultar secreto del bosque
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 animate-bounce-subtle" />
                Revelar secreto exclusivo de {inhabitant?.name}
              </>
            )}
          </button>
          {showLore && (
            <div className="mt-4 p-5 bg-[#e6e6fa]/40 border border-[#b19cd9]/40 rounded-xl text-[#5d4a3a] leading-relaxed animate-fade-in-up">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5 animate-float">📖</span>
                <p className="italic">{recipe.lore}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Action bar */}
      <div className="flex gap-3">
        <Link to="/perfil" className="flex-1 btn-cute py-3 text-center text-sm font-bold text-[#5d4a3a] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <User className="w-4 h-4 mr-2" />
          Guardar en mi perfil
        </Link>
        <button className="flex-1 btn-cute py-3 text-center text-sm font-bold text-[#5d4a3a] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg" onClick={() => navigate('/crear-publicacion')}>
          <Sparkles className="w-4 h-4 mr-2 animate-bounce-subtle" />
          Compartir mi plato
        </button>
      </div>
    </div>
  )
}
