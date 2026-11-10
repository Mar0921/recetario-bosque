import { Link } from 'react-router-dom'
import { ForkKnife, Star, MessageSquare, ArrowLeft } from 'lucide-react'

export function UserProfile() {
  const userRecipes = [
    { id: 'r1', title: 'Galletas de Miel y Avena', difficulty: 'facil', image: '🍪', likes: 8 },
    { id: 'r2', title: 'Té de Flores del Bosque', difficulty: 'facil', image: '🌸', likes: 5 },
  ]

  const myPosts = [
    {
      id: 'p1',
      title: 'Mi primer plato: Galletas de Miel',
      content: '¡Quedaron riquísimas! Se las mostré a Pêche y le encantó.',
      image: '🍪',
      likes: 12,
      comments: 1,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <nav className="mb-2">
        <Link to="/" className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2">
          <ArrowLeft className="w-3 h-3" />
          Volver al bosque
        </Link>
      </nav>

      {/* Profile header */}
      <section className="card-lavender p-8 text-center rounded-3xl shadow-lg">
        <div className="text-5xl mb-3">👤</div>
        <h2 className="text-3xl font-bold text-baloon text-[#5d4a3a] mb-1">Tú</h2>
        <p className="text-[#5d4a3a]/70">Protagonista del Recetario del Bosque</p>
        <div className="mt-4 flex justify-center gap-3">
          <div className="px-4 py-1.5 rounded-full border border-black/20 text-xs font-bold text-[#5d4a3a]">
            <ForkKnife className="w-3 h-3 mr-1" />
            {userRecipes.length} platos probados
          </div>
          <div className="px-4 py-1.5 rounded-full border border-black/20 text-xs font-bold text-[#5d4a3a]">
            <Star className="w-3 h-3 mr-1" />
            {myPosts.reduce((s, p) => s + p.likes, 0)} corazones recibidos
          </div>
        </div>
      </section>

      {/* My recipes */}
      <section className="card-cream p-6 rounded-3xl shadow-lg">
        <h3 className="text-xl font-bold text-baloon text-[#5d4a3a] mb-4 flex items-center gap-2">
          <Star className="w-4 h-4" />
          Mis platos
        </h3>
        {userRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userRecipes.map((r) => (
              <div key={r.id} className="p-4 bg-white border border-black/20 rounded-xl">
                <div className="text-2xl mb-2">{r.image}</div>
                <h4 className="font-bold text-[#5d4a3a] text-sm">{r.title}</h4>
                <p className="text-[10px] text-[#5d4a3a]/60 uppercase tracking-wider mt-1">{r.difficulty}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#5d4a3a]/60 text-center">Aún no has probado ninguna receta.</p>
        )}
      </section>

      {/* My posts */}
      <section className="card-mint p-6 rounded-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-baloon text-[#5d4a3a] flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Mis publicaciones
          </h3>
          <Link to="/crear-publicacion" className="text-xs font-bold text-[#8d4a4a] hover:underline">
            + Nueva publicación
          </Link>
        </div>
        {myPosts.map((post) => (
          <div key={post.id} className="p-4 bg-white border border-black/20 rounded-xl mb-3 last:mb-0">
            <h4 className="font-bold text-[#5d4a3a] text-sm mb-1">{post.title}</h4>
            <p className="text-[#5d4a3a]/70 text-sm mb-2">{post.content}</p>
            <div className="text-2xl">{post.image}</div>
            <div className="flex items-center gap-3 mt-2 text-xs text-[#5d4a3a]/60">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
