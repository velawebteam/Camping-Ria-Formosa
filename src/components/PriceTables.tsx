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
    <div className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-principal mb-4 uppercase tracking-tight">TABELAS DE PREÇOS</h2>
          <div className="w-20 h-1 bg-secundaria mx-auto rounded-full" />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <motion.h3 {...fadeInUp} className="text-2xl font-serif font-bold mb-8 text-principal flex items-center gap-4">
              <span className="w-8 h-8 bg-secundaria/10 rounded-lg flex items-center justify-center text-secundaria text-sm">01</span>
              Camping Geral 2026/27
            </motion.h3>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-x-auto rounded-2xl shadow-2xl border border-gray-100"
            >
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-principal text-white">
                    <th className="p-6 text-[10px] uppercase tracking-widest font-black">Modalidade</th>
                    <th className="p-6 text-[10px] uppercase tracking-widest font-black">16/09 a 14/06</th>
                    <th className="p-6 text-[10px] uppercase tracking-widest font-black">15/06-31/07 & 01/09-15/09</th>
                    <th className="p-6 text-[10px] uppercase tracking-widest font-black">01/08 a 31/08</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {generalPrices.map((row, i) => (
                    <motion.tr 
                      key={i} 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-branco-quente transition-colors group"
                    >
                      <td className="p-6 font-bold text-principal group-hover:text-secundaria transition-colors">{row.name}</td>
                      <td className="p-6 text-texto-main/70">{row.p1}</td>
                      <td className="p-6 text-texto-main/70">{row.p2}</td>
                      <td className="p-6 text-texto-main/70">{row.p3}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
            <motion.div {...fadeInUp} className="mt-8 space-y-2">
              <p className="text-xs text-texto-main/40 flex items-center gap-2">
                <span className="w-1 h-1 bg-secundaria rounded-full" />
                10% de desconto com a apresentação do Camping International Card no check-in.
              </p>
              <p className="text-xs text-texto-main/40 flex items-center gap-2">
                <span className="w-1 h-1 bg-secundaria rounded-full" />
                IVA incluído à taxa de 6%.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <motion.h3 {...fadeInUp} className="text-2xl font-serif font-bold mb-8 text-principal flex items-center gap-4">
              <span className="w-8 h-8 bg-secundaria/10 rounded-lg flex items-center justify-center text-secundaria text-sm">02</span>
              Promoção Inverno
            </motion.h3>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="bg-principal text-white p-8 rounded-2xl mb-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
                <p className="text-[10px] uppercase tracking-[0.3em] font-black mb-2 opacity-60">Período</p>
                <p className="text-xl font-serif font-bold text-secundaria">01/10 a 31/05</p>
              </div>
              
              {winterPrices.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex justify-between items-center p-6 border border-gray-100 rounded-2xl bg-white hover:border-secundaria/30 hover:shadow-lg transition-all duration-500 group cursor-default"
                >
                  <span className="font-bold text-principal group-hover:text-secundaria transition-colors text-sm uppercase tracking-wide">{item.name}</span>
                  <div className="text-right">
                    <span className="text-lg font-serif font-bold text-principal">{item.price}</span>
                    <span className="text-[10px] text-texto-main/40 block font-bold uppercase tracking-tighter">/ MÊS</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.p {...fadeInUp} className="mt-8 text-xs text-texto-main/40 italic leading-relaxed">
              * Mínimo 1 Mês. Taxa fixa inclui até 2 Adultos, Alvéolo, Eletricidade e 1 Animal de estimação.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
