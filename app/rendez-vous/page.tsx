import type { Metadata } from "next";
import { ArrowLeft, CalendarClock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Réserver un audit IA",
  description:
    "Réservez un audit IA offert de 30 minutes avec VICKOOZE & Co sans quitter le site.",
  alternates: {
    canonical: "/rendez-vous"
  }
};

export default function BookingPage() {
  return (
    <section className="bg-cream pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="section-shell">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au site
          </Link>
        </Button>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="rounded-lg bg-charcoal p-6 text-white shadow-soft md:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-pine text-white">
              <CalendarClock className="h-6 w-6" />
            </div>
            <p className="mt-8 font-mono text-[11px] font-black uppercase tracking-[0.16em] text-peach">
              Audit IA offert
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-white md:text-5xl">
              Choisissez votre créneau directement ici
            </h1>
            <p className="mt-5 text-base leading-7 text-white/76">
              L’objectif de l’appel : comprendre vos tâches répétitives, vos outils actuels et
              identifier les 3 à 5 automatisations qui peuvent vraiment changer le quotidien.
            </p>
            <ul className="mt-8 grid gap-4 text-sm font-bold text-white/86">
              {[
                "30 minutes en visio",
                "Aucune carte bancaire demandée",
                "Une prochaine étape claire à la fin de l’échange"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-peach" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex text-sm font-bold text-peach underline-offset-4 hover:underline"
            >
              Ouvrir Calendly dans un nouvel onglet si l’agenda ne s’affiche pas
            </a>
          </div>

          <CalendlyEmbed />
        </div>
      </div>
    </section>
  );
}
