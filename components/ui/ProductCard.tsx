import Image from "next/image";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

export interface ProductCardItem {
  id: string;
  name: string;
  image: string;
  href: string;
}

export function ProductCard({
  item,
  locale,
}: {
  item: ProductCardItem;
  locale: Locale;
}) {
  return (
    <Link
      href={item.href}
      locale={locale}
      className="group flex flex-col items-center rounded-lg p-2 text-center transition-colors hover:bg-slate-50"
    >
      <div className="relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden bg-white">
        <Image
          src={item.image}
          alt={item.name}
          fill
          unoptimized
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
        />
      </div>
      <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
        {item.name}
      </h3>
    </Link>
  );
}
