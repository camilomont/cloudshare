export const ARTIST_NAMES = [
  "Lucía Vázquez",
  "Marco Ríos",
  "Sofía Naranjo",
  "Diego Herrera",
  "Valentina Cruz",
  "Andrés Molina",
  "Camila Torres",
  "Felipe Aguilar",
  "Daniela Ponce",
  "Javier León",
];

export const ARTIST_HANDLES = [
  "@luciavz",
  "@marcorios",
  "@sofianrj",
  "@diegoh",
  "@valencruz",
  "@andresm",
  "@camitorres",
  "@felipeag",
  "@daniponce",
  "@javierleon",
];

export const AVATAR_URLS = [
  "https://i.pravatar.cc/150?u=1",
  "https://i.pravatar.cc/150?u=2",
  "https://i.pravatar.cc/150?u=3",
  "https://i.pravatar.cc/150?u=4",
  "https://i.pravatar.cc/150?u=5",
  "https://i.pravatar.cc/150?u=6",
  "https://i.pravatar.cc/150?u=7",
  "https://i.pravatar.cc/150?u=8",
  "https://i.pravatar.cc/150?u=9",
  "https://i.pravatar.cc/150?u=10",
];

export const CATEGORIES = [
  "Tendencias",
  "Arte Digital",
  "Ilustración",
  "Minimalismo",
  "Fotografía",
  "Lettering",
];

export const TAGS = [
  "Branding",
  "UI/UX",
  "Ilustración",
  "Motion",
  "3D",
  "Tipografía",
  "Fotografía",
  "Arte Digital",
];

export function getMockForId(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % ARTIST_NAMES.length;
  return {
    artistName: ARTIST_NAMES[idx],
    handle: ARTIST_HANDLES[idx],
    avatar: AVATAR_URLS[idx],
    category: CATEGORIES[idx % CATEGORIES.length],
    tags: [TAGS[idx % TAGS.length], TAGS[(idx + 3) % TAGS.length]],
    likes: Math.abs(hash % 5000) + 100,
    views: Math.abs(hash % 50000) + 1000,
    commissionOpen: hash % 2 === 0,
  };
}
