import {ArrowRight} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {PageHeader} from "@/components/layout/PageHeader";
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
    fallbackTitle: "Category Products",
    fallbackCategory: "Category",
    empty: "There are no products in this category yet.",
    emptySubcategory: "There are no products in this subcategory yet.",
    descriptionSuffix: "models and sub-products.",
    defaultGroup: "Models",
    subcategoriesTitle: "Subcategories",
    productsTitle: "Products",
    viewSubcategory: "View products",
  },
  tr: {
    fallbackTitle: "Kategori Ürünleri",
    fallbackCategory: "Kategori",
    empty: "Bu kategoride henüz ürün bulunmuyor.",
    emptySubcategory: "Bu alt kategoride henüz ürün bulunmuyor.",
    descriptionSuffix: "kategorisindeki modellerimizi ve alt ürünlerimizi inceleyin.",
    defaultGroup: "Modeller",
    subcategoriesTitle: "Alt Kategoriler",
    productsTitle: "Ürünler",
    viewSubcategory: "Ürünleri Gör",
  },
  ar: {
    fallbackTitle: "منتجات الفئة",
    fallbackCategory: "فئة",
    empty: "لا توجد منتجات في هذه الفئة بعد.",
    emptySubcategory: "لا توجد منتجات في هذه الفئة الفرعية بعد.",
    descriptionSuffix: "النماذج والمنتجات الفرعية.",
    defaultGroup: "النماذج",
    subcategoriesTitle: "الفئات الفرعية",
    productsTitle: "المنتجات",
    viewSubcategory: "عرض المنتجات",
  },
} satisfies Record<
  Locale,
  {
    fallbackTitle: string;
    fallbackCategory: string;
    empty: string;
    emptySubcategory: string;
    descriptionSuffix: string;
    defaultGroup: string;
    subcategoriesTitle: string;
    productsTitle: string;
    viewSubcategory: string;
  }
>;

function sectionId(value: string) {
  return `subcategory-${value
    .toLocaleLowerCase("tr")
    .replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ]+/gi, "-")
    .replace(/^-+|-+$/g, "")}`;
}

function groupProducts(
  products: Product[],
  fallbackGroup: string,
  subcategories: ProductSubcategory[],
) {
  return products.reduce<Record<string, Product[]>>((groups, product) => {
    const matchedSubcategory = subcategories.find((subcategory) => {
      return (
        subcategory.id === product.subcategoryId ||
        subcategory.id === product.subcategory?.id ||
        subcategory.slug === product.subcategory?.slug ||
        subcategory.name === product.subcategory?.name
      );
    });
    const groupName = matchedSubcategory?.name || product.subcategory?.name || fallbackGroup;
    groups[groupName] ??= [];
    groups[groupName].push(product);
    return groups;
  }, {});
}

function findCategory(
  categories: Awaited<ReturnType<typeof getProductCategories>>,
  slug: string,
) {
  return categories.find((category) => category.slug === slug || category.id === slug);
}

function productBelongsToCategory(
  product: Product,
  category: ReturnType<typeof findCategory>,
  slug: string,
) {
  return (
    product.category?.slug === slug ||
    product.category?.id === category?.id ||
    product.categoryId === category?.id ||
    product.categoryId === slug
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale: rawLocale, slug} = await params;
  const locale = rawLocale as Locale;
  const navT = await getTranslations({locale, namespace: "nav"});
  const [allProducts, categories, subcategories] = await Promise.all([
    getProducts(locale),
    getProductCategories(locale),
    getProductSubcategories(slug, locale),
  ]);
  const currentCategory = findCategory(categories, slug);
  const categoryProducts = allProducts.filter((product) => {
    return productBelongsToCategory(product, currentCategory, slug);
  });
  const groupedProducts = groupProducts(
    categoryProducts,
    labels[locale].defaultGroup,
    subcategories,
  );
  const title = currentCategory?.name || labels[locale].fallbackTitle;

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <PageHeader
        locale={locale}
        title={title}
        description={`${title} ${labels[locale].descriptionSuffix}`}
        breadcrumbs={[
          {label: navT("home"), href: "/"},
          {label: navT("products"), href: "/products"},
          {label: currentCategory?.name || labels[locale].fallbackCategory},
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {subcategories.length > 0 ? (
          <div>
            <h2 className="text-3xl font-black tracking-normal text-ink">
              {labels[locale].subcategoriesTitle}
            </h2>
            <div className="mt-7 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {subcategories.map((subcategory) => {
                return (
                  <Link
                    key={subcategory.id || subcategory.slug || subcategory.name}
                    href={`/products/category/${slug}/${subcategory.slug || subcategory.id}`}
                    locale={locale}
                    className="group flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative flex h-72 w-full items-center justify-center border-b border-gray-50 bg-white p-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={subcategory.image || currentCategory?.image || "/assets/category-other-products.png"}
                        alt={subcategory.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                          {subcategory.name}
                        </h2>
                        {subcategory.description ? (
                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                            {subcategory.description}
                          </p>
                        ) : null}
                      </div>
                      <div className="mt-6 flex items-center font-semibold text-blue-600">
                        <span>{labels[locale].viewSubcategory}</span>
                        <ArrowRight className="ms-2 size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : categoryProducts.length === 0 ? (
          <div className="rounded-lg border border-gray-100 bg-white px-6 py-12 text-center text-lg text-gray-500 shadow-sm">
            {labels[locale].empty}
          </div>
        ) : (
          <div>
            {Object.entries(groupedProducts).map(([groupName, products]) => (
              <div
                key={groupName}
                id={sectionId(groupName)}
                className="mb-16 rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-8 flex items-center">
                  <h2 className="inline-block border-b-4 border-blue-600 pb-2 text-2xl font-bold text-gray-800">
                    {labels[locale].productsTitle}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} locale={locale} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
