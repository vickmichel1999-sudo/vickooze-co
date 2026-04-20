import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Handshake, Scale } from "lucide-react";

import { FinalCTA } from "@/components/FinalCTA";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/ui/card";
import { FOUNDER_NAME, PLACEHOLDER_IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez VICKOOZE & Co, cabinet de conseil IA fondé par Vick-Emmanuel Michel pour accompagner les PME françaises.",
  alternates: {
    canonical: "/a-propos"
  }
};

const values = [
  {
    title: "Pragmatisme",
    text: "Des résultats concrets, pas de slides.",
    icon: Compass
  },
  {
    title: "Transparence",
    text: "ROI chiffré, méthodes éprouvées.",
    icon: Scale
  },
  {
    title: "Proximité",
    text: "Un accompagnement humain et personnalisé.",
    icon: Handshake
  }
];

export default function AboutPage() {
  return (
    <>
      <Hero
        badge="Cabinet conseil IA pour PME françaises"
        title="Le cabinet IA qui propulse votre efficacité"
        subtitle="Des premiers tests IA aux automatisations concrètes, découvrez comment notre approche pragmatique aide les PME françaises à gagner du temps et à structurer leur croissance."
        showVisual={false}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-[1fr_0.82fr]">
          <Reveal>
            <p className="eyebrow">Découvrez notre histoire</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Le mot du fondateur
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-muted">
              <p>
                Je suis Vick-Emmanuel Michel, fondateur de VICKOOZE & Co. Mon
                aventure avec l’IA a commencé par un constat simple : beaucoup de
                dirigeants de PME entendent parler de ChatGPT, d’agents IA et
                d’automatisation, mais très peu savent par où commencer sans perdre du
                temps dans des outils mal choisis.
              </p>
              <p>
                En accompagnant des équipes sur leurs opérations digitales, j’ai vu les
                mêmes blocages revenir encore et encore : des emails traités à la main,
                des leads mal qualifiés, des devis chronophages, des reportings copiés
                d’un outil à l’autre, des demandes clients répétitives et des équipes
                qui manquent de méthode pour utiliser l’IA efficacement.
              </p>
              <p>
                C’est là que l’idée de VICKOOZE & Co est née : aider les PME françaises
                à transformer l’IA en systèmes concrets. Pas de démonstrations
                impressionnantes mais inutiles. Pas de jargon. Nous partons de vos
                processus réels, identifions les tâches à plus fort potentiel, puis
                construisons une roadmap claire avec un ROI mesurable.
              </p>
              <p>
                Aujourd’hui, j’accompagne les dirigeants à distance depuis Bali avec
                une approche très opérationnelle : audit IA, création d’agents IA sur
                mesure, automatisation de workflows avec Make, n8n ou Zapier, et
                formation des équipes pour qu’elles deviennent autonomes sur les bons
                usages.
              </p>
              <p>
                Que vous ayez besoin d’un premier diagnostic, d’un agent IA pour votre
                support, d’un système de qualification de leads ou d’une automatisation
                complète de vos processus internes, notre objectif reste le même :
                libérer vos équipes des tâches répétitives et vous aider à construire
                une croissance plus rapide, plus claire et plus durable.
              </p>
            </div>
            <p className="mt-8 font-bold text-charcoal">
              {FOUNDER_NAME} — Fondateur de VICKOOZE & Co
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-charcoal/10 bg-cream shadow-soft">
              <Image
                src={PLACEHOLDER_IMAGES.founder}
                alt="Photo de Vick-Emmanuel Michel"
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <SectionHeading eyebrow="Nos valeurs" title="Une méthode claire pour avancer vite" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.05}>
                <Card className="h-full p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-coral text-white">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-charcoal">{value.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{value.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
