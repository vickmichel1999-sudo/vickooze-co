import Link from "next/link";

import { Card } from "@/components/ui/card";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
};

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGU", href: "/cgu" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" }
];

export function LegalPage({ eyebrow, title, intro, updatedAt, sections }: LegalPageProps) {
  return (
    <main className="bg-white">
      <section className="pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="section-shell">
          <div className="grid gap-10 text-center lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:text-left">
            <div className="mx-auto max-w-4xl lg:mx-0">
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="mt-4 font-serif text-[44px] leading-[1.02] tracking-[-0.02em] text-charcoal sm:text-5xl md:text-[64px]">
                {title}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-muted md:text-lg md:leading-8 lg:mx-0">
                {intro}
              </p>
              <p className="mt-6 text-sm font-bold text-charcoal">
                Dernière mise à jour : {updatedAt}
              </p>
            </div>

            <div className="rounded-lg bg-cream-3 p-6 shadow-soft">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-pine">
                Documents utiles
              </p>
              <div className="mt-5 grid gap-3">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-lg bg-white px-5 py-4 text-sm font-black text-charcoal shadow-sm transition-colors hover:text-pine"
                  >
                    {link.label}
                    <span className="text-pine">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="section-shell grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-lg bg-charcoal p-6 text-white lg:sticky lg:top-28">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Légal
            </p>
            <nav className="mt-6 grid gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-pine"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div className="grid gap-6">
            {sections.map((section) => (
              <Card key={section.title} className="p-6 md:p-8">
                <h2 className="font-serif text-3xl leading-tight text-charcoal">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-5 leading-8 text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-5 grid gap-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 leading-7 text-muted">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pine" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
