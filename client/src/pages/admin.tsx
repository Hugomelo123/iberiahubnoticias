import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Plus, LayoutDashboard, FileText, Image as ImageIcon, CheckCircle2, User, Eye, History, Settings, LogOut } from 'lucide-react';
import { stories as initialStories } from '@/lib/mockData';
import { useLocation } from 'wouter';

export default function EditorPanel() {
  const [stories, setStories] = useState(initialStories);
  const [activeStory, setActiveStory] = useState(initialStories[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [, setLocation] = useLocation();

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isEditor');
    setLocation('/login');
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-400 font-sans flex overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Modern Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-[#08080a] flex flex-col relative z-10">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.3)]">
              <LayoutDashboard className="w-5 h-5 text-black" />
            </div>
            <h1 className="font-serif text-xl font-bold text-white tracking-tighter">
              IH.<span className="italic text-primary">Editor</span>
            </h1>
          </div>

          <nav className="space-y-8">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 px-2">Narrativas</div>
              <div className="space-y-1">
                {stories.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => setActiveStory(s)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-3 group ${activeStory.id === s.id ? 'bg-primary text-black shadow-[0_10px_20px_rgba(var(--primary),0.2)]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
                  >
                    <FileText className={`w-4 h-4 ${activeStory.id === s.id ? 'text-black' : 'text-primary/40 group-hover:text-primary transition-colors'}`} />
                    <span className="truncate">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 px-2">Sistema</div>
              <div className="space-y-1">
                <button className="w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white/40 hover:bg-white/5 hover:text-white transition-all flex items-center gap-3">
                  <History className="w-4 h-4 text-white/20" /> Logs de Edição
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white/40 hover:bg-white/5 hover:text-white transition-all flex items-center gap-3">
                  <Settings className="w-4 h-4 text-white/20" /> Configurações
                </button>
              </div>
            </div>
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Terminar Sessão
          </button>
        </div>
      </aside>

      {/* Main Editing Area */}
      <main className="flex-1 overflow-y-auto relative z-10 bg-gradient-to-b from-transparent to-[#0a0a0c]/50">
        <header className="h-24 border-b border-white/5 bg-[#08080a]/50 backdrop-blur-3xl sticky top-0 z-20 px-12 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 block mb-1">Ficheiro Ativo</span>
            <h2 className="text-white font-serif text-lg italic">{activeStory.title}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white border border-white/5 transition-all">
              <Eye className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary text-black px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(var(--primary),0.2)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSaving ? 'Processando...' : 'Publicar Edição'}
            </button>
          </div>
        </header>

        <div className="p-16 max-w-5xl mx-auto space-y-16 pb-32">
          {/* Header Edit */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 text-white/20">
               <span className="text-[10px] font-black uppercase tracking-[0.5em]">01</span>
               <div className="h-px flex-1 bg-white/5" />
               <span className="text-[10px] font-mono uppercase tracking-widest">Headline & Slug</span>
            </div>
            <input 
              type="text" 
              value={activeStory.title}
              onChange={(e) => setActiveStory({...activeStory, title: e.target.value})}
              className="w-full bg-transparent border-none p-0 text-6xl font-serif font-bold text-white focus:ring-0 placeholder:text-white/10"
              placeholder="Título da Narrativa..."
            />
          </section>

          {/* Meta Edit */}
          <section className="grid md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Responsável</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  value={activeStory.author.name}
                  onChange={(e) => setActiveStory({...activeStory, author: {...activeStory.author, name: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Cargo Editorial</label>
              <input 
                type="text" 
                value={activeStory.author.role}
                onChange={(e) => setActiveStory({...activeStory, author: {...activeStory.author, role: e.target.value}})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Entidade Focal</label>
              <input 
                type="text" 
                value={activeStory.entity}
                onChange={(e) => setActiveStory({...activeStory, entity: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Categorização</label>
              <select 
                value={activeStory.type}
                onChange={(e) => setActiveStory({...activeStory, type: e.target.value as any})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none appearance-none"
              >
                <option value="match">Match Protocol</option>
                <option value="transfer">Market Analysis</option>
                <option value="news">Journal Entry</option>
                <option value="interview">Exclusive</option>
              </select>
            </div>
          </section>

          {/* Body Edit */}
          <section className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white/20">
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">02</span>
                 <div className="h-px flex-1 bg-white/5" />
                 <span className="text-[10px] font-mono uppercase tracking-widest">Narrative Blocks</span>
              </div>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-primary/60">Bloco 01: O Acontecimento</label>
                   <textarea 
                    value={activeStory.content?.block1 || activeStory.whatHappened}
                    onChange={(e) => {
                      if (activeStory.content) {
                        setActiveStory({...activeStory, content: {...activeStory.content, block1: e.target.value}});
                      } else {
                        setActiveStory({...activeStory, whatHappened: e.target.value});
                      }
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-xl font-serif italic text-white/90 focus:border-primary/50 transition-all outline-none min-h-[300px] leading-relaxed"
                  />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Bloco 02: A Análise</label>
                   <textarea 
                    value={activeStory.content?.block2 || activeStory.whyItMatters}
                    onChange={(e) => {
                      if (activeStory.content) {
                        setActiveStory({...activeStory, content: {...activeStory.content, block2: e.target.value}});
                      } else {
                        setActiveStory({...activeStory, whyItMatters: e.target.value});
                      }
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-sm font-mono text-slate-400 focus:border-primary/50 transition-all outline-none min-h-[300px] leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Media Edit */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 text-white/20">
               <span className="text-[10px] font-black uppercase tracking-[0.5em]">03</span>
               <div className="h-px flex-1 bg-white/5" />
               <span className="text-[10px] font-mono uppercase tracking-widest">Digital Assets</span>
            </div>
            {/* ... existing media edit ... */}
          </section>

          {/* Matches & Agenda Management (New) */}
          <section className="space-y-12 pt-12 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-white/20">
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">04</span>
                <div className="h-px w-32 bg-white/5" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Agenda & Casters</span>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" /> Adicionar Jogo
              </button>
            </div>

            <div className="grid gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white/20 uppercase mb-1">Confronto</span>
                    <span className="text-white font-bold tracking-tighter">SAW vs G2</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white/20 uppercase mb-1">Voz do Jogo</span>
                    <span className="text-white font-bold tracking-tighter">Zorlak</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white/20 uppercase mb-1">Estado</span>
                    <span className="text-red-500 font-black text-[10px] uppercase tracking-widest animate-pulse">Em Direto</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/5 text-white/20 hover:text-white transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Modern Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-12 right-12 bg-primary text-black px-8 py-5 rounded-2xl shadow-[0_20px_50px_rgba(var(--primary),0.4)] flex items-center gap-4 z-[100]"
          >
            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Successo</span>
              <span className="text-sm font-bold tracking-tight">Narrativa publicada no Journal.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
