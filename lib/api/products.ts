import type {Locale} from "@/i18n/routing";
import {apiGet} from "./client";

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  cover_image?: string;
  image: string;
  subcategories?: ProductSubcategory[];
}

export interface ProductSubcategory {
  id?: string;
  categoryId?: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  categoryId?: string;
  subcategoryId?: string;
  title: string;
  slug: string;
  short_description?: string;
  description: string;
  cover_image?: string;
  category?: ProductCategory;
  subcategory?: ProductSubcategory;
  image: string;
  galleryImages: string[];
  documents?: ProductDocument[];
  series: string;
  features: string[];
  featured?: boolean;
}

export interface ProductDocument {
  id: string;
  title: string;
  description?: string;
  href: string;
  previewUrl?: string;
  format: "PDF" | "DOC" | "XLS" | "FILE";
  size?: string;
}

type RawProductCategory = {
  id: number | string;
  name: string;
  slug?: string | null;
  slug_tr?: string | null;
  slug_en?: string | null;
  slug_ar?: string | null;
  slugs?: unknown;
  description?: string | null;
  cover_image?: string | null;
  image?: string | null;
  subcategories?: RawProductSubcategory[] | null;
  product_subcategories?: RawProductSubcategory[] | null;
};

type RawProductSubcategory = {
  id: number | string;
  product_category_id?: number | string | null;
  category_id?: number | string | null;
  name: string;
  slug?: string | null;
  slug_tr?: string | null;
  slug_en?: string | null;
  slug_ar?: string | null;
  slugs?: unknown;
  description?: string | null;
  image?: string | null;
  cover_image?: string | null;
};

type RawProduct = {
  id: number | string;
  product_category_id?: number | string | null;
  product_subcategory_id?: number | string | null;
  category_id?: number | string | null;
  categoryId?: number | string | null;
  title?: string | null;
  name?: string | null;
  slug?: string | null;
  slug_tr?: string | null;
  slug_en?: string | null;
  slug_ar?: string | null;
  slugs?: unknown;
  short_description?: string | null;
  description?: string | null;
  cover_image?: string | null;
  image?: string | null;
  galleryImages?: unknown;
  gallery_images?: unknown;
  images?: unknown;
  documents?: unknown;
  technical_documents?: unknown;
  files?: unknown;
  media?: unknown;
  series?: string | null;
  features?: unknown;
  is_featured?: boolean | number | null;
  featured?: boolean | number | null;
  category?: RawProductCategory | null;
  product_category?: RawProductCategory | null;
  subcategory?: RawProductSubcategory | null;
  product_subcategory?: RawProductSubcategory | null;
};

type RawProductDocument = {
  id?: number | string | null;
  title?: string | null;
  name?: string | null;
  file_name?: string | null;
  description?: string | null;
  url?: string | null;
  href?: string | null;
  path?: string | null;
  file_url?: string | null;
  download_url?: string | null;
  original_url?: string | null;
  preview_url?: string | null;
  mime_type?: string | null;
  file_type?: string | null;
  extension?: string | null;
  size?: number | string | null;
  file_size?: number | string | null;
  collection_name?: string | null;
};

type ListPayload<T> = T[] | {items?: T[]; data?: T[]};
type FeaturedProductsPayload =
  | ListPayload<RawProduct>
  | {
      featured_products?: RawProduct[];
      products?: RawProduct[];
    };

const productImages = {
  pumps: "/assets/category-pool-pumps.png",
  filters: "/assets/category-sand-filters.png",
  lights: "/assets/category-pool-lights.png",
  edge: "/assets/category-pool-edge.png",
  cleaning: "/assets/category-cleaning-equipment.png",
  disinfection: "/assets/category-disinfection.png",
  chemicals: "/assets/category-pool-chemicals.png",
  other: "/assets/category-other-products.png",
};

const fallbackCategoryImages: Record<string, string> = {
  "pool-pumps": productImages.pumps,
  "sand-filters": productImages.filters,
  "pool-lights": productImages.lights,
  "pool-edge-equipment": productImages.edge,
  "havuz-ici-ve-kenar-ekipmanlari": productImages.edge,
  "cleaning-equipment": productImages.cleaning,
  "pool-cleaning-equipment": productImages.cleaning,
  "havuz-ici-temizlik-ekipmanlari": productImages.cleaning,
  "disinfection-systems": productImages.disinfection,
  "dezenfeksiyon-sistemleri": productImages.disinfection,
  "pool-chemicals": productImages.chemicals,
  "havuz-kimyasallari": productImages.chemicals,
  "other-products": productImages.other,
  "diger-urunler": productImages.other,
  "havuz-pompalari": productImages.pumps,
  "kum-filtreleri": productImages.filters,
  "havuz-ici-aydinlatmalar": productImages.lights,
};

const backendOrigin =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v\d+\/?$/, "") ||
  "http://localhost:8000";

function gallery(image: string) {
  return [image, image, image, image];
}

const localizedProducts: Record<Locale, Product[]> = {
  en: [
    {id: "p1", categoryId: "pool-pumps", title: "Pool Pumps", slug: "pool-pumps", description: "Circulation pump systems for residential, commercial and project-scale pools.", image: productImages.pumps, galleryImages: gallery(productImages.pumps), series: "CIRCULATION", features: ["High flow performance", "Quiet operation", "Project-ready capacity"]},
    {id: "p2", categoryId: "sand-filters", title: "Sand Filters", slug: "sand-filters", description: "Durable filtration systems designed for clear water quality and easy maintenance.", image: productImages.filters, galleryImages: gallery(productImages.filters), series: "FILTRATION", features: ["Reliable filtration", "Easy service access", "Commercial durability"]},
    {id: "p3", categoryId: "pool-lights", title: "Pool Lights", slug: "pool-lights", description: "Underwater lighting products for safe, efficient and elegant pool illumination.", image: productImages.lights, galleryImages: gallery(productImages.lights), series: "LIGHTING", features: ["Efficient illumination", "Pool-safe housing", "Modern appearance"]},
    {id: "p4", categoryId: "pool-edge-equipment", title: "Pool Interior and Edge Equipment", slug: "pool-edge-equipment", description: "Overflow, edge and in-pool accessories prepared for complete pool applications.", image: productImages.edge, galleryImages: gallery(productImages.edge), series: "POOL EDGE", features: ["Modular systems", "Clean installation", "Project-compatible details"]},
    {id: "p5", categoryId: "pool-cleaning-equipment", title: "Pool Cleaning Equipment", slug: "pool-cleaning-equipment", description: "Cleaning accessories and maintenance equipment for daily pool operation.", image: productImages.cleaning, galleryImages: gallery(productImages.cleaning), series: "MAINTENANCE", features: ["Daily maintenance support", "Practical accessories", "Long service life"]},
    {id: "p6", categoryId: "disinfection-systems", title: "Disinfection Systems", slug: "disinfection-systems", description: "Dosing and water treatment systems for balanced, controlled pool hygiene.", image: productImages.disinfection, galleryImages: gallery(productImages.disinfection), series: "WATER TREATMENT", features: ["Controlled dosing", "Operational reliability", "Clear water support"]},
    {id: "p7", categoryId: "pool-chemicals", title: "Pool Chemicals", slug: "pool-chemicals", description: "Chemical product groups used for water balance, cleaning and protection.", image: productImages.chemicals, galleryImages: gallery(productImages.chemicals), series: "CHEMICALS", features: ["Water balance", "Cleaning support", "Professional use"]},
    {id: "p8", categoryId: "other-products", title: "Other Products", slug: "other-products", description: "Complementary equipment groups for pool rooms, installations and spare needs.", image: productImages.other, galleryImages: gallery(productImages.other), series: "AUXILIARY", features: ["Complementary range", "Installation support", "Flexible supply"]},
  ],
  tr: [
    {id: "p1", categoryId: "havuz-pompalari", title: "Havuz Pompaları", slug: "havuz-pompalari", description: "Konut, ticari ve proje ölçekli havuzlar için sirkülasyon pompa sistemleri.", image: productImages.pumps, galleryImages: gallery(productImages.pumps), series: "SIRKULASYON", features: ["Yüksek debi performansı", "Sessiz çalışma", "Projeye uygun kapasite"]},
    {id: "p2", categoryId: "kum-filtreleri", title: "Kum Filtreleri", slug: "kum-filtreleri", description: "Berrak su kalitesi ve kolay bakım için tasarlanmış dayanıklı filtreleme sistemleri.", image: productImages.filters, galleryImages: gallery(productImages.filters), series: "FILTRASYON", features: ["Güvenilir filtrasyon", "Kolay servis erişimi", "Ticari kullanım dayanımı"]},
    {id: "p3", categoryId: "havuz-ici-aydinlatmalar", title: "Havuz İçi Aydınlatmalar - Lambalar", slug: "havuz-ici-aydinlatmalar", description: "Güvenli, verimli ve şık havuz aydınlatması için su altı aydınlatma ürünleri.", image: productImages.lights, galleryImages: gallery(productImages.lights), series: "AYDINLATMA", features: ["Verimli aydınlatma", "Havuz kullanımına uygun gövde", "Modern görünüm"]},
    {id: "p4", categoryId: "havuz-ici-ve-kenar-ekipmanlari", title: "Havuz İçi ve Kenar Ekipmanları", slug: "havuz-ici-ve-kenar-ekipmanlari", description: "Tamamlayıcı havuz uygulamaları için taşma, kenar ve havuz içi ekipman grupları.", image: productImages.edge, galleryImages: gallery(productImages.edge), series: "HAVUZ KENARI", features: ["Modüler sistemler", "Temiz montaj detayı", "Projeye uyumlu çözümler"]},
    {id: "p5", categoryId: "havuz-ici-temizlik-ekipmanlari", title: "Havuz İçi Temizlik Ekipmanları", slug: "havuz-ici-temizlik-ekipmanlari", description: "Günlük havuz işletimi için temizlik aksesuarları ve bakım ekipmanları.", image: productImages.cleaning, galleryImages: gallery(productImages.cleaning), series: "BAKIM", features: ["Günlük bakım desteği", "Pratik aksesuarlar", "Uzun kullanım ömrü"]},
    {id: "p6", categoryId: "dezenfeksiyon-sistemleri", title: "Dezenfeksiyon Sistemleri", slug: "dezenfeksiyon-sistemleri", description: "Dengeli ve kontrollü havuz hijyeni için dozajlama ve su şartlandırma sistemleri.", image: productImages.disinfection, galleryImages: gallery(productImages.disinfection), series: "SU SARTLANDIRMA", features: ["Kontrollü dozajlama", "İşletme güvenilirliği", "Berrak su desteği"]},
    {id: "p7", categoryId: "havuz-kimyasallari", title: "Havuz Kimyasalları", slug: "havuz-kimyasallari", description: "Su dengesi, temizlik ve koruma süreçlerinde kullanılan kimyasal ürün grupları.", image: productImages.chemicals, galleryImages: gallery(productImages.chemicals), series: "KIMYASALLAR", features: ["Su dengesi", "Temizlik desteği", "Profesyonel kullanım"]},
    {id: "p8", categoryId: "diger-urunler", title: "Diğer Ürünler", slug: "diger-urunler", description: "Makine dairesi, montaj ve yedek ihtiyaçları için tamamlayıcı ekipman grupları.", image: productImages.other, galleryImages: gallery(productImages.other), series: "TAMAMLAYICI", features: ["Tamamlayıcı ürün gamı", "Montaj desteği", "Esnek tedarik"]},
  ],
  ar: [
    {id: "p1", categoryId: "pool-pumps", title: "مضخات المسابح", slug: "pool-pumps", description: "أنظمة مضخات دوران للمسابح السكنية والتجارية ومشاريع المسابح.", image: productImages.pumps, galleryImages: gallery(productImages.pumps), series: "الدوران", features: ["أداء تدفق عال", "تشغيل هادئ", "قدرة مناسبة للمشاريع"]},
    {id: "p2", categoryId: "sand-filters", title: "فلاتر الرمل", slug: "sand-filters", description: "أنظمة ترشيح متينة لجودة مياه صافية وصيانة سهلة.", image: productImages.filters, galleryImages: gallery(productImages.filters), series: "الترشيح", features: ["ترشيح موثوق", "وصول سهل للصيانة", "متانة تجارية"]},
    {id: "p3", categoryId: "pool-lights", title: "إضاءات ومصابيح داخلية للمسابح", slug: "pool-lights", description: "منتجات إضاءة تحت الماء لإضاءة آمنة وفعالة وأنيقة.", image: productImages.lights, galleryImages: gallery(productImages.lights), series: "الإضاءة", features: ["إضاءة فعالة", "هيكل آمن للمسبح", "مظهر حديث"]},
    {id: "p4", categoryId: "pool-edge-equipment", title: "معدات داخلية وحواف المسابح", slug: "pool-edge-equipment", description: "معدات فيضان وحواف وإكسسوارات داخلية لتطبيقات المسابح المتكاملة.", image: productImages.edge, galleryImages: gallery(productImages.edge), series: "حواف المسابح", features: ["أنظمة معيارية", "تفاصيل تركيب نظيفة", "حلول مناسبة للمشاريع"]},
    {id: "p5", categoryId: "pool-cleaning-equipment", title: "معدات تنظيف داخل المسابح", slug: "pool-cleaning-equipment", description: "إكسسوارات ومعدات صيانة لتنظيف وتشغيل المسابح اليومي.", image: productImages.cleaning, galleryImages: gallery(productImages.cleaning), series: "الصيانة", features: ["دعم الصيانة اليومية", "إكسسوارات عملية", "عمر استخدام طويل"]},
    {id: "p6", categoryId: "disinfection-systems", title: "أنظمة التعقيم", slug: "disinfection-systems", description: "أنظمة جرعات ومعالجة مياه لنظافة مسبح متوازنة ومضبوطة.", image: productImages.disinfection, galleryImages: gallery(productImages.disinfection), series: "معالجة المياه", features: ["جرعات مضبوطة", "اعتمادية تشغيلية", "دعم صفاء المياه"]},
    {id: "p7", categoryId: "pool-chemicals", title: "كيماويات المسابح", slug: "pool-chemicals", description: "مجموعات كيميائية لتوازن المياه والتنظيف والحماية.", image: productImages.chemicals, galleryImages: gallery(productImages.chemicals), series: "الكيماويات", features: ["توازن المياه", "دعم التنظيف", "استخدام احترافي"]},
    {id: "p8", categoryId: "other-products", title: "منتجات أخرى", slug: "other-products", description: "مجموعات معدات مكملة لغرف المعدات والتركيب واحتياجات القطع.", image: productImages.other, galleryImages: gallery(productImages.other), series: "مكملات", features: ["نطاق مكمل", "دعم التركيب", "توريد مرن"]},
  ],
};

function normalizeLocale(locale: string): Locale {
  return locale === "tr" || locale === "ar" || locale === "en" ? locale : "en";
}

function fallbackProducts(locale: string): Product[] {
  const normalizedLocale = normalizeLocale(locale);
  return localizedProducts[normalizedLocale] || localizedProducts.en;
}

function fallbackCategories(locale: string): ProductCategory[] {
  return fallbackProducts(locale).map((product) => ({
    id: product.categoryId ?? product.id,
    name: product.title,
    slug: product.categoryId ?? product.slug,
    description: product.description,
    image: product.image,
    cover_image: product.image,
  }));
}

function formatImageUrl(path?: string | null): string {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/assets")) return path;
  if (path.startsWith("/storage")) return `${backendOrigin}${path}`;
  return `${backendOrigin}/storage/${path.replace(/^\/+/, "")}`;
}

function pickLocalizedValue(value: unknown, locale: string): string {
  if (!value) return "";

  if (typeof value === "object") {
    const parsed = value as Partial<Record<Locale, string>>;
    return parsed[normalizeLocale(locale)] || parsed.tr || parsed.en || parsed.ar || "";
  }

  if (typeof value !== "string") {
    return String(value);
  }

  try {
    const parsed = JSON.parse(value) as Partial<Record<Locale, string>>;
    if (parsed && typeof parsed === "object") {
      return parsed[normalizeLocale(locale)] || parsed.tr || parsed.en || parsed.ar || value;
    }
  } catch {
    return value;
  }

  return value;
}

function pickLocalized(value: string | null | undefined, locale: string): string {
  return pickLocalizedValue(value, locale);
}

function slugify(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("tr")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function pickLocalizedSlug(
  item: {
    id?: number | string;
    slug?: string | null;
    slug_tr?: string | null;
    slug_en?: string | null;
    slug_ar?: string | null;
    slugs?: unknown;
  },
  locale: string,
  label?: string,
) {
  const normalizedLocale = normalizeLocale(locale);
  const directSlug = {
    en: item.slug_en,
    tr: item.slug_tr,
    ar: item.slug_ar,
  }[normalizedLocale];

  return (
    pickLocalizedValue(directSlug, locale) ||
    pickLocalizedValue(item.slugs, locale) ||
    (normalizedLocale === "tr" && label ? slugify(label) : "") ||
    pickLocalizedValue(item.slug, locale) ||
    (item.id ? String(item.id) : "")
  );
}

function unwrapList<T>(payload: ListPayload<T>): T[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.data)) return payload.data;
  return [];
}

function unwrapFeaturedProducts(payload: FeaturedProductsPayload): RawProduct[] {
  if (Array.isArray(payload)) return payload;
  if ("featured_products" in payload && Array.isArray(payload.featured_products)) {
    return payload.featured_products;
  }
  if ("products" in payload && Array.isArray(payload.products)) {
    return payload.products;
  }
  if ("items" in payload && Array.isArray(payload.items)) return payload.items;
  if ("data" in payload && Array.isArray(payload.data)) return payload.data;
  return [];
}

function normalizeStringList(value: unknown): string[] {
  if (typeof value === "string") {
    try {
      return normalizeStringList(JSON.parse(value));
    } catch {
      return value ? [value] : [];
    }
  }

  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object" && "value" in item) {
        return String(item.value);
      }
      if (item && typeof item === "object" && "name" in item) {
        return String(item.name);
      }
      return "";
    })
    .filter(Boolean);
}

function normalizeBoolean(value: boolean | number | null | undefined) {
  return value === true || value === 1;
}

function normalizeImageList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") return formatImageUrl(item);
      if (item && typeof item === "object" && "url" in item) {
        return formatImageUrl(String(item.url));
      }
      if (item && typeof item === "object" && "path" in item) {
        return formatImageUrl(String(item.path));
      }
      return "";
    })
    .filter(Boolean);
}

function extensionFromUrl(url: string) {
  const pathname = url.split("?")[0].split("#")[0];
  return pathname.includes(".") ? pathname.split(".").pop()?.toLowerCase() ?? "" : "";
}

function formatDocumentType(value: string): ProductDocument["format"] {
  const normalized = value.toLowerCase();
  if (normalized.includes("pdf")) return "PDF";
  if (normalized.includes("doc")) return "DOC";
  if (normalized.includes("xls") || normalized.includes("sheet")) return "XLS";
  return "FILE";
}

function formatDocumentSize(value?: number | string | null) {
  if (!value) return undefined;
  if (typeof value === "string") return value;

  const megabytes = value / (1024 * 1024);
  if (megabytes >= 1) return `${megabytes.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(value / 1024))} KB`;
}

function unwrapUnknownList(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object" && "data" in value) {
    const data = (value as {data?: unknown}).data;
    return Array.isArray(data) ? data : [];
  }
  return [];
}

function normalizeDocumentList(value: unknown, locale: string): ProductDocument[] {
  return unwrapUnknownList(value)
    .map((item, index): ProductDocument | undefined => {
      if (typeof item === "string") {
        const format = formatDocumentType(extensionFromUrl(item));
        const title = item.split("/").pop()?.split("?")[0] || `Document ${index + 1}`;

        return {
          id: `${title}-${index}`,
          title,
          href: formatImageUrl(item),
          previewUrl: format === "PDF" ? formatImageUrl(item) : undefined,
          format,
        };
      }

      if (!item || typeof item !== "object") return undefined;

      const raw = item as RawProductDocument;
      const href = formatImageUrl(
        raw.download_url ||
          raw.file_url ||
          raw.original_url ||
          raw.url ||
          raw.href ||
          raw.path,
      );

      if (!href) return undefined;

      const format = formatDocumentType(
        raw.mime_type ||
          raw.file_type ||
          raw.extension ||
          extensionFromUrl(href),
      );
      const title =
        pickLocalized(raw.title || raw.name || raw.file_name || "", locale) ||
        href.split("/").pop()?.split("?")[0] ||
        `Document ${index + 1}`;

      return {
        id: String(raw.id ?? `${title}-${index}`),
        title,
        description: pickLocalized(raw.description, locale),
        href,
        previewUrl: formatImageUrl(raw.preview_url) || (format === "PDF" ? href : undefined),
        format,
        size: formatDocumentSize(raw.file_size ?? raw.size),
      };
    })
    .filter((document): document is ProductDocument => document !== undefined);
}

function mapCategory(item: RawProductCategory, locale = "tr"): ProductCategory {
  const name = pickLocalized(item.name, locale);
  const slug = pickLocalizedSlug(item, locale, name);
  const image =
    formatImageUrl(item.cover_image || item.image) ||
    fallbackCategoryImages[slug] ||
    fallbackCategoryImages[pickLocalizedValue(item.slug, "en")] ||
    productImages.other;

  return {
    id: String(item.id),
    name,
    slug,
    description: pickLocalized(item.description, locale),
    cover_image: item.cover_image ?? item.image ?? undefined,
    image,
    subcategories: [
      ...(item.subcategories ?? []),
      ...(item.product_subcategories ?? []),
    ].map((subcategory) => mapSubcategory(subcategory, locale)),
  };
}

function mapSubcategory(item: RawProductSubcategory, locale = "tr"): ProductSubcategory {
  const name = pickLocalized(item.name, locale);
  const slug = pickLocalizedSlug(item, locale, name);
  const image = formatImageUrl(item.cover_image || item.image);

  return {
    id: String(item.id),
    categoryId: item.product_category_id
      ? String(item.product_category_id)
      : item.category_id
        ? String(item.category_id)
        : undefined,
    name,
    slug,
    description: pickLocalized(item.description, locale),
    image: image || undefined,
  };
}

function mapProduct(item: RawProduct, locale = "tr"): Product {
  const title = pickLocalized(item.title || item.name || "", locale);
  const slug = pickLocalizedSlug(item, locale, title);
  const image =
    formatImageUrl(item.cover_image || item.image) ||
    fallbackCategoryImages[pickLocalizedSlug((item.category || item.product_category) ?? {}, locale)] ||
    fallbackCategoryImages[pickLocalizedValue((item.category || item.product_category)?.slug, "en")] ||
    productImages.other;
  const galleryImages = [
    ...normalizeImageList(item.galleryImages),
    ...normalizeImageList(item.gallery_images),
    ...normalizeImageList(item.images),
  ];
  const documents = [
    ...normalizeDocumentList(item.documents, locale),
    ...normalizeDocumentList(item.technical_documents, locale),
    ...normalizeDocumentList(item.files, locale),
    ...normalizeDocumentList(item.media, locale),
  ];

  return {
    id: String(item.id),
    categoryId: item.product_category_id
      ? String(item.product_category_id)
      : item.category_id
        ? String(item.category_id)
        : item.categoryId
          ? String(item.categoryId)
          : undefined,
    subcategoryId: item.product_subcategory_id ? String(item.product_subcategory_id) : undefined,
    title,
    slug,
    short_description: item.short_description ?? undefined,
    description: pickLocalized(item.description || item.short_description || "", locale),
    cover_image: item.cover_image ?? undefined,
    category: item.category
      ? mapCategory(item.category, locale)
      : item.product_category
        ? mapCategory(item.product_category, locale)
        : undefined,
    subcategory: item.subcategory
      ? mapSubcategory(item.subcategory, locale)
      : item.product_subcategory
        ? mapSubcategory(item.product_subcategory, locale)
        : undefined,
    image,
    galleryImages: galleryImages.length ? galleryImages : gallery(image),
    documents,
    series: item.series ?? "",
    features: normalizeStringList(item.features).map((feature) => pickLocalized(feature, locale)),
    featured: normalizeBoolean(item.is_featured ?? item.featured),
  };
}

export async function getProductCategories(locale: string = "en"): Promise<ProductCategory[]> {
  try {
    const payload = await apiGet<ListPayload<RawProductCategory>>("/products/categories", {locale});
    const categories = unwrapList(payload).map((category) => mapCategory(category, locale));
    return categories.length ? categories : fallbackCategories(locale);
  } catch {
    return fallbackCategories(locale);
  }
}

export async function getProducts(locale: string = "en"): Promise<Product[]> {
  try {
    const payload = await apiGet<ListPayload<RawProduct>>("/products", {locale});
    const products = unwrapList(payload).map((product) => mapProduct(product, locale));
    return products.length ? products : fallbackProducts(locale);
  } catch {
    return fallbackProducts(locale);
  }
}

export async function getFeaturedProducts(locale: string = "en"): Promise<Product[]> {
  try {
    const payload = await apiGet<FeaturedProductsPayload>("/home/featured-products", {locale});
    const products = unwrapFeaturedProducts(payload).map((product) => mapProduct(product, locale));
    if (products.length) return products;
  } catch {
    // Older API versions may not expose the homepage shortcut endpoint.
  }

  try {
    const payload = await apiGet<ListPayload<RawProduct>>("/products", {
      locale,
      featured: 1,
    });
    const products = unwrapList(payload).map((product) => mapProduct(product, locale));
    const featuredProducts = products.filter((product) => product.featured);
    return featuredProducts.length ? featuredProducts : products;
  } catch {
    const products = fallbackProducts(locale);
    return products.slice(0, 6);
  }
}

export async function getProductSubcategories(
  categorySlug: string,
  locale: string = "en",
): Promise<ProductSubcategory[]> {
  const categories = await getProductCategories(locale);
  const currentCategory = categories.find((category) => category.slug === categorySlug);

  if (currentCategory?.subcategories?.length) {
    return currentCategory.subcategories;
  }

  try {
    const payload = await apiGet<ListPayload<RawProductSubcategory>>(
      `/products/categories/${categorySlug}/subcategories`,
      {locale},
    );
    const subcategories = unwrapList(payload).map((subcategory) => mapSubcategory(subcategory, locale));
    if (subcategories.length) return subcategories;
  } catch {
    // Some API versions do not expose a nested subcategory endpoint yet.
  }

  if (currentCategory?.id) {
    try {
      const payload = await apiGet<ListPayload<RawProductSubcategory>>(
        `/products/categories/${currentCategory.id}/subcategories`,
        {locale},
      );
      const subcategories = unwrapList(payload).map((subcategory) => mapSubcategory(subcategory, locale));
      if (subcategories.length) return subcategories;
    } catch {
      // Try flat endpoints below.
    }
  }

  try {
    const payload = await apiGet<ListPayload<RawProductSubcategory>>("/products/subcategories", {
      locale,
      category: categorySlug,
    });
    const subcategories = unwrapList(payload)
      .map((subcategory) => mapSubcategory(subcategory, locale))
      .filter((subcategory) => {
        return !currentCategory || subcategory.categoryId === currentCategory.id;
      });
    if (subcategories.length) return subcategories;
  } catch {
    // Fall through to product-derived subcategories.
  }

  try {
    const payload = await apiGet<ListPayload<RawProductSubcategory>>("/product-subcategories", {
      locale,
      category: categorySlug,
    });
    const subcategories = unwrapList(payload)
      .map((subcategory) => mapSubcategory(subcategory, locale))
      .filter((subcategory) => {
        return !currentCategory || subcategory.categoryId === currentCategory.id;
      });
    if (subcategories.length) return subcategories;
  } catch {
    // Fall through to product-derived subcategories.
  }

  const products = await getProducts(locale);
  const seen = new Map<string, ProductSubcategory>();

  for (const product of products) {
    const belongsToCategory =
      product.category?.slug === categorySlug ||
      product.categoryId === currentCategory?.id ||
      product.categoryId === categorySlug;

    if (!belongsToCategory || !product.subcategory?.name) continue;

    const key = product.subcategory.slug || product.subcategory.id || product.subcategory.name;
    if (!seen.has(key)) {
      seen.set(key, product.subcategory);
    }
  }

  return Array.from(seen.values());
}

export async function getProductBySlug(
  slug: string,
  locale: string = "en",
): Promise<Product | undefined> {
  try {
    const product = await apiGet<RawProduct>(`/products/${slug}`, {locale});
    return mapProduct(product, locale);
  } catch {
    const products = await getProducts(locale);
    return products.find((product) => product.slug === slug || product.id === slug);
  }
}
