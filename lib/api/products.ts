export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  galleryImages?: string[];
  series: string;
  features: string[];
}

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

function gallery(image: string) {
  return [image, image, image, image];
}

const localizedProducts: Record<string, Product[]> = {
  en: [
    {id: "p1", categoryId: "pool-pumps", title: "Pool Pumps", slug: "pool-pumps", description: "Circulation pump systems for residential, commercial and project-scale pools.", image: productImages.pumps, galleryImages: gallery(productImages.pumps), series: "CIRCULATION", features: ["High flow performance", "Quiet operation", "Project-ready capacity"]},
    {id: "p2", categoryId: "sand-filters", title: "Sand Filters", slug: "sand-filters", description: "Durable filtration systems designed for clear water quality and easy maintenance.", image: productImages.filters, galleryImages: gallery(productImages.filters), series: "FILTRATION", features: ["Reliable filtration", "Easy service access", "Commercial durability"]},
    {id: "p3", categoryId: "pool-lights", title: "Pool Lights", slug: "pool-lights", description: "Underwater lighting products for safe, efficient and elegant pool illumination.", image: productImages.lights, galleryImages: gallery(productImages.lights), series: "LIGHTING", features: ["Efficient illumination", "Pool-safe housing", "Modern appearance"]},
    {id: "p4", categoryId: "pool-edge-equipment", title: "Pool Interior and Edge Equipment", slug: "pool-edge-equipment", description: "Overflow, edge and in-pool accessories prepared for complete pool applications.", image: productImages.edge, galleryImages: gallery(productImages.edge), series: "POOL EDGE", features: ["Modular systems", "Clean installation", "Project-compatible details"]},
    {id: "p5", categoryId: "cleaning-equipment", title: "Pool Cleaning Equipment", slug: "pool-cleaning-equipment", description: "Cleaning accessories and maintenance equipment for daily pool operation.", image: productImages.cleaning, galleryImages: gallery(productImages.cleaning), series: "MAINTENANCE", features: ["Daily maintenance support", "Practical accessories", "Long service life"]},
    {id: "p6", categoryId: "disinfection-systems", title: "Disinfection Systems", slug: "disinfection-systems", description: "Dosing and water treatment systems for balanced, controlled pool hygiene.", image: productImages.disinfection, galleryImages: gallery(productImages.disinfection), series: "WATER TREATMENT", features: ["Controlled dosing", "Operational reliability", "Clear water support"]},
    {id: "p7", categoryId: "pool-chemicals", title: "Pool Chemicals", slug: "pool-chemicals", description: "Chemical product groups used for water balance, cleaning and protection.", image: productImages.chemicals, galleryImages: gallery(productImages.chemicals), series: "CHEMICALS", features: ["Water balance", "Cleaning support", "Professional use"]},
    {id: "p8", categoryId: "other-products", title: "Other Products", slug: "other-products", description: "Complementary equipment groups for pool rooms, installations and spare needs.", image: productImages.other, galleryImages: gallery(productImages.other), series: "AUXILIARY", features: ["Complementary range", "Installation support", "Flexible supply"]},
  ],
  tr: [
    {id: "p1", categoryId: "pool-pumps", title: "Havuz Pompaları", slug: "pool-pumps", description: "Konut, ticari ve proje ölçekli havuzlar için sirkülasyon pompa sistemleri.", image: productImages.pumps, galleryImages: gallery(productImages.pumps), series: "SIRKULASYON", features: ["Yüksek debi performansı", "Sessiz çalışma", "Projeye uygun kapasite"]},
    {id: "p2", categoryId: "sand-filters", title: "Kum Filtreleri", slug: "sand-filters", description: "Berrak su kalitesi ve kolay bakım için tasarlanmış dayanıklı filtreleme sistemleri.", image: productImages.filters, galleryImages: gallery(productImages.filters), series: "FILTRASYON", features: ["Güvenilir filtrasyon", "Kolay servis erişimi", "Ticari kullanım dayanımı"]},
    {id: "p3", categoryId: "pool-lights", title: "Havuz İçi Aydınlatmalar - Lambalar", slug: "pool-lights", description: "Güvenli, verimli ve şık havuz aydınlatması için su altı aydınlatma ürünleri.", image: productImages.lights, galleryImages: gallery(productImages.lights), series: "AYDINLATMA", features: ["Verimli aydınlatma", "Havuz kullanımına uygun gövde", "Modern görünüm"]},
    {id: "p4", categoryId: "pool-edge-equipment", title: "Havuz İçi ve Kenar Ekipmanları", slug: "pool-edge-equipment", description: "Tamamlayıcı havuz uygulamaları için taşma, kenar ve havuz içi ekipman grupları.", image: productImages.edge, galleryImages: gallery(productImages.edge), series: "HAVUZ KENARI", features: ["Modüler sistemler", "Temiz montaj detayı", "Projeye uyumlu çözümler"]},
    {id: "p5", categoryId: "cleaning-equipment", title: "Havuz İçi Temizlik Ekipmanları", slug: "pool-cleaning-equipment", description: "Günlük havuz işletimi için temizlik aksesuarları ve bakım ekipmanları.", image: productImages.cleaning, galleryImages: gallery(productImages.cleaning), series: "BAKIM", features: ["Günlük bakım desteği", "Pratik aksesuarlar", "Uzun kullanım ömrü"]},
    {id: "p6", categoryId: "disinfection-systems", title: "Dezenfeksiyon Sistemleri", slug: "disinfection-systems", description: "Dengeli ve kontrollü havuz hijyeni için dozajlama ve su şartlandırma sistemleri.", image: productImages.disinfection, galleryImages: gallery(productImages.disinfection), series: "SU SARTLANDIRMA", features: ["Kontrollü dozajlama", "İşletme güvenilirliği", "Berrak su desteği"]},
    {id: "p7", categoryId: "pool-chemicals", title: "Havuz Kimyasalları", slug: "pool-chemicals", description: "Su dengesi, temizlik ve koruma süreçlerinde kullanılan kimyasal ürün grupları.", image: productImages.chemicals, galleryImages: gallery(productImages.chemicals), series: "KIMYASALLAR", features: ["Su dengesi", "Temizlik desteği", "Profesyonel kullanım"]},
    {id: "p8", categoryId: "other-products", title: "Diğer Ürünler", slug: "other-products", description: "Makine dairesi, montaj ve yedek ihtiyaçları için tamamlayıcı ekipman grupları.", image: productImages.other, galleryImages: gallery(productImages.other), series: "TAMAMLAYICI", features: ["Tamamlayıcı ürün gamı", "Montaj desteği", "Esnek tedarik"]},
  ],
  ar: [
    {id: "p1", categoryId: "pool-pumps", title: "مضخات المسابح", slug: "pool-pumps", description: "أنظمة مضخات دوران للمسابح السكنية والتجارية ومشاريع المسابح.", image: productImages.pumps, galleryImages: gallery(productImages.pumps), series: "الدوران", features: ["أداء تدفق عال", "تشغيل هادئ", "قدرة مناسبة للمشاريع"]},
    {id: "p2", categoryId: "sand-filters", title: "فلاتر الرمل", slug: "sand-filters", description: "أنظمة ترشيح متينة لجودة مياه صافية وصيانة سهلة.", image: productImages.filters, galleryImages: gallery(productImages.filters), series: "الترشيح", features: ["ترشيح موثوق", "وصول سهل للصيانة", "متانة تجارية"]},
    {id: "p3", categoryId: "pool-lights", title: "إضاءات ومصابيح داخلية للمسابح", slug: "pool-lights", description: "منتجات إضاءة تحت الماء لإضاءة آمنة وفعالة وأنيقة.", image: productImages.lights, galleryImages: gallery(productImages.lights), series: "الإضاءة", features: ["إضاءة فعالة", "هيكل آمن للمسبح", "مظهر حديث"]},
    {id: "p4", categoryId: "pool-edge-equipment", title: "معدات داخلية وحواف المسابح", slug: "pool-edge-equipment", description: "معدات فيضان وحواف وإكسسوارات داخلية لتطبيقات المسابح المتكاملة.", image: productImages.edge, galleryImages: gallery(productImages.edge), series: "حواف المسابح", features: ["أنظمة معيارية", "تفاصيل تركيب نظيفة", "حلول مناسبة للمشاريع"]},
    {id: "p5", categoryId: "cleaning-equipment", title: "معدات تنظيف داخل المسابح", slug: "pool-cleaning-equipment", description: "إكسسوارات ومعدات صيانة لتنظيف وتشغيل المسابح اليومي.", image: productImages.cleaning, galleryImages: gallery(productImages.cleaning), series: "الصيانة", features: ["دعم الصيانة اليومية", "إكسسوارات عملية", "عمر استخدام طويل"]},
    {id: "p6", categoryId: "disinfection-systems", title: "أنظمة التعقيم", slug: "disinfection-systems", description: "أنظمة جرعات ومعالجة مياه لنظافة مسبح متوازنة ومضبوطة.", image: productImages.disinfection, galleryImages: gallery(productImages.disinfection), series: "معالجة المياه", features: ["جرعات مضبوطة", "اعتمادية تشغيلية", "دعم صفاء المياه"]},
    {id: "p7", categoryId: "pool-chemicals", title: "كيماويات المسابح", slug: "pool-chemicals", description: "مجموعات كيميائية لتوازن المياه والتنظيف والحماية.", image: productImages.chemicals, galleryImages: gallery(productImages.chemicals), series: "الكيماويات", features: ["توازن المياه", "دعم التنظيف", "استخدام احترافي"]},
    {id: "p8", categoryId: "other-products", title: "منتجات أخرى", slug: "other-products", description: "مجموعات معدات مكملة لغرف المعدات والتركيب واحتياجات القطع.", image: productImages.other, galleryImages: gallery(productImages.other), series: "مكملات", features: ["نطاق مكمل", "دعم التركيب", "توريد مرن"]},
  ],
};

export async function getProducts(locale: string = "en"): Promise<Product[]> {
  return localizedProducts[locale] || localizedProducts.en;
}

export async function getProductBySlug(slug: string, locale: string = "en"): Promise<Product | undefined> {
  const products = await getProducts(locale);
  return products.find((product) => product.slug === slug);
}
