import { Story } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { Link } from 'wouter';

interface HeroStoryProps {
  story: Story;
}

export function HeroStory({ story }: HeroStoryProps) {
  return (
    <Link href={`/noticias/${story.slug}`}>
      <div className="group cursor-pointer relative mb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7 relative">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="aspect-[16/9] w-full overflow-hidden rounded-2xl relative bg-muted ring-1 ring-white/10 shadow-2xl"
            >
              {story.image ? (
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:blur-[2px] opacity-80 group-hover:opacity-100"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-background" />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
                    {story.entity}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-white/60 font-mono uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    {story.time}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Ambient Glow behind image */}
            <div className="absolute -inset-4 bg-primary/10 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-serif text-4xl md:text-6xl font-bold leading-[1.1] text-white group-hover:text-primary transition-colors duration-500">
                {story.title}
              </h2>
            </motion.div>
            
            <div className="space-y-6 text-muted-foreground">
              <p className="text-xl md:text-2xl text-white/80 font-serif leading-relaxed italic">
                "{story.whatHappened}"
              </p>
              
              <div className="flex items-center gap-4 py-4 border-y border-white/5">
                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary/60" />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-white tracking-widest uppercase">{story.author.name}</p>
                    <p className="text-[10px] text-primary/60 font-mono">{story.author.role}</p>
                 </div>
              </div>

              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 text-primary font-mono text-xs tracking-[0.3em] uppercase pt-2"
              >
                Explorar narrativa <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
