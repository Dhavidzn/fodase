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

  const [videoSource, setVideoSource] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);

  const CLOUDINARY_VIDEO_URL = "https://res.cloudinary.com/dox4hbvgw/video/upload/v1782270270/Satellite_zooming_out_from_Earth_202606202308_i7ppso.mp4";

  /**
   * EXPLICATIVE METADATA: WHY THE VIDEO FAILS IN PRODUCTION (VERCEL) BUT WORKS LOCALLY
   * 
   * 1. Dynamic Public Assets missing in Git: When optimizing the video locally, the file `/public/satellite-optimized.mp4` 
   *    is saved on the developer's local storage. Since local compiled binaries or temporary files are ignored or not pushed 
   *    to the remote GitHub/Git branch, the Vercel deployment build has NO access to `/satellite-optimized.mp4`, resulting in a 404 error.
   * 2. CORS & Preflight checks: Cloudinary or other external CDNs may block cross-origin requests unless the video element 
   *    explicitly configures the `crossOrigin="anonymous"` attribute and the request headers are preflighted correctly.
   * 3. CurrentTime Mutation & Race Conditions: Mutating `video.currentTime` before `loadedmetadata` or before `readyState >= 1` 
   *    triggers a fatal browser exception ("InvalidStateError") in Safari and Chrome. This halts React render loops on live builds.
   * 4. AutoPlay Restrictions: Many modern mobile browsers and production policies automatically block media elements 
   *    that are not explicitly `muted`, `playsInline` or that lack a user interaction, unless preload is set appropriately.
   */

  // 1. Verify if the video is actually available via fetch() before initialization
  useEffect(() => {
    let isMounted = true;
    
    const verifyVideoSrc = async () => {
      try {
        console.log("Checking video availability on Cloudinary...");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout
        
        const response = await fetch(CLOUDINARY_VIDEO_URL, { 
          method: 'HEAD',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!isMounted) return;
        
        if (response.ok) {
          console.log("Cloudinary video is available. Setting source.");
          setVideoSource(CLOUDINARY_VIDEO_URL);
        } else {
          throw new Error(`Cloudinary responded with status: ${response.status}`);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error("Cloudinary video fetch check failed or is blocked by CORS/Adblockers:", err);
        
        // Try local fallback
        try {
          console.log("Attempting local fallback check...");
          const localCheck = await fetch("/satellite-optimized.mp4", { method: 'HEAD' });
          if (localCheck.ok) {
            console.log("Local fallback video is available. Setting source.");
            setVideoSource("/satellite-optimized.mp4");
          } else {
            throw new Error("Local fallback video not found.");
          }
        } catch (localErr) {
          console.error("Local fallback video check also failed:", localErr);
          setVideoError(true);
        }
      }
    };

    verifyVideoSrc();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Wait for loadedmetadata event, add logs and error handling before starting scroll logic
  useEffect(() => {
    if (!videoSource) return;
    
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      console.log("Video loaded");
      console.log("Duration:", video.duration);
      console.log("Ready State:", video.readyState);
      
      setDuration(video.duration || 8);
      setIsVideoLoaded(true);
    };

    const onVideoError = (e: Event) => {
      console.error("HTML5 Video Error encountered:", e);
      if (video.error) {
        console.error(`Detailed Video Error Code: ${video.error.code}; Message: ${video.error.message}`);
      }
      setVideoError(true);
    };

    if (video.readyState >= 1) {
      onLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', onLoadedMetadata);
    }
    
    video.addEventListener('error', onVideoError);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('error', onVideoError);
    };
  }, [videoSource]);

  // 3. Refactored scroll-driven system that works ONLY after the video is completely loaded (isVideoLoaded === true)
  useEffect(() => {
    if (!isVideoLoaded) return;

    let animationId: number;
    let lastProgress = -1;
    let lastTime = -1;
    
    const updateFrame = () => {
      const container = containerRef.current;
      const video = videoRef.current;
      
      if (container && video && video.readyState >= 1) {
        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalScrollRange = rect.height - viewportHeight;
        
        let progress = 0;
        if (totalScrollRange > 0) {
          progress = -rect.top / totalScrollRange;
          progress = Math.max(0, Math.min(1, progress));
        }
        
        const videoDuration = video.duration || duration || 8;
        const targetTime = progress * videoDuration;
        
        // Ensure accurate tracking without decoder stalls
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.005 && !video.seeking) {
          if (progress < 0.002) {
            video.currentTime = 0;
          } else if (progress > 0.998) {
            video.currentTime = videoDuration;
          } else {
            video.currentTime += diff * 0.35;
          }
        }
        
        // Fast direct DOM updates to keep scrolling fully responsive
        if (progress !== lastProgress) {
          lastProgress = progress;
          
          if (stage1Ref.current) {
            const firstTextOpacity = Math.max(0, 1 - progress * 2.5);
            const textTransform = `translateY(${-progress * 40}px)`;
            stage1Ref.current.style.opacity = String(firstTextOpacity);
            stage1Ref.current.style.transform = textTransform;
            stage1Ref.current.style.pointerEvents = firstTextOpacity > 0.1 ? 'auto' : 'none';
          }
          
          if (stage2Ref.current) {
            const secondTextOpacity = Math.max(0, Math.min(1, (progress - 0.3) * 4));
            stage2Ref.current.style.opacity = String(secondTextOpacity);
            stage2Ref.current.style.pointerEvents = secondTextOpacity > 0.1 ? 'auto' : 'none';
          }
          
          if (zoomLevelSpanRef.current) {
            zoomLevelSpanRef.current.textContent = `ZOOM LEVEL: ${(100 - progress * 80).toFixed(1)}%`;
          }
          
          if (scrollLabelRef.current) {
            scrollLabelRef.current.textContent = progress < 0.9 ? 'EXPLORE O TERRITÓRIO' : 'CONTINUE ROLANDO';
          }
        }
        
        const currentVTime = video.currentTime;
        if (Math.abs(currentVTime - lastTime) > 0.01) {
          lastTime = currentVTime;
          if (timecodeSpanRef.current) {
            timecodeSpanRef.current.textContent = `TIMECODE: ${currentVTime.toFixed(2)}s / ${videoDuration.toFixed(1)}s`;
          }
        }
      }
      
      animationId = requestAnimationFrame(updateFrame);
    };
    
    animationId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animationId);
  }, [isVideoLoaded, duration]);

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
        
        {/* Visual Fallback: High-resolution Space Earth Satellite image from Unsplash */}
        {(videoError || !isVideoLoaded) && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 z-0"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop')`,
              opacity: videoError ? 1 : 0.4
            }}
            aria-hidden="true"
          />
        )}

        {/* Background Space Video */}
        {videoSource && !videoError && (
          <video
            ref={videoRef}
            src={videoSource}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-80' : 'opacity-0'
            }`}
            muted
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            aria-hidden="true"
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
            <span ref={timecodeSpanRef}>TIMECODE: 0.00s / {duration ? duration.toFixed(1) : '10.0'}s</span>
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
