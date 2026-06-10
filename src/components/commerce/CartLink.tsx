"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type CartLine = {
  fragranceId: string;
  quantity: number;
};

const CART_KEY = "vaymah-cart";
const CART_EVENT = "vaymah-cart-updated";

export function CartLink({ className = "" }: { className?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => setCount(readCartCount());

    updateCount();
    window.addEventListener("storage", updateCount);
    window.addEventListener(CART_EVENT, updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener(CART_EVENT, updateCount);
    };
  }, []);

  return (
    <Link
      className={`luxury-button relative grid h-10 w-10 cursor-pointer place-items-center ${className}`}
      href="/cart"
      aria-label={`Корзина${count ? `, товаров: ${count}` : ""}`}
    >
      <ShoppingBag size={18} />
      {count > 0 ? (
        <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full border border-[#fff1c8]/45 bg-[#f0bf65] px-1 text-[0.62rem] font-bold leading-none text-[#130905] shadow-[0_0_18px_rgba(232,192,139,0.32)]">
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </Link>
  );
}

function readCartCount() {
  try {
    const stored = window.localStorage.getItem(CART_KEY);
    if (!stored) return 0;

    const parsed = JSON.parse(stored) as CartLine[];
    if (!Array.isArray(parsed)) return 0;

    return parsed.reduce((sum, line) => sum + Math.max(0, Number(line.quantity) || 0), 0);
  } catch {
    window.localStorage.removeItem(CART_KEY);
    return 0;
  }
}
