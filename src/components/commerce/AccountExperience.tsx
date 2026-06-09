"use client";

import { featuredFragrance, formatCurrency } from "@/data/products";
import { BadgeCheck, Clock, Gem, PackageCheck, Settings, UserRound } from "lucide-react";
import { useState } from "react";

const tabs = ["Профиль", "Заказы", "Гардероб"] as const;

const orders = [
  { id: "VM-2104", status: "Готовится", title: featuredFragrance.name, value: featuredFragrance.price },
  { id: "VM-1988", status: "Доставлен", title: "Bronze Incense", value: 340 },
  { id: "VM-1762", status: "Архив", title: "Velvet Citrus", value: 245 }
];

export function AccountExperience() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Профиль");
  const [preferences, setPreferences] = useState({
    concierge: true,
    sealedOnly: true,
    earlyAccess: false
  });

  return (
    <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-10">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.44em] text-[#b9874d]">Личный кабинет</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.94] text-[#f7ead8] md:text-7xl">
            Профиль клиента VayMah.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#d9c3ab]/70">
            Спокойный раздел для заказов, предпочтений, парфюмерного гардероба и связи с консьержем.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Gem, label: "Уровень", value: "Amber Private" },
            { icon: BadgeCheck, label: "Консьерж", value: preferences.concierge ? "Активен" : "Пауза" },
            { icon: Clock, label: "Консультация", value: "18:30" }
          ].map((item) => (
            <div key={item.label} className="border border-[#b9874d]/20 bg-[#100a07]/70 p-5">
              <item.icon size={20} className="text-[#c79a63]" />
              <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[#d8bea1]/50">{item.label}</p>
              <p className="mt-2 text-xl font-semibold text-[#f4e1c8]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`h-11 border px-4 text-xs font-semibold uppercase tracking-[0.2em] transition ${
              activeTab === tab
                ? "border-[#e8c08b] bg-[#e8c08b] text-[#120905]"
                : "border-[#b9874d]/25 bg-[#100a07]/60 text-[#f4e1c8]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "Профиль" && (
          <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="border border-[#b9874d]/20 bg-[#110b08]/70 p-5">
              <UserRound size={22} className="text-[#c79a63]" />
              <h2 className="mt-5 text-2xl font-semibold text-[#f7ead8]">Chinho VayMah</h2>
              <p className="mt-2 text-sm leading-6 text-[#d9c3ab]/65">
                Частный клиент. Предпочитает янтарные, табачные, ладановые и спокойные цитрусовые профили.
              </p>
            </div>
            <div className="border border-[#b9874d]/20 bg-[#110b08]/70 p-5">
              <Settings size={22} className="text-[#c79a63]" />
              <h2 className="mt-5 text-2xl font-semibold text-[#f7ead8]">Предпочтения</h2>
              <div className="mt-5 grid gap-3">
                <PreferenceToggle label="Звонки консьержа" checked={preferences.concierge} onChange={() => setPreferences((value) => ({ ...value, concierge: !value.concierge }))} />
                <PreferenceToggle label="Только запечатанные оригиналы" checked={preferences.sealedOnly} onChange={() => setPreferences((value) => ({ ...value, sealedOnly: !value.sealedOnly }))} />
                <PreferenceToggle label="Ранний доступ к новинкам" checked={preferences.earlyAccess} onChange={() => setPreferences((value) => ({ ...value, earlyAccess: !value.earlyAccess }))} />
              </div>
            </div>
          </section>
        )}

        {activeTab === "Заказы" && (
          <section className="border border-[#b9874d]/20 bg-[#110b08]/70 p-5">
            <h2 className="text-2xl font-semibold text-[#f7ead8]">Последние заказы</h2>
            <div className="mt-5 grid gap-3">
              {orders.map((order) => (
                <div key={order.id} className="grid gap-3 border-b border-[#b9874d]/15 py-4 last:border-b-0 md:grid-cols-[120px_1fr_auto]">
                  <span className="text-sm text-[#b9874d]">{order.id}</span>
                  <div>
                    <p className="font-semibold text-[#f4e1c8]">{order.title}</p>
                    <p className="mt-1 text-sm text-[#d9c3ab]/60">{order.status}</p>
                  </div>
                  <span className="text-sm text-[#d9c3ab]/70">{formatCurrency(order.value)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Гардероб" && (
          <section className="grid gap-4 md:grid-cols-3">
            {["Янтарь и табак", "Мягкий ладан", "Спокойные цитрусы"].map((profile) => (
              <div key={profile} className="border border-[#b9874d]/20 bg-[#110b08]/70 p-5">
                <PackageCheck size={20} className="text-[#c79a63]" />
                <p className="mt-5 text-xl font-semibold text-[#f4e1c8]">{profile}</p>
                <p className="mt-2 text-sm text-[#d9c3ab]/60">Сохранённый профиль</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </section>
  );
}

function PreferenceToggle({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button onClick={onChange} className="flex items-center justify-between border border-[#b9874d]/15 p-3 text-left text-sm text-[#ead8bf]">
      {label}
      <span className={`h-5 w-9 border p-0.5 transition ${checked ? "border-[#e8c08b] bg-[#e8c08b]" : "border-[#b9874d]/25 bg-black/30"}`}>
        <span className={`block h-full w-4 bg-[#120905] transition ${checked ? "translate-x-3" : "translate-x-0"}`} />
      </span>
    </button>
  );
}
