import { formatCurrency, type Fragrance } from "@/data/products";
import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FragranceCard({ fragrance, index }: { fragrance: Fragrance; index: number }) {
  return (
    <article className="group border border-[#b9874d]/20 bg-[#100a07]/70 p-4 transition duration-300 hover:border-[#d5ad78]/55 hover:bg-[#160e0a]/85">
      <div className="relative grid aspect-[4/5] place-items-center overflow-hidden bg-[#090604]">
        <span className="absolute left-3 top-3 z-10 text-[0.64rem] uppercase tracking-[0.22em] text-[#d6aa73]/80">
          {fragrance.badge}
        </span>
        <span className="absolute right-3 top-3 text-xs text-[#d8bea1]/45">0{index + 1}</span>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(216,155,83,0.22),transparent_36%)]" />
        <div className="relative h-[82%] w-[82%] transition duration-500 group-hover:scale-[1.03]">
          <Image
            src={fragrance.images[0]}
            alt={fragrance.fullName}
            fill
            sizes="(max-width: 768px) 90vw, 42vw"
            className="object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.65)]"
          />
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#b9874d]">{fragrance.house}</p>
          <h2 className="mt-2 text-xl font-semibold leading-tight text-[#f7ead8]">{fragrance.name}</h2>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold text-[#e8c08b]">{formatCurrency(fragrance.price, fragrance.currency)}</p>
          {fragrance.oldPrice ? (
            <p className="mt-1 text-xs text-[#d8bea1]/45 line-through">{formatCurrency(fragrance.oldPrice, fragrance.currency)}</p>
          ) : null}
        </div>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#d9c3ab]/70">{fragrance.description}</p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.18em] text-[#d8bea1]/45">{fragrance.size}</span>
        <button type="button" className="inline-flex h-10 cursor-pointer items-center gap-2 bg-[#e8c08b] px-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#120905] transition hover:bg-[#f5d5a4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f8ead8]">
          <Plus size={14} />
          Добавить
        </button>
      </div>

      <Link className="mt-4 inline-flex cursor-pointer items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d7ad7a]/75 transition hover:text-[#e8c08b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8c08b]" href={`/catalog/${fragrance.id}`}>
        Подробнее
        <ArrowUpRight size={14} />
      </Link>
    </article>
  );
}
