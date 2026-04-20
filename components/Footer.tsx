import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

import { CONTACT_EMAIL, LINKEDIN_URL, SITE_NAME } from "@/lib/constants";

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Audit", href: "/audit" },
      { label: "Services", href: "/services" },
      { label: "Formation", href: "/formation" },
      { label: "Agents IA", href: "/services" }
    ]
  },
  {
    title: "Découvrir",
    links: [
      { label: "À propos", href: "/a-propos" },
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
    <footer className="bg-charcoal py-14 text-white">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 font-sans text-xl font-black">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-coral text-sm text-white">
                V
              </span>
              <span>{SITE_NAME}</span>
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/74 transition-colors hover:text-coral"
            >
              <Mail className="h-4 w-4" />
              {CONTACT_EMAIL}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-fit items-center gap-2 text-sm text-white/74 transition-colors hover:text-coral"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
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
                          className="text-sm text-white/68 transition-colors hover:text-coral"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-white/68 transition-colors hover:text-coral"
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

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/55">
          Copyright © {SITE_NAME} 2026
        </div>
      </div>
    </footer>
  );
}
