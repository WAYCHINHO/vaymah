"use client";

import { contacts } from "@/data/contacts";
import { featuredFragrance, formatCurrency, fragrances } from "@/data/products";
import { ArrowUpRight, Check, Mail, MapPin, Menu, MessageCircle, Phone, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/cart", label: "Корзина" },
  { href: "/account", label: "Личный кабинет" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contact", label: "Контакты" }
];

const originality = [
  "только оригинал",
  "запечатанные коробки",
  "проверенные поставщики",
  "безопасная доставка"
];

const orderSteps = [
  { title: "Выберите аромат", text: "Откройте карточку товара и уточните наличие." },
  { title: "Оплатите переводом", text: `Реквизиты для оплаты: ${contacts.phoneLabel}.` },
  { title: "Отправьте чек", text: "Пришлите подтверждение в WhatsApp или Telegram." },
  { title: "Получите трек-номер", text: "После подтверждения оплаты заказ переходит в обработку." }
];

const reviews = [
  "Флакон пришёл запечатанным, упаковка выглядела дорого, а общение было спокойным.",
  "Blonde Amber ощущался как покупка в бутике, а не как обычный заказ в интернете.",
  "У VayMah есть атмосфера: видно, что нишевую парфюмерию здесь подают бережно."
];

export function Storefront() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="relative min-h-screen overflow-hidden bg-[#080403] text-[#f7ead8]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_52%_38%,rgba(218,139,62,0.38),transparent_28%),radial-gradient(circle_at_50%_82%,rgba(232,192,139,0.18),transparent_24%),linear-gradient(115deg,#050202_0%,#1b0d07_46%,#070302_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-35 [background-image:linear-gradient(rgba(232,192,139,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(232,192,139,0.06)_1px,transparent_1px)] [background-size:128px_128px]" />

      <header className="absolute left-0 right-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-10">
          <Link data-reveal href="/" className="flex items-center gap-4 transition hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8c08b]">
            <span className="grid h-[52px] w-[52px] place-items-center border border-[#d7ad7a]/60 bg-black/25 text-base font-semibold tracking-[0.08em]">
              VM
            </span>
            <span className="font-display text-2xl uppercase tracking-[0.34em] text-[#f6dfc4]">VayMah</span>
          </Link>

          <nav data-reveal className="hidden items-center gap-8 text-xs uppercase tracking-[0.26em] text-[#ead8bf]/78 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="cursor-pointer transition hover:text-[#fff2dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8c08b]">
                {item.label}
              </Link>
            ))}
          </nav>

          <div data-reveal className="flex items-center gap-3">
            <Link href="/account" aria-label="Личный кабинет" className="grid h-10 w-10 cursor-pointer place-items-center border border-[#b9874d]/35 bg-[#160f0a]/75 text-[#f1dac2] transition hover:border-[#e8c08b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8c08b]">
              <span className="text-xs font-semibold tracking-[0.08em]">ЛК</span>
            </Link>
            <Link href="/cart" aria-label="Корзина" className="grid h-10 w-10 cursor-pointer place-items-center bg-[#c79a63] text-[#100905] transition hover:bg-[#e8c08b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f8ead8]">
              <ShoppingBag size={18} />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              className="grid h-10 w-10 cursor-pointer place-items-center border border-[#b9874d]/35 bg-[#160f0a]/75 text-[#f1dac2] transition hover:border-[#e8c08b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8c08b]"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setMenuOpen(false)}>
          <aside className="ml-auto h-full w-[min(88vw,390px)] border-l border-[#b9874d]/25 bg-[#0d0704] p-6" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="font-display text-xl uppercase tracking-[0.34em] text-[#ead8bf]">VayMah</span>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню" className="grid h-10 w-10 cursor-pointer place-items-center border border-[#b9874d]/35 text-[#f1dac2] transition hover:border-[#e8c08b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8c08b]">
                <X size={18} />
              </button>
            </div>
            <nav className="mt-12 grid gap-3">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="cursor-pointer border-b border-[#b9874d]/16 py-4 text-lg tracking-[0.08em] text-[#f4e1c8] transition hover:text-[#e8c08b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8c08b]">
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <section className="relative z-10 grid min-h-screen items-center px-5 pb-16 pt-28 md:px-10">
        <div className="font-display pointer-events-none absolute left-1/2 top-[9vh] -translate-x-1/2 select-none whitespace-nowrap text-[22vw] font-medium uppercase leading-none text-[#ffe0ba]/[0.15]">
          VAYMAH
        </div>
        <div className="mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-reveal className="relative order-2 lg:order-1">
            <p className="text-xs uppercase tracking-[0.42em] text-[#d8a867]">Оригинальная парфюмерия</p>
            <h1 className="mt-5 max-w-3xl text-[clamp(3.4rem,8vw,8.8rem)] font-semibold leading-[0.86] text-[#fff3df]">
              {featuredFragrance.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#f0d6b7]/78">{featuredFragrance.description}</p>
            <p className="mt-6 text-2xl font-semibold text-[#e8c08b]">{formatCurrency(featuredFragrance.price, featuredFragrance.currency)}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/catalog/${featuredFragrance.id}`} className="inline-flex h-12 cursor-pointer items-center justify-center gap-3 bg-[#e8c08b] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-[#120905] transition hover:bg-[#f5d5a4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f8ead8]">
                Купить
                <ArrowUpRight size={17} />
              </Link>
              <a href={contacts.whatsappHref} className="inline-flex h-12 cursor-pointer items-center justify-center gap-3 border border-[#d7ad7a]/45 bg-black/20 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-[#f4e1c8] transition hover:border-[#e8c08b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8c08b]">
                <MessageCircle size={17} />
                WhatsApp
              </a>
            </div>
          </div>

          <div data-reveal className="relative order-1 min-h-[470px] lg:order-2 lg:min-h-[720px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(248,183,102,0.42),rgba(154,76,26,0.14)_44%,transparent_70%)] blur-3xl" />
            <Image
              src={featuredFragrance.images[0]}
              alt={featuredFragrance.name}
              fill
              priority
              sizes="(max-width: 768px) 96vw, 48vw"
              className="object-contain drop-shadow-[0_55px_130px_rgba(0,0,0,0.82)]"
            />
          </div>
        </div>
      </section>

      <section id="authenticity" className="relative z-10 px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p data-reveal className="text-xs uppercase tracking-[0.42em] text-[#b9874d]">Оригинальная парфюмерия</p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {originality.map((item) => (
              <div data-reveal key={item} className="border border-[#b9874d]/20 bg-black/18 p-6">
                <Check size={20} className="text-[#e8c08b]" />
                <p className="mt-8 text-xl font-semibold text-[#f7ead8]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="best" className="relative z-10 border-y border-[#b9874d]/15 bg-[#110804]/70 px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div data-reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.42em] text-[#b9874d]">Популярные ароматы</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[#f5e5d0] md:text-6xl">Выберите аромат VayMah.</h2>
            </div>
            <Link href="/catalog" className="inline-flex h-12 cursor-pointer items-center justify-center gap-3 border border-[#e8c08b]/45 px-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#f7ead8] transition hover:border-[#e8c08b]">
              Весь каталог
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {fragrances.slice(0, 3).map((fragrance) => (
              <article data-reveal key={fragrance.id} className="border border-[#b9874d]/20 bg-[#0b0503]/75 p-4">
                <div className="relative aspect-[4/5] bg-[radial-gradient(circle,rgba(232,192,139,0.22),transparent_64%)]">
                  <Image src={fragrance.images[0]} alt={fragrance.name} fill sizes="(max-width: 768px) 90vw, 28vw" className="object-contain p-5 drop-shadow-[0_32px_80px_rgba(0,0,0,0.7)]" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-[#f7ead8]">{fragrance.name}</h3>
                  <span className="text-sm text-[#e8c08b]">{formatCurrency(fragrance.price, fragrance.currency)}</span>
                </div>
                <Link href={`/catalog/${fragrance.id}`} className="mt-6 inline-flex h-11 cursor-pointer items-center gap-3 bg-[#e8c08b] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#120905] transition hover:bg-[#f5d5a4]">
                  Подробнее
                  <ArrowUpRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="relative z-10 px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p data-reveal className="text-xs uppercase tracking-[0.42em] text-[#b9874d]">Как оформить заказ</p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {orderSteps.map((step, index) => (
              <div data-reveal key={step.title} className="border-t border-[#b9874d]/30 pt-6">
                <span className="text-sm text-[#e8c08b]">Шаг {index + 1}</span>
                <h3 className="mt-4 text-2xl font-semibold text-[#f7ead8]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#d9c3ab]/68">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="relative z-10 px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p data-reveal className="text-xs uppercase tracking-[0.42em] text-[#b9874d]">Отзывы</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <article data-reveal key={review} className="border border-[#b9874d]/18 bg-black/18 p-6">
                <p className="text-4xl text-[#b9874d]/45">&quot;</p>
                <p className="mt-4 text-sm leading-7 text-[#d9c3ab]/72">{review}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 border-t border-[#b9874d]/15 px-5 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div data-reveal>
            <p className="text-xs uppercase tracking-[0.42em] text-[#b9874d]">Контакты</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-[#f5e5d0] md:text-6xl">Напишите VayMah, чтобы уточнить наличие и оформить заказ.</h2>
          </div>
          <div data-reveal className="grid min-w-0 gap-3 border border-[#b9874d]/22 bg-[#0e0805]/70 p-5 sm:min-w-[360px]">
            <ContactRow icon={<Phone size={16} />} label="Телефон" href={contacts.phoneHref} value={contacts.phoneLabel} />
            <ContactRow icon={<MessageCircle size={16} />} label="WhatsApp" href={contacts.whatsappHref} value={contacts.phoneLabel} />
            <ContactRow icon={<MessageCircle size={16} />} label="Telegram" href={contacts.telegramHref} value={contacts.telegramLabel} />
            <ContactRow icon={<Mail size={16} />} label="Почта" href={contacts.emailHref} value={contacts.emailLabel} />
            <div className="flex items-start gap-3 pt-1 text-sm leading-6 text-[#f4e1c8]">
              <MapPin size={16} className="mt-1 shrink-0 text-[#c79a63]" />
              <span className="text-[#d9c3ab]/70">{contacts.address}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactRow({ icon, label, href, value }: { icon: ReactNode; label: string; href: string; value: string }) {
  return (
    <a href={href} className="flex min-w-0 cursor-pointer items-center justify-between gap-5 border-b border-[#b9874d]/14 pb-3 text-sm text-[#f4e1c8] transition hover:text-[#e8c08b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8c08b]">
      <span className="inline-flex items-center gap-2">
        <span className="text-[#c79a63]">{icon}</span>
        {label}
      </span>
      <span className="break-words text-right text-[#d9c3ab]/70">{value}</span>
    </a>
  );
}
