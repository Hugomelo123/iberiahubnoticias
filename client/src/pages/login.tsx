import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import { login } from '@/lib/api';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    
    try {
      await login(password);
      setLocation('/admin');
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <img src="/logo.png" alt="IberiaHub Logo" className="w-24 h-24 object-contain mx-auto mb-6 block" />
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Acesso Restrito</h1>
          <p className="text-slate-500 text-sm">Identifique-se para entrar no Editor Hub.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input 
              type="password"
              placeholder="Password pessoal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center tracking-widest`}
              autoFocus
            />
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 right-0 text-red-500 text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-1"
              >
                <ShieldAlert className="w-3 h-3" /> Password incorreta
              </motion.div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all group"
          >
            Entrar no Sistema
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-8 text-center text-slate-700 text-[10px] font-mono uppercase tracking-[0.2em]">
          IberiaHub Security Protocol v4.0
        </p>
      </motion.div>
    </div>
  );
}
