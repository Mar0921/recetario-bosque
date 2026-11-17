import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { recipes, recipeById } from '../data/recipes'
import { inhabitants } from '../data/inhabitants'
import { inhabitantPosts } from '../data/inhabitant-posts'
import { RecipeCard } from '../components/RecipeCard'
import { CommentSection } from '../components/CommentSection'
import { RecipeCommentThread } from '../components/RecipeCommentThread'
import { useRecipeComments } from '../lib/recipe-comments'

const difficultyLabels: Record<string, { label: string; color: string }> = {
  facil: { label: 'Fácil', color: '#f4c2c2' },
  medio: { label: 'Medio', color: '#d1f2eb' },
  dificil: { label: 'Difícil', color: '#ffe0b2' },
}

function parseRelativeTime(str: string): number {
  const match = str.match(/hace (\d+) ([hd])/)
  if (!match) return 0
  const value = parseInt(match[1])
  const unit = match[2]
  return unit === 'h' ? value : value * 24
}

function buildPosts() {
  const all: any[] = []

  // Publicaciones de los habitantes
  Object.entries(inhabitantPosts).forEach(([inhabitantId, posts]) => {
    const inhabitant = inhabitants.find((i) => i.id === inhabitantId)
    if (!inhabitant) return

    posts.forEach((post: any) => {
      all.push({
        id: post.id,
        author: inhabitant.name,
        avatar: inhabitant.avatar,
        inhabitantId,
        title: post.title,
        content: post.content,
        recipeId: post.recipeId,
        likes: post.likes,
        comments: post.comments,
        createdAt: post.createdAt,
        replies: post.replies,
        hoursAgo: parseRelativeTime(post.createdAt),
      })
    })
  })

  // Las más recientes primero
  all.sort((a, b) => a.hoursAgo - b.hoursAgo)
  return all
}

export function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('todos')
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  const LOOP_START = 5
  const LOOP_END = 7

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }, [])

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return

    if (video.currentTime >= LOOP_END) {
      video.currentTime = LOOP_START
    }
  }

  const filteredRecipes =
    selectedDifficulty === 'todos'
      ? recipes
      : recipes.filter((r) => r.difficulty === selectedDifficulty)

  const posts = buildPosts()

  return (
    <div className="w-full flex flex-col">
      {/*
        El video ocupa el 100% del ancho (w-full) y su altura es automática (h-auto).
        z-0 asegura que el botón de música flotante se quede por encima.
      */}
      <div className="relative w-full bg-[#f7f3ea] z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-auto block"
          poster="/favicon.svg"
        >
          <source src="/animacion.mp4" type="video/mp4" />
          Tu navegador no soporta este video.
        </video>
      </div>

      {/* CONTENEDOR DEL RESTO DEL CONTENIDO */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 space-y-8 w-full">
        {/* Panel de bienvenida separado del video */}
        <section className="bg-pastel-paper p-8 text-center rounded-3xl border border-black/20 shadow-lg">
          <h2 className="text-3xl font-bold text-baloon text-[#5d4a3a] mb-2">
            Bienvenido al Recetario del Bosque
          </h2>
          <p className="text-[#5d4a3a]/80 max-w-2xl mx-auto leading-relaxed">
            Eres el protagonista de esta historia. Navega por las recetas divididas en tres
            dificultades y desbloquea secretos exclusivos de cada personaje mientras preparas
            sus platos. Los habitantes del bosque tienen sus propios perfiles con publicaciones
            y playlist, y tú puedes dejar comentarios en sus recetas.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {['todos', 'facil', 'medio', 'dificil'].map((id) => {
              const diff = difficultyLabels[id]
              const buttonVariant =
                id === 'todos'
                  ? 'btn-pastel btn-cream'
                  : id === 'facil'
                    ? 'btn-pastel btn-pink'
                    : id === 'medio'
                      ? 'btn-pastel btn-mint'
                      : 'btn-pastel btn-peach'
              return (
                <button
                  key={id}
                  onClick={() => setSelectedDifficulty(id)}
                  className={cn(
                    buttonVariant,
                    'px-5 py-2 text-sm font-bold',
                    selectedDifficulty === id ? 'scale-110 ring-2 ring-black' : '',
                  )}
                >
                  {id === 'todos' ? 'Todas' : diff?.label}
                </button>
              )
            })}
          </div>
        </section>

        <section className="paper-card p-6 border-black/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-baloon text-[#5d4a3a]">Recetas del bosque</h3>
              <p className="text-sm text-[#5d4a3a]/60">
                {filteredRecipes.length} recetas disponibles
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredRecipes.map((recipe: any) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={(rid: string) => navigate(`/receta/${rid}`)}
                unlocked={true}
              />
            ))}
          </div>

          <div className="mt-6 text-xs text-[#5d4a3a]/50 text-center italic">
            Algunas recetas tienen secretos ocultos. ¡Prepáralas para descubrirlos!
          </div>
        </section>

        <section className="paper-card p-6 border-black/20 bg-white">
          <div className="mb-5">
            <h3 className="text-2xl font-bold text-baloon text-[#5d4a3a]">
              Publicaciones del bosque
            </h3>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function PostCard({ post }: { post: any }) {
  const { comments } = useRecipeComments()

  const authorInhabitant = post.inhabitantId
    ? inhabitants.find((i) => i.id === post.inhabitantId)
    : inhabitants.find((i) => i.name === post.author)
  const relatedRecipe: any = post.recipeId ? recipeById(post.recipeId) : undefined

  // Mis comentarios sobre esta receta se suman al contador de la publicación
  const myCount = relatedRecipe
    ? comments.filter((c) => c.recipeId === relatedRecipe.id).length
    : 0

  return (
    <article className="paper-card p-5 border-black/20">
      <div className="flex items-start gap-3 mb-3">
        {authorInhabitant ? (
          <img
            src={`/pf/${authorInhabitant.id}.jpeg`}
            alt={post.author}
            className="w-10 h-10 rounded-full object-cover shrink-0 border border-black/20"
          />
        ) : (
          <span className="w-10 h-10 rounded-full bg-[#f7f3ea] border border-black/20 flex items-center justify-center text-xl shrink-0">
            {post.avatar}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1 flex-wrap">
            <span className="font-bold text-[#5d4a3a] text-sm">{post.author}</span>
            <span className="text-xs text-[#5d4a3a]/50">{post.createdAt}</span>
          </div>
          <h3 className="text-lg font-bold text-baloon text-[#5d4a3a]">{post.title}</h3>
        </div>
      </div>

      <p className="text-[#5d4a3a] mb-4 leading-relaxed whitespace-pre-line">{post.content}</p>

      {relatedRecipe && (
        <Link
          to={`/receta/${relatedRecipe.id}`}
          className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-[#f7f3ea] border border-black/10 text-xs font-semibold text-[#5d4a3a] hover:bg-[#efe8d8] transition-colors"
        >
          🍽️ Receta: {relatedRecipe.title}
        </Link>
      )}

      <div className="flex items-center gap-4 text-xs text-[#5d4a3a]/60 border-t border-black/10 pt-3">
        <button className="flex items-center gap-1.5 hover:text-[#8d4a4a] transition-colors">
          <span>❤️</span> <span>{post.likes}</span>
        </button>
        <span className="flex items-center gap-1.5">
          <span>💬</span> <span>{post.comments + myCount}</span>
        </span>
      </div>

      {/* Con receta: comentarios reales y guardados. Sin receta: el componente original */}
      {relatedRecipe ? (
        <RecipeCommentThread recipeId={relatedRecipe.id} replies={post.replies} />
      ) : (
        <CommentSection />
      )}
    </article>
  )
}