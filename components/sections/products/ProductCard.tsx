import Link from 'next/link';
import { Product } from '@/lib/api/products';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <Link href={`/${locale}/products/${product.slug}`} className="block group">
      {/* Kartın Dış Çerçevesi - 8px radius (rounded-lg) ve hafif gölge */}
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
        
        {/* Görsel Alanı */}
        <div className="aspect-[4/3] bg-gray-50 p-4 flex items-center justify-center overflow-hidden">

          <img 
            src={product.image} 
            alt={product.title} 
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Metin ve Bilgi Alanı */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Tasarımdaki "SERIES A", "STAINLESS" gibi üst başlık */}
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            {product.series}
          </span>
          
          {/* Ürün Adı - Koyu lacivert tonu (text-slate-900) */}
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {product.title}
          </h3>
          
          {/* Ürün Açıklaması */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>
        
      </div>
    </Link>
  );
}