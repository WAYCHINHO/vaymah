"use client";

import { CartLink } from "@/components/commerce/CartLink";
import { contacts } from "@/data/contacts";
import { Instagram, Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/cart", label: "Корзина" },
  { href: "/account", label: "Личный кабинет" },
  { href: "/#delivery", label: "Доставка" },
  { href: "/#contact", label: "Контакты" }
];

export function PremiumChrome({
  children,
  current = "VAYMAH"
}: {
  children: ReactNode;
  current?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090604] font-sans text-[#f4eadc]">
      <PremiumBackdrop label={current} />
      <header className="luxury-glass relative z-40 border-x-0 border-t-0 bg-[#080504]/72">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-10">
          <Link href="/" className="luxury-hover flex items-center gap-3">
            <span className="luxury-glass grid h-11 w-11 place-items-center text-sm font-semibold tracking-[0.08em]">
              VM
            </span>
            <span className="font-display text-lg uppercase tracking-[0.34em] text-[#ead8bf]">VayMah</span>
          </Link>

          <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.26em] text-[#d8bea1]/76 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} className="luxury-hover cursor-pointer px-1 py-2 hover:text-[#f5e6d4]" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link className="luxury-glass luxury-hover grid h-10 w-10 cursor-pointer place-items-center text-[#f1dac2] hover:text-[#fff2dc]" href="/account" aria-label="Личный кабинет">
              <UserRound size={17} />
            </Link>
            <CartLink />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="luxury-glass luxury-hover grid h-10 w-10 cursor-pointer place-items-center text-[#f1dac2] hover:text-[#fff2dc]"
              aria-label="Открыть меню"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setMenuOpen(false)}>
          <aside
            className="luxury-glass ml-auto flex h-full w-[min(88vw,390px)] flex-col border-y-0 border-r-0 p-6 shadow-[0_0_80px_rgba(0,0,0,0.7)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg uppercase tracking-[0.34em] text-[#ead8bf]">VayMah</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="luxury-glass luxury-hover grid h-10 w-10 cursor-pointer place-items-center text-[#f1dac2]"
                aria-label="Закрыть меню"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-12 grid gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="luxury-hover cursor-pointer border-b border-[#b9874d]/16 py-4 text-lg tracking-[0.08em] text-[#f4e1c8] hover:text-[#e8c08b]"
                >
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

      <div className="relative z-10">{children}</div>
    </main>
  );
}

export function PremiumBackdrop({ label = "VAYMAH" }: { label?: string }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_46%_20%,rgba(163,98,45,0.28),transparent_28%),linear-gradient(115deg,#080504_0%,#17100c_48%,#050403_100%)]" />
      <div className="font-display pointer-events-none absolute left-1/2 top-24 z-0 -translate-x-1/2 select-none whitespace-nowrap text-[19vw] font-medium uppercase leading-none tracking-normal text-[#f1d9bd]/[0.045]">
        {label}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />
    </>
  );
}
