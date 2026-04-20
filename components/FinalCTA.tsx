import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const reassurance = [
  "Sans engagement",
  "Sans jargon technique",
  "Repartez avec un plan concret"
];

export function FinalCTA() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-shell">
        <Reveal className="overflow-hidden rounded-lg bg-cta-gradient px-6 py-14 text-center text-white shadow-lift md:px-12 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/80">
            Votre audit IA offert · 30 minutes
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-[1.1] md:text-5xl">
            Identifiez vos 3 automatisations prioritaires en 30 minutes
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/86 md:text-lg">
            Un échange concret avec un expert IA pour repartir avec une vision claire des gains rapides à activer dans votre PME.
          </p>

          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-bold text-white/92">
            {reassurance.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 rounded-full bg-white/20 p-0.5 text-white" />
                {item}
              </li>
            ))}
          </ul>

          <Button asChild size="xl" variant="light" className="mt-8">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
              Réserver mon audit offert
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="mt-5 text-sm text-white/70">
            Appel en visio · Disponible sous 48h · Aucune carte bancaire demandée
          </p>
        </Reveal>
      </div>
    </section>
  );
}
