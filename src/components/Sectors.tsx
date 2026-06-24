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
    <section className="relative py-28 px-6 bg-[#F8F8F6] border-t border-[#D9D9D9] overflow-hidden" id="setores">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16">
          <div className="inline-block text-[#555555] font-mono text-[10px] uppercase tracking-[0.25em] mb-4">
            MERCADO E ATUAÇÃO
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-black tracking-tight">
            Atendemos Diversos Setores
          </h2>
          <p className="text-[#555555] text-sm max-w-xl mt-4 font-light leading-relaxed">
            A versatilidade da inteligência espacial nos permite entregar soluções customizadas para as demandas críticas de diferentes ramos de mercado.
          </p>
        </div>

        {/* Layout split: Left sector grid, Right sector detail panel */}
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Left Grid Area: Clickable Badges */}
          <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sectors.map((sector) => {
              const IconComp = sector.icon;
              const isSelected = selectedSector === sector.id;
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedSector(sector.id)}
                  className={`flex items-center gap-4 p-4 rounded text-left transition-all duration-200 min-h-[56px] focus:outline-none ${
                    isSelected 
                      ? 'bg-black text-white border border-black' 
                      : 'bg-white border border-[#D9D9D9] text-[#555555] hover:border-black hover:text-black'
                  }`}
                  id={`sector-btn-${sector.id}`}
                  aria-label={`Ver informações do setor ${sector.name}`}
                >
                  <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 border ${
                    isSelected ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-[#F8F8F6] border-[#D9D9D9] text-[#555555]'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className={`block text-xs font-semibold transition-colors ${
                      isSelected ? 'text-white' : 'text-black'
                    }`}>
                      {sector.name}
                    </span>
                    <span className={`block text-[10px] truncate max-w-[180px] font-light ${
                      isSelected ? 'text-neutral-400' : 'text-[#555555]'
                    }`}>
                      {sector.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Detail Panel */}
          <div className="lg:w-2/5 flex">
            <div className="w-full bg-white rounded p-8 md:p-10 border border-[#D9D9D9] flex flex-col justify-between relative overflow-hidden">
              <div>
                {/* Panel Icon Frame */}
                <div className="w-12 h-12 bg-[#F8F8F6] border border-[#D9D9D9] rounded flex items-center justify-center mb-8">
                  <ActiveIcon className="w-5 h-5 text-black" />
                </div>

                <span className="font-mono text-[9px] text-[#555555] tracking-[0.25em] uppercase font-medium block mb-2">
                  SETOR DETALHADO // 0{sectors.findIndex(s => s.id === selectedSector) + 1}
                </span>

                <h3 className="font-display font-medium text-2xl sm:text-3xl text-black tracking-tight mb-4">
                  {activeSectorObj.name}
                </h3>

                <p className="text-[#555555] text-xs leading-relaxed font-light mb-8">
                  {activeSectorObj.details}
                </p>
              </div>

              {/* Dynamic decorative map watermark */}
              <div className="pt-6 border-t border-[#D9D9D9] flex items-center gap-3 text-[#555555] font-mono text-[10px]">
                <Globe2 className="w-3.5 h-3.5 text-black" />
                <span className="tracking-wider">CRS // WGS84_GEO // SYSTEM_ACTIVE</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
