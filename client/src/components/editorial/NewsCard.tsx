import { Story } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

interface NewsCardProps {
  story: Story;
}

export function NewsCard({ story }: NewsCardProps) {
  return (
    <Link href={`/noticias/${story.slug}`}>
      <motion.div 
        whileHover={{ y: -8 }}
        className="group cursor-pointer bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden h-full flex flex-col"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60 group-hover:text-primary transition-colors">
            {story.entity}
          </span>
          <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{story.time}</span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mb-4 leading-tight group-hover:text-primary/90 transition-colors relative z-10">
          {story.title}
        </h3>
        
        <p className="text-sm text-white/40 font-serif leading-relaxed line-clamp-2 mb-6 italic relative z-10">
          "{story.whatHappened}"
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-[8px] font-bold text-primary">{story.author.name[0]}</span>
            </div>
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-tight">{story.author.name}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
        </div>
      </motion.div>
    </Link>
  );
}
