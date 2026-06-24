import { motion } from 'motion/react';
import { Target, Compass } from 'lucide-react';

export default function Mission() {
  return (
    <section className="relative py-28 px-6 bg-[#0A0D18] overflow-hidden border-t border-white/5" id="missao">
      {/* Visual atmospheric effects - simulates Earth's atmospheric curvature glow */}
      <div className="absolute bottom-0 inset-x-0 h-[150px] bg-gradient-to-t from-[#6F5BD3]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#A88BE8]/10 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Decorative reticle node */}
        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 rounded-full mb-8 text-[#F9B27A]">
          <Target className="w-5 h-5 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-2 text-[#A88BE8] font-mono text-xs uppercase tracking-widest mb-6 block">
          // DIRETRIZ INSTITUCIONAL
        </div>

        <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight mb-8">
          Nossa Missão
        </h2>

        {/* Large stylized Blockquote text */}
        <blockquote className="font-display text-2xl sm:text-4xl md:text-5xl font-semibold leading-[120%] text-white tracking-tight max-w-4xl mx-auto mb-8">
          “Democratizar o acesso à informação geoespacial e às tecnologias digitais, oferecendo soluções inovadoras que transformam dados em conhecimento e conhecimento em resultados.”
        </blockquote>

        <div className="flex justify-center items-center gap-2 text-[#73798D] font-mono text-xs tracking-wider">
          <Compass className="w-4 h-4 text-[#F9B27A]" />
          <span>CENTRAL MAPS // GLOBAL POSITIONING DIRECTIVE</span>
        </div>

      </div>
    </section>
  );
}
