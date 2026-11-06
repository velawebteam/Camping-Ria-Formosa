export default function ContactForm() {
  return (
    <form className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Nome</label>
          <input type="text" className="w-full border rounded p-3" placeholder="O seu nome" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">E-mail</label>
          <input type="email" className="w-full border rounded p-3" placeholder="O seu e-mail" />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Assunto</label>
        <input type="text" className="w-full border rounded p-3" placeholder="Assunto" />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Mensagem</label>
        <textarea className="w-full border rounded p-3 h-32" placeholder="Escreva a sua mensagem"></textarea>
      </div>
      <button className="bg-verde-escuro text-white px-8 py-3 rounded font-bold hover:bg-verde-sec transition w-full md:w-auto">
        ENVIAR MENSAGEM
      </button>
    </form>
  );
}
