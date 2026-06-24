import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Menu, X, Globe } from 'lucide-react';

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress bar percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      
      // Header background opacity trigger
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Casos de Estudo', href: '#casos' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Setores', href: '#setores' },
    { label: 'Missão', href: '#missao' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#F8F8F6]/90 backdrop-blur-md border-b border-[#D9D9D9] py-3' : 'bg-transparent py-5'
      }`}
      id="main-header"
    >
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[2px] bg-black transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso de leitura da página"
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => handleSmoothScroll(e, '#')} 
          className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-black rounded p-1"
          aria-label="Central Maps - Voltar ao topo"
          id="logo-link"
        >
          <div className="relative w-8 h-8 flex items-center justify-center bg-black text-white rounded">
            <Compass className="w-4 h-4 transition-transform duration-500 ease-out group-hover:rotate-45" />
          </div>
          <div>
            <div className="font-display font-bold text-sm tracking-[0.15em] text-black">
              CENTRAL MAPS
            </div>
            <div className="font-mono text-[8px] text-[#555555] tracking-widest uppercase">
              GEOSPATIAL INTELLIGENCE // SP_BR
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação Principal">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="text-[11px] font-medium text-black/60 hover:text-black uppercase tracking-[0.2em] transition-colors duration-200 relative py-1 focus:outline-none focus:text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
              id={`nav-${item.href.replace('#', '')}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contato"
            onClick={(e) => handleSmoothScroll(e, '#contato')}
            className="inline-flex items-center gap-2 border border-black bg-black text-white font-medium text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded hover:bg-neutral-800 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-black"
            id="nav-cta"
          >
            Orçamento
          </a>
        </div>

        {/* Mobile Menu Trigger Button (Target area > 44px) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded border border-black/10 bg-white text-black focus:outline-none focus:ring-1 focus:ring-black"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          id="mobile-menu-trigger"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#F8F8F6] border-b border-[#D9D9D9] py-6 px-6 md:hidden flex flex-col gap-5 shadow-sm"
          >
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-xs font-medium text-black/70 hover:text-black py-2 border-b border-black/5 uppercase tracking-[0.15em] focus:outline-none"
                  id={`mobile-nav-${item.href.replace('#', '')}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="#contato"
              onClick={(e) => handleSmoothScroll(e, '#contato')}
              className="w-full text-center bg-black text-white font-medium text-xs uppercase tracking-[0.15em] py-3 px-6 rounded transition-all duration-300 hover:bg-neutral-800"
              id="mobile-nav-cta"
            >
              Solicitar Orçamento
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
