import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Conseil IA pour PME françaises`,
    template: `%s | ${SITE_NAME}`
  },
  description:
    "Audit IA, agents IA sur mesure et automatisation des processus internes pour les PME françaises.",
  keywords: [
    "conseil IA PME",
    "audit IA",
    "agents IA",
    "automatisation PME",
    "formation IA entreprise"
  ],
  authors: [{ name: "Vick-Emmanuel Michel" }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Conseil IA pour PME françaises`,
    description:
      "Automatisez votre PME avec l’IA grâce à un audit pragmatique, des agents IA et des workflows connectés.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Conseil IA pour PME françaises`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Conseil IA pour PME françaises`,
    description:
      "Audit IA, agents IA sur mesure et automatisation des processus internes pour les PME françaises.",
    images: ["/og-image.svg"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={cn(inter.variable, playfair.variable)}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
