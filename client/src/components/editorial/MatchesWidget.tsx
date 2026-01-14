import { MatchLive } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { Tv, Mic2, ExternalLink } from 'lucide-react';

interface MatchesWidgetProps {
  matches: MatchLive[];
}

export function MatchesWidget({ matches }: MatchesWidgetProps) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg italic text-foreground">Jogos e Casters</h3>
        <Tv className="w-4 h-4 text-primary opacity-50" />
      </div>

      <div className="space-y-3">
        {matches.map((match) => (
          <motion.a
            key={match.id}
            href={match.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className="block p-4 rounded-lg bg-card/30 border border-white/5 hover:border-primary/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                {match.competition}
              </span>
              {match.isLive && (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live</span>
                </span>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex-1 text-sm font-bold text-white tracking-tight">
                {match.teamA} <span className="text-primary mx-1">vs</span> {match.teamB}
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                {match.isLive ? 'Agora' : match.time}
              </div>
            </div>

            {match.caster && (
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <Mic2 className="w-3 h-3 text-primary/60" />
                <span className="text-[10px] text-muted-foreground">Caster: <span className="text-white/80">{match.caster}</span></span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-40 transition-opacity" />
              </div>
            )}
          </motion.a>
        ))}
      </div>
    </div>
  );
}
