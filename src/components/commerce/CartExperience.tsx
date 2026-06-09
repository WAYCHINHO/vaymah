"use client";

import { contacts } from "@/data/contacts";
import { cartPreview, formatCurrency, fragrances } from "@/data/products";
import { Copy, Mail, MessageCircle, Minus, Phone, Plus, ReceiptText, ShieldCheck, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type CartLine = {
  fragranceId: string;
  quantity: number;
};

const shippingOptions = [
  { id: "chechnya", label: "Доставка по Чечне", price: 0, detail: "Бесплатно, после подтверждения оплаты" },
  { id: "russia", label: "Доставка по России", price: 0, detail: "Стоимость и срок уточним перед отправкой" }
] as const;

const receiptChannels = [
  { label: "WhatsApp", value: contacts.phoneLabel, href: contacts.whatsappHref, icon: MessageCircle },
  { label: "Telegram", value: contacts.telegramLabel, href: contacts.telegramHref, icon: MessageCircle },
  { label: "Почта", value: contacts.emailLabel, href: contacts.emailHref, icon: Mail }
] as const;

export function CartExperience() {
  const [lines, setLines] = useState<CartLine[]>(cartPreview);
  const [shippingId, setShippingId] = useState<(typeof shippingOptions)[number]["id"]>("chechnya");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("vaymah-cart");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as CartLine[];
      if (Array.isArray(parsed)) setLines(parsed);
    } catch {
      window.localStorage.removeItem("vaymah-cart");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("vaymah-cart", JSON.stringify(lines));
  }, [lines]);

  const items = useMemo(() => {
    return lines
      .map((line) => {
        const fragrance = fragrances.find((entry) => entry.id === line.fragranceId);
        return fragrance ? { ...line, fragrance } : null;
      })
      .filter(Boolean) as Array<CartLine & { fragrance: (typeof fragrances)[number] }>;
  }, [lines]);

  const selectedShipping = shippingOptions.find((option) => option.id === shippingId) ?? shippingOptions[0];
  const subtotal = items.reduce((sum, item) => sum + item.fragrance.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.08) : 0;
  const total = Math.max(0, subtotal - discount + selectedShipping.price);

  function updateQuantity(fragranceId: string, change: number) {
    setLines((current) =>
      current
        .map((line) =>
          line.fragranceId === fragranceId
            ? { ...line, quantity: Math.max(0, line.quantity + change) }
            : line
        )
        .filter((line) => line.quantity > 0)
    );
  }

  function removeLine(fragranceId: string) {
    setLines((current) => current.filter((line) => line.fragranceId !== fragranceId));
  }

  function applyPromo() {
    setPromoApplied(promo.trim().toUpperCase() === "VAYMAH8");
  }

  async function copyPaymentDetails() {
    const details = [
      "VayMah: оплата переводом",
      `Реквизиты: ${contacts.phoneLabel}`,
      `Сумма заказа: ${formatCurrency(total)}`,
      "После оплаты отправьте чек:",
      `WhatsApp: ${contacts.phoneLabel}`,
      `Telegram: ${contacts.telegramLabel}`,
      `Почта: ${contacts.emailLabel}`,
      `Адрес: ${contacts.address}`
    ].join("\n");

    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="mx-auto grid max-w-[1500px] gap-8 px-5 py-16 md:px-10 lg:grid-cols-[1fr_420px]">
      <div>
        <p className="text-xs uppercase tracking-[0.44em] text-[#b9874d]">Корзина</p>
        <h1 className="mt-5 text-5xl font-semibold text-[#f7ead8] md:text-7xl">Ваш заказ VayMah.</h1>

        {items.length === 0 ? (
          <div className="mt-10 border border-[#b9874d]/20 bg-[#100a07]/70 p-8">
            <p className="text-2xl font-semibold text-[#f4e1c8]">Корзина пока пуста.</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#d9c3ab]/65">
              Добавьте аромат из каталога, чтобы оформить персональный заказ VayMah.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-4">
            {items.map((item) => (
              <article key={item.fragrance.id} className="grid gap-4 border border-[#b9874d]/20 bg-[#100a07]/70 p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                <div className="relative aspect-square overflow-hidden bg-black">
                  <Image src={item.fragrance.images[0]} alt={item.fragrance.name} fill sizes="120px" className="object-contain p-2" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#b9874d]">{item.fragrance.house}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#f7ead8]">{item.fragrance.name}</h2>
                  <p className="mt-2 text-sm text-[#d9c3ab]/60">
                    {item.fragrance.size} / {item.fragrance.concentration} / {item.fragrance.collection}
                  </p>
                  <button
                    onClick={() => removeLine(item.fragrance.id)}
                    className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#d7ad7a]/65 transition hover:text-[#e8c08b]"
                  >
                    <Trash2 size={13} />
                    Удалить
                  </button>
                </div>
                <div className="flex items-center justify-between gap-6 md:block md:text-right">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.fragrance.id, -1)} className="grid h-9 w-9 place-items-center border border-[#b9874d]/20" aria-label="Уменьшить количество">
                      <Minus size={14} />
                    </button>
                    <span className="grid h-9 w-9 place-items-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.fragrance.id, 1)} className="grid h-9 w-9 place-items-center border border-[#b9874d]/20" aria-label="Увеличить количество">
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="mt-0 text-lg font-semibold text-[#f4e1c8] md:mt-4">
                    {formatCurrency(item.fragrance.price * item.quantity)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <aside className="h-fit border border-[#b9874d]/25 bg-[#120c08]/80 p-5">
        <p className="text-xs uppercase tracking-[0.36em] text-[#b9874d]">Оформление заказа</p>

        <div className="mt-6 grid gap-3">
          {shippingOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setShippingId(option.id)}
              className={`border p-4 text-left transition ${
                shippingId === option.id
                  ? "border-[#e8c08b] bg-[#21140c]"
                  : "border-[#b9874d]/18 bg-black/15"
              }`}
            >
              <span className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-[#f4e1c8]">{option.label}</span>
                <span className="text-sm text-[#d8bea1]/70">{option.price === 0 ? "Включено" : formatCurrency(option.price)}</span>
              </span>
              <span className="mt-2 block text-xs text-[#d9c3ab]/52">{option.detail}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto] gap-2">
          <input
            value={promo}
            onChange={(event) => {
              setPromo(event.target.value);
              setPromoApplied(false);
            }}
            placeholder="VAYMAH8"
            className="h-11 min-w-0 border border-[#b9874d]/20 bg-black/25 px-3 text-sm text-[#f4e1c8] outline-none placeholder:text-[#d9c3ab]/35"
          />
          <button onClick={applyPromo} className="h-11 bg-[#e8c08b] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#120905]">
            Применить
          </button>
        </div>
        {promo && (
          <p className={`mt-2 text-xs ${promoApplied ? "text-[#d7ad7a]" : "text-[#d9c3ab]/45"}`}>
            {promoApplied ? "Промокод применён." : "Используйте VAYMAH8 для клиентской скидки."}
          </p>
        )}

        <div className="mt-6 grid gap-4 text-sm text-[#d9c3ab]/70">
          <div className="flex justify-between"><span>Товары</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="flex justify-between"><span>Промокод</span><span>{discount ? `-${formatCurrency(discount)}` : formatCurrency(0)}</span></div>
          <div className="flex justify-between"><span>Доставка</span><span>{selectedShipping.price ? formatCurrency(selectedShipping.price) : "Включено"}</span></div>
        </div>
        <div className="mt-6 border-t border-[#b9874d]/20 pt-5">
          <div className="flex justify-between text-xl font-semibold text-[#f7ead8]"><span>Итого</span><span>{formatCurrency(total)}</span></div>
          <div className="mt-6 overflow-hidden border border-[#c79a63]/28 bg-[linear-gradient(145deg,rgba(36,21,12,0.96),rgba(13,8,5,0.98)_62%,rgba(95,57,30,0.34))]">
            <div className="border-b border-[#c79a63]/18 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center border border-[#e8c08b]/35 bg-[#e8c08b]/10 text-[#e8c08b]">
                  <ReceiptText size={17} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-[#b9874d]">Оплата</p>
                  <h3 className="mt-1 text-lg font-semibold text-[#f7ead8]">Оплата переводом.</h3>
                </div>
              </div>
            </div>

            <div className="px-5 py-5">
              <p className="text-xs uppercase tracking-[0.26em] text-[#d7ad7a]/70">Реквизиты для оплаты</p>
              <div className="mt-3 flex items-center justify-between gap-4 border border-[#e8c08b]/18 bg-black/24 px-4 py-3">
                <a href={contacts.phoneHref} className="text-xl font-semibold text-[#f7ead8] transition hover:text-[#e8c08b]">{contacts.phoneLabel}</a>
                <button
                  onClick={copyPaymentDetails}
                  className="grid h-9 w-9 shrink-0 place-items-center border border-[#d7ad7a]/35 text-[#e8c08b] transition hover:bg-[#e8c08b] hover:text-[#120905]"
                  aria-label="Скопировать реквизиты"
                >
                  <Copy size={15} />
                </button>
              </div>
              {copied && <p className="mt-2 text-xs text-[#e8c08b]">Реквизиты и сумма заказа скопированы.</p>}

              <div className="mt-5 border-t border-[#c79a63]/16 pt-5">
                <p className="text-xs uppercase tracking-[0.26em] text-[#d7ad7a]/70">После оплаты отправьте чек</p>
                <div className="mt-3 grid gap-2">
                  {receiptChannels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <a key={channel.label} href={channel.href} className="flex min-w-0 items-center justify-between gap-4 bg-[#080504]/45 px-3 py-2.5 text-sm transition hover:text-[#e8c08b]">
                        <span className="inline-flex items-center gap-2 text-[#f4e1c8]">
                          <Icon size={14} className="text-[#c79a63]" />
                          {channel.label}
                        </span>
                        <span className="break-words text-right font-medium text-[#d9c3ab]/72">{channel.value}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 bg-[#e8c08b]/8 px-4 py-3 text-xs leading-5 text-[#d9c3ab]/68">
                После подтверждения оплаты заказ переводится в обработку. VayMah сверит чек, зафиксирует резерв и подготовит оригинальную парфюмерию к отправке.
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-3 text-xs leading-5 text-[#d9c3ab]/60">
          <ContactLine icon={<Phone size={15} />} href={contacts.phoneHref} value={contacts.phoneLabel} />
          <ContactLine icon={<MessageCircle size={15} />} href={contacts.whatsappHref} value={`WhatsApp: ${contacts.phoneLabel}`} />
          <ContactLine icon={<MessageCircle size={15} />} href={contacts.telegramHref} value={`Telegram: ${contacts.telegramLabel}`} />
          <ContactLine icon={<Mail size={15} />} href={contacts.emailHref} value={contacts.emailLabel} />
          <div className="flex items-start gap-3">
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#c79a63]" />
            {contacts.address}
          </div>
        </div>
      </aside>
    </section>
  );
}

function ContactLine({ icon, href, value }: { icon: ReactNode; href: string; value: string }) {
  return (
    <a href={href} className="flex min-w-0 items-center gap-3 transition hover:text-[#e8c08b]">
      <span className="shrink-0 text-[#c79a63]">{icon}</span>
      <span className="break-words">{value}</span>
    </a>
  );
}
