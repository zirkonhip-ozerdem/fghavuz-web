import type {Locale} from "@/i18n/routing";
import {apiGet} from "./client";

type LocalizedText = Record<Locale, string>;

export type ProductCategory = {
  id: string;
  slug: string;
  image: string;
  name: LocalizedText;
  kicker: LocalizedText;
  description: LocalizedText;
  /** Admin panel "öne çıkar" flag — only categories with this set to true surface in the homepage showcase. */
  featured: boolean;
};

export type Advantage = {
  id: string;
  icon: "award" | "truck" | "shield";
  title: LocalizedText;
  description: LocalizedText;
};

export type Project = {
  id: string;
  image: string;
  location: LocalizedText;
  title: LocalizedText;
};

export type CatalogDocument = {
  id: string;
  format: "PDF";
  size: string;
  href: string;
  title: LocalizedText;
  description: LocalizedText;
};

const categories: ProductCategory[] = [
  {
    id: "grating",
    slug: "interlocking-grating",
    image: "/assets/product-grating.jpeg",
    featured: true,
    kicker: {
      en: "Grating",
      tr: "Izgara",
      ar: "شبكات",
    },
    name: {
      en: "Interlocking Grating",
      tr: "Geçmeli Taşma Izgarası",
      ar: "شبكات متداخلة",
    },
    description: {
      en: "UV-stable ABS modules for overflow channels.",
      tr: "Taşma kanalları için UV dayanımlı ABS modüller.",
      ar: "وحدات ABS مقاومة للأشعة لقنوات الفيض.",
    },
  },
  {
    id: "main-drain",
    slug: "high-flow-main-drain",
    image: "/assets/product-drain.jpeg",
    featured: true,
    kicker: {
      en: "Channel",
      tr: "Kanal",
      ar: "قناة",
    },
    name: {
      en: "High-Flow Main Drain",
      tr: "Yüksek Debili Ana Drenaj",
      ar: "مصرف رئيسي عالي التدفق",
    },
    description: {
      en: "Anti-vortex drains for public and commercial pools.",
      tr: "Kamusal ve ticari havuzlar için anti-vorteks drenajlar.",
      ar: "مصارف مضادة للدوامة للمسابح العامة والتجارية.",
    },
  },
  {
    id: "inlets",
    slug: "wall-return-inlets",
    image: "/assets/product-inlets.jpeg",
    featured: false,
    kicker: {
      en: "Fittings",
      tr: "Nozullar",
      ar: "وصلات",
    },
    name: {
      en: "Wall Return Inlets",
      tr: "Duvar Dönüş Nozulları",
      ar: "مداخل رجوع جدارية",
    },
    description: {
      en: "Balanced return-flow hardware for circulation lines.",
      tr: "Sirkülasyon hatları için dengeli dönüş ekipmanı.",
      ar: "معدات رجوع متوازنة لخطوط الدوران.",
    },
  },
  {
    id: "linear",
    slug: "linear-edge-grating",
    image: "/assets/product-grating.jpeg",
    featured: true,
    kicker: {
      en: "Surface",
      tr: "Yüzey",
      ar: "سطح",
    },
    name: {
      en: "Linear Edge Grating",
      tr: "Lineer Kenar Izgarası",
      ar: "شبكات حافة خطية",
    },
    description: {
      en: "Clean modular edge details for luxury installations.",
      tr: "Lüks uygulamalar için temiz modüler kenar detayları.",
      ar: "تفاصيل حافة معيارية أنيقة للتركيبات الفاخرة.",
    },
  },
];

const advantages: Advantage[] = [
  {
    id: "materials",
    icon: "award",
    title: {
      en: "Premium Materials",
      tr: "Premium Malzemeler",
      ar: "مواد ممتازة",
    },
    description: {
      en: "UV-stable ABS and stainless hardware selected for harsh pool chemistry and weathering.",
      tr: "Zorlu havuz kimyası ve dış koşullar için UV dayanımlı ABS ve paslanmaz donanım.",
      ar: "ABS مقاوم للأشعة ومعدات غير قابلة للصدأ لظروف المسابح الصعبة.",
    },
  },
  {
    id: "logistics",
    icon: "truck",
    title: {
      en: "Global Logistics",
      tr: "Global Lojistik",
      ar: "لوجستيات عالمية",
    },
    description: {
      en: "Standard packs, palletized inventory and fast documents for wholesale distribution.",
      tr: "Toptan dağıtım için standart paketler, paletli stok ve hızlı evrak akışı.",
      ar: "تغليف قياسي ومخزون على منصات ومستندات سريعة للتوزيع بالجملة.",
    },
  },
  {
    id: "quality",
    icon: "shield",
    title: {
      en: "Certified Quality",
      tr: "Sertifikalı Kalite",
      ar: "جودة معتمدة",
    },
    description: {
      en: "Color control, dimensional testing and traceable production batches.",
      tr: "Renk kontrolü, ölçü testleri ve izlenebilir üretim partileri.",
      ar: "تحكم في اللون واختبارات أبعاد ودفعات إنتاج قابلة للتتبع.",
    },
  },
];

const projects: Project[] = [
  {
    id: "azure-grand",
    image: "/assets/azure-project.jpeg",
    location: {
      en: "Cyprus",
      tr: "Kıbrıs",
      ar: "قبرص",
    },
    title: {
      en: "Azure Grand Hotel",
      tr: "Azure Grand Hotel",
      ar: "فندق Azure Grand",
    },
  },
  {
    id: "city-center",
    image: "/assets/hero-pool.jpeg",
    location: {
      en: "United Kingdom",
      tr: "Birleşik Krallık",
      ar: "المملكة المتحدة",
    },
    title: {
      en: "City Aquatic Center",
      tr: "City Aquatic Center",
      ar: "مركز City المائي",
    },
  },
  {
    id: "riviera-resort",
    image: "/assets/azure-project.jpeg",
    location: {
      en: "France",
      tr: "Fransa",
      ar: "فرنسا",
    },
    title: {
      en: "Riviera Resort & Spa",
      tr: "Riviera Resort & Spa",
      ar: "منتجع ريفييرا آند سبا",
    },
  },
  {
    id: "marina-bay",
    image: "/assets/hero-pool.jpeg",
    location: {
      en: "United Arab Emirates",
      tr: "Birleşik Arap Emirlikleri",
      ar: "الإمارات العربية المتحدة",
    },
    title: {
      en: "Marina Bay Aquatic Park",
      tr: "Marina Bay Aquatic Park",
      ar: "منتزه Marina Bay المائي",
    },
  },
];

const catalogDocuments: CatalogDocument[] = [
  {
    id: "full-catalog",
    format: "PDF",
    size: "24.6 MB",
    href: "/catalogs/fgpool-full-catalog.pdf",
    title: {
      en: "Complete Product Catalog",
      tr: "Tam Ürün Kataloğu",
      ar: "الكتالوج الكامل للمنتجات",
    },
    description: {
      en: "Full product range with dimensions, materials and finish options for every series.",
      tr: "Tüm seriler için ölçüler, malzemeler ve yüzey seçenekleriyle komple ürün gamı.",
      ar: "التشكيلة الكاملة للمنتجات مع الأبعاد والمواد وخيارات التشطيب لكل سلسلة.",
    },
  },
  {
    id: "overflow-grating",
    format: "PDF",
    size: "8.9 MB",
    href: "/catalogs/overflow-grating-systems.pdf",
    title: {
      en: "Overflow Grating Systems",
      tr: "Taşma Izgara Sistemleri",
      ar: "أنظمة شبكات الفيض",
    },
    description: {
      en: "Interlocking and linear grating profiles with load ratings and installation details.",
      tr: "Yük değerleri ve montaj detaylarıyla geçmeli ve lineer ızgara profilleri.",
      ar: "مقاطع شبكات متداخلة وخطية مع معدلات التحميل وتفاصيل التركيب.",
    },
  },
  {
    id: "drainage-suction",
    format: "PDF",
    size: "6.7 MB",
    href: "/catalogs/drainage-suction-systems.pdf",
    title: {
      en: "Main Drain & Suction Systems",
      tr: "Ana Drenaj ve Emme Sistemleri",
      ar: "أنظمة التصريف الرئيسي والشفط",
    },
    description: {
      en: "Anti-vortex drains and suction fittings rated for public and commercial pools.",
      tr: "Kamusal ve ticari havuzlar için anti-vorteks drenaj ve emme ekipmanları.",
      ar: "مصارف مضادة للدوامة ووصلات شفط مصنفة للمسابح العامة والتجارية.",
    },
  },
];

type RawCategory = {
  id: number;
  name: string;
  slug?: string | null;
  slug_tr?: string | null;
  slug_en?: string | null;
  slug_ar?: string | null;
  slugs?: unknown;
  description: string | null;
  image: string | null;
  is_featured: boolean;
};

type RawReference = {
  id: number;
  title: string;
  slug: string;
  location: string;
  description: string | null;
  image: string | null;
  is_featured: boolean;
};

type RawCatalog = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  file_url: string;
  download_url: string;
  file_type: string | null;
  file_size: number | null;
};

const FALLBACK_CATEGORY_IMAGE = "/assets/category-other-products.png";
const FALLBACK_PROJECT_IMAGE = "/assets/azure-project.jpeg";

const productKickers: Record<Locale, string> = {
  en: "Product",
  tr: "Ürün",
  ar: "منتج",
};

function localized(locale: Locale, value: string): LocalizedText {
  return {
    en: locale === "en" ? value : "",
    tr: locale === "tr" ? value : "",
    ar: locale === "ar" ? value : "",
  };
}

function pickLocalizedValue(value: unknown, locale: Locale): string {
  if (!value) return "";

  if (typeof value === "object") {
    const parsed = value as Partial<Record<Locale, string>>;
    return parsed[locale] || parsed.tr || parsed.en || parsed.ar || "";
  }

  if (typeof value !== "string") {
    return String(value);
  }

  try {
    const parsed = JSON.parse(value) as Partial<Record<Locale, string>>;
    if (parsed && typeof parsed === "object") {
      return parsed[locale] || parsed.tr || parsed.en || parsed.ar || value;
    }
  } catch {
    return value;
  }

  return value;
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

function pickLocalizedSlug(raw: RawCategory, locale: Locale, label?: string) {
  const directSlug = {
    en: raw.slug_en,
    tr: raw.slug_tr,
    ar: raw.slug_ar,
  }[locale];

  return (
    pickLocalizedValue(directSlug, locale) ||
    pickLocalizedValue(raw.slugs, locale) ||
    (locale === "tr" && label ? slugify(label) : "") ||
    pickLocalizedValue(raw.slug, locale) ||
    String(raw.id)
  );
}

function fillLocalized(locale: Locale, value: string, fallback = value): LocalizedText {
  return {
    en: locale === "en" ? value : fallback,
    tr: locale === "tr" ? value : fallback,
    ar: locale === "ar" ? value : fallback,
  };
}

function mapCategory(raw: RawCategory, locale: Locale): ProductCategory {
  const name = pickLocalizedValue(raw.name, locale) || raw.name;
  const description = pickLocalizedValue(raw.description, locale);

  return {
    id: String(raw.id),
    slug: pickLocalizedSlug(raw, locale, name),
    image: raw.image ?? FALLBACK_CATEGORY_IMAGE,
    featured: raw.is_featured,
    kicker: fillLocalized(locale, productKickers[locale], productKickers.tr),
    name: fillLocalized(locale, name),
    description: fillLocalized(locale, description),
  };
}

function mapReference(raw: RawReference, locale: Locale): Project {
  return {
    id: String(raw.id),
    image: raw.image ?? FALLBACK_PROJECT_IMAGE,
    location: localized(locale, raw.location),
    title: localized(locale, raw.title),
  };
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return "";
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatFileType(mimeType: string | null): "PDF" {
  if (!mimeType || mimeType.includes("pdf")) return "PDF";
  return "PDF";
}

function mapCatalogDocument(raw: RawCatalog, locale: Locale): CatalogDocument {
  return {
    id: String(raw.id),
    format: formatFileType(raw.file_type),
    size: formatFileSize(raw.file_size),
    href: raw.download_url || raw.file_url,
    title: fillLocalized(locale, raw.title),
    description: fillLocalized(locale, raw.description ?? ""),
  };
}

function fallbackForLocale<T>(items: T[]): T[] {
  return items;
}

export async function getFeaturedCategories(locale: Locale = "tr") {
  try {
    const remoteCategories = await apiGet<RawCategory[]>("/products/categories", {locale});
    return remoteCategories.map((category) => mapCategory(category, locale));
  } catch {
    return fallbackForLocale(categories);
  }
}

export async function getShowcaseCategories(locale: Locale = "tr") {
  try {
    const remoteCategories = await getFeaturedCategories(locale);
    return remoteCategories.filter((category) => category.featured);
  } catch {
    return categories.filter((category) => category.featured);
  }
}

export async function getCatalogDocuments(locale: Locale = "tr") {
  try {
    const catalogs = await apiGet<RawCatalog[]>("/catalogs", {locale});
    return catalogs.map((catalog) => mapCatalogDocument(catalog, locale));
  } catch {
    return catalogDocuments;
  }
}

export async function getAdvantages() {
  return advantages;
}

export async function getProjects(locale: Locale = "tr") {
  try {
    const references = await apiGet<RawReference[]>("/home/references", {locale});
    return references.map((reference) => mapReference(reference, locale));
  } catch {
    return projects;
  }
}

export async function searchCatalog(query: string, locale: Locale) {
  const normalized = query.trim().toLocaleLowerCase(locale);

  if (!normalized) {
    return categories.slice(0, 3);
  }

  return categories.filter((category) => {
    return [
      category.name[locale],
      category.kicker[locale],
      category.description[locale],
      category.slug,
    ]
      .join(" ")
      .toLocaleLowerCase(locale)
      .includes(normalized);
  });
}
