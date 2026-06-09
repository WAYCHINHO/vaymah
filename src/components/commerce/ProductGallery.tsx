"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <>
      <div className="relative overflow-hidden border border-[#b9874d]/20 bg-[#080504]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(218,150,74,0.34),transparent_38%),linear-gradient(180deg,transparent,#050302_92%)]" />
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="relative grid min-h-[620px] w-full place-items-center"
          aria-label="Увеличить фото товара"
        >
          <Image
            src={activeImage}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-contain p-8 drop-shadow-[0_42px_120px_rgba(0,0,0,0.78)] transition duration-500 hover:scale-[1.02]"
            priority
          />
        </button>
        <div className="relative z-10 grid grid-cols-4 gap-2 border-t border-[#b9874d]/18 bg-black/20 p-3 md:grid-cols-7">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square overflow-hidden border transition ${
                activeIndex === index ? "border-[#e8c08b]" : "border-[#b9874d]/20"
              }`}
              aria-label={`Показать фото ${index + 1}`}
            >
              <Image src={image} alt={`${name}, фото ${index + 1}`} fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {zoomed && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/88 p-5 backdrop-blur-sm" onClick={() => setZoomed(false)}>
          <button
            type="button"
            className="absolute right-5 top-5 border border-[#b9874d]/35 px-4 py-3 text-xs uppercase tracking-[0.2em] text-[#f4e1c8]"
            onClick={() => setZoomed(false)}
          >
            Закрыть
          </button>
          <div className="relative h-[86vh] w-[min(92vw,1100px)]" onClick={(event) => event.stopPropagation()}>
            <Image src={activeImage} alt={name} fill sizes="92vw" className="object-contain" priority />
          </div>
        </div>
      )}
    </>
  );
}
