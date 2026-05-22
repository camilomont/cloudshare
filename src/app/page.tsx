import { Suspense } from "react";
import Hero from "@/components/Hero";
import FilterTabs from "@/components/FilterTabs";
import MasonryGrid from "@/components/MasonryGrid";
import { Project } from "@/lib/types";
import { getMockForId } from "@/lib/mocks";

async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("No se pudieron cargar los proyectos.");
  }

  const data = await res.json();
  const projects = Array.isArray(data)
    ? data
    : Array.isArray(data?.items)
      ? data.items
      : [];
  return projects;
}

export default async function HomePage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  let projects: Project[] = [];
  let error = "";

  try {
    projects = await getProjects();
  } catch (err) {
    error = err instanceof Error ? err.message : "Error desconocido";
  }

  const searchParams = await props.searchParams;
  const category = searchParams.category;
  const filteredProjects = category
    ? projects.filter((p) => getMockForId(p.projectId).category === category)
    : projects;

  return (
    <>
      <Hero />
      <section className="bg-[#111111]">
        <Suspense fallback={null}>
          <FilterTabs />
        </Suspense>

        <div className="mx-auto max-w-7xl px-6 pb-16">
          {error && (
            <div className="mb-8 rounded-xl border border-red-900/30 bg-red-900/10 p-4 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <MasonryGrid projects={filteredProjects} />

          {!error && filteredProjects.length === 0 && (
            <p className="py-20 text-center text-[#666666]">
              {category
                ? `No hay proyectos en la categoría "${category}".`
                : "Aún no hay proyectos publicados."}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
