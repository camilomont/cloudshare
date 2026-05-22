"use client";

import Image from "next/image";
import { Heart, Eye, MessageCircle } from "lucide-react";
import { Project } from "@/lib/types";
import { getMockForId } from "@/lib/mocks";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const mock = getMockForId(project.projectId);

  return (
    <article className="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-[#222222] bg-[#1a1a1a] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <button className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105">
            <MessageCircle className="h-4 w-4" />
            {mock.commissionOpen ? "Solicitar comisión" : "Contactar artista"}
          </button>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-white/20">
              <Heart className="h-4 w-4" />
              {mock.likes.toLocaleString("es-ES")}
            </button>
            <button className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-white/20">
              <Eye className="h-4 w-4" />
              {mock.views.toLocaleString("es-ES")}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <Image
            src={mock.avatar}
            alt={mock.artistName}
            width={28}
            height={28}
            className="rounded-full"
            unoptimized
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">{mock.artistName}</span>
            <span className="text-[10px] text-[#666666]">{mock.handle}</span>
          </div>
        </div>

        <h3 className="mt-3 text-sm font-semibold text-white truncate">{project.title}</h3>
        <p className="mt-1 text-xs text-[#a3a3a3] line-clamp-2">{project.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-white">
            ${project.price.toLocaleString("es-ES")}
          </span>
          <span className="rounded-full bg-[#222222] px-2 py-0.5 text-[10px] text-[#a3a3a3]">
            {mock.category}
          </span>
        </div>
      </div>
    </article>
  );
}
