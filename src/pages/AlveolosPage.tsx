import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Tent,
  Zap,
  TreePine,
  Map,
  Ruler,
  Info,
  Check,
  ArrowRight,
  Droplets,
  Wifi,
} from 'lucide-react';
import PriceTables from '../components/PriceTables';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7 },
};

type PlotTierKey = 'pequeno' | 'grande' | 'xl';

const PLOT_TIERS: Record<
  PlotTierKey,
  {
    key: PlotTierKey;
    title: string;
    area: string;
    idealFor: string;
    totalCount: string;
    rates: { label: string; price: string }[];
    highlights: string[];
  }
> = {
  pequeno: {
    key: 'pequeno',
    title: 'Alvéolo Pequeno',
    area: 'Até 35 m² (ex. 5m × 5m)',
    idealFor: 'Tendas individuais ou familiares, carro + tenda e carrinhas camper.',
    totalCount: '150 alvéolos (Setor Norte e Sul)',
    rates: [
      { label: 'Época Baixa (16/09 – 14/06)', price: '€8,80 / noite' },
      { label: 'Época Média (15/06 – 31/07 · 01/09 – 15/09)', price: '€11,00 / noite' },
      { label: 'Época Alta (01/08 – 31/08)', price: '€12,10 / noite' },
    ],
    highlights: [
      'Espaço identificado individualmente',
      'Ligação elétrica 16A opcional (+€5,50/noite)',
      'Sombra natural ou toldo',
      'Proximidade aos blocos sanitários e piscinas',
    ],
  },
  grande: {
    key: 'grande',
    title: 'Alvéolo Grande',
    area: 'Até 90 m²',
    idealFor: 'Caravanas, autocaravanas médias ou tendas familiares amplas com toldo.',
    totalCount: '120 alvéolos (Setor Sul e Nascente)',
    rates: [
      { label: 'Época Baixa (16/09 – 14/06)', price: '€17,00 / noite' },
      { label: 'Época Média (15/06 – 31/07 · 01/09 – 15/09)', price: '€20,40 / noite' },
      { label: 'Época Alta (01/08 – 31/08)', price: '€22,50 / noite' },
    ],
    highlights: [
      'Fácil manobra para caravanas e autocaravanas',
      'Ligação elétrica 16A disponível',
      'Espaço cómodo para mobiliário exterior',
      'Elegível para Promoção de Inverno (€500/mês)',
    ],
  },
  xl: {
    key: 'xl',
    title: 'Alvéolo XL',
    area: 'Mais de 90 m²',
    idealFor: 'Autocaravanas de grande porte, veículos com reboque ou estadias prolongadas.',
    totalCount: '80 alvéolos (Setor Nascente)',
    rates: [
      { label: 'Época Baixa (16/09 – 14/06)', price: '€26,40 / noite' },
      { label: 'Época Média (15/06 – 31/07 · 01/09 – 15/09)', price: '€33,00 / noite' },
      { label: 'Época Alta (01/08 – 31/08)', price: '€36,30 / noite' },
    ],
    highlights: [
      'A nossa tipologia de parcela mais ampla',
      'Acesso desimpedido para grandes viaturas',
      'Ligação elétrica 16A dedicada',
      'Elegível para Promoção de Inverno (€575/mês)',
    ],
  },
};

export default function AlveolosPage() {
  const [selectedTier, setSelectedTier] = useState<PlotTierKey>('grande');
  const activeTier = PLOT_TIERS[selectedTier];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-branco-quente min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[65vh] flex items-end pb-14 md:pb-20 pt-28 md:pt-36 px-4 sm:px-6 overflow-hidden">
        <img
          src="/assets/entrada.jpg"
          alt="Área de Alvéolos do Camping Ria Formosa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-principal/90 via-principal/50 to-black/45" />

        <div className="relative z-10 max-w-6xl mx-auto w-full text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secundaria mb-3 sm:mb-4">
            Cerca de 350 Alvéolos · Ligação Elétrica 16A · WIFI Grátis
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif leading-[1.08] max-w-3xl [text-wrap:balance] mb-4 sm:mb-6">
            Alvéolos Individuais na Natureza
          </h1>
          <p className="text-base sm:text-lg text-white/85 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10">
            Espaços individuais, perfeitamente identificados com ligação elétrica, num total de cerca
            de 350 alvéolos para tendas, caravanas e autocaravanas.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            <Link
              to="/reservar?tipo=alveolos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-secundaria text-principal min-h-[48px] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.18em] hover:bg-white transition-colors whitespace-nowrap"
            >
              Reservar Alvéolo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#tarifario"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/35 text-white min-h-[48px] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.18em] hover:bg-white hover:text-principal transition-colors whitespace-nowrap"
            >
              Ver Tarifas 2026/27
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* 01. Tipologias Interativas */}
        <motion.section {...fadeInUp} className="space-y-8 sm:space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-principal/10">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-principal/50">
                01. Tipologias Disponíveis
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-principal leading-tight [text-wrap:balance]">
                Escolha o tamanho ideal para o seu equipamento
              </h2>
            </div>

            <div className="flex flex-wrap sm:inline-flex w-full sm:w-auto gap-1.5 p-1.5 bg-white rounded-2xl border border-principal/10 shrink-0">
              {(['pequeno', 'grande', 'xl'] as const).map((tierKey) => (
                <button
                  key={tierKey}
                  type="button"
                  onClick={() => setSelectedTier(tierKey)}
                  className={`flex-1 sm:flex-initial min-h-[44px] px-3 sm:px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedTier === tierKey
                      ? 'bg-principal text-white'
                      : 'text-principal/65 hover:text-principal'
                  }`}
                >
                  {PLOT_TIERS[tierKey].title}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-principal/10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-principal/55">
                  <span>{activeTier.area}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeTier.totalCount}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-principal">{activeTier.title}</h3>
                <p className="text-sm sm:text-base text-texto-main/75 font-light leading-relaxed">
                  {activeTier.idealFor}
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-principal/10">
                {activeTier.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-texto-main/75 font-light">
                    <Check className="w-4 h-4 text-secundaria shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Link
                  to="/reservar?tipo=alveolos"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-principal text-white min-h-[48px] px-6 sm:px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] hover:bg-secundaria hover:text-principal transition-colors"
                >
                  <span>Verificar Disponibilidade</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-branco-quente rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-principal/50">
                  Tarifa Base por Noite (Alvéolo)
                </p>
                <div className="divide-y divide-principal/10">
                  {activeTier.rates.map((r) => (
                    <div
                      key={r.label}
                      className="py-3.5 flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="text-texto-main/75 font-light">{r.label}</span>
                      <span className="font-serif font-bold text-principal tabular-nums whitespace-nowrap">
                        {r.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-texto-main/55 font-light leading-relaxed">
                Valores por noite para a parcela. Acresce tarifa por adulto, criança, animal ou
                eletricidade (16A), conforme tabela geral abaixo.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 02. Estrutura e Comodidades */}
        <motion.section {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl min-h-[340px]">
            <img
              src="/assets/entrada.jpg"
              alt="Parcelas individuais sombreadas no Camping Ria Formosa"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-principal/50">
              02. Infraestrutura dos ~350 Alvéolos
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-principal leading-tight [text-wrap:balance]">
              Liberdade ao ar livre com apoio completo
            </h2>
            <p className="text-base text-texto-main/75 font-light leading-relaxed">
              Cada alvéolo encontra-se demarcado, identificado por número e setor, garantindo
              organização, privacidade e acesso simples tanto para tendas como para autocaravanas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {[
                {
                  icon: Ruler,
                  title: 'Dimensões Versáteis',
                  text: 'Desde 5m × 5m (25 m²) até parcelas XL acima de 90 m².',
                },
                {
                  icon: Zap,
                  title: 'Ligação Elétrica 16A',
                  text: 'Pontos de luz disponíveis em todo o parque mediante taxa diária.',
                },
                {
                  icon: TreePine,
                  title: 'Sombra Natural',
                  text: 'Cobertura arborizada por cerca de 500 árvores e toldos.',
                },
                {
                  icon: Droplets,
                  title: 'Água e Sanitários Solares',
                  text: 'Pontos de água potável e 2 blocos sanitários com água quente solar.',
                },
                {
                  icon: Wifi,
                  title: 'WIFI Grátis',
                  text: 'Cobertura em toda a área de alvéolos e zonas comuns.',
                },
                {
                  icon: Map,
                  title: 'Organização por Setores',
                  text: 'Setor Norte, Sul e Nascente com reserva imediata por unidade.',
                },
              ].map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.title} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white border border-principal/10 text-principal flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-principal">{spec.title}</h3>
                      <p className="text-xs text-texto-main/65 font-light leading-relaxed mt-0.5">
                        {spec.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-5 rounded-2xl bg-white border border-principal/10 flex items-start gap-3 text-xs text-texto-main/70 leading-relaxed">
              <Info className="w-4 h-4 text-secundaria shrink-0 mt-0.5" />
              <span>
                <strong>Dica de Verão:</strong> Entre junho e setembro a procura aumenta bastante;
                recomendamos reservar antecipadamente para garantir disponibilidade no setor desejado.
              </span>
            </div>
          </div>
        </motion.section>

        {/* 03. Tarifário Oficial */}
        <section id="tarifario" className="scroll-mt-24 rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-principal/10">
          <PriceTables />
        </section>

        {/* Final CTA */}
        <motion.section
          {...fadeInUp}
          className="bg-principal text-white rounded-3xl md:rounded-[2.5rem] p-7 sm:p-10 md:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8"
        >
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-secundaria">
              <Tent className="w-4 h-4" />
              Reserva Direta no Site
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif leading-tight">
              Pronto para escolher o seu alvéolo?
            </h2>
            <p className="text-sm text-white/75 font-light">
              Consulte as unidades livres em tempo real e confirme a sua estadia de imediato.
            </p>
          </div>
          <Link
            to="/reservar?tipo=alveolos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-secundaria text-principal min-h-[48px] px-8 sm:px-9 py-4 rounded-full font-bold text-xs uppercase tracking-[0.18em] hover:bg-white transition-colors whitespace-nowrap shrink-0"
          >
            Reservar Alvéolo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.section>
      </div>
    </motion.div>
  );
}
