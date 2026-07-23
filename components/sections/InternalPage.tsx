import {ArrowRight, Download, Mail, PackageCheck} from "lucide-react";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import type {ProductCategory} from "@/lib/api/catalog";

type PageKind = "corporate" | "products" | "catalog" | "blog" | "quote" | "contact";

const titleKeys = {
  corporate: "corporateTitle",
  products: "productsTitle",
  catalog: "catalogTitle",
  blog: "blogTitle",
  quote: "quoteTitle",
  contact: "contactTitle",
} as const;

const textKeys = {
  corporate: "corporateText",
  products: "productsText",
  catalog: "catalogText",
  blog: "blogText",
  quote: "quoteText",
  contact: "contactText",
} as const;

export async function InternalHero({
  locale,
  kind,
}: {
  locale: Locale;
  kind: PageKind;
}) {
  const t = await getTranslations("sections");

  return (
    <section className="relative overflow-hidden bg-neutral-soft pt-36">
      <div className="absolute inset-x-0 top-0 h-36 bg-white" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_0.84fr] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
            FGPOOL
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-none tracking-normal text-ink sm:text-7xl">
            {t(titleKeys[kind])}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-ink/62">
            {t(textKeys[kind])}
          </p>
        </div>
        <div className="relative min-h-72 overflow-hidden rounded-lg bg-ink">
          <Image
            src={kind === "corporate" ? "/assets/factory-floor.jpeg" : "/assets/hero-pool.jpeg"}
            alt=""
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover opacity-88"
          />
        </div>
      </div>
    </section>
  );
}

export function ProductList({
  locale,
  categories,
}: {
  locale: Locale;
  categories: ProductCategory[];
}) {
  return (
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
  );
}

export function CorporateBody() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-3">
        {[
          ["50,000 ft²", "Injection molding, machining and packing under one quality routine."],
          ["40 Countries", "Wholesale-ready logistics documentation for export projects."],
          ["ISO Ready", "Batch tracking, dimensional checks and material controls."],
        ].map(([title, text]) => (
          <article key={title} className="rounded-lg border border-ink/8 bg-neutral-soft p-7">
            <PackageCheck className="size-8 text-accent" aria-hidden="true" />
            <h2 className="mt-6 text-3xl font-black text-ink">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/58">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CatalogBody({locale}: {locale: Locale}) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-5xl gap-5 px-5 sm:px-8 md:grid-cols-2">
        {["Complete Product Catalog", "Technical Drainage Sheets"].map((title) => (
          <article key={title} className="rounded-lg border border-ink/8 bg-neutral-soft p-7">
            <Download className="size-8 text-accent" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-black text-ink">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/58">
              PDF preview and download placeholder for the future Laravel media API.
            </p>
            <Link
              href="/quote"
              locale={locale}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent"
            >
              Request catalog
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BlogBody({locale}: {locale: Locale}) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-8 md:grid-cols-3">
        {[
          "Selecting overflow grating for hospitality pools",
          "Drainage capacity notes for aquatic centers",
          "Export packaging checklist for distributors",
        ].map((title) => (
          <article key={title} className="rounded-lg border border-ink/8 bg-neutral-soft p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
              Engineering
            </p>
            <h2 className="mt-4 text-xl font-black leading-tight text-ink">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/58">
              Practical guidance prepared for procurement and project teams.
            </p>
            <Link
              href="/blog"
              locale={locale}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              Read article
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function QuoteBody() {
  return (
    <section className="bg-white py-16">
      <form className="mx-auto grid max-w-4xl gap-5 px-5 sm:px-8 md:grid-cols-2">
        {["Company", "Email", "Product / category", "Estimated quantity"].map((label) => (
          <label key={label} className="text-sm font-bold text-ink">
            {label}
            <input
              className="mt-2 h-12 w-full rounded-md border border-ink/12 bg-neutral-soft px-4 font-medium outline-none transition focus:border-primary"
              placeholder={label}
            />
          </label>
        ))}
        <label className="text-sm font-bold text-ink md:col-span-2">
          Project notes
          <textarea
            className="mt-2 min-h-32 w-full rounded-md border border-ink/12 bg-neutral-soft px-4 py-3 font-medium outline-none transition focus:border-primary"
            placeholder="Pool type, country, target delivery date"
          />
        </label>
        <button className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-bold text-white md:w-fit">
          Send request
        </button>
      </form>
    </section>
  );
}

export function ContactBody() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-8 md:grid-cols-3">
        {[
          ["Sales", "sales@fgpool.com"],
          ["Support", "support@fgpool.com"],
          ["Factory", "Istanbul Industrial Zone"],
        ].map(([title, text]) => (
          <article key={title} className="rounded-lg border border-ink/8 bg-neutral-soft p-7">
            <Mail className="size-8 text-accent" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-black text-ink">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/58">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
