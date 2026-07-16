import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "skŸlizer — EVE Online Scan Intelligence",
  description:
    "Import, analyze, organize, and share EVE Online moon scans, probe results, directional scans, structures, and mining ledgers.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/assets/skylizer-hero.6a6e02c9249f.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="dns-prefetch" href="//github.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
