import { motion } from 'motion/react';
import { Award, Sliders, Zap, ShieldCheck } from 'lucide-react';
import { DifferentialItem } from '../types';

export default function Diferenciais() {
  const items: (DifferentialItem & { icon: any; colorClass: string })[] = [
    {
      id: 'especializacao',
      title: 'Especialização Técnica',
      description: 'Equipe com experiência em geotecnologias, análise de dados e desenvolvimento de software.',
      icon: Award,
      colorClass: 'text-[#A88BE8]'
    },
    {
      id: 'solucoes',
      title: 'Soluções Personalizadas',
      description: 'Cada projeto é desenvolvido de acordo com os objetivos e necessidades do cliente.',
      icon: Sliders,
      colorClass: 'text-[#F9B27A]'
    },
    {
      id: 'tecnologia',
      title: 'Tecnologia de Ponta',
      description: 'Utilizamos ferramentas modernas para garantir precisão, eficiência e escalabilidade.',
      icon: Zap,
      colorClass: 'text-[#FF9B5A]'
    },
    {
      id: 'resultados',
      title: 'Resultados Confiáveis',
      description: 'Entregamos produtos que auxiliam na tomada de decisão e agregam valor ao seu negócio.',
      icon: ShieldCheck,
      colorClass: 'text-emerald-400'
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-[#0A0D18] overflow-hidden" id="diferenciais">
      {/* Decorative orbital line elements in background */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full border border-white/5 opacity-40 pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full border border-white/5 opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-[#F9B27A] font-mono text-xs uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#F9B27A]" />
            DIFERENCIAIS COMPETITIVOS
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Por Que Escolher a Central Maps?
          </h2>
          <p className="text-[#D6D8E2]/75 text-base sm:text-lg mt-4 font-light">
            Unimos engenharia cartográfica e engenharia de software para construir soluções espaciais integradas com os mais altos padrões de rigor técnico.
          </p>
        </div>

        {/* Bento/Staggered 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-glass rounded-[24px] p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium-glow group border border-white/5 hover:border-white/10"
                id={`diff-card-${item.id}`}
              >
                {/* Glowing Corner Background element */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#6F5BD3]/5 rounded-full blur-2xl group-hover:bg-[#6F5BD3]/10 transition-all duration-500" />

                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                  {/* Glowing Icon Frame */}
                  <div className="w-14 h-14 bg-[#131C35] rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#F9B27A]/30 transition-all duration-300 shadow-soft-glow">
                    <Icon className={`w-7 h-7 ${item.colorClass}`} />
                  </div>

                  {/* Copy content */}
                  <div className="space-y-3">
                    <h3 className="font-display font-semibold text-2xl text-white tracking-tight group-hover:text-[#F9B27A] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[#D6D8E2]/80 text-sm sm:text-base leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Cyberpunk Grid accent lines in corners */}
                <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity font-mono text-[9px] text-white">
                  REF_SYS // {item.id.toUpperCase()}_MOD
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
