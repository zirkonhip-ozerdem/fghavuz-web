import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    name: string;
    slug: string;
    image: string;
  };
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <Link 
      href={`/${locale}/products/${product.slug}`} 
      className="group flex flex-col items-center text-center p-2 rounded-lg hover:bg-slate-50 transition-colors"
    >
      <div className="relative w-full aspect-square mb-4 overflow-hidden bg-white flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
        />
      </div>
      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
        {product.name}
      </h3>
    </Link>
  );
}