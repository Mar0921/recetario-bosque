import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MessageSquare } from 'lucide-react'
import { characterById, recipesByCharacter } from '../data/recipes'
import { RecipeCard } from '../components/RecipeCard'
import { DeletePostButton } from '../components/DeletePostButton'
import { useRecipeComments, formatRelative } from '../lib/recipe-comments'

export function CharacterProfile() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const character = characterById(id as 'peche' | 'noa' | 'brisa')
  const { comments, removeComment } = useRecipeComments()

  const characterRecipes = recipesByCharacter(id as 'peche' | 'noa' | 'brisa')

  const difficultyOrder: Record<string, number> = { facil: 0, medio: 1, dificil: 2 }
  const sortedRecipes = [...characterRecipes].sort(
    (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty],
  )

  // Comentarios hechos a las recetas de este habitante (más reciente primero)
  const recipeTitleById = new Map<string, string>(
    characterRecipes.map((r: any) => [r.id, r.title]),
  )
  const characterComments = comments.filter((c) => recipeTitleById.has(c.recipeId))

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <nav className="mb-2">
        <Link to="/" className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2">
          <ArrowLeft className="w-3 h-3" />
          Volver al bosque
        </Link>
      </nav>

      {/* Character header */}
      <section
        className={`p-8 text-center rounded-3xl shadow-lg ${
          character.color === '#f4c2c2'
            ? 'card-pink'
            : character.color === '#d1f2eb'
              ? 'card-mint'
              : 'card-peach'
        }`}
        style={{ borderColor: character.accent }}
      >
        <div className="text-6xl mb-4">{character.avatar}</div>
        <h2 className="text-4xl font-bold text-baloon mb-1" style={{ color: character.color }}>
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
              onSelect={(rid: string) => navigate(`/receta/${rid}`)}
              unlocked={true}
            />
          ))}
        </div>
      </section>

      {/* Comentarios del usuario sobre las recetas de este habitante */}
      <section className="paper-card p-6 border-black/20 bg-white">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-bold text-baloon text-[#5d4a3a] flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Comentarios sobre las recetas de {character.name}
          </h3>
          <span className="text-xs font-bold text-[#5d4a3a]/60">{characterComments.length}</span>
        </div>

        {characterComments.length > 0 ? (
          <div className="space-y-3">
            {characterComments.map((c) => (
              <article key={c.id} className="p-4 bg-[#f7f3ea]/60 border border-black/15 rounded-2xl">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="w-8 h-8 rounded-full bg-white border border-black/20 flex items-center justify-center text-lg shrink-0">
                    👤
                  </span>
                  <span className="font-bold text-[#5d4a3a] text-sm">Tú</span>
                  <Link
                    to={`/receta/${c.recipeId}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/10 text-xs font-semibold text-[#5d4a3a] hover:bg-[#efe8d8] transition-colors"
                  >
                    🍽️ {recipeTitleById.get(c.recipeId)}
                  </Link>
                  <span className="text-xs text-[#5d4a3a]/50 ml-auto">
                    {formatRelative(c.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-[#5d4a3a] leading-relaxed whitespace-pre-line">{c.text}</p>
                <div className="flex justify-end border-t border-black/10 mt-3 pt-2.5">
                  <DeletePostButton
                    label="Eliminar comentario"
                    onConfirm={() => removeComment(c.id)}
                  />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-[#5d4a3a]/60 py-4">
            Aún no has comentado ninguna receta de {character.name}. Puedes hacerlo desde{' '}
            <Link to="/perfil" className="underline font-semibold">
              tu perfil
            </Link>
            .
          </p>
        )}
      </section>
    </div>
  )
}