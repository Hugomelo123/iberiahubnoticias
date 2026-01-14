import { Layout } from '@/components/editorial/Layout';
import { HeroStory } from '@/components/editorial/HeroStory';
import { BriefingBlock } from '@/components/editorial/BriefingBlock';
import { FeedGroup } from '@/components/editorial/FeedGroup';
import { MatchesWidget } from '@/components/editorial/MatchesWidget';
import { stories, briefingItems, liveMatches } from '@/lib/mockData';
import { Link } from 'wouter';
import { LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Noticias() {
  const mainStory = stories[0];
  const feedStories = stories.slice(1);

  // Simple grouping logic for demo
  const todayStories = feedStories.filter(s => s.time.includes('hora') || s.time.includes('minuto'));
  const yesterdayStories = feedStories.filter(s => s.time.includes('Ontem'));

  return (
    <Layout>
      <header className="mb-12 md:mb-20 flex justify-between items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-2">
            IberiaHub <span className="italic text-primary font-normal">Notícias</span>
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            A edição de hoje no CS português.
          </p>
        </motion.div>
        <Link href="/admin">
          <motion.a 
            whileHover={{ rotate: 90, scale: 1.1 }}
            className="p-2 rounded-full hover:bg-white/5 text-muted-foreground transition-colors cursor-pointer" 
            title="Painel de Editor"
          >
            <LayoutDashboard className="w-6 h-6" />
          </motion.a>
        </Link>
      </header>

      {/* ACT 1: Highlight */}
      <section className="mb-20">
        <HeroStory story={mainStory} />
      </section>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* ACT 3: Feed - Occupies 2/3 on Desktop */}
        <section className="lg:col-span-2 order-2 lg:order-1">
          <FeedGroup label="Hoje" stories={todayStories} />
          <FeedGroup label="Ontem" stories={yesterdayStories} />
        </section>

        {/* ACT 2: Briefing - Becomes a Sidebar on Desktop */}
        <section className="lg:col-span-1 order-1 lg:order-2 lg:sticky lg:top-24">
          <MatchesWidget matches={liveMatches} />
          <BriefingBlock items={briefingItems} />
          
          <div className="hidden lg:block p-6 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
            <h4 className="font-serif text-lg mb-2 italic">IberiaHub Insider</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Recebe a edição diretamente no teu terminal. A curadoria que define o meta português.
            </p>
            <button className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-mono transition-colors">
              SUBSCREVER_FEED
            </button>
          </div>
        </section>
      </div>
      
      <footer className="mt-20 pt-10 border-t border-border text-center text-muted-foreground text-sm font-mono">
        <p>IberiaHub Notícias © 2026</p>
        <p className="opacity-50 mt-1">Curadoria diária.</p>
      </footer>
    </Layout>
  );
}
