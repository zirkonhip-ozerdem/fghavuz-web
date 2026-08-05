import {ArrowRight, CheckCircle2} from "lucide-react";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import {getFeaturedCategories} from "@/lib/api/catalog";

export async function generateStaticParams() {
  const categories = await getFeaturedCategories();

  return ["en", "tr", "ar"].flatMap((locale) =>
    categories.map((category) => ({locale, slug: category.slug})),
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale: rawLocale, slug} = await params;
  const locale = rawLocale as Locale;
  const categories = await getFeaturedCategories();
  const product = categories.find((category) => category.slug === slug) ?? categories[0];
  const related = categories.filter((category) => category.id !== product.id).slice(0, 3);

  return (
    <main className="bg-white pt-32">
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="relative aspect-[1.05] overflow-hidden rounded-lg bg-neutral-soft">
          <Image
            src={product.image}
            alt={product.name[locale]}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
            {product.kicker[locale]}
          </p>
          <h1 className="mt-4 text-5xl font-black leading-none tracking-normal text-ink sm:text-7xl">
            {product.name[locale]}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-ink/62">
            {product.description[locale]} Designed for wholesale supply, fast installation and long-term pool chemistry resistance.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["UV-stable ABS body", "Modular sizing", "Commercial flow capacity", "Export-ready packing"].map((item) => (
              <p key={item} className="flex items-center gap-2 text-sm font-semibold text-ink/72">
                <CheckCircle2 className="size-4 text-accent" aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>
          <Link
            href="/quote"
            locale={locale}
            className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-white"
          >
            Request Quote
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-neutral-soft py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-3xl font-black text-ink">Related systems</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                locale={locale}
                className="rounded-lg border border-ink/8 bg-white p-5"
              >
                <h3 className="text-lg font-black text-ink">{category.name[locale]}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/58">
                  {category.description[locale]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
