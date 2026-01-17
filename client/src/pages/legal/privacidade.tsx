import { Layout } from '@/components/editorial/Layout';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="pt-32 px-8 max-w-4xl mx-auto mb-32 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[120px] pointer-events-none" />
        
        <Link href="/noticias">
          <span className="inline-flex items-center text-white/40 hover:text-primary transition-colors text-xs font-mono uppercase tracking-[0.2em] mb-12 cursor-pointer group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar ao Journal
          </span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <header className="relative">
            <div className="h-px w-24 bg-primary mb-8" />
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-none">Política de <span className="italic text-primary font-light">Privacidade</span></h1>
            <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em]">Protocolo de Dados V4.0 // 2026</p>
          </header>

          <section className="space-y-12 text-white/70 font-serif text-xl leading-relaxed">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group">
              <h2 className="text-white font-bold text-2xl tracking-tight mb-4 group-hover:text-primary transition-colors">01. Integridade Digital</h2>
              <p>
                No IberiaHub, tratamos a tua privacidade com o mesmo rigor que aplicamos à nossa análise tática. Não vendemos dados, não rastreamos de forma invasiva. O nosso compromisso é com a transparência absoluta.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group">
              <h2 className="text-white font-bold text-2xl tracking-tight mb-4 group-hover:text-primary transition-colors">02. Armazenamento Local</h2>
              <p>
                Utilizamos tecnologia de LocalStorage para garantir que a tua experiência no Journal é personalizada e persistente. Isso inclui as tuas preferências de leitura e, no caso da nossa equipa, as sessões de edição do IH.Editor.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group">
              <h2 className="text-white font-bold text-2xl tracking-tight mb-4 group-hover:text-primary transition-colors">03. Direitos do Leitor</h2>
              <p>
                Tens o direito total de limpar os teus dados de navegação a qualquer momento. O IberiaHub funciona como um terminal de informação limpo, focado exclusivamente no Counter-Strike ibérico.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </Layout>
  );
}
