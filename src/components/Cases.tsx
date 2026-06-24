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
    <section className="relative py-24 px-6 bg-[#131C35]/30 border-y border-white/5 overflow-hidden" id="casos">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6F5BD3]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#A88BE8] font-mono text-xs uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#A88BE8]" />
              CASOS DE ESTUDO & PROJETOS
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Aplicações Práticas Desenvolvidas
            </h2>
            <p className="text-[#D6D8E2]/75 text-base sm:text-lg max-w-2xl mt-4 font-light">
              Explore o funcionamento real dos mapas, dashboards, imagens de satélite e sistemas digitais que desenvolvemos para otimizar operações.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap gap-2.5 bg-[#0A0D18]/80 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('satellite')}
              className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all duration-300 ${
                activeTab === 'satellite' ? 'bg-[#A88BE8] text-[#0A0D18]' : 'text-[#D6D8E2]/70 hover:text-white hover:bg-white/5'
              }`}
              aria-label="Ver Caso de Imagens de Satélite"
              id="tab-satellite"
            >
              <ImageIcon className="w-4 h-4" />
              Sensoriamento
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all duration-300 ${
                activeTab === 'dashboard' ? 'bg-[#A88BE8] text-[#0A0D18]' : 'text-[#D6D8E2]/70 hover:text-white hover:bg-white/5'
              }`}
              aria-label="Ver Caso de Dashboards Interativos"
              id="tab-dashboard"
            >
              <Activity className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('gis')}
              className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all duration-300 ${
                activeTab === 'gis' ? 'bg-[#A88BE8] text-[#0A0D18]' : 'text-[#D6D8E2]/70 hover:text-white hover:bg-white/5'
              }`}
              aria-label="Ver Caso de Plataformas GIS"
              id="tab-gis"
            >
              <Layers className="w-4 h-4" />
              Sistemas GIS
            </button>
          </div>
        </div>

        {/* Tab Content Display Container */}
        <div className="bg-glass rounded-[32px] p-6 md:p-10 border border-white/10 min-h-[500px] flex flex-col lg:flex-row gap-10 shadow-floating-card">
          
          <AnimatePresence mode="wait">
            
            {/* Tab 1: SATELLITE IMAGE COMPARING SLIDER */}
            {activeTab === 'satellite' && (
              <motion.div
                key="satellite"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col lg:flex-row gap-10 items-center justify-between"
              >
                {/* Left explanation info */}
                <div className="lg:w-2/5 space-y-6">
                  <span className="font-mono text-xs font-bold text-[#F9B27A] tracking-widest uppercase">
                    CASO 01 // SENSORIAMENTO REMOTO
                  </span>
                  <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight">
                    Análise Multiespectral por Satélite
                  </h3>
                  <p className="text-[#D6D8E2]/80 text-sm leading-relaxed font-light">
                    O processamento avançado de imagens orbitais de sensores como o Sentinel-2 permite a classificação automática do uso da terra e o cálculo de índices biofísicos.
                  </p>
                  <p className="text-[#D6D8E2]/80 text-sm leading-relaxed font-light">
                    Arraste o cursor deslizante no mapa ao lado para comparar a <strong className="text-white">Imagem Natural RGB</strong> com o <strong className="text-[#F9B27A]">Índice de Vegetação de Diferença Normalizada (NDVI)</strong> processado pela nossa equipe, mapeando florestas saudáveis (em verde brilhante) de solos expostos ou áreas antropizadas.
                  </p>
                  
                  {/* Tech specs readout */}
                  <div className="bg-[#0A0D18]/60 p-4 rounded-2xl border border-white/5 font-mono text-xs space-y-2">
                    <div className="flex justify-between"><span className="text-[#73798D]">SENSORES:</span> <span className="text-white">Sentinel-2 MSI</span></div>
                    <div className="flex justify-between"><span className="text-[#73798D]">RESOLUÇÃO:</span> <span className="text-white">10 metros espectrais</span></div>
                    <div className="flex justify-between"><span className="text-[#73798D]">ALGORITMO:</span> <span className="text-[#A88BE8]">NDVI Spectral Index</span></div>
                  </div>
                </div>

                {/* Right Slider UI Element */}
                <div className="w-full lg:w-3/5">
                  <div 
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-premium-glow"
                  >
                    {/* Natural RGB Background */}
                    <div 
                      className="absolute inset-0 bg-[#131C35] bg-cover bg-center"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200')`,
                      }}
                    >
                      {/* Tech Label */}
                      <span className="absolute bottom-4 left-4 z-20 bg-[#0A0D18]/80 text-white font-mono text-[10px] py-1 px-2.5 rounded-md border border-white/15">
                        FOTO REAL RGB (SAT)
                      </span>
                    </div>

                    {/* False Color NDVI Overlay with clip-path clip */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center mix-blend-color-dodge brightness-150 contrast-125"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200')`,
                        clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                      }}
                    >
                      {/* Spectral Filter Gradient simulation */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 via-emerald-700/40 to-yellow-500/10 mix-blend-overlay" />
                      
                      {/* Tech Label */}
                      <span className="absolute bottom-4 right-4 z-20 bg-[#6F5BD3]/90 text-white font-mono text-[10px] py-1 px-2.5 rounded-md border border-white/15">
                        ÍNDICE SPECTRAL NDVI (PROCESSADO)
                      </span>
                    </div>

                    {/* Drag Line Handle Divider */}
                    <div 
                      className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F9B27A] via-white to-[#A88BE8] z-30"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      {/* Circle Pointer Node */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-[#0A0D18] flex items-center justify-center shadow-floating-card border border-white">
                        <Crosshair className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col lg:flex-row gap-10 items-center justify-between"
              >
                {/* Left Info Column */}
                <div className="lg:w-2/5 space-y-6">
                  <span className="font-mono text-xs font-bold text-[#F9B27A] tracking-widest uppercase">
                    CASO 02 // ANALISE DE DADOS & BI
                  </span>
                  <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight">
                    Painéis de Indicadores Inteligentes
                  </h3>
                  <p className="text-[#D6D8E2]/80 text-sm leading-relaxed font-light">
                    Nossa equipe integra dados geográficos com bancos relacionais para gerar dashboards analíticos customizados em Business Intelligence.
                  </p>
                  <p className="text-[#D6D8E2]/80 text-sm leading-relaxed font-light">
                    Selecione uma bacia hidrográfica de exemplo abaixo para simular a atualização em tempo real de estatísticas territoriais cruciais para monitoramento ambiental e tomada de decisão:
                  </p>

                  {/* Dynamic Sector Switch Buttons */}
                  <div className="flex gap-3">
                    {(['A', 'B', 'C'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setSelectedRegion(r)}
                        className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all border ${
                          selectedRegion === r 
                            ? 'bg-[#131C35] text-[#F9B27A] border-[#F9B27A]' 
                            : 'bg-[#0A0D18]/40 text-[#D6D8E2]/60 border-white/5 hover:border-white/20'
                        }`}
                        id={`btn-region-${r}`}
                      >
                        Bacia {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Interactive Dashboard Graphic */}
                <div className="w-full lg:w-3/5 bg-[#0A0D18]/90 border border-white/10 rounded-2xl p-6 relative">
                  {/* Dashboard Header decoration */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono text-[10px] text-[#73798D] tracking-widest uppercase">SPATIAL BI // METRICS PANEL // BACIA {selectedRegion}</span>
                    </div>
                    <span className="font-mono text-[10px] text-white/50">REF_ID: 104-CM_SP</span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#131C35]/50 p-3.5 rounded-xl border border-white/5">
                      <span className="block font-mono text-[10px] text-[#73798D] uppercase mb-1">Índice Vegetal (NDVI)</span>
                      <span className="text-base font-semibold text-white">{regionMetrics[selectedRegion].vegetationIndex}</span>
                    </div>
                    <div className="bg-[#131C35]/50 p-3.5 rounded-xl border border-white/5">
                      <span className="block font-mono text-[10px] text-[#73798D] uppercase mb-1">CO2 Estocado</span>
                      <span className="text-base font-semibold text-[#A88BE8]">{regionMetrics[selectedRegion].carbonStock}</span>
                    </div>
                    <div className="bg-[#131C35]/50 p-3.5 rounded-xl border border-white/5 col-span-2 md:col-span-1">
                      <span className="block font-mono text-[10px] text-[#73798D] uppercase mb-1">Alertas Desmatamento</span>
                      <span className={`text-base font-semibold ${regionMetrics[selectedRegion].alertCount > 0 ? 'text-[#FF9B5A]' : 'text-emerald-400'}`}>
                        {regionMetrics[selectedRegion].alertCount} detectados
                      </span>
                    </div>
                  </div>

                  {/* SVG glowing Bar Chart */}
                  <div className="space-y-4">
                    <span className="block font-mono text-[11px] text-[#73798D] uppercase font-bold tracking-wider mb-2">Composição de Cobertura e Uso do Solo</span>
                    
                    {/* Native Forest Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-[#D6D8E2]">
                        <span>Floresta Nativa</span>
                        <span className="text-emerald-400 font-bold">{regionMetrics[selectedRegion].nativeForest}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${regionMetrics[selectedRegion].nativeForest}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" 
                        />
                      </div>
                    </div>

                    {/* Pasture Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-[#D6D8E2]">
                        <span>Pastagem / Agro</span>
                        <span className="text-[#F9B27A] font-bold">{regionMetrics[selectedRegion].pasture}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${regionMetrics[selectedRegion].pasture}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-[#F9B27A] to-yellow-500 rounded-full" 
                        />
                      </div>
                    </div>

                    {/* Urban Area Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-[#D6D8E2]">
                        <span>Área Urbana</span>
                        <span className="text-red-400 font-bold">{regionMetrics[selectedRegion].urban}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${regionMetrics[selectedRegion].urban}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-red-500 to-[#FF9B5A] rounded-full" 
                        />
                      </div>
                    </div>

                    {/* Water Bodies Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-[#D6D8E2]">
                        <span>Corpos d'Água</span>
                        <span className="text-cyan-400 font-bold">{regionMetrics[selectedRegion].water}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${regionMetrics[selectedRegion].water}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-[#6F5BD3] rounded-full" 
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col lg:flex-row gap-10 items-center justify-between"
              >
                {/* Left Info Column */}
                <div className="lg:w-2/5 space-y-6">
                  <span className="font-mono text-xs font-bold text-[#F9B27A] tracking-widest uppercase">
                    CASO 03 // SISTEMAS WEB E GIS
                  </span>
                  <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight">
                    Plataformas e Sistemas WebGIS
                  </h3>
                  <p className="text-[#D6D8E2]/80 text-sm leading-relaxed font-light">
                    Desenvolvemos aplicações web e painéis administrativos que integram visualização cartográfica interativa, servindo dados geográficos de forma performática.
                  </p>
                  <p className="text-[#D6D8E2]/80 text-sm leading-relaxed font-light">
                    Interaja com a interface de simulação ao lado: ative/desative as camadas de dados (layers) e movimente seu cursor sobre o canvas de coordenadas para ver a marcação GPS em tempo real.
                  </p>
                  
                  {/* Layer switches */}
                  <div className="bg-[#0A0D18]/60 p-5 rounded-2xl border border-white/5 space-y-3.5">
                    <span className="block font-mono text-[10px] text-[#73798D] uppercase tracking-wider font-bold">Camadas de Informação (Toggles)</span>
                    
                    <label className="flex items-center justify-between cursor-pointer group" id="toggle-layer-contours">
                      <span className="text-xs text-[#D6D8E2] group-hover:text-white transition-colors">Curvas de Nível (Contour)</span>
                      <input 
                        type="checkbox" 
                        checked={activeLayers.contours} 
                        onChange={() => setActiveLayers(prev => ({ ...prev, contours: !prev.contours }))}
                        className="w-4 h-4 rounded border-white/10 bg-white/5 accent-[#A88BE8] cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group" id="toggle-layer-hydrography">
                      <span className="text-xs text-[#D6D8E2] group-hover:text-white transition-colors">Drenagem e Hidrografia</span>
                      <input 
                        type="checkbox" 
                        checked={activeLayers.hydrography} 
                        onChange={() => setActiveLayers(prev => ({ ...prev, hydrography: !prev.hydrography }))}
                        className="w-4 h-4 rounded border-white/10 bg-white/5 accent-[#A88BE8] cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group" id="toggle-layer-risk">
                      <span className="text-xs text-[#D6D8E2] group-hover:text-white transition-colors">Zonas de Risco Geotécnico</span>
                      <input 
                        type="checkbox" 
                        checked={activeLayers.riskZones} 
                        onChange={() => setActiveLayers(prev => ({ ...prev, riskZones: !prev.riskZones }))}
                        className="w-4 h-4 rounded border-white/10 bg-white/5 accent-[#A88BE8] cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group" id="toggle-layer-boundaries">
                      <span className="text-xs text-[#D6D8E2] group-hover:text-white transition-colors">Limites de Propriedade (CAR)</span>
                      <input 
                        type="checkbox" 
                        checked={activeLayers.boundaries} 
                        onChange={() => setActiveLayers(prev => ({ ...prev, boundaries: !prev.boundaries }))}
                        className="w-4 h-4 rounded border-white/10 bg-white/5 accent-[#A88BE8] cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {/* Right Interactive WebGIS simulator Canvas */}
                <div className="w-full lg:w-3/5">
                  <div 
                    onMouseMove={handleGisMouseMove}
                    className="relative w-full aspect-[4/3] bg-[#0A0D18] border border-white/10 rounded-2xl overflow-hidden shadow-floating-card group"
                    id="gis-canvas"
                  >
                    {/* Simulated Map Grid/Coordinates Backdrop */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
                    
                    {/* Coordinate lines */}
                    <div className="absolute top-1/2 inset-x-0 h-[1px] bg-white/10 border-dashed" />
                    <div className="absolute left-1/2 inset-y-0 w-[1px] bg-white/10 border-dashed" />

                    {/* Simulated SVG Cartographic layers */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
                      
                      {/* Curvas de Nivel Layer */}
                      {activeLayers.contours && (
                        <g stroke="rgba(168, 139, 232, 0.4)" strokeWidth="1.2" fill="none" strokeDasharray="3,3">
                          <path d="M 50,50 Q 150,120 200,80 T 350,150" />
                          <path d="M 50,100 Q 140,160 210,130 T 350,200" />
                          <path d="M 50,150 Q 130,200 220,180 T 350,250" />
                        </g>
                      )}

                      {/* Hydrography Layer (Blue rivers) */}
                      {activeLayers.hydrography && (
                        <g stroke="#38bdf8" strokeWidth="2.5" fill="none">
                          <path d="M 0,280 Q 120,200 180,240 T 400,60" />
                          <path d="M 180,240 Q 220,280 300,290" opacity="0.6" strokeWidth="1.5" />
                        </g>
                      )}

                      {/* Risk Zones Layer (Red outline, filled translucent) */}
                      {activeLayers.riskZones && (
                        <g stroke="#f87171" strokeWidth="1.5" fill="rgba(248, 113, 113, 0.15)">
                          <circle cx="150" cy="110" r="45" />
                          <polygon points="260,180 310,190 290,230 240,210" />
                        </g>
                      )}

                      {/* Property Boundaries (Yellow polygonal border) */}
                      {activeLayers.boundaries && (
                        <g stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeDasharray="2,2">
                          <polygon points="80,40 220,30 280,100 120,150" />
                        </g>
                      )}

                    </svg>

                    {/* Floating GPS Target Circle Reticle on hover */}
                    <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                      <div className="bg-[#131C35]/90 border border-[#A88BE8]/50 backdrop-blur-md py-2 px-3.5 rounded-lg text-[11px] font-mono shadow-floating-card flex items-center gap-2 pointer-events-none z-20">
                        <Crosshair className="w-3.5 h-3.5 text-[#F9B27A] animate-pulse" />
                        <div>
                          <div className="text-white">LAT: {coords.lat.toFixed(6)}</div>
                          <div className="text-[#A88BE8]">LNG: {coords.lng.toFixed(6)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Watermark markings */}
                    <div className="absolute bottom-4 left-4 z-10 text-white/30 font-mono text-[9px]">
                      SYSTEM STATE: ONLINE // RESOLUTION_OK
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
