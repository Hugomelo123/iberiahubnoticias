import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Plus, LayoutDashboard, FileText, Image as ImageIcon, CheckCircle2, User, Eye, History, Settings, LogOut, Users, MessageSquare, Trash2, ShieldAlert } from 'lucide-react';
import { useLocation } from 'wouter';
import { getStories, getMatches, updateStory, updateMatch, deleteMatch as apiDeleteMatch, createMatch, createStory, deleteStory, logout } from '@/lib/api';

export default function EditorPanel() {
  const [stories, setStories] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [activeStory, setActiveStory] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'editor' | 'settings'>('editor');
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    async function loadData() {
      try {
        const [storiesData, matchesData] = await Promise.all([
          getStories(),
          getMatches()
        ]);
        setStories(storiesData);
        setMatches(matchesData);
        if (storiesData.length > 0) {
          setActiveStory(storiesData[0]);
        }
      } catch (err) {
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveStory = async () => {
    if (!activeStory) return;
    setIsSaving(true);
    
    try {
      const updated = await updateStory(activeStory.id, activeStory);
      setStories(stories.map(s => s.id === updated.id ? updated : s));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Erro ao guardar:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleMatchLive = async (id: string) => {
    const match = matches.find((m: any) => m.id === id);
    if (!match) return;
    
    try {
      const updated = await updateMatch(id, { isLive: !match.isLive });
      setMatches(matches.map((m: any) => m.id === id ? updated : m));
    } catch (err) {
      console.error("Erro:", err);
    }
  };

  const handleDeleteMatch = async (id: string) => {
    try {
      await apiDeleteMatch(id);
      setMatches(matches.filter((m: any) => m.id !== id));
    } catch (err) {
      console.error("Erro:", err);
    }
  };

  const addNewMatch = async () => {
    try {
      const newMatch = await createMatch({
        teamA: 'Nova Equipa',
        teamB: 'Oponente',
        competition: 'Nova Competição',
        time: '20:00',
        isLive: false,
        caster: 'TBD',
        link: '#'
      });
      setMatches([newMatch, ...matches]);
    } catch (err) {
      console.error("Erro:", err);
    }
  };

  const handleCreateStory = async () => {
    console.log('🔵 Criando nova notícia...');
    try {
      const newStoryData = {
        title: 'Nova Notícia',
        slug: 'nova-noticia-' + Date.now(),
        whatHappened: 'Escreve aqui o que aconteceu...',
        whyItMatters: 'Explica porque é importante...',
        entity: 'Entidade',
        type: 'news',
        published: false,
        featured: false,
        timestamp: new Date().toISOString(),
        author: {
          name: 'Editor',
          role: 'Redação'
        }
      };
      console.log('📤 Enviando dados:', newStoryData);

      const newStory = await createStory(newStoryData);
      console.log('✅ Notícia criada:', newStory);

      setStories([newStory, ...stories]);
      setActiveStory(newStory);
      console.log('✅ Estado atualizado');
    } catch (err) {
      console.error("❌ Erro ao criar notícia:", err);
      alert('Erro ao criar notícia: ' + (err as any).message);
    }
  };

  const handleDeleteStory = async (id: string) => {
    console.log('🗑️ Tentando apagar notícia:', id);
    const story = stories.find(s => s.id === id);

    if (!story) {
      console.log('❌ Notícia não encontrada');
      return;
    }

    console.log('📋 Notícia encontrada:', story.title);

    const confirmDelete = window.confirm(
      `Tens a certeza que queres apagar "${story.title}"?\n\nEsta ação não pode ser desfeita.`
    );

    if (!confirmDelete) {
      console.log('❌ Utilizador cancelou');
      return;
    }

    console.log('✅ Confirmado, a apagar...');

    try {
      await deleteStory(id);
      const updatedStories = stories.filter(s => s.id !== id);
      setStories(updatedStories);

      // Se apagámos a notícia ativa, seleciona a primeira disponível
      if (activeStory.id === id) {
        setActiveStory(updatedStories.length > 0 ? updatedStories[0] : null);
      }

      console.log('✅ Notícia apagada com sucesso!');
    } catch (err) {
      console.error("❌ Erro ao apagar:", err);
      alert('Erro ao apagar notícia: ' + (err as any).message);
    }
  };

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center">
        <div className="text-primary animate-pulse">A carregar editor...</div>
      </div>
    );
  }

  if (!activeStory) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center">
        <div className="text-white/40">Sem stories disponíveis</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-slate-400 font-sans flex overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 right-8 z-[200] bg-primary text-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-bold"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Notícia guardada com sucesso!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-[#08080a] flex flex-col relative z-10">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain block" />
            <h1 className="font-serif text-xl font-bold text-white tracking-tighter">
              IH.<span className="italic text-primary">Editor</span>
            </h1>
          </div>

          <nav className="space-y-8">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4 px-2">Narrativas</div>
              <button
                onClick={handleCreateStory}
                className="w-full mb-4 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Nova Notícia
              </button>
              <div className="space-y-2">
                {stories.map(s => (
                  <div key={s.id} className="flex items-stretch gap-1">
                    <button
                      onClick={() => setActiveStory(s)}
                      className={`flex-1 min-w-0 text-left px-3 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeStory.id === s.id ? 'bg-primary text-black shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
                    >
                      <FileText className={`w-3.5 h-3.5 flex-shrink-0 ${activeStory.id === s.id ? 'text-black' : 'text-primary/40'}`} />
                      <span className="truncate min-w-0">{s.title}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteStory(s.id)}
                      className="px-2 py-2 rounded-lg text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all flex-shrink-0"
                      title="Apagar"
                      type="button"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4 px-2">Sistema</div>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'settings' ? 'bg-white/10 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
                >
                  <Settings className="w-3.5 h-3.5" /> Configurações
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
        {activeTab === 'editor' ? (
          <>
            <header className="h-24 border-b border-white/5 bg-[#08080a]/50 backdrop-blur-3xl sticky top-0 z-20 px-12 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 block mb-1">Ficheiro Ativo</span>
                <h2 className="text-white font-serif text-lg italic">{activeStory.title}</h2>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.open(`/noticias/${activeStory.slug}`, '_blank')}
                  className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 border border-white/5 hover:border-primary/30 transition-all"
                  title="Pré-visualizar notícia"
                  type="button"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSaveStory}
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
              value={activeStory.title ?? ''}
              onChange={(e) => setActiveStory({...activeStory, title: e.target.value})}
              className="w-full bg-transparent border-none p-0 text-6xl font-serif font-bold text-white focus:ring-0 placeholder:text-white/10"
              placeholder="Título da Narrativa..."
            />
            <div className="flex items-center gap-3 pt-4">
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">URL:</span>
              <input
                type="text"
                value={activeStory.slug ?? ''}
                onChange={(e) => setActiveStory({...activeStory, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/60 font-mono focus:border-primary/50 transition-all outline-none"
                placeholder="slug-da-noticia"
              />
            </div>
            <div className="flex gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={activeStory.published ?? false}
                  onChange={(e) => setActiveStory({...activeStory, published: e.target.checked})}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50"
                />
                <span className="text-xs text-white/40 group-hover:text-white transition-colors">Publicada</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={activeStory.featured ?? false}
                  onChange={(e) => setActiveStory({...activeStory, featured: e.target.checked})}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50"
                />
                <span className="text-xs text-white/40 group-hover:text-white transition-colors">Destaque</span>
              </label>
            </div>
          </section>

          {/* Meta Edit */}
          <section className="grid md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Responsável</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={activeStory.author?.name ?? ''}
                  onChange={(e) => setActiveStory({...activeStory, author: {...(activeStory.author || {}), name: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Cargo Editorial</label>
              <input
                type="text"
                value={activeStory.author?.role ?? ''}
                onChange={(e) => setActiveStory({...activeStory, author: {...(activeStory.author || {}), role: e.target.value}})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Entidade Focal</label>
              <input
                type="text"
                value={activeStory.entity ?? ''}
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
                    value={activeStory.content?.block1 ?? activeStory.whatHappened ?? ''}
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
                    value={activeStory.content?.block2 ?? activeStory.whyItMatters ?? ''}
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

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20">URL da Imagem</label>
              <div className="relative group">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={activeStory.image ?? ''}
                  onChange={(e) => {
                    setActiveStory({...activeStory, image: e.target.value});
                    setImageError(false);
                    setImageLoaded(false);
                  }}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
                />
              </div>
              <p className="text-[10px] text-white/20">
                Recomendado: Imgur, ImgBB, Cloudinary, ou outro host de imagens
              </p>
              {activeStory.image && activeStory.image.trim() && (
                <div className="mt-4">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Preview:</p>
                  <div className="rounded-xl overflow-hidden border border-white/10 relative bg-white/5 min-h-[16rem]">
                    {!imageError ? (
                      <>
                        <img
                          src={activeStory.image}
                          alt="Preview da imagem"
                          className={`w-full h-64 object-cover transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                          onLoad={() => {
                            console.log('✅ Imagem carregada:', activeStory.image);
                            setImageLoaded(true);
                            setImageError(false);
                          }}
                          onError={() => {
                            console.log('❌ Erro ao carregar:', activeStory.image);
                            setImageError(true);
                            setImageLoaded(false);
                          }}
                        />
                        {!imageLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-primary animate-pulse">A carregar imagem...</div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-center p-8">
                        <svg className="w-16 h-16 text-red-500/60 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-sm text-white/60 mb-2">Erro ao carregar imagem</p>
                        <p className="text-xs text-white/30">Verifica se o URL está correto</p>
                        <p className="text-xs text-white/20 mt-2 font-mono break-all px-4">{activeStory.image}</p>
                      </div>
                    )}
                    {imageLoaded && (
                      <button
                        onClick={() => {
                          setActiveStory({...activeStory, image: ''});
                          setImageError(false);
                          setImageLoaded(false);
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all"
                        type="button"
                        title="Remover imagem"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Matches & Agenda Management (New) */}
          <section className="space-y-12 pt-12 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-white/20">
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">04</span>
                <div className="h-px w-32 bg-white/5" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Agenda & Casters</span>
              </div>
              <button 
                onClick={addNewMatch}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:scale-105 transition-transform"
              >
                <Plus className="w-4 h-4" /> Adicionar Jogo
              </button>
            </div>

            <div className="grid gap-6">
              {matches.map((match: any) => (
                <div key={match.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:border-primary/30 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="grid md:grid-cols-4 gap-8 relative z-10">
                    <div className="flex flex-col space-y-2">
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Confronto</span>
                      <input 
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-bold tracking-tighter focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all"
                        value={`${match.teamA} vs ${match.teamB}`}
                        onChange={(e) => {
                          const [a, b] = e.target.value.split(' vs ');
                          setMatches(matches.map((m: any) => m.id === match.id ? { ...m, teamA: a || m.teamA, teamB: b || m.teamB } : m));
                        }}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Voz do Jogo</span>
                      <input 
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-bold tracking-tighter focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all"
                        value={match.caster}
                        onChange={(e) => setMatches(matches.map((m: any) => m.id === match.id ? { ...m, caster: e.target.value } : m))}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Link Stream</span>
                      <input 
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-primary/60 text-xs font-mono focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all"
                        value={match.link}
                        onChange={(e) => setMatches(matches.map((m: any) => m.id === match.id ? { ...m, link: e.target.value } : m))}
                        placeholder="https://twitch.tv/..."
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Controlo</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleMatchLive(match.id)}
                          className={`flex-1 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all border ${match.isLive ? 'bg-red-500/10 border-red-500/50 text-red-500 animate-pulse' : 'bg-white/5 border-white/10 text-white/20 hover:text-white hover:border-white/30'}`}
                        >
                          {match.isLive ? 'Em Direto' : 'Agendar Live'}
                        </button>
                        <button 
                          onClick={() => handleDeleteMatch(match.id)}
                          className="p-2 rounded-lg bg-red-500/5 border border-red-500/10 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-12 relative overflow-hidden group">
            <div className="flex items-start gap-4 relative z-10">
              <ShieldAlert className="w-5 h-5 text-primary" />
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Manual Editorial v4.0</h4>
                <p className="text-[11px] text-white/50 leading-relaxed font-serif italic">
                  "O IberiaHub vive da qualidade, não da rapidez. Todas as imagens devem manter a estética desaturada e granulada. Os textos devem ser verificados pelo Ricardo antes da publicação final. A Voz do Jogo é o nosso maior asset."
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-2xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
          </section>
            </div>
          </>
        ) : (
          <div className="p-16 max-w-4xl mx-auto">
            <header className="mb-12">
              <h1 className="text-4xl font-serif font-bold text-white mb-2">Configurações</h1>
              <p className="text-white/40">Gestão do painel admin</p>
            </header>

            <div className="space-y-8">
              <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Informação da Sessão
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">Utilizador:</span>
                    <span className="text-white font-mono">Editor</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Notícias totais:</span>
                    <span className="text-white font-mono">{stories.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Publicadas:</span>
                    <span className="text-white font-mono">{stories.filter(s => s.published).length}</span>
                  </div>
                </div>
              </section>

              <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-4">Ações Rápidas</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('editor')}
                    className="px-6 py-3 bg-primary text-black rounded-lg font-bold hover:scale-105 transition-transform"
                  >
                    Voltar ao Editor
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}
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
