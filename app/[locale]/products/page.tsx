import { getProducts } from '@/lib/api/products';
import ProductCard from '@/components/sections/products/ProductCard';

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  
  const { locale } = await params;
  
  
  const products = await getProducts(locale);

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Ürünlerimiz</h1>
          <p className="text-gray-600 max-w-2xl">
            Toptan dağıtım ve dünya standartlarında su mimarisi için özel olarak geliştirilmiş yüksek performanslı tesviye, drenaj ve yapısal sistemlerimizi keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
        
      </div>
    </div>
  );
}