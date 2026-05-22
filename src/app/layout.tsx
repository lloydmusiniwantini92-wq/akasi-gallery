import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Akasis — The Art of Akasi Osei",
    template: "%s | Akasis",
  },
  description:
    "Akasis is the official gallery and shop of Akasi Osei — a Ghanaian-Zimbabwean-American contemporary artist whose work bridges the ancestral and the avant-garde. Exhibited at the Black Girl Art Show, Chicago 2025.",
  keywords: [
    "Akasi Osei",
    "Akasis",
    "African American artist",
    "contemporary art",
    "Black artist",
    "art gallery",
    "original paintings",
    "art prints",
    "mixed media",
    "Black Girl Art Show",
    "Chicago art",
    "Ghanaian artist",
    "Zimbabwean artist",
    "diaspora art",
  ],
  authors: [{ name: "Akasi Osei" }],
  creator: "Akasi Osei",
  openGraph: {
    title: "Akasis — The Art of Akasi Osei",
    description:
      "Original works and fine art prints by Akasi Osei. Contemporary art rooted in Ghanaian and Zimbabwean heritage, created in America.",
    url: "https://akasisart.com",
    siteName: "Akasis",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/artwork/artwork-03.jpg",
        width: 1200,
        height: 630,
        alt: "Akasis – Art by Akasi Osei",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akasis — The Art of Akasi Osei",
    description:
      "Original works and fine art prints by Akasi Osei. Contemporary art rooted in Ghanaian and Zimbabwean heritage.",
    images: ["/images/artwork/artwork-03.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://akasisart.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0a0a] text-[#fafafa] antialiased">{children}</body>
    </html>
  );
}
