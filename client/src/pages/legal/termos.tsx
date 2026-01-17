import { Layout } from '@/components/editorial/Layout';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <Layout>
      <div className="pt-32 px-8 max-w-4xl mx-auto mb-32">
        <Link href="/noticias">
          <span className="inline-flex items-center text-white/40 hover:text-primary transition-colors text-xs font-mono uppercase tracking-[0.2em] mb-12 cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Journal
          </span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <header>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">Termos de Serviço</h1>
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Protocolo Editorial V4.0</p>
          </header>

          <section className="prose prose-invert max-w-none space-y-8 text-white/60 font-serif text-lg leading-relaxed">
            <p>
              Ao aceder ao IberiaHub Notícias, concordas com os nossos termos de utilização desenhados para proteger a integridade do jornalismo de esports.
            </p>
            <h2 className="text-white font-bold text-2xl tracking-tight">1. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo, análises e "Voz do Jogo" são propriedade exclusiva do IberiaHub Media Group, a menos que indicado o contrário. A reprodução sem citação é estritamente proibida.
            </p>
            <h2 className="text-white font-bold text-2xl tracking-tight">2. Uso do Conteúdo</h2>
            <p>
              O conteúdo do IberiaHub destina-se a fins informativos e de entretenimento dentro da comunidade de Counter-Strike.
            </p>
            <h2 className="text-white font-bold text-2xl tracking-tight">3. Modificações</h2>
            <p>
              Reservamos o direito de atualizar a nossa linha editorial e funcionalidades da plataforma para melhor servir o cenário ibérico.
            </p>
          </section>
        </motion.div>
      </div>
    </Layout>
  );
}
