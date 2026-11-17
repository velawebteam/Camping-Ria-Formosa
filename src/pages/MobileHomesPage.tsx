import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Home, Zap, Droplets, Trash2, ShieldCheck, Ruler, Info, Check, AlertCircle } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function MobileHomesPage() {
  const highlights = [
    { 
      icon: <Ruler className="w-6 h-6" />, 
      title: 'Dimensão', 
      text: 'Lotes amplos de 100m² até 250m².' 
    },
    { 
      icon: <Home className="w-6 h-6" />, 
      title: 'A Sua Casa', 
      text: 'Poderá comprar a sua mobile home e trazê-la para o nosso parque.' 
    },
    { 
      icon: <ShieldCheck className="w-6 h-6" />, 
      title: 'Zona Reservada', 
      text: 'Área exclusiva e reservada para mobile homes no parque.' 
    },
    { 
      icon: <Droplets className="w-6 h-6" />, 
      title: 'Água e Esgoto', 
      text: 'Ligações completas de água e rede de esgoto incluídas.' 
    },
    { 
      icon: <Zap className="w-6 h-6" />, 
      title: 'Electricidade', 
      text: 'Pontos de luz individuais para cada lote.' 
    },
    { 
      icon: <Trash2 className="w-6 h-6" />, 
      title: 'Manutenção', 
      text: 'Espaços cuidados e manutenção regular das áreas comuns.' 
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
      <section className="relative min-h-[52vh] sm:min-h-[60vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 overflow-hidden">
        <img 
          src="/assets/mobile-home1.jpg" 
          alt="Mobile Homes Camping Ria Formosa" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-principal/60 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-2 sm:px-6 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-serif text-white mb-4 sm:mb-6 uppercase tracking-tight"
          >
            Mobile Homes
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto font-light"
          >
            A sua casa de férias num cenário natural privilegiado na Ria Formosa.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Availability Warning */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-amber-50 border border-amber-200 p-5 sm:p-6 rounded-2xl flex items-start gap-4 mb-12 md:mb-20 shadow-sm"
        >
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-800 uppercase tracking-wider text-xs mb-1">Informação Importante</h4>
            <p className="text-amber-700 text-sm font-medium">De momento o parque não tem disponibilidade de lotes para Mobile homes.</p>
          </div>
        </motion.div>

        {/* Intro Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-28">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-serif text-principal mb-5 md:mb-8 leading-tight">Lotes preparados para o seu refúgio</h2>
            <p className="text-texto-main/70 leading-relaxed text-base sm:text-lg font-light mb-6">
              Oferecemos lotes para mobile homes de 100m² até 250m², com todas as ligações necessárias (esgoto, água e electricidade) já instaladas. Localizados numa zona reservada para o efeito, estes lotes permitem que traga a sua própria mobile home para o nosso parque.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm sm:text-base text-texto-main/80 font-medium">
                <Check className="w-4 h-4 text-secundaria shrink-0" />
                Lotes de grandes dimensões (100m²-250m²)
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base text-texto-main/80 font-medium">
                <Check className="w-4 h-4 text-secundaria shrink-0" />
                Zona reservada e sossegada
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeInUp} className="relative">
            <div className="hidden sm:block absolute -inset-4 bg-secundaria/5 rounded-[2rem] rotate-2 -z-10" />
            <img 
              src="/assets/mobile-home2.jpg" 
              alt="Área de Mobile Homes" 
              className="rounded-3xl shadow-2xl aspect-video object-cover w-full"
            />
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-16 md:mb-28">
          {highlights.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-50 group hover:border-secundaria/30 transition-all duration-500"
            >
              <div className="w-12 h-12 bg-principal text-white rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-secundaria group-hover:text-principal transition-colors duration-500">
                {item.icon}
              </div>
              <h4 className="text-xl font-serif font-bold text-principal mb-2.5 sm:mb-3">{item.title}</h4>
              <p className="text-texto-main/60 text-sm font-light leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Information & Services */}
        <motion.div {...fadeInUp} className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-2xl border border-gray-100 mb-16 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-serif text-principal mb-6 sm:mb-8 flex items-center gap-3">
                <Info className="w-6 h-6 text-secundaria shrink-0" />
                Serviços de Infraestrutura
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-6">
                {[
                  'Ligação à rede de esgotos municipal',
                  'Contadores individuais de água potável',
                  'Pontos de ligação eléctrica certificados',
                  'Acesso a todas as facilidades do parque',
                  'Recolha de resíduos regular',
                  'Vigilância e segurança 24h',
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 text-sm text-texto-main/70 font-light">
                    <Check className="w-4 h-4 text-secundaria shrink-0 mt-0.5" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-branco-quente p-6 sm:p-8 rounded-2xl flex flex-col justify-center text-center border border-gray-100">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-4" />
              <h4 className="text-xl font-serif text-principal mb-3 sm:mb-4 italic">Lista de Espera</h4>
              <p className="text-xs text-texto-main/50 font-light leading-relaxed">
                Pode entrar em contacto connosco para ser notificado assim que surja um lote disponível para instalação.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeInUp} className="text-center">
          <Link to="/reservar?tipo=mobile-homes" className="w-full sm:w-auto inline-flex items-center justify-center min-h-[50px] bg-principal text-white px-8 sm:px-14 py-4 sm:py-5 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm shadow-2xl hover:bg-secundaria hover:text-principal transition-all duration-500">
            Contactar sobre Mobile Homes
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
