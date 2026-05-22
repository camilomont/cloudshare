import Image from "next/image";
import MasonryGrid from "@/components/MasonryGrid";
import { Project } from "@/lib/types";

const DEMO_PROJECTS: Project[] = [
  {
    projectId: "demo_1",
    title: "Identidad visual para café boutique",
    description: "Diseño completo de marca incluyendo logo, paleta de colores y papelería.",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80",
  },
  {
    projectId: "demo_2",
    title: "Ilustración editorial para revista",
    description: "Arte conceptual para portada de revista de cultura contemporánea.",
    price: 320,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
  },
  {
    projectId: "demo_3",
    title: "Packaging minimalista para skincare",
    description: "Diseño de empaques eco-amigables para línea de cuidado personal.",
    price: 580,
    imageUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=600&q=80",
  },
  {
    projectId: "demo_4",
    title: "Diseño de app de meditación",
    description: "UI/UX completo para aplicación móvil de bienestar y mindfulness.",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
  },
  {
    projectId: "demo_5",
    title: "Lettering mural para coworking",
    description: "Tipografía artística pintada a mano para espacio de trabajo creativo.",
    price: 800,
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
  },
  {
    projectId: "demo_6",
    title: "Fotografía de producto para ecommerce",
    description: "Sesión fotográfica profesional con dirección de arte para tienda online.",
    price: 650,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  },
];

export const metadata = {
  title: "Lucía Vázquez — Artista en CloudShare",
};

export default function ArtistDemoPage() {
  return (
    <div className="bg-[#111111]">
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        <Image
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600&q=80"
          alt="Banner"
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
      </div>

      <div className="mx-auto max-w-4xl px-6">
        <div className="relative -mt-16 flex flex-col items-center sm:-mt-20 sm:flex-row sm:items-end sm:gap-6">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-[#111111] sm:h-40 sm:w-40">
            <Image
              src="https://i.pravatar.cc/300?u=lucia"
              alt="Lucía Vázquez"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="mt-4 text-center sm:mt-0 sm:text-left">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Lucía Vázquez</h1>
            <p className="text-sm text-[#a3a3a3]">@luciavz · Ilustradora & Brand Designer</p>
          </div>

          <div className="mt-4 flex w-full gap-3 sm:mt-0 sm:ml-auto sm:w-auto">
            <button className="flex-1 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105 sm:flex-none">
              Solicitar arte personalizado
            </button>
            <button className="flex-1 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#3a3a3a] sm:flex-none">
              Seguir
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 rounded-2xl border border-[#222222] bg-[#1a1a1a] p-6 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">142</div>
            <div className="text-xs text-[#666666]">Proyectos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">12.4k</div>
            <div className="text-xs text-[#666666]">Seguidores</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">98%</div>
            <div className="text-xs text-[#666666]">Satisfacción</div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-white">Sobre mí</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">
            Diseñadora visual e ilustradora con más de 8 años de experiencia
            creando identidades de marca memorables. Especializada en
            ilustración editorial, branding minimalista y dirección de arte
            para productos digitales. Basada en Madrid, trabajo con clientes
            de todo el mundo.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-white">Obras destacadas</h2>
          <div className="mt-6">
            <MasonryGrid projects={DEMO_PROJECTS} />
          </div>
        </div>
      </div>
    </div>
  );
}
