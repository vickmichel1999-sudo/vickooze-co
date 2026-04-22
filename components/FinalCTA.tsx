import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Check } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { BOOKING_PATH, FOUNDER_NAME, PLACEHOLDER_IMAGES } from "@/lib/constants";

const reassurance = [
  "Sans engagement",
  "Sans jargon technique",
  "Repartez avec un plan concret"
];

export function FinalCTA({ showAgentAuditCta = false }: { showAgentAuditCta?: boolean } = {}) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-shell">
        <Reveal className="overflow-hidden rounded-lg bg-cta-gradient p-6 text-center text-white shadow-lift md:p-10 lg:p-12 lg:text-left">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-lg bg-charcoal shadow-lift lg:mx-0">
              <Image
                src={PLACEHOLDER_IMAGES.founder}
                alt={`Portrait de ${FOUNDER_NAME}`}
                fill
                sizes="(max-width: 1024px) 320px, 360px"
                className="object-cover object-[48%_42%] grayscale-[12%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/82 via-charcoal/12 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/14 p-4 backdrop-blur">
                <p className="font-serif text-2xl leading-tight">{FOUNDER_NAME}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-white/72">
                  Fondateur · VICKOOZE & Co
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/80">
                Votre audit IA offert · 30 minutes
              </p>
              <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-[1.1] md:text-5xl lg:mx-0">
                Identifiez vos 3 automatisations prioritaires en 30 minutes
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/86 md:text-lg lg:mx-0">
                Vous échangez directement avec moi pour repérer les gains rapides,
                éviter les mauvais outils et repartir avec une prochaine étape claire.
              </p>

              <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-bold text-white/92 lg:mx-0 lg:justify-start">
                {reassurance.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 rounded-full bg-white/20 p-0.5 text-white" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <Button asChild size="xl" variant="light" className="w-full sm:w-auto">
                  <Link href={BOOKING_PATH}>
                    Réserver mon audit offert
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                {showAgentAuditCta ? (
                  <Button
                    asChild
                    size="xl"
                    className="w-full border border-white/28 bg-white/10 text-white shadow-none hover:-translate-y-0.5 hover:bg-white hover:text-charcoal sm:w-auto"
                  >
                    <Link href="/agent-audit">
                      <Bot className="mr-2 h-5 w-5" />
                      Tester l’agent d’audit de votre site en 3 minutes
                    </Link>
                  </Button>
                ) : null}
              </div>
              <p className="mt-5 text-sm text-white/70">
                Appel en visio · Disponible sous 48h · Aucune carte bancaire demandée
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
