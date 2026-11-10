import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-40 pb-32 px-6 bg-branco-quente min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-serif mb-6 text-principal"
          >
            OS NOSSOS ALOJAMENTOS
          </motion.h1>
          <p className="text-xl text-texto-main/60 max-w-2xl mx-auto font-light">Escolha a opção que melhor se adapta ao seu estilo de férias e desfrute do Algarve.</p>
        </motion.div>
        
        <div className="space-y-32">
          {alojamentos.map((alojamento, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`relative group ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                <div className="absolute -inset-4 bg-secundaria/5 rounded-[2.5rem] rotate-2 group-hover:rotate-0 transition-transform duration-700 -z-10" />
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1 }}
                    src={alojamento.img} 
                    alt={alojamento.title} 
                    className="w-full h-[500px] object-cover" 
                  />
                </div>
              </div>
              
              <div className={i % 2 !== 0 ? 'md:order-1' : ''}>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
                  <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif font-bold mb-6 text-principal leading-tight">
                    {alojamento.title}
                  </motion.h2>
                  <motion.p variants={fadeInUp} className="text-xl text-texto-main/70 mb-8 leading-relaxed font-light">
                    {alojamento.desc}
                  </motion.p>
                  
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 mb-10 shadow-sm"
                  >
                    <p className="font-bold text-principal mb-6 uppercase tracking-[0.2em] text-[10px]">Capacidade: {alojamento.capacidade}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      {alojamento.comodidades.map(c => (
                        <motion.li 
                          key={c} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-3 text-texto-main/70 text-sm font-light"
                        >
                          <div className="w-1.5 h-1.5 bg-secundaria rounded-full shrink-0" />
                          {c}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.button 
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-principal text-white px-12 py-5 rounded-full font-bold hover:bg-secundaria hover:text-principal transition-all duration-500 shadow-xl uppercase tracking-widest text-xs"
                  >
                    Ver Disponibilidade
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
