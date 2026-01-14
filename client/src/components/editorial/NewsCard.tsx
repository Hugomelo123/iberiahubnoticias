import { Story } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';

interface NewsCardProps {
  story: Story;
}

export function NewsCard({ story }: NewsCardProps) {
  return (
    <Link href={`/noticias/${story.slug}`}>
      <div className="group cursor-pointer p-5 rounded-xl transition-all duration-300 border border-transparent hover:border-white/5 hover:bg-white/5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded">
            {story.type}
          </span>
          <span className="text-xs text-muted-foreground font-mono">{story.time}</span>
          <span className="text-white/30 text-[10px] uppercase font-bold ml-2">por {story.author.name}</span>
          <span className="text-xs text-muted-foreground ml-auto group-hover:text-primary transition-colors">
            {story.entity}
          </span>
        </div>

        <h3 className="font-serif text-xl font-medium mb-3 text-foreground group-hover:text-white transition-colors flex items-start justify-between">
          {story.title}
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            whileHover={{ opacity: 1, x: 0 }}
          >
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </motion.div>
        </h3>

        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            <span className="text-foreground/50 text-xs uppercase mr-2 font-bold tracking-wider">O que:</span>
            {story.whatHappened}
          </p>
          <p className="text-sm text-muted-foreground/60 leading-relaxed italic">
            <span className="text-foreground/30 text-xs uppercase mr-2 font-bold tracking-wider not-italic">Impacto:</span>
            {story.whyItMatters}
          </p>
        </div>
      </div>
    </Link>
  );
}
