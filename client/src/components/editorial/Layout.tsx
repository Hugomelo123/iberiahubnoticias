import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#050507] text-foreground font-sans selection:bg-primary/20 relative overflow-x-hidden">
      {/* Immersive Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Editorial Watermark */}
      <div className="fixed bottom-12 left-12 pointer-events-none z-50 opacity-[0.02] select-none">
        <span className="font-serif text-8xl font-black tracking-tighter italic">IH.Editorial</span>
      </div>
      
      {/* Dynamic Background Noise/Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Animated Mesh Gradients */}
      <div className="fixed -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="fixed top-[60%] -right-[5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none animate-bounce-slow" />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10">
        {children}
      </div>
    </div>
  );
}
