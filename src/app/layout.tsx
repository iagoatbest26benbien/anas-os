import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iagoatbest26benbien.github.io"),
  title: "AnasOS — Portfolio Interactif | Anas El Manssouri",
  description:
    "Portfolio interactif d'Anas El Manssouri, développeur Full-Stack & DevOps. Explorez mes projets, compétences et expériences comme un vrai système d'exploitation.",
  keywords: [
    "Anas El Manssouri",
    "portfolio",
    "développeur",
    "full-stack",
    "DevOps",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Anas El Manssouri" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AnasOS — Portfolio Interactif",
    description:
      "Explorez mon portfolio comme un vrai OS : ouvrez des apps, naviguez dans mes projets, découvrez mes compétences.",
    type: "website",
    url: "https://iagoatbest26benbien.github.io/",
    siteName: "AnasOS",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "AnasOS Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnasOS — Portfolio Interactif",
    description:
      "Portfolio interactif sous forme de système d'exploitation. Full-Stack & DevOps.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.svg",
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anas El Manssouri",
  url: "https://iagoatbest26benbien.github.io/",
  jobTitle: "Full-Stack Developer & DevOps",
  sameAs: [
    "https://github.com/iagoatbest26benbien",
    "https://www.linkedin.com/in/anas-el-manssouri-268a35295",
  ],
  email: "anaselmanssouri479@gmail.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#0a0a1a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <noscript>
          <div style={{ padding: "2rem", fontFamily: "system-ui", color: "#ededed", background: "#0a0a1a", minHeight: "100vh" }}>
            <h1>Anas El Manssouri — Full-Stack Developer &amp; DevOps</h1>
            <p>Portfolio interactif sous forme de systeme d&apos;exploitation. Decouvrez mes projets, competences et experiences.</p>
            <h2>Projets</h2>
            <ul>
              <li>Facturia — Plateforme SaaS de facturation intelligente</li>
              <li>HookRust — Passerelle webhook haute performance en Rust</li>
              <li>Salle de Marche — Bot de trading IA multi-agents</li>
              <li>OM CV Pipeline — Vision par ordinateur pour analyse tactique football</li>
              <li>MCP Context Server — Serveur MCP pour developpeurs</li>
            </ul>
            <h2>Contact</h2>
            <p>Email: anaselmanssouri479@gmail.com</p>
            <p>
              <a href="https://github.com/iagoatbest26benbien" style={{ color: "#3b82f6" }}>GitHub</a> |{" "}
              <a href="https://www.linkedin.com/in/anas-el-manssouri-268a35295" style={{ color: "#3b82f6" }}>LinkedIn</a>
            </p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
