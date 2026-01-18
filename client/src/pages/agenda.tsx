import { useState, useEffect } from 'react';
import { Layout } from '@/components/editorial/Layout';
import { getMatches } from '@/lib/api';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Tv, Mic2, ExternalLink, Calendar, Radio } from 'lucide-react';

export default function Agenda() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatches() {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (err) {
        console.error("Erro ao carregar matches:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-primary animate-pulse">A carregar agenda...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <nav className="fixed top-0 left-0 right-0 h-20 border-b border-white/5 bg-background/50 backdrop-blur-2xl z-[100] px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/noticias">
            <div className="flex items-center gap-3 group cursor-pointer">
              <img src="/logo.png" alt="IberiaHub Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform block" />
              <span className="font-serif text-2xl font-bold tracking-tighter hover:text-primary transition-colors text-white">IH.</span>
            </div>
          </Link>
        </div>
        
        <Link href="/noticias">
          <span className="inline-flex items-center text-white/40 hover:text-primary transition-colors text-xs font-mono uppercase tracking-[0.2em] group cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </span>
        </Link>
      </nav>

      <div className="pt-32 px-8 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={{ 
                boxShadow: ["0 0 20px rgba(var(--primary), 0.3)", "0 0 40px rgba(var(--primary), 0.5)", "0 0 20px rgba(var(--primary), 0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-4 rounded-2xl bg-primary/10 border border-primary/20"
            >
              <Tv className="w-8 h-8 text-primary" />
            </motion.div>
            <div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white tracking-tighter mb-2">
                Broadcast Center
              </h1>
              <p className="text-muted-foreground font-mono text-sm tracking-wider">
                Acompanha todos os diretos e a agenda ibérica em tempo real
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl bg-card/20 border border-white/5"
            >
              <div className="text-3xl font-bold text-white mb-1">{matches.length}</div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Total Jogos</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl bg-card/20 border border-white/5"
            >
              <div className="text-3xl font-bold text-red-500 mb-1">{matches.filter(m => m.isLive).length}</div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Live Agora</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl bg-card/20 border border-white/5"
            >
              <div className="text-3xl font-bold text-primary mb-1">{matches.filter(m => !m.isLive).length}</div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Agendados</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl bg-card/20 border border-white/5"
            >
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Cobertura PT</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Live Matches Section */}
        {matches.filter(m => m.isLive).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Radio className="w-5 h-5 text-red-500" />
              </motion.div>
              <h2 className="font-serif text-3xl font-bold text-white tracking-tighter">Em Direto</h2>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20"
              >
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live Now</span>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {matches.filter(m => m.isLive).map((match, index) => (
                <MatchCard key={match.id} match={match} isLive delay={0.7 + index * 0.1} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Upcoming Matches Section */}
        {matches.filter(m => !m.isLive).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-3xl font-bold text-white tracking-tighter">Próximos Jogos</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {matches.filter(m => !m.isLive).map((match, index) => (
                <MatchCard key={match.id} match={match} delay={0.9 + index * 0.1} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40"
        >
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-mono">AGENDA_SINCRONIZADA_V4</span>
          </div>
          <div className="text-xs font-mono">IBERIAHUB_BROADCAST_SYSTEM</div>
          <div className="text-xs font-mono">UPDATED_REALTIME</div>
        </motion.div>
      </div>
    </Layout>
  );
}

function MatchCard({ match, isLive = false, delay = 0 }: { match: any, isLive?: boolean, delay?: number }) {
  return (
    <motion.a
      href={match.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ 
        y: -8, 
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
      }}
      whileTap={{ scale: 0.98 }}
      className="block p-6 rounded-2xl bg-card/20 border border-white/5 hover:border-primary/30 transition-all group overflow-hidden relative"
    >
      {/* Hover Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

      {/* Live Indicator Bar */}
      {match.isLive && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 left-0 w-full h-1 overflow-hidden"
        >
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-red-500 to-transparent"
          />
        </motion.div>
      )}

      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg">
          {match.competition}
        </span>
        {match.isLive ? (
          <motion.span 
            initial={{ opacity: 0.8 }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live</span>
          </motion.span>
        ) : (
          <span className="text-[10px] font-mono text-muted-foreground border border-white/10 px-3 py-1 rounded-lg uppercase tracking-tighter">
            {match.time}
          </span>
        )}
      </div>

      <div className="mb-6 relative z-10">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex-1 text-3xl font-bold text-white tracking-tighter">
            {match.teamA}
          </div>
        </div>
        <div className="flex items-center justify-center my-3">
          <span className="text-primary/40 mx-2 font-serif italic text-2xl font-normal">vs</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-3xl font-bold text-white tracking-tighter">
            {match.teamB}
          </div>
        </div>
      </div>

      {match.caster && (
        <div className="flex items-center gap-3 pt-4 border-t border-white/5 relative z-10">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Mic2 className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest leading-none mb-1 opacity-60">Voz do Jogo</span>
            <span className="text-base text-white font-semibold leading-none group-hover:text-primary transition-colors">{match.caster}</span>
          </div>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </motion.div>
        </div>
      )}
    </motion.a>
  );
}
