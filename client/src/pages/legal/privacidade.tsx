import { Layout } from '@/components/editorial/Layout';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">Política de Privacidade</h1>
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Última atualização: 17 de Janeiro, 2026</p>
          </header>

          <section className="prose prose-invert max-w-none space-y-8 text-white/60 font-serif text-lg leading-relaxed">
            <p>
              No IberiaHub, a privacidade dos nossos leitores é fundamental. Esta política descreve como lidamos com a informação no nosso protótipo editorial.
            </p>
            <h2 className="text-white font-bold text-2xl tracking-tight">1. Dados Recolhidos</h2>
            <p>
              Atualmente, como plataforma editorial de curadoria, não recolhemos dados pessoais sensíveis. Apenas utilizamos armazenamento local (LocalStorage) para as tuas preferências de leitura e sessões de edição no painel administrativo.
            </p>
            <h2 className="text-white font-bold text-2xl tracking-tight">2. Cookies e Rastreamento</h2>
            <p>
              Não utilizamos cookies de terceiros para fins publicitários. O nosso foco é puramente a experiência de leitura e análise do Counter-Strike ibérico.
            </p>
            <h2 className="text-white font-bold text-2xl tracking-tight">3. Segurança</h2>
            <p>
              O acesso ao nosso painel editorial é protegido por protocolos de segurança internos, garantindo que a integridade da nossa linha editorial permanece intacta.
            </p>
          </section>
        </motion.div>
      </div>
    </Layout>
  );
}
