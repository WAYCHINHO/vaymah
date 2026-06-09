"use client";

import { formatCurrency, fragrances } from "@/data/products";
import { BarChart3, Boxes, CircleDollarSign, Search, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";

type AdminStatus = "Опубликован" | "Черновик" | "Приватный";
type AdminProduct = (typeof fragrances)[number] & {
  status: AdminStatus;
};

export function AdminExperience() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<AdminProduct[]>(
    fragrances.map((fragrance, index) => ({
      ...fragrance,
      status: index === 1 ? "Приватный" : index === 3 ? "Черновик" : "Опубликован"
    }))
  );

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;

    return products.filter((product) =>
      [product.name, product.house, product.collection, product.status].some((field) =>
        field.toLowerCase().includes(normalized)
      )
    );
  }, [products, query]);

  const stock = products.reduce((sum, item) => sum + item.inventory, 0);
  const value = products.reduce((sum, item) => sum + item.inventory * item.price, 0);

  function updateInventory(productId: string, change: number) {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, inventory: Math.max(0, product.inventory + change) }
          : product
      )
    );
  }

  function cycleStatus(productId: string) {
    const order: AdminStatus[] = ["Опубликован", "Приватный", "Черновик"];
    setProducts((current) =>
      current.map((product) => {
        if (product.id !== productId) return product;
        const next = order[(order.indexOf(product.status) + 1) % order.length];
        return { ...product, status: next };
      })
    );
  }

  return (
    <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-10">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.44em] text-[#b9874d]">Админ-панель</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.94] text-[#f7ead8] md:text-7xl">
            Управление магазином VayMah.
          </h1>
        </div>
        <button className="h-12 bg-[#e8c08b] px-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#120905]">
          Опубликовать подборку
        </button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {[
          { icon: Boxes, label: "В наличии", value: `${stock} шт.` },
          { icon: CircleDollarSign, label: "Стоимость склада", value: formatCurrency(value) },
          { icon: UsersRound, label: "Клиенты", value: "184" },
          { icon: BarChart3, label: "Конверсия", value: "8.4%" }
        ].map((item) => (
          <div key={item.label} className="border border-[#b9874d]/20 bg-[#100a07]/70 p-5">
            <item.icon size={20} className="text-[#c79a63]" />
            <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[#d8bea1]/50">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-[#f4e1c8]">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3 border border-[#b9874d]/20 bg-[#100a07]/70 px-4">
        <Search size={17} className="text-[#c79a63]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Поиск по товару, бренду, коллекции или статусу"
          className="h-12 flex-1 bg-transparent text-sm text-[#f4e1c8] outline-none placeholder:text-[#d9c3ab]/35"
        />
      </div>

      <section className="mt-6 overflow-x-auto border border-[#b9874d]/20 bg-[#110b08]/70">
        <div className="min-w-[920px]">
          <div className="grid grid-cols-[1.2fr_0.7fr_0.45fr_0.45fr_0.5fr] border-b border-[#b9874d]/20 p-4 text-xs uppercase tracking-[0.24em] text-[#b9874d]">
            <span>Товар</span>
            <span>Коллекция</span>
            <span>В наличии</span>
            <span>Цена</span>
            <span>Статус</span>
          </div>
          {visibleProducts.map((fragrance) => (
            <div key={fragrance.id} className="grid grid-cols-[1.2fr_0.7fr_0.45fr_0.45fr_0.5fr] items-center border-b border-[#b9874d]/15 p-4 text-sm last:border-b-0">
              <span className="font-semibold text-[#f4e1c8]">{fragrance.name}</span>
              <span className="text-[#d9c3ab]/60">{fragrance.collection}</span>
              <span className="flex items-center gap-2 text-[#d9c3ab]/70">
                <button onClick={() => updateInventory(fragrance.id, -1)} className="grid h-7 w-7 place-items-center border border-[#b9874d]/20">-</button>
                {fragrance.inventory}
                <button onClick={() => updateInventory(fragrance.id, 1)} className="grid h-7 w-7 place-items-center border border-[#b9874d]/20">+</button>
              </span>
              <span className="text-[#d9c3ab]/70">{formatCurrency(fragrance.price)}</span>
              <button onClick={() => cycleStatus(fragrance.id)} className="w-fit border border-[#b9874d]/20 px-3 py-2 text-xs uppercase tracking-[0.16em] text-[#f4e1c8]">
                {fragrance.status}
              </button>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
