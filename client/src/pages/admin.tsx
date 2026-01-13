import { Layout } from '@/components/editorial/Layout';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, LayoutDashboard, FileText, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { stories as initialStories } from '@/lib/mockData';

export default function EditorPanel() {
  const [stories, setStories] = useState(initialStories);
  const [activeStory, setActiveStory] = useState(initialStories[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0f0f12] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h1 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            Editor Hub
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 px-2">Conteúdo</div>
          {stories.map(s => (
            <button 
              key={s.id}
              onClick={() => setActiveStory(s)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-3 ${activeStory.id === s.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
            >
              <FileText className="w-4 h-4 opacity-70" />
              <span className="truncate">{s.title}</span>
            </button>
          ))}
          <button className="w-full text-left px-3 py-2 rounded-md text-sm text-primary/60 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-3 mt-4">
            <Plus className="w-4 h-4" />
            Nova Edição
          </button>
        </nav>

        <div className="p-4 border-t border-white/5 text-[10px] text-slate-600 font-mono text-center">
          SISTEMA V1.0.4 // PT-PT
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-white/5 bg-[#0f0f12]/50 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Editando: <span className="text-white font-medium">{activeStory.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : <><Save className="w-4 h-4" /> Guardar Alterações</>}
            </button>
          </div>
        </header>

        <div className="p-10 max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Title Section */}
            <section className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Título da Notícia</label>
              <input 
                type="text" 
                value={activeStory.title}
                onChange={(e) => setActiveStory({...activeStory, title: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-2xl font-serif text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </section>

            {/* Meta Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <section className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Entidade Relacionada</label>
                <input 
                  type="text" 
                  value={activeStory.entity}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                />
              </section>
              <section className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Tipo de Conteúdo</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary/50 appearance-none">
                  <option>Match</option>
                  <option>Transfer</option>
                  <option>News</option>
                  <option>Interview</option>
                </select>
              </section>
              <section className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Slug URL</label>
                <input 
                  type="text" 
                  value={activeStory.slug}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm font-mono opacity-60"
                  readOnly
                />
              </section>
            </div>

            {/* Content Blocks */}
            <section className="space-y-6 pt-6 border-t border-white/5">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  O que aconteceu
                  <span className="text-[10px] normal-case font-normal opacity-50">(Headline principal)</span>
                </label>
                <textarea 
                  value={activeStory.content?.block1 || activeStory.whatHappened}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-lg leading-relaxed text-slate-300 focus:outline-none focus:border-primary/50 min-h-[150px]"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Porque importa</label>
                <textarea 
                  value={activeStory.content?.block2 || activeStory.whyItMatters}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-400 focus:outline-none focus:border-primary/50 min-h-[100px]"
                />
              </div>
            </section>

            {/* Media */}
            <section className="pt-6 border-t border-white/5">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-4">Média Associada</label>
              <div className="aspect-video w-full rounded-lg border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 hover:bg-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                {activeStory.image ? (
                  <div className="relative w-full h-full">
                    <img src={activeStory.image} className="w-full h-full object-cover rounded-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <ImageIcon className="w-8 h-8 mb-2 text-white/50" />
                      <span className="text-sm text-white font-medium">Alterar imagem</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 text-slate-700" />
                    <span className="text-sm text-slate-500">Click para carregar imagem</span>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showToast ? 1 : 0, y: showToast ? 0 : 50 }}
        className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 z-50"
      >
        <CheckCircle2 className="w-5 h-5" />
        Alterações guardadas com sucesso.
      </motion.div>
    </div>
  );
}
