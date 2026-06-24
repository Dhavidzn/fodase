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
    <footer className="bg-[#F8F8F6] border-t border-[#D9D9D9] pt-20 pb-10 px-6 relative overflow-hidden" id="main-footer">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid: Left branding, Middle link columns, Right contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D9D9D9]">
          
          {/* Column 1: Branding (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <a 
              href="#" 
              onClick={(e) => handleSmoothScroll(e, '#')}
              className="inline-flex items-center gap-3 group focus:outline-none"
              id="footer-logo-link"
              aria-label="Central Maps - Voltar ao topo"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-white border border-[#D9D9D9] rounded group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                <Compass className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <span className="font-display font-medium text-lg tracking-wider text-black">
                  CENTRAL <span className="italic font-normal">MAPS</span>
                </span>
                <span className="block font-mono text-[8px] text-[#555555] tracking-[0.25em] uppercase">
                  SPATIAL INTELLIGENCE // SP // BR
                </span>
              </div>
            </a>

            <p className="text-xs text-[#555555] leading-relaxed font-light max-w-xs">
              Unindo tecnologia geoespacial, análise de dados de satélite e desenvolvimento digital sob medida com os mais altos padrões de design e engenharia técnica.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2" aria-label="Nossos canais sociais">
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
                    className="w-10 h-10 bg-white border border-[#D9D9D9] hover:bg-black hover:text-white hover:border-black rounded flex items-center justify-center text-[#555555] transition-all duration-200"
                    aria-label={`Visite nosso ${soc.label}`}
                    id={`footer-social-${soc.label.toLowerCase()}`}
                  >
                    <IconComp className="w-4 h-4 text-current" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-[9px] font-semibold text-black uppercase tracking-[0.25em]">
              NAVEGAÇÃO
            </h4>
            <nav className="flex flex-col gap-3.5" aria-label="Links rápidos do rodapé">
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
                  className="text-xs text-[#555555] hover:text-black hover:italic transition-all w-fit"
                  id={`footer-nav-${link.href.replace('#', '')}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact details (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-mono text-[9px] font-semibold text-black uppercase tracking-[0.25em]">
              CONTATOS & LOCALIZAÇÃO
            </h4>
            
            <address className="not-italic space-y-3.5 text-xs text-[#555555]">
              <div className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                <span className="font-light">São Paulo, SP — Engenharia Digital & Geoprocessamento</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-black" />
                <a href="mailto:contato@centralmaps.com.br" className="hover:text-black hover:underline transition-colors font-light">
                  contato@centralmaps.com.br
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-3.5 h-3.5 text-black" />
                <a href="tel:+5511999999999" className="hover:text-black hover:underline transition-colors font-light">
                  +55 (11) 99999-9999
                </a>
              </div>
            </address>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D9D9D9] rounded font-mono text-[8px] text-[#555555] uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-black" />
                CRS // EPSG_4326 // SYSTEM
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright legal & technology references */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-mono text-[#555555]">
          <div>
            &copy; {currentYear} CENTRAL MAPS. TODOS OS DIREITOS RESERVADOS.
          </div>
          <div className="flex items-center gap-2 uppercase tracking-wider">
            <span>PLATFORM: CLOUD SPATIAL ENGINE</span>
            <span>•</span>
            <span>MAP RESOLUTION: 10M SPECTRAL</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
