const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!apiBaseUrl) {
    throw new Error(
      "Falta configurar NEXT_PUBLIC_API_BASE_URL en el entorno de despliegue."
    );
  }

  const normalizedBase = apiBaseUrl.replace(/\/+$/, "");
  return `${normalizedBase}${normalizedPath}`;
}
