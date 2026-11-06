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
    <div className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif mb-12 text-center text-verde-escuro">TABELAS DE PREÇOS</h2>
        
        <div className="mb-16">
          <h3 className="text-xl font-serif font-bold mb-6 text-verde-sec">Camping Geral 2026/27</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-verde-escuro text-white">
                  <th className="p-4">Modalidade</th>
                  <th className="p-4">16/09 a 14/06</th>
                  <th className="p-4">15/06-31/07 & 01/09-15/09</th>
                  <th className="p-4">01/08 a 31/08</th>
                </tr>
              </thead>
              <tbody>
                {generalPrices.map((row, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="p-4 font-medium">{row.name}</td>
                    <td className="p-4">{row.p1}</td>
                    <td className="p-4">{row.p2}</td>
                    <td className="p-4">{row.p3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-600">- 10% de desconto com a apresentação do Camping International Card no check-in.</p>
          <p className="text-sm text-gray-600">- IVA incluído à taxa de 6%.</p>
        </div>

        <div>
          <h3 className="text-xl font-serif font-bold mb-6 text-verde-sec">Promoção de Inverno (01/10 a 31/05)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {winterPrices.map((item, i) => (
              <div key={i} className="flex justify-between p-4 border rounded-lg bg-branco-quente">
                <span className="font-medium">{item.name}</span>
                <span className="font-bold text-verde-escuro">{item.price} / mês</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">*Mínimo 1 Mês, Taxa fixa até 2 Adultos, Alvéolo, Eletricidade e 1 Animal de estimação.</p>
        </div>
      </div>
    </div>
  );
}
