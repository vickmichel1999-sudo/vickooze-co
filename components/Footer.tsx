import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

import { CONTACT_EMAIL, LINKEDIN_URL, SITE_NAME } from "@/lib/constants";

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
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1.8fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 text-xl font-black">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-pine font-serif text-lg italic text-white">
                V
              </span>
              <span>{SITE_NAME}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/62">
              Conseil IA pour PME françaises : audit, agents IA, automatisation et formation pour
              rendre vos équipes plus rapides sans complexifier votre organisation.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/74 transition-colors hover:text-pine"
            >
              <Mail className="h-4 w-4" />
              {CONTACT_EMAIL}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-fit items-center gap-2 text-sm text-white/74 transition-colors hover:text-pine"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
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
            <span>Fait à Paris, pour les PME françaises, avec IA et méthode.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
