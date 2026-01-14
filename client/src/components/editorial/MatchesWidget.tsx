import { MatchLive } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, Mic2, ExternalLink, X, Calendar } from 'lucide-react';
import { useState } from 'react';

interface MatchesWidgetProps {
  matches: MatchLive[];
}

export function MatchesWidget({ matches }: MatchesWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const displayMatches = matches.slice(0, 2);

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg italic text-foreground">Jogos e Casters</h3>
        <Tv className="w-4 h-4 text-primary opacity-50" />
      </div>

      <div className="space-y-3">
        {displayMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {matches.length > 2 && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full py-2.5 text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors border border-dashed border-white/10 rounded-lg hover:border-primary/30 uppercase tracking-[0.2em]"
        >
          Ver agenda completa [+{matches.length - 2}]
        </button>
      )}

      {/* Inovative Full Overlay Agenda */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0c]/95 backdrop-blur-xl p-6 md:p-12 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="font-serif text-4xl font-bold text-white mb-2">Broadcast Center</h2>
                  <p className="text-muted-foreground text-sm font-mono tracking-wider">Acompanha todos os diretos e a agenda ibérica.</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all hover:rotate-90"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {matches.map((match) => (
                  <MatchCard key={match.id} match={match} isLarge />
                ))}
              </div>

              <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5" />
                  <span className="text-xs font-mono">AGENDA_SINCRONIZADA_V4</span>
                </div>
                <div className="text-xs font-mono">IBERIAHUB_BROADCAST_SYSTEM</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MatchCard({ match, isLarge = false }: { match: MatchLive, isLarge?: boolean }) {
  return (
    <motion.a
      href={match.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      className={`block p-4 rounded-xl bg-card/30 border border-white/5 hover:border-primary/20 transition-all group ${isLarge ? 'p-6' : ''}`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          {match.competition}
        </span>
        {match.isLive && (
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live Now</span>
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 mb-4">
        <div className={`flex-1 font-bold text-white tracking-tight ${isLarge ? 'text-2xl' : 'text-base'}`}>
          {match.teamA} <span className="text-primary/40 mx-1 font-serif italic text-lg">vs</span> {match.teamB}
        </div>
        <div className="text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded">
          {match.isLive ? 'Em Direto' : match.time}
        </div>
      </div>

      {match.caster && (
        <div className="flex items-center gap-3 pt-3 border-t border-white/5">
          <div className="p-1.5 rounded bg-primary/10">
            <Mic2 className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter leading-none mb-1">Caster em Estúdio</span>
            <span className="text-sm text-white/90 font-medium leading-none">{match.caster}</span>
          </div>
          <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-40 transition-opacity" />
        </div>
      )}
    </motion.a>
  );
}
