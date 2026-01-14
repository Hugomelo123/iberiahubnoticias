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
      className="bg-card/30 border border-white/5 rounded-lg p-6 mb-8 backdrop-blur-sm lg:p-5"
    >
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <h3 className="font-serif text-lg italic text-foreground">O dia em 60s</h3>
        <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold">Live</span>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-start group">
            <span className="font-mono text-[10px] text-primary/40 mt-1 min-w-[2.5rem] group-hover:text-primary transition-colors">
              {item.time}
            </span>
            <p className="text-sm text-muted-foreground group-hover:text-slate-200 transition-colors leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
