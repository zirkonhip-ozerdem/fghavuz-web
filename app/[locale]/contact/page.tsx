export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">İletişim ve Destek</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Küresel projeleriniz ve toptan ürün tedariği için profesyonel ekibimizle iletişime geçin. Size yardımcı olmaktan memnuniyet duyarız.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-1 space-y-6">
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Merkez Ofis</h3>
              <p className="text-gray-600 mb-2"><strong>Adres:</strong> 6172 Sokak No: 14F İç Kapı No: 11 Bornova / İzmir </p>
              <p className="text-gray-600 mb-2"><strong>Telefon:</strong> +90 (242) 555 01 23</p>
              <p className="text-gray-600"><strong>E-posta:</strong> info@fgpool.com</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Satış & B2B Destek</h3>
              <p className="text-gray-600 mb-2"><strong>Global Satış:</strong> sales@fgpool.com</p>
              <p className="text-gray-600"><strong>Teknik Destek:</strong> support@fgpool.com</p>
            </div>
            
          </div>

          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Bize Mesaj Gönderin</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Adınız Soyadınız</label>
                  <input type="text" id="name" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder="Örn: Cansel Yılmaz Cantürk" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresiniz</label>
                  <input type="email" id="email" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder="ornek@sirket.com" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Konu</label>
                <input type="text" id="subject" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder="Hangi konuda yardımcı olabiliriz?" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mesajınız</label>
                <textarea id="message" rows={5} className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none" placeholder="Lütfen mesajınızı buraya yazın..."></textarea>
              </div>

              <button type="button" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded transition-colors duration-300">
                Mesajı Gönder
              </button>
            </form>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}