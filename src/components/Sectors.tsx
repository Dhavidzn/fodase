import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Leaf, Sprout, Flame, Hammer, GraduationCap, 
  Building2, Box, Droplet, Briefcase, Rocket, Globe2
} from 'lucide-react';
import { SectorItem } from '../types';

export default function Sectors() {
  const [selectedSector, setSelectedSector] = useState<string>('meio-ambiente');

  const sectors: (SectorItem & { icon: any, details: string })[] = [
    {
      id: 'meio-ambiente',
      name: 'Meio Ambiente',
      iconName: 'Leaf',
      icon: Leaf,
      description: 'Mapeamento ambiental e licenciamento de áreas preservadas.',
      details: 'Soluções voltadas ao Cadastro Ambiental Rural (CAR), demarcação de Áreas de Preservação Permanente (APP) e Reserva Legal. Realizamos diagnósticos e relatórios para recuperação florestal, análises de desmatamento e monitoramento costeiro de alta precisão.'
    },
    {
      id: 'agronegocio',
      name: 'Agronegócio',
      iconName: 'Sprout',
      icon: Sprout,
      description: 'Monitoramento de lavouras e análise de produtividade por satélite.',
      details: 'Monitoramento multitemporal de safras agrícolas por índices de vigor vegetativo (NDVI, NDRE). Apoio em agricultura de precisão, planejamento de plantio sistemático, identificação de anomalias no solo e estimativa de quebra de safra via sensores orbitais.'
    },
    {
      id: 'energia',
      name: 'Energia',
      iconName: 'Flame',
      icon: Flame,
      description: 'Mapeamento de redes de transmissão e áreas de usinas solares/eólicas.',
      details: 'Garantia de segurança operacional com mapeamento vetorial preciso de faixas de servidão de linhas de transmissão. Análise locacional estratégica com dados meteorológicos e topográficos para posicionamento de parques fotovoltaicos e eólicos.'
    },
    {
      id: 'engenharia',
      name: 'Engenharia',
      iconName: 'Hammer',
      icon: Hammer,
      description: 'Modelos digitais de elevação e topografia automatizada.',
      details: 'Geração de Modelos Digitais de Superfície (MDS) e de Terreno (MDT) a partir de voos fotogramétricos ou perfilamento laser (LiDAR). Geração de curvas de nível, cálculo de volume de corte/aterro e traçado geométrico de obras lineares.'
    },
    {
      id: 'pesquisa-cientifica',
      name: 'Pesquisa Científica',
      iconName: 'GraduationCap',
      icon: GraduationCap,
      description: 'Suporte cartográfico e processamento estatístico para estudos.',
      details: 'Modelagem biofísica e estruturação de bases de dados espaciais complexas para dissertações, teses e publicações. Criação de layouts cartográficos seguindo rigorosamente as normas técnicas da ABNT e o rigor acadêmico de revistas de alto impacto.'
    },
    {
      id: 'gestao-publica',
      name: 'Gestão Pública',
      iconName: 'Building2',
      icon: Building2,
      description: 'Cadastro multifinalitário e plano diretor municipal.',
      details: 'Atualização da base cadastral urbana para otimização da arrecadação tributária (IPTU). Geoprocessamento aplicado à gestão de redes de saúde, educação, planejamento de transporte público e planos diretores participativos.'
    },
    {
      id: 'planejamento-territorial',
      name: 'Planejamento Territorial',
      iconName: 'Box',
      icon: Box,
      description: 'Zoneamento urbano, mobilidade e expansão de infraestrutura.',
      details: 'Análise de adequabilidade espacial para crescimento urbano e expansão industrial. Planejamento estratégico de tráfego, análise de bacias visuais e simulações tridimensionais de volumetria construtiva urbana.'
    },
    {
      id: 'recursos-hidricos',
      name: 'Recursos Hídricos',
      iconName: 'Droplet',
      icon: Droplet,
      description: 'Delimitação de bacias hidrográficas e estudos de outorga de água.',
      details: 'Delimitação automática de bacias, cálculo de redes de drenagem, áreas de inundação periódica e canais de escoamento superficial. Apoio na outorga de captação de água, barramentos e modelagens de qualidade de água.'
    },
    {
      id: 'empresas-privadas',
      name: 'Empresas Privadas',
      iconName: 'Briefcase',
      icon: Briefcase,
      description: 'Geomarketing e otimização logística de frotas e pontos.',
      details: 'Estudos de viabilidade locacional comercial baseado em dados demográficos georreferenciados (geomarketing). Análise espacial de rotas e raios de cobertura para entrega, expandindo filiais com segurança de mercado.'
    },
    {
      id: 'startups-negocios',
      name: 'Startups e Negócios Digitais',
      iconName: 'Rocket',
      icon: Rocket,
      description: 'Integração de APIs geográficas e microsserviços SaaS.',
      details: 'Criação de soluções georreferenciadas conectadas via REST APIs, fornecendo mapas dinâmicos em tempo real para aplicações móviles ou web de novos modelos de negócio digitais.'
    }
  ];

  const activeSectorObj = sectors.find(s => s.id === selectedSector) || sectors[0];
  const ActiveIcon = activeSectorObj.icon;

  return (
    <section className="relative py-24 px-6 bg-[#131C35]/20 border-t border-white/5 overflow-hidden" id="setores">
      {/* Background radial atmosphere */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6F5BD3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 text-[#A88BE8] font-mono text-xs uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#A88BE8]" />
            MERCADO E ATUAÇÃO
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Atendemos Diversos Setores
          </h2>
          <p className="text-[#D6D8E2]/75 text-base sm:text-lg max-w-2xl mt-4 font-light">
            A versatilidade da inteligência espacial nos permite entregar soluções customizadas para as demandas críticas de diferentes ramos de mercado.
          </p>
        </div>

        {/* Layout split: Left sector grid, Right sector detail panel */}
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Left Grid Area: Clickable Badges (Area of touch >= 44px) */}
          <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sectors.map((sector) => {
              const IconComp = sector.icon;
              const isSelected = selectedSector === sector.id;
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedSector(sector.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 min-h-[56px] focus:outline-none focus:ring-2 focus:ring-[#A88BE8] ${
                    isSelected 
                      ? 'bg-[#131C35] border border-[#A88BE8]/40 shadow-soft-glow' 
                      : 'bg-glass border border-white/5 hover:border-white/20'
                  }`}
                  id={`sector-btn-${sector.id}`}
                  aria-label={`Ver informações do setor ${sector.name}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                    isSelected ? 'bg-[#A88BE8]/10 border-[#A88BE8]/30 text-[#F9B27A]' : 'bg-white/5 border-white/10 text-white/50'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`block text-sm font-semibold transition-colors ${
                      isSelected ? 'text-white' : 'text-[#D6D8E2]/90'
                    }`}>
                      {sector.name}
                    </span>
                    <span className="block text-[11px] text-[#73798D] truncate max-w-[200px] font-light">
                      {sector.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Detail Panel: Displaying detailed information of selected sector */}
          <div className="lg:w-2/5 flex">
            <div className="w-full bg-glass rounded-[24px] p-8 md:p-10 border border-white/10 flex flex-col justify-between relative overflow-hidden shadow-floating-card">
              {/* Mesh background effect */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#A88BE8]/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Panel Icon Frame */}
                <div className="w-14 h-14 bg-[#131C35] rounded-2xl flex items-center justify-center border border-white/10 mb-6">
                  <ActiveIcon className="w-7 h-7 text-[#F9B27A]" />
                </div>

                <span className="font-mono text-[10px] text-[#A88BE8] tracking-widest uppercase font-bold block mb-2">
                  SETOR DETALHADO // 0{sectors.findIndex(s => s.id === selectedSector) + 1}
                </span>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-4">
                  {activeSectorObj.name}
                </h3>

                <p className="text-[#D6D8E2]/90 text-sm sm:text-base leading-relaxed font-light mb-8">
                  {activeSectorObj.details}
                </p>
              </div>

              {/* Dynamic decorative map watermark */}
              <div className="pt-6 border-t border-white/5 flex items-center gap-3 text-[#73798D] font-mono text-[11px]">
                <Globe2 className="w-4 h-4 text-[#A88BE8] animate-pulse" />
                <span>COORDINATES // CRS_WGS84_GEO</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
