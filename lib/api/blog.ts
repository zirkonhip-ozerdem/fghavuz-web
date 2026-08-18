import type {Locale} from "@/i18n/routing";
import {estimateReadingMinutes} from "@/lib/readingTime";
import {apiGet} from "./client";
import {mapSeoBlock, type RawSeoBlock, type SeoBlock} from "./seo";

type LocalizedText = Record<Locale, string>;

export type BlogCategory = {
  id: string;
  slug: string;
  name: LocalizedText;
};

export type BlogPost = {
  id: string;
  slug: string;
  image: string;
  category: LocalizedText;
  categorySlug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  content?: LocalizedText;
  date: string;
  readTimeMinutes: number;
  featured: boolean;
  seo: SeoBlock | null;
};

type RawBlogCategory = {
  id: number;
  name: string;
  slug: string;
};

type RawBlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content?: string | null;
  cover_image: string | null;
  published_at: string | null;
  is_featured: boolean;
  category: RawBlogCategory | [] | null;
  seo?: RawSeoBlock;
};

const FALLBACK_BLOG_IMAGE = "/assets/product-grating.jpeg";

const posts: BlogPost[] = [
  {
    id: "overflow-grating-selection",
    slug: "overflow-grating-selection-guide",
    image: "/assets/product-grating.jpeg",
    categorySlug: "engineering",
    category: {
      en: "Engineering",
      tr: "Mühendislik",
      ar: "الهندسة",
    },
    title: {
      en: "Selecting Overflow Grating for Hospitality Pools",
      tr: "Otel Havuzları İçin Taşma Izgarası Seçimi",
      ar: "اختيار شبكات الفيض لمسابح الفنادق",
    },
    excerpt: {
      en: "Load ratings, slip resistance and profile depth compared for hotel and resort applications.",
      tr: "Otel ve resort uygulamaları için yük dayanımı, kaymazlık ve profil derinliği karşılaştırması.",
      ar: "مقارنة تحمل الأحمال ومقاومة الانزلاق وعمق المقطع لتطبيقات الفنادق والمنتجعات.",
    },
    date: "2026-06-02",
    readTimeMinutes: 6,
    featured: true,
    seo: null,
  },
  {
    id: "main-drain-capacity",
    slug: "main-drain-capacity-notes",
    image: "/assets/product-drain.jpeg",
    categorySlug: "technical",
    category: {
      en: "Technical",
      tr: "Teknik",
      ar: "تقني",
    },
    title: {
      en: "Drainage Capacity Notes for Aquatic Centers",
      tr: "Su Sporları Merkezleri İçin Drenaj Kapasitesi Notları",
      ar: "ملاحظات سعة التصريف للمراكز المائية",
    },
    excerpt: {
      en: "Sizing anti-vortex main drains against bather load and circulation turnover targets.",
      tr: "Yüzücü yükü ve sirkülasyon hedeflerine göre anti-vorteks ana drenaj boyutlandırma.",
      ar: "تحديد أبعاد المصارف الرئيسية المضادة للدوامة وفق حمل السباحين وأهداف الدوران.",
    },
    date: "2026-05-18",
    readTimeMinutes: 5,
    featured: true,
    seo: null,
  },
  {
    id: "export-packaging-checklist",
    slug: "export-packaging-checklist-for-distributors",
    image: "/assets/factory-floor.jpeg",
    categorySlug: "logistics",
    category: {
      en: "Logistics",
      tr: "Lojistik",
      ar: "لوجستيات",
    },
    title: {
      en: "Export Packaging Checklist for Distributors",
      tr: "Distribütörler İçin İhracat Paketleme Kontrol Listesi",
      ar: "قائمة تحقق تغليف التصدير للموزعين",
    },
    excerpt: {
      en: "Palletizing, moisture protection and documentation steps that keep claims near zero.",
      tr: "Talep oranını sıfıra yaklaştıran paletleme, nem koruması ve evrak adımları.",
      ar: "خطوات التحميل على منصات والحماية من الرطوبة والتوثيق التي تقلل المطالبات.",
    },
    date: "2026-04-30",
    readTimeMinutes: 4,
    featured: true,
    seo: null,
  },
  {
    id: "wall-return-efficiency",
    slug: "wall-return-inlet-efficiency",
    image: "/assets/product-inlets.jpeg",
    categorySlug: "application",
    category: {
      en: "Application",
      tr: "Uygulama",
      ar: "تطبيق",
    },
    title: {
      en: "Wall Return Inlets and Circulation Efficiency",
      tr: "Duvar Dönüş Nozulları ve Sirkülasyon Verimliliği",
      ar: "مداخل الرجوع الجدارية وكفاءة الدوران",
    },
    excerpt: {
      en: "Balancing inlet count and angle to eliminate dead zones in irregular pool shapes.",
      tr: "Düzensiz havuz formlarında ölü bölgeleri ortadan kaldırmak için nozul sayısı ve açı dengesi.",
      ar: "موازنة عدد وزاوية المداخل للقضاء على المناطق الراكدة في أشكال المسابح غير المنتظمة.",
    },
    date: "2026-04-11",
    readTimeMinutes: 5,
    featured: false,
    seo: null,
  },
  {
    id: "modular-edge-materials",
    slug: "modular-pool-edge-material-guide",
    image: "/assets/azure-project.jpeg",
    categorySlug: "design",
    category: {
      en: "Design",
      tr: "Tasarım",
      ar: "تصميم",
    },
    title: {
      en: "Material Choices for Modular Pool Edge Details",
      tr: "Modüler Havuz Kenar Detaylarında Malzeme Seçimi",
      ar: "اختيارات المواد لتفاصيل حافة المسبح المعيارية",
    },
    excerpt: {
      en: "UV stability and colorfastness benchmarks for luxury infinity-edge installations.",
      tr: "Lüks sonsuzluk havuzu uygulamaları için UV dayanımı ve renk sabitliği kıyaslaması.",
      ar: "معايير الثبات ضد الأشعة فوق البنفسجية وثبات اللون لتركيبات حواف اللانهاية الفاخرة.",
    },
    date: "2026-03-22",
    readTimeMinutes: 7,
    featured: false,
    seo: null,
  },
];

function fillLocalized(locale: Locale, value: string, fallback = value): LocalizedText {
  return {
    en: locale === "en" ? value : fallback,
    tr: locale === "tr" ? value : fallback,
    ar: locale === "ar" ? value : fallback,
  };
}

function mapRawCategory(raw: RawBlogCategory, locale: Locale): BlogCategory {
  return {
    id: String(raw.id),
    slug: raw.slug,
    name: fillLocalized(locale, raw.name),
  };
}

function mapRawPost(raw: RawBlogPost, locale: Locale): BlogPost {
  const category = Array.isArray(raw.category) ? null : raw.category;
  const content = raw.content ?? "";
  const excerpt = raw.excerpt ?? "";

  return {
    id: String(raw.id),
    slug: raw.slug || String(raw.id),
    image: raw.cover_image ?? FALLBACK_BLOG_IMAGE,
    category: fillLocalized(locale, category?.name ?? ""),
    categorySlug: category?.slug ?? "uncategorized",
    title: fillLocalized(locale, raw.title),
    excerpt: fillLocalized(locale, excerpt),
    content: content ? fillLocalized(locale, content) : undefined,
    date: raw.published_at ?? "",
    readTimeMinutes: content
      ? estimateReadingMinutes(content)
      : Math.max(1, estimateReadingMinutes(excerpt)),
    featured: raw.is_featured,
    seo: mapSeoBlock(raw.seo),
  };
}

function unwrapPostList(payload: {items: RawBlogPost[]} | RawBlogPost[]): RawBlogPost[] {
  return Array.isArray(payload) ? payload : payload.items;
}

function fallbackCategories(): BlogCategory[] {
  const seen = new Map<string, BlogCategory>();

  for (const post of posts) {
    if (!seen.has(post.categorySlug)) {
      seen.set(post.categorySlug, {
        id: post.categorySlug,
        slug: post.categorySlug,
        name: post.category,
      });
    }
  }

  return Array.from(seen.values());
}

export async function getBlogCategories(locale: Locale = "tr"): Promise<BlogCategory[]> {
  try {
    const categories = await apiGet<RawBlogCategory[]>("/blog/categories", {locale});
    return categories.map((category) => mapRawCategory(category, locale));
  } catch {
    return fallbackCategories();
  }
}

export async function getBlogPosts(locale: Locale = "tr"): Promise<BlogPost[]> {
  try {
    const payload = await apiGet<{items: RawBlogPost[]} | RawBlogPost[]>("/blog/posts", {
      locale,
      per_page: 50,
    });
    return unwrapPostList(payload).map((post) => mapRawPost(post, locale));
  } catch {
    return posts;
  }
}

export async function getBlogPostBySlug(
  slug: string,
  locale: Locale = "tr",
): Promise<BlogPost | undefined> {
  try {
    const post = await apiGet<RawBlogPost>(`/blog/posts/${slug}`, {locale});
    return mapRawPost(post, locale);
  } catch {
    return posts.find((post) => post.slug === slug || post.id === slug);
  }
}

export async function getShowcaseBlogPosts(locale: Locale = "tr"): Promise<BlogPost[]> {
  try {
    const remotePosts = await apiGet<RawBlogPost[]>("/home/featured-blog-posts", {locale});
    return remotePosts.map((post) => mapRawPost(post, locale));
  } catch {
    const allPosts = await getBlogPosts(locale);
    return allPosts.filter((post) => post.featured);
  }
}
