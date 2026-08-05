import type {Locale} from "@/i18n/routing";

type LocalizedText = Record<Locale, string>;

export type BlogPost = {
  id: string;
  slug: string;
  image: string;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  date: string;
  readTimeMinutes: number;
  /** Admin panel "öne çıkar" flag — only posts with this set to true surface in the homepage showcase. */
  featured: boolean;
};

const posts: BlogPost[] = [
  {
    id: "overflow-grating-selection",
    slug: "overflow-grating-selection-guide",
    image: "/assets/product-grating.jpeg",
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
  },
  {
    id: "main-drain-capacity",
    slug: "main-drain-capacity-notes",
    image: "/assets/product-drain.jpeg",
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
  },
  {
    id: "export-packaging-checklist",
    slug: "export-packaging-checklist-for-distributors",
    image: "/assets/factory-floor.jpeg",
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
  },
  {
    id: "wall-return-efficiency",
    slug: "wall-return-inlet-efficiency",
    image: "/assets/product-inlets.jpeg",
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
  },
  {
    id: "modular-edge-materials",
    slug: "modular-pool-edge-material-guide",
    image: "/assets/azure-project.jpeg",
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
  },
];

export async function getBlogPosts() {
  return posts;
}

/** Homepage showcase feed — only posts flagged "öne çıkar" (featured) in the admin panel. */
export async function getShowcaseBlogPosts() {
  return posts.filter((post) => post.featured);
}
