"use client";

import {Download, ExternalLink, FileSpreadsheet, FileText, FileType} from "lucide-react";
import {useMemo, useState} from "react";
import type {ProductDocument} from "@/lib/api/products";

const fileIcons = {
  PDF: FileText,
  DOC: FileType,
  XLS: FileSpreadsheet,
  FILE: FileText,
};

export function ProductDocumentsPreview({
  documents,
  labels,
}: {
  documents: ProductDocument[];
  labels: {
    open: string;
    download: string;
    previewUnavailable: string;
  };
}) {
  const availableDocuments = useMemo(
    () => documents.filter((document) => document.href),
    [documents],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedDocument = availableDocuments[selectedIndex] ?? availableDocuments[0];

  if (!selectedDocument) return null;

  const SelectedIcon = fileIcons[selectedDocument.format];
  const hasPdfPreview = selectedDocument.format === "PDF" && selectedDocument.previewUrl;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-white px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-500">
              {selectedDocument.format}
              {selectedDocument.size ? ` / ${selectedDocument.size}` : ""}
            </p>
            <h3 className="mt-1 truncate text-lg font-bold text-slate-900">
              {selectedDocument.title}
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={selectedDocument.href}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-10 place-items-center rounded-full border border-gray-200 bg-white text-slate-700 transition hover:border-red-200 hover:text-red-500"
              aria-label={labels.open}
              title={labels.open}
            >
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
            <a
              href={selectedDocument.href}
              download
              className="grid size-10 place-items-center rounded-full bg-red-500 text-white transition hover:bg-red-600"
              aria-label={labels.download}
              title={labels.download}
            >
              <Download className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative flex min-h-[360px] items-center justify-center bg-white p-4">
          {hasPdfPreview ? (
            <iframe
              src={selectedDocument.previewUrl}
              title={selectedDocument.title}
              className="h-[420px] w-full rounded-md border border-gray-100 bg-white"
            />
          ) : (
            <div className="flex min-h-[320px] w-full flex-col items-center justify-center rounded-md border border-dashed border-gray-200 bg-gray-50 px-6 text-center">
              <span className="grid size-20 place-items-center rounded-full bg-white text-red-500 shadow-sm">
                <SelectedIcon className="size-9" aria-hidden="true" />
              </span>
              <h4 className="mt-5 max-w-md text-xl font-bold text-slate-900">
                {selectedDocument.title}
              </h4>
              {selectedDocument.description ? (
                <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
                  {selectedDocument.description}
                </p>
              ) : (
                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  {labels.previewUnavailable}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {availableDocuments.map((document, index) => {
          const Icon = fileIcons[document.format];
          const selected = index === selectedIndex;

          return (
            <button
              key={document.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`flex min-h-24 items-center gap-4 rounded-lg border bg-white p-4 text-start transition ${
                selected
                  ? "border-red-500 shadow-[0_14px_30px_rgba(239,68,68,0.12)]"
                  : "border-gray-100 hover:border-red-200 hover:shadow-sm"
              }`}
            >
              <span
                className={`grid size-12 shrink-0 place-items-center rounded-md ${
                  selected ? "bg-red-500 text-white" : "bg-gray-50 text-slate-700"
                }`}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-slate-900">
                  {document.title}
                </span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                  {document.format}
                  {document.size ? ` / ${document.size}` : ""}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
