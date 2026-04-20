import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Check,
  Clock,
  FileSearch,
  GraduationCap,
  LineChart,
  Link2,
  ListChecks,
  LucideIcon,
  RefreshCw,
  Settings2,
  Sparkles,
  Star,
  TrendingUp,
  Workflow,
  Zap
} from "lucide-react";

import { FinalCTA } from "@/components/FinalCTA";
import { FounderVisual } from "@/components/FounderVisual";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CALENDLY_URL, FOUNDER_NAME, PLACEHOLDER_IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Conseil IA, agents IA et automatisation pour PME",
  description:
    "VICKOOZE & Co accompagne les PME françaises avec audit IA, agents IA sur mesure, automatisation des processus et formation des équipes.",
  alternates: {
    canonical: "/"
  }
};

const heroStats = [
  { value: "5+ ans", label: "d’expérience IA & automatisation" },
  { value: "100%", label: "sur mesure, déployé sur vos outils" },
  { value: "30min", label: "pour identifier vos 3 gains rapides" }
];

const heroPainPoints = [
  "Vos équipes noyées sous les emails",
  "Des devis qui traînent 3 jours",
  "Des leads perdus faute de relance"
];

const heroOutcomes = [
  "3 à 5 automatisations prioritaires",
  "ROI estimé avant déploiement",
  "Agents IA intégrés à vos outils"
];

const offers = [
  {
    tag: "Analyse & benchmark",
    title: "Audit complet de vos processus",
    description:
      "Identifiez les tâches à plus fort potentiel d’automatisation et repartez avec une roadmap priorisée.",
    checkpoints: [
      "Cartographie des processus internes",
      "Identification des tâches à automatiser",
      "Roadmap priorisée avec ROI chiffré"
    ],
    cta: "Accéder à l’audit",
    href: "/audit",
    visual: "audit"
  },
  {
    tag: "Implémentation",
    title: "Agents IA personnalisés",
    description:
      "Déployez des assistants IA adaptés à vos équipes, vos clients et vos flux opérationnels.",
    checkpoints: [
      "Chatbots clients intelligents",
      "Assistants internes pour support, RH et ops",
      "Agents de qualification de leads"
    ],
    cta: "Découvrir les agents",
    href: "/services",
    visual: "agents"
  },
  {
    tag: "Optimisation",
    title: "Workflows automatisés",
    description:
      "Connectez vos outils et automatisez les tâches répétitives avec Make, n8n, Zapier et l’IA.",
    checkpoints: [
      "Traitement automatique des emails et leads",
      "Génération de devis et reportings",
      "Intégration avec votre CRM et vos outils"
    ],
    cta: "Voir les automatisations",
    href: "/services",
    visual: "workflow"
  },
  {
    tag: "Accompagnement",
    title: "Formation IA pour vos équipes",
    description:
      "Rendez vos collaborateurs autonomes sur les outils IA du marché avec une pédagogie concrète.",
    checkpoints: [
      "Fondamentaux ChatGPT et Claude",
      "Prompt engineering avancé",
      "Automatisation et agents IA"
    ],
    cta: "Accéder à la formation",
    href: "/formation",
    visual: "training"
  }
];

const processSteps = [
  {
    step: "1",
    title: "Audit IA",
    description:
      "Nous identifions les tâches chronophages, les points de friction et les gains rapides.",
    icon: FileSearch
  },
  {
    step: "2",
    title: "Recommandations",
    description:
      "Vous recevez un plan d’action clair, priorisé et relié à vos enjeux business.",
    icon: ListChecks
  },
  {
    step: "3",
    title: "Implémentation",
    description:
      "Nous déployons les agents, automatisations et templates avec vos équipes.",
    icon: Settings2
  },
  {
    step: "4",
    title: "Intégration",
    description:
      "Les solutions se connectent à vos outils existants: CRM, emails, Slack ou Notion.",
    icon: Link2
  },
  {
    step: "5",
    title: "Suivi régulier",
    description:
      "Nous mesurons les gains, ajustons les workflows et améliorons les usages dans le temps.",
    icon: LineChart
  }
];

const reasons: Array<{ title: string; text: string; icon: LucideIcon }> = [
  {
    title: "Des solutions déployées, pas des slides",
    text: "Nous livrons des agents et workflows opérationnels, pas des rapports PowerPoint.",
    icon: Sparkles
  },
  {
    title: "Gain de temps mesurable",
    text: "Nous ciblons en priorité les tâches qui rendent +5h à +10h par semaine à vos équipes.",
    icon: Clock
  },
  {
    title: "ROI chiffré avant déploiement",
    text: "Chaque automatisation est chiffrée en heures/mois gagnées avant de lancer le projet.",
    icon: TrendingUp
  },
  {
    title: "Équipes autonomes en 4 sessions",
    text: "Formation pratique et cadre de travail clair pour que l’IA reste utile sans nous.",
    icon: BookOpen
  },
  {
    title: "Intégration à vos outils existants",
    text: "Make, n8n, Zapier, HubSpot, Notion, Slack : pas besoin de changer votre stack.",
    icon: BarChart3
  },
  {
    title: "Vos données restent chez vous",
    text: "Hébergement européen, pas d’entraînement sur vos données, RGPD par défaut.",
    icon: RefreshCw
  }
];

const faqs = [
  {
    question: "Combien de temps pour voir les premiers résultats ?",
    answer:
      "Les premières automatisations sont en général déployées en 2 à 4 semaines après l’audit. Vous mesurez les gains dès les premières semaines d’usage."
  },
  {
    question: "Faut-il changer nos outils actuels ?",
    answer:
      "Non. Nous nous intégrons à votre stack existante (CRM, emails, Slack, Notion, HubSpot, Make, n8n, Zapier). L’objectif est d’ajouter de l’intelligence, pas de tout remplacer."
  },
  {
    question: "Mes données restent-elles sécurisées ?",
    answer:
      "Oui. Nous privilégions les solutions hébergées en Europe, sans entraînement sur vos données, et nous signons un accord de confidentialité dès le premier échange."
  },
  {
    question: "Combien ça coûte ?",
    answer:
      "L’audit découverte de 30 minutes est offert. Les missions sont ensuite chiffrées au forfait, en fonction du périmètre et des gains estimés. Aucun engagement avant validation du ROI."
  },
  {
    question: "Et si on n’a aucune expertise technique en interne ?",
    answer:
      "C’est le cas pour la majorité de nos clients. Nous déployons, documentons et formons vos équipes pour qu’elles restent autonomes sur les usages au quotidien."
  }
];

const collaborationSteps = [
  {
    title: "Appel découverte",
    text: "Nous analysons vos besoins, objectifs et blocages opérationnels."
  },
  {
    title: "Proposition adaptée",
    text: "Nous proposons une offre sur mesure reliée à vos priorités."
  },
  {
    title: "Déploiement",
    text: "Nous mettons en place les agents, workflows et supports."
  },
  {
    title: "Optimisation",
    text: "Nous suivons les résultats et ajustons les solutions dans le temps."
  }
];

function OfferVisual({ type }: { type: string }) {
  if (type === "audit") {
    return (
      <div className="grid h-full min-h-[300px] place-items-center rounded-lg bg-[#E9F4E8] p-6">
        <div className="w-full max-w-sm rounded-lg bg-charcoal p-5 text-white shadow-soft">
          <p className="text-sm font-black">Audit IA complet</p>
          <div className="mt-5 grid gap-3">
            {["Processus", "Emails", "CRM", "Reporting", "Support"].map((item, index) => (
              <div key={item} className="grid grid-cols-[92px_1fr] items-center gap-4 text-xs">
                <span className="text-white/68">{item}</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={`${item}-${starIndex}`}
                      className={`h-4 w-4 ${
                        starIndex <= index ? "fill-coral text-coral" : "fill-white/20 text-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "agents") {
    return (
      <div className="grid h-full min-h-[300px] place-items-center rounded-lg bg-[#EAF2F4] p-6">
        <div className="w-full max-w-sm space-y-4">
          {["Assistant support", "Agent commercial", "Bot RH", "Qualification leads"].map(
            (item, index) => (
              <div
                key={item}
                className={`flex items-center justify-between rounded-lg bg-white px-5 py-4 shadow-soft ${
                  index === 1 ? "bg-peach/55" : ""
                }`}
              >
                <span className="text-sm font-black text-charcoal">{item}</span>
                {index === 1 ? (
                  <span className="text-xs font-black uppercase text-coral">Actif</span>
                ) : (
                  <Bot className="h-5 w-5 text-coral" />
                )}
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  if (type === "workflow") {
    return (
      <div className="relative grid h-full min-h-[300px] place-items-center rounded-lg bg-[#F0E8F6] p-6">
        <div className="absolute left-10 top-10 rounded-lg bg-white px-4 py-3 text-xs font-black text-charcoal shadow-soft">
          Email reçu
        </div>
        <div className="rounded-lg bg-white p-5 shadow-soft">
          <p className="text-sm font-black text-charcoal">Workflow automatisé</p>
          <div className="mt-5 flex items-end gap-3">
            {[42, 68, 55, 82, 76].map((height, index) => (
              <div
                key={height}
                className={`w-10 rounded-sm ${index === 3 ? "bg-coral" : "bg-peach"}`}
                style={{ height: `${height * 1.5}px` }}
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 right-10 rounded-lg bg-coral px-4 py-3 text-xs font-black text-white shadow-soft">
          Rapport envoyé
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[300px] overflow-hidden rounded-lg bg-charcoal">
      <Image
        src={PLACEHOLDER_IMAGES.founder}
        alt={`${FOUNDER_NAME} anime une formation IA`}
        fill
        sizes="(max-width: 1024px) 92vw, 520px"
        className="object-cover object-[48%_42%] opacity-70 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 rounded-lg bg-white/90 p-4 shadow-soft backdrop-blur">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black text-charcoal">Progression équipe</span>
          <span className="rounded-lg bg-coral px-3 py-1 text-xs font-black text-white">92%</span>
        </div>
        <div className="mt-4 h-2 rounded-lg bg-cream">
          <div className="h-2 w-[92%] rounded-lg bg-coral" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-white pt-32 pb-20 md:pb-24">
        <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Audit IA offert pour PME françaises</p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.05] text-charcoal md:text-[64px]">
              Votre PME perd des heures sur des tâches que <span className="text-coral">l’IA</span> peut déjà gérer
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
              Nous identifions les tâches qui ralentissent vos équipes, puis nous déployons les agents IA et automatisations qui libèrent du temps sans complexifier votre organisation.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroPainPoints.map((pain) => (
                <div key={pain} className="rounded-lg border border-charcoal/10 bg-cream px-4 py-3">
                  <p className="text-sm font-black leading-5 text-charcoal">{pain}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg border-l-4 border-coral bg-white p-5 shadow-soft">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-coral">
                Résultat attendu
              </p>
              <p className="mt-3 text-xl font-black leading-7 text-charcoal">
                En 30 minutes, vous repartez avec une vision claire des gains rapides à automatiser en priorité.
              </p>
              <ul className="mt-5 grid gap-3">
                {heroOutcomes.map((outcome) => (
                  <li key={outcome} className="flex items-center gap-3 text-sm font-bold text-muted">
                    <Check className="h-5 w-5 shrink-0 rounded-full bg-coral p-1 text-white" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="xl">
                <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                  Réserver mon audit gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="#offres">Voir ce qu’on automatise</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm font-bold text-muted">
              Pour dirigeants de PME de 5 à 50 salariés qui veulent passer à l’IA sans recruter une équipe technique.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="relative min-h-[460px]">
            <div className="absolute inset-y-0 right-0 w-full overflow-hidden rounded-lg bg-charcoal shadow-soft lg:w-[82%]">
              <Image
                src={PLACEHOLDER_IMAGES.founder}
                alt={`${FOUNDER_NAME} travaille sur une stratégie IA`}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 700px"
                className="object-cover object-[48%_45%] opacity-82 grayscale"
              />
            </div>

            <div className="absolute inset-y-0 right-0 w-full rounded-lg bg-gradient-to-t from-charcoal/30 via-transparent to-transparent lg:w-[82%]" />

            <div className="absolute left-0 top-20 w-[280px] rounded-lg bg-peach/90 px-5 py-4 shadow-soft backdrop-blur">
              <div className="flex items-center justify-between gap-5">
                <span className="text-sm font-black text-charcoal">Tâches détectées</span>
                <span className="font-black text-coral">12</span>
              </div>
              <p className="mt-2 text-xs font-bold text-charcoal/62">dont 5 automatisables rapidement</p>
            </div>

            <div className="absolute left-0 top-44 w-[230px] rounded-lg bg-charcoal p-5 text-white shadow-soft">
              <p className="text-sm font-black">Avant / après IA</p>
              <div className="mt-5 flex h-24 items-end gap-2">
                {[34, 58, 52, 82, 70].map((height, index) => (
                  <div
                    key={height}
                    className={`w-full rounded-sm ${index === 3 ? "bg-coral" : "bg-white/28"}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-white/60">
                <span>Temps</span>
                <span>Coût</span>
                <span>Qualité</span>
              </div>
            </div>

            <div className="absolute bottom-8 right-6 w-[230px] rounded-lg bg-coral p-5 text-white shadow-soft">
              <p className="text-sm font-black">Gain potentiel</p>
              <p className="mt-4 font-serif text-5xl leading-none">+10h</p>
              <p className="mt-2 text-sm font-bold text-white/80">par semaine sur les opérations répétitives</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-12 text-white">
        <div className="section-shell grid gap-8 md:grid-cols-3">
          {heroStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.04}>
              <div className="flex items-center justify-center gap-8 text-center md:justify-start">
                <div>
                  <p className="font-serif text-5xl leading-none text-peach md:text-6xl">{stat.value}</p>
                  <p className="mt-3 max-w-[190px] text-sm leading-5 text-white/70">{stat.label}</p>
                </div>
                {index < heroStats.length - 1 ? (
                  <Zap className="hidden h-5 w-5 fill-peach text-peach md:block" />
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="offres" className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Votre transformation IA commence ici</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Un cabinet full-service pour passer de l’idée IA aux résultats concrets
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Nous accompagnons les dirigeants de PME dans le lancement, l’implémentation et l’optimisation de solutions IA utiles au quotidien.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8">
            {offers.map((offer, index) => (
              <Reveal key={offer.title} delay={index * 0.05}>
                <Card className="overflow-hidden border-0 bg-white shadow-soft">
                  <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[0.86fr_1fr] lg:items-center">
                    <div>
                      <span className="rounded-sm bg-peach/45 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-coral">
                        {offer.tag}
                      </span>
                      <h3 className="mt-6 max-w-xl font-serif text-4xl leading-[1.05] text-charcoal md:text-5xl">
                        {offer.title}
                      </h3>
                      <p className="mt-5 max-w-xl leading-7 text-muted">{offer.description}</p>
                      <Button asChild variant="secondary" className="mt-7">
                        <Link href={offer.href}>{offer.cta}</Link>
                      </Button>
                      <ul className="mt-8 grid gap-4">
                        {offer.checkpoints.map((checkpoint) => (
                          <li key={checkpoint} className="flex gap-3 text-sm font-bold text-charcoal">
                            <Check className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-coral p-1 text-white" />
                            <span>{checkpoint}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <OfferVisual type={offer.visual} />
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Comment ça marche</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Nous facilitons l’intégration de l’IA dans votre PME
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Découvrez le parcours type de nos clients. Nous adaptons notre offre à vos défis spécifiques.
            </p>
          </Reveal>

          <div className="relative mt-16 hidden min-h-[440px] lg:block">
            <svg
              viewBox="0 0 1400 360"
              className="absolute inset-x-1/2 top-4 h-[360px] w-[1700px] -translate-x-1/2"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20 260 C150 60 300 70 420 230 C560 420 670 60 830 150 C980 235 960 420 1090 280 C1190 170 1260 220 1380 40"
                stroke="#8A5A3B"
                strokeWidth="2"
                strokeDasharray="9 12"
              />
            </svg>
            {processSteps.map((step, index) => {
              const positions = [
                "left-[4%] top-[120px]",
                "left-[22%] bottom-[30px]",
                "left-[45%] top-[150px]",
                "right-[20%] bottom-[80px]",
                "right-[3%] top-[110px]"
              ];
              return (
                <div key={step.title} className={`absolute ${positions[index]} text-center`}>
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg border border-dashed border-coral bg-white text-coral shadow-soft">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 max-w-[130px] text-sm font-bold leading-5 text-charcoal">
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-5 lg:mt-0">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.04}>
                <div>
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-coral font-black text-white">
                    {step.step}
                  </div>
                  <h3 className="mt-5 text-xl font-black text-charcoal">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Un accompagnement de A à Z</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Pourquoi nous choisir ?
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-5xl gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 0.04}>
                <div className="text-center">
                  <reason.icon className="mx-auto h-8 w-8 text-coral" />
                  <h3 className="mt-5 text-xl font-black text-charcoal">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{reason.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-16 max-w-5xl">
            <div className="rounded-lg bg-white p-8 shadow-soft md:p-12">
              <div className="text-center">
                <p className="eyebrow">En 4 étapes</p>
                <h3 className="mt-3 font-serif text-4xl leading-[1.1] text-charcoal">
                  Comment travailler avec nous
                </h3>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-4">
                {collaborationSteps.map((item, index) => (
                  <div key={item.title}>
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-coral text-sm font-black text-white">
                      {index + 1}
                    </div>
                    <h4 className="mt-5 text-lg font-black text-charcoal">{item.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="eyebrow">Pourquoi nous</p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
                  Qui va vous accompagner ?
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                  VICKOOZE & Co aide les PME à transformer les idées IA en systèmes utiles: agents, automatisations, méthodes et reporting.
                </p>
                <p className="mt-5 max-w-xl text-lg leading-8 text-charcoal">
                  Intervention à distance depuis Bali, avec un accompagnement clair, humain et orienté résultats.
                </p>
                <Button asChild className="mt-8" variant="outline">
                  <Link href="/a-propos">
                    Découvrir l’histoire
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="min-h-[420px] overflow-hidden rounded-lg">
                <FounderVisual
                  caption="IA utile, process clairs, équipes autonomes."
                  className="h-full min-h-[420px]"
                  imageClassName="object-[48%_42%]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Questions fréquentes</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Les réponses aux questions que vous vous posez
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 max-w-3xl space-y-3">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.04}>
                <details className="group rounded-lg border border-charcoal/10 bg-cream p-5 open:bg-white open:shadow-soft">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-black text-charcoal md:text-lg">
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-coral text-lg font-black text-white transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-muted md:text-base">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
