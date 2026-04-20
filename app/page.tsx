import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Calculator,
  Check,
  ClipboardCheck,
  Clock,
  FileSearch,
  FileText,
  LineChart,
  Link2,
  ListChecks,
  LucideIcon,
  MailCheck,
  RefreshCw,
  Settings2,
  Sparkles,
  Star,
  TrendingUp,
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

const timeSavingsExample = [
  { task: "Relances prospects", time: "2h" },
  { task: "Reporting commercial", time: "2h30" },
  { task: "Comptes rendus de RDV", time: "1h30" },
  { task: "Tri emails et demandes", time: "2h" }
];

const proofOutcomes = [
  { label: "Temps récupérable", value: "8h/sem" },
  { label: "Volume mensuel", value: "32h/mois" },
  { label: "Priorités IA", value: "3 actions" }
];

const afterCallItems: Array<{ title: string; text: string; icon: LucideIcon }> = [
  {
    title: "Carte des tâches chronophages",
    text: "Les tâches répétitives sont classées par volume, impact et niveau de frustration.",
    icon: ClipboardCheck
  },
  {
    title: "Top 3 des automatisations",
    text: "Vous savez quoi automatiser en premier, avec quels outils et dans quel ordre.",
    icon: Sparkles
  },
  {
    title: "Estimation de ROI",
    text: "Chaque piste est reliée à un gain de temps potentiel et un niveau de difficulté.",
    icon: Calculator
  },
  {
    title: "Rapport prêt à partager",
    text: "Un résumé clair avec roadmap, risques, prochaines étapes et proposition indicative.",
    icon: FileText
  }
];

const sampleCaseResults = [
  "32h/mois de tâches administratives identifiées",
  "3 workflows à lancer en priorité",
  "Une roadmap 30 / 60 / 90 jours pour cadrer le déploiement"
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
                        starIndex <= index ? "fill-pine text-pine" : "fill-white/20 text-white/20"
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
                  <span className="text-xs font-black uppercase text-pine">Actif</span>
                ) : (
                  <Bot className="h-5 w-5 text-pine" />
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
                className={`w-10 rounded-sm ${index === 3 ? "bg-pine" : "bg-peach"}`}
                style={{ height: `${height * 1.5}px` }}
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 right-10 rounded-lg bg-pine px-4 py-3 text-xs font-black text-white shadow-soft">
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
          <span className="rounded-lg bg-pine px-3 py-1 text-xs font-black text-white">92%</span>
        </div>
        <div className="mt-4 h-2 rounded-lg bg-cream">
          <div className="h-2 w-[92%] rounded-lg bg-pine" />
        </div>
      </div>
    </div>
  );
}

function AuditReportPreview() {
  return (
    <div className="rounded-lg bg-charcoal p-5 text-white shadow-soft md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-peach">
            Aperçu type
          </p>
          <h3 className="mt-3 font-serif text-3xl leading-tight text-white">
            Rapport d’audit IA
          </h3>
        </div>
        <span className="w-fit rounded-lg bg-pine px-4 py-2 text-sm font-black text-white">
          Score 42/100
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="rounded-lg bg-white p-4 text-charcoal">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-black">Synthèse exécutive</p>
            <MailCheck className="h-5 w-5 text-pine" />
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">
            PME de services avec relances manuelles, CRM incomplet et reporting dispersé.
            Trois automatisations peuvent rendre du temps sans changer les outils actuels.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["Manque", "Relances non systématiques"],
            ["Gain", "8h/semaine estimées"],
            ["Action", "Workflow CRM + email"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-peach">{label}</p>
              <p className="mt-2 text-sm font-bold leading-5 text-white/82">{value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-white/[0.06] p-4">
          <div className="grid grid-cols-[1fr_90px_90px] gap-3 text-xs font-black uppercase tracking-[0.12em] text-peach">
            <span>Automatisation</span>
            <span>ROI</span>
            <span>Difficulté</span>
          </div>
          {[
            ["Relances prospects", "Fort", "Faible"],
            ["Compte rendu RDV", "Moyen", "Faible"],
            ["Reporting hebdo", "Fort", "Moyenne"]
          ].map((row) => (
            <div
              key={row[0]}
              className="mt-3 grid grid-cols-[1fr_90px_90px] gap-3 border-t border-white/10 pt-3 text-sm text-white/82"
            >
              <span>{row[0]}</span>
              <span>{row[1]}</span>
              <span>{row[2]}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs font-bold leading-5 text-white/56">
        Exemple illustratif basé sur une PME fictive. Les gains réels dépendent de vos volumes,
        outils et habitudes d’équipe.
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-white pt-24 pb-20 md:pt-28 md:pb-24">
        <div className="section-shell grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <p className="eyebrow">Audit IA offert pour PME françaises</p>
            <h1 className="mt-6 max-w-[620px] font-serif text-[56px] leading-[0.93] tracking-[-0.035em] text-charcoal sm:text-[70px] md:text-[86px] lg:text-[94px]">
              Votre PME perd des heures sur des tâches que <span className="text-pine">l’IA</span> peut déjà gérer
            </h1>
            <p className="mt-8 max-w-[520px] text-[17px] leading-8 text-muted">
              Nous identifions les tâches qui ralentissent vos équipes, puis nous déployons les agents IA et automatisations qui libèrent du temps sans complexifier votre organisation.
            </p>

            <div className="mt-7 grid max-w-[520px] gap-3 sm:grid-cols-3">
              {heroPainPoints.map((pain) => (
                <div key={pain} className="rounded-md border border-charcoal/10 bg-cream-3 px-4 py-3">
                  <p className="flex items-start gap-2 text-[12px] font-black leading-4 text-charcoal">
                    <span className="mt-1 block h-px w-4 shrink-0 bg-pine" />
                    {pain}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 max-w-[520px] rounded-md border border-pine/30 bg-white p-6 shadow-soft">
              <p className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-muted-2">
                Résultat attendu
              </p>
              <p className="mt-3 text-[18px] font-black leading-7 text-charcoal">
                En 30 minutes, vous repartez avec une vision claire des gains rapides à automatiser en priorité.
              </p>
              <ul className="mt-5 grid gap-3">
                {heroOutcomes.map((outcome) => (
                  <li key={outcome} className="flex items-center gap-3 text-sm font-bold text-muted">
                    <Check className="h-5 w-5 shrink-0 rounded-full bg-pine p-1 text-white" />
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

          <Reveal delay={0.12} className="relative min-h-[540px] lg:mt-20">
            <div className="absolute bottom-8 right-0 top-20 w-full overflow-hidden rounded-lg bg-charcoal shadow-soft lg:w-[78%]">
              <Image
                src={PLACEHOLDER_IMAGES.founder}
                alt={`${FOUNDER_NAME} travaille sur une stratégie IA`}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 700px"
                className="object-cover object-[48%_45%] opacity-82 grayscale"
              />
            </div>

            <div className="absolute bottom-8 right-0 top-20 w-full rounded-lg bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent lg:w-[78%]" />

            <div className="absolute left-2 top-32 w-[280px] rounded-md bg-peach/95 px-5 py-4 shadow-soft backdrop-blur">
              <div className="flex items-center justify-between gap-5">
                <span className="text-sm font-black text-charcoal">Tâches détectées</span>
                <span className="font-black text-pine">12</span>
              </div>
              <p className="mt-2 text-xs font-bold text-charcoal/62">dont 5 automatisables rapidement</p>
            </div>

            <div className="absolute left-8 top-56 w-[230px] rounded-md bg-charcoal p-5 text-white shadow-soft">
              <p className="text-sm font-black">Avant / après IA</p>
              <div className="mt-5 flex h-24 items-end gap-2">
                {[34, 58, 52, 82, 70].map((height, index) => (
                  <div
                    key={height}
                    className={`w-full rounded-sm ${index === 3 ? "bg-pine" : "bg-white/28"}`}
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

            <div className="absolute bottom-20 right-3 w-[230px] rounded-md bg-pine p-5 text-white shadow-soft">
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

      <section className="bg-white py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow eyebrow-center">Preuve business</p>
            <h2 className="mx-auto mt-4 max-w-4xl font-serif text-[44px] leading-[0.98] tracking-[-0.028em] text-charcoal md:text-[64px]">
              Ce que l’IA peut changer dans une PME dès les premières semaines
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-muted">
              Avant de parler d’outils, on chiffre les irritants du quotidien : relances, saisie,
              reporting, comptes rendus et suivi client.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div className="grid gap-6">
                <div>
                  <p className="eyebrow">Exemple concret</p>
                  <h3 className="mt-4 max-w-lg font-serif text-[36px] leading-[1.02] tracking-[-0.02em] text-charcoal md:text-[46px]">
                    Comment récupérer 8h par semaine sans recruter
                  </h3>
                  <p className="mt-5 max-w-lg text-[16px] leading-7 text-muted">
                    Sur une PME de services de 15 à 20 personnes, l’audit permet souvent de repérer
                    plusieurs tâches simples à automatiser sans changer le CRM ni les habitudes de
                    travail.
                  </p>
                </div>

                <div className="grid gap-3">
                  {timeSavingsExample.map((item, index) => (
                    <div
                      key={item.task}
                      className="grid grid-cols-[1fr_120px_56px] items-center gap-4 rounded-md border border-charcoal/10 bg-cream px-5 py-4"
                    >
                      <span className="text-sm font-black text-charcoal">{item.task}</span>
                      <span className="relative h-1 overflow-hidden rounded-full bg-charcoal/10">
                        <span
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-peach to-pine"
                          style={{ width: `${[46, 54, 38, 46][index]}%` }}
                        />
                      </span>
                      <span className="text-right font-serif text-2xl leading-none text-pine">{item.time}</span>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {proofOutcomes.map((item) => (
                    <div key={item.label} className="rounded-md bg-charcoal p-5 text-white">
                      <p className="font-serif text-[34px] leading-none text-peach">{item.value}</p>
                      <p className="mt-2 text-[12px] font-bold leading-4 text-white/70">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-6">
                <div className="rounded-md bg-cream p-7 md:p-10">
                  <p className="eyebrow">Mini étude de cas fictive</p>
                  <h3 className="mt-5 font-serif text-[34px] leading-[1.04] tracking-[-0.02em] text-charcoal md:text-[46px]">
                    PME B2B, 18 salariés, équipe commerciale débordée
                  </h3>
                  <p className="mt-5 text-[16px] leading-7 text-muted">
                    Situation de départ : leads traités à la main, relances oubliées, reporting
                    hebdomadaire reconstruit dans Google Sheets.
                  </p>
                  <ul className="mt-6 grid gap-4">
                    {sampleCaseResults.map((item) => (
                      <li key={item} className="flex gap-3 text-sm font-bold leading-6 text-charcoal">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-pine p-1 text-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 rounded-md bg-white p-4 text-sm font-bold leading-6 text-muted">
                    Exemple illustratif, pas un témoignage client. Il montre le type de diagnostic
                    que l’on cherche à produire après un premier échange.
                  </p>
                </div>
                <AuditReportPreview />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Après l’appel</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Vous obtenez une base de décision, pas un simple échange commercial
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Le premier rendez-vous sert à clarifier les priorités, vérifier le potentiel réel et
              préparer les prochaines actions.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {afterCallItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <Card className="h-full p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-pine text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-black leading-tight text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="offres" className="bg-white py-16 md:py-24">
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
                      <span className="rounded-sm bg-peach/45 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-pine">
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
                            <Check className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-pine p-1 text-white" />
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
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg border border-dashed border-pine bg-white text-pine shadow-soft">
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
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-pine font-black text-white">
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
                  <reason.icon className="mx-auto h-8 w-8 text-pine" />
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
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-pine text-sm font-black text-white">
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
                  Intervention à distance depuis Paris, avec un accompagnement clair, humain et orienté résultats.
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
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pine text-lg font-black text-white transition-transform group-open:rotate-45"
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
