export interface Artwork {
  id: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  description: string;
  imagePath: string;
  category: "painting" | "mixed-media" | "digital" | "photography";
  featured: boolean;
  price: number;
  available: boolean;
  printSizes: string[];
}

export const artworks: Artwork[] = [
  {
    id: "artwork-01",
    title: "Roots & Reckoning",
    year: "2024",
    medium: "Oil on Canvas",
    dimensions: "36 × 48 in",
    description:
      "A meditation on duality — the push and pull between two worlds, two bloods, one soul. Born from the fertile tension between ancestral Ghana and the endless skies of Zimbabwe.",
    imagePath: "/images/artwork/artwork-01.jpg",
    category: "painting",
    featured: true,
    price: 3200,
    available: true,
    printSizes: ["8×10", "11×14", "16×20", "18×24", "24×36"],
  },
  {
    id: "artwork-02",
    title: "Soft Thunder",
    year: "2024",
    medium: "Acrylic & Charcoal",
    dimensions: "24 × 30 in",
    description:
      "Quiet power. The kind that doesn't announce itself but shifts the room. A study in restraint and release.",
    imagePath: "/images/artwork/artwork-02.jpg",
    category: "mixed-media",
    featured: false,
    price: 1800,
    available: true,
    printSizes: ["8×10", "11×14", "16×20", "18×24"],
  },
  {
    id: "artwork-03",
    title: "Chicago Elegy",
    year: "2025",
    medium: "Mixed Media on Board",
    dimensions: "48 × 60 in",
    description:
      "Created in the weeks leading up to the Black Girl Art Show at Navy Pier. A love letter and a question mark to the city that held her work for the first time on a national stage.",
    imagePath: "/images/artwork/artwork-03.jpg",
    category: "mixed-media",
    featured: true,
    price: 5500,
    available: false,
    printSizes: ["11×14", "16×20", "18×24", "24×36"],
  },
  {
    id: "artwork-04",
    title: "Adinkra Dream",
    year: "2024",
    medium: "Oil & Gold Leaf",
    dimensions: "30 × 40 in",
    description:
      "Ghanaian Adinkra symbols dissolved into dreamscape — wisdom, endurance, adaptability — rendered in the language of Black American abstraction.",
    imagePath: "/images/artwork/artwork-04.jpg",
    category: "painting",
    featured: true,
    price: 4100,
    available: true,
    printSizes: ["8×10", "11×14", "16×20", "18×24", "24×36"],
  },
  {
    id: "artwork-05",
    title: "Harare Noon",
    year: "2023",
    medium: "Watercolor & Ink",
    dimensions: "18 × 24 in",
    description:
      "Heat. Stillness. The amber light of a Zimbabwean afternoon, distorted through the lens of memory and longing.",
    imagePath: "/images/artwork/artwork-05.jpg",
    category: "painting",
    featured: false,
    price: 1400,
    available: true,
    printSizes: ["8×10", "11×14", "16×20"],
  },
  {
    id: "artwork-06",
    title: "Diaspora Blues",
    year: "2023",
    medium: "Acrylic on Canvas",
    dimensions: "24 × 36 in",
    description:
      "Belonging, not belonging. The paradox of being both perfectly at home and permanently in exile. This is that feeling, painted.",
    imagePath: "/images/artwork/artwork-06.jpg",
    category: "painting",
    featured: false,
    price: 2600,
    available: true,
    printSizes: ["8×10", "11×14", "16×20", "18×24", "24×36"],
  },
  {
    id: "artwork-07",
    title: "Inheritance",
    year: "2025",
    medium: "Mixed Media",
    dimensions: "40 × 50 in",
    description:
      "Everything your ancestors survived lives in your body. This piece is a visual archive of inherited resilience.",
    imagePath: "/images/artwork/artwork-07.jpg",
    category: "mixed-media",
    featured: true,
    price: 4800,
    available: true,
    printSizes: ["11×14", "16×20", "18×24", "24×36"],
  },
  {
    id: "artwork-08",
    title: "Akua's Garden",
    year: "2023",
    medium: "Oil on Linen",
    dimensions: "20 × 20 in",
    description:
      "A homage to Grandmother Akua, keeper of seeds, keeper of stories. She tended things that grew in the dark.",
    imagePath: "/images/artwork/artwork-08.jpg",
    category: "painting",
    featured: false,
    price: 1750,
    available: true,
    printSizes: ["8×10", "11×14", "16×20"],
  },
  {
    id: "artwork-09",
    title: "Navy Pier Nocturne",
    year: "2025",
    medium: "Charcoal & Pastel",
    dimensions: "22 × 28 in",
    description:
      "The night before the Black Girl Art Show. The lake, the lights, the quiet thunder of anticipation. Drawn from memory.",
    imagePath: "/images/artwork/artwork-09.jpg",
    category: "mixed-media",
    featured: false,
    price: 2200,
    available: true,
    printSizes: ["8×10", "11×14", "16×20", "18×24"],
  },
  {
    id: "artwork-10",
    title: "Black Gold",
    year: "2024",
    medium: "Acrylic, Ink & Resin",
    dimensions: "30 × 30 in",
    description:
      "There is no color more complex, more layered, more luminous. A celebration of Blackness as infinite spectrum.",
    imagePath: "/images/artwork/artwork-10.jpg",
    category: "mixed-media",
    featured: false,
    price: 3400,
    available: true,
    printSizes: ["8×10", "11×14", "16×20", "18×24", "24×36"],
  },
  {
    id: "artwork-11",
    title: "The Language Before Words",
    year: "2025",
    medium: "Oil on Canvas",
    dimensions: "60 × 72 in",
    description:
      "Grief, joy, love — the emotions that predate language. A monumental canvas for the feelings that words have never been large enough to hold.",
    imagePath: "/images/artwork/artwork-11.jpg",
    category: "painting",
    featured: true,
    price: 9500,
    available: true,
    printSizes: ["16×20", "18×24", "24×36"],
  },
  {
    id: "artwork-12",
    title: "Sankofa Rising",
    year: "2024",
    medium: "Mixed Media on Wood Panel",
    dimensions: "36 × 36 in",
    description:
      "Sankofa: return and retrieve. The Akan bird that flies forward while looking back. Go forward, yes — but never forget where you come from.",
    imagePath: "/images/artwork/artwork-12.jpg",
    category: "mixed-media",
    featured: false,
    price: 3800,
    available: true,
    printSizes: ["8×10", "11×14", "16×20", "18×24", "24×36"],
  },
];

export const featuredArtworks = artworks.filter((a) => a.featured);

export const categories = [
  { id: "all", label: "All Works" },
  { id: "painting", label: "Painting" },
  { id: "mixed-media", label: "Mixed Media" },
  { id: "digital", label: "Photography" },
];
