import { Story } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'wouter';

interface HeroStoryProps {
  story: Story;
}

export function HeroStory({ story }: HeroStoryProps) {
  return (
    <Link href={`/noticias/${story.slug}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group cursor-pointer relative mb-16"
      >
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          <div className="lg:col-span-7 aspect-[16/9] w-full overflow-hidden rounded-md relative bg-muted">
            {story.image ? (
              <img 
                src={story.image} 
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent to-background" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-white/80">
              <div className="flex items-center gap-2">
                <span className="bg-primary px-2 py-0.5 rounded text-white">{story.entity}</span>
                <span>{story.time}</span>
              </div>
              <div className="h-4 w-px bg-white/20 hidden md:block" />
              <div className="hidden md:flex items-center gap-2">
                <span className="text-white/60 lowercase italic">por</span>
                <span className="text-white font-bold">{story.author.name}</span>
              </div>
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="lg:col-span-5 space-y-4"
          >
            <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-white group-hover:text-primary/90 transition-colors">
              {story.title}
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <div className="space-y-3">
                <motion.p 
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed"
                >
                  <span className="text-primary/70 mr-2">●</span>
                  {story.whatHappened}
                </motion.p>
                <p className="text-sm md:text-base font-mono text-muted-foreground border-l-2 border-primary/20 pl-4 py-1 leading-relaxed italic">
                  {story.whyItMatters}
                </p>
              </div>
              
              <div className="flex items-center text-primary text-sm font-medium opacity-80 group-hover:opacity-100 transition-all transform group-hover:translate-x-3">
                <span className="relative overflow-hidden group/link px-1">
                  Ler estória completa
                  <span className="absolute bottom-0 left-0 w-full h-px bg-primary transform translate-x-[-100%] group-hover/link:translate-x-0 transition-transform duration-300" />
                </span>
                <ArrowRight className="ml-2 w-4 h-4 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
