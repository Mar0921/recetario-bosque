import { MessageSquare, ThumbsUp } from 'lucide-react'

interface PostCardProps {
  post: any
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="paper-card p-5 mb-5 border-black/20">
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
          <ThumbsUp className="w-3 h-3" />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-[#2d6a4f] transition-colors">
          <MessageSquare className="w-3 h-3" />
          <span>{post.comments.length}</span>
        </button>
      </div>
    </article>
  )
}
