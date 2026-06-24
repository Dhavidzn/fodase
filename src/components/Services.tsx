import { motion } from 'motion/react';
import { Map, Satellite, Layers, BarChart3, Cpu, LayoutTemplate, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../types';

export default function Services() {
  const services: (ServiceItem & { icon: any })[] = [
    {
      id: 'geoprocessamento',
      title: 'Geoprocessamento',
      description: 'Transforme dados espaciais em informações estratégicas.',
      icon: Map,
      items: [
        'Análise espacial',
        'Modelagem geográfica',
        'Processamento de dados vetoriais e matriciais',
        'Banco de dados geográficos',
        'Automação de fluxos de trabalho geoespaciais',
        'Integração de dados GIS'
      ]
    },
    {
      id: 'sensoriamento-remoto',
      title: 'Sensoriamento Remoto',
      description: 'Extraia informações valiosas a partir de imagens de satélite e drones.',
      icon: Satellite,
      items: [
        'Processamento de imagens orbitais',
        'Classificação de uso e cobertura da terra',
        'Monitoramento ambiental',
        'Análise multitemporal',
        'Índices espectrais',
        'Detecção de mudanças',
        'Monitoramento costeiro e marinho'
      ]
    },
    {
      id: 'cartografia',
      title: 'Cartografia e Produção de Mapas',
      description: 'Mapas personalizados para comunicação, pesquisa e tomada de decisão.',
      icon: Layers,
      items: [
        'Mapas temáticos',
        'Mapas institucionais',
        'Mapas ambientais',
        'Cartografia digital',
        'Atlas e relatórios cartográficos',
        'Layout profissional para publicações'
      ]
    },
    {
      id: 'analise-dados',
      title: 'Análise de Dados',
      description: 'Converta grandes volumes de dados em conhecimento aplicável.',
      icon: BarChart3,
      items: [
        'Tratamento e organização de dados',
        'Dashboards interativos',
        'Visualização de dados',
        'Relatórios analíticos',
        'Automação de processos',
        'Business Intelligence'
      ]
    },
    {
      id: 'desenvolvimento-sistemas',
      title: 'Desenvolvimento de Sistemas',
      description: 'Soluções digitais desenvolvidas para as necessidades do seu negócio.',
      icon: Cpu,
      items: [
        'Sistemas web personalizados',
        'Plataformas geoespaciais',
        'Painéis administrativos',
        'Aplicações para gestão de dados',
        'Integração de APIs',
        'Automação de processos empresariais'
      ]
    },
    {
      id: 'sites-landing',
      title: 'Criação de Sites e Landing Pages',
      description: 'Presença digital profissional para destacar sua empresa.',
      icon: LayoutTemplate,
      items: [
        'Sites institucionais',
        'Landing pages de alta conversão',
        'Portfólios profissionais',
        'Otimização para dispositivos móveis',
        'SEO e performance',
        'Design moderno e responsivo'
      ]
    }
  ];

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-[#0A0A0B] border-t border-[#2A2A2C]" id="servicos">
      <div className="max-w-7xl mx-auto relative z-10">
        
         {/* Intro Sub-section */}
         <div id="introducao" className="mb-24 scroll-mt-24 max-w-4xl">
           <div className="inline-block text-[#A1A1A5] font-mono text-[10px] uppercase tracking-[0.25em] mb-4">
            CONEXÃO DE DADOS & TECNOLOGIA
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-5xl md:text-6xl tracking-tight text-white mb-6">
            Soluções Inteligentes para um <br />
            <span className="italic font-normal">Mundo Orientado por Dados</span>
          </h2>
          <div className="space-y-6 text-[#A1A1A5] text-base leading-relaxed max-w-3xl font-light">
            <p>
              A <span className="font-medium text-white">Central Maps</span> une tecnologia geoespacial, análise de dados e desenvolvimento digital para entregar soluções completas que auxiliam na tomada de decisão, otimização de processos e geração de resultados de alto impacto.
            </p>
            <p className="border-l border-white pl-6 italic text-white/90">
              Atuamos desde a aquisição e processamento de dados geográficos até o desenvolvimento de plataformas web, sistemas personalizados e landing pages de alta performance.
            </p>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-16 border-b border-[#2A2A2C] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-white font-mono text-[10px] uppercase tracking-[0.25em] mb-2">
              NOSSOS SERVIÇOS
            </div>
            <p className="text-xs font-mono text-[#A1A1A5] tracking-wider uppercase">
              EXPLORE AS NOSSAS VERTICAIS DE EXECUÇÃO
            </p>
          </div>
          <span className="font-mono text-xs text-[#A1A1A5]">
            SYS // VERTICAL_GRID
          </span>
        </div>

        {/* Services Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-[#141416] border border-[#2A2A2C] rounded-lg p-8 flex flex-col justify-between transition-all duration-300 hover:border-white group"
                id={`card-${service.id}`}
              >
                <div>
                  {/* Card Icon Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-10 h-10 bg-white text-black rounded flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-[#A1A1A5]/60 group-hover:text-white transition-colors duration-300 tracking-[0.25em]">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Card Title & Desc */}
                  <h3 className="font-display font-medium text-xl text-white mb-3 tracking-tight group-hover:italic transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[#A1A1A5] text-xs leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  {/* Bullet List */}
                  <ul className="space-y-3 border-t border-[#2A2A2C] pt-6" aria-label={`Sub-serviços de ${service.title}`}>
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] text-[#A1A1A5] group-hover:text-white transition-colors duration-200">
                        <span className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0" />
                        <span className="leading-normal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
