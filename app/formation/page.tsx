import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  CircleHelp,
  Clock3,
  FileCheck2,
  GraduationCap,
  MessageSquareText,
  ShieldCheck,
  Trophy,
  Video,
  Workflow
} from "lucide-react";

import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CALENDLY_URL, FOUNDER_NAME, PLACEHOLDER_IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Formation IA complète pour équipes",
  description:
    "Formation IA en 3 modules pour rendre vos collaborateurs autonomes sur ChatGPT, Claude, le prompt engineering, l’automatisation et les agents IA.",
  alternates: {
    canonical: "/formation"
  }
};

const painPoints = [
  {
    title: "Trop d’outils, pas assez de méthode",
    text: "Vos équipes testent ChatGPT, Claude ou Perplexity sans cadre commun.",
    icon: CircleHelp
  },
  {
    title: "Prompts peu fiables",
    text: "Les résultats varient selon les personnes et prennent du temps à corriger.",
    icon: MessageSquareText
  },
  {
    title: "Automatisations floues",
    text: "Vous voyez le potentiel, mais vous ne savez pas quoi connecter en priorité.",
    icon: Workflow
  },
  {
    title: "Adoption difficile",
    text: "Les équipes ont besoin de cas pratiques liés à leur quotidien métier.",
    icon: ShieldCheck
  }
];

const solutionCards = [
  {
    number: "01",
    title: "Gagner en autonomie",
    text: "Vos collaborateurs apprennent à utiliser l’IA dans leurs vrais cas d’usage: emails, documents, recherches, reporting et support."
  },
  {
    number: "02",
    title: "Éviter les erreurs coûteuses",
    text: "Nous posons des règles simples pour contrôler les réponses, protéger les données sensibles et garder un humain dans la boucle."
  },
  {
    number: "03",
    title: "Passer à l’action",
    text: "Chaque module se termine par des templates, prompts et pistes d’automatisation directement exploitables."
  }
];

const modules = [
  {
    label: "Module 1",
    title: "Fondamentaux de l’IA en entreprise",
    duration: "2h30",
    icon: GraduationCap
  },
  {
    label: "Module 2",
    title: "Prompt engineering avancé",
    duration: "3h",
    icon: MessageSquareText
  },
  {
    label: "Module 3",
    title: "Automatisation et création d’agents IA",
    duration: "3h30",
    icon: Bot
  },
  {
    label: "Bonus offert",
    title: "Bibliothèque de prompts et fiches ressources",
    duration: "Inclus",
    icon: FileCheck2
  }
];

const pricingBullets = [
  "Modules à la carte",
  "Cas pratiques adaptés à vos métiers",
  "Formation en visioconférence",
  "Templates et prompts réutilisables",
  "Session questions/réponses",
  "Support post-formation sur demande"
];

const deliverables = [
  {
    title: "Certificat d’achèvement",
    text: "Une attestation de participation pour chaque collaborateur formé.",
    icon: Trophy
  },
  {
    title: "Session questions/réponses",
    text: "Un temps dédié pour clarifier les usages et lever les blocages.",
    icon: Video
  },
  {
    title: "Fiches méthodologiques",
    text: "Prompts, checklists et bonnes pratiques pour garder le rythme après la formation.",
    icon: FileCheck2
  }
];

const faqs = [
  "Pourquoi choisir cette formation ?",
  "Comment se déroule la formation ?",
  "Puis-je former uniquement 1 ou 2 modules ?",
  "Combien de temps dure la formation ?"
];

export default function TrainingPage() {
  return (
    <>
      <section className="bg-white pt-32 pb-16 md:pb-24">
        <div className="section-shell text-center">
          <Reveal className="mx-auto max-w-5xl">
            <p className="eyebrow">Formation des équipes</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-charcoal md:text-[64px]">
              Formation IA pour vos équipes
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              Maîtrisez ChatGPT, Claude, le prompt engineering et les automatisations IA pour gagner du temps dès les premières semaines.
            </p>
            <Button asChild variant="secondary" size="lg" className="mt-8">
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                Prendre rendez-vous
              </a>
            </Button>
          </Reveal>

          <Reveal delay={0.12} className="relative mx-auto mt-16 max-w-6xl">
            <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-charcoal shadow-soft">
              <Image
                src={PLACEHOLDER_IMAGES.founder}
                alt={`${FOUNDER_NAME} prépare une formation IA pour une PME`}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 1120px"
                className="object-cover object-[48%_48%] opacity-78 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-white/10" />
            </div>

            <div className="absolute left-5 top-28 w-[260px] rounded-lg bg-white p-5 text-left shadow-soft md:left-20">
              <p className="text-sm font-black text-charcoal">Prompts prêts à l’emploi</p>
              <div className="mt-4 space-y-3 text-sm text-muted">
                {["Direction", "Commercial", "Support", "Opérations"].map((item) => (
                  <div key={item} className="flex items-center justify-between gap-4">
                    <span>{item}</span>
                    <span className="rounded-lg bg-[#D9F7D8] px-3 py-1 text-xs font-black text-[#217A35]">
                      OK
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 hidden w-[340px] -translate-x-1/2 rounded-lg bg-white p-5 text-left shadow-soft md:block">
              <p className="text-sm font-black text-charcoal">Progression équipe</p>
              <div className="mt-5 flex h-28 items-end gap-3">
                {[38, 54, 47, 72, 66, 83].map((height, index) => (
                  <div
                    key={height + index}
                    className="w-full rounded-sm bg-pine/80"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute right-5 top-20 w-[280px] rounded-lg bg-white p-5 text-left shadow-soft md:right-20">
              <p className="text-sm font-black text-charcoal">Cas pratiques</p>
              <div className="mt-4 space-y-3 text-sm">
                {["Emails clients", "Compte-rendu", "Qualification leads", "Agent interne"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-pine" />
                    <span className="text-muted">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="section-shell">
          <Reveal>
            <p className="eyebrow">Formation IA pour PME</p>
            <h2 className="mt-4 max-w-5xl font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Vous voulez être plus efficace avec l’IA mais vous êtes bloqué au point de départ ?
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {painPoints.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div>
                  <item.icon className="h-8 w-8 text-pine" />
                  <h3 className="mt-6 text-xl font-black text-charcoal">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Notre solution</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Maîtrisez les enjeux
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Nous vous aidons à surmonter les freins les plus courants avec une formation pratique, claire et orientée résultats.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <Card className="relative min-h-[420px] overflow-hidden p-7">
                <p className="eyebrow">01</p>
                <h3 className="mt-8 text-2xl font-black text-charcoal">Structurer les bons usages</h3>
                <p className="mt-4 max-w-sm leading-7 text-muted">
                  Les équipes repartent avec une méthode commune et des cas concrets.
                </p>
                <div className="absolute bottom-8 left-8 right-8 grid gap-3">
                  {["Emails", "Devis", "Reporting", "Support client"].map((label, index) => (
                    <div
                      key={label}
                      className="rounded-lg bg-white px-5 py-3 text-xl font-black text-charcoal shadow-soft"
                      style={{ transform: `rotate(${index % 2 === 0 ? "-2deg" : "2deg"})` }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
            <div className="grid gap-6">
              {solutionCards.slice(1).map((card, index) => (
                <Reveal key={card.title} delay={index * 0.06}>
                  <Card className="grid min-h-[196px] gap-6 overflow-hidden p-7 md:grid-cols-[1fr_220px]">
                    <div>
                      <p className="eyebrow">{card.number}</p>
                      <h3 className="mt-14 text-2xl font-black text-charcoal">{card.title}</h3>
                      <p className="mt-4 leading-7 text-muted">{card.text}</p>
                    </div>
                    <div className="hidden place-items-center bg-cream md:grid">
                      {index === 0 ? (
                        <div className="space-y-4">
                          {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex items-center gap-4">
                              <span className="grid h-8 w-8 place-items-center rounded-lg bg-pine text-xs font-black text-white">
                                !
                              </span>
                              <span className="h-2 w-28 rounded-lg bg-charcoal/10" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg bg-pine p-5 text-white">
                          <p className="text-5xl font-black">+10h</p>
                          <p className="mt-2 text-sm font-bold">gagnées par semaine</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Nos modules</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              On vous accompagne de A à Z
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Une formation flexible, adaptée à vos besoins, que vous pouvez suivre intégralement ou sélectionner à la carte.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.95fr]">
            <div className="grid gap-5">
              {modules.map((module, index) => (
                <Reveal key={module.title} delay={index * 0.05}>
                  <Card className="flex items-center justify-between gap-5 p-6">
                    <div>
                      <p className="eyebrow">{module.label}</p>
                      <h3 className="mt-3 text-xl font-black text-charcoal md:text-2xl">{module.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-muted">
                      <module.icon className="h-5 w-5 text-pine" />
                      {module.duration}
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <Card className="h-full p-8">
                <p className="eyebrow">Parcours sur mesure</p>
                <div className="mt-5 flex items-end gap-3">
                  <p className="text-5xl font-black text-charcoal">Sur devis</p>
                  <p className="pb-2 text-sm font-bold text-muted">/ équipe</p>
                </div>
                <div className="mt-8 space-y-4">
                  {pricingBullets.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-pine" />
                      <span className="font-bold text-charcoal">{item}</span>
                    </div>
                  ))}
                </div>
                <Button asChild variant="secondary" size="xl" className="mt-9 w-full">
                  <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                    Commencer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <p className="mt-5 text-center text-xs font-black uppercase tracking-[0.18em] text-pine">
                  Réservez un appel gratuit en amont
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16 text-white md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-peach">Commencez par vous lancer</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] md:text-5xl">
              Un format clair et transparent
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              Bénéficiez d’une expertise concrète pour former vos équipes, automatiser les bons processus et garder le contrôle sur vos usages IA.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mx-auto mt-12 max-w-5xl rounded-lg border border-white/12 p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-peach">Paiement unique</p>
                <p className="mt-6 text-5xl font-black">Prix sur demande</p>
                <p className="mt-3 text-white/70">Selon le nombre de modules et de collaborateurs.</p>
                <Button asChild size="lg" className="mt-10">
                  <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                    Prendre rendez-vous
                  </a>
                </Button>
              </div>
              <div className="space-y-5 border-white/10 lg:border-l lg:pl-10">
                {pricingBullets.slice(1).map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-peach" />
                    <span className="font-bold text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Pourquoi nous</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Qui va vous apprendre ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Fondateur de VICKOOZE & Co, {FOUNDER_NAME} accompagne les PME sur leurs usages IA, leurs automatisations internes et la création d’agents IA utiles au quotidien.
            </p>
            <p className="mt-5 text-lg leading-8 text-muted">
              L’objectif : vous rendre opérationnel, autonome et capable d’utiliser l’IA sans dépendre d’un empilement d’outils mal configurés.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[430px] overflow-hidden rounded-lg bg-charcoal">
              <Image
                src={PLACEHOLDER_IMAGES.founder}
                alt={`Portrait de ${FOUNDER_NAME}`}
                fill
                sizes="(max-width: 1024px) 90vw, 620px"
                className="object-cover object-[48%_45%] grayscale"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="text-center">
            <h2 className="font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Ne repartez pas les mains vides
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {deliverables.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div>
                  <item.icon className="h-7 w-7 text-pine" />
                  <h3 className="mt-5 text-lg font-black text-charcoal">{item.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="section-shell">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Questions fréquentes
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-20 md:grid-cols-2">
            {faqs.map((question) => (
              <Reveal key={question}>
                <div className="flex items-center justify-between border-b border-charcoal/10 py-7">
                  <p className="text-lg font-black text-charcoal">{question}</p>
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-cream text-2xl text-charcoal">
                    +
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
