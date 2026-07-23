import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import {getFeaturedCategories} from "@/lib/api/catalog";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "sections"});
  const categories = await getFeaturedCategories();

  return (
    <main>
      <section className="relative overflow-hidden bg-neutral-soft pt-36">
        <div className="absolute inset-x-0 top-0 h-36 bg-white" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_0.84fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
              FGPOOL
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-none tracking-normal text-ink sm:text-7xl">
              {t("productsTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink/62">
              {t("productsText")}
            </p>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-lg bg-ink">
            <Image
              src="/assets/hero-pool.jpeg"
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover opacity-88"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products/${category.slug}`}
              locale={locale}
              className="rounded-lg border border-ink/8 bg-neutral-soft p-4 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_44px_rgba(17,17,20,0.09)]"
            >
              <div className="relative aspect-[1.2] overflow-hidden rounded-md bg-white">
                <Image
                  src={category.image}
                  alt={category.name[locale]}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-5 text-xl font-black text-ink">
                {category.name[locale]}
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink/58">
                {category.description[locale]}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
