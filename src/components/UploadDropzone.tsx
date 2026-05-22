"use client";

import { useState, useCallback, FormEvent, ChangeEvent } from "react";
import { Upload, X, Tag, Palette, Briefcase } from "lucide-react";

export default function UploadDropzone() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("Arte Digital");
  const [acceptsCommissions, setAcceptsCommissions] = useState(false);

  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (selected: File | null) => {
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] ?? null);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    if (!file) {
      setError("Debes arrastrar o seleccionar una imagen.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Error al subir el proyecto.");
      }

      setSuccess(true);
      setTitle("");
      setDescription("");
      setPrice("");
      setTags("");
      setCategory("Arte Digital");
      setAcceptsCommissions(false);
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-16 transition-colors ${
          dragActive
            ? "border-white bg-[#1a1a1a]"
            : "border-[#2a2a2a] bg-[#161616] hover:border-[#3a3a3a]"
        }`}
      >
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 cursor-pointer opacity-0"
        />

        {preview ? (
          <div className="relative w-full max-w-md">
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-2xl object-cover shadow-lg"
            />
            <button
              type="button"
              onClick={removeFile}
              className="absolute -right-3 -top-3 rounded-full bg-[#222222] p-1.5 text-white shadow transition-colors hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#222222]">
              <Upload className="h-7 w-7 text-[#a3a3a3]" />
            </div>
            <p className="mt-4 text-sm font-medium text-white">
              Arrastra tu obra aquí
            </p>
            <p className="mt-1 text-xs text-[#666666]">
              O haz clic para explorar archivos (JPG, PNG, WebP)
            </p>
          </>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#a3a3a3]">Título</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#2a2a2a] bg-[#161616] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#3a3a3a]"
            placeholder="Ej. Identidad visual para café"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#a3a3a3]">Descripción</label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#2a2a2a] bg-[#161616] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#3a3a3a]"
            placeholder="Describe el proyecto brevemente..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#a3a3a3]">Precio (USD)</label>
          <input
            type="number"
            min={0}
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#2a2a2a] bg-[#161616] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#3a3a3a]"
            placeholder="150.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#a3a3a3]">Categoría</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#2a2a2a] bg-[#161616] px-4 py-3">
            <Palette className="h-4 w-4 text-[#666666]" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#1a1a1a] text-sm text-white outline-none"
            >
              <option>Arte Digital</option>
              <option>Ilustración</option>
              <option>Branding</option>
              <option>Fotografía</option>
              <option>3D</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[#a3a3a3]">Tags (visuales)</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#2a2a2a] bg-[#161616] px-4 py-3">
            <Tag className="h-4 w-4 text-[#666666]" />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none"
              placeholder="branding, minimal, uiux..."
            />
          </div>
        </div>

        <div className="sm:col-span-2 flex items-center justify-between rounded-xl border border-[#2a2a2a] bg-[#161616] px-4 py-3">
          <div className="flex items-center gap-3">
            <Briefcase className="h-4 w-4 text-[#666666]" />
            <span className="text-sm text-white">Acepto comisiones</span>
          </div>
          <button
            type="button"
            onClick={() => setAcceptsCommissions((v) => !v)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              acceptsCommissions ? "bg-white" : "bg-[#333333]"
            }`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-black transition-transform ${
                acceptsCommissions ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-900/30 bg-red-900/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-900/30 bg-green-900/10 p-4 text-sm text-green-400">
          ¡Proyecto publicado con éxito! Tu obra ya está visible en el explorador.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
            Publicando...
          </span>
        ) : (
          "Publicar proyecto"
        )}
      </button>
    </form>
  );
}
