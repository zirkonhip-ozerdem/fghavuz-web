import {getTranslations} from "next-intl/server";
import {PageHeader} from "@/components/layout/PageHeader";
import type {Locale} from "@/i18n/routing";
import ContactForm from "@/components/sections/contact/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "Contact"});
  const navT = await getTranslations({locale, namespace: "nav"});

  const formDict = {
    nameLabel: t("nameLabel"),
    namePlaceholder: t("namePlaceholder") || "Adınız Soyadınız",
    emailLabel: t("emailFormLabel") || t("emailLabel") || "E-posta",
    emailPlaceholder: t("emailPlaceholder") || "E-posta Adresiniz",
    messageLabel: t("messageLabel"),
    messagePlaceholder: t("messagePlaceholder") || "Mesajınızı buraya yazın...",
    submitButton: t("submitButton"),
    sending: "Gönderiliyor...",
    successMessage: "Mesajınız başarıyla gönderildi! Ekibimiz en kısa sürede sizinle iletişime geçecektir.",
    errorMessage: "Bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin."
  };

  return (
    <main className="bg-gray-50 min-h-screen pb-16">
      <PageHeader
        locale={locale}
        title={t("title")}
        description={t("description")}
        breadcrumbs={[
          {label: navT("home"), href: "/"},
          {label: navT("contact")},
        ]}
      />

      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          <div className="lg:col-span-1 flex flex-col gap-5 h-full">
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">{t("headOffice")}</h3>
              <p className="text-gray-600 mb-2 text-sm"><strong>{t("addressLabel")}</strong> {t("addressValue")}</p>
              <p className="text-gray-600 mb-2 text-sm"><strong>{t("phoneLabel")}</strong> +90 (242) 555 01 23</p>
              <p className="text-gray-600 text-sm"><strong>{t("emailLabel")}</strong> info@fgpool.com</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">{t("salesSupport")}</h3>
              <p className="text-gray-600 mb-2 text-sm"><strong>{t("globalSales")}</strong> sales@fgpool.com</p>
              <p className="text-gray-600 text-sm"><strong>{t("techSupport")}</strong> support@fgpool.com</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex-1 min-h-[220px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.1052601955173!2d27.2372439!3d38.4390638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b962cd679267bd%3A0xc665cb55294e50d!2sBornova%2C%20%C4%B0zmir!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
                className="w-full h-full"
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            
          </div>

          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{t("formTitle")}</h2>
            
            <ContactForm dict={formDict} />
            
          </div>
          
        </div>
      </div>
    </main>
  );
}