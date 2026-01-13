import { Layout } from '@/components/editorial/Layout';
import { stories } from '@/lib/mockData';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';
import NotFound from './not-found';

export default function Article() {
  const [match, params] = useRoute('/noticias/:slug');
  const story = stories.find(s => s.slug === params?.slug);

  if (!story) return <NotFound />;

  return (
    <Layout>
      <div className="mb-8">
        <Link href="/noticias">
          <a className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar à edição
          </a>
        </Link>
      </div>

      <motion.article 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex justify-center items-center gap-3 mb-6 text-sm font-mono text-primary/80 uppercase tracking-widest">
            <span>{story.type}</span>
            <span className="w-1 h-1 bg-current rounded-full" />
            <span>{story.time}</span>
            <span className="w-1 h-1 bg-current rounded-full" />
            <span>{story.entity}</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
            {story.title}
          </h1>

          <div className="flex justify-center gap-4">
             <button className="p-2 rounded-full hover:bg-card text-muted-foreground hover:text-foreground transition-colors">
               <Share2 className="w-5 h-5" />
             </button>
             <button className="p-2 rounded-full hover:bg-card text-muted-foreground hover:text-foreground transition-colors">
               <Bookmark className="w-5 h-5" />
             </button>
          </div>
        </header>

        {story.image && (
          <div className="mb-12 rounded-lg overflow-hidden border border-border/20 shadow-2xl">
            <img src={story.image} alt={story.title} className="w-full h-auto" />
            <div className="bg-card/50 p-2 text-center text-xs text-muted-foreground italic">
              Fotografia de arquivo / Ilustração
            </div>
          </div>
        )}

        {/* Content Blocks */}
        <div className="space-y-12 relative">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block -ml-8 opacity-30" />

          {/* Block 1: O Que Aconteceu */}
          <section>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              O que aconteceu
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-serif">
              {story.content?.block1 || story.whatHappened}
            </p>
          </section>

          <div className="h-px bg-border/40 w-1/2 mx-auto" />

          {/* Block 2: Porque Importa */}
          <section>
            <h3 className="font-mono text-xs uppercase tracking-widest text-primary/80 mb-4">
              Porque importa
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {story.content?.block2 || story.whyItMatters}
            </p>
          </section>

          {/* Block 3: Ligação */}
          {story.content?.hubLink && (
            <section className="bg-card border border-border rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-muted-foreground block mb-1">
                  Explorar no Hub
                </span>
                <span className="font-medium text-foreground">
                  Mais sobre {story.entity}
                </span>
              </div>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                {story.content.hubLink.text}
              </button>
            </section>
          )}
        </div>
      </motion.article>
    </Layout>
  );
}
