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
    <section className="relative py-24 px-6 overflow-hidden bg-[#0A0D18]" id="servicos">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#6F5BD3]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#A88BE8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Intro Sub-section */}
        <div id="introducao" className="mb-24 scroll-mt-24 max-w-4xl">
          <div className="inline-flex items-center gap-2 text-[#A88BE8] font-mono text-xs uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#A88BE8] animate-pulse" />
            CONEXÃO DE DADOS & TECNOLOGIA
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-white mb-6">
            Soluções Inteligentes para um Mundo Orientado por Dados
          </h2>
          <div className="space-y-6 text-[#D6D8E2] text-lg leading-relaxed max-w-3xl font-light">
            <p>
              A <span className="font-semibold text-white">Central Maps</span> une tecnologia geoespacial, análise de dados e desenvolvimento digital para entregar soluções completas que auxiliam na tomada de decisão, otimização de processos e geração de resultados.
            </p>
            <p className="border-l-2 border-[#F9B27A] pl-6 italic text-[#D6D8E2]/85">
              Atuamos desde a aquisição e processamento de dados geográficos até o desenvolvimento de plataformas web, sistemas personalizados e landing pages de alta performance.
            </p>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 text-[#F9B27A] font-mono text-xs uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#F9B27A]" />
            NOSSOS SERVIÇOS
          </div>
          <p className="text-sm font-mono text-[#73798D] tracking-wider uppercase mt-1">
            EXPLORE NOSSAS SEIS VERTICAIS DE EXECUÇÃO
          </p>
        </div>

        {/* Services Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-glass rounded-[24px] p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-glow group"
                id={`card-${service.id}`}
              >
                <div>
                  {/* Card Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-[#131C35] rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-[#A88BE8]/30 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[#F9B27A] group-hover:text-[#A88BE8] transition-colors duration-300" />
                    </div>
                    <span className="font-mono text-[11px] text-white/20 group-hover:text-[#A88BE8]/40 transition-colors duration-300 font-semibold tracking-widest">
                      // 0{index + 1}
                    </span>
                  </div>

                  {/* Card Title & Desc */}
                  <h3 className="font-display font-semibold text-2xl text-white mb-3 tracking-tight group-hover:text-[#F9B27A] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[#D6D8E2]/80 text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  {/* Bullet List */}
                  <ul className="space-y-2.5 border-t border-white/5 pt-5" aria-label={`Sub-serviços de ${service.title}`}>
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#D6D8E2]/70 group-hover:text-[#D6D8E2] transition-colors duration-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A88BE8] shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
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
