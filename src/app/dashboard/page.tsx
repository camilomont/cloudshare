import UploadDropzone from "@/components/UploadDropzone";

export const metadata = {
  title: "Panel de Control — CloudShare",
};

export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Publica tu obra
        </h1>
        <p className="mt-3 text-[#a3a3a3]">
          Arrastra, personaliza y comparte tu arte con miles de coleccionistas.
        </p>
      </div>

      <UploadDropzone />
    </section>
  );
}
