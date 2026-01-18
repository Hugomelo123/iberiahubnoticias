import { Layout } from '@/components/editorial/Layout';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Mail, Twitter, Linkedin, Github, Briefcase, Award, Zap, Camera, Code } from 'lucide-react';

export default function Redacao() {
  const teams = [
    {
      title: "Fundadores",
      members: [
        { name: "Hugo", role: "Co-Fundador", bio: "Visão estratégica, arquitetura técnica e desenvolvimento de produto.", icon: <Zap className="w-5 h-5 text-primary" /> },
        { name: "Eric", role: "Co-Fundador", bio: "Visão estratégica, desenvolvimento de negócio e parcerias estratégicas.", icon: <Award className="w-5 h-5 text-primary" /> }
      ]
    },
    {
      title: "Direção Editorial",
      members: [
        { name: "Tiago Alves", role: "Diretor de Projeto & Jornalista", bio: "Direção editorial, publicação de conteúdo e coordenação da equipa.", icon: <Briefcase className="w-5 h-5 text-primary" /> },
        { name: "Ricardo", role: "Editor & Verificador", bio: "Edição de textos, verificação de factos e controlo de qualidade.", icon: <FileText className="w-5 h-5 text-primary" /> }
      ]
    },
    {
      title: "Marketing & Design",
      members: [
        { name: "Paloma", role: "Social Media & Publicação", bio: "Gestão de redes sociais, publicação de conteúdo e engagement.", icon: <Camera className="w-5 h-5 text-primary" /> },
        { name: "Guilherme", role: "Designer & Frontend Developer", bio: "Design de redes sociais e identidade visual do IberiaHub.", icon: <Code className="w-5 h-5 text-primary" /> }
      ]
    }
  ];

  return (
    <Layout>
      <div className="pt-32 px-8 max-w-6xl mx-auto mb-32 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[150px] pointer-events-none" />
        
        <Link href="/noticias">
          <span className="inline-flex items-center text-white/40 hover:text-primary transition-colors text-xs font-mono uppercase tracking-[0.2em] mb-12 cursor-pointer group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar ao Journal
          </span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-24"
        >
          <header className="max-w-3xl">
            <img src="/logo.png" alt="IberiaHub Logo" className="w-20 h-20 object-contain mb-8 block" />
            <h1 className="font-serif text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">A Nossa <span className="italic text-primary font-light">Equipa</span></h1>
            <p className="text-white/60 font-serif text-xl leading-relaxed">
              O coletivo por trás da curadoria definitiva do Counter-Strike ibérico. Profissionais dedicados à excelência técnica e editorial.
            </p>
          </header>

          <div className="space-y-20">
            {teams.map((team, sectionIndex) => (
              <div key={sectionIndex} className="space-y-10">
                <div className="flex items-center gap-6">
                  <h2 className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30 font-black whitespace-nowrap">{team.title}</h2>
                  <div className="h-px w-full bg-white/5" />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {team.members.map((member, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:border-primary/30 hover:bg-white/[0.04] transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                      
                      <div className="flex items-start gap-6 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform ring-1 ring-primary/20">
                          {member.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-xl mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                          <p className="text-primary/60 text-[9px] font-mono uppercase tracking-widest mb-4 font-black">{member.role}</p>
                          <p className="text-white/40 text-sm leading-relaxed font-serif italic">"{member.bio}"</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <section className="bg-primary/5 border border-primary/10 rounded-3xl p-12 text-center space-y-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 space-y-6">
              <h2 className="font-serif text-4xl text-white font-bold italic">Unidos pela Competição</h2>
              <p className="text-white/60 max-w-xl mx-auto font-serif text-lg">
                Se tens paixão pelo CS ibérico e queres elevar o padrão do jornalismo de esports, a nossa porta está sempre aberta.
              </p>
              <button className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xl">
                <Mail className="w-4 h-4" /> Contactar o IberiaHub
              </button>
            </div>
          </section>
        </motion.div>
      </div>
    </Layout>
  );
}

// Helper component for missing FileText
function FileText({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  );
}

