import type {Locale} from "@/i18n/routing";
import {apiGet} from "./client";

export type ProductCategory = {
  id: number;
  slug: string;
  image: string;
  name: string;
  description: string;
  /** Admin panel "öne çıkar" flag — only categories with this set to true surface in the homepage showcase. */
  featured: boolean;
};

export type Advantage = {
  id: string;
  icon: "award" | "truck" | "shield";
  title: string;
  description: string;
};

export type Project = {
  id: number;
  image: string;
  location: string;
  title: string;
};

export type CatalogDocument = {
  id: number;
  format: string;
  size: string;
  href: string;
  title: string;
  description: string;
};

type RawCategory = {
  id: number;
  name: string;
  slug: string;
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

function mapCategory(raw: RawCategory): ProductCategory {
  return {
    id: raw.id,
    slug: raw.slug,
    image: raw.image ?? FALLBACK_CATEGORY_IMAGE,
    name: raw.name,
    description: raw.description ?? "",
    featured: raw.is_featured,
  };
}

function mapReference(raw: RawReference): Project {
  return {
    id: raw.id,
    image: raw.image ?? FALLBACK_PROJECT_IMAGE,
    location: raw.location,
    title: raw.title,
  };
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return "";
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatFileType(mimeType: string | null): string {
  if (!mimeType) return "PDF";
  if (mimeType.includes("pdf")) return "PDF";
  return mimeType.split("/").pop()?.toUpperCase() ?? "PDF";
}

function mapCatalogDocument(raw: RawCatalog): CatalogDocument {
  return {
    id: raw.id,
    format: formatFileType(raw.file_type),
    size: formatFileSize(raw.file_size),
    href: raw.download_url,
    title: raw.title,
    description: raw.description ?? "",
  };
}

/** Static differentiator cards shown in the "Why FGPOOL" section — not modeled in the admin schema. */
const advantageContent: Record<Locale, Advantage[]> = {
  en: [
    {
      id: "materials",
      icon: "award",
      title: "Premium Materials",
      description: "UV-stable ABS and stainless hardware selected for harsh pool chemistry and weathering.",
    },
    {
      id: "logistics",
      icon: "truck",
      title: "Global Logistics",
      description: "Standard packs, palletized inventory and fast documents for wholesale distribution.",
    },
    {
      id: "quality",
      icon: "shield",
      title: "Certified Quality",
      description: "Color control, dimensional testing and traceable production batches.",
    },
  ],
  tr: [
    {
      id: "materials",
      icon: "award",
      title: "Premium Malzemeler",
      description: "Zorlu havuz kimyası ve dış koşullar için UV dayanımlı ABS ve paslanmaz donanım.",
    },
    {
      id: "logistics",
      icon: "truck",
      title: "Global Lojistik",
      description: "Toptan dağıtım için standart paketler, paletli stok ve hızlı evrak akışı.",
    },
    {
      id: "quality",
      icon: "shield",
      title: "Sertifikalı Kalite",
      description: "Renk kontrolü, ölçü testleri ve izlenebilir üretim partileri.",
    },
  ],
  ar: [
    {
      id: "materials",
      icon: "award",
      title: "مواد ممتازة",
      description: "ABS مقاوم للأشعة ومعدات غير قابلة للصدأ لظروف المسابح الصعبة.",
    },
    {
      id: "logistics",
      icon: "truck",
      title: "لوجستيات عالمية",
      description: "تغليف قياسي ومخزون على منصات ومستندات سريعة للتوزيع بالجملة.",
    },
    {
      id: "quality",
      icon: "shield",
      title: "جودة معتمدة",
      description: "تحكم في اللون واختبارات أبعاد ودفعات إنتاج قابلة للتتبع.",
    },
  ],
};

export async function getAdvantages(locale: Locale): Promise<Advantage[]> {
  return advantageContent[locale] ?? advantageContent.en;
}

/** Full category grid — used by the header/footer nav, not just the homepage showcase. */
export async function getFeaturedCategories(locale: Locale): Promise<ProductCategory[]> {
  const categories = await apiGet<RawCategory[]>("/products/categories", {locale});
  return categories.map(mapCategory);
}

/** Homepage showcase feed — only categories flagged "öne çıkar" (featured) in the admin panel. */
export async function getShowcaseCategories(locale: Locale): Promise<ProductCategory[]> {
  const categories = await getFeaturedCategories(locale);
  return categories.filter((category) => category.featured);
}

export async function getCatalogDocuments(locale: Locale): Promise<CatalogDocument[]> {
  const catalogs = await apiGet<RawCatalog[]>("/catalogs", {locale});
  return catalogs.map(mapCatalogDocument);
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  const references = await apiGet<RawReference[]>("/home/references", {locale});
  return references.map(mapReference);
}
