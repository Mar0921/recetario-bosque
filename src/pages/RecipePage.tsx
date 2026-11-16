import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ForkKnife,
  BookOpen,
  Sparkles,
  Star,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react'
import { recipeById } from '../data/recipes'
import { inhabitantImageById, inhabitantForRecipe } from '../data/inhabitants'
import { useSavedRecipes } from '../lib/saved-recipes'

const recipeStepFolders: Record<string, string> = {
  'tarta-bayas': 'Tarta_de_bayas',
  'batido-tarta-limon': 'batido_tarta_de_limon',
  'club-sandwich-vegetales': 'club_sandwich_de_vegetales',
  'ensalada-papas-hierbas': 'Ensalada_cremosa_de_papas_con_hierbas',
  'gelatina-fresas-crema': 'gelatina_de_fresas_con_crema',
  'lasagna-picante': 'lasaña picante',
  'risotto-quinua-champinones': 'Risotto de Quinua y Champiñones',
  'pollo-naranja': 'pollo a la naranja',
  'empanadas-res-papas': 'Empanadas de Res y Papas',
  'volovanes-natilla-coco-chocolate': 'Volovánes de Natilla de Coco y Chocolate',
  'timbal-quinua-pollo': 'timbal de quinua con pollo',
  'tamales-carne-mole': 'Tamales de Carne Deshebrada con Salsa de Mole',
}

const staggerDelay = (index: number) => `${Math.min(index * 80, 400)}ms`

export function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isSaved, toggle } = useSavedRecipes()
  const [showLore, setShowLore] = useState(false)
  const ingredientsRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const [visibleIngredients, setVisibleIngredients] = useState<Set<number>>(new Set())
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())

  useEffect(() => {
    // Al cambiar de receta, reinicia las animaciones de entrada
    setVisibleIngredients(new Set())
    setVisibleSteps(new Set())

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
      { threshold: 0.1, rootMargin: '50px' },
    )

    ingredientsRef.current?.querySelectorAll('[data-index]').forEach((el) => observer.observe(el))
    stepsRef.current?.querySelectorAll('[data-index]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [id])

  const goBack = () => {
    // Si se entró directo a la receta, no hay historial al que volver
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

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

  const inhabitant = inhabitantForRecipe(recipe.id)
  const saved = isSaved(recipe.id)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <nav className="mb-2">
        <button
          type="button"
          onClick={goBack}
          className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2 transition-colors group/back"
        >
          <ArrowLeft className="w-3 h-3 transition-transform group-hover/back:-translate-x-1" />
          Volver
        </button>
      </nav>

      {/* Recipe header */}
      <section
        className={`p-8 rounded-3xl shadow-lg transition-all duration-500 hover:shadow-xl ${
          recipe.difficulty === 'facil'
            ? 'card-pink'
            : recipe.difficulty === 'medio'
              ? 'card-mint'
              : 'card-cream'
        }`}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={recipe.photo}
            alt={recipe.title}
            className="max-w-[200px] max-h-[200px] w-auto h-auto object-contain shrink-0 self-center animate-float"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className={`inline-flex items-center text-xs font-bold uppercase px-2.5 py-1 rounded-full border border-black/20 ${
                  recipe.difficulty === 'facil'
                    ? 'bg-[#f4c2c2] text-[#8d4a4a]'
                    : recipe.difficulty === 'medio'
                      ? 'bg-[#d1f2eb] text-[#2d6a4f]'
                      : 'bg-[#ffe0b2] text-[#b45309]'
                }`}
                style={{ transitionDelay: staggerDelay(0) }}
              >
                <span className="w-2 h-2 rounded-full bg-current mr-1.5 animate-pulse" />
                {recipe.difficulty}
              </span>
              <span className="text-xs text-[#5d4a3a]/60">· {recipe.time}</span>
              <span className="text-xs text-[#5d4a3a]/60">· {recipe.serves}</span>
            </div>

            <div className="flex items-start gap-4" style={{ transitionDelay: staggerDelay(1) }}>
              {inhabitant && (
                <Link
                  to={`/habitante/${inhabitant.id}`}
                  title={`Ver perfil de ${inhabitant.name}`}
                  className="shrink-0 transition-transform hover:scale-105"
                >
                  <img
                    src={inhabitantImageById(inhabitant.id)}
                    alt={inhabitant.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white/80 shadow-lg"
                  />
                </Link>
              )}
              <div className="min-w-0">
                <h1
                  className="text-4xl font-bold text-baloon mb-2 animate-slide-up"
                  style={{ color: inhabitant?.color || '#5d4a3a' }}
                >
                  {recipe.title}
                </h1>
                <p className="text-[#5d4a3a]/70 italic">
                  Receta de {inhabitant?.name || 'desconocido'}
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2 flex-wrap" style={{ transitionDelay: staggerDelay(3) }}>
              {recipe.tags.map((tag: string, i: number) => (
                <span
                  key={tag}
                  className="text-[10px] bg-white border border-black/20 px-2 py-0.5 rounded-full text-[#5d4a3a]/70 hover:bg-[#f7f3ea] hover:border-[#5d4a3a]/40 transition-all duration-300 cursor-default"
                  style={{ transitionDelay: staggerDelay(i + 4) }}
                >
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
                    className="w-28 h-28 object-contain shrink-0 transition-all duration-300 hover:scale-105 hover:rotate-1 drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)] cursor-pointer"
                  />
                )}
                <span
                  className="text-[#e5989b] text-xl animate-bounce-subtle"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  •
                </span>
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
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-black/20 shrink-0 transition-all duration-300 hover:scale-110 hover:shadow-md ${
                    i % 2 === 0 ? 'bg-[#f4c2c2] text-[#8d4a4a]' : 'bg-[#d1f2eb] text-[#2d6a4f]'
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="relative pl-2 border-l-2 border-black/10">{step}</p>
                  {recipeStepFolders[recipe.id] && (
                    <img
                      src={encodeURI(`/Recetas/${recipeStepFolders[recipe.id]}/paso_${i + 1}.jpg`)}
                      alt={`Paso ${i + 1}`}
                      className="mt-3 w-full h-auto object-contain mx-auto"
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Lore reveal */}
        <div className="mt-6">
          <button
            onClick={() => setShowLore(!showLore)}
            className={`w-full btn-pastel ${
              recipe.difficulty === 'facil'
                ? 'btn-pink'
                : recipe.difficulty === 'medio'
                  ? 'btn-mint'
                  : 'btn-cream'
            } py-3 text-sm font-bold text-[#5d4a3a] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] hover:shadow-md`}
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
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => toggle(recipe.id)}
            aria-pressed={saved}
            title={saved ? 'Quitar de mi perfil' : 'Guardar en mi perfil'}
            className={`flex-1 btn-cute py-3 text-center text-sm font-bold text-[#5d4a3a] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg inline-flex items-center justify-center gap-2 ${
              saved ? 'ring-2 ring-[#5d4a3a]/50' : ''
            }`}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            {saved ? 'Guardada en mi perfil' : 'Guardar en mi perfil'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/crear-publicacion')}
            className="flex-1 btn-cute py-3 text-center text-sm font-bold text-[#5d4a3a] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg inline-flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 animate-bounce-subtle" />
            Compartir mi plato
          </button>
        </div>

        {saved && (
          <p className="text-center text-xs text-[#5d4a3a]/70">
            ¡Listo! Esta receta ya está en tu perfil.{' '}
            <Link to="/perfil" className="font-bold text-[#8d4a4a] hover:underline">
              Ver mi perfil →
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}