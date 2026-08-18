import {getTranslations} from "next-intl/server";
import {PageHeader, type BreadcrumbItem} from "@/components/layout/PageHeader";
import ProductCard from "@/components/sections/products/ProductCard";
import type {Locale} from "@/i18n/routing";
import {
  getProductCategories,
  getProducts,
  getProductSubcategories,
  type Product,
  type ProductSubcategory,
} from "@/lib/api/products";

const labels = {
  en: {
    fallbackTitle: "Subcategory Products",
    fallbackSubcategory: "Subcategory",
    empty: "There are no products in this subcategory yet.",
    descriptionSuffix: "products and models.",
  },
  tr: {
    fallbackTitle: "Alt Kategori Ürünleri",
    fallbackSubcategory: "Alt Kategori",
    empty: "Bu alt kategoride henüz ürün bulunmuyor.",
    descriptionSuffix: "alt kategorisindeki ürünleri ve modelleri inceleyin.",
  },
  ar: {
    fallbackTitle: "منتجات الفئة الفرعية",
    fallbackSubcategory: "فئة فرعية",
    empty: "لا توجد منتجات في هذه الفئة الفرعية بعد.",
    descriptionSuffix: "المنتجات والنماذج.",
  },
} satisfies Record<
  Locale,
  {
    fallbackTitle: string;
    fallbackSubcategory: string;
    empty: string;
    descriptionSuffix: string;
  }
>;

function matchesSubcategory(product: Product, subcategory: ProductSubcategory, subcategorySlug: string) {
  return (
    product.subcategoryId === subcategory.id ||
    product.subcategory?.id === subcategory.id ||
    product.subcategory?.slug === subcategory.slug ||
    product.subcategory?.slug === subcategorySlug ||
    product.subcategory?.name === subcategory.name
  );
}

function findCategory(
  categories: Awaited<ReturnType<typeof getProductCategories>>,
  slug: string,
) {
  return categories.find((category) => category.slug === slug || category.id === slug);
}

function findSubcategory(subcategories: ProductSubcategory[], subcategorySlug: string) {
  return subcategories.find((subcategory) => {
    return subcategory.slug === subcategorySlug || subcategory.id === subcategorySlug;
  });
}

export default async function ProductSubcategoryPage({
  params,
}: {
  params: Promise<{locale: string; slug: string; subcategorySlug: string}>;
}) {
  const {locale: rawLocale, slug, subcategorySlug} = await params;
  const locale = rawLocale as Locale;
  const navT = await getTranslations({locale, namespace: "nav"});
  const [allProducts, categories, subcategories] = await Promise.all([
    getProducts(locale),
    getProductCategories(locale),
    getProductSubcategories(slug, locale),
  ]);
  const currentCategory = findCategory(categories, slug);
  const currentSubcategory = findSubcategory(subcategories, subcategorySlug);
  const subcategoryProducts = currentSubcategory
    ? allProducts.filter((product) => matchesSubcategory(product, currentSubcategory, subcategorySlug))
    : [];
  const title = currentSubcategory?.name || labels[locale].fallbackTitle;
  const breadcrumbs: BreadcrumbItem[] = [
    {label: navT("home"), href: "/"},
    {label: navT("products"), href: "/products"},
    ...(currentCategory
      ? [
          {
            label: currentCategory.name,
            href: `/products/category/${currentCategory.slug}`,
          },
        ]
      : []),
    {label: currentSubcategory?.name || labels[locale].fallbackSubcategory},
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <PageHeader
        locale={locale}
        title={title}
        description={`${title} ${labels[locale].descriptionSuffix}`}
        breadcrumbs={breadcrumbs}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {subcategoryProducts.length === 0 ? (
          <div className="rounded-lg border border-gray-100 bg-white px-6 py-12 text-center text-lg text-gray-500 shadow-sm">
            {labels[locale].empty}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {subcategoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
