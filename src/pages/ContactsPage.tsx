import ContactForm from '../components/ContactForm';

export default function ContactsPage() {
  return (
    <div className="pt-24 pb-20 px-6 bg-branco-quente min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif mb-12 text-center text-verde-escuro">Contacte-nos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif mb-6 text-verde-sec">Informações de Contacto</h2>
            <div className="space-y-4 text-texto-main/80">
              <p><strong>Parque de Campismo Ria Formosa, Lda.</strong></p>
              <p>Quinta da Gomeira – Cabanas de Tavira<br/>8800-058 Cabanas Tavira</p>
              <p>Telefone: +351 281 328 887</p>
              <p>E-mail: info@campingriaformosa.com</p>
              <p>Latitude: 37º 08’ 42.24 N<br/>Longitude: 07º 36’ 08.03 W</p>
            </div>
            <div className="mt-8">
                <h3 className="font-bold mb-2">Localização</h3>
                <div className="h-64 rounded overflow-hidden shadow-sm border border-gray-100">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3180.351306603321!2d-7.60361772371803!3d37.14434534822408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd101ca61f785e41%3A0xd66f79b66143e8ce!2sParque%20de%20Campismo%20Ria%20Formosa!5e0!3m2!1spt-PT!2spt!4v1793984564399!5m2!1spt-PT!2spt" width="100%" height="100%" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
