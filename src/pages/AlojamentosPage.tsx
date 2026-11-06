export default function AlojamentosPage() {
  const alojamentos = [
    {
      title: 'Alvéolos',
      desc: 'Espaços de arrendamento livre onde podem ser colocadas tendas, carros, autocaravanas, mobile homes, etc.',
      capacidade: 'Variável',
      img: '/assets/entrada.jpg',
      comodidades: ['Alvéolos sombreados', 'Eletricidade disponível', 'Acesso aos blocos sanitários', 'Zona de grelhadores']
    },
    {
      title: 'Bungalows',
      desc: '5 bungalows T2 totalmente equipados, ideais para famílias ou pequenos grupos.',
      capacidade: '4 a 5 pessoas',
      img: '/assets/aistudio/bungalows.jpg',
      comodidades: ['2 quartos', 'Cozinha equipada', 'Casa de banho privativa', 'Terraço privado']
    },
    {
      title: 'Kampaoh',
      desc: 'Tendas pré-montadas de alta qualidade pela Kampaoh, para uma experiência de campismo sem preocupações.',
      capacidade: 'Variável',
      img: '/assets/quartos bungalows.jpg',
      comodidades: ['Tendas equipadas', 'Design exclusivo', 'Conforto superior', 'Serviço Kampaoh']
    }
  ];

  return (
    <div className="pt-28 pb-20 px-6 bg-branco-quente min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif mb-12 text-center text-verde-escuro">Os Nossos Alojamentos</h1>
        <div className="space-y-16">
          {alojamentos.map((alojamento, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-sm border border-gray-100 items-center">
              <img src={alojamento.img} alt={alojamento.title} className="w-full h-80 object-cover rounded-lg" />
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-verde-escuro">{alojamento.title}</h2>
                <p className="text-texto-main/80 mb-4">{alojamento.desc}</p>
                <p className="font-semibold mb-2">Capacidade: {alojamento.capacidade}</p>
                <ul className="list-disc list-inside text-texto-main/70 mb-6 space-y-1">
                  {alojamento.comodidades.map(c => <li key={c}>{c}</li>)}
                </ul>
                <button className="bg-verde-escuro text-white px-6 py-3 rounded font-bold hover:bg-verde-sec transition">VER DISPONIBILIDADE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
