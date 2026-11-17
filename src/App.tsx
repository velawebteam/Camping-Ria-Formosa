/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { ArrowRight, ExternalLink, MapPin, Menu, Phone, X } from 'lucide-react';
import PriceTables from './components/PriceTables';
import ContactsPage from './pages/ContactsPage';
import AlojamentosPage from './pages/AlojamentosPage';
import BungalowsPage from './pages/BungalowsPage';
import AlveolosPage from './pages/AlveolosPage';
import MobileHomesPage from './pages/MobileHomesPage';
import AboutPage from './pages/AboutPage';
import RiaFormosaPage from './pages/RiaFormosaPage';
import BookingPage from './pages/BookingPage';
import AdminPage from './pages/AdminPage';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import cabanasImg from './assets/images/cabanas_tavira_1794939856497.jpg';

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
    <div ref={countRef} className="border-t border-principal/15 pt-5 group hover:border-secundaria transition-colors duration-300">
      <div className="text-3xl font-serif font-bold text-principal tabular-nums group-hover:text-secundaria transition-colors duration-300">
        {displayValue}{suffix}
      </div>
      <div className="text-[11px] uppercase tracking-[0.18em] text-texto-main/55 mt-1.5 font-semibold">{sub}</div>
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
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  const [quickCheckIn, setQuickCheckIn] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [quickCheckOut, setQuickCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().slice(0, 10);
  });
  const [quickAdults, setQuickAdults] = useState('2');
  const [quickChildren, setQuickChildren] = useState('0');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn: quickCheckIn,
      checkOut: quickCheckOut,
      adults: quickAdults,
      children: quickChildren,
    });
    navigate(`/reservar?${params.toString()}`);
  };

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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[100vh] min-w-full min-h-[56.25vw] pointer-events-none opacity-80"
            src="https://www.youtube.com/embed/pLdLLlPG87s?si=IfqiXjz2D2T7Jcj5&autoplay=1&mute=1&loop=1&playlist=pLdLLlPG87s&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
          </iframe>
        </motion.div>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-principal/85" />
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-secundaria mb-5">
            Cabanas de Tavira · Ria Formosa · Algarve
          </p>
          <AnimatedTitle 
            text="DESCUBRA O ALGARVE AO RITMO DA NATUREZA"
            className="text-4xl sm:text-5xl md:text-[64px] font-serif mb-6 leading-[1.08] [text-wrap:balance]"
          />
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl mb-10 max-w-2xl mx-auto font-light text-white/90 leading-relaxed"
          >
            Entre a tranquilidade de 56.000 m² arborizados e a beleza da Ria Formosa, encontre o lugar ideal para as suas próximas férias.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/alojamentos" className="bg-secundaria hover:bg-white text-principal px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.18em] transition-colors duration-200 shadow-2xl whitespace-nowrap">
              Explorar Alojamentos
            </Link>
            <Link to="/reservar" className="bg-white/10 border border-white/40 hover:bg-white hover:text-principal text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.18em] transition-colors duration-200 backdrop-blur-sm whitespace-nowrap">
              Reservar Estadia
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:flex absolute bottom-24 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-60 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      <motion.section 
        {...fadeInUp}
        className="bg-white p-5 sm:p-6 md:p-8 relative z-20 -mt-10 md:-mt-14 mx-4 sm:mx-6 md:mx-auto max-w-6xl rounded-3xl shadow-[0_24px_60px_-15px_rgba(0,61,93,0.18)] border border-principal/10"
      >
        <form onSubmit={handleQuickSearch} className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 items-end">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-principal/55 px-1">Check-in</label>
              <input
                type="date"
                value={quickCheckIn}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => {
                  const val = e.target.value;
                  setQuickCheckIn(val);
                  if (val && quickCheckOut <= val) {
                    const next = new Date(val);
                    next.setDate(next.getDate() + 1);
                    setQuickCheckOut(next.toISOString().slice(0, 10));
                  }
                }}
                required
                className="w-full min-h-[46px] bg-branco-quente border border-principal/10 px-3 sm:px-4 py-2.5 rounded-xl text-base md:text-sm font-medium text-principal focus:outline-none focus:border-secundaria transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-principal/55 px-1">Check-out</label>
              <input
                type="date"
                value={quickCheckOut}
                min={quickCheckIn || new Date().toISOString().slice(0, 10)}
                onChange={(e) => setQuickCheckOut(e.target.value)}
                required
                className="w-full min-h-[46px] bg-branco-quente border border-principal/10 px-3 sm:px-4 py-2.5 rounded-xl text-base md:text-sm font-medium text-principal focus:outline-none focus:border-secundaria transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-principal/55 px-1">Adultos</label>
              <select
                value={quickAdults}
                onChange={(e) => setQuickAdults(e.target.value)}
                className="w-full min-h-[46px] bg-branco-quente border border-principal/10 px-3 sm:px-4 py-2.5 rounded-xl text-base md:text-sm font-medium text-principal focus:outline-none focus:border-secundaria transition-colors cursor-pointer"
              >
                <option value="1">1 Adulto</option>
                <option value="2">2 Adultos</option>
                <option value="3">3 Adultos</option>
                <option value="4">4 Adultos</option>
                <option value="5">5 Adultos</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-principal/55 px-1">Crianças</label>
              <select
                value={quickChildren}
                onChange={(e) => setQuickChildren(e.target.value)}
                className="w-full min-h-[46px] bg-branco-quente border border-principal/10 px-3 sm:px-4 py-2.5 rounded-xl text-base md:text-sm font-medium text-principal focus:outline-none focus:border-secundaria transition-colors cursor-pointer"
              >
                <option value="0">0 Crianças</option>
                <option value="1">1 Criança</option>
                <option value="2">2 Crianças</option>
                <option value="3">3 Crianças</option>
              </select>
            </div>
            <button type="submit" className="col-span-2 md:col-span-1 bg-principal text-white h-[48px] rounded-xl font-bold hover:bg-secundaria hover:text-principal transition-colors duration-200 uppercase tracking-[0.18em] text-xs cursor-pointer whitespace-nowrap">
              Verificar
            </button>
        </form>
      </motion.section>

      <section className="py-28 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-principal/50 mb-4">
                Quinta da Gomeira · Desde o Coração da Ria Formosa
              </p>
              <h2 className="text-3xl sm:text-5xl font-serif mb-6 text-principal leading-[1.12] [text-wrap:balance]">
                Um lugar para <span className="italic text-secundaria">desfrutar do essencial</span>
              </h2>
              <p className="text-base sm:text-lg text-texto-main/75 mb-10 leading-relaxed font-light">
                Localizado junto ao Parque Natural da Ria Formosa, o Camping Ria Formosa oferece o equilíbrio perfeito entre natureza, conforto e descoberta. Com aproximadamente 56.000 m², cerca de 500 árvores e espaços preparados para diferentes formas de alojamento, é o destino ideal para desfrutar do Algarve ao seu próprio ritmo.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-8">
                {[ {label: '56k m²', sub: 'área total'}, {label: '500', sub: 'árvores'}, {label: '350', sub: 'alvéolos'}, {label: 'Cabanas', sub: 'de Tavira'} ].map((item, i) => (
                  <Counter key={i} value={item.label} sub={item.sub} />
                ))}
              </div>
              <Link
                to="/sobre-nos"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-principal hover:text-secundaria transition-colors self-start"
              >
                Conhecer o Parque e Instalações
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <div className="overflow-hidden rounded-3xl shadow-xl h-96 lg:h-full min-h-[420px]">
                <img 
                  src="/assets/entrada.jpg" 
                  alt="Entrada arborizada do Camping Ria Formosa" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 bg-branco-quente">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-principal/10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-principal/50 mb-3">
                Estadia à Sua Medida
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-principal leading-tight">
                Viva o Algarve
              </h2>
            </div>
            <Link
              to="/alojamentos"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-principal hover:text-secundaria transition-colors whitespace-nowrap"
            >
              Ver Todos os Alojamentos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              {
                index: '01.',
                title: 'Alvéolos',
                meta: '~350 parcelas · Reserva imediata',
                desc: 'Espaços individuais com sombra natural e ligação elétrica para tendas, caravanas e autocaravanas.',
                img: '/assets/entrada.jpg',
                href: '/alojamentos',
                external: false,
              },
              {
                index: '02.',
                title: 'Bungalows',
                meta: '5 unidades T2 · Reserva imediata',
                desc: 'Bungalows Classe A e Classe B totalmente equipados com cozinha, AC e acesso incluído às piscinas.',
                img: '/assets/aistudio/bungalows.jpg',
                href: '/alojamentos',
                external: false,
              },
              {
                index: '03.',
                title: 'Kampaoh',
                meta: 'Glamping parceiro oficial',
                desc: 'Tendas equipadas e prontas à chegada para uma experiência de campismo confortável ao ar livre.',
                img: '/assets/quartos bungalows.jpg',
                href: 'https://booking.kampaoh.com/property/141?lang=pt&checkin=2026-11-17&checkout=2026-11-19&adults=2&children=0&babies=0&fpa=none',
                external: true,
              },
            ].map((item, i) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border border-principal/10 overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="overflow-hidden relative h-64">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-8 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-principal/55 font-medium">
                      <span className="font-bold text-principal tabular-nums">{item.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.meta}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-principal">{item.title}</h3>
                    <p className="text-texto-main/70 leading-relaxed font-light text-sm">{item.desc}</p>
                  </div>
                </div>
                <div className="px-8 pb-8">
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-principal font-bold uppercase tracking-[0.18em] text-xs hover:text-secundaria transition-colors"
                    >
                      Reservar na Kampaoh
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="inline-flex items-center gap-2 text-principal font-bold uppercase tracking-[0.18em] text-xs hover:text-secundaria transition-colors"
                    >
                      Explorar
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section {...fadeInUp} className="py-20 md:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-14 md:space-y-20">
          <div className="text-center space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-principal/50">
              Infraestruturas &amp; Ambiente
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-principal">O Parque</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[ 
              {title: 'Piscina', subtitle: 'Adultos e crianças', img: '/assets/piscina.jpg', to: '/sobre-nos'},
              {title: 'Parque Infantil', subtitle: 'Zonas verdes e lazer', img: '/assets/parque infantil camping.jpg', to: '/sobre-nos'},
              {title: 'Blocos Sanitários', subtitle: 'Água quente solar', img: '/assets/casas de banho - camping.jpg', to: '/sobre-nos'},
              {title: 'Bungalows', subtitle: 'Alojamento T2 equipado', img: '/assets/quartos bungalows.jpg', to: '/alojamentos/bungalows'},
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <Link
                  to={item.to}
                  className="group block rounded-3xl overflow-hidden relative aspect-square shadow-md hover:shadow-2xl transform transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-principal/90 via-principal/25 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="w-8 group-hover:w-14 h-0.5 bg-secundaria mb-3 transition-all duration-500" />
                    <div className="text-white font-serif text-xl font-bold group-hover:text-secundaria transition-colors duration-300">
                      {item.title}
                    </div>
                    <p className="text-white/80 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {item.subtitle}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Destination Spotlight Banner */}
          <div className="bg-branco-quente rounded-[2.5rem] border border-principal/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 p-8 md:p-14 flex flex-col justify-center space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-principal/55">
                <MapPin className="w-4 h-4 text-secundaria" />
                Guia da Região
              </div>
              <h3 className="text-3xl md:text-4xl font-serif text-principal leading-tight [text-wrap:balance]">
                Ria Formosa, Cabanas, Tavira e o Sotavento Algarvio
              </h3>
              <p className="text-sm md:text-base text-texto-main/70 font-light leading-relaxed">
                A poucos minutos da Ilha de Cabanas, das salinas de Tavira e da emblemática Ponte Romana sobre o rio Gilão, descubra praias preservadas, trilhos e gastronomia autêntica.
              </p>
              <div className="pt-2">
                <Link
                  to="/ria-formosa"
                  className="inline-flex items-center gap-3 bg-principal text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.18em] hover:bg-secundaria hover:text-principal transition-colors whitespace-nowrap"
                >
                  Explorar Ria Formosa &amp; Tavira
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6 min-h-[280px] relative">
              <img
                src={cabanasImg}
                alt="Marginal de Cabanas de Tavira e acesso à Ilha de Cabanas"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.section>
      
      <motion.div {...fadeInUp}>
        <TestimonialsCarousel />
      </motion.div>

      <motion.section {...fadeInUp} className="py-24 px-6 bg-branco-quente border-t border-principal/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif text-principal [text-wrap:balance]">
            Pronto para a sua próxima estadia na Ria Formosa?
          </h2>
          <div>
            <Link 
              to="/reservar"
              className="inline-flex items-center gap-3 bg-secundaria text-principal px-12 py-5 rounded-full font-bold uppercase tracking-[0.18em] text-xs hover:bg-principal hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              Reserve já
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export function App() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const hasDarkHero =
    location.pathname === '/' ||
    location.pathname === '/sobre-nos' ||
    location.pathname === '/ria-formosa' ||
    location.pathname.startsWith('/alojamentos/');
  const useLightHeaderContent = !isScrolled && hasDarkHero && !mobileMenuOpen;

  const navItems = [
    { to: '/', label: 'Início' },
    { to: '/alojamentos', label: 'Alojamentos' },
    { to: '/sobre-nos', label: 'Sobre Nós' },
    { to: '/ria-formosa', label: 'Ria Formosa' },
    { to: '/contactos', label: 'Contactos' },
  ];

  return (
    <div className="min-h-screen bg-branco-quente text-texto-main font-sans selection:bg-secundaria selection:text-principal antialiased overflow-x-hidden">
      <ScrollToTop />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pl-0 pr-4 sm:pr-6 md:pr-10 flex justify-between items-center ${
          isScrolled || mobileMenuOpen
            ? 'h-16 md:h-20 bg-white/95 shadow-xl backdrop-blur-md border-b border-gray-100'
            : 'h-20 md:h-24 lg:h-28 bg-transparent'
        }`}
      >
        <Link to="/" className="flex items-center h-full hover:opacity-90 transition shrink-0">
          <img
            src="/assets/logo-camping.png"
            alt="Camping Ria Formosa"
            className={`transition-all duration-500 h-full w-auto object-contain block m-0 p-0 ${
              useLightHeaderContent ? 'brightness-0 invert drop-shadow-sm' : ''
            }`}
          />
        </Link>

        <nav
          className={`hidden lg:flex gap-7 xl:gap-10 text-[11px] font-black uppercase tracking-[0.22em] transition-colors duration-300 ${
            useLightHeaderContent ? 'text-white/85' : 'text-principal/65'
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative group whitespace-nowrap shrink-0 transition-colors duration-200 ${
                useLightHeaderContent ? 'hover:text-white' : 'hover:text-principal'
              } ${
                location.pathname === item.to
                  ? useLightHeaderContent
                    ? 'text-white'
                    : 'text-principal'
                  : ''
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-2 left-0 h-0.5 bg-secundaria transition-all duration-300 ${
                  location.pathname === item.to ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link
            to="/reservar"
            className={`px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.16em] sm:tracking-[0.2em] transition-all duration-300 shadow-lg whitespace-nowrap shrink-0 min-h-[40px] sm:min-h-[44px] inline-flex items-center ${
              useLightHeaderContent
                ? 'bg-secundaria text-principal hover:bg-white hover:text-principal'
                : 'bg-principal hover:bg-secundaria text-white hover:text-principal'
            }`}
          >
            Reservar
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            className={`lg:hidden min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              useLightHeaderContent
                ? 'text-white hover:bg-white/15'
                : 'text-principal hover:bg-principal/5'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 z-40 bg-white/98 backdrop-blur-lg border-t border-principal/10 overflow-y-auto px-6 py-8 flex flex-col justify-between gap-8"
          >
            <nav className="space-y-2">
              {navItems.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between min-h-[52px] px-4 rounded-2xl text-base font-serif font-bold transition-colors ${
                      active
                        ? 'bg-branco-quente text-principal border border-secundaria/60'
                        : 'text-principal/80 hover:bg-branco-quente hover:text-principal'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className={`w-4 h-4 ${active ? 'text-secundaria' : 'text-principal/30'}`} />
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-5 pt-6 border-t border-principal/10">
              <Link
                to="/reservar"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[52px] bg-secundaria text-principal rounded-full font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2"
              >
                Verificar Disponibilidade e Reservar
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+351281328887"
                className="w-full min-h-[48px] bg-branco-quente text-principal rounded-2xl px-5 flex items-center justify-center gap-2.5 text-sm font-semibold tabular-nums"
              >
                <Phone className="w-4 h-4 text-secundaria" />
                Receção: +351 281 328 887
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="pt-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre-nos" element={<AboutPage />} />
            <Route path="/ria-formosa" element={<RiaFormosaPage />} />
            <Route path="/alojamentos" element={<AlojamentosPage />} />
            <Route path="/alojamentos/alveolos" element={<AlveolosPage />} />
            <Route path="/alojamentos/bungalows" element={<BungalowsPage />} />
            <Route path="/alojamentos/mobile-homes" element={<MobileHomesPage />} />
            <Route path="/contactos" element={<ContactsPage />} />
            <Route path="/reservar" element={<BookingPage />} />
            <Route path="/admin" element={<AdminPage />} />
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
              <Link to="/sobre-nos" className="hover:text-secundaria transition-colors">Sobre Nós</Link>
              <Link to="/ria-formosa" className="hover:text-secundaria transition-colors">Ria Formosa &amp; Tavira</Link>
              <Link to="/alojamentos" className="hover:text-secundaria transition-colors">Alojamentos</Link>
              <Link to="/contactos" className="hover:text-secundaria transition-colors">Contactos</Link>
              <Link to="/admin" className="hover:text-secundaria transition-colors">Área Reservada</Link>
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
