export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      <div className="bg-gradient-to-b from-white to-gray-50 pt-24 pb-16 mb-6 text-center">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">İletişim ve Destek</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Küresel projeleriniz ve toptan ürün tedariği için profesyonel ekibimizle iletişime geçin. Boyut eşitliği olmadan özgürlüğünüz olur.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          <div className="lg:col-span-1 flex flex-col gap-5 h-full">
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Merkez Ofis</h3>
              <p className="text-gray-600 mb-2 text-sm"><strong>Adres:</strong> 6172 Sokak No: 14F İç Kapı No: 11 Bornova / İzmir</p>
              <p className="text-gray-600 mb-2 text-sm"><strong>Telefon:</strong> +90 (242) 555 01 23</p>
              <p className="text-gray-600 text-sm"><strong>E-posta:</strong> info@fgpool.com</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Satış & B2B Desteği</h3>
              <p className="text-gray-600 mb-2 text-sm"><strong>Küresel Satış:</strong> sales@fgpool.com</p>
              <p className="text-gray-600 text-sm"><strong>Teknik Destek:</strong> support@fgpool.com</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex-1 min-h-[220px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.1052601955173!2d27.2372439!3d38.4390638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b962cd679267bd%3A0xc665cb55294e50d!2sBornova%2C%20%C4%B0zmir!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
                className="w-full h-full"
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            
          </div>

          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Bize Mesaj Gönderin</h2>
            
            <form className="flex flex-col flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Adınız Soyadınız</label>
                  <input type="text" id="name" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder="Örn: Cansel Yılmaz" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresiniz</label>
                  <input type="email" id="email" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder="ornek@sirket.com" />
                </div>
              </div>

              <div className="flex flex-col flex-1 mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mesajınız</label>
                <textarea id="message" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none flex-1" placeholder="Lütfen mesajınızı buraya yazın..."></textarea>
              </div>

              <div className="mt-auto">
                <button type="button" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded transition-colors duration-300 w-full sm:w-auto">
                  Mesajı Gönder
                </button>
              </div>
            </form>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}