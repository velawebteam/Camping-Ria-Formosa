import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Wifi,
  Users,
  TreePine,
  Waves,
  Utensils,
  ShoppingCart,
  Dumbbell,
  BookOpen,
  Baby,
  Gamepad2,
  Flame,
  ArrowRight,
  Info,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7 },
};

type FacilityCategory = 'todas' | 'conforto' | 'lazer' | 'servicos';

interface FacilityItem {
  category: Exclude<FacilityCategory, 'todas'>;
  title: string;
  detail: string;
  icon: typeof Wifi;
}

const FACILITIES: FacilityItem[] = [
  {
    category: 'conforto',
    title: 'WIFI Grátis em Todo o Parque',
    detail: 'Cobertura moderna e eficaz em toda a área de alvéolos, bungalows e zonas comuns.',
    icon: Wifi,
  },
  {
    category: 'conforto',
    title: '2 Blocos Sanitários Modernos',
    detail: 'Água quente e fria permanente, cabines de duche, sanitas e lavatórios com apoio de painel solar.',
    icon: Users,
  },
  {
    category: 'conforto',
    title: '~350 Alvéolos Individuais',
    detail: 'Espaços perfeitamente identificados, com ligação elétrica e sombra natural.',
    icon: TreePine,
  },
  {
    category: 'lazer',
    title: 'Piscinas para Adultos e Crianças',
    detail: 'Zona aquática ampla para momentos de lazer e descanso em família.',
    icon: Waves,
  },
  {
    category: 'lazer',
    title: 'Parque Infantil',
    detail: 'Espaço seguro e dedicado às brincadeiras dos mais novos.',
    icon: Baby,
  },
  {
    category: 'lazer',
    title: 'Zona de Jogos (Petanca e Malha)',
    detail: 'Campos ao ar livre para convívio e torneios entre hóspedes.',
    icon: Gamepad2,
  },
  {
    category: 'lazer',
    title: 'Mini Gym (01/10 a 31/05)',
    detail: 'Espaço fitness disponível durante a temporada de outono, inverno e primavera.',
    icon: Dumbbell,
  },
  {
    category: 'lazer',
    title: 'Sala de Leitura (01/10 a 31/05)',
    detail: 'Ambiente tranquilo e acolhedor reservado para leitura nos meses mais frescos.',
    icon: BookOpen,
  },
  {
    category: 'lazer',
    title: 'Lago Artificial',
    detail: 'Zona paisagística tranquila integrada nos espaços verdes do parque.',
    icon: Waves,
  },
  {
    category: 'servicos',
    title: 'Restaurante',
    detail: 'Serviço de refeições dentro do parque sem necessidade de sair da propriedade.',
    icon: Utensils,
  },
  {
    category: 'servicos',
    title: 'Minimercado',
    detail: 'Produtos essenciais, frescos e conveniência para o dia-a-dia da sua estadia.',
    icon: ShoppingCart,
  },
  {
    category: 'servicos',
    title: 'Zona de Grelhadores',
    detail: 'Área comum preparada para refeições e churrascos ao ar livre.',
    icon: Flame,
  },
];

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState<FacilityCategory>('todas');

  const filteredFacilities =
    activeCategory === 'todas'
      ? FACILITIES
      : FACILITIES.filter((item) => item.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-branco-quente min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[68vh] flex items-end pb-14 md:pb-20 pt-28 md:pt-36 px-4 sm:px-6 overflow-hidden">
        <img
          src="/assets/entrada.jpg"
          alt="Entrada arborizada do Camping Ria Formosa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-principal/90 via-principal/50 to-black/45" />

        <div className="relative z-10 max-w-6xl mx-auto w-full text-white">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif leading-[1.08] max-w-3xl [text-wrap:balance]">
            Sobre o Camping Ria Formosa
          </h1>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="bg-white border-b border-principal/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-principal tabular-nums">56.000 m²</p>
            <p className="text-xs text-texto-main/60 mt-1">Área total perto da praia</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-principal tabular-nums">~500</p>
            <p className="text-xs text-texto-main/60 mt-1">Árvores plantadas para sombra natural</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-principal tabular-nums">~350</p>
            <p className="text-xs text-texto-main/60 mt-1">Alvéolos individuais identificados</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-principal tabular-nums">2 Blocos</p>
            <p className="text-xs text-texto-main/60 mt-1">Sanitários modernos com painel solar</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* Chapter 01: O Parque & Horários */}
        <motion.section {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-principal/50">
              01. O Nosso Parque
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-principal leading-tight [text-wrap:balance]">
              Um parque pensado para estadias tranquilas em qualquer estação
            </h2>
            <p className="text-texto-main/75 text-base leading-relaxed font-light">
              O nosso parque está dotado de todas as condições necessárias para proporcionar uma
              estadia agradável a quem nos visita. Implantado numa área de cerca de{' '}
              <strong>56.000 m²</strong>, perto da praia e servido por excelentes acessos, conta com
              cerca de <strong>500 árvores plantadas</strong> que garantem frescura e enquadramento
              natural.
            </p>
            <p className="text-texto-main/75 text-base leading-relaxed font-light">
              O espaço organiza-se em três áreas principais: <strong>alvéolos individuais</strong>{' '}
              para tendas, caravanas e autocaravanas, uma <strong>área reservada a bungalows</strong>{' '}
              equipados e uma <strong>área exclusiva para mobile homes</strong>.
            </p>
            <div className="pt-4 border-t border-principal/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-semibold text-principal">Alvéolos</p>
                <p className="text-texto-main/60 font-light mt-1">
                  Cerca de 350 lugares com ligação elétrica.
                </p>
              </div>
              <div>
                <p className="font-semibold text-principal">Bungalows</p>
                <p className="text-texto-main/60 font-light mt-1">
                  5 unidades T2 de Classe A e Classe B.
                </p>
              </div>
              <div>
                <p className="font-semibold text-principal">Mobile Homes</p>
                <p className="text-texto-main/60 font-light mt-1">
                  Lotes privados de 100 m² a 250 m².
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-[2rem] border border-principal/10 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-branco-quente text-principal flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-principal/50">
                    Atendimento
                  </p>
                  <h3 className="text-2xl font-serif text-principal font-bold">Horário da Receção</h3>
                </div>
              </div>

              <div className="space-y-5 pt-2">
                <div className="p-5 rounded-2xl bg-branco-quente/80">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-principal/50 mb-1">
                    Horário de Verão
                  </p>
                  <p className="text-xl font-serif font-bold text-principal tabular-nums">
                    08h00 às 19h00
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-branco-quente/80">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-principal/50 mb-1">
                    Horário de Inverno
                  </p>
                  <p className="text-xl font-serif font-bold text-principal tabular-nums">
                    08h00 às 13h00 · 14h00 às 19h00
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-principal/10 flex items-start gap-3 text-xs text-texto-main/65 leading-relaxed">
              <Info className="w-4 h-4 text-secundaria shrink-0 mt-0.5" />
              <span>Receção aberta todos os dias. Acesso de viaturas dentro do parque das 08h00 às 00h00.</span>
            </div>
          </div>
        </motion.section>

        {/* Chapter 02: As Nossas Instalações */}
        <motion.section {...fadeInUp} className="space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-principal/10">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-principal/50">
                02. As Nossas Instalações
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-principal leading-tight [text-wrap:balance]">
                Infraestruturas pensadas para toda a família
              </h2>
              <p className="text-texto-main/70 font-light leading-relaxed">
                Numa altura em que o acesso à informação permanente é fundamental, dotámos todo o
                parque de um sistema <strong>WIFI moderno, eficaz e gratuito</strong> para todos os
                nossos clientes.
              </p>
            </div>

            <div className="flex flex-wrap sm:inline-flex w-full sm:w-auto gap-1.5 p-1.5 bg-white rounded-2xl border border-principal/10 shrink-0">
              {(
                [
                  { id: 'todas', label: 'Todas (12)' },
                  { id: 'conforto', label: 'Conforto' },
                  { id: 'lazer', label: 'Lazer e Desporto' },
                  { id: 'servicos', label: 'Serviços' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex-1 sm:flex-initial min-h-[44px] px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-principal text-white'
                      : 'text-principal/65 hover:text-principal'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredFacilities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-5 sm:p-7 rounded-2xl border border-principal/10 flex flex-col justify-between gap-4 hover:border-secundaria/60 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-branco-quente text-principal flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-principal leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-texto-main/65 font-light leading-relaxed mt-1.5">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Photo Showcase Mosaic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-4">
            {[
              {
                src: '/assets/piscina.jpg',
                title: 'Piscinas para Adultos e Crianças',
              },
              {
                src: '/assets/parque infantil camping.jpg',
                title: 'Parque Infantil e Zonas Verdes',
              },
              {
                src: '/assets/casas de banho - camping.jpg',
                title: 'Blocos Sanitários com Painel Solar',
              },
            ].map((photo) => (
              <div
                key={photo.title}
                className="relative rounded-3xl overflow-hidden aspect-[4/3] group"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-principal/85 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-6 right-6 text-white font-serif text-lg">
                  {photo.title}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Chapter 03: A Formosa */}
        <motion.section
          {...fadeInUp}
          className="bg-principal text-white rounded-3xl md:rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
        >
          <div className="lg:col-span-7 p-7 sm:p-10 md:p-16 flex flex-col justify-center space-y-5 sm:space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secundaria">
              03. A Formosa · Onde Se Situa?
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif leading-tight [text-wrap:balance]">
              Junto ao Parque Natural da Ria Formosa
            </h2>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base font-light">
              O nosso parque está localizado muito perto de um verdadeiro paraíso natural, o{' '}
              <strong>Parque Natural da Ria Formosa</strong>. Aproveite para conhecer esta zona,
              talvez das poucas ainda bem preservadas em toda a Europa.
            </p>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base font-light">
              Conheça este magnífico parque natural, observe a fauna e a flora existentes, deixe-se
              levar pela natureza em estado puro. Protegidas por este parque estão aquelas que
              muitos consideram das melhores praias de toda a Europa. Venha visitar-nos, vai ver que
              não se arrependerá…
            </p>

            <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                to="/ria-formosa"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-secundaria text-principal min-h-[48px] px-7 py-4 rounded-full text-xs font-bold uppercase tracking-[0.18em] hover:bg-white transition-colors whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 shrink-0" />
                Explorar Ria Formosa &amp; Tavira
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <Link
                to="/reservar"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white min-h-[48px] px-7 py-4 rounded-full text-xs font-bold uppercase tracking-[0.18em] hover:bg-white hover:text-principal transition-colors whitespace-nowrap"
              >
                Reservar Estadia
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[320px]">
            <img
              src="/assets/piscina.jpg"
              alt="Ambiente tranquilo do Camping Ria Formosa"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
