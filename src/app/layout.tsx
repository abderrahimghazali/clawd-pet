import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clawd Pet — Free Animated SVG Pet Collection for Developers",
  description:
    "Clawd Pet is a free collection of 90+ animated SVG pets you can use in any project. Browse, search, copy CDN links, and download cute animated animals instantly.",
  metadataBase: new URL("https://clawd-pet.vercel.app"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "clawd pet",
    "clawd pets",
    "animated svg pets",
    "svg pet collection",
    "animated svg animals",
    "free svg pets",
    "cute animated pets",
    "svg pet icons",
    "developer pet assets",
  ],
  openGraph: {
    type: "website",
    siteName: "Clawd Pet",
    title: "Clawd Pet — Free Animated SVG Pet Collection",
    description:
      "90+ free animated SVG pets for your projects. Browse, search, copy CDN links, and download cute animated animals.",
    url: "https://clawd-pet.vercel.app",
    images: [{ url: "/og.png", width: 1872, height: 1170, alt: "Clawd Pet — Animated SVG Pet Collection" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clawd Pet — Free Animated SVG Pet Collection",
    description:
      "90+ free animated SVG pets for your projects. Browse, search, copy CDN links, and download cute animated animals.",
    images: ["/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Clawd Pet",
  url: "https://clawd-pet.vercel.app",
  description:
    "Free collection of 90+ animated SVG pets for developers. Browse, search, copy CDN links, and download cute animated animals.",
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  image: "https://clawd-pet.vercel.app/og.png",
};

const themeScript = `
  (function() {
    var t = localStorage.getItem('clawd-theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
