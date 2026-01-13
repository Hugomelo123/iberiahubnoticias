import { Layout } from '@/components/editorial/Layout';
import { HeroStory } from '@/components/editorial/HeroStory';
import { BriefingBlock } from '@/components/editorial/BriefingBlock';
import { FeedGroup } from '@/components/editorial/FeedGroup';
import { stories, briefingItems } from '@/lib/mockData';

export default function Noticias() {
  const mainStory = stories[0];
  const feedStories = stories.slice(1);

  // Simple grouping logic for demo
  const todayStories = feedStories.filter(s => s.time.includes('hora') || s.time.includes('minuto'));
  const yesterdayStories = feedStories.filter(s => s.time.includes('Ontem'));

  return (
    <Layout>
      <header className="mb-12 md:mb-20">
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-2">
          IberiaHub <span className="italic text-primary font-normal">Notícias</span>
        </h1>
        <p className="text-muted-foreground text-lg font-light">
          A edição de hoje no CS português.
        </p>
      </header>

      {/* ACT 1: Highlight */}
      <section>
        <HeroStory story={mainStory} />
      </section>

      {/* ACT 2: Briefing */}
      <section>
        <BriefingBlock items={briefingItems} />
      </section>

      {/* ACT 3: Feed */}
      <section>
        <FeedGroup label="Hoje" stories={todayStories} />
        <FeedGroup label="Ontem" stories={yesterdayStories} />
      </section>
      
      <footer className="mt-20 pt-10 border-t border-border text-center text-muted-foreground text-sm font-mono">
        <p>IberiaHub Notícias © 2026</p>
        <p className="opacity-50 mt-1">Curadoria diária.</p>
      </footer>
    </Layout>
  );
}
