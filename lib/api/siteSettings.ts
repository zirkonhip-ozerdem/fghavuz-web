import type {Locale} from "@/i18n/routing";
import {apiGet} from "./client";

export type SiteSettings = {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  whatsapp: string;
  whatsappHref: string;
  address: string;
  mapEmbedUrl: string | null;
  social: {
    instagram: string | null;
    linkedin: string | null;
    facebook: string | null;
  };
  footerText: string;
  copyrightText: string;
  yengecYazilimUrl: string | null;
  ynaEkibiUrl: string | null;
};

type RawSiteSettings = {
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  address: string | null;
  map_embed_url: string | null;
  social: {instagram: string | null; linkedin: string | null; facebook: string | null} | null;
  footer_text: string | null;
  copyright_text: string | null;
  yengec_yazilim_url: string | null;
  yna_ekibi_url: string | null;
};

const FALLBACK_PHONE = "+90 212 000 00 00";
const FALLBACK_EMAIL = "sales@fgpool.com";
const FALLBACK_ADDRESS = "Anatolian Industrial Zone, Istanbul, Türkiye";

function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function toWhatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  const raw = await apiGet<RawSiteSettings>("/site-settings", {locale});

  const phone = raw.phone || FALLBACK_PHONE;
  const email = raw.email || FALLBACK_EMAIL;
  const whatsapp = raw.whatsapp || phone;
  const address = raw.address || FALLBACK_ADDRESS;

  return {
    phone,
    phoneHref: toTelHref(phone),
    email,
    emailHref: `mailto:${email}`,
    whatsapp,
    whatsappHref: toWhatsappHref(whatsapp),
    address,
    mapEmbedUrl: raw.map_embed_url,
    social: {
      instagram: raw.social?.instagram ?? null,
      linkedin: raw.social?.linkedin ?? null,
      facebook: raw.social?.facebook ?? null,
    },
    footerText: raw.footer_text ?? "",
    copyrightText: raw.copyright_text ?? "",
    yengecYazilimUrl: raw.yengec_yazilim_url,
    ynaEkibiUrl: raw.yna_ekibi_url,
  };
}
