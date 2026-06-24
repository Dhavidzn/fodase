import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Orbit, Award } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const zoomLevelSpanRef = useRef<HTMLSpanElement>(null);
  const timecodeSpanRef = useRef<HTMLSpanElement>(null);
  const scrollLabelRef = useRef<HTMLSpanElement>(null);

  const duration = 8.0; // 8 seconds total video duration
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);

  const containerOffsetTopRef = useRef<number>(0);
  const containerHeightRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isUpdatingRef = useRef<boolean>(false);

  const CLOUDINARY_VIDEO_URL = "https://res.cloudinary.com/dox4hbvgw/video/upload/v1782270270/Satellite_zooming_out_from_Earth_202606202308_i7ppso.mp4";

  /**
   * EXPLICAÇÃO DOS PROBLEMAS DE IMPLANTAÇÃO NA VERCEL:
   * 
   * 1. Erro de 404 (Arquivos Locais): Arquivos gerados por scripts locais (como as imagens na pasta "/public/frames" ou o vídeo otimizado local)
   *    só existem no sistema de arquivos do contêiner de desenvolvimento. Como não são commitados no histórico do Git ou gerados dinamicamente
   *    no build server da Vercel (onde ferramentas como o ffmpeg não estão instaladas), esses arquivos retornam 404 em produção na Vercel.
   * 2. Travamentos do Decoder HTML5: Alterar o `currentTime` do vídeo em todas as frames de scroll sobrecarrega o decodificador da GPU,
   *    fazendo o vídeo travar.
   * 3. Solução Aplicada: Apontamos diretamente para o link público de CDN do Cloudinary (100% de disponibilidade na Vercel), limitamos
   *    o seek do vídeo usando um semáforo de seek (`!video.seeking`), e aplicamos aceleração de transformações CSS síncronas na GPU
   *    para garantir que a interface responda instantaneamente de forma 100% fluida enquanto os frames de vídeo são atualizados.
   */

  const measureContainer = () => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      containerOffsetTopRef.current = rect.top + scrollTop;
      containerHeightRef.current = rect.height;
    }
  };

  // Inicializar verificação do vídeo e logs
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      console.log("Video loaded metadata");
      console.log("Duration:", video.duration);
      console.log("Ready State:", video.readyState);
      setIsVideoLoaded(true);
    };

    const onCanPlay = () => {
      setIsVideoLoaded(true);
    };

    const onError = (e: Event) => {
      console.error("Cloudinary video failed to load:", e);
      setLoadError(true);
    };

    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('error', onError);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('error', onError);
    };
  }, []);

  // Monitorar redimensionamento do viewport
  useEffect(() => {
    measureContainer();
    window.addEventListener('resize', measureContainer);
    const timeoutId = setTimeout(measureContainer, 150);
    return () => {
      window.removeEventListener('resize', measureContainer);
      clearTimeout(timeoutId);
    };
  }, []);

  // 3. Scroll-driven system com Seek Throttled & Easing e visual transform acelerado por GPU
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const offsetTop = containerOffsetTopRef.current;
      const height = containerHeightRef.current;
      const totalScrollRange = height - window.innerHeight;
      
      let progress = 0;
      if (totalScrollRange > 0) {
        progress = (scrollTop - offsetTop) / totalScrollRange;
        progress = Math.max(0, Math.min(1, progress));
      }
      
      targetProgressRef.current = progress;
      
      if (!isUpdatingRef.current) {
        isUpdatingRef.current = true;
        requestAnimationFrame(updateLoop);
      }
    };

    const updateLoop = () => {
      const video = videoRef.current;
      const targetProgress = targetProgressRef.current;
      const diffProgress = targetProgress - currentProgressRef.current;
      
      // Suavização do progresso para movimento amanteigado e responsivo
      if (Math.abs(diffProgress) > 0.001) {
        currentProgressRef.current += diffProgress * 0.12;
      } else {
        currentProgressRef.current = targetProgress;
      }

      const currentProgress = currentProgressRef.current;
      const targetTime = currentProgress * duration;

      if (video && video.readyState >= 1) {
        // Mudança dinâmica de escala (efeito zoom espacial) por hardware para fluidez absoluta em 60fps
        const scaleVal = 1.3 - (currentProgress * 0.3); // Zoom suave de 1.3x para 1.0x
        const rotateVal = (1 - currentProgress) * 0.8;   // Rotação suave de 0.8deg para 0deg
        video.style.transform = `scale(${scaleVal}) rotate(${rotateVal}deg)`;

        // Controlar o seek do vídeo para evitar sobrecarga no decodificador
        // Só fazemos o seek se o vídeo não estiver buscando no momento
        const timeDiff = Math.abs(video.currentTime - targetTime);
        if (timeDiff > 0.08 && !video.seeking) {
          video.currentTime = targetTime;
        }
      }

      // Atualizar overlays visuais de narrativa e interfaces
      if (stage1Ref.current) {
        const firstTextOpacity = Math.max(0, 1 - currentProgress * 2.5);
        const textTransform = `translateY(${-currentProgress * 40}px)`;
        stage1Ref.current.style.opacity = String(firstTextOpacity);
        stage1Ref.current.style.transform = textTransform;
        stage1Ref.current.style.pointerEvents = firstTextOpacity > 0.1 ? 'auto' : 'none';
      }
      
      if (stage2Ref.current) {
        const secondTextOpacity = Math.max(0, Math.min(1, (currentProgress - 0.3) * 4));
        stage2Ref.current.style.opacity = String(secondTextOpacity);
        stage2Ref.current.style.pointerEvents = secondTextOpacity > 0.1 ? 'auto' : 'none';
      }
      
      if (zoomLevelSpanRef.current) {
        zoomLevelSpanRef.current.textContent = `ZOOM LEVEL: ${(100 - currentProgress * 80).toFixed(1)}%`;
      }
      
      if (scrollLabelRef.current) {
        scrollLabelRef.current.textContent = currentProgress < 0.9 ? 'EXPLORE O TERRITÓRIO' : 'CONTINUE ROLANDO';
      }

      if (timecodeSpanRef.current && video) {
        timecodeSpanRef.current.textContent = `TIMECODE: ${video.currentTime.toFixed(2)}s / ${duration.toFixed(1)}s`;
      }

      const progressReached = Math.abs(targetProgress - currentProgress) < 0.001;

      if (!progressReached) {
        requestAnimationFrame(updateLoop);
      } else {
        isUpdatingRef.current = false;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isVideoLoaded]);

  const handleScrollToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const servicesSection = document.querySelector('#introducao');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[350vh] bg-[#0A0D18]" 
      id="hero-track"
    >
      {/* Sticky viewport container (100vh) */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#0A0D18]">
        
        {/* Visual Fallback during load or in case of error */}
        {(loadError || !isVideoLoaded) && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 z-0"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop')`,
              opacity: loadError ? 1 : 0.4
            }}
            aria-hidden="true"
          />
        )}

        {/* Dynamic, hardware-accelerated scroll-controlled video */}
        {!loadError && (
          <video
            ref={videoRef}
            src={CLOUDINARY_VIDEO_URL}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-80' : 'opacity-0'
            }`}
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'scale(1.3)'
            }}
          />
        )}

        {/* Ambient Overlay: Dark, blue-purple glow mesh overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#0A0D18]/50 via-[#0A0D18]/70 to-[#0A0D18] z-10"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(10, 13, 24, 0.4) 0%, rgba(10, 13, 24, 0.95) 100%)`
          }}
        />

        {/* Tech Grid Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Floating tech markings / interface details for Spatial aesthetic */}
        <div className="absolute inset-x-6 top-28 z-20 hidden md:flex justify-between pointer-events-none text-white/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Orbit className="w-4 h-4 text-[#A88BE8] animate-spin" style={{ animationDuration: '10s' }} />
            <span>SAT_PREVIEW // MULTISPECTRAL_ORBIT_LOCK_ON</span>
          </div>
          <div className="flex items-center gap-4">
            <span ref={zoomLevelSpanRef}>ZOOM LEVEL: 100.0%</span>
            <span ref={timecodeSpanRef}>TIMECODE: 0.00s / {duration.toFixed(1)}s</span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 max-w-7xl mx-auto">
          
          {/* Narrative Stage 1: Entrance/Hook Copy (Visible at start) */}
          <div 
            ref={stage1Ref}
            style={{ 
              opacity: 1, 
              transform: 'translateY(0px)',
              transition: 'opacity 0.15s ease-out, transform 0.15s ease-out'
            }}
            className="max-w-4xl"
          >
            {/* Elegant Brand Tagline */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#F9B27A]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#D6D8E2]">
                CENTRAL MAPS • Inteligência Geoespacial
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl leading-[95%] tracking-tight text-white mb-6">
              Inteligência Geoespacial para Transformar Dados em Decisões
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[#D6D8E2]/90 font-light leading-relaxed max-w-2xl mb-8">
              Geoprocessamento, Sensoriamento Remoto, Desenvolvimento de Sistemas e Soluções Digitais sob medida para empresas, instituições e projetos de qualquer porte.
            </p>

            {/* Tags / Statements */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 text-sm font-semibold tracking-wider text-[#A88BE8] uppercase font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F9B27A]" />
                Mapeamos territórios.
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6B0D5]" />
                Analisamos dados.
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A88BE8]" />
                Desenvolvemos tecnologia.
              </span>
            </div>

            {/* CTA and Mouse Scroller */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a 
                href="#contato"
                className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-[#0A0D18]"
                id="hero-cta"
              >
                Solicitar Orçamento
              </a>
              
              <div className="flex items-center gap-3 text-[#D6D8E2]/60 text-xs font-mono tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F9B27A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F9B27A]"></span>
                </span>
                ROLE PARA ROLAR O VÍDEO E EXPLORAR
              </div>
            </div>
          </div>

          {/* Narrative Stage 2: Secondary Supporting Copy (Revealed mid-scroll) */}
          <div 
            ref={stage2Ref}
            style={{ 
              opacity: 0,
              pointerEvents: 'none',
              transition: 'opacity 0.15s ease-out'
            }}
            className="absolute inset-x-6 md:max-w-4xl max-w-xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#6F5BD3]/10 border border-[#A88BE8]/30 px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-[#A88BE8]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A88BE8]">
                Visual Premium & Precisão Técnica
              </span>
            </div>
            
            <h2 className="font-display font-bold text-3xl sm:text-5xl leading-tight text-white mb-6">
              Transformando Dados em Soluções Inteligentes
            </h2>
            
            <p className="text-base sm:text-lg text-[#D6D8E2] max-w-2xl mx-auto leading-relaxed mb-8">
              Geoprocessamento, Sensoriamento Remoto e Desenvolvimento Digital para empresas que precisam tomar decisões com precisão.
            </p>

            <a
              href="#introducao"
              onClick={handleScrollToNext}
              className="btn-secondary inline-flex items-center gap-2 text-sm"
              id="hero-scroll-btn"
            >
              Conhecer Serviços
              <ChevronDown className="w-4 h-4 text-[#F9B27A] animate-bounce" />
            </a>
          </div>

        </div>

        {/* Scroll Indicator Icon (Absolute bottom of viewport) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
          <span ref={scrollLabelRef} className="text-[10px] font-mono tracking-widest uppercase text-white/40">
            EXPLORE O TERRITÓRIO
          </span>
          <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-1.5">
            <motion.div 
              animate={{ 
                y: [0, 12, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-1.5 h-1.5 rounded-full bg-[#F9B27A]" 
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}
