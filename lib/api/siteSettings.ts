import type {Locale} from "@/i18n/routing";
import {CONTACT} from "@/lib/contact";
import {apiGet} from "./client";

export type SiteSettings = {
  siteName: string | null;
  logo: string | null;
  favicon: string | null;
  footerLogo: string | null;
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
  site_name: string | null;
  logo: string | null;
  favicon: string | null;
  footer_logo: string | null;
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

const FALLBACK_SITE_SETTINGS: SiteSettings = {
  siteName: null,
  logo: null,
  favicon: null,
  footerLogo: null,
  phone: CONTACT.phone,
  phoneHref: CONTACT.phoneHref,
  email: CONTACT.email,
  emailHref: CONTACT.emailHref,
  whatsapp: CONTACT.phone,
  whatsappHref: CONTACT.whatsappHref,
  address: CONTACT.address,
  mapEmbedUrl: null,
  social: {
    instagram: CONTACT.instagramHref === "#" ? null : CONTACT.instagramHref,
    linkedin: null,
    facebook: null,
  },
  footerText: "",
  copyrightText: "",
  yengecYazilimUrl: null,
  ynaEkibiUrl: null,
};

function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function toWhatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

function mapSiteSettings(raw: RawSiteSettings): SiteSettings {
  const phone = raw.phone || FALLBACK_SITE_SETTINGS.phone;
  const email = raw.email || FALLBACK_SITE_SETTINGS.email;
  const whatsapp = raw.whatsapp || phone;

  return {
    siteName: raw.site_name || null,
    logo: raw.logo || null,
    favicon: raw.favicon || null,
    footerLogo: raw.footer_logo || null,
    phone,
    phoneHref: toTelHref(phone),
    email,
    emailHref: `mailto:${email}`,
    whatsapp,
    whatsappHref: toWhatsappHref(whatsapp),
    address: raw.address || FALLBACK_SITE_SETTINGS.address,
    mapEmbedUrl: raw.map_embed_url,
    social: {
      instagram: raw.social?.instagram ?? FALLBACK_SITE_SETTINGS.social.instagram,
      linkedin: raw.social?.linkedin ?? null,
      facebook: raw.social?.facebook ?? null,
    },
    footerText: raw.footer_text ?? "",
    copyrightText: raw.copyright_text ?? "",
    yengecYazilimUrl: raw.yengec_yazilim_url,
    ynaEkibiUrl: raw.yna_ekibi_url,
  };
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  try {
    const raw = await apiGet<RawSiteSettings>("/site-settings", {locale});
    return mapSiteSettings(raw);
  } catch {
    return FALLBACK_SITE_SETTINGS;
  }
}
