import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Marck_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap"
});

const signature = Marck_Script({
  subsets: ["cyrillic", "latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap"
});

export const metadata: Metadata = {
  title: "VayMah | Оригинальная парфюмерия",
  description: "Премиальный магазин оригинальной нишевой парфюмерии VayMah."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable} ${signature.variable}`}>
      <body>{children}</body>
    </html>
  );
}
