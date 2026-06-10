"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type CartLine = {
  fragranceId: string;
  quantity: number;
};

type AddToCartButtonProps = {
  fragranceId: string;
  className?: string;
  compact?: boolean;
};

const CART_KEY = "vaymah-cart";
const CART_EVENT = "vaymah-cart-updated";

export function AddToCartButton({ fragranceId, className = "", compact = false }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const label = isAdded ? "Добавлено ✓" : compact ? "В корзину" : "Добавить в корзину";
  const Icon = isAdded ? Check : ShoppingBag;

  const baseClassName = useMemo(
    () =>
      [
        "luxury-button inline-flex cursor-pointer items-center justify-center gap-2 font-semibold uppercase",
        "transition duration-300 ease-out",
        compact ? "h-9 px-3 text-[0.68rem] tracking-[0.12em]" : "h-12 px-5 text-sm tracking-[0.14em]",
        isAdded ? "luxury-cart-added" : "",
        className
      ]
        .filter(Boolean)
        .join(" "),
    [className, compact, isAdded]
  );

  useEffect(() => {
    setIsAdded(hasProduct(fragranceId));

    function handleStorage(event: StorageEvent) {
      if (event.key === CART_KEY) {
        setIsAdded(hasProduct(fragranceId));
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [fragranceId]);

  function handleAdd() {
    const cart = readCart();
    const current = cart.find((line) => line.fragranceId === fragranceId);

    if (current) {
      current.quantity += 1;
    } else {
      cart.push({ fragranceId, quantity: 1 });
    }

    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new StorageEvent("storage", { key: CART_KEY }));
    window.dispatchEvent(new CustomEvent(CART_EVENT));
    setIsAdded(true);
    setPulseKey((value) => value + 1);
  }

  return (
    <button key={pulseKey} type="button" onClick={handleAdd} className={baseClassName} aria-live="polite">
      <Icon size={compact ? 13 : 17} />
      <span>{label}</span>
    </button>
  );
}

function hasProduct(fragranceId: string) {
  return readCart().some((line) => line.fragranceId === fragranceId && line.quantity > 0);
}

function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(CART_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored) as CartLine[];
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((line) => typeof line.fragranceId === "string" && typeof line.quantity === "number");
  } catch {
    window.localStorage.removeItem(CART_KEY);
    return [];
  }
}
