import { Layout } from '@/components/editorial/Layout';
import { stories } from '@/lib/mockData';
import { useRoute, Link } from 'wouter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark, User, Clock, ChevronRight } from 'lucide-react';
import NotFound from './not-found';

export default function Article() {
  const [match, params] = useRoute('/noticias/:slug');
  const story = stories.find(s => s.slug === params?.slug);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  if (!story) return <NotFound />;

  return (
    <Layout>
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[110] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="mb-12 flex justify-between items-center relative z-10">
        <Link href="/noticias">
          <motion.a 
            whileHover={{ x: -5 }}
            className="inline-flex items-center text-white/40 hover:text-primary transition-colors text-xs font-mono uppercase tracking-[0.2em] group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Journal
          </motion.a>
        </Link>
        
        <div className="flex items-center gap-4 group">
          <div className="text-right">
            <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1 group-hover:text-primary transition-colors">{story.author.name}</p>
            <p className="text-[9px] text-white/30 uppercase tracking-tighter font-mono">{story.author.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
            <User className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>

      <motion.article 
        style={{ opacity, scale }}
        className="max-w-4xl mx-auto mb-20"
      >
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-8 text-[10px] font-mono text-primary uppercase tracking-[0.3em]">
            <span className="px-2 py-0.5 rounded border border-primary/30 bg-primary/5">{story.type}</span>
            <div className="flex items-center gap-2 text-white/30">
              <Clock className="w-3 h-3" />
              {story.time}
            </div>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.05] text-white mb-8 tracking-tighter">
            {story.title}
          </h1>

          <div className="flex items-center gap-6">
             <div className="h-px bg-white/10 flex-1" />
             <div className="flex gap-2">
                <button className="p-3 rounded-full bg-white/5 border border-white/5 hover:border-primary/30 text-white/40 hover:text-primary transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-3 rounded-full bg-white/5 border border-white/5 hover:border-primary/30 text-white/40 hover:text-primary transition-all">
                  <Bookmark className="w-4 h-4" />
                </button>
             </div>
          </div>
        </header>

        {story.image && (
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] relative group"
          >
            <img src={story.image} alt={story.title} className="w-full h-auto grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </motion.div>
        )}

        <div className="grid lg:grid-cols-12 gap-12 relative">
          <div className="lg:col-span-8 space-y-16">
            <section className="relative">
              <div className="absolute -left-8 top-0 text-primary/20 font-serif text-6xl select-none leading-none">“</div>
              <p className="text-2xl md:text-3xl leading-relaxed text-white/90 font-serif italic">
                {story.content?.block1 || story.whatHappened}
              </p>
            </section>

            <div className="h-px bg-gradient-to-r from-primary/20 to-transparent w-full" />

            <section className="space-y-6">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary/60 font-black">
                Análise IH.
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/50 font-light">
                {story.content?.block2 || story.whyItMatters}
              </p>
            </section>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8">
            {story.content?.hubLink && (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl -mr-12 -mt-12" />
                <span className="text-[9px] font-mono uppercase text-primary tracking-widest block mb-4">Inside the Hub</span>
                <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-tight">Mais dados sobre {story.entity}</h4>
                <button className="w-full flex items-center justify-between group/btn bg-white text-black px-4 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                  {story.content.hubLink.text}
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
            
            <div className="p-6 border-l border-white/5 space-y-4 opacity-40 hover:opacity-100 transition-opacity">
               <p className="text-[9px] font-mono uppercase tracking-[0.3em]">Editoria Protocol V4</p>
               <p className="text-xs italic leading-relaxed">Este conteúdo foi verificado pela nossa equipa editorial em Lisboa.</p>
            </div>
          </aside>
        </div>
      </motion.article>
    </Layout>
  );
}
