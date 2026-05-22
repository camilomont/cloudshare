"use client";

import { useState } from "react";
import {
  Flame,
  Palette,
  PenTool,
  LayoutGrid,
  Camera,
  Pen,
} from "lucide-react";
import { CATEGORIES } from "@/lib/mocks";

const ICONS: Record<string, React.ReactNode> = {
  Tendencias: <Flame className="h-3.5 w-3.5" />,
  "Arte Digital": <Palette className="h-3.5 w-3.5" />,
  Ilustración: <PenTool className="h-3.5 w-3.5" />,
  Minimalismo: <LayoutGrid className="h-3.5 w-3.5" />,
  Fotografía: <Camera className="h-3.5 w-3.5" />,
  Lettering: <Pen className="h-3.5 w-3.5" />,
};

export default function FilterTabs() {
  const [active, setActive] = useState(CATEGORIES[0]);

  return (
    <div className="flex items-center justify-center gap-2 overflow-x-auto px-6 py-4 pb-8 [scrollbar-width:none]">
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${
              isActive
                ? "bg-white text-black shadow-md"
                : "border border-[#2a2a2a] bg-[#1a1a1a] text-[#a3a3a3] hover:border-[#3a3a3a] hover:text-white"
            }`}
          >
            {ICONS[cat]}
            {cat}
          </button>
        );
      })}
    </div>
  );
}
