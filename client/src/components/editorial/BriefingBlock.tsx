import { BriefingItem } from '@/lib/mockData';
import { motion } from 'framer-motion';

interface BriefingBlockProps {
  items: BriefingItem[];
}

export function BriefingBlock({ items }: BriefingBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-card/50 border border-border/50 rounded-lg p-6 mb-16 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6 border-b border-border/40 pb-4">
        <h3 className="font-serif text-xl italic text-foreground">O dia em 60 segundos</h3>
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Briefing</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-start group">
            <span className="font-mono text-xs text-primary/60 mt-1 min-w-[3rem] group-hover:text-primary transition-colors">
              {item.time}
            </span>
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
