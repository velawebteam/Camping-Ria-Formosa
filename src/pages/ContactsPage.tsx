import { motion } from 'motion/react';
import { Phone, Mail, Clock, Compass } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

export default function ContactsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 sm:pt-32 lg:pt-36 pb-20 md:pb-28 px-4 sm:px-6 bg-branco-quente min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        {/* Centered Header */}
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-secundaria mb-3"
          >
            Localização &amp; Apoio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-serif text-principal mb-4 sm:mb-6 uppercase tracking-tight"
          >
            Contactos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-texto-main/70 font-light leading-relaxed"
          >
            Estamos à sua inteira disposição para esclarecer qualquer dúvida sobre a sua estadia,
            instalações ou acesso ao parque.
          </motion.p>
        </div>

        {/* 1. Horizontal Contact Details Card (Telefone, Email, Horário, Coordenadas) */}
        <motion.section
          {...fadeInUp}
          className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10 mb-10 md:mb-14"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-principal/10">
            {/* Telefone */}
            <div className="flex items-start gap-4 lg:pr-6">
              <div className="w-11 h-11 rounded-2xl bg-branco-quente text-principal flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-secundaria" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-bold uppercase tracking-widest text-principal/45 mb-1">
                  Telefone
                </h2>
                <a
                  href="tel:+351281328887"
                  className="inline-flex items-center min-h-[44px] text-lg font-serif font-bold text-principal hover:text-secundaria transition-colors tabular-nums whitespace-nowrap"
                >
                  +351 281 328 887
                </a>
                <p className="text-xs text-texto-main/55 font-light">Receção e apoio diário</p>
              </div>
            </div>

            {/* E-mail */}
            <div className="flex items-start gap-4 lg:px-6">
              <div className="w-11 h-11 rounded-2xl bg-branco-quente text-principal flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-secundaria" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-bold uppercase tracking-widest text-principal/45 mb-1">
                  E-mail
                </h2>
                <a
                  href="mailto:info@campingriaformosa.com"
                  className="inline-flex items-center min-h-[44px] text-sm font-semibold text-principal hover:text-secundaria transition-colors break-all"
                >
                  info@campingriaformosa.com
                </a>
                <p className="text-xs text-texto-main/55 font-light">Resposta direta</p>
              </div>
            </div>

            {/* Horário */}
            <div className="flex items-start gap-4 lg:px-6">
              <div className="w-11 h-11 rounded-2xl bg-branco-quente text-principal flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-secundaria" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-bold uppercase tracking-widest text-principal/45 mb-2">
                  Horário da Receção
                </h2>
                <p className="text-xs sm:text-sm text-texto-main/75 leading-relaxed tabular-nums">
                  <strong className="text-principal">Verão:</strong> 08h00 – 19h00
                  <br />
                  <strong className="text-principal">Inverno:</strong> 08h00 – 13h00 · 14h00 –
                  19h00
                </p>
                <p className="text-xs text-texto-main/50 mt-1">Viaturas: 08h00 – 00h00</p>
              </div>
            </div>

            {/* Coordenadas */}
            <div className="flex items-start gap-4 lg:pl-6">
              <div className="w-11 h-11 rounded-2xl bg-principal text-secundaria flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-bold uppercase tracking-widest text-principal/45 mb-2">
                  Coordenadas GPS
                </h2>
                <p className="font-mono text-xs text-principal font-semibold leading-relaxed tabular-nums">
                  37º 08’ 42.24” N
                  <br />
                  07º 36’ 08.03” W
                </p>
                <p className="text-xs text-texto-main/55 font-light mt-1">
                  Quinta da Gomeira · Cabanas de Tavira
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 2. Full-Width Map */}
        <motion.section
          {...fadeInUp}
          className="bg-white p-2.5 sm:p-4 rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-12 md:mb-16"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3180.351306603321!2d-7.60361772371803!3d37.14434534822408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd101ca61f785e41%3A0xd66f79b66143e8ce!2sParque%20de%20Campismo%20Ria%20Formosa!5e0!3m2!1spt-PT!2spt!4v1793984564399!5m2!1spt-PT!2spt"
            width="100%"
            height="440"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="Localização do Camping Ria Formosa em Cabanas de Tavira"
            className="rounded-2xl md:rounded-[1.8rem] w-full h-[320px] sm:h-[440px]"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </motion.section>

        {/* 3. Centered Contact Form */}
        <motion.section
          {...fadeInUp}
          className="max-w-3xl mx-auto bg-white p-6 sm:p-10 md:p-12 rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-gray-100"
        >
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secundaria mb-2">
              Envie-nos uma Mensagem
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif text-principal font-bold">
              Tem alguma questão?
            </h2>
          </div>
          <ContactForm />
        </motion.section>
      </div>
    </motion.div>
  );
}
