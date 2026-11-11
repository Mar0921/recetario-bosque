import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { cn } from '../lib/utils'
import { recipes } from '../data/recipes'
import { inhabitants } from '../data/inhabitants'
import { characterById } from '../data/characters'
import { RecipeCard } from '../components/RecipeCard'
import { CommentSection } from '../components/CommentSection'

const difficultyLabels: Record<string, { label: string; icon: string; color: string }> = {
  facil: { label: 'Fácil', icon: '🟢', color: '#f4c2c2' },
  medio: { label: 'Medio', icon: '🟡', color: '#d1f2eb' },
  dificil: { label: 'Difícil', icon: '🔴', color: '#ffe0b2' },
}

export function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('todos')
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleEnded = () => {
      video.currentTime = 2
      video.play()
    }
    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [])

  const filteredRecipes =
    selectedDifficulty === 'todos'
      ? recipes
      : recipes.filter((r) => r.difficulty === selectedDifficulty)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="relative w-full h-48 mb-8 bg-[#C3B59F] rounded-3xl p-2 flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full rounded-2xl relative z-10"
          poster="/favicon.svg"
        >
          <source src="/animacion.mp4" type="video/mp4" />
          Tu navegador no soporta este video.
        </video>
      </div>

      <section className="bg-pastel-paper p-8 text-center rounded-3xl border border-black/20 shadow-lg">
        <h2 className="text-3xl font-bold text-baloon text-[#5d4a3a] mb-2">
          Bienvenido al Recetario del Bosque
        </h2>
        <p className="text-[#5d4a3a]/80 max-w-2xl mx-auto leading-relaxed">
          Eres el protagonista de esta historia. Navega por las recetas divididas en tres
          dificultades y desbloquea secretos exclusivos de cada personaje mientras preparas
          sus platos. Los habitantes del bosque tienen sus propios perfiles con publicaciones
          y playlist.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {['todos', 'facil', 'medio', 'dificil'].map((id) => {
            const diff = difficultyLabels[id]
            const buttonVariant = id === 'todos' ? 'btn-pastel btn-cream' : id === 'facil' ? 'btn-pastel btn-pink' : id === 'medio' ? 'btn-pastel btn-mint' : 'btn-pastel btn-peach'
            return (
              <button
                key={id}
                onClick={() => setSelectedDifficulty(id)}
                className={cn(buttonVariant, 'px-5 py-2 text-sm font-bold', selectedDifficulty === id ? 'scale-110 ring-2 ring-black' : '')}
              >
                {id === 'todos' ? '🌲' : diff?.icon} {id === 'todos' ? 'Todas' : diff?.label}
              </button>
            )
          })}
        </div>
      </section>

      <section className="paper-card p-6 border-black/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-baloon text-[#5d4a3a]">
              Recetas del bosque
            </h3>
            <p className="text-sm text-[#5d4a3a]/60">
              {filteredRecipes.length} recetas disponibles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredRecipes.map((recipe: any) => {
            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={(rid: string) => navigate(`/receta/${rid}`)}
                unlocked={true}
              />
            )
          })}
        </div>

        <div className="mt-6 text-xs text-[#5d4a3a]/50 text-center italic">
          Algunas recetas tienen secretos ocultos. ¡Prepáralas para descubrirlos!
        </div>
      </section>

      <section className="paper-card p-6 border-black/20 bg-white">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-bold text-baloon text-[#5d4a3a]">
            Publicaciones del bosque
          </h3>
          <Link
            to="/crear-publicacion"
            className="btn-cute px-5 py-2.5 text-sm font-bold text-[#5d4a3a] flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Publicar plato
          </Link>
        </div>
        <div className="space-y-4">
          {inhabitants.map((inhabitant: any) => {
            const recipesForInhabitant = recipes.filter((r: any) => {
              const ids = Object.values(inhabitant.recipes) as string[]
              return ids.includes(r.id)
            })
            const comments = recipesForInhabitant.slice(0, 2).map((recipe: any) => ({
              id: `c-${recipe.id}`,
              author: characterById(recipe.characterId).name,
              avatar: characterById(recipe.characterId).avatar,
              content: `¡Me encanta tu ${recipe.title.toLowerCase()}! ${recipe.lore.substring(0, 60)}...`,
              createdAt: 'hace 2 h',
            }))
            return (
              <PostCard
                key={inhabitant.id}
                post={{
                  id: `post-${inhabitant.id}`,
                  author: inhabitant.name,
                  avatar: inhabitant.avatar,
                  title: inhabitant.catchphrase,
                  content: inhabitant.bio,
                  image: inhabitant.favoriteFlavors[0],
                  likes: (inhabitant.id.charCodeAt(0) * 7) % 20 + 5,
                  comments,
                  createdAt: 'hace 1 d',
                }}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}

function PostCard({ post }: { post: any }) {
  return (
    <article className="paper-card p-5 border-black/20">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl shrink-0">{post.avatar}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-basename gap-2 mb-1">
            <span className="font-bold text-[#5d4a3a] text-sm">{post.author}</span>
            <span className="text-xs text-[#5d4a3a]/50">{post.createdAt}</span>
          </div>
          <h3 className="text-lg font-bold text-baloon text-[#5d4a3a]">{post.title}</h3>
        </div>
      </div>
      <p className="text-[#5d4a3a] mb-4 leading-relaxed">{post.content}</p>
      <div className="text-2xl mb-4">{post.image}</div>
      <div className="flex items-center gap-4 text-xs text-[#5d4a3a]/60 border-t border-black/10 pt-3">
        <button className="flex items-center gap-1.5 hover:text-[#8d4a4a] transition-colors">
          <span>❤️</span> <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-[#2d6a4f] transition-colors">
          <span>💬</span> <span>{post.comments.length}</span>
        </button>
      </div>
      <CommentSection />
    </article>
  )
}
