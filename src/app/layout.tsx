import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CloudShare — Arte Único de Artistas Independientes",
  description:
    "Descubre arte único creado por artistas independientes. Compra directamente. Sin intermediarios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#111111] text-white">
        <header className="sticky top-0 z-50 border-b border-[#222222] bg-[#111111]/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="/" className="text-lg font-bold tracking-tight text-white">
              CloudShare
            </a>
            <nav className="flex items-center gap-6 text-sm font-medium text-[#a3a3a3]">
              <a href="/" className="transition-colors hover:text-white">
                Explorar
              </a>
              <a
                href="/dashboard"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-105"
              >
                Panel de Control
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#222222] py-8 text-center text-sm text-[#666666]">
          CloudShare — Hecho para artistas.
        </footer>
      </body>
    </html>
  );
}
