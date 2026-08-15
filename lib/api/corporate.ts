import type {Locale} from "@/i18n/routing";
import {apiGet} from "./client";
import {mapSeoBlock, type RawSeoBlock, type SeoBlock} from "./seo";

export type CorporateMilestone = {
  year: string;
  title: string;
  description: string;
};

export type Corporate = {
  title: string;
  subtitle: string;
  description: string;
  storySections: string;
  mission: string;
  vision: string;
  values: string[];
  milestones: CorporateMilestone[];
  videoUrl: string | null;
  videoMedia: string | null;
  image: string | null;
  imageAlt: string;
  seo: SeoBlock | null;
};

type RawCorporateMilestone = {
  year?: string | null;
  title?: string | null;
  description?: string | null;
};

type RawCorporate = {
  title: string;
  subtitle: string;
  description: string | null;
  story_sections: string | null;
  mission: string | null;
  vision: string | null;
  values: string[] | null;
  milestones: RawCorporateMilestone[] | null;
  video_url: string | null;
  video_media: string | null;
  image: string | null;
  image_alt: string | null;
  seo?: RawSeoBlock;
};

function mapMilestones(raw: RawCorporateMilestone[] | null): CorporateMilestone[] {
  if (!Array.isArray(raw)) return [];

  return raw.map((item) => ({
    year: item.year ?? "",
    title: item.title ?? "",
    description: item.description ?? "",
  }));
}

export async function getCorporate(locale: Locale): Promise<Corporate> {
  const raw = await apiGet<RawCorporate>("/corporate", {locale});

  return {
    title: raw.title,
    subtitle: raw.subtitle,
    description: raw.description ?? "",
    storySections: raw.story_sections ?? "",
    mission: raw.mission ?? "",
    vision: raw.vision ?? "",
    values: raw.values ?? [],
    milestones: mapMilestones(raw.milestones),
    videoUrl: raw.video_url,
    videoMedia: raw.video_media,
    image: raw.image,
    imageAlt: raw.image_alt ?? "",
    seo: mapSeoBlock(raw.seo),
  };
}
