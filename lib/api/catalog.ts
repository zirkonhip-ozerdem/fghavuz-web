import type {Locale} from "@/i18n/routing";

type LocalizedText = Record<Locale, string>;

export type ProductCategory = {
  id: string;
  slug: string;
  image: string;
  name: LocalizedText;
  kicker: LocalizedText;
  description: LocalizedText;
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

const categories: ProductCategory[] = [
  {
    id: "grating",
    slug: "interlocking-grating",
    image: "/assets/product-grating.jpeg",
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
];

export type CatalogDocument = {
  id: string;
  format: "PDF";
  size: string;
  href: string;
  title: LocalizedText;
  description: LocalizedText;
};

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

export async function getFeaturedCategories() {
  return categories;
}

export async function getCatalogDocuments() {
  return catalogDocuments;
}

export async function getAdvantages() {
  return advantages;
}

export async function getProjects() {
  return projects;
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
