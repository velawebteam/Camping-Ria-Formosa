import { motion } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function PriceTables() {
  const generalPrices = [
    { name: 'Adultos (15+ anos)', p1: '€6.60', p2: '€8.80', p3: '€9.70' },
    { name: 'Crianças (4 a 14 anos)', p1: '€4.40', p2: '€5.50', p3: '€6.00' },
    { name: 'Alvéolo Pequeno (até 35 m²)', p1: '€8.80', p2: '€11.00', p3: '€12.10' },
    { name: 'Alvéolo Grande (até 90 m²)', p1: '€17.00', p2: '€20.40', p3: '€22.50' },
    { name: 'Alvéolo XL (mais de 90 m²)', p1: '€26.40', p2: '€33.00', p3: '€36.30' },
    { name: 'Eletricidade (16 amp)', p1: '€5.50', p2: '€5.50', p3: '€5.50' },
    { name: 'Cão', p1: '€4.00', p2: '€4.00', p3: '€4.00' },
  ];

  const winterPrices = [
    { name: '1 Alvéolo pequeno', price: '€365' },
    { name: '2 Alvéolos pequenos', price: '€450' },
    { name: '3 Alvéolos pequenos', price: '€575' },
    { name: '1 Alvéolo Grande', price: '€500' },
    { name: '1 Alvéolo XL', price: '€575' },
  ];

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-8 md:mb-12 pb-6 md:pb-8 border-b border-principal/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-principal/50 mb-2">
              03. Tarifário Oficial
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-principal">Tabelas de Preços 2026/27</h2>
          </div>
          <p className="text-xs text-texto-main/60">
            Valores diários com IVA incluído à taxa de 6%.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5 md:mb-6">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-principal flex items-center gap-3">
                <span className="text-sm font-sans font-bold text-secundaria tabular-nums">01.</span>
                Camping Geral 2026/27
              </h3>
              <span className="sm:hidden text-[10px] font-semibold uppercase tracking-wider text-principal/45">
                Deslize para ver épocas →
              </span>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-principal/10">
              <table className="w-full min-w-[540px] text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-principal text-white">
                    <th className="p-3.5 sm:p-4 md:p-5 text-[11px] uppercase tracking-wider font-bold">Modalidade</th>
                    <th className="p-3.5 sm:p-4 md:p-5 text-[11px] uppercase tracking-wider font-bold tabular-nums">16/09 a 14/06</th>
                    <th className="p-3.5 sm:p-4 md:p-5 text-[11px] uppercase tracking-wider font-bold tabular-nums">15/06–31/07 &amp; 01/09–15/09</th>
                    <th className="p-3.5 sm:p-4 md:p-5 text-[11px] uppercase tracking-wider font-bold tabular-nums">01/08 a 31/08</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-principal/10">
                  {generalPrices.map((row, i) => (
                    <tr 
                      key={i} 
                      className="hover:bg-branco-quente transition-colors"
                    >
                      <td className="p-3.5 sm:p-4 md:p-5 font-semibold text-xs sm:text-sm text-principal">{row.name}</td>
                      <td className="p-3.5 sm:p-4 md:p-5 text-xs sm:text-sm text-texto-main/75 tabular-nums">{row.p1}</td>
                      <td className="p-3.5 sm:p-4 md:p-5 text-xs sm:text-sm text-texto-main/75 tabular-nums">{row.p2}</td>
                      <td className="p-3.5 sm:p-4 md:p-5 text-xs sm:text-sm text-texto-main/75 font-medium tabular-nums">{row.p3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 sm:mt-6 space-y-1.5 text-xs text-texto-main/60 font-light">
              <p>• 10% de desconto com a apresentação do Camping International Card no check-in.</p>
              <p>• IVA incluído à taxa legal de 6%.</p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xl font-serif font-bold mb-6 text-principal flex items-center gap-3">
              <span className="text-sm font-sans font-bold text-secundaria tabular-nums">02.</span>
              Promoção Inverno
            </h3>
            <div className="space-y-3">
              <div className="bg-principal text-white p-6 rounded-2xl mb-4">
                <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-1 text-white/65">Período Promocional</p>
                <p className="text-xl font-serif font-bold text-secundaria tabular-nums">01/10 a 31/05</p>
              </div>
              
              {winterPrices.map((item, i) => (
                <div 
                  key={i} 
                  className="flex justify-between items-center p-4 border border-principal/10 rounded-2xl bg-branco-quente/60 hover:border-secundaria/60 transition-colors"
                >
                  <span className="font-semibold text-principal text-xs uppercase tracking-wide">{item.name}</span>
                  <div className="text-right tabular-nums">
                    <span className="text-base font-serif font-bold text-principal">{item.price}</span>
                    <span className="text-[10px] text-texto-main/50 ml-1 font-semibold uppercase">/ mês</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-texto-main/55 font-light leading-relaxed">
              * Mínimo 1 mês. Taxa fixa inclui até 2 adultos, alvéolo, eletricidade e 1 animal de estimação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
