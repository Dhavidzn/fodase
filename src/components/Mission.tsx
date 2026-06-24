import { motion } from 'motion/react';
import { Target, Compass } from 'lucide-react';

export default function Mission() {
  return (
    <section className="relative py-28 px-6 bg-[#F8F8F6] border-t border-[#D9D9D9] overflow-hidden" id="missao">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        <div className="inline-block text-[#555555] font-mono text-[10px] uppercase tracking-[0.25em] mb-4">
          // DIRETRIZ INSTITUCIONAL
        </div>

        <h2 className="font-display font-medium text-3xl sm:text-4xl text-black tracking-tight mb-12">
          Nossa Missão
        </h2>

        {/* Large stylized Blockquote text */}
        <blockquote className="font-display text-2xl sm:text-4xl md:text-5xl font-light leading-[130%] text-black tracking-tight max-w-4xl mx-auto mb-12 italic">
          “Democratizar o acesso à informação geoespacial e às tecnologias digitais, oferecendo soluções inovadoras que transformam dados em conhecimento e conhecimento em resultados.”
        </blockquote>

        <div className="flex justify-center items-center gap-2 text-[#555555] font-mono text-[10px] tracking-widest uppercase">
          <Compass className="w-4 h-4 text-black" />
          <span>CENTRAL MAPS // DIRECTIVE</span>
        </div>

      </div>
    </section>
  );
}
