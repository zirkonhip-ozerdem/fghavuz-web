import type {Locale} from "@/i18n/routing";
import {estimateReadingMinutes} from "@/lib/readingTime";
import {apiGet} from "./client";
import {mapSeoBlock, type RawSeoBlock, type SeoBlock} from "./seo";

export type BlogCategory = {
  id: number;
  slug: string;
  name: string;
};

export type BlogPost = {
  id: number;
  slug: string;
  image: string;
  category: BlogCategory | null;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTimeMinutes: number;
  /** Admin panel "öne çıkar" flag — only posts with this set to true surface in the homepage showcase. */
  featured: boolean;
  seo: SeoBlock | null;
};

type RawBlogCategory = {id: number; name: string; slug: string};

type RawBlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content?: string | null;
  cover_image: string | null;
  published_at: string | null;
  is_featured: boolean;
  category: RawBlogCategory | [];
  seo?: RawSeoBlock;
};

const FALLBACK_BLOG_IMAGE = "/assets/product-grating.jpeg";

function mapCategory(raw: RawBlogCategory | []): BlogCategory | null {
  if (Array.isArray(raw)) return null;
  return {id: raw.id, slug: raw.slug, name: raw.name};
}

function mapBlogPost(raw: RawBlogPost): BlogPost {
  return {
    id: raw.id,
    slug: raw.slug,
    image: raw.cover_image ?? FALLBACK_BLOG_IMAGE,
    category: mapCategory(raw.category),
    title: raw.title,
    excerpt: raw.excerpt ?? "",
    content: raw.content ?? undefined,
    date: raw.published_at ?? "",
    // Only the detail response includes full content; list responses only get
    // the excerpt, which is too short to estimate reading time from honestly.
    readTimeMinutes: raw.content ? estimateReadingMinutes(raw.content) : 0,
    featured: raw.is_featured,
    seo: mapSeoBlock(raw.seo),
  };
}

export async function getBlogCategories(locale: Locale): Promise<BlogCategory[]> {
  const categories = await apiGet<RawBlogCategory[]>("/blog/categories", {locale});
  return categories.map((category) => ({id: category.id, slug: category.slug, name: category.name}));
}

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const {items} = await apiGet<{items: RawBlogPost[]}>("/blog/posts", {locale, per_page: 50});
  return items.map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string, locale: Locale): Promise<BlogPost | undefined> {
  try {
    const post = await apiGet<RawBlogPost>(`/blog/posts/${slug}`, {locale});
    return mapBlogPost(post);
  } catch {
    return undefined;
  }
}

/** Homepage showcase feed — only posts flagged "öne çıkar" (featured) in the admin panel. */
export async function getShowcaseBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const posts = await apiGet<RawBlogPost[]>("/home/featured-blog-posts", {locale});
  return posts.map(mapBlogPost);
}
