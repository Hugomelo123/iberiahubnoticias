import { Layout } from '@/components/editorial/Layout';
import { HeroStory } from '@/components/editorial/HeroStory';
import { BriefingBlock } from '@/components/editorial/BriefingBlock';
import { FeedGroup } from '@/components/editorial/FeedGroup';
import { MatchesWidget } from '@/components/editorial/MatchesWidget';
import { stories, briefingItems, liveMatches } from '@/lib/mockData';
import { Link } from 'wouter';
import { LayoutDashboard, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Noticias() {
  const mainStory = stories[0];
  const feedStories = stories.slice(1);

  const todayStories = feedStories.filter(s => s.time.includes('hora') || s.time.includes('minuto'));
  const yesterdayStories = feedStories.filter(s => s.time.includes('Ontem'));

  return (
    <Layout>
      <nav className="fixed top-0 left-0 right-0 h-20 border-b border-white/5 bg-background/50 backdrop-blur-2xl z-[100] px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
           <Link href="/noticias">
             <span className="font-serif text-2xl font-bold tracking-tighter hover:text-primary transition-colors cursor-pointer text-white">IH.</span>
           </Link>
        </div>
        
        <div className="flex items-center gap-4">
           <button className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-primary transition-all">
              <Bell className="w-5 h-5" />
           </button>
           <Link href="/admin">
            <motion.span 
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="p-2 rounded-full bg-primary/10 text-primary border border-primary/20 transition-all cursor-pointer inline-flex items-center justify-center"
            >
              <LayoutDashboard className="w-5 h-5" />
            </motion.span>
          </Link>
        </div>
      </nav>

      <div className="pt-24">
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6 group">
              IberiaHub <span className="text-primary italic font-light block md:inline-block relative">
                Notícias
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute -bottom-2 left-0 h-1 bg-primary/20 rounded-full"
                />
              </span>
            </h1>
            <p className="text-white/40 text-xl font-light leading-relaxed border-l border-primary/30 pl-6">
              A curadoria definitiva do Counter-Strike ibérico. <br/>
              Edição de <span className="text-white font-medium">14 de Janeiro, 2026</span>.
            </p>
          </motion.div>
        </header>

        <section>
          <HeroStory story={mainStory} />
        </section>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <section className="lg:col-span-8 space-y-24">
            <FeedGroup label="Destaques de Hoje" stories={todayStories} />
            <FeedGroup label="Arquivo Recente" stories={yesterdayStories} />
          </section>

          <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-12">
            <MatchesWidget matches={liveMatches} />
            <BriefingBlock items={briefingItems} />
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] -mr-16 -mt-16 group-hover:bg-primary/30 transition-colors" />
              <h4 className="font-serif text-2xl mb-4 italic text-white">The Insider</h4>
              <p className="text-sm text-white/50 leading-relaxed mb-6 font-light">
                O meta português, analisado pelos nossos especialistas e entregue no teu terminal.
              </p>
              <button className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all rounded-lg">
                Subscrever Agora
              </button>
            </motion.div>
          </aside>
        </div>
      </div>
      
      <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] pb-16">
        <p>© 2026 IberiaHub Media Group</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
          <a href="#" className="hover:text-primary transition-colors">Termos</a>
          <a href="#" className="hover:text-primary transition-colors">Redação</a>
        </div>
      </footer>
    </Layout>
  );
}
