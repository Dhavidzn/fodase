import { motion } from 'motion/react';
import { Award, Sliders, Zap, ShieldCheck } from 'lucide-react';
import { DifferentialItem } from '../types';

export default function Diferenciais() {
  const items: (DifferentialItem & { icon: any })[] = [
    {
      id: 'especializacao',
      title: 'Especialização Técnica',
      description: 'Equipe com experiência profunda em geotecnologias, análise de dados e engenharia de software integrada.',
      icon: Award
    },
    {
      id: 'solucoes',
      title: 'Soluções Personalizadas',
      description: 'Cada projeto é estruturado de acordo com as necessidades estratégicas e os objetivos do negócio.',
      icon: Sliders
    },
    {
      id: 'tecnologia',
      title: 'Tecnologia de Ponta',
      description: 'Utilizamos ferramentas modernas para garantir a máxima precisão, eficiência analítica e escalabilidade.',
      icon: Zap
    },
    {
      id: 'resultados',
      title: 'Resultados Confiáveis',
      description: 'Entregamos produtos cartográficos que otimizam a tomada de decisão e agregam valor real ao seu negócio.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="relative py-28 px-6 bg-[#F8F8F6] border-t border-[#D9D9D9] overflow-hidden" id="diferenciais">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block text-[#555555] font-mono text-[10px] uppercase tracking-[0.25em] mb-4">
            DIFERENCIAIS COMPETITIVOS
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-black tracking-tight">
            Por Que Escolher a <span className="italic font-normal">Central Maps</span>?
          </h2>
          <p className="text-[#555555] text-sm mt-4 font-light leading-relaxed max-w-xl mx-auto">
            Unimos engenharia cartográfica e arquitetura de software para construir soluções espaciais com rigor metodológico e padrões de estética moderna.
          </p>
        </div>

        {/* Bento/Staggered 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-black border border-[#D9D9D9] group"
                id={`diff-card-${item.id}`}
              >
                <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
                  {/* Icon Box */}
                  <div className="w-12 h-12 bg-[#F8F8F6] border border-[#D9D9D9] rounded flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                    <Icon className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Copy content */}
                  <div className="space-y-3">
                    <h3 className="font-display font-medium text-xl text-black tracking-tight group-hover:italic transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[#555555] text-xs leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 opacity-40 font-mono text-[8px] text-[#555555]">
                  SYS // {item.id.toUpperCase()}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
