export function CommentSection() {
  return (
    <div className="mt-6 border-t border-black/10 pt-4">
      <h3 className="text-sm font-bold text-[#5d4a3a] mb-3 uppercase tracking-wider">Comentarios del bosque</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Escribe un comentario..."
          className="flex-1 border border-black/20 px-3 py-2 rounded-full text-sm text-[#5d4a3a] focus:outline-none focus:ring-2 focus:ring-[#e5989b]"
        />
        <button className="btn-cute px-4 py-2 text-xs font-bold text-[#5d4a3a]">Comentar</button>
      </div>
    </div>
  )
}
