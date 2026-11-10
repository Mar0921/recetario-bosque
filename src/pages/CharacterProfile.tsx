import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { characterById, recipesByCharacter } from '../data/recipes'
import { RecipeCard } from '../components/RecipeCard'

export function CharacterProfile() {
  const { id } = useParams<{ id: string }>()
  const character = characterById(id as 'peche' | 'noa' | 'brisa')

  const characterRecipes = recipesByCharacter(id as 'peche' | 'noa' | 'brisa')

  const difficultyOrder: Record<string, number> = { facil: 0, medio: 1, dificil: 2 }
  const sortedRecipes = [...characterRecipes].sort(
    (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <nav className="mb-2">
        <Link to="/" className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2">
          <ArrowLeft className="w-3 h-3" />
          Volver al bosque
        </Link>
      </nav>

      {/* Character header */}
      <section className={`p-8 text-center rounded-3xl shadow-lg ${character.color === '#f4c2c2' ? 'card-pink' : character.color === '#d1f2eb' ? 'card-mint' : 'card-peach'}`} style={{ borderColor: character.accent }}>
        <div className="text-6xl mb-4">{character.avatar}</div>
        <h2 className={`text-4xl font-bold text-baloon mb-1`} style={{ color: character.color }}>
          {character.name}
        </h2>
        <p className="text-lg font-semibold text-[#5d4a3a] mb-2">{character.species}</p>
        <p className="text-sm text-[#5d4a3a]/70 italic mb-4">"{character.catchphrase}"</p>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/20 bg-white text-xs font-bold text-[#5d4a3a]">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: character.accent }} />
          {character.personality}
        </div>
        <p className="mt-4 text-[#5d4a3a]/80 leading-relaxed max-w-md mx-auto">{character.bio}</p>
      </section>

      {/* Recipes by difficulty */}
      <section className="paper-card p-6 border-black/20">
        <h3 className="text-2xl font-bold text-baloon text-[#5d4a3a] mb-6">
          Recetas de {character.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sortedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={(id) => (window.location.href = `/receta/${id}`)}
              unlocked={true}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
