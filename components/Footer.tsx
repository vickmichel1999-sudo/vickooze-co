import Link from "next/link";

import { CONTACT_EMAIL, LINKEDIN_URL, SITE_NAME } from "@/lib/constants";

const footerColumns = [
  {
    title: "Offre",
    links: [
      { label: "Audit IA", href: "/audit" },
      { label: "Agents IA", href: "/services" },
      { label: "Automatisation", href: "/services" },
      { label: "Formation", href: "/formation" }
    ]
  },
  {
    title: "Cabinet",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Agent d'audit", href: "/agent-audit" },
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
    <footer className="border-t border-charcoal/10 bg-cream py-16 text-charcoal">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 whitespace-nowrap">
              <span className="relative h-7 w-7 rounded-full bg-coral before:absolute before:inset-1.5 before:rounded-full before:bg-cream after:absolute after:inset-2.5 after:rounded-full after:bg-coral" />
              <span className="font-serif text-xl leading-none">{SITE_NAME}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
              Cabinet de conseil IA pour PME françaises. Audit, agents IA, automatisation et
              formation pour rendre vos équipes plus rapides sans complexifier votre organisation.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 block text-sm text-muted transition-colors hover:text-coral"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
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
                        className="text-sm text-muted transition-colors hover:text-coral"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-coral"
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

        <div className="mt-16 text-center font-serif text-7xl leading-none text-charcoal sm:text-8xl lg:text-[150px]">
          Vickooze<em className="text-coral">&amp;</em>Co.
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-charcoal/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright © {SITE_NAME} 2026</span>
          <span>Fait à Bali, pour les PME françaises, avec Claude.</span>
        </div>
      </div>
    </footer>
  );
}
