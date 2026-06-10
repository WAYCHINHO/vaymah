import { formatCurrency, type Fragrance } from "@/data/products";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FragranceCard({ fragrance, index }: { fragrance: Fragrance; index: number }) {
  return (
    <article className="luxury-glass luxury-hover group p-3">
      <div className="relative grid aspect-[4/4.45] place-items-center overflow-hidden bg-[#090604]/86">
        <span className="luxury-badge absolute left-2.5 top-2.5 z-10 px-2 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-[#d6aa73]/90">
          {fragrance.badge}
        </span>
        <span className="absolute right-2.5 top-2.5 text-[0.68rem] text-[#d8bea1]/45">0{index + 1}</span>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(216,155,83,0.2),transparent_38%)]" />
        <div className="relative h-[72%] w-[72%] transition duration-300 ease-out group-hover:scale-[1.045] group-active:scale-[1.025]">
          <Image
            src={fragrance.images[0]}
            alt={fragrance.fullName}
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, (max-width: 1399px) 30vw, 22vw"
            className="object-contain drop-shadow-[0_24px_58px_rgba(0,0,0,0.65)]"
          />
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#b9874d]">{fragrance.house}</p>
          <h2 className="mt-1.5 text-lg font-semibold leading-tight text-[#f7ead8]">{fragrance.name}</h2>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold text-[#e8c08b]">{formatCurrency(fragrance.price, fragrance.currency)}</p>
          {fragrance.oldPrice ? (
            <p className="mt-0.5 text-[0.68rem] text-[#d8bea1]/45 line-through">{formatCurrency(fragrance.oldPrice, fragrance.currency)}</p>
          ) : null}
        </div>
      </div>

      <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#d9c3ab]/70">{fragrance.description}</p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-[0.68rem] uppercase tracking-[0.16em] text-[#d8bea1]/45">{fragrance.size}</span>
        <button type="button" className="luxury-button inline-flex h-9 cursor-pointer items-center gap-2 px-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em]">
          <ShoppingBag size={13} />
          В корзину
        </button>
      </div>

      <Link className="luxury-hover mt-3 inline-flex cursor-pointer items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-[#d7ad7a]/75 hover:text-[#e8c08b]" href={`/catalog/${fragrance.id}`}>
        Подробнее
        <ArrowUpRight size={13} />
      </Link>
    </article>
  );
}
