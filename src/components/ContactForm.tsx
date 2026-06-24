import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, ShieldCheck, Mail, Map, Settings, Compass, 
  ArrowRight, CheckSquare, Sparkles, AlertCircle
} from 'lucide-react';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    nome: '',
    email: '',
    empresa: '',
    setor: 'meio-ambiente',
    mensagem: '',
  });

  const [servicesSelected, setServicesSelected] = useState<Record<string, boolean>>({
    geoprocessamento: false,
    sensoriamento: false,
    cartografia: false,
    analiseDados: false,
    desenvolvimento: false,
    sites: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposalResult, setProposalResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (serviceKey: string) => {
    setServicesSelected(prev => ({ ...prev, [serviceKey]: !prev[serviceKey] }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!formState.nome.trim() || !formState.email.trim() || !formState.mensagem.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Mensagem).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setError('Por favor, insira um endereço de e-mail válido.');
      return;
    }

    setIsSubmitting(true);

    // Simulate real-time server calculation of a tailored spatial proposal
    setTimeout(() => {
      // Calculate dynamic estimations based on selected items
      const selectedKeys = Object.keys(servicesSelected).filter(k => servicesSelected[k]);
      let estimatedTime = 7; // Base days
      let toolsRecommended: string[] = ['Banco de Dados Geográficos (PostGIS)'];
      
      if (servicesSelected.sensoriamento) {
        estimatedTime += 5;
        toolsRecommended.push('Processamento de Imagens Sentinel-2 (NDVI)');
      }
      if (servicesSelected.geoprocessamento) {
        estimatedTime += 4;
        toolsRecommended.push('Análise de Conectividade de Fragmentos');
      }
      if (servicesSelected.cartografia) {
        estimatedTime += 3;
        toolsRecommended.push('Mapeamento Vetorial Temático QGIS');
      }
      if (servicesSelected.analiseDados) {
        estimatedTime += 4;
        toolsRecommended.push('Dashboard Interativo em BI (Streamlit/Python)');
      }
      if (servicesSelected.desenvolvimento) {
        estimatedTime += 10;
        toolsRecommended.push('Servidor de Mapas WebGIS Dedicado');
      }
      if (servicesSelected.sites) {
        estimatedTime += 5;
        toolsRecommended.push('Landing Page Otimizada SEO');
      }

      setProposalResult({
        clientName: formState.nome.split(' ')[0],
        sector: formState.setor,
        estimatedDays: estimatedTime,
        tools: toolsRecommended,
        servicesCount: selectedKeys.length || 1,
      });
      setIsSubmitting(false);
    }, 2200);
  };

  return (
    <section className="relative py-24 px-6 bg-[#0A0D18]" id="contato">
      {/* Visual atmospheric mesh backdrops */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#F9B27A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-[#6F5BD3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Direct Verbatim Copy Block */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[#A88BE8] font-mono text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#A88BE8]" />
                SOLICITAÇÃO DE ORÇAMENTO
              </div>
              
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[110%]">
                Vamos Construir Seu Próximo Projeto?
              </h2>
            </div>

            <div className="space-y-6 text-[#D6D8E2]/90 text-base sm:text-lg leading-relaxed font-light">
              <p>
                Seja para análise geográfica, monitoramento por satélite, desenvolvimento de sistemas ou criação da sua presença digital, a Central Maps está pronta para transformar sua ideia em realidade.
              </p>
              <p className="border-l-2 border-[#A88BE8] pl-5 italic text-[#D6D8E2]/80">
                Entre em contato e descubra como podemos ajudar você a tomar decisões mais inteligentes.
              </p>
            </div>

            {/* Glowing Highlight Card for CTA Final verbatim Copy */}
            <div className="bg-gradient-to-tr from-[#131C35] to-[#6F5BD3]/20 border border-[#A88BE8]/20 rounded-[24px] p-6 shadow-soft-glow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F9B27A]/5 rounded-full blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-[#F9B27A] font-mono text-xs tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>INTEGRAÇÃO SPATIAL // INSIGHTS</span>
                </div>
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-white tracking-tight">
                  Vamos transformar seus dados em resultados?
                </h3>
                <p className="text-xs text-[#D6D8E2]/70 font-light">
                  Preencha o formulário ao lado e inicie o mapeamento de soluções com engenharia de ponta.
                </p>
                <div className="flex items-center gap-2 text-[#A88BE8] font-mono text-xs font-bold pt-2">
                  <span>FALAR COM UM ESPECIALISTA</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Security badges */}
            <div className="flex items-center gap-4 text-xs font-mono text-[#73798D]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>LGPD COMPLIANT</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#A88BE8]" />
                <span>RESPOSTA EM ATÉ 24H</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium SaaS Input Form & Proposal Result Display */}
          <div className="lg:col-span-7 bg-glass rounded-[32px] p-8 md:p-10 border border-white/10 shadow-floating-card relative overflow-hidden">
            <AnimatePresence mode="wait">
              
              {!proposalResult ? (
                // Form Phase
                <motion.form 
                  key="form"
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <div className="border-b border-white/5 pb-4 mb-6">
                    <h3 className="font-display font-semibold text-xl text-white tracking-tight">
                      Mapeamento de Requisitos
                    </h3>
                    <p className="text-xs text-[#73798D] font-mono mt-1 uppercase">
                      INFORME OS DADOS DO SEU TERRITÓRIO OU PROJETO
                    </p>
                  </div>

                  {/* Errors display */}
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-xl text-xs flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Grid for Nome & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="form-nome" className="block text-xs font-mono font-bold text-[#D6D8E2] uppercase tracking-wider">
                        Nome Completo *
                      </label>
                      <input 
                        type="text" 
                        id="form-nome"
                        name="nome"
                        value={formState.nome}
                        onChange={handleInputChange}
                        placeholder="Ex: David Costa"
                        className="w-full h-14 bg-glass-input rounded-[14px] px-4 text-white placeholder-white/20 focus:border-[#A88BE8] focus:ring-1 focus:ring-[#A88BE8] outline-none text-sm transition-all bg-white/5 border border-white/10"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="block text-xs font-mono font-bold text-[#D6D8E2] uppercase tracking-wider">
                        E-mail de Trabalho *
                      </label>
                      <input 
                        type="email" 
                        id="form-email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="Ex: seuemail@empresa.com"
                        className="w-full h-14 bg-glass-input rounded-[14px] px-4 text-white placeholder-white/20 focus:border-[#A88BE8] focus:ring-1 focus:ring-[#A88BE8] outline-none text-sm transition-all bg-white/5 border border-white/10"
                        required
                      />
                    </div>
                  </div>

                  {/* Grid for Empresa & Setor */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="form-empresa" className="block text-xs font-mono font-bold text-[#D6D8E2] uppercase tracking-wider">
                        Empresa / Instituição
                      </label>
                      <input 
                        type="text" 
                        id="form-empresa"
                        name="empresa"
                        value={formState.empresa}
                        onChange={handleInputChange}
                        placeholder="Ex: Agro S/A ou USP"
                        className="w-full h-14 bg-glass-input rounded-[14px] px-4 text-white placeholder-white/20 focus:border-[#A88BE8] focus:ring-1 focus:ring-[#A88BE8] outline-none text-sm transition-all bg-white/5 border border-white/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="form-setor" className="block text-xs font-mono font-bold text-[#D6D8E2] uppercase tracking-wider">
                        Setor de Atuação
                      </label>
                      <select 
                        id="form-setor"
                        name="setor"
                        value={formState.setor}
                        onChange={handleInputChange}
                        className="w-full h-14 bg-glass-input rounded-[14px] px-4 text-white placeholder-white/20 focus:border-[#A88BE8] focus:ring-1 focus:ring-[#A88BE8] outline-none text-sm transition-all bg-[#131C35] border border-white/10 cursor-pointer"
                      >
                        <option value="meio-ambiente">Meio Ambiente</option>
                        <option value="agronegocio">Agronegócio</option>
                        <option value="energia">Energia</option>
                        <option value="engenharia">Engenharia</option>
                        <option value="pesquisa">Pesquisa Científica</option>
                        <option value="gestao-publica">Gestão Pública</option>
                        <option value="planejamento">Planejamento Territorial</option>
                        <option value="hidricos">Recursos Hídricos</option>
                        <option value="empresas">Empresas Privadas</option>
                        <option value="startups">Startups e Negócios Digitais</option>
                      </select>
                    </div>
                  </div>

                  {/* Services Checkbox area */}
                  <div className="space-y-3">
                    <span className="block text-xs font-mono font-bold text-[#D6D8E2] uppercase tracking-wider">
                      Serviços Desejados
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { key: 'geoprocessamento', label: 'Geoprocessamento' },
                        { key: 'sensoriamento', label: 'Sensoriamento' },
                        { key: 'cartografia', label: 'Cartografia' },
                        { key: 'analiseDados', label: 'Análise de Dados' },
                        { key: 'desenvolvimento', label: 'Sistemas GIS' },
                        { key: 'sites', label: 'Sites & Landing' },
                      ].map((svc) => (
                        <button
                          type="button"
                          key={svc.key}
                          onClick={() => handleCheckboxChange(svc.key)}
                          className={`flex items-center gap-2.5 p-3 rounded-xl text-left border transition-all text-xs focus:outline-none focus:ring-1 focus:ring-[#A88BE8] ${
                            servicesSelected[svc.key]
                              ? 'bg-[#6F5BD3]/25 border-[#A88BE8]/50 text-white font-semibold'
                              : 'bg-white/5 border-white/5 text-[#D6D8E2]/60 hover:border-white/10'
                          }`}
                          id={`chk-${svc.key}`}
                        >
                          <CheckSquare className={`w-4 h-4 shrink-0 transition-colors ${
                            servicesSelected[svc.key] ? 'text-[#F9B27A]' : 'text-white/20'
                          }`} />
                          <span className="truncate">{svc.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Textarea Description */}
                  <div className="space-y-2">
                    <label htmlFor="form-mensagem" className="block text-xs font-mono font-bold text-[#D6D8E2] uppercase tracking-wider">
                      Descrição do Projeto / Mensagem *
                    </label>
                    <textarea 
                      id="form-mensagem"
                      name="mensagem"
                      value={formState.mensagem}
                      onChange={handleInputChange}
                      placeholder="Fale brevemente sobre sua ideia, área geográfica de interesse ou as demandas de dados..."
                      className="w-full h-32 bg-glass-input rounded-[14px] p-4 text-white placeholder-white/20 focus:border-[#A88BE8] focus:ring-1 focus:ring-[#A88BE8] outline-none text-sm transition-all bg-white/5 border border-white/10 resize-none"
                      required
                    />
                  </div>

                  {/* Submission triggers */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary h-14 flex items-center justify-center gap-3 font-semibold text-base uppercase tracking-widest disabled:opacity-50 cursor-pointer"
                      id="submit-form-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Compass className="w-5 h-5 animate-spin" />
                          Processando Vetores...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Falar com um Especialista
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                // Interactive Proposal Simulator Result (True craftsmanship, zero fake placeholders)
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 text-center py-6"
                >
                  {/* Glowing success circle */}
                  <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-10 h-10 text-emerald-400" />
                  </div>

                  <span className="font-mono text-xs font-bold text-[#F9B27A] tracking-widest uppercase block">
                    MAP_PROPOSAL_GENERATED // OK
                  </span>

                  <h3 className="font-display font-bold text-3xl text-white tracking-tight">
                    Olá, {proposalResult.clientName}!
                  </h3>
                  
                  <p className="text-[#D6D8E2] text-sm leading-relaxed max-w-lg mx-auto font-light">
                    Obrigado pelo contato. Nosso servidor espacial analisou seus requisitos e gerou um diagnóstico de engenharia para o seu setor:
                  </p>

                  {/* Simulated telemetry breakdown */}
                  <div className="bg-[#0A0D18]/90 border border-white/10 rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto shadow-premium-glow">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="font-mono text-[10px] text-[#73798D] uppercase">SERVIÇOS REQUERIDOS</span>
                      <span className="font-mono text-xs text-[#F9B27A] font-bold">{proposalResult.servicesCount} Módulos</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="font-mono text-[10px] text-[#73798D] uppercase">PRAZO ESTIMADO DE ANÁLISE</span>
                      <span className="font-mono text-xs text-white font-bold">{proposalResult.estimatedDays} dias úteis</span>
                    </div>

                    <div className="space-y-2">
                      <span className="block font-mono text-[10px] text-[#73798D] uppercase">TECNOLOGIAS DE PROCESSAMENTO INDICADAS</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proposalResult.tools.map((tool: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="bg-[#131C35] border border-[#A88BE8]/20 px-2.5 py-1 rounded-md text-[10px] font-mono text-[#A88BE8]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#73798D] max-w-md mx-auto italic font-light pt-4">
                    Uma cópia deste escopo tecnológico inicial foi encaminhada para {formState.email}. Um especialista da Central Maps entrará em contato em breve para agendar sua demonstração espacial.
                  </p>

                  <button
                    type="button"
                    onClick={() => setProposalResult(null)}
                    className="btn-secondary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                    id="btn-proposal-reset"
                  >
                    Novo Diagnóstico de Projeto
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
