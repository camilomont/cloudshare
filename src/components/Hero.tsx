"use client";

import { Search } from "lucide-react";
import { TAGS } from "@/lib/mocks";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#111111] px-6 py-20 text-white sm:py-28">
      <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Descubre arte único creado por artistas independientes.
          <span className="mt-2 block text-[#a3a3a3]">
            Compra directamente. Sin intermediarios.
          </span>
        </h1>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="flex items-center gap-3 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-5 py-3 shadow-lg transition-colors focus-within:border-[#3a3a3a]">
            <Search className="h-5 w-5 shrink-0 text-[#666666]" />
            <input
              type="text"
              placeholder="Buscar ilustración, branding, fotografía..."
              className="w-full bg-transparent text-sm text-white placeholder-[#666666] outline-none"
            />
            <button className="hidden shrink-0 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105 sm:block">
              Buscar
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-[#666666]">Populares:</span>
          {TAGS.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="cursor-pointer rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1 text-xs text-[#a3a3a3] transition-colors hover:border-[#3a3a3a] hover:text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
