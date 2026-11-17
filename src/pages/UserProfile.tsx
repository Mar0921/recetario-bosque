import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ForkKnife,
  Star,
  MessageSquare,
  ArrowLeft,
  BookOpen,
  Lock,
  X,
} from 'lucide-react'
import { cn } from '../lib/utils'
import { recipeById } from '../data/recipes'
import { inhabitantForRecipe } from '../data/inhabitants'
import { useSavedRecipes } from '../lib/saved-recipes'
import { useRecipeComments, formatRelative } from '../lib/recipe-comments'
import { CommentComposer } from '../components/CommentComposer'
import { DeletePostButton } from '../components/DeletePostButton'

type Difficulty = 'facil' | 'medio' | 'dificil'
type Tab = 'platos' | 'comentarios'

const difficultyStyles: Record<Difficulty, { label: string; tag: string }> = {
  facil: { label: 'Fácil', tag: 'bg-[#f4c2c2] text-[#8d4a4a]' },
  medio: { label: 'Medio', tag: 'bg-[#d1f2eb] text-[#2d6a4f]' },
  dificil: { label: 'Difícil', tag: 'bg-[#ffe0b2] text-[#b45309]' },
}

// Cada nivel pide 100 de experiencia
const LEVEL_TITLES = [
  'Semilla del bosque',
  'Aprendiz de cocina',
  'Cocinero del claro',
  'Chef del bosque',
  'Maestro de los fogones',
]
const XP_PER_LEVEL = 100

export function UserProfile() {
  const [tab, setTab] = useState<Tab>('platos')
  const { savedIds, remove } = useSavedRecipes()
  const { comments, removeComment } = useRecipeComments()

  // Recetas guardadas con el botón "Guardar en mi perfil" (la más reciente primero)
  const savedRecipes = savedIds
    .map((id) => recipeById(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))

  // Solo comentarios de recetas que existen
  const myComments = comments
    .map((c) => ({ comment: c, recipe: recipeById(c.recipeId) as any }))
    .filter((x) => Boolean(x.recipe))

  const commentedRecipes = new Set(myComments.map((x) => x.comment.recipeId)).size

  // Estadísticas derivadas
  const xp = savedRecipes.length * 50 + myComments.length * 20
  const level = Math.floor(xp / XP_PER_LEVEL)
  const levelTitle = LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length - 1)]
  const xpInLevel = xp % XP_PER_LEVEL
  const progress = Math.round((xpInLevel / XP_PER_LEVEL) * 100)

  const stats = [
    { icon: <ForkKnife className="w-5 h-5" />, value: savedRecipes.length, label: 'Platos guardados', bg: 'bg-[#f4c2c2]/60' },
    { icon: <BookOpen className="w-5 h-5" />, value: commentedRecipes, label: 'Recetas comentadas', bg: 'bg-[#ffe0b2]/80' },
    { icon: <MessageSquare className="w-5 h-5" />, value: myComments.length, label: 'Comentarios', bg: 'bg-[#d1f2eb]/80' },
  ]

  const achievements = [
    { id: 'a1', emoji: '🥄', title: 'Primer plato', desc: 'Guarda tu primera receta', unlocked: savedRecipes.length >= 1 },
    { id: 'a2', emoji: '👨‍🍳', title: 'Chef constante', desc: 'Guarda 5 recetas', unlocked: savedRecipes.length >= 5 },
    { id: 'a3', emoji: '📖', title: 'Cronista', desc: 'Haz tu primer comentario', unlocked: myComments.length >= 1 },
    { id: 'a4', emoji: '💬', title: 'Voz del bosque', desc: 'Haz 5 comentarios', unlocked: myComments.length >= 5 },
    { id: 'a5', emoji: '🌟', title: 'Crítico gastronómico', desc: 'Comenta 3 recetas distintas', unlocked: commentedRecipes >= 3 },
  ]
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  const tabs: { id: Tab; label: string; count: number; icon: ReactNode }[] = [
    { id: 'platos', label: 'Mis platos', count: savedRecipes.length, icon: <Star className="w-3.5 h-3.5" /> },
    { id: 'comentarios', label: 'Mis comentarios', count: myComments.length, icon: <MessageSquare className="w-3.5 h-3.5" /> },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <nav className="mb-2">
        <Link
          to="/"
          className="text-sm text-[#5d4a3a]/60 hover:text-[#5d4a3a] flex items-center gap-2 w-fit"
        >
          <ArrowLeft className="w-3 h-3" />
          Volver al bosque
        </Link>
      </nav>

      {/* Cabecera: portada + avatar + nivel */}
      <section className="relative rounded-3xl overflow-hidden border border-black/20 shadow-lg bg-white">
        <div className="relative h-36 bg-gradient-to-br from-[#e8def8] via-[#f4c2c2]/70 to-[#d1f2eb] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
            <span className="absolute left-[6%] top-[18%] text-5xl opacity-70">🌲</span>
            <span className="absolute left-[22%] bottom-[8%] text-3xl opacity-80">🍄</span>
            <span className="absolute left-[45%] top-[12%] text-4xl opacity-40">☁️</span>
            <span className="absolute right-[24%] bottom-[10%] text-3xl opacity-80">🌸</span>
            <span className="absolute right-[8%] top-[14%] text-5xl opacity-90">🌞</span>
          </div>
        </div>

        {/* relative z-10: el contenido (y el avatar) queda por encima del banner */}
        <div className="relative z-10 px-6 md:px-8 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14">
            <div className="w-28 h-28 rounded-full bg-white border-4 border-white shadow-lg ring-2 ring-black/10 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src="/oveja pf.png"
                alt="Avatar"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div className="flex-1 min-w-0 sm:pb-2">
              <h2 className="text-3xl font-bold text-baloon text-[#5d4a3a] leading-tight">Tú</h2>
              <p className="text-[#5d4a3a]/70">Protagonista del Recetario del Bosque</p>
            </div>
            <span className="self-start sm:self-auto sm:mb-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#5d4a3a] text-white text-xs font-bold shadow-md">
              <Star className="w-3 h-3" />
              Nivel {level + 1}
            </span>
          </div>

          {/* Barra de experiencia */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-semibold text-[#5d4a3a] mb-1.5">
              <span>{levelTitle}</span>
              <span className="text-[#5d4a3a]/60">
                {xpInLevel} / {XP_PER_LEVEL} XP
              </span>
            </div>
            <div
              className="h-3 rounded-full bg-[#f7f3ea] border border-black/10 overflow-hidden"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progreso al siguiente nivel"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f4c2c2] via-[#ffe0b2] to-[#d1f2eb] transition-all duration-700"
                style={{ width: `${Math.max(progress, 4)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="paper-card p-4 border-black/20 text-center transition-transform hover:-translate-y-0.5"
          >
            <div
              className={cn(
                'w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center text-[#5d4a3a] border border-black/10',
                s.bg,
              )}
            >
              {s.icon}
            </div>
            <div className="text-2xl font-bold text-baloon text-[#5d4a3a] leading-none">{s.value}</div>
            <div className="text-[11px] font-semibold text-[#5d4a3a]/60 mt-1 leading-tight">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Logros */}
      <section className="paper-card p-6 border-black/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-baloon text-[#5d4a3a] flex items-center gap-2">
            <Star className="w-4 h-4" />
            Logros
          </h3>
          <span className="text-xs font-bold text-[#5d4a3a]/60">
            {unlockedCount} / {achievements.length}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {achievements.map((a) => (
            <div
              key={a.id}
              title={a.desc}
              className={cn(
                'relative p-3 rounded-2xl border text-center transition-all',
                a.unlocked
                  ? 'bg-gradient-to-b from-white to-[#f7f3ea] border-black/20 shadow-sm hover:-translate-y-0.5'
                  : 'bg-black/[0.03] border-black/10 opacity-60',
              )}
            >
              <div className={cn('text-3xl mb-1', !a.unlocked && 'grayscale')}>{a.emoji}</div>
              <div className="text-[11px] font-bold text-[#5d4a3a] leading-tight">{a.title}</div>
              <div className="text-[10px] text-[#5d4a3a]/50 mt-0.5 leading-tight">{a.desc}</div>
              {!a.unlocked && (
                <Lock className="absolute top-2 right-2 w-3 h-3 text-[#5d4a3a]/40" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pestañas: platos / comentarios */}
      <section className="paper-card p-6 border-black/20">
        <div
          role="tablist"
          aria-label="Contenido del perfil"
          className="flex flex-wrap gap-2 mb-5 p-1 rounded-full bg-[#f7f3ea] border border-black/10 w-fit"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold transition-colors',
                tab === t.id
                  ? 'bg-[#5d4a3a] text-white shadow-md'
                  : 'text-[#5d4a3a]/70 hover:text-[#5d4a3a]',
              )}
            >
              {t.icon}
              {t.label}
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-full',
                  tab === t.id ? 'bg-white/20' : 'bg-black/10',
                )}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {tab === 'platos' && (
          <div role="tabpanel">
            {savedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedRecipes.map((r: any) => {
                  const d = difficultyStyles[r.difficulty as Difficulty]
                  const author = inhabitantForRecipe(r.id)
                  return (
                    <article
                      key={r.id}
                      className="group relative bg-white border border-black/20 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <Link to={`/receta/${r.id}`} className="flex items-center gap-4 p-4 pr-12">
                        {/* Foto completa: sin recuadro ni recorte */}
                        <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                          {r.photo ? (
                            <img
                              src={r.photo}
                              alt={r.title}
                              draggable={false}
                              className="max-w-full max-h-full object-contain select-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)] transition-transform duration-200 group-hover:scale-110"
                            />
                          ) : (
                            <span className="text-4xl">🍽️</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-[#5d4a3a] text-sm leading-snug mb-1.5">{r.title}</h4>
                          <div className="flex items-center gap-2 flex-wrap">
                            {d && (
                              <span
                                className={cn(
                                  'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-black/10',
                                  d.tag,
                                )}
                              >
                                {d.label}
                              </span>
                            )}
                            {author && (
                              <span className="text-[11px] text-[#5d4a3a]/60 italic">de {author.name}</span>
                            )}
                          </div>
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={() => remove(r.id)}
                        aria-label={`Quitar ${r.title} de mi perfil`}
                        title="Quitar de mi perfil"
                        className="absolute top-2 right-2 p-1.5 rounded-full text-[#5d4a3a]/40 hover:text-[#8d4a4a] hover:bg-black/5 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </article>
                  )
                })}
              </div>
            ) : (
              <EmptyState emoji="🍳" text="Aún no has guardado ninguna receta." cta="Explorar recetas" to="/" />
            )}
          </div>
        )}

        {tab === 'comentarios' && (
          <div role="tabpanel" className="space-y-4">
            <CommentComposer />

            {myComments.length > 0 ? (
              <div className="space-y-3">
                {myComments.map(({ comment, recipe }) => {
                  const author = inhabitantForRecipe(recipe.id)
                  return (
                    <article
                      key={comment.id}
                      className="p-4 bg-white border border-black/20 rounded-2xl transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <Link
                          to={`/receta/${recipe.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f7f3ea] border border-black/10 text-xs font-semibold text-[#5d4a3a] hover:bg-[#efe8d8] transition-colors"
                        >
                          🍽️ {recipe.title}
                        </Link>
                        {author && (
                          <span className="text-[11px] text-[#5d4a3a]/60 italic">de {author.name}</span>
                        )}
                        <span className="text-xs text-[#5d4a3a]/50 ml-auto">
                          {formatRelative(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-[#5d4a3a] leading-relaxed whitespace-pre-line">
                        {comment.text}
                      </p>
                      <div className="flex justify-end border-t border-black/10 mt-3 pt-2.5">
                        <DeletePostButton
                          label="Eliminar comentario"
                          onConfirm={() => removeComment(comment.id)}
                        />
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              <p className="text-center text-sm text-[#5d4a3a]/60 py-4">
                Todavía no has comentado ninguna receta. ✍️
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

function EmptyState({
  emoji,
  text,
  cta,
  to,
}: {
  emoji: string
  text: string
  cta: string
  to: string
}) {
  return (
    <div className="text-center py-10 px-4 rounded-2xl border-2 border-dashed border-black/15 bg-[#f7f3ea]/60">
      <div className="text-5xl mb-3">{emoji}</div>
      <p className="text-[#5d4a3a]/70 mb-4">{text}</p>
      <Link to={to} className="btn-cute px-5 py-2.5 text-sm font-bold text-[#5d4a3a] inline-flex items-center">
        {cta}
      </Link>
    </div>
  )
}