import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

import { CONTACT_EMAIL, LINKEDIN_URL, LOGO_IMAGE, SITE_NAME } from "@/lib/constants";

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Audit", href: "/audit" },
      { label: "Agents IA", href: "/services" },
      { label: "Automatisations", href: "/services" },
      { label: "Formation", href: "/formation" }
    ]
  },
  {
    title: "Cabinet",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Agent d’audit", href: "/agent-audit" },
      { label: "LinkedIn", href: LINKEDIN_URL, external: true }
    ]
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "CGU", href: "/cgu" },
      { label: "Politique de confidentialité", href: "/politique-confidentialite" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-charcoal py-16 text-white">
      <div className="section-shell">
        <div className="grid gap-10 text-center lg:grid-cols-[1.2fr_1.8fr] lg:text-left">
          <div className="mx-auto max-w-md lg:mx-0">
            <Link
              href="/"
              className="relative mx-auto block h-12 w-[220px] overflow-hidden rounded-md bg-white lg:mx-0"
              aria-label={`${SITE_NAME} - Accueil`}
            >
              <Image
                src={LOGO_IMAGE}
                alt={SITE_NAME}
                fill
                sizes="220px"
                className="object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/62">
              Conseil IA pour TPE/PME françaises : audit, agents IA, automatisation et formation pour
              rendre vos équipes plus rapides sans complexifier votre organisation.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-flex items-center justify-center gap-2 text-sm text-white/74 transition-colors hover:text-pine lg:justify-start"
            >
              <Mail className="h-4 w-4" />
              {CONTACT_EMAIL}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="mx-auto mt-4 flex w-fit items-center gap-2 text-sm text-white/74 transition-colors hover:text-pine lg:mx-0"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 sm:text-left">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-peach">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-white/68 transition-colors hover:text-pine"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-white/68 transition-colors hover:text-pine"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="font-serif text-[clamp(64px,12vw,160px)] font-medium leading-none tracking-[-0.06em] text-white/10">
            vickooze
          </div>
          <div className="mt-6 flex flex-col gap-3 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <span>Copyright © {SITE_NAME} 2026</span>
            <span>Fait à Paris, pour les TPE/PME françaises, avec IA et méthode.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
