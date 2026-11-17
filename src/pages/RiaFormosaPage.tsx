import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, MapPin, Sun, Waves, Utensils } from 'lucide-react';
import heroRiaImg from '../assets/images/hero_ria_formosa_1794939855764.jpg';
import cabanasImg from '../assets/images/cabanas_tavira_1794939856497.jpg';
import taviraImg from '../assets/images/tavira_ponte_1794939856312.jpg';
import praiasImg from '../assets/images/algarve_praias_1794939857583.jpg';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7 },
};

type GuideTab = 'praias' | 'natureza' | 'cultura';

interface RouteStop {
  title: string;
  distance: string;
  detail: string;
}

const GUIDE_TABS: Record<
  GuideTab,
  {
    label: string;
    intro: string;
    stops: RouteStop[];
  }
> = {
  praias: {
    label: 'Praias e Ilhas',
    intro:
      'Areias douradas protegidas pelo cordão dunar da Ria Formosa, com águas límpidas e travessias curtas de barco tradicional.',
    stops: [
      {
        title: 'Ilha de Cabanas',
        distance: '2 km até ao cais',
        detail:
          'Acesso por barco-táxi a partir da marginal de Cabanas. Areal extenso, calmo e com zona vigiada na época balnear.',
      },
      {
        title: 'Ilha de Tavira',
        distance: '6 km até Quatro Águas',
        detail:
          'Bandeira Azul, extensos quilómetros de praia atlântica, bares de praia e ligação por ferry durante todo o ano.',
      },
      {
        title: 'Praia do Barril & Cemitério das Âncoras',
        distance: '9 km (Pedras d’El Rei)',
        detail:
          'Travessia pedonal ou em comboio turístico sobre o sapal, famosa pelas âncoras da antiga armação do atum.',
      },
      {
        title: 'Fábrica & Cacela Velha',
        distance: '8 km a nascente',
        detail:
          'Aldeia caiada sobranceira à barra onde a ria encontra o oceano, considerada um dos cenários mais autênticos do Sotavento.',
      },
    ],
  },
  natureza: {
    label: 'Natureza e Trilhos',
    intro:
      'Um ecossistema lagunar único na Europa, abrigo de aves migratórias, salinas artesanais e percursos junto à água.',
    stops: [
      {
        title: 'Salinas Tradicionais de Tavira',
        distance: '4 km do parque',
        detail:
          'Tanques de extração manual de flor de sal onde flamingos-comuns, colhereiros e pernilongos se alimentam ao fim da tarde.',
      },
      {
        title: 'Observação de Cavalos-Marinhos e Aves',
        distance: 'Canal da Ria Formosa',
        detail:
          'Uma das sete Maravilhas Naturais de Portugal, lar da maior comunidade de cavalos-marinhos do mundo e mais de 200 espécies de aves.',
      },
      {
        title: 'Passadiço de Cabanas & Ecovia do Litoral',
        distance: '1,5 km do parque',
        detail:
          'Percursos planos a pé ou de bicicleta entre laranjais, esteiros de maré e a frente ribeirinha da vila.',
      },
      {
        title: 'Forte de São João da Barra',
        distance: '2,5 km a nascente',
        detail:
          'Fortaleza seiscentista edificada junto à foz para proteger a antiga barra de Tavira e a costa do Sotavento.',
      },
    ],
  },
  cultura: {
    label: 'Gastronomia e Cultura',
    intro:
      'Património milenar sobre o rio Gilão e cozinha costeira marcada pelo peixe fresco, marisco da ria e doçaria regional.',
    stops: [
      {
        title: 'Ponte Romana e Centro Histórico de Tavira',
        distance: '6 km (10 min de carro)',
        detail:
          'Sete arcos sobre o rio Gilão, castelo com jardins panorâmicos, mais de 20 igrejas históricas e telhados de tesouro.',
      },
      {
        title: 'Mercado da Ribeira & Gastronomia da Ria',
        distance: 'Centro de Tavira / Cabanas',
        detail:
          'Xarém com conquilhas, arroz de lingueirão, polvo à Santa Luzia, biqueirão e atum da costa servido à beira-rio.',
      },
      {
        title: 'Câmara Obscura — Torre de Tavira',
        distance: '6,5 km do parque',
        detail:
          'Antigo depósito de água convertido em miradouro ótico de 360 graus sobre os telhados e a ria.',
      },
      {
        title: 'Golfe e Campo do Sotavento',
        distance: '1,5 km (Benamor)',
        detail:
          'Clima ameno com mais de 300 dias de sol por ano, ideal para caminhadas no barrocal algarvio e golfe fora da época alta.',
      },
    ],
  },
};

function ImageWithFallback({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`bg-gradient-to-br from-principal via-principal/90 to-azul-suave flex flex-col items-center justify-center p-8 text-center text-white/80 ${className || ''}`}
      >
        <Waves className="w-8 h-8 text-secundaria mb-3" />
        <span className="font-serif text-lg">{alt}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export default function RiaFormosaPage() {
  const [activeGuideTab, setActiveGuideTab] = useState<GuideTab>('praias');
  const currentGuide = GUIDE_TABS[activeGuideTab];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-branco-quente min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-[68vh] md:min-h-[78vh] flex items-end pb-14 md:pb-20 pt-28 md:pt-36 px-4 sm:px-6 overflow-hidden">
        <ImageWithFallback
          src={heroRiaImg}
          alt="Vista panorâmica sobre o Parque Natural da Ria Formosa ao pôr do sol"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[100vh] min-w-full min-h-[56.25vw] pointer-events-none"
            src="https://www.youtube.com/embed/8uB5sq2cUJE?si=MRR0YEs-OCnsJtsI&autoplay=1&mute=1&loop=1&playlist=8uB5sq2cUJE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-principal/90 via-principal/45 to-black/45" />

        <div className="relative z-10 max-w-6xl mx-auto w-full text-white">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-secundaria mb-3 sm:mb-4">
            Quinta da Gomeira · Cabanas de Tavira · Sotavento Algarvio
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif leading-[1.08] max-w-3xl [text-wrap:balance] mb-4 sm:mb-6">
            Ria Formosa, Cabanas, Tavira e o Algarve Autêntico
          </h1>
          <p className="text-base sm:text-lg text-white/85 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10">
            Entre lagoas de água turquesa, ilhas-barreira de areia dourada e vilas caiadas de
            tradição piscatória, descubra o território que envolve o Camping Ria Formosa.
          </p>
          <Link
            to="/reservar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-secundaria text-principal min-h-[48px] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.18em] hover:bg-white transition-colors duration-200 whitespace-nowrap"
          >
            Planear Estadia no Parque
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Regional Key Facts Band */}
      <section className="bg-white border-b border-principal/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-principal tabular-nums">60 km</p>
            <p className="text-xs text-texto-main/60 mt-1">Extensão costeira do cordão lagunar</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-principal tabular-nums">18.400 ha</p>
            <p className="text-xs text-texto-main/60 mt-1">Área protegida de sapais, ilhas e esteiros</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-principal tabular-nums">1,5 km</p>
            <p className="text-xs text-texto-main/60 mt-1">Distância do parque à frente marítima de Cabanas</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-principal tabular-nums">300+ dias</p>
            <p className="text-xs text-texto-main/60 mt-1">De sol por ano no Sotavento Algarvio</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* 01. Parque Natural da Ria Formosa */}
        <motion.section {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-principal/50">
              01. O Parque Natural
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-principal leading-tight [text-wrap:balance]">
              Parque Natural da Ria Formosa: Um santuário moldado pelas marés
            </h2>
            <p className="text-texto-main/75 text-base leading-relaxed font-light">
              Classificada como uma das <strong>Sete Maravilhas Naturais de Portugal</strong>, a Ria
              Formosa estende-se desde a Praia do Ancão até à Manta Rota através de um labirinto de
              canais, sapais, salinas e cinco ilhas-barreira arenosas que protegem a costa das ondas
              do Atlântico.
            </p>
            <p className="text-texto-main/75 text-base leading-relaxed font-light">
              A pouca distância do nosso parque de campismo, a maré renova diariamente a vida deste
              ecossistema: flamingos, colhereiros, ostras, amêijoas e a célebre colónia de
              cavalos-marinhos convivem com a apanha artesanal de marisco e a extração de flor de sal.
            </p>
            <div className="pt-4 border-t border-principal/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-texto-main/70">
              <div>
                <p className="font-semibold text-principal mb-1">Fauna &amp; Aves Migratórias</p>
                <p className="font-light leading-relaxed">
                  Ponto estratégico nas rotas entre a Europa e África, com mais de 200 espécies de
                  aves registadas ao longo do ano.
                </p>
              </div>
              <div>
                <p className="font-semibold text-principal mb-1">Ilhas-Barreira Naturais</p>
                <p className="font-light leading-relaxed">
                  Areais preservados sem tráfego automóvel, acessíveis em poucos minutos de barco.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl h-80 lg:h-full min-h-[380px]">
              <ImageWithFallback
                src={praiasImg}
                alt="Dunas e areal preservado da Ilha de Cabanas na Ria Formosa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.section>

        {/* 02. Cabanas de Tavira */}
        <motion.section {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl h-80 lg:h-full min-h-[380px]">
              <ImageWithFallback
                src={cabanasImg}
                alt="Marginal de Cabanas de Tavira com barcos tradicionais e pontão de madeira"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center space-y-6">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-principal/50">
              02. A Nossa Freguesia
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-principal leading-tight [text-wrap:balance]">
              Cabanas de Tavira: Da pesca artesanal ao ritmo tranquilo da ria
            </h2>
            <p className="text-texto-main/75 text-base leading-relaxed font-light">
              Nascida no século XVIII em torno de pequenas cabanas de pescadores dedicadas à pesca
              do atum, <strong>Cabanas de Tavira</strong> conserva hoje o encanto de uma vila
              costeira serena, mesmo à porta do Camping Ria Formosa.
            </p>
            <p className="text-texto-main/75 text-base leading-relaxed font-light">
              O seu longo passadiço de madeira acompanha o canal da ria com vista direta para a{' '}
              <strong>Ilha de Cabanas</strong>. Ao amanhecer, os pequenos barcos coloridos partem
              dos pontões tanto para a faina como para levar visitantes em cerca de três minutos até
              à praia de areia fina do outro lado do canal.
            </p>
            <div className="pt-4 border-t border-principal/10 flex flex-wrap gap-x-8 gap-y-2 text-xs text-principal/70 font-medium">
              <span>Marginal pedonal com esplanadas</span>
              <span aria-hidden="true">·</span>
              <span>Barcos para a Ilha de Cabanas</span>
              <span aria-hidden="true">·</span>
              <span>Forte de São João da Barra</span>
            </div>
          </div>
        </motion.section>

        {/* 03. Tavira */}
        <motion.section {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-principal/50">
              03. Cidade Histórica
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-principal leading-tight [text-wrap:balance]">
              Tavira: Património sobre o Rio Gilão e a arquitetura dos telhados de tesouro
            </h2>
            <p className="text-texto-main/75 text-base leading-relaxed font-light">
              A apenas dez minutos do parque, <strong>Tavira</strong> é reconhecida como uma das
              cidades mais preservadas do Algarve. Atravessada pelas águas serenas do rio Gilão e
              ligada pela emblemática <strong>Ponte Romana de sete arcos</strong>, guarda memórias
              fenícias, romanas e árabes em cada praça calcetada.
            </p>
            <p className="text-texto-main/75 text-base leading-relaxed font-light">
              Da muralha do Castelo avista-se o recorte inconfundível dos tradicionais{' '}
              <em>telhados de quatro águas</em> e das chaminés rendilhadas algarvias, recortados
              sobre o casario branco em direção às salinas e ao mar.
            </p>
            <div className="pt-4 border-t border-principal/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-texto-main/70">
              <div>
                <p className="font-semibold text-principal mb-1">Património &amp; Cultura</p>
                <p className="font-light leading-relaxed">
                  Castelo de Tavira, Núcleo Islâmico, Igreja de Santa Maria do Castelo e Mercado da
                  Ribeira.
                </p>
              </div>
              <div>
                <p className="font-semibold text-principal mb-1">Mesa do Sotavento</p>
                <p className="font-light leading-relaxed">
                  Atum de estufado ou cebolada, xerém de conquilhas, polvo de Santa Luzia e doçaria
                  de amêndoa e alfarroba.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl h-80 lg:h-full min-h-[380px]">
              <ImageWithFallback
                src={taviraImg}
                alt="Ponte Romana de Tavira sobre o rio Gilão e casario tradicional algarvio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.section>

        {/* 04. O Algarve & Interactive Itinerary Guide */}
        <motion.section
          {...fadeInUp}
          className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-14 border border-principal/10"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 pb-8 lg:pb-10 border-b border-principal/10">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-principal/50">
                04. O Algarve a Partir do Parque
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-principal leading-tight [text-wrap:balance]">
                O Sotavento Algarvio ao seu próprio ritmo
              </h2>
              <p className="text-texto-main/70 text-sm sm:text-base font-light leading-relaxed">
                Menos agitado do que o barlavento ocidental, o Algarve oriental alia temperaturas
                amenas durante todo o ano a praias de água mais cálida, serra verdejante e aldeias
                onde o tempo abranda.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Guias de descoberta na região"
              className="flex flex-wrap sm:inline-flex w-full sm:w-auto gap-1.5 p-1.5 bg-branco-quente rounded-2xl border border-principal/10 shrink-0"
            >
              {(
                [
                  { id: 'praias', label: 'Praias e Ilhas', icon: Sun },
                  { id: 'natureza', label: 'Natureza', icon: Compass },
                  { id: 'cultura', label: 'Gastronomia e Cultura', icon: Utensils },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const active = activeGuideTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveGuideTab(tab.id)}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 min-h-[44px] px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-principal text-white shadow-sm'
                        : 'text-principal/70 hover:text-principal'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-8 sm:pt-10 space-y-6 sm:space-y-8">
            <p className="text-sm sm:text-base text-texto-main/75 font-light max-w-3xl">{currentGuide.intro}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {currentGuide.stops.map((stop, idx) => (
                <div
                  key={stop.title}
                  className="p-5 sm:p-7 rounded-2xl bg-branco-quente/70 border border-principal/10 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4 text-xs text-principal/55 font-medium">
                      <span className="tabular-nums">0{idx + 1}.</span>
                      <span className="inline-flex items-center gap-1.5 text-principal/70 text-right">
                        <MapPin className="w-3.5 h-3.5 text-secundaria shrink-0" />
                        {stop.distance}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-principal">{stop.title}</h3>
                  </div>
                  <p className="text-sm text-texto-main/70 font-light leading-relaxed">
                    {stop.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.section
          {...fadeInUp}
          className="bg-principal text-white rounded-3xl md:rounded-[2.5rem] p-7 sm:p-10 md:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-7 lg:gap-8"
        >
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-secundaria">
              Camping Ria Formosa · Quinta da Gomeira
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-tight [text-wrap:balance]">
              Fique no coração deste paraíso natural
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed">
              Consulte a disponibilidade em tempo real dos nossos alvéolos sombreados ou bungalows
              T2 e prepare a sua próxima descoberta por Tavira e pela Ria Formosa.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 shrink-0 w-full lg:w-auto">
            <Link
              to="/reservar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-secundaria text-principal min-h-[48px] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.18em] hover:bg-white transition-colors whitespace-nowrap"
            >
              Verificar Disponibilidade
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/alojamentos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/30 text-white min-h-[48px] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.18em] hover:bg-white hover:text-principal transition-colors whitespace-nowrap"
            >
              Ver Alojamentos
            </Link>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
