import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export default function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'Família em Bungalow',
      text: 'Parque de campismo excelente, muito limpo e organizado. A localização junto à Ria Formosa é maravilhosa e os funcionários são super atenciosos. Recomendo vivamente!',
      rating: 5,
      source: 'Google Reviews'
    },
    {
      name: 'Hans Weber',
      role: 'Campista em Alvéolo',
      text: 'Wunderbarer Campingplatz! Sehr ruhige Atmosphäre, tolle Plätze im Schatten der Bäume und sehr saubere Sanitäranlagen. Wir kommen definitiv wieder.',
      rating: 5,
      source: 'Google Reviews'
    },
    {
      name: 'Carlos Rodrigues',
      role: 'Casal',
      text: 'Excelente relação qualidade/preço. Os bungalows são muito confortáveis e a zona da piscina é ótima para relaxar em família.',
      rating: 5,
      source: 'Google Reviews'
    },
    {
      name: 'Sophie Martin',
      role: 'Viajante em Autocaravana',
      text: 'Camping calme, propre et très bien situé près de Cabanas de Tavira. Un vrai havre de paix pour descobrir l\'Algarve.',
      rating: 5,
      source: 'Google Reviews'
    },
    {
      name: 'António Silva',
      role: 'Campista habitual',
      text: 'Espaço espetacular com muita sombra, excelentes condições e perto de praias incríveis. A melhor escolha para campismo em Tavira.',
      rating: 5,
      source: 'Google Reviews'
    }
  ];

  // Triplicar para permitir loop infinito perfeito
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const singleSetWidth = el.scrollWidth / 3;
      el.scrollLeft = singleSetWidth;
    }
  }, []);

  const handleInfiniteScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth } = el;
    const singleSetWidth = scrollWidth / 3;

    if (scrollLeft <= 10) {
      el.scrollLeft = singleSetWidth + scrollLeft;
    } else if (scrollLeft >= singleSetWidth * 2 - 10) {
      el.scrollLeft = scrollLeft - singleSetWidth;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = el.offsetWidth > 600 ? 450 : 350;
      el.scrollTo({
        left: direction === 'left' ? el.scrollLeft - scrollAmount : el.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-32 px-6 bg-branco-quente overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <div className="inline-block px-4 py-1 bg-secundaria/10 rounded-full text-principal text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Feedback dos Hóspedes
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-principal leading-tight">O QUE DIZEM <br/><span className="text-secundaria italic">OS NOSSOS HÓSPEDES</span></h2>
          </div>
          <div className="flex gap-4 mt-8 md:mt-0">
            <button 
              onClick={() => scroll('left')}
              className="p-4 rounded-full bg-white border border-gray-100 text-principal hover:bg-secundaria hover:border-secundaria transition-all duration-500 shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-4 rounded-full bg-white border border-gray-100 text-principal hover:bg-secundaria hover:border-secundaria transition-all duration-500 shadow-sm"
              aria-label="Seguinte"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        <div 
          ref={scrollRef}
          onScroll={handleInfiniteScroll}
          className="flex gap-8 overflow-x-auto scrollbar-none pb-12 -mx-6 px-6 cursor-grab active:cursor-grabbing snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {extendedTestimonials.map((test, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col justify-between min-w-[340px] md:min-w-[420px] max-w-[440px] shrink-0 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] snap-start"
            >
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-secundaria/10" />
                <div className="flex text-secundaria mb-6 relative z-10">
                  {[...Array(test.rating)].map((_, idx) => (
                    <svg key={idx} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-texto-main/80 text-lg leading-relaxed font-light mb-8 relative z-10">"{test.text}"</p>
              </div>
              <div className="pt-8 border-t border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-principal/5 rounded-full flex items-center justify-center font-serif font-bold text-principal text-xl uppercase">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-principal text-lg">{test.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-texto-main/40 font-bold">{test.role}</p>
                  </div>
                </div>
                <span className="text-[9px] px-3 py-1 bg-branco-quente rounded-full text-texto-main/60 font-black uppercase tracking-widest">{test.source}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
