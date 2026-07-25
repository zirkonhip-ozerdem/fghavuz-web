import { getProductBySlug } from '@/lib/api/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
       
        <div className="mb-8">
          <Link href={`/${locale}/products`} className="text-slate-600 hover:text-red-500 transition-colors font-medium flex items-center gap-2">
            &larr; Ürünlere Dön
          </Link>
        </div>

        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row mb-12">
          
          <div className="bg-gray-50 p-8 flex items-center justify-center w-full md:w-1/2">
            <img 
              src={product.image} 
              alt={product.title} 
              className="object-contain w-full h-full max-h-[400px]"
            />
          </div>

          <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {product.series}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {product.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              {product.description}
            </p>

            
            <div className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Özellikler</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="text-red-500 font-bold mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <Link href={`/${locale}/quote`} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded transition-colors duration-300 text-center inline-block w-full sm:w-auto">
                Teklif Al
              </Link>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-gray-100 pb-4">Teknik Dokümanlar ve Şemalar</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
           
            <a href="#" className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-500 hover:shadow-md transition-all group">
              <span className="text-4xl mb-3 text-slate-700 group-hover:text-red-500 transition-colors">📄</span>
              <span className="font-semibold text-slate-900 text-center">Kullanım Kılavuzu</span>
              <span className="text-xs text-gray-500 mt-2">PDF İndir</span>
            </a>

            
            <a href="#" className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-500 hover:shadow-md transition-all group">
              <span className="text-4xl mb-3 text-slate-700 group-hover:text-red-500 transition-colors">⚙️</span>
              <span className="font-semibold text-slate-900 text-center">Montaj Şeması</span>
              <span className="text-xs text-gray-500 mt-2">PDF İndir</span>
            </a>

            
            <a href="#" className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-500 hover:shadow-md transition-all group">
              <span className="text-4xl mb-3 text-slate-700 group-hover:text-red-500 transition-colors">📊</span>
              <span className="font-semibold text-slate-900 text-center">Datasheet</span>
              <span className="text-xs text-gray-500 mt-2">PDF İndir</span>
            </a>
            
            
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-4xl mb-3 text-slate-700">📐</span>
              <span className="font-semibold text-slate-900 text-center">Teknik Görseller</span>
              <span className="text-xs text-gray-500 mt-2">Görsel Bekleniyor</span>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}