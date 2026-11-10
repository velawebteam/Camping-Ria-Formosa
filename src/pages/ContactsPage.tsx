import { motion } from 'motion/react';
import ContactForm from '../components/ContactForm';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
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

export default function ContactsPage() {
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
            className="text-4xl md:text-6xl font-serif mb-6 text-principal uppercase tracking-tight"
          >
            CONTACTE-NOS
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-secundaria mx-auto rounded-full mb-8" 
          />
          <p className="text-xl text-texto-main/60 max-w-2xl mx-auto font-light">Estamos aqui para ajudar a planear as suas férias perfeitas. Fale connosco.</p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secundaria/5 rounded-full blur-3xl -mr-16 -mt-16" />
            <h2 className="text-3xl font-serif font-bold mb-12 text-principal text-center relative">Informações de Contacto</h2>
            
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mb-12">
              {[
                {
                  icon: <svg className="w-5 h-5 text-principal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
                  label: "Morada",
                  content: "Quinta da Gomeira\n8800-058 Cabanas de Tavira\nAlgarve, Portugal"
                },
                {
                  icon: <svg className="w-5 h-5 text-principal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 011.94.553L9.58 8.41a1 1 0 01-.47 1.18L7.68 10.43a11.005 11.005 0 005.02 5.02l1.09-1.31a1 1 0 011.18-.47l2.27.44a1 1 0 01.554.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
                  label: "Telefone",
                  content: "+351 281 328 887"
                },
                {
                  icon: <svg className="w-5 h-5 text-principal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
                  label: "E-mail",
                  content: "info@campingriaformosa.com"
                }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 bg-secundaria/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-secundaria/20 transition-all duration-500 mb-6 transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-principal mb-3 uppercase tracking-widest text-[10px] opacity-40">{item.label}</h4>
                    <p className="text-texto-main/70 font-light leading-relaxed whitespace-pre-line group-hover:text-principal transition-colors duration-500 text-sm">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-10 border-t border-gray-50 text-center"
            >
                <h4 className="font-bold text-principal mb-4 uppercase tracking-widest text-[10px] opacity-40 text-center">Coordenadas GPS</h4>
                <div className="bg-branco-quente px-8 py-4 rounded-2xl text-xs font-mono text-principal/60 group hover:text-principal transition-all duration-500 inline-block border border-gray-100 shadow-sm group-hover:shadow-md">
                  Lat: 37º 08’ 42.24 N | Lon: 07º 36’ 08.03 W
                </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto space-y-16"
          >
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white p-2 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden h-96 relative group"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3180.351306603321!2d-7.60361772371803!3d37.14434534822408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd101ca61f785e41%3A0xd66f79b66143e8ce!2sParque%20de%20Campismo%20Ria%20Formosa!5e0!3m2!1spt-PT!2spt!4v1793984564399!5m2!1spt-PT!2spt" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                className="rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="strict-origin-when-cross-origin">
              </iframe>
            </motion.div>
            
            <div className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
              <h2 className="text-3xl font-serif font-bold mb-10 text-principal text-center">Envie-nos uma Mensagem</h2>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
