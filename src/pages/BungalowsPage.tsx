import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Check, Info, Clock, Wifi, Car, Waves, Utensils, Tv, Wind } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function BungalowsPage() {
  const commonAmenities = [
    { icon: <Wind className="w-5 h-5" />, text: 'Ar Condicionado' },
    { icon: <Tv className="w-5 h-5" />, text: 'TV por Satélite' },
    { icon: <Utensils className="w-5 h-5" />, text: 'Cozinha Equipada' },
    { icon: <Wifi className="w-5 h-5" />, text: 'WIFI Grátis' },
    { icon: <Car className="w-5 h-5" />, text: 'Estacionamento' },
    { icon: <Waves className="w-5 h-5" />, text: 'Acesso à Piscina' },
  ];

  const classA = [
    'Até 5 pessoas',
    'Sala com Ar Condicionado e TV',
    'Kitchenette completa (Frigorífico, Placa, Microondas)',
    'Loiças e talheres incluídos',
    'Casa de banho com duche, sanita e lavatório',
    'Quarto 1: Cama de casal',
    'Quarto 2: 3 camas (duas em beliche)',
    'Alpendre exterior com mesa e cadeiras'
  ];

  const classB = [
    'Até 4 pessoas',
    'Sala com Ar Condicionado e TV',
    'Kitchenette completa (Frigorífico, Placa, Microondas)',
    'Loiças e talheres incluídos',
    'Casa de banho com duche, sanita e lavatório',
    'Quarto 1: Cama de casal',
    'Quarto 2: 2 camas em beliche',
    'Alpendre exterior com mesa e cadeiras'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-branco-quente min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/assets/aistudio/bungalows.jpg" 
          alt="Bungalows Ria Formosa" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-principal/60 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 uppercase tracking-tight"
          >
            Bungalows
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-light"
          >
            Conforto e natureza em perfeita harmonia. O refúgio ideal para a sua família no coração da Ria Formosa.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Intro Section */}
        <motion.div {...fadeInUp} className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-principal mb-8">Alojamento cómodo a preços convidativos</h2>
          <p className="text-texto-main/70 leading-relaxed text-lg font-light">
            Poderá encontrar no nosso parque uma área reservada a bungalows, dotados com todo o equipamento necessário a uma estadia agradável. Temos bungalows de dois tipos, adaptados às suas necessidades.
          </p>
        </motion.div>

        {/* Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <motion.div 
            {...fadeInUp}
            className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 flex flex-col h-full hover:border-secundaria/30 transition-all duration-500"
          >
            <div className="inline-block px-4 py-1 bg-secundaria/10 rounded-full text-principal text-[10px] font-bold uppercase tracking-[0.2em] mb-6 w-fit">
              Classe A (Até 5 Pax)
            </div>
            <h3 className="text-3xl font-serif text-principal mb-8 italic">Bungalow Classe A</h3>
            <ul className="space-y-4 mb-10 flex-grow">
              {classA.map((item, i) => (
                <li key={i} className="flex gap-4 text-texto-main/70 text-sm font-light">
                  <Check className="w-5 h-5 text-secundaria shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contactos" className="w-full py-4 bg-principal text-white rounded-2xl font-bold uppercase tracking-widest text-xs text-center hover:bg-secundaria hover:text-principal transition-all duration-500">
              Ver Preços Classe A
            </Link>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 flex flex-col h-full hover:border-secundaria/30 transition-all duration-500"
          >
            <div className="inline-block px-4 py-1 bg-secundaria/10 rounded-full text-principal text-[10px] font-bold uppercase tracking-[0.2em] mb-6 w-fit">
              Classe B (Até 4 Pax)
            </div>
            <h3 className="text-3xl font-serif text-principal mb-8 italic">Bungalow Classe B</h3>
            <ul className="space-y-4 mb-10 flex-grow">
              {classB.map((item, i) => (
                <li key={i} className="flex gap-4 text-texto-main/70 text-sm font-light">
                  <Check className="w-5 h-5 text-secundaria shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contactos" className="w-full py-4 bg-principal text-white rounded-2xl font-bold uppercase tracking-widest text-xs text-center hover:bg-secundaria hover:text-principal transition-all duration-500">
              Ver Preços Classe B
            </Link>
          </motion.div>
        </div>

        {/* Included & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          <motion.div {...fadeInUp} className="lg:col-span-2 bg-principal text-white p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <h3 className="text-2xl font-serif text-secundaria mb-8">Incluído na Estadia</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 relative z-10">
              {commonAmenities.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs uppercase tracking-widest font-medium opacity-80">{item.text}</span>
                </div>
              ))}
            </div>
            <p className="mt-12 text-sm text-white/60 font-light leading-relaxed border-t border-white/10 pt-8">
              Roupa de cama, atoalhados, papel higiénico, sabonete, champô e gel de banho incluídos. Cozinha totalmente equipada com loiças, talheres, fogão e micro-ondas.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-serif text-principal mb-8 flex items-center gap-3">
              <Clock className="w-6 h-6 text-secundaria" />
              Logística
            </h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-principal/40 mb-2">Check-in</h4>
                <p className="text-texto-main/70 font-light">Das 17h00 às 20h30</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-principal/40 mb-2">Check-out</h4>
                <p className="text-texto-main/70 font-light">Até às 10h00</p>
              </div>
              <div className="pt-6 border-t border-gray-100 text-xs text-texto-main/50 italic">
                * Limpeza e mudança de roupa em estadias superiores a 7 noites.
              </div>
            </div>
          </motion.div>
        </div>

        {/* General Conditions */}
        <motion.div 
          {...fadeInUp}
          className="bg-branco-quente border-2 border-dashed border-principal/10 p-12 rounded-[2.5rem]"
        >
          <h3 className="text-3xl font-serif text-principal mb-10 flex items-center gap-4">
            <Info className="w-8 h-8 text-secundaria" />
            Condições Gerais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 text-sm text-texto-main/70 font-light leading-relaxed">
            <p>• O aluguer inclui água quente/fria, eletricidade, AC, TV Satélite e parqueamento para 1 viatura.</p>
            <p>• O cliente é responsável pela conservação do equipamento e inventário.</p>
            <p>• São admitidos animais de estimação nos bungalows.</p>
            <p>• Julho e Agosto: Mínimo de aluguer de 7 noites.</p>
            <p>• Circulação de viaturas dentro do parque: 08:00 às 00:00.</p>
            <p>• Receção: 08:00 - 20:30 (Verão) | 08:00 - 20:00 (Inverno).</p>
          </div>
        </motion.div>

        {/* Testimonial Section */}
        <motion.div {...fadeInUp} className="mt-32 pt-24 border-t border-gray-100">
          <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl relative">
            <div className="absolute top-10 left-10 text-9xl font-serif text-secundaria/10 leading-none">"</div>
            <p className="text-2xl md:text-3xl font-serif text-principal italic mb-10 text-center relative z-10 leading-relaxed">
              Acabamos de chegar a casa hoje depois de passar férias por uma semana em um dos bungalows. O bungalow estava extremamente limpo e tinha todas as comodidades necessárias para uma semana confortável. Há uma adorável piscina e os duches eram impecáveis.
            </p>
            <div className="flex flex-col items-center">
              <h4 className="font-bold text-principal uppercase tracking-widest">Helen</h4>
              <p className="text-sm text-texto-main/40 uppercase tracking-widest mt-1">St Neots, United Kingdom</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeInUp} className="mt-32 text-center">
          <Link to="/contactos" className="inline-block bg-secundaria text-principal px-16 py-6 rounded-full font-bold uppercase tracking-widest text-sm shadow-2xl hover:bg-principal hover:text-white transition-all duration-500 transform hover:scale-105">
            Reservar Bungalow
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
