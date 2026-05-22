"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { buildApiUrl } from "@/lib/api";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    if (!file) {
      setError("Debes seleccionar una imagen de portada.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", file);

    try {
      const res = await fetch(buildApiUrl("/projects"), {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Error al subir el proyecto.");
      }

      setSuccess(true);
      setTitle("");
      setDescription("");
      setPrice("");
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-zinc-900">
        Subir nuevo proyecto
      </h2>

      <div className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-700">
            Título
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            placeholder="Ej. Identidad visual para café"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-zinc-700">
            Descripción
          </label>
          <textarea
            id="description"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            placeholder="Describe el proyecto brevemente..."
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-zinc-700">
            Precio (USD)
          </label>
          <input
            id="price"
            type="number"
            min={0}
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            placeholder="Ej. 150.00"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-zinc-700">
            Imagen de portada
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-zinc-500 file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-zinc-800"
          />
          {preview && (
            <img
              src={preview}
              alt="Vista previa"
              className="mt-4 h-40 w-full rounded-lg object-cover"
            />
          )}
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-5 rounded-lg border border-green-100 bg-green-50 p-3 text-sm text-green-700">
          ¡Proyecto subido con éxito!
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Subiendo..." : "Publicar proyecto"}
      </button>
    </form>
  );
}
