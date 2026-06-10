"use client";

import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { CartLink } from "@/components/commerce/CartLink";
import { contacts } from "@/data/contacts";
import { formatCurrency, fragrances } from "@/data/products";
import {
  ArrowUpRight,
  Check,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
  X
} from "lucide-react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "#authenticity", label: "Оригиналы" },
  { href: "#delivery", label: "Доставка" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contact", label: "Контакты" }
];

const originality = [
  "Только оригинал",
  "Запечатанные коробки",
  "Проверенные поставщики",
  "Безопасная доставка"
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

const heroProducts = [
  { id: "creed-absolu-aventus", className: "left-[5%] bottom-[13%] z-10 h-[56%] w-[28%] opacity-95 sm:left-[7%] md:left-[9%] md:bottom-[14%] md:h-[58%] lg:left-[8%] lg:h-[60%]" },
  { id: "blonde-amber", className: "left-[26%] bottom-[6%] z-30 h-[78%] w-[34%] sm:left-[28%] md:left-[30%] md:h-[82%] lg:left-[29%] lg:bottom-[5%] lg:h-[84%]" },
  { id: "tom-ford-grey-vetiver", className: "left-[52%] bottom-[12%] z-20 h-[62%] w-[28%] sm:left-[53%] md:left-[55%] md:h-[66%] lg:left-[54%] lg:h-[68%]" },
  { id: "kilian-back-to-black", className: "left-[72%] bottom-[14%] z-10 h-[55%] w-[25%] opacity-95 sm:left-[73%] md:left-[75%] md:h-[58%] lg:left-[74%] lg:h-[60%]" }
]
  .map((item) => ({
    ...item,
    fragrance: fragrances.find((fragrance) => fragrance.id === item.id)
  }))
  .filter((item): item is typeof item & { fragrance: (typeof fragrances)[number] } => Boolean(item.fragrance));

const heroBenefits = [
  {
    icon: ShieldCheck,
    title: "Оригинальность",
    text: "100% оригинальные ароматы"
  },
  {
    icon: Truck,
    title: "Быстрая доставка",
    text: "от 1 до 3 дней"
  },
  {
    icon: PackageCheck,
    title: "Премиальный сервис",
    text: "помощь с подбором ароматов"
  }
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
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_64%_38%,rgba(218,139,62,0.34),transparent_28%),radial-gradient(circle_at_50%_90%,rgba(232,192,139,0.18),transparent_26%),linear-gradient(115deg,#050202_0%,#1b0d07_46%,#070302_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(rgba(232,192,139,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(232,192,139,0.05)_1px,transparent_1px)] [background-size:128px_128px]" />

      <header className="absolute left-0 right-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-10">
          <Link data-reveal href="/" className="luxury-hover flex items-center gap-4">
            <span className="luxury-glass grid h-[52px] w-[52px] place-items-center text-base font-semibold tracking-[0.08em]">VM</span>
            <span className="font-display text-2xl uppercase tracking-[0.34em] text-[#f6dfc4]">VayMah</span>
          </Link>

          <nav data-reveal className="hidden items-center gap-8 text-xs uppercase tracking-[0.26em] text-[#ead8bf]/78 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="luxury-hover cursor-pointer px-1 py-2 hover:text-[#fff2dc]">
                {item.label}
              </Link>
            ))}
          </nav>

          <div data-reveal className="flex items-center gap-3">
            <Link href="/account" aria-label="Личный кабинет" className="luxury-glass luxury-hover grid h-10 w-10 cursor-pointer place-items-center text-[#f1dac2]">
              <span className="text-xs font-semibold tracking-[0.08em]">ЛК</span>
            </Link>
            <CartLink />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              className="luxury-glass luxury-hover grid h-10 w-10 cursor-pointer place-items-center text-[#f1dac2]"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setMenuOpen(false)}>
          <aside className="luxury-glass ml-auto h-full w-[min(88vw,390px)] border-y-0 border-r-0 p-6" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="font-display text-xl uppercase tracking-[0.34em] text-[#ead8bf]">VayMah</span>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню" className="luxury-glass luxury-hover grid h-10 w-10 cursor-pointer place-items-center text-[#f1dac2]">
                <X size={18} />
              </button>
            </div>
            <nav className="mt-12 grid gap-3">
              {[{ href: "/", label: "Главная" }, { href: "/catalog", label: "Каталог" }, { href: "/cart", label: "Корзина" }, { href: "/account", label: "Личный кабинет" }, { href: "#delivery", label: "Доставка" }, { href: "#contact", label: "Контакты" }].map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="luxury-hover cursor-pointer border-b border-[#b9874d]/16 py-4 text-lg tracking-[0.08em] text-[#f4e1c8] hover:text-[#e8c08b]">
                  {item.label}
                </Link>
              ))}
              <a
                href={contacts.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="luxury-glass luxury-hover mt-5 flex min-h-12 cursor-pointer items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#f4e1c8] hover:text-[#e8c08b]"
              >
                <Instagram size={17} className="text-[#e8c08b]" />
                Instagram — мой личный блог
              </a>
            </nav>
          </aside>
        </div>
      )}

      <section className="relative z-10 px-3 pb-6 pt-24 sm:px-5 md:px-10 lg:min-h-screen lg:pb-8 lg:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-20 h-[62vh] bg-[radial-gradient(ellipse_at_70%_54%,rgba(232,162,76,0.32),transparent_52%)] blur-2xl" />
        <div className="pointer-events-none absolute right-[-8vw] top-[18vh] h-[1px] w-[70vw] rotate-[-12deg] bg-gradient-to-r from-transparent via-[#e8c08b]/45 to-transparent" />
        <div className="pointer-events-none absolute right-[-12vw] top-[34vh] h-[1px] w-[72vw] rotate-[-16deg] bg-gradient-to-r from-transparent via-[#d0904e]/30 to-transparent" />

        <div className="luxury-glass relative mx-auto grid min-h-[calc(100svh-7rem)] max-w-[1500px] overflow-hidden px-4 py-5 sm:px-5 sm:py-7 md:px-10 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:px-12">
          <div className="pointer-events-none absolute inset-x-8 bottom-28 hidden h-px bg-gradient-to-r from-transparent via-[#e8c08b]/35 to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-x-8 bottom-24 hidden h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(232,192,139,0.08),rgba(0,0,0,0))] opacity-50 blur-sm lg:block" />

          <div data-reveal className="relative z-20 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.42em] text-[#d8a867]">VayMah</p>
            <h1 className="mt-4 max-w-3xl text-[clamp(2.7rem,14vw,7.6rem)] font-semibold leading-[0.86] text-[#fff3df]">
              Парфюмерия без компромиссов
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#f0d6b7]/76 sm:text-base md:text-lg md:leading-8">
              Только оригинальные ароматы от мировых парфюмерных домов. Доставка по всей России.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-8">
              <Link href="/catalog" className="luxury-button inline-flex h-12 cursor-pointer items-center justify-center gap-3 px-5 text-xs font-semibold uppercase tracking-[0.14em] sm:px-6 sm:text-sm sm:tracking-[0.16em]">
                Смотреть каталог
                <ArrowUpRight size={17} />
              </Link>
              <a href={contacts.whatsappHref} className="luxury-glass luxury-hover inline-flex h-12 cursor-pointer items-center justify-center gap-3 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f4e1c8] sm:px-6 sm:text-sm sm:tracking-[0.16em]">
                <MessageCircle size={17} />
                Написать в WhatsApp
              </a>
            </div>
          </div>

          <div data-reveal className="relative z-10 mt-6 min-h-[285px] sm:min-h-[360px] md:min-h-[440px] lg:mt-0 lg:min-h-[650px]">
            <div className="absolute inset-x-[1%] bottom-[14%] h-[62%] rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(232,192,139,0.34),rgba(150,82,36,0.15)_42%,transparent_72%)] blur-3xl" />
            <div className="absolute inset-x-[3%] bottom-[8%] h-[18%] rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(255,225,172,0.22),rgba(128,68,30,0.08)_50%,transparent_74%)] blur-xl" />
            <div className="absolute inset-x-[5%] bottom-[11%] h-px bg-gradient-to-r from-transparent via-[#f8d9a5]/65 to-transparent" />
            <div className="absolute inset-x-[8%] bottom-[4%] h-[17%] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(232,192,139,0.08),rgba(0,0,0,0))] opacity-55 blur-[1px]" />
            <div className="absolute inset-x-[10%] bottom-[6%] h-[12%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.62),transparent_70%)] blur-xl" />

            {heroProducts.map(({ fragrance, className }) => (
              <Link
                key={fragrance.id}
                href={`/catalog/${fragrance.id}`}
                className={`luxury-hover absolute ${className}`}
                aria-label={fragrance.fullName}
              >
                <Image
                  src={fragrance.images[0]}
                  alt={fragrance.fullName}
                  fill
                  priority={fragrance.id === "blonde-amber"}
                  sizes="(max-width: 768px) 30vw, 18vw"
                  className="object-contain drop-shadow-[0_38px_82px_rgba(0,0,0,0.76)]"
                />
              </Link>
            ))}
          </div>

          <div className="relative z-20 mt-5 grid gap-3 border-t border-[#b9874d]/18 pt-4 md:grid-cols-3 lg:col-span-2 lg:mt-2 lg:pt-5">
            {heroBenefits.map((benefit) => (
              <div key={benefit.title} data-reveal className="luxury-glass luxury-hover flex items-start gap-3 p-3.5 sm:gap-4 sm:p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-[#e8c08b]/28 bg-[#e8c08b]/8 text-[#e8c08b]">
                  <benefit.icon size={18} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[#e8c08b]">{benefit.title}</span>
                  <span className="mt-1 block text-sm leading-5 text-[#d9c3ab]/68">{benefit.text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="authenticity" className="relative z-10 px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p data-reveal className="text-xs uppercase tracking-[0.42em] text-[#b9874d]">Оригинальная парфюмерия</p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {originality.map((item) => (
              <div data-reveal key={item} className="luxury-card p-6">
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
            <Link href="/catalog" className="luxury-glass luxury-hover inline-flex h-12 cursor-pointer items-center justify-center gap-3 px-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#f7ead8]">
              Весь каталог
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid auto-cols-[48%] grid-flow-col gap-3 overflow-x-auto pb-4 pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:pr-0 lg:grid-cols-3 min-[1400px]:grid-cols-4">
            {fragrances.slice(0, 4).map((fragrance) => (
              <article data-reveal key={fragrance.id} className="luxury-card group snap-start p-2.5 sm:p-3">
                <div className="relative aspect-[4/3.35] overflow-hidden bg-[radial-gradient(circle_at_50%_40%,rgba(232,192,139,0.18),transparent_58%)] sm:aspect-[4/3.55]">
                  <Image src={fragrance.images[0]} alt={fragrance.name} fill sizes="(max-width: 640px) 48vw, (max-width: 768px) 90vw, (max-width: 1024px) 45vw, (max-width: 1399px) 30vw, 22vw" className="object-contain p-3 drop-shadow-[0_24px_58px_rgba(0,0,0,0.68)] transition duration-300 ease-out group-hover:scale-[1.04] sm:p-4" />
                </div>
                <div className="mt-3 flex min-w-0 flex-col gap-1 sm:mt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                  <div className="min-w-0">
                    <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[#b9874d] sm:text-[0.62rem] sm:tracking-[0.22em]">{fragrance.house}</p>
                    <h3 className="mt-1 text-base font-semibold leading-tight text-[#f7ead8] sm:text-lg">{fragrance.name}</h3>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-[#e8c08b] sm:text-sm">{formatCurrency(fragrance.price, fragrance.currency)}</span>
                </div>
                <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-center sm:justify-between">
                  <AddToCartButton fragranceId={fragrance.id} compact />
                  <Link href={`/catalog/${fragrance.id}`} className="luxury-hover inline-flex h-8 cursor-pointer items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#d7ad7a]/80 hover:text-[#e8c08b] sm:h-9 sm:px-2 sm:text-[0.68rem] sm:tracking-[0.14em]">
                    Подробнее
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
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
              <div data-reveal key={step.title} className="luxury-card p-5">
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
              <article data-reveal key={review} className="luxury-card p-6">
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
          <div data-reveal className="luxury-card grid min-w-0 gap-3 p-5 sm:min-w-[360px]">
            <ContactRow icon={<Phone size={16} />} label="Телефон" href={contacts.phoneHref} value={contacts.phoneLabel} />
            <ContactRow icon={<MessageCircle size={16} />} label="WhatsApp" href={contacts.whatsappHref} value={contacts.phoneLabel} />
            <ContactRow icon={<MessageCircle size={16} />} label="Telegram" href={contacts.telegramHref} value={contacts.telegramLabel} />
            <ContactRow icon={<Instagram size={16} />} label="Instagram" href={contacts.instagramHref} value="мой личный блог" external />
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

function ContactRow({ icon, label, href, value, external = false }: { icon: ReactNode; label: string; href: string; value: string; external?: boolean }) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="luxury-hover flex min-w-0 cursor-pointer items-center justify-between gap-5 border-b border-[#b9874d]/14 pb-3 text-sm text-[#f4e1c8] hover:text-[#e8c08b]">
      <span className="inline-flex items-center gap-2">
        <span className="text-[#c79a63]">{icon}</span>
        {label}
      </span>
      <span className="break-words text-right text-[#d9c3ab]/70">{value}</span>
    </a>
  );
}
