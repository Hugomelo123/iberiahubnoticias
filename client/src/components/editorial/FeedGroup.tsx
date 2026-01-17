import { Story } from '@/lib/mockData';
import { NewsCard } from './NewsCard';
import { motion } from 'framer-motion';

interface FeedGroupProps {
  label: string;
  stories: Story[];
}

export function FeedGroup({ label, stories }: FeedGroupProps) {
  if (stories.length === 0) return null;

  return (
    <div className="mb-20 group/feed">
      <div className="flex items-center gap-6 mb-10 overflow-hidden">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary font-black whitespace-nowrap">
          {label}
        </h4>
        <motion.div 
          initial={{ x: '-100%' }}
          whileInView={{ x: '100%' }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" 
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {stories.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <NewsCard story={story} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
