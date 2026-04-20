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
    <main className="bg-cream">
      <section className="sparkle-field pt-32 pb-16 md:pb-20">
        <div className="section-shell">
          <div className="max-w-4xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-charcoal md:text-[64px]">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{intro}</p>
            <p className="mt-6 text-sm font-bold text-charcoal">
              Dernière mise à jour : {updatedAt}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
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
                  className="text-sm text-white/70 transition-colors hover:text-coral"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div className="grid gap-6">
            <Card className="border-coral/30 bg-coral/10 p-6">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-coral">
                À vérifier avant publication
              </p>
              <p className="mt-3 leading-7 text-muted">
                Cette page fournit une base claire pour le site VICKOOZE & Co.
                Les informations juridiques, fiscales et administratives doivent
                être complétées avec les données exactes de l’entreprise avant la
                mise en ligne officielle.
              </p>
            </Card>

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
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-coral" />
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
