import {ProductCard, type ProductCardItem} from "@/components/ui/ProductCard";
import type {Locale} from "@/i18n/routing";

export function ProductGrid({
  locale,
  items,
}: {
  locale: Locale;
  items: ProductCardItem[];
}) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} locale={locale} />
        ))}
      </div>
    </div>
  );
}
