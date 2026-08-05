"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col w-full h-full border-r border-gray-100">
      
      <div className="bg-gray-50 relative flex items-center justify-center p-8 h-[350px] md:h-[450px] group">
        <img
          src={images[currentIndex]}
          alt={`Ürün Görseli ${currentIndex + 1}`}
          className="object-contain w-full h-full transition-all duration-300"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-slate-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all hover:text-red-500 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-slate-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all hover:text-red-500 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4 p-6 bg-white border-t border-gray-100 mt-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative aspect-square rounded-md border-2 overflow-hidden bg-gray-50 transition-all ${
                currentIndex === idx ? "border-red-500 shadow-sm" : "border-transparent hover:border-red-200"
              }`}
            >
              <img src={img} alt={`Küçük Görsel ${idx + 1}`} className="object-contain w-full h-full p-2 hover:scale-105 transition-transform" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}