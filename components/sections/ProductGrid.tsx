import { ProductCard } from "@/components/ui/ProductCard";
import { catalogProducts } from "@/data/products";

export function ProductGrid({ locale }: { locale: string }) {
  return (
    <div className="container mx-auto px-4 max-w-[1400px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
        {catalogProducts.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </div>
  );
}