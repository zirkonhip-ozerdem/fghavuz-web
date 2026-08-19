"use client";

import { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";

export default function QuoteForm({ dict }: { dict: Record<string, string> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8001";

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("message", formData.message);

      if (selectedFile) {
        data.append("uploaded_file", selectedFile);
      }

      const res = await fetch(`${baseUrl}/api/v1/quote-requests`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setSelectedFile(null);
      } else {
        const errorData = await res.json();
        console.error("Backend reddetti, dönen hatalar:", errorData);
        setStatus("error");
      }
    } catch (error) {
      console.error("Teklif talebi gönderilirken hata oluştu:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {status === "success" && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-md flex items-center shadow-sm">
          <span className="mr-3 text-xl">✓</span>
          <p>{dict.successMessage}</p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md flex items-center shadow-sm">
          <span className="mr-3 text-xl">⚠</span>
          <p>{dict.errorMessage}</p>
        </div>
      )}

      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {dict.nameLabel} <span className="text-red-500">*</span>
        </label>
        <input
          required
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-gray-50"
          placeholder={dict.namePlaceholder}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {dict.emailLabel} <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-gray-50"
            placeholder={dict.emailPlaceholder}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {dict.phoneLabel} <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-gray-50"
            placeholder={dict.phonePlaceholder}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {dict.fileLabel}
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50 hover:bg-gray-100 transition-colors relative">
          <div className="space-y-1 text-center">
            {selectedFile ? (
              <div className="flex flex-col items-center">
                <FileText className="mx-auto h-12 w-12 text-green-600" />
                <p className="text-sm font-semibold text-slate-800 mt-2">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="mt-2 text-xs text-red-500 hover:underline"
                >
                  Dosyayı Kaldır
                </button>
              </div>
            ) : (
              <>
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex justify-center text-sm text-gray-600 mt-4">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-red-500 hover:text-red-600 focus-within:outline-none"
                  >
                    <span>{dict.fileSelect}</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.jpg,.jpeg,.png"
                    />
                  </label>
                  <p className="pl-1">{dict.fileDrag}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">{dict.fileTypes}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {dict.messageLabel} <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none disabled:bg-gray-50"
          placeholder={dict.messagePlaceholder}
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-10 rounded transition-colors duration-300 w-full sm:w-auto shadow-sm flex items-center justify-center"
        >
          {isSubmitting && (
            <span className="inline-block animate-spin mr-2">⟳</span>
          )}
          {isSubmitting ? dict.sending : dict.submitButton}
        </button>
      </div>
    </form>
  );
}