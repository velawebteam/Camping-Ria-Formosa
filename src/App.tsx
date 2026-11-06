/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import PriceTables from './components/PriceTables';
import ContactsPage from './pages/ContactsPage';
import AlojamentosPage from './pages/AlojamentosPage';
import TestimonialsCarousel from './components/TestimonialsCarousel';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Home() {
  return (
    <>
      <section className="relative min-h-screen w-full flex items-center justify-center text-white overflow-hidden pt-20">
        <div className="absolute inset-0 w-full h-full">
          <iframe 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[100vh] min-w-[100vw] min-h-[56.25vw] pointer-events-none"
            src="https://www.youtube.com/embed/pLdLLlPG87s?si=azI-SM9pQRw8EJXc&autoplay=1&mute=1&loop=1&playlist=pLdLLlPG87s&controls=0&showinfo=0&rel=0&modestbranding=1"
            title="YouTube video player" 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            referrerPolicy="strict-origin-when-cross-origin">
          </iframe>
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">DESCUBRA O ALGARVE AO RITMO DA NATUREZA</h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">Entre a tranquilidade da natureza e a beleza da Ria Formosa, encontre o lugar ideal para as suas próximas férias.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/alojamentos" className="bg-verde-sec hover:bg-verde-escuro text-white px-8 py-4 rounded font-medium transition">EXPLORAR ALOJAMENTOS</Link>
            <button className="bg-branco-quente hover:bg-white text-texto-main px-8 py-4 rounded font-medium transition">RESERVAR ESTADIA</button>
          </div>
          <p className="mt-8 text-sm font-medium tracking-wider">Cabanas de Tavira · Algarve · Portugal</p>
        </div>
      </section>

      <section className="bg-branco-quente py-10 px-6">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4">
            <input type="date" className="border p-3 rounded" placeholder="Entrada" />
            <input type="date" className="border p-3 rounded" placeholder="Saída" />
            <select className="border p-3 rounded"><option>Adultos</option></select>
            <select className="border p-3 rounded"><option>Crianças</option></select>
            <button className="bg-verde-escuro text-white p-3 rounded font-bold hover:bg-verde-sec transition">VER DISPONIBILIDADE</button>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-8">UM LUGAR PARA DESFRUTAR DO ESSENCIAL</h2>
          <p className="text-lg text-texto-main/80 mb-12">Localizado junto ao Parque Natural da Ria Formosa, o Camping Ria Formosa oferece o equilíbrio perfeito entre natureza, conforto e descoberta. Com aproximadamente 56.000 m², cerca de 500 árvores e espaços preparados para diferentes formas de alojamento, é o destino ideal para desfrutar do Algarve ao seu próprio ritmo.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[ {label: '56.000 m²', sub: 'de espaço'}, {label: '500', sub: 'árvores'}, {label: '350', sub: 'alvéolos'}, {label: 'Localização', sub: 'Privilegiada'} ].map((item, i) => (
              <div key={i} className="border-l border-verde-sec pl-4 text-left">
                <div className="text-2xl font-serif font-bold text-verde-escuro">{item.label}</div>
                <div className="text-sm text-texto-main/70">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-branco-quente">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif mb-12 text-center">ESCOLHA A SUA FORMA DE VIVER AS FÉRIAS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              {title: 'Alvéolos', desc: 'Espaços para tendas, carros, autocaravanas e mobile homes.', img: '/assets/entrada.jpg'},
              {title: 'Bungalows', desc: '5 bungalows T2 totalmente equipados para o seu conforto.', img: '/assets/aistudio/bungalows.jpg'},
              {title: 'Kampaoh', desc: 'Experiência de campismo premium com a Kampaoh.', img: '/assets/quartos bungalows.jpg'},
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                <img src={item.img} alt={item.title} className="w-full h-64 object-cover" />
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-serif font-bold mb-3">{item.title}</h3>
                  <p className="text-texto-main/70 mb-6">{item.desc}</p>
                  <Link to="/alojamentos" className="text-verde-escuro font-medium hover:underline">EXPLORAR {item.title}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif mb-12 text-center">TUDO O QUE PRECISA PARA UMA ESTADIA MEMORÁVEL</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[ 
              {title: 'Piscina', img: '/assets/piscina.jpg'},
              {title: 'Parque Infantil', img: '/assets/parque infantil camping.jpg'},
              {title: 'Blocos Sanitários', img: '/assets/casas de banho - camping.jpg'},
              {title: 'Bungalows', img: '/assets/quartos bungalows.jpg'},
            ].map((item, i) => (
              <div key={i} className="group rounded-lg overflow-hidden shadow-sm">
                <img src={item.img} alt={item.title} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" />
                <div className="p-4 bg-white text-center font-medium">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TestimonialsCarousel />

      <PriceTables />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-branco-quente text-texto-main font-sans selection:bg-verde-sec selection:text-white">
        <header className="fixed top-0 left-0 right-0 z-50 h-20 pl-0 pr-8 flex justify-between items-center text-texto-main bg-white shadow-sm transition-all duration-300">
          <Link to="/" className="flex items-center h-full hover:opacity-90 transition">
            <img src="/assets/logo-camping.png" alt="Camping Ria Formosa" className="h-full w-auto object-contain block m-0 p-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-texto-main">
            <Link to="/" className="hover:text-principal transition">Início</Link>
            <Link to="/alojamentos" className="hover:text-principal transition">Alojamentos</Link>
            <Link to="/contactos" className="hover:text-principal transition">Contactos</Link>
          </nav>
          <button className="bg-principal hover:bg-secundaria text-white hover:text-texto-main px-5 py-2.5 rounded text-sm font-medium transition shadow-sm">RESERVAR</button>
        </header>
        
        <main className="animate-fadeIn">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alojamentos" element={<AlojamentosPage />} />
            <Route path="/contactos" element={<ContactsPage />} />
          </Routes>
        </main>

        <footer className="bg-verde-escuro text-white p-12 text-center text-sm">
          <div className="max-w-6xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <div className="mb-4">
                <img src="/assets/logo-camping.png" alt="Camping Ria Formosa" className="h-10 w-auto object-contain brightness-0 invert" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <p className="text-white/80">Quinta da Gomeira, Cabanas de Tavira</p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg mb-3">Contactos</h4>
              <p className="text-white/80">+351 281 328 887</p>
              <p className="text-white/80">info@campingriaformosa.com</p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg mb-3">Navegação</h4>
              <Link to="/" className="block text-white/80 hover:text-white mb-1 transition">Início</Link>
              <Link to="/alojamentos" className="block text-white/80 hover:text-white mb-1 transition">Alojamentos</Link>
              <Link to="/contactos" className="block text-white/80 hover:text-white transition">Contactos</Link>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-white/60">
            <p>© 2026 Camping Ria Formosa. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
