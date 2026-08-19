import {getTranslations} from "next-intl/server";
import {PageHeader} from "@/components/layout/PageHeader";
import type {Locale} from "@/i18n/routing";
import QuoteForm from "@/components/sections/quote/QuoteForm";

export default async function QuotePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "Quote"});
  const navT = await getTranslations({locale, namespace: "nav"});

  const formDict = {
    nameLabel: t("nameLabel"),
    namePlaceholder: t("namePlaceholder"),
    emailLabel: t("emailLabel"),
    emailPlaceholder: t("emailPlaceholder"),
    phoneLabel: t("phoneLabel"),
    phonePlaceholder: t("phonePlaceholder"),
    fileLabel: t("fileLabel"),
    fileSelect: t("fileSelect"),
    fileDrag: t("fileDrag"),
    fileTypes: t("fileTypes"),
    messageLabel: t("messageLabel"),
    messagePlaceholder: t("messagePlaceholder"),
    submitButton: t("submitButton"),
    sending: "Gönderiliyor...",
    successMessage: "Teklif talebiniz başarıyla alındı! Ekibimiz en kısa sürede size özel fiyat çalışması ile dönüş yapacaktır.",
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
          {label: navT("quote")},
        ]}
      />

      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          <div className="lg:col-span-1 flex flex-col">
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm border border-gray-100 h-full">
              <h3 className="text-xl font-bold text-slate-900 mb-8">{t("whyUsTitle")}</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-4 mt-0.5 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t("whyUs1Title")}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t("whyUs1Desc")}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-4 mt-0.5 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t("whyUs2Title")}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t("whyUs2Desc")}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-4 mt-0.5 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t("whyUs3Title")}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t("whyUs3Desc")}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-4 mt-0.5 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t("whyUs4Title")}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t("whyUs4Desc")}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-4 mt-0.5 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t("whyUs5Title")}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t("whyUs5Desc")}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-4 mt-0.5 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t("whyUs6Title")}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t("whyUs6Desc")}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-4 mt-0.5 text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t("whyUs7Title")}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t("whyUs7Desc")}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm border border-gray-100 h-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{t("formTitle")}</h2>
              
              <QuoteForm dict={formDict} />

            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}