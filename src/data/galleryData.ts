import { IMAGES, EXPERIMENTAL_GALLERY } from '../constants/assets';

export const MASTERPIECES = [
  {
    title: "The Vision",
    year: "2024",
    dim: "48x60 in",
    medium: "Acrylic & Gold Leaf on Canvas",
    price: "$12,500",
    p: 1250000,
    img: IMAGES.hero,
    desc: "A primary exploration of the Afro-minimalist intersection."
  },
  {
    title: "Resilience II",
    year: "2023",
    dim: "36x48 in",
    medium: "Oil on Linen",
    price: "$8,200",
    p: 820000,
    img: IMAGES.masterpiece1,
    desc: "Capturing the weighted silence of inherited memory."
  },
  {
    title: "Ancestral Echo",
    year: "2024",
    dim: "40x40 in",
    medium: "Mixed Media",
    price: "$9,800",
    p: 980000,
    img: IMAGES.masterpiece2,
    desc: "A kinetic study of diasporic movement."
  }
];

export const COLLECTIONS = [
  { id: "A01", title: "Velvet Void", count: 12, img: IMAGES.masterpiece3 },
  { id: "B02", title: "Ghanaian Minimalism", count: 8, img: IMAGES.studio1 },
  { id: "C03", title: "Archive Studies", count: 15, img: IMAGES.studio2 }
];

export const HERO_SEQUENCE = [
  { top: "AN ETERNAL", bottom: "VISION.", color: "#C5A059" },
  { top: "A SACRED", bottom: "GRACE.", color: "#D4D4D8" },
  { top: "A SILENT", bottom: "WHISPER.", color: "#D1D5DB" },
  { top: "A BOLD", bottom: "STANCE.", color: "#A78BFA" },
  { top: "AN INTIMATE", bottom: "MEMORY.", color: "#FDE68A" },
  { top: "A DIVINE", bottom: "RHYTHM.", color: "#93C5FD" },
  { top: "A TIMELESS", bottom: "NARRATIVE.", color: "#FCA5A1" },
  { top: "A LIQUID", bottom: "ECHO.", color: "#6EE7B7" },
];

export const EXHIBITIONS = [
  { date: "MAY 12", title: "The Silent Narrative", location: "Kalamazoo, MI", status: "Upcoming" },
  { date: "JUNE 05", title: "Held Breath", location: "Detroit, MI", status: "RSVP Open" },
  { date: "AUG 18", title: "Diaspora Kinetic", location: "Chicago, IL", status: "In Planning" }
];
