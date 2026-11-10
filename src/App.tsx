/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import PriceTables from './components/PriceTables';
import ContactsPage from './pages/ContactsPage';
import AlojamentosPage from './pages/AlojamentosPage';
import BungalowsPage from './pages/BungalowsPage';
import AlveolosPage from './pages/AlveolosPage';
import TestimonialsCarousel from './components/TestimonialsCarousel';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const letterAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

function AnimatedTitle({ text, className }: { text: string, className?: string }) {
  const words = text.split(' ');
  return (
    <motion.h1 className={className} initial="initial" animate="animate" transition={{ staggerChildren: 0.1 }}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-3">
          <motion.span
            className="inline-block"
            variants={letterAnimation}
            transition={{ duration: 0.8 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

function Counter({ value, sub }: { value: string, sub: string }) {
  const countRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);
  const target = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const animate = () => {
      start += increment;
      if (start < target) {
        setDisplayValue(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animate();
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={countRef} className="border-l-2 border-secundaria/30 pl-6 group hover:border-secundaria transition-colors duration-500">
      <div className="text-3xl font-serif font-bold text-principal group-hover:text-secundaria transition-colors duration-500">
        {displayValue}{suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-texto-main/40 mt-1 font-bold">{sub}</div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const [showReserveOptions, setShowReserveOptions] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="relative min-h-screen w-full flex items-center justify-center text-white overflow-hidden pt-20">
        <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full">
          <iframe 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[100vh] min-w-[100vw] min-h-[56.25vw] pointer-events-none opacity-80"
            src="https://www.youtube.com/embed/pLdLLlPG87s?si=azI-SM9pQRw8EJXc&autoplay=1&mute=1&loop=1&playlist=pLdLLlPG87s&controls=0&showinfo=0&rel=0&modestbranding=1"
            title="YouTube video player" 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            referrerPolicy="strict-origin-when-cross-origin">
          </iframe>
        </motion.div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-principal/60" />
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <AnimatedTitle 
            text="DESCUBRA O ALGARVE AO RITMO DA NATUREZA"
            className="text-5xl md:text-[65px] font-serif mb-6 leading-tight"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-light text-white/90"
          >
            Entre a tranquilidade da natureza e a beleza da Ria Formosa, encontre o lugar ideal para as suas próximas férias.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <Link to="/alojamentos" className="bg-secundaria hover:bg-white text-principal hover:text-principal px-12 py-5 rounded-full font-bold transition-all duration-500 transform hover:scale-105 shadow-2xl">
              EXPLORAR ALOJAMENTOS
            </Link>
            <Link to="/alojamentos" className="bg-transparent border-2 border-white/50 hover:border-white hover:bg-white hover:text-principal text-white px-12 py-5 rounded-full font-bold transition-all duration-500 transform hover:scale-105 backdrop-blur-sm text-center">
              RESERVAR ESTADIA
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      <motion.section 
        {...fadeInUp}
        className="bg-white py-12 px-8 relative z-20 -mt-16 mx-6 md:mx-auto max-w-6xl rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-gray-100"
      >
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-5 gap-8 items-end">
            <motion.div variants={fadeInUp} className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-principal/40 px-1">Check-in</label>
              <input type="date" className="w-full bg-branco-quente/50 border-0 border-b-2 border-gray-100 p-3 rounded-t-lg focus:outline-none focus:border-secundaria transition-all duration-300" />
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-principal/40 px-1">Check-out</label>
              <input type="date" className="w-full bg-branco-quente/50 border-0 border-b-2 border-gray-100 p-3 rounded-t-lg focus:outline-none focus:border-secundaria transition-all duration-300" />
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-principal/40 px-1">Adultos</label>
              <select className="w-full bg-branco-quente/50 border-0 border-b-2 border-gray-100 p-3 rounded-t-lg focus:outline-none focus:border-secundaria transition-all duration-300 cursor-pointer appearance-none">
                <option>1 Adulto</option>
                <option>2 Adultos</option>
                <option>3 Adultos</option>
              </select>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-principal/40 px-1">Crianças</label>
              <select className="w-full bg-branco-quente/50 border-0 border-b-2 border-gray-100 p-3 rounded-t-lg focus:outline-none focus:border-secundaria transition-all duration-300 cursor-pointer appearance-none">
                <option>0 Crianças</option>
                <option>1 Criança</option>
                <option>2 Crianças</option>
              </select>
            </motion.div>
            <motion.button variants={fadeInUp} className="bg-principal text-white h-14 rounded-xl font-bold hover:bg-secundaria hover:text-principal transition-all duration-500 shadow-lg transform active:scale-[0.98] uppercase tracking-widest text-xs">
              Verificar
            </motion.button>
        </motion.div>
      </motion.section>

      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-serif mb-8 text-principal leading-tight">UM LUGAR PARA <br/><span className="italic text-secundaria">DESFRUTAR DO ESSENCIAL</span></h2>
              <p className="text-xl text-texto-main/70 mb-12 leading-relaxed font-light">
                Localizado junto ao Parque Natural da Ria Formosa, o Camping Ria Formosa oferece o equilíbrio perfeito entre natureza, conforto e descoberta. Com aproximadamente 56.000 m², cerca de 500 árvores e espaços preparados para diferentes formas de alojamento, é o destino ideal para desfrutar do Algarve ao seu próprio ritmo.
              </p>
              <div className="grid grid-cols-2 gap-10">
                {[ {label: '56k m²', sub: 'espaço'}, {label: '500', sub: 'árvores'}, {label: '350', sub: 'alvéolos'}, {label: 'Cabanas', sub: 'Localização'} ].map((item, i) => (
                  <Counter key={i} value={item.label} sub={item.sub} />
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-secundaria/10 rounded-[2rem] -rotate-3 scale-95 -z-10" />
              <div className="overflow-hidden rounded-2xl shadow-2xl z-10 relative">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1 }}
                  src="/assets/entrada.jpg" 
                  alt="Entrada do Parque" 
                  className="aspect-[4/5] object-cover" 
                />
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-principal/5 rounded-full blur-3xl -z-20" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-branco-quente">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-principal uppercase tracking-tight">VIVA O ALGARVE</h2>
            <div className="w-20 h-1 bg-secundaria mx-auto rounded-full" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[ 
              {title: 'Alvéolos', desc: 'Espaços para tendas, carros, autocaravanas e mobile homes.', img: '/assets/entrada.jpg'},
              {title: 'Bungalows', desc: '5 bungalows T2 totalmente equipados para o seu conforto.', img: '/assets/aistudio/bungalows.jpg'},
              {title: 'Kampaoh', desc: 'Experiência de campismo premium com a Kampaoh.', img: '/assets/quartos bungalows.jpg'},
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -15 }}
                className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden group border border-white hover:border-secundaria/20 transition-all duration-500"
              >
                <div className="overflow-hidden relative h-80">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1 }}
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-principal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="p-12">
                  <h3 className="text-3xl font-serif font-bold mb-4 text-principal">{item.title}</h3>
                  <p className="text-texto-main/60 mb-10 leading-relaxed font-light text-lg">{item.desc}</p>
                  <Link to={item.title === 'Bungalows' ? "/alojamentos/bungalows" : item.title === 'Alvéolos' ? "/alojamentos/alveolos" : "/alojamentos"} className="inline-flex items-center gap-3 text-principal font-bold uppercase tracking-widest text-xs group/link">
                    Explorar
                    <div className="w-8 h-px bg-principal group-hover/link:w-12 group-hover/link:bg-secundaria transition-all duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section {...fadeInUp} className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-principal uppercase tracking-tight">O PARQUE</h2>
            <div className="w-20 h-1 bg-secundaria mx-auto rounded-full" />
          </div>
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[ 
              {title: 'Piscina', img: '/assets/piscina.jpg'},
              {title: 'Parque Infantil', img: '/assets/parque infantil camping.jpg'},
              {title: 'Blocos Sanitários', img: '/assets/casas de banho - camping.jpg'},
              {title: 'Bungalows', img: '/assets/quartos bungalows.jpg'},
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={{
                  initial: { opacity: 0, scale: 0.8 },
                  whileInView: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group rounded-3xl overflow-hidden shadow-2xl relative aspect-square cursor-pointer"
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-principal/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-white font-serif text-2xl font-bold">{item.title}</div>
                  <div className="w-0 h-0.5 bg-secundaria group-hover:w-full transition-all duration-500 mt-2" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      <motion.div {...fadeInUp}>
        <TestimonialsCarousel />
      </motion.div>

      <motion.section {...fadeInUp} className="py-32 px-6 bg-branco-quente border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-principal mb-12 uppercase tracking-tight italic">Pronto para a sua próxima aventura?</h2>
          
          <div className="flex flex-col items-center gap-8">
            <motion.button 
              layout
              onClick={() => setShowReserveOptions(!showReserveOptions)}
              className="bg-secundaria text-principal px-16 py-6 rounded-full font-bold uppercase tracking-widest text-sm shadow-2xl hover:bg-principal hover:text-white transition-all duration-500 transform hover:scale-105"
            >
              {showReserveOptions ? 'Fechar Opções' : 'Reserve já'}
            </motion.button>

            <AnimatePresence>
              {showReserveOptions && (
                <motion.div 
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="flex flex-wrap justify-center gap-4 mt-4"
                >
                  <Link to="/alojamentos/alveolos" className="bg-white border-2 border-principal/10 hover:border-secundaria text-principal px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 shadow-lg hover:shadow-secundaria/20">
                    Alvéolos
                  </Link>
                  <Link to="/alojamentos/bungalows" className="bg-white border-2 border-principal/10 hover:border-secundaria text-principal px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 shadow-lg hover:shadow-secundaria/20">
                    Bungalows
                  </Link>
                  <Link to="/alojamentos" className="bg-white border-2 border-principal/10 hover:border-secundaria text-principal px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 shadow-lg hover:shadow-secundaria/20">
                    Kampaoh
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export function App() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-branco-quente text-texto-main font-sans selection:bg-secundaria selection:text-principal antialiased">
      <ScrollToTop />
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 pl-0 pr-6 md:pr-12 flex justify-between items-center ${isScrolled ? 'h-20 bg-white/95 shadow-xl backdrop-blur-md border-b border-gray-100' : 'h-28 bg-white'}`}>
        <Link to="/" className="flex items-center h-full hover:opacity-90 transition transform hover:scale-[1.02]">
          <img src="/assets/logo-camping.png" alt="Camping Ria Formosa" className="transition-all duration-700 h-full w-auto object-contain block m-0 p-0" />
        </Link>
        <nav className="hidden md:flex gap-12 text-[11px] font-black uppercase tracking-[0.25em] text-principal/60">
          <Link to="/" className={`relative group transition-colors duration-300 hover:text-principal ${location.pathname === '/' ? 'text-principal' : ''}`}>
            Início
            <span className={`absolute -bottom-2 left-0 h-0.5 bg-secundaria transition-all duration-300 ${location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>
          <Link to="/alojamentos" className={`relative group transition-colors duration-300 hover:text-principal ${location.pathname === '/alojamentos' ? 'text-principal' : ''}`}>
            Alojamentos
            <span className={`absolute -bottom-2 left-0 h-0.5 bg-secundaria transition-all duration-300 ${location.pathname === '/alojamentos' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>
          <Link to="/alojamentos/alveolos" className={`relative group transition-colors duration-300 hover:text-principal ${location.pathname === '/alojamentos/alveolos' ? 'text-principal' : ''}`}>
            Alvéolos
            <span className={`absolute -bottom-2 left-0 h-0.5 bg-secundaria transition-all duration-300 ${location.pathname === '/alojamentos/alveolos' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>
          <Link to="/alojamentos/bungalows" className={`relative group transition-colors duration-300 hover:text-principal ${location.pathname === '/alojamentos/bungalows' ? 'text-principal' : ''}`}>
            Bungalows
            <span className={`absolute -bottom-2 left-0 h-0.5 bg-secundaria transition-all duration-300 ${location.pathname === '/alojamentos/bungalows' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>
          <Link to="/contactos" className={`relative group transition-colors duration-300 hover:text-principal ${location.pathname === '/contactos' ? 'text-principal' : ''}`}>
            Contactos
            <span className={`absolute -bottom-2 left-0 h-0.5 bg-secundaria transition-all duration-300 ${location.pathname === '/contactos' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>
        </nav>
        <div className="flex items-center gap-6">
          <button className="hidden sm:block text-[11px] font-black uppercase tracking-widest text-principal/40 hover:text-principal transition-colors">PT | EN</button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-principal hover:bg-secundaria text-white hover:text-principal px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl hover:shadow-secundaria/20"
          >
            Reservar
          </motion.button>
        </div>
      </header>
      
      <main className="pt-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/alojamentos" element={<AlojamentosPage />} />
            <Route path="/alojamentos/alveolos" element={<AlveolosPage />} />
            <Route path="/alojamentos/bungalows" element={<BungalowsPage />} />
            <Route path="/contactos" element={<ContactsPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="bg-principal text-white py-24 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 text-left">
          <div className="md:col-span-1">
            <img src="/assets/logo-camping.png" alt="Camping Ria Formosa" className="h-16 w-auto object-contain brightness-0 invert mb-8" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <p className="text-white/60 leading-relaxed font-light">
              Descubra a harmonia perfeita entre a natureza algarvia e o conforto moderno. O seu refúgio na Ria Formosa.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-xl mb-6 text-secundaria text-left">Onde Estamos</h4>
            <p className="text-white/70 font-light leading-relaxed">
              Quinta da Gomeira <br/>
              8800-058 Cabanas de Tavira <br/>
              Algarve, Portugal
            </p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-xl mb-6 text-secundaria text-left">Contactos</h4>
            <p className="text-white/70 font-light mb-2">+351 281 328 887</p>
            <p className="text-white/70 font-light hover:text-secundaria transition-colors cursor-pointer underline underline-offset-4 decoration-white/20">info@campingriaformosa.com</p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-xl mb-6 text-secundaria text-left">Links Rápidos</h4>
            <nav className="flex flex-col gap-3 font-light text-white/70">
              <Link to="/" className="hover:text-secundaria transition-colors">Início</Link>
              <Link to="/alojamentos" className="hover:text-secundaria transition-colors">Alojamentos</Link>
              <Link to="/alojamentos/alveolos" className="hover:text-secundaria transition-colors">Alvéolos</Link>
              <Link to="/alojamentos/bungalows" className="hover:text-secundaria transition-colors">Bungalows</Link>
              <Link to="/contactos" className="hover:text-secundaria transition-colors">Contactos</Link>
              <a href="#" className="hover:text-secundaria transition-colors">Política de Privacidade</a>
            </nav>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs tracking-widest uppercase">
          <p>© 2026 Camping Ria Formosa. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">TripAdvisor</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
