import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Check,
  Info,
  Clock,
  Wifi,
  Car,
  Waves,
  Utensils,
  Tv,
  Wind,
  ArrowRight,
  Home,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7 },
};

export default function BungalowsPage() {
  const commonAmenities = [
    { icon: Wind, text: 'Ar Condicionado' },
    { icon: Tv, text: 'TV por Satélite' },
    { icon: Utensils, text: 'Kitchenette Equipada' },
    { icon: Wifi, text: 'WIFI Grátis' },
    { icon: Car, text: 'Estacionamento (1 Viatura)' },
    { icon: Waves, text: 'Acesso às Piscinas' },
  ];

  const classes = [
    {
      key: 'A',
      title: 'Bungalow Classe A',
      capacity: 'Até 5 pessoas · 2 unidades (B1 e B2)',
      summary:
        'Ideal para famílias maiores ou grupos que pretendam duas divisões independentes e uma cama extra no segundo quarto.',
      rates: {
        baixa: '€75 / noite',
        media: '€120 / noite',
        alta: '€145 / noite',
      },
      features: [
        'Capacidade até 5 pessoas',
        'Quarto 1 com cama de casal',
        'Quarto 2 com 3 camas (duas em beliche)',
        'Sala com ar condicionado e TV por satélite',
        'Kitchenette completa (frigorífico, placa e micro-ondas)',
        'Loiças, talheres, roupa de cama e atoalhados incluídos',
        'Casa de banho privativa com duche, sanita e lavatório',
        'Alpendre exterior equipado com mesa e cadeiras',
      ],
    },
    {
      key: 'B',
      title: 'Bungalow Classe B',
      capacity: 'Até 4 pessoas · 3 unidades (B3, B4 e B5)',
      summary:
        'A escolha equilibrada para casais ou famílias até quatro pessoas, mantendo todo o equipamento e comodidade T2.',
      rates: {
        baixa: '€65 / noite',
        media: '€105 / noite',
        alta: '€130 / noite',
      },
      features: [
        'Capacidade até 4 pessoas',
        'Quarto 1 com cama de casal',
        'Quarto 2 com 2 camas em beliche',
        'Sala com ar condicionado e TV por satélite',
        'Kitchenette completa (frigorífico, placa e micro-ondas)',
        'Loiças, talheres, roupa de cama e atoalhados incluídos',
        'Casa de banho privativa com duche, sanita e lavatório',
        'Alpendre exterior equipado com mesa e cadeiras',
      ],
    },
  ];

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
          src="/assets/aistudio/bungalows.jpg"
          alt="Bungalows T2 do Camping Ria Formosa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-principal/90 via-principal/50 to-black/45" />

        <div className="relative z-10 max-w-6xl mx-auto w-full text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secundaria mb-3 sm:mb-4">
            5 Unidades T2 · Classe A (5 Pax) · Classe B (4 Pax)
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif leading-[1.08] max-w-3xl [text-wrap:balance] mb-4 sm:mb-6">
            Bungalows T2 na Ria Formosa
          </h1>
          <p className="text-base sm:text-lg text-white/85 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10">
            Alojamento cómodo a preços convidativos numa zona reservada e arborizada do parque, com
            ar condicionado, cozinha equipada e acesso gratuito às piscinas.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            <Link
              to="/reservar?tipo=bungalows"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-secundaria text-principal min-h-[48px] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.18em] hover:bg-white transition-colors whitespace-nowrap"
            >
              Reservar Bungalow
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#classes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/35 text-white min-h-[48px] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.18em] hover:bg-white hover:text-principal transition-colors whitespace-nowrap"
            >
              Comparar Classe A e B
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* 01. Interior & Exterior Photo Gallery */}
        <motion.section {...fadeInUp} className="space-y-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-principal/50">
              01. O Espaço por Dentro e por Fora
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-principal leading-tight [text-wrap:balance]">
              Tudo preparado para chegar e descansar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6 rounded-3xl overflow-hidden aspect-[4/3] relative group">
              <img
                src="/assets/aistudio/bungalows.jpg"
                alt="Exterior e alpendre dos bungalows"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-principal/80 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-6 text-white font-serif text-lg">
                Alpendre exterior envolto por natureza
              </p>
            </div>
            <div className="md:col-span-3 rounded-3xl overflow-hidden aspect-[4/3] md:aspect-auto relative group">
              <img
                src="/assets/quartos bungalows.jpg"
                alt="Quarto dos bungalows"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-principal/80 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-6 text-white font-serif text-base">
                Quartos equipados
              </p>
            </div>
            <div className="md:col-span-3 rounded-3xl overflow-hidden aspect-[4/3] md:aspect-auto relative group">
              <img
                src="/assets/ccozinha bungalows.jpg"
                alt="Kitchenette equipada dos bungalows"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-principal/80 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-6 text-white font-serif text-base">
                Kitchenette funcional
              </p>
            </div>
          </div>
        </motion.section>

        {/* 02. Classes Comparison & Rates */}
        <motion.section id="classes" {...fadeInUp} className="scroll-mt-28 space-y-10">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-principal/50">
              02. Tipologias e Tarifas
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-principal leading-tight [text-wrap:balance]">
              Dois tipos de bungalow adaptados à sua família
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {classes.map((cls) => (
              <div
                key={cls.key}
                className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-principal/10 flex flex-col justify-between gap-7 sm:gap-8"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4 text-xs font-semibold text-principal/55">
                      <span>{cls.capacity}</span>
                      <Home className="w-4 h-4 text-secundaria shrink-0" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-principal">{cls.title}</h3>
                    <p className="text-sm text-texto-main/70 font-light leading-relaxed">
                      {cls.summary}
                    </p>
                  </div>

                  {/* Seasonal Prices Table */}
                  <div className="bg-branco-quente rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3 text-left sm:text-center">
                    <div className="flex sm:block items-center justify-between">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-principal/50">
                        Época Baixa
                      </p>
                      <p className="text-sm md:text-base font-serif font-bold text-principal sm:mt-1 tabular-nums">
                        {cls.rates.baixa}
                      </p>
                    </div>
                    <div className="flex sm:block items-center justify-between border-y sm:border-y-0 sm:border-x border-principal/10 py-2.5 sm:py-0 sm:px-2">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-principal/50">
                        Época Média
                      </p>
                      <p className="text-sm md:text-base font-serif font-bold text-principal sm:mt-1 tabular-nums">
                        {cls.rates.media}
                      </p>
                    </div>
                    <div className="flex sm:block items-center justify-between">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-principal/50">
                        Época Alta
                      </p>
                      <p className="text-sm md:text-base font-serif font-bold text-principal sm:mt-1 tabular-nums">
                        {cls.rates.alta}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {cls.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-3 text-sm text-texto-main/75 font-light"
                      >
                        <Check className="w-4 h-4 text-secundaria shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={`/reservar?tipo=bungalows&classe=${cls.key}`}
                  className="inline-flex items-center justify-center gap-3 w-full min-h-[48px] py-4 bg-principal text-white rounded-full font-bold uppercase tracking-[0.18em] text-xs hover:bg-secundaria hover:text-principal transition-colors"
                >
                  Reservar Classe {cls.key}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 03. Included Amenities & Logistics */}
        <motion.section {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          <div className="lg:col-span-7 bg-principal text-white p-6 sm:p-8 md:p-12 rounded-3xl md:rounded-[2.5rem] flex flex-col justify-between gap-7 sm:gap-8">
            <div className="space-y-5 sm:space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secundaria">
                03. Incluído na Estadia
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif leading-tight">
                Conforto completo sem custos adicionais
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2">
                {commonAmenities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-secundaria">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-white/90">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-sm text-white/70 font-light leading-relaxed border-t border-white/15 pt-5 sm:pt-6">
              Roupa de cama, atoalhados, papel higiénico, sabonete, champô e gel de banho incluídos.
              Cozinha totalmente equipada com loiças, talheres, fogão e micro-ondas.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-principal/10 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-branco-quente text-principal flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-serif text-principal font-bold">Horários e Logística</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-branco-quente">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-principal/50 mb-1">
                    Check-in
                  </p>
                  <p className="text-base font-serif font-bold text-principal tabular-nums">
                    17h00 às 20h30
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-branco-quente">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-principal/50 mb-1">
                    Check-out
                  </p>
                  <p className="text-base font-serif font-bold text-principal tabular-nums">
                    Até às 10h00
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-texto-main/70 font-light pt-4 border-t border-principal/10">
              <p>• Limpeza e mudança de roupa em estadias superiores a 7 noites.</p>
              <p>• São admitidos animais de estimação nos bungalows.</p>
              <p>• Julho e Agosto: mínimo recomendado de 7 noites.</p>
              <p>• Circulação de viaturas no parque: 08h00 às 00h00.</p>
            </div>
          </div>
        </motion.section>

        {/* General Conditions + Testimonial */}
        <motion.section {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 bg-white p-8 md:p-10 rounded-[2rem] border border-principal/10 space-y-5">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-secundaria" />
              <h3 className="text-2xl font-serif text-principal font-bold">Condições Gerais</h3>
            </div>
            <ul className="space-y-3 text-sm text-texto-main/75 font-light leading-relaxed">
              <li>
                • O aluguer inclui água quente/fria, eletricidade, ar condicionado, TV por satélite
                e parqueamento para 1 viatura.
              </li>
              <li>• O cliente é responsável pela conservação do equipamento e inventário.</li>
              <li>• Horário da receção: 08:00 – 19:00 (Verão) | 08:00 – 13:00 e 14:00 – 19:00 (Inverno).</li>
            </ul>
          </div>

          <div className="lg:col-span-6 bg-white p-8 md:p-10 rounded-[2rem] border border-principal/10 flex flex-col justify-between gap-6">
            <p className="text-lg md:text-xl font-serif text-principal italic leading-relaxed">
              “Acabamos de chegar a casa hoje depois de passar férias por uma semana em um dos
              bungalows. Estava extremamente limpo e tinha todas as comodidades necessárias para uma
              semana confortável. Há uma adorável piscina e os duches eram impecáveis.”
            </p>
            <div className="pt-4 border-t border-principal/10 flex items-center justify-between text-xs text-texto-main/60">
              <span className="font-bold uppercase tracking-widest text-principal">Helen</span>
              <span>St Neots, Reino Unido · Estadia de 1 semana</span>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
