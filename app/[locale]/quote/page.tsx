import { UploadCloud } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  const t = await getTranslations("Quote");

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      <div className="bg-gradient-to-b from-white to-gray-50 pt-24 pb-16 mb-6 text-center">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t("title")}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t("description")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
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
              
              <form className="flex flex-col">
                
                <div className="mb-6">
                  <label htmlFor="nameCompany" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("nameLabel")} <span className="text-red-500">*</span>
                  </label>
                  <input required type="text" id="nameCompany" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder={t("namePlaceholder")} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("emailLabel")} <span className="text-red-500">*</span>
                    </label>
                    <input required type="email" id="email" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder={t("emailPlaceholder")} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("phoneLabel")} <span className="text-red-500">*</span>
                    </label>
                    <input required type="tel" id="phone" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder={t("phonePlaceholder")} />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("fileLabel")}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex justify-center text-sm text-gray-600 mt-4">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-red-500 hover:text-red-600 focus-within:outline-none">
                          <span>{t("fileSelect")}</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf,.doc,.docx,.txt,.xls,.xlsx" />
                        </label>
                        <p className="pl-1">{t("fileDrag")}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{t("fileTypes")}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("messageLabel")}
                  </label>
                  <textarea id="message" rows={6} className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none" placeholder={t("messagePlaceholder")}></textarea>
                </div>

                <div>
                  <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-10 rounded transition-colors duration-300 w-full sm:w-auto shadow-sm">
                    {t("submitButton")}
                  </button>
                </div>
                
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}