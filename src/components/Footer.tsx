import React from 'react';
import { Compass, Globe, Linkedin, Twitter, Github, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#0A0D18] border-t border-white/5 pt-16 pb-8 px-6 relative overflow-hidden" id="main-footer">
      {/* Decorative vector grid in background */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid: Left branding, Middle link columns, Right contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/5">
          
          {/* Column 1: Branding (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <a 
              href="#" 
              onClick={(e) => handleSmoothScroll(e, '#')}
              className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#A88BE8] rounded-lg p-1"
              id="footer-logo-link"
              aria-label="Central Maps - Voltar ao topo"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:border-[#A88BE8]/40 transition-colors duration-300">
                <Compass className="w-5 h-5 text-[#F9B27A]" />
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-wider text-white">
                  CENTRAL <span className="text-[#F9B27A]">MAPS</span>
                </span>
                <span className="block font-mono text-[9px] text-[#73798D] tracking-widest uppercase">
                  Spatial Intelligence // -23.5505
                </span>
              </div>
            </a>

            <p className="text-sm text-[#D6D8E2]/70 leading-relaxed font-light max-w-sm">
              Unindo tecnologia geoespacial, análise de dados de satélite e desenvolvimento digital sob medida para entregar soluções de alta precisão técnica.
            </p>

            {/* Social Icons (Min size >= 44px for accessibility) */}
            <div className="flex gap-3" aria-label="Nossos canais sociais">
              {[
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Github, label: 'GitHub', href: '#' },
              ].map((soc, idx) => {
                const IconComp = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.href}
                    className="w-11 h-11 bg-white/5 hover:bg-[#6F5BD3]/25 border border-white/10 hover:border-[#A88BE8]/40 rounded-xl flex items-center justify-center text-[#D6D8E2] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A88BE8]"
                    aria-label={`Visite nosso ${soc.label}`}
                    id={`footer-social-${soc.label.toLowerCase()}`}
                  >
                    <IconComp className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest">
              NAVEGAÇÃO
            </h4>
            <nav className="flex flex-col gap-3" aria-label="Links rápidos do rodapé">
              {[
                { label: 'Serviços', href: '#servicos' },
                { label: 'Casos de Estudo', href: '#casos' },
                { label: 'Diferenciais', href: '#diferenciais' },
                { label: 'Setores', href: '#setores' },
                { label: 'Missão', href: '#missao' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-sm text-[#D6D8E2]/80 hover:text-[#A88BE8] transition-colors focus:outline-none focus:text-[#A88BE8] w-fit"
                  id={`footer-nav-${link.href.replace('#', '')}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact details (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest">
              CONTATOS & LOCALIZAÇÃO
            </h4>
            
            <address className="not-italic space-y-3.5 text-sm text-[#D6D8E2]/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F9B27A] shrink-0 mt-0.5" />
                <span className="font-light">São Paulo, SP - Engenharia Digital & Geoprocessamento</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#A88BE8]" />
                <a href="mailto:contato@centralmaps.com.br" className="hover:text-[#A88BE8] transition-colors font-light focus:outline-none">
                  contato@centralmaps.com.br
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400" />
                <a href="tel:+5511999999999" className="hover:text-emerald-400 transition-colors font-light focus:outline-none">
                  +55 (11) 99999-9999
                </a>
              </div>
            </address>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] text-[#F9B27A]">
                <Globe className="w-3.5 h-3.5 text-[#A88BE8] animate-spin" style={{ animationDuration: '8s' }} />
                CRS // EPSG_4326 // SIRGAS2000
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright legal & technology references */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#73798D]">
          <div>
            &copy; {currentYear} CENTRAL MAPS. TODOS OS DIREITOS RESERVADOS.
          </div>
          <div className="flex items-center gap-2">
            <span>PLATFORM: CLOUD SPATIAL ENGINE</span>
            <span>•</span>
            <span>MAP RESOLUTION: 10M SPECTRAL</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
