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
    <section className="relative py-28 px-6 bg-[#0A0A0B] border-t border-[#2A2A2C]" id="contato">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Direct Verbatim Copy Block */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="text-[#A1A1A5] font-mono text-[10px] uppercase tracking-[0.25em]">
                SOLICITAÇÃO DE ORÇAMENTO
              </div>
              
              <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight leading-[110%]">
                Vamos Construir <br />
                <span className="italic font-normal">Seu Próximo Projeto?</span>
              </h2>
            </div>

            <div className="space-y-6 text-[#A1A1A5] text-sm leading-relaxed font-light">
              <p>
                Seja para análise geográfica, monitoramento por satélite, desenvolvimento de sistemas ou criação da sua presença digital, a Central Maps está pronta para transformar sua ideia em realidade.
              </p>
              <p className="border-l border-white pl-5 italic text-white/90">
                Entre em contato e descubra como podemos ajudar você a tomar decisões mais inteligentes.
              </p>
            </div>

            {/* Premium Editorial Call to Action Box */}
            <div className="bg-[#141416] border border-[#2A2A2C] rounded p-6 relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-white font-mono text-[9px] uppercase tracking-[0.2em] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>INTEGRAÇÃO SPATIAL // INSIGHTS</span>
                </div>
                <h3 className="font-display font-medium text-lg text-white tracking-tight">
                  Vamos transformar seus dados em resultados?
                </h3>
                <p className="text-xs text-[#A1A1A5] font-light">
                  Preencha o formulário ao lado e inicie o mapeamento de soluções com engenharia de ponta.
                </p>
                <div className="flex items-center gap-2 text-white font-mono text-[10px] font-bold pt-2 uppercase tracking-wider">
                  <span>FALAR COM UM ESPECIALISTA</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Security badges */}
            <div className="flex items-center gap-4 text-[10px] font-mono text-[#A1A1A5]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>LGPD COMPLIANT</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>RESPOSTA EM ATÉ 24H</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form Panel */}
          <div className="lg:col-span-7 bg-[#141416] rounded p-8 md:p-10 border border-[#2A2A2C] relative overflow-hidden">
            <AnimatePresence mode="wait">
              
              {!proposalResult ? (
                // Form Phase
                <motion.form 
                  key="form"
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <div className="border-b border-[#2A2A2C] pb-4 mb-6">
                    <h3 className="font-display font-medium text-lg text-white tracking-tight">
                      Mapeamento de Requisitos
                    </h3>
                    <p className="text-[9px] text-[#A1A1A5] font-mono mt-1 uppercase tracking-widest">
                      INFORME OS DADOS DO SEU TERRITÓRIO OU PROJETO
                    </p>
                  </div>

                  {/* Errors display */}
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-900/40 border border-red-500 text-white p-4 rounded text-xs flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-white" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Grid for Nome & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="form-nome" className="block text-[9px] font-mono font-semibold text-white uppercase tracking-wider">
                        Nome Completo *
                      </label>
                      <input 
                        type="text" 
                        id="form-nome"
                        name="nome"
                        value={formState.nome}
                        onChange={handleInputChange}
                        placeholder="Ex: David Costa"
                        className="w-full h-11 bg-[#0A0A0B] rounded px-4 text-white placeholder-[#A1A1A5]/40 focus:border-white focus:ring-0 outline-none text-xs transition-all border border-[#2A2A2C]"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="block text-[9px] font-mono font-semibold text-white uppercase tracking-wider">
                        E-mail de Trabalho *
                      </label>
                      <input 
                        type="email" 
                        id="form-email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="Ex: seuemail@empresa.com"
                        className="w-full h-11 bg-[#0A0A0B] rounded px-4 text-white placeholder-[#A1A1A5]/40 focus:border-white focus:ring-0 outline-none text-xs transition-all border border-[#2A2A2C]"
                        required
                      />
                    </div>
                  </div>

                  {/* Grid for Empresa & Setor */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="form-empresa" className="block text-[9px] font-mono font-semibold text-white uppercase tracking-wider">
                        Empresa / Instituição
                      </label>
                      <input 
                        type="text" 
                        id="form-empresa"
                        name="empresa"
                        value={formState.empresa}
                        onChange={handleInputChange}
                        placeholder="Ex: Agro S/A ou USP"
                        className="w-full h-11 bg-[#0A0A0B] rounded px-4 text-white placeholder-[#A1A1A5]/40 focus:border-white focus:ring-0 outline-none text-xs transition-all border border-[#2A2A2C]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="form-setor" className="block text-[9px] font-mono font-semibold text-white uppercase tracking-wider">
                        Setor de Atuação
                      </label>
                      <select 
                        id="form-setor"
                        name="setor"
                        value={formState.setor}
                        onChange={handleInputChange}
                        className="w-full h-11 bg-[#0A0A0B] rounded px-4 text-white placeholder-[#A1A1A5]/40 focus:border-white focus:ring-0 outline-none text-xs transition-all border border-[#2A2A2C] cursor-pointer"
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
                    <span className="block text-[9px] font-mono font-semibold text-white uppercase tracking-wider">
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
                          className={`flex items-center gap-2.5 p-3 rounded text-left border transition-all text-xs focus:outline-none ${
                            servicesSelected[svc.key]
                              ? 'bg-white border-white text-black font-medium'
                              : 'bg-[#0A0A0B] border-[#2A2A2C] text-[#A1A1A5] hover:border-white hover:text-white'
                          }`}
                          id={`chk-${svc.key}`}
                        >
                          <CheckSquare className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                            servicesSelected[svc.key] ? 'text-black' : 'text-neutral-600'
                          }`} />
                          <span className="truncate">{svc.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Textarea Description */}
                  <div className="space-y-2">
                    <label htmlFor="form-mensagem" className="block text-[9px] font-mono font-semibold text-white uppercase tracking-wider">
                      Descrição do Projeto / Mensagem *
                    </label>
                    <textarea 
                      id="form-mensagem"
                      name="mensagem"
                      value={formState.mensagem}
                      onChange={handleInputChange}
                      placeholder="Fale brevemente sobre sua ideia, área geográfica de interesse..."
                      className="w-full h-32 bg-[#0A0A0B] rounded p-4 text-white placeholder-[#A1A1A5]/40 focus:border-white focus:ring-0 outline-none text-xs transition-all border border-[#2A2A2C] resize-none"
                      required
                    />
                  </div>

                  {/* Submission triggers */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-white text-black hover:bg-neutral-200 flex items-center justify-center gap-3 font-medium text-xs uppercase tracking-[0.2em] disabled:opacity-50 cursor-pointer rounded transition-colors duration-200"
                      id="submit-form-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Compass className="w-4 h-4 animate-spin text-black" />
                          Processando Vetores...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-black" />
                          Falar com um Especialista
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                // Interactive Proposal Simulator Result
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-16 h-16 bg-[#0A0A0B] border border-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>

                  <span className="font-mono text-[9px] text-[#A1A1A5] tracking-[0.25em] uppercase block">
                    MAP_PROPOSAL_GENERATED // OK
                  </span>

                  <h3 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
                    Olá, <span className="italic font-normal">{proposalResult.clientName}</span>!
                  </h3>
                  
                  <p className="text-[#A1A1A5] text-xs leading-relaxed max-w-lg mx-auto font-light">
                    Obrigado pelo contato. Nosso sistema de inteligência analisou seus requisitos e gerou uma estimativa de processamento:
                  </p>

                  {/* Telemetry breakdown */}
                  <div className="bg-[#0A0A0B] border border-[#2A2A2C] rounded p-6 text-left space-y-4 max-w-md mx-auto">
                    <div className="flex items-center justify-between border-b border-[#2A2A2C] pb-3">
                      <span className="font-mono text-[9px] text-[#A1A1A5] uppercase">SERVIÇOS REQUERIDOS</span>
                      <span className="font-mono text-xs text-white font-semibold">{proposalResult.servicesCount} Módulos</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#2A2A2C] pb-3">
                      <span className="font-mono text-[9px] text-[#A1A1A5] uppercase">PRAZO ESTIMADO DE ANÁLISE</span>
                      <span className="font-mono text-xs text-white font-semibold">{proposalResult.estimatedDays} dias úteis</span>
                    </div>

                    <div className="space-y-2">
                      <span className="block font-mono text-[9px] text-[#A1A1A5] uppercase">TECNOLOGIAS DE PROCESSAMENTO INDICADAS</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proposalResult.tools.map((tool: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="bg-[#141416] border border-[#2A2A2C] px-2 py-1 rounded text-[9px] font-mono text-white"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#A1A1A5] max-w-md mx-auto italic font-light pt-4 leading-relaxed">
                    Uma cópia deste escopo tecnológico inicial foi encaminhada para {formState.email}. Um especialista da Central Maps entrará em contato em breve para agendar uma demonstração detalhada.
                  </p>

                  <button
                    type="button"
                    onClick={() => setProposalResult(null)}
                    className="border border-white hover:bg-white hover:text-black text-white px-6 py-2.5 text-[10px] font-mono uppercase tracking-[0.15em] transition-colors duration-200 cursor-pointer rounded"
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
