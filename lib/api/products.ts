/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ProductCategory {
  id: number | string;
  name: string;
  slug: string;
  cover_image?: string;
}

export interface Product {
  id: number | string;
  categoryId?: string | number;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  cover_image?: string;
  category?: ProductCategory;
  
  image: string;
  galleryImages: string[];
  series: string;
  features: string[];
}

// Fotoğraf URL'sini düzenleyen akıllı yardımcı fonksiyon
const formatImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path; // Backend zaten tam URL gönderiyorsa dokunma
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${path}`; // Sadece dosya adıysa adresi ekle
};

export async function getProductCategories(locale: string = "tr"): Promise<ProductCategory[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories?locale=${locale}`, { cache: 'no-store' });
    const json = await res.json();
    
    if (Array.isArray(json)) return json;
    if (json?.data?.items && Array.isArray(json.data.items)) return json.data.items;
    if (json?.data && Array.isArray(json.data)) return json.data;
    if (json?.data?.data && Array.isArray(json.data.data)) return json.data.data;
    
    return [];
  } catch (error) {
    console.error("Kategoriler çekilirken hata oluştu:", error);
    return [];
  }
}

export async function getProducts(locale: string = "tr"): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products?locale=${locale}`, { cache: 'no-store' });
    const json = await res.json();
    
    let data = [];
    if (Array.isArray(json)) data = json;
    else if (json?.data?.items && Array.isArray(json.data.items)) data = json.data.items;
    else if (json?.data && Array.isArray(json.data)) data = json.data;
    else if (json?.data?.data && Array.isArray(json.data.data)) data = json.data.data;
    
    return data.map((item: any) => ({
      ...item,
      image: formatImageUrl(item.cover_image) || item.image || '',
      galleryImages: Array.isArray(item.galleryImages) ? item.galleryImages : [],
      features: Array.isArray(item.features) ? item.features.map((f: any) => typeof f === 'object' ? f.value : f) : [],
      series: item.series || "",
    }));
  } catch (error) {
    console.error("Ürünler çekilirken hata oluştu:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string, locale: string = "tr"): Promise<Product | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}?locale=${locale}`, { cache: 'no-store' });
    const json = await res.json();
    
    const item = json?.data || json;
    if (!item || !item.id) return undefined;

    return {
      ...item,
      image: formatImageUrl(item.cover_image) || item.image || '',
      galleryImages: Array.isArray(item.galleryImages) ? item.galleryImages : [],
      features: Array.isArray(item.features) ? item.features.map((f: any) => typeof f === 'object' ? f.value : f) : [],
      series: item.series || "",
    };
  } catch (error) {
    console.error("Ürün detayı çekilirken hata oluştu:", error);
    return undefined;
  }
}