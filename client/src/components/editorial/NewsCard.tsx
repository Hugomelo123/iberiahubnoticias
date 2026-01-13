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
      <motion.div 
        whileHover={{ y: -2 }}
        className="group cursor-pointer p-5 rounded-lg hover:bg-card/40 transition-colors border border-transparent hover:border-border/40"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded">
            {story.type}
          </span>
          <span className="text-xs text-muted-foreground font-mono">{story.time}</span>
          <span className="text-xs text-muted-foreground ml-auto group-hover:text-primary transition-colors">
            {story.entity}
          </span>
        </div>

        <h3 className="font-serif text-xl font-medium mb-3 text-foreground group-hover:text-white transition-colors flex items-start justify-between">
          {story.title}
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
        </h3>

        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground/90">
            <span className="text-foreground/50 text-xs uppercase mr-2 font-bold tracking-wider">O que:</span>
            {story.whatHappened}
          </p>
          <p className="text-sm text-muted-foreground/60">
            <span className="text-foreground/30 text-xs uppercase mr-2 font-bold tracking-wider">Impacto:</span>
            {story.whyItMatters}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
