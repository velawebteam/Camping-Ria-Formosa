import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Informações Gerais');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Por favor, preencha o nome, e-mail e mensagem.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Por favor, indique um endereço de e-mail válido.');
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-12 px-6 text-center space-y-5">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h3 className="text-2xl font-serif text-principal font-bold">Mensagem Enviada</h3>
          <p className="text-sm text-texto-main/70 font-light leading-relaxed">
            Obrigado pelo seu contacto, <strong className="text-principal">{name}</strong>. A
            nossa receção responderá para <strong className="text-principal">{email}</strong> com
            a maior brevidade possível.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName('');
            setEmail('');
            setMessage('');
          }}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-principal/20 text-xs font-bold uppercase tracking-widest text-principal hover:bg-principal hover:text-white transition-colors cursor-pointer"
        >
          Enviar Nova Mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="block text-[10px] font-black uppercase tracking-widest text-principal/45 ml-1"
          >
            Nome Completo
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full min-h-[46px] bg-branco-quente/60 border-0 border-b-2 border-gray-100 rounded-t-2xl px-4 py-3.5 text-base md:text-sm text-principal placeholder:text-texto-main/35 focus:outline-none focus:border-secundaria transition-all"
            placeholder="O seu nome"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="block text-[10px] font-black uppercase tracking-widest text-principal/45 ml-1"
          >
            E-mail
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full min-h-[46px] bg-branco-quente/60 border-0 border-b-2 border-gray-100 rounded-t-2xl px-4 py-3.5 text-base md:text-sm text-principal placeholder:text-texto-main/35 focus:outline-none focus:border-secundaria transition-all"
            placeholder="nome@exemplo.pt"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-subject"
          className="block text-[10px] font-black uppercase tracking-widest text-principal/45 ml-1"
        >
          Assunto
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full min-h-[46px] bg-branco-quente/60 border-0 border-b-2 border-gray-100 rounded-t-2xl px-4 py-3.5 text-base md:text-sm text-principal focus:outline-none focus:border-secundaria transition-all cursor-pointer"
        >
          <option value="Informações Gerais">Informações Gerais</option>
          <option value="Estadias de Inverno">Estadias de Inverno (01/10 a 31/05)</option>
          <option value="Grupos & Autocaravanas">Grupos e Autocaravanas</option>
          <option value="Mobile Homes">Mobile Homes e Lotes</option>
          <option value="Outros Assuntos">Outros Assuntos</option>
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-message"
          className="block text-[10px] font-black uppercase tracking-widest text-principal/45 ml-1"
        >
          Mensagem
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="w-full bg-branco-quente/60 border-0 border-b-2 border-gray-100 rounded-t-2xl px-4 py-3.5 text-base md:text-sm text-principal placeholder:text-texto-main/35 focus:outline-none focus:border-secundaria transition-all resize-y"
          placeholder="Como podemos ajudar a planear a sua estadia?"
        />
      </div>

      {error && (
        <p className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      <div className="pt-2 flex justify-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-3 bg-principal text-white min-h-[48px] px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-secundaria hover:text-principal transition-all duration-300 shadow-lg w-full sm:w-auto cursor-pointer"
        >
          <Send className="w-4 h-4" />
          Enviar Mensagem
        </button>
      </div>
    </form>
  );
}
