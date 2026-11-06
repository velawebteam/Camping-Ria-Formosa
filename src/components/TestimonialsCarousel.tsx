import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      text: 'Camping calme, propre et très bien situé près de Cabanas de Tavira. Un vrai havre de paix pour découvrir l\'Algarve.',
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth > 768 ? 400 : 300;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 px-6 bg-branco-quente overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-serif mb-3 text-principal">O QUE DIZEM OS NOSSOS HÓSPEDES</h2>
            <p className="text-texto-main/70 max-w-xl">Experiências reais partilhadas por quem nos visita e vive o melhor do Algarve connosco.</p>
          </div>
          <div className="flex gap-3 mt-6 md:mt-0">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white border border-gray-200 text-principal hover:bg-principal hover:text-white transition shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white border border-gray-200 text-principal hover:bg-principal hover:text-white transition shadow-sm"
              aria-label="Seguinte"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 -mx-6 px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((test, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between min-w-[320px] md:min-w-[380px] max-w-[400px] shrink-0 snap-start"
            >
              <div>
                <div className="flex text-amber-500 mb-4">
                  {[...Array(test.rating)].map((_, idx) => (
                    <svg key={idx} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-texto-main/80 italic mb-6">"{test.text}"</p>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <div>
                  <h4 className="font-serif font-bold text-principal">{test.name}</h4>
                  <p className="text-xs text-texto-main/60">{test.role}</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-gray-100 rounded-full text-gray-600 font-medium">{test.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
