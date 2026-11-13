import React from 'react'
import { Link } from 'react-router-dom'
import { User, House, MapPin } from 'lucide-react'
import { cn } from '../lib/utils'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/20">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🌲</div>
          <div>
            <h1 className="text-2xl font-bold text-baloon text-[#5d4a3a] leading-tight">Recetario del Bosque</h1>
            <p className="text-xs text-[#5d4a3a]/70 uppercase tracking-wider">Foro de recetas y lore del bosque</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="btn-pastel btn-cream px-5 py-2 text-sm font-bold text-[#5d4a3a] flex items-center gap-2"
          >
            <House className="w-4 h-4" />
            Inicio
          </Link>
          <Link
            to="/habitantes"
            className="btn-pastel btn-pink px-5 py-2 text-sm font-bold text-[#5d4a3a] flex items-center gap-2"
          >
            <House className="w-4 h-4" />
            Habitantes del foro
          </Link>
          <Link
            to="/mapa"
            className="btn-pastel btn-mint px-5 py-2 text-sm font-bold text-[#5d4a3a] flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Mapa del bosque
          </Link>
          <Link
            to="/perfil"
            className="btn-pastel btn-lavender px-5 py-2 text-sm font-bold text-[#5d4a3a] flex items-center gap-2"
          >
            <User className="w-4 h-4 mr-1.5" />
            Mi perfil
          </Link>
        </div>
      </div>
    </nav>
  )
}

export function MusicPlayer() {
  const [playing, setPlaying] = React.useState(false)
  const [muted, setMuted] = React.useState(false)
  const audioRef = React.useRef<HTMLAudioElement>(null)

  React.useEffect(() => {
    if (playing && audioRef.current) {
      audioRef.current.volume = muted ? 0 : 0.5
      audioRef.current.play().catch(() => {})
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [playing, muted])

  return (
    // Agregamos z-[100] aquí para que siempre esté por encima de todo
    <div className="fixed bottom-6 right-6 z-[100] wood-border p-3 bg-white rounded-full shadow-lg">
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      <button
        onClick={() => setPlaying(!playing)}
        className={cn('w-10 h-10 rounded-full flex items-center justify-center border border-black/20', playing ? 'bg-[#5d4a3a] text-white' : 'bg-white text-[#5d4a3a]')}
        title={playing ? 'Pausar música' : 'Reproducir música'}
      >
        {playing ? (
          <span className="block w-1 h-4 bg-current rounded mx-auto"></span>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
      <button
        onClick={() => setMuted(!muted)}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-black/20 bg-white text-[#5d4a3a] ml-2"
        title={muted ? 'Activar sonido' : 'Silenciar'}
      >
        {muted ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728m5.657-5.657a9 9 0 000-12.728" />
          </svg>
        )}
      </button>
    </div>
  )
}

