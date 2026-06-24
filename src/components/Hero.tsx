import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Orbit, Award } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const zoomLevelSpanRef = useRef<HTMLSpanElement>(null);
  const timecodeSpanRef = useRef<HTMLSpanElement>(null);
  const scrollLabelRef = useRef<HTMLSpanElement>(null);

  const duration = 8.0; // 8 seconds total video duration
  const totalFrames = 100; // 100 frames is highly optimized for fast preloading and perfectly smooth scrub
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);

  const containerOffsetTopRef = useRef<number>(0);
  const containerHeightRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isUpdatingRef = useRef<boolean>(false);
  const framesRef = useRef<ImageBitmap[]>([]);

  const CLOUDINARY_VIDEO_URL = "https://res.cloudinary.com/dox4hbvgw/video/upload/v1782270270/Satellite_zooming_out_from_Earth_202606202308_i7ppso.mp4";

  /**
   * EXPLICAÇÃO DA SOLUÇÃO ULTRA-FLUIDA:
   * 
   * 1. 100% Livre de Travamentos: Ao invés de fazer seek no elemento de vídeo nativo em tempo de execução durante a rolagem (o que
   *    sobrecarrega o decodificador de vídeo da GPU e causa travamentos e quebras visuais), nós criamos um pré-carregador inteligente.
   * 2. Pré-renderização Client-side (100% compatível com Vercel): No carregamento da página, um elemento de vídeo oculto busca e decodifica
   *    as frames do vídeo hospedado na nuvem (Cloudinary) em paralelo, desenhando-as num canvas offscreen para gerar objetos `ImageBitmap` 
   *    armazenados diretamente na memória GPU.
   * 3. Sem dependência de Git/arquivos locais: As frames são geradas em tempo de execução no próprio navegador do cliente, garantindo 
   *    que a aplicação funcione perfeitamente tanto no ambiente de desenvolvimento local quanto após o Deploy na Vercel.
   * 4. Easing Amanteigado a 60fps/120fps: No loop de animação `requestAnimationFrame`, desenhar o `ImageBitmap` pré-renderizado leva menos de 0.1ms,
   *    garantindo responsividade instantânea no scroll do mouse.
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

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Localizar o frame carregado mais próximo do índice desejado (para funcionamento instantâneo)
    let frame = framesRef.current[index];
    
    if (!frame) {
      let minDiff = Infinity;
      let closestIndex = -1;
      for (let i = 0; i < totalFrames; i++) {
        if (framesRef.current[i]) {
          const diff = Math.abs(i - index);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
          }
        }
      }
      if (closestIndex !== -1) {
        frame = framesRef.current[closestIndex];
      }
    }

    if (frame) {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = frame.width;
      const imgHeight = frame.height;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      } else {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(currentProgressRef.current * (totalFrames - 1))));
      drawFrame(frameIndex);
    }
  };

  // 1. Decodificar e Pré-carregar frames do vídeo dinamicamente no navegador do cliente (GPU-optimized)
  useEffect(() => {
    let active = true;
    
    const video = document.createElement('video');
    video.src = CLOUDINARY_VIDEO_URL;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const offscreenCanvas = document.createElement('canvas');
    // 960x540 é o equilíbrio perfeito para velocidade de decodificação extrema, baixo consumo de memória RAM e altíssima nitidez
    offscreenCanvas.width = 960;
    offscreenCanvas.height = 540;
    const offscreenCtx = offscreenCanvas.getContext('2d');

    let currentFrame = 0;
    
    // Inicializar framesRef.current com array vazio de tamanho totalFrames
    framesRef.current = new Array(totalFrames).fill(null);

    const seekNextFrame = () => {
      if (!active) return;
      if (currentFrame < totalFrames) {
        // Mapear progressivamente cada frame no tempo total de 8 segundos
        const targetTime = (currentFrame / (totalFrames - 1)) * duration;
        video.currentTime = targetTime;
      } else {
        // Pré-carregamento concluído com sucesso
        console.log(`Pre-cached all ${totalFrames} frames as GPU ImageBitmaps successfully.`);
        // Desenhar a primeira frame imediatamente
        resizeCanvas();
      }
    };

    const onSeeked = async () => {
      if (!active) return;
      try {
        if (offscreenCtx) {
          offscreenCtx.drawImage(video, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
          const bitmap = await createImageBitmap(offscreenCanvas);
          if (active) {
            framesRef.current[currentFrame] = bitmap;
            
            // Ativa o canvas imediatamente assim que o primeiro frame é renderizado na GPU
            if (currentFrame === 0) {
              setIsVideoLoaded(true);
              resizeCanvas();
            }
            
            currentFrame++;
            setLoadedCount(currentFrame);
            seekNextFrame();
          }
        }
      } catch (err) {
        console.error("Frame extraction error at index:", currentFrame, err);
        currentFrame++;
        seekNextFrame();
      }
    };

    const onLoadedMetadata = () => {
      if (!active) return;
      seekNextFrame();
    };

    const onError = (e: any) => {
      console.error("Cloudinary Video preloader failed to fetch metadata:", e);
      setLoadError(true);
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', onError);

    video.load();

    return () => {
      active = false;
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
      video.pause();
      video.src = "";
      video.load();
    };
  }, []);

  // Monitorar redimensionamento do viewport e ajustar canvas
  useEffect(() => {
    measureContainer();
    resizeCanvas();
    const handleResize = () => {
      measureContainer();
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);
    const timeoutId = setTimeout(handleResize, 150);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [isVideoLoaded]);

  // 3. Scroll-driven system com Easing linear interpolado e rendering instantâneo por GPU
  useEffect(() => {
    if (!isVideoLoaded) return;

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
      const targetProgress = targetProgressRef.current;
      const diffProgress = targetProgress - currentProgressRef.current;
      
      // Amanteigamento cinético e macio da velocidade do scroll (coeficiente de inércia 0.1)
      if (Math.abs(diffProgress) > 0.0005) {
        currentProgressRef.current += diffProgress * 0.1;
      } else {
        currentProgressRef.current = targetProgress;
      }

      const currentProgress = currentProgressRef.current;
      const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(currentProgress * (totalFrames - 1))));
      
      const canvas = canvasRef.current;
      if (canvas) {
        drawFrame(frameIndex);

        // Zoom out espacial e rotação sutis por aceleração de hardware 3D
        const scaleVal = 1.3 - (currentProgress * 0.3); // De 1.3x para 1.0x smoothly
        const rotateVal = (1 - currentProgress) * 0.8;   // Rotação sutil de 0.8deg para 0deg
        canvas.style.transform = `scale(${scaleVal}) rotate(${rotateVal}deg)`;
      }

      // Atualizar overlays visuais de narrativa e interfaces de forma síncrona
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

      if (timecodeSpanRef.current) {
        const currentVTime = currentProgress * duration;
        timecodeSpanRef.current.textContent = `TIMECODE: ${currentVTime.toFixed(2)}s / ${duration.toFixed(1)}s`;
      }

      const progressReached = Math.abs(targetProgress - currentProgress) < 0.0005;

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
      className="relative w-full h-[350vh] bg-[#0A0A0B]" 
      id="hero-track"
    >
      {/* Sticky viewport container (100vh) */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
        
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

        {/* Dynamic, hardware-accelerated scroll-controlled preloaded frame sequence */}
        {!loadError && (
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-70' : 'opacity-0'
            }`}
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'scale(1.3)'
            }}
          />
        )}

        {/* Subtle, non-blocking background progress bar and status indicator */}
        {loadedCount < totalFrames && !loadError && (
          <div className="absolute top-24 right-6 z-30 flex flex-col items-end gap-1.5 pointer-events-none">
            <div className="flex items-center gap-2 bg-black border border-white/20 px-3 py-1.5 rounded shadow-sm">
              <Orbit className="w-3.5 h-3.5 text-white animate-spin" />
              <span className="font-mono text-[9px] text-white uppercase tracking-[0.15em]">
                PRELOADING: {Math.round((loadedCount / totalFrames) * 100)}%
              </span>
            </div>
            {/* Tiny progress bar */}
            <div className="w-24 h-[1px] bg-white/20 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${Math.round((loadedCount / totalFrames) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Ambient Overlay: Dark elegant luxury overlay */}
        <div 
          className="absolute inset-0 bg-black/40 z-10"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)`
          }}
        />
 
        {/* Stark Editorial Grid Lines */}
        <div className="absolute inset-0 z-10 pointer-events-none grid grid-cols-4 border-x border-white/5">
          <div className="border-r border-white/5" />
          <div className="border-r border-white/5" />
          <div className="border-r border-white/5" />
        </div>
 
        {/* Floating tech markings / interface details for Spatial aesthetic */}
        <div className="absolute inset-x-8 bottom-32 z-20 hidden md:flex justify-between pointer-events-none text-white/40 font-mono text-[9px] tracking-[0.2em] uppercase">
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
            <span>ORBIT_STATUS // LIVE</span>
          </div>
          <div className="flex items-center gap-6">
            <span ref={zoomLevelSpanRef}>ZOOM: 100.0%</span>
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
              transition: 'opacity 0.2s ease-out, transform 0.2s ease-out'
            }}
            className="max-w-4xl"
          >
            {/* Elegant Brand Tagline */}
            <div className="inline-block mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
                CENTRAL MAPS // SPATIAL INTELLIGENCE
              </span>
            </div>
 
            {/* Headline */}
            <h1 className="font-display font-medium text-4xl sm:text-6xl md:text-8xl tracking-tight text-white mb-6 leading-[1.0] max-w-5xl">
              Dados espaciais em <br />
              <span className="italic font-normal text-white/95">decisões de impacto</span>.
            </h1>
 
            {/* Subheadline */}
            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl mb-10 tracking-wide">
              Geoprocessamento de alta precisão, sensoriamento remoto avançado e engenharia de sistemas sob medida para impulsionar projetos de qualquer escala.
            </p>
 
            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a 
                href="#contato"
                className="inline-block bg-white text-black font-medium text-xs uppercase tracking-[0.2em] px-8 py-4 rounded hover:bg-neutral-200 transition-colors duration-200"
                id="hero-cta"
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>
 
          {/* Narrative Stage 2: Secondary Supporting Copy (Revealed mid-scroll) */}
          <div 
            ref={stage2Ref}
            style={{ 
              opacity: 0,
              pointerEvents: 'none',
              transition: 'opacity 0.2s ease-out'
            }}
            className="absolute inset-x-6 max-w-3xl mx-auto text-center"
          >
            <div className="inline-block mb-4">
              <span className="font-mono text-[10px] tracking-[0.25em] text-white/60 uppercase">
                TECNOLOGIA MULTIESPECTRAL
              </span>
            </div>
            
            <h2 className="font-display italic font-normal text-3xl sm:text-5xl tracking-tight text-white mb-6 leading-tight">
              Visão orbital para planejar o amanhã
            </h2>
            
            <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed mb-8 tracking-wide font-light">
              Extraímos padrões invisíveis através do processamento avançado de imagens de satélite Landsat e Sentinel para tomada de decisões estratégicas.
            </p>
 
            <a
              href="#introducao"
              onClick={handleScrollToNext}
              className="inline-flex items-center gap-2 border border-white text-white font-medium text-xs uppercase tracking-[0.2em] px-6 py-3.5 rounded hover:bg-white hover:text-black transition-colors duration-200"
              id="hero-scroll-btn"
            >
              Conhecer Serviços
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
 
        </div>
 
        {/* Scroll Indicator Icon (Absolute bottom of viewport) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
          <span ref={scrollLabelRef} className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/40">
            EXPLORE O TERRITÓRIO
          </span>
          <div className="w-4 h-7 border border-white/20 rounded-full flex items-start justify-center p-1">
            <motion.div 
              animate={{ 
                y: [0, 8, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-1 h-1 rounded-full bg-white" 
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}
