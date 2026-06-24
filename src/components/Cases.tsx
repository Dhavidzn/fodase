import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Image as ImageIcon, Layout, Eye, ChevronRight, Activity, Crosshair, Sparkles } from 'lucide-react';

export default function Cases() {
  const [activeTab, setActiveTab] = useState<'satellite' | 'dashboard' | 'gis'>('satellite');
  
  // States for Satellite Slider
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // States for WebGIS
  const [coords, setCoords] = useState({ lat: -23.550523, lng: -46.633309 });
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    contours: true,
    hydrography: true,
    riskZones: false,
    boundaries: false,
  });

  // State for Dashboard Case
  const [selectedRegion, setSelectedRegion] = useState<'A' | 'B' | 'C'>('A');

  // Handle Satellite slider drag
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleMouseUp);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleMouseUp);
  };

  // Clean up listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  // WebGIS cursor movement coordinate simulator
  const handleGisMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Simulate real São Paulo geo-coordinates with variation
    const baseLat = -23.550523;
    const baseLng = -46.633309;
    setCoords({
      lat: baseLat + (y - 0.5) * 0.04,
      lng: baseLng + (x - 0.5) * 0.05
    });
  };

  // Regional metrics for statistical dashboard
  const regionMetrics = {
    A: {
      nativeForest: 42,
      pasture: 28,
      urban: 18,
      water: 12,
      vegetationIndex: '0.74 (Saudável)',
      carbonStock: '14.200 t/CO2',
      alertCount: 2
    },
    B: {
      nativeForest: 15,
      pasture: 55,
      urban: 24,
      water: 6,
      vegetationIndex: '0.41 (Médio)',
      carbonStock: '5.100 t/CO2',
      alertCount: 8
    },
    C: {
      nativeForest: 68,
      pasture: 10,
      urban: 5,
      water: 17,
      vegetationIndex: '0.89 (Excelente)',
      carbonStock: '24.900 t/CO2',
      alertCount: 0
    }
  };

  return (
    <section className="relative py-28 px-6 bg-[#0A0A0B] border-t border-[#2A2A2C] overflow-hidden" id="casos">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-[#A1A1A5] font-mono text-[10px] uppercase tracking-[0.25em] mb-4">
              CASOS DE ESTUDO & PROJETOS
            </div>
            <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight">
              Aplicações Práticas <br />
              <span className="italic font-normal">e Estudos de Território</span>
            </h2>
            <p className="text-[#A1A1A5] text-sm max-w-xl mt-4 font-light tracking-wide">
              Explore o funcionamento real dos mapas, dashboards, imagens de satélite e sistemas digitais que desenvolvemos para otimizar operações.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap gap-1 bg-[#141416] p-1 rounded border border-[#2A2A2C]">
            <button
              onClick={() => setActiveTab('satellite')}
              className={`flex items-center gap-2 text-[10px] font-mono font-medium uppercase tracking-[0.15em] py-2 px-3 rounded transition-all duration-200 ${
                activeTab === 'satellite' ? 'bg-white text-black' : 'text-[#A1A1A5] hover:text-white'
              }`}
              aria-label="Ver Caso de Imagens de Satélite"
              id="tab-satellite"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Sensoriamento
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 text-[10px] font-mono font-medium uppercase tracking-[0.15em] py-2 px-3 rounded transition-all duration-200 ${
                activeTab === 'dashboard' ? 'bg-white text-black' : 'text-[#A1A1A5] hover:text-white'
              }`}
              aria-label="Ver Caso de Dashboards Interativos"
              id="tab-dashboard"
            >
              <Activity className="w-3.5 h-3.5" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('gis')}
              className={`flex items-center gap-2 text-[10px] font-mono font-medium uppercase tracking-[0.15em] py-2 px-3 rounded transition-all duration-200 ${
                activeTab === 'gis' ? 'bg-white text-black' : 'text-[#A1A1A5] hover:text-white'
              }`}
              aria-label="Ver Caso de Plataformas GIS"
              id="tab-gis"
            >
              <Layers className="w-3.5 h-3.5" />
              Sistemas GIS
            </button>
          </div>
        </div>

        {/* Tab Content Display Container */}
        <div className="bg-[#141416] rounded-lg p-6 md:p-10 border border-[#2A2A2C] min-h-[500px] flex flex-col lg:flex-row gap-10">
          
          <AnimatePresence mode="wait">
            
            {/* Tab 1: SATELLITE IMAGE COMPARING SLIDER */}
            {activeTab === 'satellite' && (
              <motion.div
                key="satellite"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col lg:flex-row gap-10 items-center justify-between"
              >
                {/* Left explanation info */}
                <div className="lg:w-2/5 space-y-6">
                  <span className="font-mono text-[10px] font-medium text-white tracking-[0.25em] uppercase block">
                    CASO 01 // SENSORIAMENTO REMOTO
                  </span>
                  <h3 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
                    Análise Multiespectral <br />
                    <span className="italic font-normal">por Satélite</span>
                  </h3>
                  <p className="text-[#A1A1A5] text-xs leading-relaxed font-light">
                    O processamento avançado de imagens orbitais de sensores como o Sentinel-2 permite a classificação automática do uso da terra e o cálculo de índices biofísicos.
                  </p>
                  <p className="text-[#A1A1A5] text-xs leading-relaxed font-light">
                    Arraste o cursor deslizante no mapa ao lado para comparar a <strong className="text-white font-semibold">Imagem Natural RGB</strong> com o <strong className="text-white font-semibold">Índice de Vegetação de Diferença Normalizada (NDVI)</strong> processado pela nossa equipe, mapeando florestas saudáveis de solos expostos ou áreas antropizadas.
                  </p>
                  
                  {/* Tech specs readout */}
                  <div className="bg-[#0A0A0B] p-4 rounded border border-[#2A2A2C] font-mono text-[10px] space-y-2">
                    <div className="flex justify-between"><span className="text-[#A1A1A5]">SENSORES:</span> <span className="text-white font-medium">Sentinel-2 MSI</span></div>
                    <div className="flex justify-between"><span className="text-[#A1A1A5]">RESOLUÇÃO:</span> <span className="text-white font-medium">10 metros espectrais</span></div>
                    <div className="flex justify-between"><span className="text-[#A1A1A5]">ALGORITMO:</span> <span className="text-white font-medium">NDVI Spectral Index</span></div>
                  </div>
                </div>

                {/* Right Slider UI Element */}
                <div className="w-full lg:w-3/5">
                  <div 
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    className="relative w-full aspect-[4/3] rounded overflow-hidden cursor-ew-resize select-none border border-[#2A2A2C]"
                  >
                    {/* Natural RGB Background */}
                    <div 
                      className="absolute inset-0 bg-[#0A0A0B] bg-cover bg-center"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200')`,
                      }}
                    >
                      {/* Tech Label */}
                      <span className="absolute bottom-4 left-4 z-20 bg-white text-black font-mono text-[9px] py-1 px-2.5 uppercase tracking-wider">
                        FOTO REAL RGB (SAT)
                      </span>
                    </div>

                    {/* False Color NDVI Overlay with clip-path clip */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200')`,
                        clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                      }}
                    >
                      {/* Spectral Filter simulation */}
                      <div className="absolute inset-0 bg-black/40 mix-blend-overlay" />
                      
                      {/* Tech Label */}
                      <span className="absolute bottom-4 right-4 z-20 bg-black text-white font-mono text-[9px] py-1 px-2.5 border border-white uppercase tracking-wider">
                        PROCESSADO NDVI (FILTRADO)
                      </span>
                    </div>

                    {/* Drag Line Handle Divider */}
                    <div 
                      className="absolute top-0 bottom-0 w-[1px] bg-white z-30"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      {/* Circle Pointer Node */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shadow-sm border border-white">
                        <Crosshair className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: INTERACTIVE STATISTICAL DASHBOARD */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col lg:flex-row gap-10 items-center justify-between"
              >
                {/* Left Info Column */}
                <div className="lg:w-2/5 space-y-6">
                  <span className="font-mono text-[10px] font-medium text-white tracking-[0.25em] uppercase block">
                    CASO 02 // ANALISE DE DADOS & BI
                  </span>
                  <h3 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
                    Painéis de <br />
                    <span className="italic font-normal">Indicadores Territoriais</span>
                  </h3>
                  <p className="text-[#A1A1A5] text-xs leading-relaxed font-light">
                    Nossa equipe integra dados geográficos com bancos relacionais para gerar dashboards analíticos customizados de forma elegante.
                  </p>
                  <p className="text-[#A1A1A5] text-xs leading-relaxed font-light">
                    Selecione uma bacia hidrográfica de exemplo abaixo para simular a atualização em tempo real de estatísticas territoriais cruciais para monitoramento ambiental e tomada de decisão:
                  </p>

                  {/* Dynamic Sector Switch Buttons */}
                  <div className="flex gap-2">
                    {(['A', 'B', 'C'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setSelectedRegion(r)}
                        className={`flex-1 py-2 px-3 rounded font-mono text-[10px] font-medium tracking-wider uppercase transition-all border ${
                          selectedRegion === r 
                            ? 'bg-white text-black border-white' 
                            : 'bg-[#0A0A0B] text-[#A1A1A5] border-[#2A2A2C] hover:border-white'
                        }`}
                        id={`btn-region-${r}`}
                      >
                        Bacia {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Interactive Dashboard Graphic */}
                <div className="w-full lg:w-3/5 bg-[#0A0A0B] border border-[#2A2A2C] rounded p-6 relative">
                  {/* Dashboard Header decoration */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2A2A2C]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="font-mono text-[9px] text-white tracking-widest uppercase">SPATIAL BI // METRICS PANEL // BACIA {selectedRegion}</span>
                    </div>
                    <span className="font-mono text-[9px] text-[#A1A1A5]">REF_ID: 104-CM_SP</span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#141416] p-3.5 rounded border border-[#2A2A2C]">
                      <span className="block font-mono text-[9px] text-[#A1A1A5] uppercase mb-1">Índice Vegetal (NDVI)</span>
                      <span className="text-xs font-medium text-white">{regionMetrics[selectedRegion].vegetationIndex}</span>
                    </div>
                    <div className="bg-[#141416] p-3.5 rounded border border-[#2A2A2C]">
                      <span className="block font-mono text-[9px] text-[#A1A1A5] uppercase mb-1">CO2 Estocado</span>
                      <span className="text-xs font-medium text-white">{regionMetrics[selectedRegion].carbonStock}</span>
                    </div>
                    <div className="bg-[#141416] p-3.5 rounded border border-[#2A2A2C] col-span-2 md:col-span-1">
                      <span className="block font-mono text-[9px] text-[#A1A1A5] uppercase mb-1">Alertas Desmatamento</span>
                      <span className="text-xs font-medium text-white">
                        {regionMetrics[selectedRegion].alertCount} detectados
                      </span>
                    </div>
                  </div>

                  {/* SVG Bar Chart */}
                  <div className="space-y-4">
                    <span className="block font-mono text-[10px] text-white uppercase font-medium tracking-wider mb-2">Composição de Cobertura e Uso do Solo</span>
                    
                    {/* Native Forest Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-white">
                        <span>Floresta Nativa</span>
                        <span className="font-semibold">{regionMetrics[selectedRegion].nativeForest}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#141416] border border-[#2A2A2C] rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${regionMetrics[selectedRegion].nativeForest}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-white rounded-full" 
                        />
                      </div>
                    </div>

                    {/* Pasture Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-[#A1A1A5]">
                        <span>Pastagem / Agro</span>
                        <span className="font-semibold text-white">{regionMetrics[selectedRegion].pasture}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#141416] border border-[#2A2A2C] rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${regionMetrics[selectedRegion].pasture}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-neutral-500 rounded-full" 
                        />
                      </div>
                    </div>

                    {/* Urban Area Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-[#A1A1A5]">
                        <span>Área Urbana</span>
                        <span className="font-semibold text-white">{regionMetrics[selectedRegion].urban}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#141416] border border-[#2A2A2C] rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${regionMetrics[selectedRegion].urban}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-neutral-300 rounded-full" 
                        />
                      </div>
                    </div>

                    {/* Water Bodies Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-[#A1A1A5]">
                        <span>Corpos d'Água</span>
                        <span className="font-semibold text-white">{regionMetrics[selectedRegion].water}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#141416] border border-[#2A2A2C] rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${regionMetrics[selectedRegion].water}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-neutral-200 rounded-full" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: INTERACTIVE PLATFORMS & SYSTEM LAYOUT */}
            {activeTab === 'gis' && (
              <motion.div
                key="gis"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col lg:flex-row gap-10 items-center justify-between"
              >
                {/* Left Info Column */}
                <div className="lg:w-2/5 space-y-6">
                  <span className="font-mono text-[10px] font-medium text-white tracking-[0.25em] uppercase block">
                    CASO 03 // SISTEMAS WEB E GIS
                  </span>
                  <h3 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
                    Plataformas e <br />
                    <span className="italic font-normal">Sistemas WebGIS</span>
                  </h3>
                  <p className="text-[#A1A1A5] text-xs leading-relaxed font-light">
                    Desenvolvemos aplicações web e painéis administrativos que integram visualização cartográfica interativa, servindo dados geográficos de forma performática.
                  </p>
                  <p className="text-[#A1A1A5] text-xs leading-relaxed font-light">
                    Interaja com a interface de simulação ao lado: ative/desative as camadas de dados (layers) e movimente seu cursor sobre o canvas de coordenadas para ver a marcação GPS em tempo real.
                  </p>
                  
                  {/* Layer switches */}
                  <div className="bg-[#0A0A0B] p-5 rounded border border-[#2A2A2C] space-y-3.5">
                    <span className="block font-mono text-[9px] text-white uppercase tracking-wider font-semibold">Camadas de Informação</span>
                    
                    <label className="flex items-center justify-between cursor-pointer group" id="toggle-layer-contours">
                      <span className="text-xs text-[#A1A1A5] group-hover:text-white transition-colors">Curvas de Nível (Contour)</span>
                      <input 
                        type="checkbox" 
                        checked={activeLayers.contours} 
                        onChange={() => setActiveLayers(prev => ({ ...prev, contours: !prev.contours }))}
                        className="w-4 h-4 rounded border-[#2A2A2C] accent-white cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group" id="toggle-layer-hydrography">
                      <span className="text-xs text-[#A1A1A5] group-hover:text-white transition-colors">Drenagem e Hidrografia</span>
                      <input 
                        type="checkbox" 
                        checked={activeLayers.hydrography} 
                        onChange={() => setActiveLayers(prev => ({ ...prev, hydrography: !prev.hydrography }))}
                        className="w-4 h-4 rounded border-[#2A2A2C] accent-white cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group" id="toggle-layer-risk">
                      <span className="text-xs text-[#A1A1A5] group-hover:text-white transition-colors">Zonas de Risco Geotécnico</span>
                      <input 
                        type="checkbox" 
                        checked={activeLayers.riskZones} 
                        onChange={() => setActiveLayers(prev => ({ ...prev, riskZones: !prev.riskZones }))}
                        className="w-4 h-4 rounded border-[#2A2A2C] accent-white cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group" id="toggle-layer-boundaries">
                      <span className="text-xs text-[#A1A1A5] group-hover:text-white transition-colors">Limites de Propriedade (CAR)</span>
                      <input 
                        type="checkbox" 
                        checked={activeLayers.boundaries} 
                        onChange={() => setActiveLayers(prev => ({ ...prev, boundaries: !prev.boundaries }))}
                        className="w-4 h-4 rounded border-[#2A2A2C] accent-white cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {/* Right Interactive WebGIS simulator Canvas */}
                <div className="w-full lg:w-3/5">
                  <div 
                    onMouseMove={handleGisMouseMove}
                    className="relative w-full aspect-[4/3] bg-[#0A0A0B] border border-[#2A2A2C] rounded overflow-hidden group"
                    id="gis-canvas"
                  >
                    {/* Simulated Map Grid/Coordinates Backdrop */}
                    <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
                    
                    {/* Coordinate lines */}
                    <div className="absolute top-1/2 inset-x-0 h-[1px] bg-white/5 border-dashed" />
                    <div className="absolute left-1/2 inset-y-0 w-[1px] bg-white/5 border-dashed" />

                    {/* Simulated SVG Cartographic layers */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
                      
                      {/* Curvas de Nivel Layer */}
                      {activeLayers.contours && (
                        <g stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" fill="none" strokeDasharray="3,3">
                          <path d="M 50,50 Q 150,120 200,80 T 350,150" />
                          <path d="M 50,100 Q 140,160 210,130 T 350,200" />
                          <path d="M 50,150 Q 130,200 220,180 T 350,250" />
                        </g>
                      )}

                      {/* Hydrography Layer */}
                      {activeLayers.hydrography && (
                        <g stroke="#ffffff" strokeWidth="1.5" fill="none">
                          <path d="M 0,280 Q 120,200 180,240 T 400,60" />
                          <path d="M 180,240 Q 220,280 300,290" opacity="0.4" strokeWidth="1.0" />
                        </g>
                      )}

                      {/* Risk Zones Layer */}
                      {activeLayers.riskZones && (
                        <g stroke="#A1A1A5" strokeWidth="1.5" fill="rgba(255, 255, 255, 0.05)">
                          <circle cx="150" cy="110" r="45" />
                          <polygon points="260,180 310,190 290,230 240,210" />
                        </g>
                      )}

                      {/* Property Boundaries */}
                      {activeLayers.boundaries && (
                        <g stroke="#ffffff" strokeWidth="1.5" fill="none" strokeDasharray="2,2">
                          <polygon points="80,40 220,30 280,100 120,150" />
                        </g>
                      )}

                      {/* Floating hover node */}
                      <g fill="none" stroke="#ffffff" strokeWidth="1">
                        <circle cx="200" cy="150" r="10" className="animate-ping" style={{ transformOrigin: '200px 150px' }} />
                        <circle cx="200" cy="150" r="3" fill="#ffffff" />
                      </g>
                    </svg>

                    {/* Floating GPS Target Circle Reticle on hover */}
                    <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                      <div className="bg-[#141416] border border-white/20 py-2 px-3.5 rounded text-[10px] font-mono shadow-sm flex items-center gap-2 pointer-events-none z-20">
                        <Crosshair className="w-3.5 h-3.5 text-white" />
                        <div>
                          <div className="text-white font-semibold">LAT: {coords.lat.toFixed(6)}</div>
                          <div className="text-[#A1A1A5]">LNG: {coords.lng.toFixed(6)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Watermark markings */}
                    <div className="absolute bottom-4 left-4 z-10 text-white/30 font-mono text-[8px]">
                      SYSTEM STATE: ONLINE // CRS_WGS84_GEO
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
