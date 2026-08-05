import {FileText} from "lucide-react";
import {notFound} from "next/navigation";
import type {Locale} from "@/i18n/routing";
import {getLegalDocument, legalDocuments} from "@/lib/data/legal";

export function generateStaticParams() {
  return legalDocuments.map((document) => ({slug: document.slug}));
}

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale: rawLocale, slug} = await params;
  const locale = rawLocale as Locale;
  const document = getLegalDocument(slug);

  if (!document) {
    notFound();
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-neutral-soft pt-36">
        <div className="absolute inset-x-0 top-0 h-36 bg-white" />
        <div className="relative mx-auto max-w-4xl px-5 pb-16 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-accent">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {document.kicker[locale]}
          </span>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-normal text-ink sm:text-5xl">
            {document.title[locale]}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-ink/62">
            {document.summary[locale]}
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
            {new Date(document.updated).toLocaleDateString(locale)}
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl space-y-10 px-5 sm:px-8">
          {document.sections.map((section) => (
            <article key={section.heading[locale]}>
              <h2 className="flex items-center gap-3 text-xl font-black text-ink">
                <FileText className="size-5 shrink-0 text-accent" aria-hidden="true" />
                {section.heading[locale]}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph[locale]} className="text-sm leading-7 text-ink/62">
                    {paragraph[locale]}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
