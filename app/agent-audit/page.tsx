import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Check, ShieldCheck } from "lucide-react";

import { AuditAgentForm } from "@/components/AuditAgentForm";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Agent audit IA",
  description:
    "Agent IA de diagnostic pour analyser les processus d’une PME, détecter les manques, prioriser les automatisations et proposer une roadmap.",
  alternates: {
    canonical: "/agent-audit"
  }
};

const promises = [
  "Détecte les manques opérationnels",
  "Priorise les agents et workflows IA",
  "Propose une roadmap 30 / 60 / 90 jours"
];

export default function AgentAuditPage() {
  return (
    <>
      <section className="overflow-hidden bg-white pt-32 pb-16 md:pb-24">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Agent IA interne</p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.05] text-charcoal md:text-[64px]">
              Réalisez un pré-audit IA en quelques minutes
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
              Renseignez les outils, tâches répétitives et objectifs d’une PME. L’agent identifie les manques, les automatisations prioritaires et le processus à suivre.
            </p>
            <div className="mt-8 grid gap-3">
              {promises.map((promise) => (
                <div key={promise} className="flex items-center gap-3 text-sm font-black text-charcoal">
                  <Check className="h-5 w-5 rounded-full bg-coral p-1 text-white" />
                  {promise}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="xl">
                <a href="#agent">
                  Lancer le questionnaire
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                  Réserver un appel
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-lg bg-charcoal p-6 text-white shadow-soft md:p-8">
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-coral text-white">
                  <Bot className="h-6 w-6" />
                </div>
                <span className="rounded-lg bg-white px-4 py-2 text-sm font-black text-charcoal">
                  v1 audit
                </span>
              </div>
              <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-white">
                Sortie structurée pour préparer une mission
              </h2>
              <div className="mt-8 grid gap-4">
                {[
                  "Score de maturité IA",
                  "Manques détectés",
                  "Automatisations prioritaires",
                  "Roadmap et garde-fous"
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm font-bold text-white/78">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-start gap-3 rounded-lg bg-white p-5 text-charcoal">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-coral" />
                <p className="text-sm font-bold leading-6">
                  La clé OpenAI reste côté serveur via la route API Next.js. Rien n’est exposé dans le navigateur.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="agent" className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <AuditAgentForm />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell">
          <Reveal className="rounded-lg bg-charcoal p-7 text-white md:p-10">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-center">
              <div>
                <p className="eyebrow text-peach">À transformer ensuite</p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-white">
                  L’agent prépare le diagnostic. L’audit humain valide les priorités.
                </h2>
              </div>
              <div>
                <p className="text-lg leading-8 text-white/74">
                  Utilise ce rapport pour préparer tes rendez-vous, challenger les réponses du dirigeant et proposer une première mission claire.
                </p>
                <Button asChild variant="light" size="xl" className="mt-6">
                  <Link href="/audit">
                    Voir l’offre audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
