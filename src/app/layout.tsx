import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clawd Pets — Animated SVG Pet Collection",
  description: "90+ animated SVG pets for your projects. Browse, search, copy, and download.",
  metadataBase: new URL("https://clawd-pet.vercel.app"),
  openGraph: {
    title: "Clawd Pets — Animated SVG Pet Collection",
    description: "90+ animated SVG pets for your projects. Browse, search, copy, and download.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clawd Pets — Animated SVG Pet Collection",
    description: "90+ animated SVG pets for your projects. Browse, search, copy, and download.",
    images: ["/og.png"],
  },
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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
