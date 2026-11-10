import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Tent, Zap, TreePine, Map, Ruler, Info, Check } from 'lucide-react';
import PriceTables from '../components/PriceTables';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function AlveolosPage() {
  const highlights = [
    { 
      icon: <Ruler className="w-6 h-6" />, 
      title: 'Dimensão', 
      text: 'Espaços amplos de 5m x 5m (25m²).' 
    },
    { 
      icon: <Tent className="w-6 h-6" />, 
      title: 'Camping Livre', 
      text: 'Ideal para tendas, autocaravanas ou mobile homes.' 
    },
    { 
      icon: <TreePine className="w-6 h-6" />, 
      title: 'Sombra Natural', 
      text: 'Áreas arborizadas e toldos para seu conforto.' 
    },
    { 
      icon: <Zap className="w-6 h-6" />, 
      title: 'Eletricidade', 
      text: 'Pontos de luz disponíveis (mediante taxa extra).' 
    },
    { 
      icon: <Map className="w-6 h-6" />, 
      title: 'Organização', 
      text: '8 ruas organizadas com 10 alvéolos cada.' 
    },
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
          src="/assets/entrada.jpg" 
          alt="Alvéolos Ria Formosa" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-principal/60 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 uppercase tracking-tight"
          >
            Alvéolos
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-light"
          >
            A liberdade de acampar ao ar livre com toda a estrutura e sombra que merece.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Intro Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-serif text-principal mb-8 leading-tight">O seu espaço de liberdade na natureza</h2>
            <p className="text-texto-main/70 leading-relaxed text-lg font-light mb-6">
              Os nossos alvéolos são desenhados para oferecer a máxima flexibilidade. Seja com uma tenda clássica, uma autocaravana moderna ou uma mobile home, encontrará o terreno ideal para a sua estadia.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-texto-main/80 font-medium">
                <div className="w-2 h-2 bg-secundaria rounded-full" />
                80 Alvéolos disponíveis
              </div>
              <div className="flex items-center gap-3 text-texto-main/80 font-medium">
                <div className="w-2 h-2 bg-secundaria rounded-full" />
                Organizados em 8 ruas temáticas
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeInUp} className="relative">
            <div className="absolute -inset-4 bg-secundaria/5 rounded-[2rem] rotate-2 -z-10" />
            <img 
              src="/assets/entrada.jpg" 
              alt="Área de Camping" 
              className="rounded-3xl shadow-2xl aspect-video object-cover"
            />
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {highlights.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-50 group hover:border-secundaria/30 transition-all duration-500"
            >
              <div className="w-12 h-12 bg-principal text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secundaria group-hover:text-principal transition-colors duration-500">
                {item.icon}
              </div>
              <h4 className="text-xl font-serif font-bold text-principal mb-3">{item.title}</h4>
              <p className="text-texto-main/60 text-sm font-light leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-principal p-8 rounded-3xl shadow-xl text-white flex flex-col justify-center border border-white/10"
          >
            <h4 className="text-xl font-serif font-bold text-secundaria mb-3">Dica de Verão</h4>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              Os nossos alvéolos são muito requisitados entre Junho e Setembro. Recomendamos a reserva antecipada para garantir o seu lugar à sombra.
            </p>
          </motion.div>
        </div>

        {/* Logistics & Info */}
        <motion.div {...fadeInUp} className="bg-white rounded-[2.5rem] p-12 shadow-2xl border border-gray-100 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-serif text-principal mb-8 flex items-center gap-3">
                <Info className="w-6 h-6 text-secundaria" />
                Informações Importantes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  'Check-in e Check-out flexíveis (consultar receção)',
                  'Acesso livre aos blocos sanitários modernos',
                  'Pontos de água potável em todo o parque',
                  'Eletricidade disponível em todos os alvéolos',
                  'Zona de lavandaria e máquinas de lavar',
                  'Área de churrasco comum',
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 text-sm text-texto-main/70 font-light">
                    <Check className="w-4 h-4 text-secundaria shrink-0 mt-0.5" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-branco-quente p-8 rounded-2xl flex flex-col justify-center text-center border border-gray-100">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-principal/40 mb-2">Conectividade</p>
              <h4 className="text-2xl font-serif text-principal mb-4 italic">WIFI Grátis</h4>
              <p className="text-xs text-texto-main/50 font-light">Disponível em toda a área dos alvéolos e espaços comuns.</p>
            </div>
          </div>
        </motion.div>

        {/* Pricing Tables Integration */}
        <motion.div {...fadeInUp} className="relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secundaria/20 to-transparent mb-12" />
          <PriceTables />
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeInUp} className="mt-24 text-center">
          <Link to="/contactos" className="inline-block bg-principal text-white px-16 py-6 rounded-full font-bold uppercase tracking-widest text-sm shadow-2xl hover:bg-secundaria hover:text-principal transition-all duration-500 transform hover:scale-105">
            Solicitar Reserva de Alvéolo
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
