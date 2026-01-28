import { Construction } from "lucide-react";
import { Layout } from "../components/editorial/Layout";

export default function Maintenance() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
              <Construction className="w-24 h-24 text-primary relative z-10" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Site em Manutenção
            </h1>
            <div className="h-1 w-32 bg-primary mx-auto" />
          </div>

          {/* Message */}
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">
              Estamos a realizar melhorias no IberiaHub para lhe proporcionar uma melhor experiência.
            </p>
            <p className="text-base text-white/40 leading-relaxed max-w-xl mx-auto">
              A nossa equipa editorial está a trabalhar para voltar em breve com conteúdo ainda mais relevante sobre o cenário ibérico de esports.
            </p>
          </div>

          {/* Status */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-mono text-white/60 uppercase tracking-widest">
                  Manutenção em Progresso
                </span>
              </div>
              <p className="text-xs text-white/40">
                Volte em breve ou siga-nos nas redes sociais para atualizações.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-12">
            <p className="text-xs text-white/20 font-mono uppercase tracking-widest">
              IberiaHub © 2026 — A Voz do Esports Ibérico
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
