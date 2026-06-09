import { FragranceCard } from "@/components/commerce/FragranceCard";
import { PremiumChrome } from "@/components/layout/PremiumChrome";
import { fragrances } from "@/data/products";

export default function CatalogPage() {
  return (
    <PremiumChrome current="Каталог">
      <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.44em] text-[#b9874d]">Каталог VayMah</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.92] text-[#f7ead8] md:text-7xl">
              Только оригинальная парфюмерия в чистой подборке.
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#d9c3ab]/70">
            В каталоге сейчас только реальные позиции VayMah. Фото, цены и страницы товаров привязаны строго к своим ароматам, без смешивания изображений между брендами.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {fragrances.map((fragrance, index) => (
            <FragranceCard key={fragrance.id} fragrance={fragrance} index={index} />
          ))}
        </div>
      </section>
    </PremiumChrome>
  );
}
