"use client";

import { useState } from "react";

export default function ContactForm({ dict }: { dict: Record<string, string> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8001";
      
      const res = await fetch(`${baseUrl}/api/v1/contact/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Backend veriyi reddetti. Hata kodu:", res.status);
        setStatus("error");
      }
    } catch (error) {
      console.error("Kargocu adresi bulamadı:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{dict.nameLabel}</label>
          <input 
            type="text" 
            id="name" 
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-gray-50" 
            placeholder={dict.namePlaceholder} 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{dict.emailLabel}</label>
          <input 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-gray-50" 
            placeholder={dict.emailPlaceholder} 
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{dict.messageLabel}</label>
        <textarea 
          id="message" 
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none flex-1 min-h-[150px] disabled:bg-gray-50" 
          placeholder={dict.messagePlaceholder}
        ></textarea>
      </div>

      <div className="mt-auto">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded transition-colors duration-300 w-full sm:w-auto flex items-center justify-center"
        >
          {isSubmitting ? (
             <span className="inline-block animate-spin mr-2">⟳</span>
          ) : null}
          {isSubmitting ? dict.sending : dict.submitButton}
        </button>
      </div>
    </form>
  );
}