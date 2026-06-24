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
        isScrolled ? 'bg-[#0A0D18]/85 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
      id="main-header"
    >
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#FFB37A] via-[#E6B0D5] to-[#A88BE8] transition-all duration-75"
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
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#A88BE8] rounded-lg p-1"
          aria-label="Central Maps - Voltar ao topo"
          id="logo-link"
        >
          <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:border-[#A88BE8]/40 transition-colors duration-300">
            <Compass className="w-5 h-5 text-[#F9B27A] group-hover:rotate-45 transition-transform duration-500 ease-out" />
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-[#6F5BD3] to-[#F9B27A] opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />
          </div>
          <div>
            <div className="font-display font-bold text-lg tracking-wider text-white">
              CENTRAL <span className="text-[#F9B27A]">MAPS</span>
            </div>
            <div className="font-mono text-[9px] text-[#73798D] tracking-widest uppercase">
              Spatial Intelligence // -23.5505
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
              className="text-[15px] font-medium text-[#D6D8E2] hover:text-[#A88BE8] transition-colors duration-200 relative py-1 focus:outline-none focus:text-[#A88BE8] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#A88BE8] hover:after:w-full after:transition-all after:duration-300"
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
            className="inline-flex items-center gap-2 border border-[#A88BE8]/20 bg-[#131C35]/60 hover:bg-[#6F5BD3]/20 hover:border-[#A88BE8]/50 text-white font-medium text-sm px-5 py-2.5 rounded-xl backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A88BE8]"
            id="nav-cta"
          >
            <Globe className="w-4 h-4 text-[#F9B27A]" />
            Solicitar Orçamento
          </a>
        </div>

        {/* Mobile Menu Trigger Button (Target area > 44px) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#A88BE8]"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          id="mobile-menu-trigger"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#0A0D18]/98 backdrop-blur-lg border-b border-white/10 py-6 px-6 md:hidden flex flex-col gap-5 shadow-floating-card"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-lg font-medium text-[#D6D8E2] hover:text-[#A88BE8] py-2 border-b border-white/5 focus:outline-none focus:text-[#A88BE8]"
                  id={`mobile-nav-${item.href.replace('#', '')}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="#contato"
              onClick={(e) => handleSmoothScroll(e, '#contato')}
              className="w-full text-center bg-[#F9B27A] text-[#0A0D18] font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-[#FF9B5A] focus:outline-none focus:ring-2 focus:ring-[#F9B27A]"
              id="mobile-nav-cta"
            >
              Falar com um Especialista
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
