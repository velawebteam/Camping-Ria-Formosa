import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Check, Tent, Home, Sparkles, Compass } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7 },
};

const KAMPAOH_URL =
  'https://booking.kampaoh.com/property/141?lang=pt&checkin=2026-11-17&checkout=2026-11-19&adults=2&children=0&babies=0&fpa=none';

interface AlojamentoItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  desc: string;
  capacidade: string;
  regime: string;
  img: string;
  comodidades: string[];
  primaryLabel: string;
  primaryTo?: string;
  externalHref?: string;
  secondaryReserveTo?: string;
}

export default function AlojamentosPage() {
  const alojamentos: AlojamentoItem[] = [
    {
      id: 'alveolos',
      index: '01',
      title: 'Alvéolos',
      subtitle: 'Tendas · Caravanas · Autocaravanas',
      desc: 'Espaços individuais de arrendamento livre, perfeitamente identificados com ligação elétrica, num número total de cerca de 350 alvéolos inseridos entre 500 árvores de sombra natural.',
      capacidade: '3 tipologias (Pequeno, Grande e XL)',
      regime: 'Reserva online imediata',
      img: '/assets/entrada.jpg',
      comodidades: [
        'Cerca de 350 alvéolos individuais',
        'Ligação elétrica 16A disponível',
        'Sombra natural e zonas arborizadas',
        'Acesso a 2 blocos sanitários modernos',
      ],
      primaryLabel: 'Ver Disponibilidade',
      primaryTo: '/alojamentos/alveolos',
      secondaryReserveTo: '/reservar?tipo=alveolos',
    },
    {
      id: 'bungalows',
      index: '02',
      title: 'Bungalows',
      subtitle: 'Classe A (até 5 pax) · Classe B (até 4 pax)',
      desc: '5 bungalows T2 totalmente equipados, desenhados para famílias ou pequenos grupos que procuram a privacidade de uma casa no meio da natureza com ar condicionado e piscina incluída.',
      capacidade: '4 a 5 pessoas',
      regime: 'Reserva online imediata',
      img: '/assets/aistudio/bungalows.jpg',
      comodidades: [
        '2 quartos independentes com roupa de cama',
        'Kitchenette completa e TV satélite',
        'Ar condicionado e casa de banho privativa',
        'Alpendre exterior e parqueamento incluído',
      ],
      primaryLabel: 'Ver Disponibilidade',
      primaryTo: '/alojamentos/bungalows',
      secondaryReserveTo: '/reservar?tipo=bungalows',
    },
    {
      id: 'kampaoh',
      index: '03',
      title: 'Kampaoh',
      subtitle: 'Glamping em parceria oficial Kampaoh',
      desc: 'Tendas pré-montadas e decoradas com camas, têxteis e equipamento completo pela Kampaoh, para viver o campismo sem preocupações desde o primeiro minuto.',
      capacidade: 'Conforme tipologia Kampaoh',
      regime: 'Gestão e reserva via parceiro Kampaoh',
      img: '/assets/quartos bungalows.jpg',
      comodidades: [
        'Tendas prontas à chegada',
        'Camas confortáveis e iluminação',
        'Design exclusivo ao ar livre',
        'Acesso às piscinas e serviços do parque',
      ],
      primaryLabel: 'Reservar na Kampaoh',
      externalHref: KAMPAOH_URL,
    },
    {
      id: 'mobile-homes',
      index: '04',
      title: 'Mobile Homes',
      subtitle: 'Zona reservada · Lotes de 100 m² a 250 m²',
      desc: 'Lotes amplos e infraestruturados para proprietários instalarem a sua própria casa de férias móvel numa área tranquila e reservada do parque.',
      capacidade: 'Lotes privados de 100 m² a 250 m²',
      regime: 'Instalação própria (não disponível para aluguer)',
      img: '/assets/mobile-home1.jpg',
      comodidades: [
        'Ligações individuais de água e esgoto',
        'Ponto de energia elétrica dedicado',
        'Zona exclusiva e reservada',
        'Traga e instale a sua própria mobile home',
      ],
      primaryLabel: 'Ver Disponibilidade',
      primaryTo: '/alojamentos/mobile-homes',
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-28 sm:pt-32 lg:pt-36 pb-20 md:pb-28 px-4 sm:px-6 bg-branco-quente min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pb-10 lg:pb-12 border-b border-principal/10 mb-10 md:mb-14"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8">
            <div className="space-y-3 sm:space-y-4 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-principal/55">
                Camping Ria Formosa · 56.000 m² de Natureza
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-principal leading-[1.08] [text-wrap:balance]">
                Os Nossos Alojamentos
              </h1>
              <p className="text-base md:text-lg text-texto-main/70 font-light leading-relaxed">
                Da liberdade de acampar sob 500 árvores ao conforto equipado dos nossos bungalows T2,
                escolha o espaço ideal para as suas férias em Cabanas de Tavira.
              </p>
            </div>

            <Link
              to="/reservar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-secundaria text-principal min-h-[48px] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.18em] hover:bg-principal hover:text-white transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
            >
              Reservar Estadia
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Jump Index Bar */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { id: 'alveolos', label: 'Alvéolos', meta: '~350 espaços · Reserva online', icon: Tent },
              { id: 'bungalows', label: 'Bungalows', meta: '5 unidades T2 · Reserva online', icon: Home },
              { id: 'kampaoh', label: 'Kampaoh', meta: 'Glamping parceiro oficial', icon: Sparkles },
              { id: 'mobile-homes', label: 'Mobile Homes', meta: 'Lotes 100–250 m² · Instalação', icon: Compass },
            ].map((nav) => {
              const Icon = nav.icon;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => scrollToSection(nav.id)}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-principal/10 hover:border-secundaria text-left transition-all flex items-center sm:items-start gap-4 cursor-pointer group min-h-[56px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-branco-quente text-principal flex items-center justify-center shrink-0 group-hover:bg-secundaria transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif font-bold text-principal text-base">{nav.label}</p>
                    <p className="text-xs text-texto-main/55 truncate mt-0.5">{nav.meta}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Accommodation Showcases */}
        <div className="space-y-12 md:space-y-20">
          {alojamentos.map((alojamento, i) => (
            <motion.section
              key={alojamento.id}
              id={alojamento.id}
              {...fadeInUp}
              className="scroll-mt-24 bg-white rounded-3xl md:rounded-[2.5rem] p-5 sm:p-6 md:p-10 border border-principal/10 grid grid-cols-1 lg:grid-cols-12 gap-7 md:gap-10 items-stretch"
            >
              {/* Image Side */}
              <div
                className={`lg:col-span-6 overflow-hidden rounded-2xl md:rounded-3xl min-h-[240px] sm:min-h-[320px] lg:min-h-[430px] relative group ${
                  i % 2 !== 0 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={alojamento.img}
                  alt={alojamento.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content Side */}
              <div
                className={`lg:col-span-6 flex flex-col justify-between py-1 sm:py-2 ${
                  i % 2 !== 0 ? 'lg:order-1' : ''
                }`}
              >
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-principal/55">
                    <span className="tabular-nums text-principal font-bold">{alojamento.index}.</span>
                    <span aria-hidden="true">·</span>
                    <span>{alojamento.subtitle}</span>
                  </div>

                  <div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-principal leading-tight">
                      {alojamento.title}
                    </h2>
                    <p className="mt-4 text-base text-texto-main/75 leading-relaxed font-light">
                      {alojamento.desc}
                    </p>
                  </div>

                  {/* Specs Summary */}
                  <div className="py-5 border-y border-principal/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="uppercase tracking-[0.16em] text-principal/45 font-bold mb-1">
                        Capacidade
                      </p>
                      <p className="text-principal font-semibold text-sm">{alojamento.capacidade}</p>
                    </div>
                    <div>
                      <p className="uppercase tracking-[0.16em] text-principal/45 font-bold mb-1">
                        Regime
                      </p>
                      <p className="text-principal font-semibold text-sm">{alojamento.regime}</p>
                    </div>
                  </div>

                  {/* Checklist */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {alojamento.comodidades.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-texto-main/75 font-light"
                      >
                        <Check className="w-4 h-4 text-secundaria shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="pt-7 sm:pt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                  {alojamento.externalHref ? (
                    <a
                      href={alojamento.externalHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-principal text-white min-h-[48px] px-8 sm:px-9 py-4 rounded-full font-bold hover:bg-secundaria hover:text-principal transition-colors uppercase tracking-[0.16em] text-xs whitespace-nowrap"
                    >
                      {alojamento.primaryLabel}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      to={alojamento.primaryTo || '/alojamentos'}
                      className="inline-flex items-center justify-center gap-3 bg-principal text-white min-h-[48px] px-8 sm:px-9 py-4 rounded-full font-bold hover:bg-secundaria hover:text-principal transition-colors uppercase tracking-[0.16em] text-xs whitespace-nowrap"
                    >
                      {alojamento.primaryLabel}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}

                  {alojamento.secondaryReserveTo && (
                    <Link
                      to={alojamento.secondaryReserveTo}
                      className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-4 rounded-full border border-principal/20 text-principal font-bold hover:border-principal hover:bg-branco-quente transition-colors uppercase tracking-[0.16em] text-xs whitespace-nowrap"
                    >
                      Reservar Agora
                    </Link>
                  )}
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
