import { ProductGallery } from "@/components/commerce/ProductGallery";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { PremiumChrome } from "@/components/layout/PremiumChrome";
import { contacts } from "@/data/contacts";
import { formatCurrency, fragrances } from "@/data/products";
import { ArrowLeft, CreditCard, Instagram, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type ProductDetailPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return fragrances.map((fragrance) => ({
    id: fragrance.id
  }));
}

export function generateMetadata({ params }: ProductDetailPageProps) {
  const fragrance = fragrances.find((item) => item.id === params.id);

  if (!fragrance) {
    return {
      title: "Аромат не найден | VayMah"
    };
  }

  return {
    title: `${fragrance.fullName} | VayMah`,
    description: fragrance.description
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const fragrance = fragrances.find((item) => item.id === params.id);

  if (!fragrance) notFound();

  return (
    <PremiumChrome current={fragrance.name}>
      <section className="mx-auto max-w-[1500px] overflow-hidden px-5 py-12 md:px-10">
        <Link href="/catalog" className="luxury-hover inline-flex cursor-pointer items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#d7ad7a]/75 hover:text-[#e8c08b]">
          <ArrowLeft size={14} />
          Каталог
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <ProductGallery images={fragrance.images} name={fragrance.fullName} />

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.36em] text-[#b9874d]">{fragrance.house}</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.96] text-[#f7ead8] md:text-7xl">
              {fragrance.name}
            </h1>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[#d9c3ab]/60">{fragrance.fullName}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d9c3ab]/72">{fragrance.description}</p>

            <div className="mt-7 flex flex-wrap items-end gap-3">
              <span className="text-3xl font-semibold text-[#e8c08b]">{formatCurrency(fragrance.price, fragrance.currency)}</span>
              {fragrance.oldPrice ? (
                <span className="pb-1 text-base text-[#d9c3ab]/45 line-through">{formatCurrency(fragrance.oldPrice, fragrance.currency)}</span>
              ) : null}
              {fragrance.discount ? (
                <span className="luxury-badge mb-1 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#e8c08b]">-{fragrance.discount}</span>
              ) : null}
            </div>

            <div className="luxury-glass mt-8 grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
              <DetailStat label="Тип" value={fragrance.concentration} />
              <DetailStat label="Объём" value={fragrance.size} />
              <DetailStat label="Наличие" value={fragrance.inventoryLabel} />
              <DetailStat label="Код продукта" value={fragrance.productCode ?? "По запросу"} />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AddToCartButton fragranceId={fragrance.id} />
              <a href={contacts.whatsappHref} className="luxury-glass luxury-hover inline-flex h-12 cursor-pointer items-center justify-center gap-3 px-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#f4e1c8]">
                <MessageCircle size={17} />
                WhatsApp
              </a>
              <button type="button" className="luxury-glass luxury-hover inline-flex h-12 cursor-pointer items-center justify-center gap-3 px-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#f4e1c8]">
                <ShieldCheck size={17} />
                Проверить оригинальность
              </button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <InfoBlock icon={<CreditCard size={20} />} title="Оплата переводом">
                Оплата принимается переводом на номер <ContactLink href={contacts.phoneHref}>{contacts.phoneLabel}</ContactLink>. После оплаты отправьте чек в WhatsApp или Telegram для подтверждения заказа.
              </InfoBlock>
              <InfoBlock icon={<Truck size={20} />} title="Доставка по России">
                Отправляем заказы по России после подтверждения оплаты. По Чечне доставка бесплатно. Самовывоз: {contacts.address}.
              </InfoBlock>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <section className="luxury-glass p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[#b9874d]">Характер</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <DetailStat label="Когда носить" value={fragrance.whenToWear ?? "По настроению"} />
              <DetailStat label="Стойкость" value={fragrance.longevity ?? "Уточняется"} />
              <DetailStat label="Шлейф" value={fragrance.sillage ?? "Уточняется"} />
              {fragrance.releaseYear ? <DetailStat label="Год выпуска" value={fragrance.releaseYear} /> : null}
              {fragrance.perfumer ? <DetailStat label="Автор" value={fragrance.perfumer} /> : null}
            </div>
          </section>

          <section className="luxury-glass p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[#b9874d]">Ноты аромата</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {(fragrance.noteGroups ?? [{ title: "Ноты", notes: fragrance.notes }]).map((group) => (
                <div key={group.title} className="luxury-glass luxury-hover p-4">
                  <h2 className="text-lg font-semibold text-[#f7ead8]">{group.title}</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.notes.map((note) => (
                      <span key={note} className="border border-[#b9874d]/18 px-3 py-2 text-sm text-[#d9c3ab]/76">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="luxury-glass mt-14 p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-[#b9874d]">Контакты VayMah</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <ContactCard icon={<Phone size={17} />} label="Телефон" href={contacts.phoneHref} value={contacts.phoneLabel} />
            <ContactCard icon={<MessageCircle size={17} />} label="WhatsApp" href={contacts.whatsappHref} value={contacts.phoneLabel} />
            <ContactCard icon={<MessageCircle size={17} />} label="Telegram" href={contacts.telegramHref} value={contacts.telegramLabel} />
            <ContactCard icon={<Instagram size={17} />} label="Instagram" href={contacts.instagramHref} value="мой личный блог" external />
            <ContactCard icon={<Mail size={17} />} label="Почта" href={contacts.emailHref} value={contacts.emailLabel} />
          </div>
          <div className="luxury-glass mt-3 flex items-start gap-3 p-4 text-sm leading-6 text-[#d9c3ab]/72">
            <MapPin size={17} className="mt-1 shrink-0 text-[#e8c08b]" />
            {contacts.address}
          </div>
        </section>
      </section>
    </PremiumChrome>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#d8bea1]/50">{label}</p>
      <p className="mt-2 break-words text-base font-semibold text-[#f4e1c8]">{value}</p>
    </div>
  );
}

function InfoBlock({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="luxury-glass luxury-hover p-5">
      <div className="flex items-center gap-3 text-[#e8c08b]">
        {icon}
        <h2 className="text-lg font-semibold text-[#f7ead8]">{title}</h2>
      </div>
      <p className="mt-4 text-sm leading-7 text-[#d9c3ab]/70">{children}</p>
    </div>
  );
}

function ContactLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="luxury-hover font-semibold text-[#f4e1c8] underline decoration-[#e8c08b]/35 underline-offset-4 hover:text-[#e8c08b]">
      {children}
    </a>
  );
}

function ContactCard({ icon, label, href, value, external = false }: { icon: ReactNode; label: string; href: string; value: string; external?: boolean }) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="luxury-glass luxury-hover flex min-w-0 items-center gap-3 p-4 text-sm">
      <span className="text-[#e8c08b]">{icon}</span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-[0.18em] text-[#b9874d]">{label}</span>
        <span className="mt-1 block break-words text-[#f4e1c8]">{value}</span>
      </span>
    </a>
  );
}
