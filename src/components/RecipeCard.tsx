import { Star } from 'lucide-react'
import { cn } from '../lib/utils'
import { inhabitantForRecipe, inhabitantImageById } from '../data/inhabitants'

interface RecipeCardProps {
  recipe: any
  onSelect: (id: string) => void
  unlocked: boolean
}

export function RecipeCard({ recipe, onSelect, unlocked }: RecipeCardProps) {
  const inhabitant = inhabitantForRecipe(recipe.id)

  const cardClasses: Record<string, string> = {
    facil: 'card-pink',
    medio: 'card-mint',
    dificil: 'card-cream',
  }

  const buttonClasses: Record<string, string> = {
    facil: 'btn-pastel btn-pink',
    medio: 'btn-pastel btn-mint',
    dificil: 'btn-pastel btn-cream',
  }

  const difficultyTagClasses: Record<string, string> = {
    facil: 'bg-[#f4c2c2] text-[#8d4a4a] border border-black/20',
    medio: 'bg-[#d1f2eb] text-[#2d6a4f] border border-black/20',
    dificil: 'bg-[#ffe0b2] text-[#b45309] border border-black/20',
  }

  return (
    <article
      onClick={() => onSelect(recipe.id)}
      className={cn(
        'p-6 cursor-pointer hover:translate-y-[-2px] transition-all group flex flex-col',
        cardClasses[recipe.difficulty as keyof typeof cardClasses],
      )}
    >
      {/* Fila superior: personaje + dificultad */}
      <div className="flex items-center justify-between mb-3">
        {inhabitant ? (
          <img
            src={inhabitantImageById(inhabitant.id)}
            alt={inhabitant.name}
            title={`Receta de ${inhabitant.name}`}
            className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md shrink-0"
          />
        ) : (
          <span />
        )}
        <span
          className={cn(
            'text-xs font-bold uppercase px-2 py-1 rounded-full',
            difficultyTagClasses[recipe.difficulty as keyof typeof difficultyTagClasses],
          )}
        >
          {recipe.difficulty}
        </span>
      </div>

      {/* Foto de la receta: completa, sin recuadro, sin recorte */}
      {recipe.photo && (
        <div className="h-44 mb-4 flex items-center justify-center">
          <img
            src={recipe.photo}
            alt={recipe.title}
            draggable={false}
            className="max-w-full max-h-full object-contain select-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)] transition-transform duration-200 group-hover:scale-105"
          />
        </div>
      )}

      <h3 className="text-xl font-bold text-baloon text-[#5d4a3a] mb-1">{recipe.title}</h3>
      <p className="text-xs text-[#5d4a3a]/60 mb-1">
        {recipe.time} · {recipe.serves}
      </p>
      {inhabitant && (
        <p className="text-[11px] text-[#5d4a3a]/70 mb-3 italic">Receta de {inhabitant.name}</p>
      )}

      <div className="flex gap-2 mb-3 flex-wrap">
        {recipe.tags.slice(0, 3).map((tag: string) => (
          <span
            key={tag}
            className="text-[10px] bg-white border border-black/20 px-2 py-0.5 rounded-full text-[#5d4a3a]/70"
          >
            {tag}
          </span>
        ))}
        {recipe.tags.length > 3 && (
          <span className="text-[10px] bg-white border border-black/20 px-2 py-0.5 rounded-full text-[#5d4a3a]/50">
            +{recipe.tags.length - 3}
          </span>
        )}
      </div>

      {/* mt-auto empuja el botón al fondo para que todas las tarjetas queden alineadas */}
      <div className="mt-auto">
        {!unlocked ? (
          <div className="flex items-center gap-2 pt-3 border-t border-black/10">
            <span className="text-xs text-[#5d4a3a]/50 italic">🔒 Secreto del personaje oculto</span>
          </div>
        ) : (
          <button
            className={`w-full ${buttonClasses[recipe.difficulty]} py-2 text-sm font-semibold text-[#5d4a3a] flex items-center justify-center gap-2 mt-2`}
          >
            <Star className="w-4 h-4" />
            Preparar receta
          </button>
        )}
      </div>
    </article>
  )
}