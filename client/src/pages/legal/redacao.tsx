import { Layout } from '@/components/editorial/Layout';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Mail, Twitter, Linkedin } from 'lucide-react';

export default function Redacao() {
  const staff = [
    { name: "Ricardo 'vts' Moreira", role: "Editor-Chefe", bio: "Veterano da scene nacional com foco em análise tática." },
    { name: "Gonçalo 'Pizituh' Pinto", role: "Repórter", bio: "Especialista em transferências e scouting ibérico." },
    { name: "Redação IberiaHub", role: "Equipa Editorial", bio: "O coração do jornalismo de CS2 na Península Ibérica." }
  ];

  return (
    <Layout>
      <div className="pt-32 px-8 max-w-5xl mx-auto mb-32">
        <Link href="/noticias">
          <span className="inline-flex items-center text-white/40 hover:text-primary transition-colors text-xs font-mono uppercase tracking-[0.2em] mb-12 cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Journal
          </span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-20"
        >
          <header className="max-w-2xl">
            <h1 className="font-serif text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-none">A Nossa <span className="italic text-primary font-light">Redação</span></h1>
            <p className="text-white/60 font-serif text-xl leading-relaxed">
              Comprometidos com a verdade, a análise profunda e o crescimento do ecossistema competitivo de Counter-Strike em Portugal e Espanha.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-primary font-bold">{member.name[0]}</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-primary/60 text-[10px] font-mono uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-white/40 text-sm leading-relaxed mb-6 font-serif">{member.bio}</p>
                <div className="flex gap-4">
                  <Twitter className="w-4 h-4 text-white/20 hover:text-primary transition-colors cursor-pointer" />
                  <Linkedin className="w-4 h-4 text-white/20 hover:text-primary transition-colors cursor-pointer" />
                </div>
              </motion.div>
            ))}
          </div>

          <section className="bg-primary/5 border border-primary/10 rounded-3xl p-12 text-center space-y-6">
            <h2 className="font-serif text-3xl text-white font-bold italic">Queres colaborar?</h2>
            <p className="text-white/60 max-w-xl mx-auto font-serif">
              Estamos sempre à procura de vozes apaixonadas pelo CS ibérico. Envia o teu portfólio para a nossa equipa.
            </p>
            <button className="inline-flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">
              <Mail className="w-4 h-4" /> Contactar Redação
            </button>
          </section>
        </motion.div>
      </div>
    </Layout>
  );
}
