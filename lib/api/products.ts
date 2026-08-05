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
  series: string;
  features: string[];
}

// Dillere göre ayrılmış sahte verilerimiz
const localizedProducts: Record<string, Product[]> = {
  en: [
    { id: 'p1', categoryId: 'c1', title: 'Interlocking Grating', slug: 'interlocking-grating', description: 'Precision manufactured for durability and fluid dynamics.', image: '/assets/product-grating.jpeg', series: 'SERIES A', features: ['High-performance', 'UV resistant ABS'] },
    { id: 'p2', categoryId: 'c2', title: 'High-Flow Main Drain', slug: 'high-flow-main-drain', description: 'High flow capacity engineering for commercial and resort pools.', image: '/assets/product-drain.jpeg', series: 'STAINLESS', features: ['316L Stainless Steel', 'Anti-vortex'] },
    { id: 'p3', categoryId: 'c3', title: 'Wall Return Inlets', slug: 'wall-return-inlets', description: 'Streamlined supply flow for optimal water circulation.', image: '/assets/product-inlets.jpeg', series: 'FITTINGS', features: ['Adjustable flow rate', 'Easy installation'] }
  ],
  tr: [
    { id: 'p1', categoryId: 'c1', title: 'Geçmeli Izgara (Grating)', slug: 'interlocking-grating', description: 'Dayanıklılık ve akışkanlar dinamiği için hassas üretim.', image: '/assets/product-grating.jpeg', series: 'SERİ A', features: ['Yüksek performans', 'UV korumalı ABS'] },
    { id: 'p2', categoryId: 'c2', title: 'Yüksek Akışlı Ana Gider', slug: 'high-flow-main-drain', description: 'Ticari ve tatil köyü havuzları için yüksek akış kapasiteli mühendislik.', image: '/assets/product-drain.jpeg', series: 'PASLANMAZ', features: ['316L Paslanmaz Çelik', 'Vorteks önleyici'] },
    { id: 'p3', categoryId: 'c3', title: 'Duvar Dönüş Nozulları', slug: 'wall-return-inlets', description: 'Optimum su sirkülasyonu için akıcı besleme akışı.', image: '/assets/product-inlets.jpeg', series: 'BAĞLANTI ELEMANLARI', features: ['Ayarlanabilir akış', 'Kolay kurulum'] }
  ],
  ar: [
    { id: 'p1', categoryId: 'c1', title: 'شبكة متشابكة', slug: 'interlocking-grating', description: 'تم تصنيعها بدقة من أجل المتانة وديناميكيات السوائل.', image: '/assets/product-grating.jpeg', series: 'السلسلة أ', features: ['أداء عالي'] },
    { id: 'p2', categoryId: 'c2', title: 'استنزاف رئيسي عالي التدفق', slug: 'high-flow-main-drain', description: 'هندسة سعة التدفق العالي للمسابح التجارية.', image: '/assets/product-drain.jpeg', series: 'غير القابل للصدأ', features: ['فولاذ 316L'] },
    { id: 'p3', categoryId: 'c3', title: 'مداخل عودة الجدار', slug: 'wall-return-inlets', description: 'تدفق إمداد مبسط لضمان دوران المياه بشكل مثالي.', image: '/assets/product-inlets.jpeg', series: 'تجهيزات', features: ['تدفق قابل للتعديل'] }
  ]
};

export async function getProducts(locale: string = 'en'): Promise<Product[]> {
  return localizedProducts[locale] || localizedProducts['en'];
}

export async function getProductBySlug(slug: string, locale: string = 'en'): Promise<Product | undefined> {
  const products = await getProducts(locale);
  return products.find((product) => product.slug === slug);
}