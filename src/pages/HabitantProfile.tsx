import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Star, Music, Flame, Heart, ArrowLeft, ForkKnife } from 'lucide-react'
import { inhabitantById, inhabitants, type InhabitantId } from '../data/inhabitants'
import { inhabitantPosts } from '../data/inhabitant-posts'
import { recipeById } from '../data/recipes'
import { RecipeCard } from '../components/RecipeCard'

const personalityBg: Record<string, string> = {
  dulce: 'bg-[#f4c2c2]/30 border-[#e5989b]/40',
  formal: 'bg-[#d1f2eb]/30 border-[#81c784]/40',
  energetico: 'bg-[#ffe0b2]/30 border-[#ffb74d]/40',
  curioso: 'bg-[#e1bee7]/30 border-[#ce93d8]/40',
  sabio: 'bg-[#d7ccc8]/30 border-[#bcaaa4]/40',
  travieso: 'bg-[#ffccbc]/30 border-[#ffab91]/40',
}

const personalityText: Record<string, string> = {
  dulce: 'text-[#7d3c3c]',
  formal: 'text-[#1d4a33]',
  energetico: 'text-[#8a3a00]',
  curioso: 'text-[#4a1b7a]',
  sabio: 'text-[#3e2a20]',
  travieso: 'text-[#8a2a00]',
}

const personalityLabel: Record<string, string> = {
  dulce: 'Dulce',
  formal: 'Formal',
  energetico: 'Energetico',
  curioso: 'Curioso',
  sabio: 'Sabio',
  travieso: 'Travieso',
}

const musicaPorHabitante: Record<InhabitantId, string[]> = {
  lila: [
    '/musica-pagina/Lila_Castaña/Katrina And The Waves - Walking On Sunshine.mp3',
    '/musica-pagina/Lila_Castaña/Sugar, Sugar - The Archies.mp3',
    '/musica-pagina/Lila_Castaña/Taylor Swift - Shake It Off.mp3',
  ],
  renato: [
    '/musica-pagina/Renato_Zorro/Django Reinhardt - Minor Swing.mp3',
    '/musica-pagina/Renato_Zorro/Electric Light Orchestra - Mr. Blue Sky.mp3',
    '/musica-pagina/Renato_Zorro/Mili - Rendezvous.mp3',
  ],
  rock: [
    '/musica-pagina/Rock_Oso/Guns N\' Roses - Sweet Child O\' Mine.mp3',
    '/musica-pagina/Rock_Oso/Johnny Cash - Hurt.mp3',
    '/musica-pagina/Rock_Oso/Simon and Garfunkel - The Sound of Silence (1966).mp3',
  ],
  tadeo: [
    '/musica-pagina/Tadeo_Buho/Clair de Lune – Claude Debussy.mp3',
    '/musica-pagina/Tadeo_Buho/Fly me to the moon - Frank Sinatra.mp3',
    '/musica-pagina/Tadeo_Buho/Take Five – Dave Brubeck.mp3',
  ],
}

export function HabitantProfile() {
  const { id } = useParams<{ id: string }>()
  if (!id) return null
  const inhabitant = inhabitantById(id as InhabitantId)
  const posts = inhabitantPosts[id] || []
  const bestFriend = inhabitants.find((i) => i.id === inhabitant.bestFriend)
  const inhabitantRecipes = [
    inhabitant.recipes.facil,
    inhabitant.recipes.medio,
    inhabitant.recipes.dificil,
  ].map((recipeId) => recipeById(recipeId)!).filter(Boolean)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <nav className="mb-2">
        <Link to="/habitantes" className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2">
          <ArrowLeft className="w-3 h-3" />
          Volver a habitantes
        </Link>
      </nav>

      {/* Perfil principal con colores de personalidad */}
      <section
        className={`paper-card p-8 text-center border-black/20 ${personalityBg[inhabitant.personality]}`}
        style={{ borderColor: inhabitant.accent }}
      >
        <img
          src={`/pf/${inhabitant.id}.jpeg`}
          alt={inhabitant.name}
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
        />
        <h2
          className={`text-4xl font-bold text-baloon mb-1 ${personalityText[inhabitant.personality]}`}
          style={{ color: inhabitant.color }}
        >
          {inhabitant.name}
        </h2>
        <p className="text-lg font-semibold text-[#5d4a3a] mb-2">{inhabitant.species}</p>
        <p className="text-sm text-[#5d4a3a]/70 italic mb-4">"{inhabitant.catchphrase}"</p>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/20 bg-white text-xs font-bold text-[#5d4a3a]">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: inhabitant.accent }} />
          {personalityLabel[inhabitant.personality]}
        </div>
        <p className="mt-4 text-[#5d4a3a]/80 leading-relaxed max-w-md mx-auto">{inhabitant.bio}</p>

        {/* Cumpleaños, sabores favoritos y mejor amigo */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-black/20 rounded-xl text-center">
            <div className="text-2xl mb-1">🎂</div>
            <div className="text-xs font-bold text-[#5d4a3a]/60 uppercase tracking-wider mb-1">Cumpleaños</div>
            <div className="text-sm font-bold text-[#5d4a3a]">{inhabitant.birthday}</div>
          </div>
          <div className="p-4 bg-white border border-black/20 rounded-xl">
            <h4 className="flex items-center gap-2 text-[#5d4a3a] font-bold mb-3 justify-center">
              <Flame className="w-4 h-4" />
              Sabores favoritos
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {inhabitant.favoriteFlavors.map((flavor: string) => (
                <span key={flavor} className="text-[10px] bg-white border border-black/20 px-2 py-0.5 rounded-full text-[#5d4a3a]/70 uppercase tracking-wider">
                  {flavor}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-white border border-black/20 rounded-xl">
            <h4 className="flex items-center gap-2 text-[#5d4a3a] font-bold mb-3 justify-center">
              <Heart className="w-4 h-4" />
              Mejor amigo del foro
            </h4>
            <Link to={`/habitante/${bestFriend?.id}`} className="block">
              <div className="flex flex-col items-center gap-2 group">
                <img
                  src={`/pf/${bestFriend?.id}.jpeg`}
                  alt={bestFriend?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                />
                <div className="font-bold text-[#5d4a3a] text-sm group-hover:text-[#5d4a3a]/80 transition-colors">{bestFriend?.name}</div>
                <div className="text-xs text-[#5d4a3a]/60">{bestFriend?.species}</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Playlist */}
      <section className="paper-card p-6 border-black/20">
        <h3 className="text-xl font-bold text-baloon text-[#5d4a3a] mb-4 flex items-center gap-2">
          <Music className="w-4 h-4" style={{ color: inhabitant.accent }} />
          Playlist de {inhabitant.name}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {inhabitant.playlist.map((track: string, i: number) => {
            const src = musicaPorHabitante[id as InhabitantId]?.[i]
            const trackName = src
              ? decodeURIComponent(src.split('/').pop()!.replace('.mp3', ''))
              : track
            return (
              <div
                key={i}
                className="p-4 rounded-xl border border-black/20 bg-white flex flex-col gap-2 relative group overflow-hidden"
                style={{ borderColor: inhabitant.accent }}
              >
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: inhabitant.accent }} />
                <span className="text-xs font-bold text-[#5d4a3a] uppercase tracking-wider">
                  {i + 1}.
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: inhabitant.color }}>
                    🎵
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#5d4a3a] leading-tight">{trackName}</div>
                    <div className="text-[10px] text-[#5d4a3a]/50">Bosque · Recetario</div>
                  </div>
                </div>
                {src && (
                  <audio controls className="w-full" src={encodeURI(src)} />
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Recetas del habitante */}
      <section className="paper-card p-6 border-black/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-baloon text-[#5d4a3a] flex items-center gap-2">
            <ForkKnife className="w-4 h-4" />
            Recetas de {inhabitant.name}
          </h3>
          <span className="text-xs text-[#5d4a3a]/50">{inhabitantRecipes.length} recetas</span>
        </div>
        {inhabitantRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {inhabitantRecipes.map((recipe: any) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={(rid: string) => (window.location.href = `/receta/${rid}`)}
                unlocked={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-[#5d4a3a]/60 text-center py-4">{inhabitant.name} aún no tiene recetas publicadas.</p>
        )}
      </section>

      {/* Publicaciones */}
      <section className="paper-card p-6 border-black/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-baloon text-[#5d4a3a] flex items-center gap-2">
            <Star className="w-4 h-4" />
            Publicaciones de {inhabitant.name}
          </h3>
          <span className="text-xs text-[#5d4a3a]/50">{posts.length} publicaciones</span>
        </div>
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post: any) => (
              <div key={post.id} className="p-4 bg-white border border-black/20 rounded-xl">
                <div className="flex items-start gap-3 mb-2">
                  <img
                    src={`/pf/${inhabitant.id}.jpeg`}
                    alt={inhabitant.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-black/20"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-basename gap-2 mb-1">
                      <span className="font-bold text-[#5d4a3a] text-sm">{inhabitant.name}</span>
                      <span className="text-xs text-[#5d4a3a]/50">{post.createdAt}</span>
                    </div>
                    <h4 className="font-bold text-baloon text-[#5d4a3a] text-base">{post.title}</h4>
                  </div>
                </div>
                <p className="text-[#5d4a3a]/80 text-sm mb-3">{post.content}</p>
                <div className="text-2xl mb-3">{post.image}</div>
                {post.replies && post.replies.length > 0 && (
                  <div className="mb-3">
                    <div className="text-[10px] font-bold text-[#5d4a3a]/60 uppercase tracking-wider mb-1">Comentarios</div>
                    {post.replies.map((reply: { author: string; text: string }, i: number) => {
                      const replyAuthor = inhabitants.find((inh) => inh.name === reply.author)
                      return (
                        <div key={i} className="p-2 bg-[#f7f3ea] border border-black/10 rounded-lg text-sm text-[#5d4a3a] leading-relaxed flex items-start gap-2">
                          {replyAuthor ? (
                            <img
                              src={`/pf/${replyAuthor.id}.jpeg`}
                              alt={reply.author}
                              className="w-6 h-6 rounded-full object-cover shrink-0 border border-black/20"
                            />
                          ) : null}
                          <div>
                            <span className="font-bold text-[#3e2a20]">{reply.author}:</span> {reply.text}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
                <div className="flex items-center gap-3 text-xs text-[#5d4a3a]/60">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#5d4a3a]/60 text-center py-4">{inhabitant.name} aún no ha publicado nada.</p>
        )}
      </section>
    </div>
  )
}
