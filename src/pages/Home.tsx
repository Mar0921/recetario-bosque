import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { cn } from '../lib/utils'
import { recipes } from '../data/recipes'
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
      <section className="bg-pastel-paper p-8 text-center rounded-3xl border border-black/20 shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full max-w-md mx-auto mb-6 rounded-xl border border-black/20 shadow-lg"
          poster="/favicon.svg"
        >
          <source src="/animacion.mp4" type="video/mp4" />
          Tu navegador no soporta este video.
        </video>
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
          {[
            {
              id: 'post-1',
              author: 'Luna',
              avatar: '🐰',
              title: 'Mi primer plato: Galletas de Miel',
              content:
                '¡Hola bosque! Hoy probé las galletas de Pêche y quedaron riquísimas. Me encantó el toque de avena.',
              image: '🍪',
              likes: 12,
              comments: [
                {
                  id: 'c1',
                  author: 'Pêche',
                  avatar: '🐻',
                  content: '¡Me alegra tanto que te hayan gustado! Pruébalas con un té de flores.',
                  createdAt: 'hace 2 h',
                },
              ],
              createdAt: 'hace 5 h',
            },
            {
              id: 'post-2',
              author: 'Tilo',
              avatar: '🦔',
              title: 'Sopa de setas de Noa',
              content:
                'Seguí el tutorial de Noa paso a paso. La sopa quedó cremosa y calentita. ¡Perfecto para la tarde!',
              image: '🍄',
              likes: 8,
              comments: [],
              createdAt: 'hace 1 d',
            },
            {
              id: 'post-3',
              author: 'Robi',
              avatar: '🦊',
              title: 'Brochetas arcoíris de Brisa',
              content:
                'Brisa tiene razón, el caos es divertido. Quedaron coloridas y sabrosas.',
              image: '🍓',
              likes: 15,
              comments: [
                {
                  id: 'c2',
                  author: 'Brisa',
                  avatar: '🐿️',
                  content: '¡A toda velocidad! La próxima prueba la tortilla.',
                  createdAt: 'hace 12 h',
                },
              ],
              createdAt: 'hace 1 d',
            },
          ].map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
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
