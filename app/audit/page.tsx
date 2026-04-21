import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CircleAlert,
  Clock3,
  FileSearch,
  FileText,
  LineChart,
  PlayCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow
} from "lucide-react";

import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CALENDLY_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Audit IA complet",
  description:
    "Audit IA complet pour identifier les processus à automatiser, estimer le ROI et construire une roadmap d’implémentation sur 90 jours.",
  alternates: {
    canonical: "/audit"
  }
};

const painPoints = [
  {
    title: "Vous savez que l’IA peut aider, mais pas par où commencer",
    text: "Les idées sont nombreuses, mais les priorités restent floues.",
    icon: CircleAlert
  },
  {
    title: "Vos équipes perdent du temps sur des tâches répétitives",
    text: "Relances, comptes rendus, reporting, saisie et recherche d’informations s’empilent.",
    icon: Clock3
  },
  {
    title: "Vous voulez éviter les outils inutiles",
    text: "L’objectif n’est pas d’acheter plus de logiciels, mais d’automatiser les bons process.",
    icon: ShieldCheck
  }
];

const included = [
  "Analyse de vos processus internes actuels",
  "Cartographie des tâches répétitives et chronophages",
  "Identification des 3 à 5 tâches prioritaires à automatiser",
  "Estimation du gain de temps et du ROI pour chaque tâche",
  "Roadmap d’implémentation priorisée sur 90 jours",
  "Recommandations d’outils IA adaptés à votre stack",
  "Session Q&A personnalisée pour valider les priorités"
];

const deliverables = [
  {
    title: "Rapport d’audit PDF personnalisé",
    text: "Un document clair avec les constats, opportunités et recommandations.",
    icon: FileText
  },
  {
    title: "Présentation vidéo des recommandations",
    text: "Une explication simple pour comprendre où agir et dans quel ordre.",
    icon: PlayCircle
  },
  {
    title: "Plan d’action sur 90 jours",
    text: "Les premières automatisations à lancer, avec priorité et niveau d’impact.",
    icon: Route
  },
  {
    title: "Liste des outils et intégrations",
    text: "Agents IA, Make, n8n, Zapier, CRM ou outils internes à connecter.",
    icon: Workflow
  }
];

const afterAuditCall = [
  {
    title: "Diagnostic des pertes de temps",
    text: "Un classement des tâches qui bloquent vos équipes et qui méritent une automatisation.",
    icon: FileSearch
  },
  {
    title: "Priorités IA chiffrées",
    text: "Une estimation du gain potentiel, de la difficulté et du ROI pour chaque piste.",
    icon: BarChart3
  },
  {
    title: "Aperçu du rapport généré",
    text: "Une synthèse claire avec manques détectés, roadmap, risques et prochaine étape.",
    icon: FileText
  },
  {
    title: "Décision simple",
    text: "Vous savez si une mission IA est pertinente maintenant, plus tard, ou pas nécessaire.",
    icon: Route
  }
];

const outcomes = [
  {
    title: "Une vision claire",
    text: "Vous savez quelles tâches automatiser, pourquoi, et avec quel ordre de priorité.",
    icon: Target
  },
  {
    title: "Un ROI estimé",
    text: "Chaque piste est reliée à un gain de temps ou un impact opérationnel concret.",
    icon: BarChart3
  },
  {
    title: "Un plan actionnable",
    text: "Vous pouvez lancer une première automatisation sans repartir de zéro.",
    icon: Sparkles
  }
];

const auditSteps = [
  {
    title: "Appel découverte",
    text: "Nous cadrons vos outils, vos équipes et vos tâches répétitives.",
    icon: Users
  },
  {
    title: "Cartographie",
    text: "Nous listons les processus, points de friction et données disponibles.",
    icon: FileSearch
  },
  {
    title: "Priorisation",
    text: "Nous classons les opportunités selon gain de temps, faisabilité et ROI.",
    icon: LineChart
  },
  {
    title: "Roadmap",
    text: "Vous repartez avec le plan des premières actions à mener sur 90 jours.",
    icon: Route
  }
];

const useCases = [
  "Automatiser le traitement des emails entrants",
  "Générer des comptes rendus et tâches après réunion",
  "Qualifier les leads et préparer les relances",
  "Créer un assistant support client ou interne",
  "Produire des devis, synthèses ou reportings",
  "Connecter CRM, Slack, Notion, Airtable ou Google Workspace"
];

export default function AuditPage() {
  return (
    <>
      <section className="overflow-hidden bg-white pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="section-shell grid items-center gap-10 text-center lg:grid-cols-[0.95fr_1.05fr] lg:text-left">
          <Reveal className="mx-auto max-w-3xl lg:mx-0">
            <p className="eyebrow">Audit IA pour PME</p>
            <h1 className="mx-auto mt-5 max-w-3xl font-serif text-[44px] leading-[1.02] tracking-[-0.02em] text-charcoal sm:text-5xl md:text-[64px] lg:mx-0">
              Avant d’automatiser, identifiez les tâches qui rapportent vraiment.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8 lg:mx-0">
              En 30 minutes, nous analysons vos processus, repérons les gains rapides et posons les bases d’une roadmap IA claire, priorisée et mesurable.
            </p>

            <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-pine/25 bg-cream p-5 shadow-soft lg:mx-0">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-pine">
                Promesse
              </p>
              <p className="mt-3 text-xl font-black leading-7 text-charcoal">
                Vous repartez avec les 3 à 5 automatisations les plus utiles pour votre PME, pas avec une liste d’outils à tester au hasard.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <Button asChild size="xl" className="w-full sm:w-auto">
                <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                  Réserver mon audit gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
                <Link href="/agent-audit">Tester l’agent IA</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm font-bold text-muted">
              Pour dirigeants de PME qui veulent passer à l’IA avec méthode, sans perdre du temps dans des tests dispersés.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mx-auto w-full max-w-[560px] lg:max-w-none">
            <div className="relative min-h-[420px] rounded-lg bg-charcoal p-5 text-left text-white shadow-soft sm:p-6 md:min-h-[500px]">
              <div className="absolute right-5 top-5 rounded-lg bg-pine px-4 py-3 text-sm font-black sm:right-6 sm:top-6">
                Audit offert 30min
              </div>
              <div className="pt-16">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-peach">
                  Diagnostic opérationnel
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-white">
                  De la tâche manuelle au système automatisé
                </h2>

                <div className="mt-8 grid gap-4">
                  {[
                    { label: "Temps perdu estimé", value: "8-12h/sem" },
                    { label: "Tâches à analyser", value: "15+" },
                    { label: "Priorités retenues", value: "3-5" }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg bg-white p-5 text-charcoal">
                      <span className="text-sm font-black">{item.label}</span>
                      <span className="font-serif text-3xl text-pine">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-sm font-black text-white">Exemples de sorties</p>
                  <div className="mt-4 grid gap-3">
                    {["Agent IA support", "Workflow CRM", "Reporting automatique"].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-white/74">
                        <Check className="h-5 w-5 shrink-0 text-peach" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Pourquoi commencer par un audit ?</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Une IA utile commence par un bon diagnostic
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              L’audit évite les décisions au feeling. Il transforme vos intuitions en priorités concrètes, chiffrées et déployables.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {painPoints.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.05}>
                <Card className="h-full p-6 text-center sm:text-left">
                  <point.icon className="mx-auto h-8 w-8 text-pine sm:mx-0" />
                  <h3 className="mt-6 text-xl font-black text-charcoal">{point.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{point.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-start">
          <Reveal className="text-center lg:text-left">
            <p className="eyebrow">Ce qui est inclus</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl lg:mx-0">
              Une analyse actionnable de vos processus
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Nous passons vos tâches au crible pour distinguer ce qui peut être automatisé rapidement, ce qui doit être préparé, et ce qui ne mérite pas encore d’investissement.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {included.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <div className="flex items-start gap-4 rounded-lg border border-charcoal/10 bg-cream p-5">
                  <Check className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-pine p-1 text-white" />
                  <p className="font-bold leading-7 text-charcoal">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16 text-white md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-peach">Ce que vous obtenez après l’appel</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-white md:text-5xl">
              Une preuve de potentiel avant d’investir
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/72">
              L’objectif du premier échange est simple : vérifier s’il existe assez de gains
              concrets pour justifier une mission IA.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {afterAuditCall.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="h-full rounded-lg border border-white/10 bg-white/[0.04] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-pine text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-black leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/68">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="livrables" className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Livrables</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Vous repartez avec un plan clair
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Le but n’est pas de faire un audit théorique. Vous obtenez un support de décision pour passer à l’action.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((deliverable, index) => (
              <Reveal key={deliverable.title} delay={index * 0.05}>
                <Card className="h-full p-6 text-center sm:text-left">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-charcoal text-peach sm:mx-0">
                    <deliverable.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-black leading-tight text-charcoal">
                    {deliverable.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{deliverable.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Ce que l’audit peut déclencher</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Des pistes concrètes pour vendre, produire et piloter plus vite
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item, index) => (
              <Reveal key={item} delay={index * 0.035}>
                <div className="flex h-full items-start gap-4 rounded-lg bg-cream p-5 text-left">
                  <Bot className="mt-0.5 h-6 w-6 shrink-0 text-pine" />
                  <p className="font-bold leading-7 text-charcoal">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Déroulé</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Un audit simple, rapide et structuré
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {auditSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <Card className="h-full p-6 text-center sm:text-left">
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-pine text-white">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="font-serif text-4xl text-peach">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-black text-charcoal">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <div className="h-full rounded-lg bg-charcoal p-7 text-white md:p-10">
                <p className="eyebrow text-peach">Résultat</p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-white">
                  Après l’audit, vous savez quoi automatiser en premier.
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/74">
                  Vous pouvez ensuite choisir : lancer un agent IA, automatiser un workflow, former vos équipes ou garder la roadmap en interne.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {outcomes.map((outcome, index) => (
                <Reveal key={outcome.title} delay={index * 0.05}>
                  <Card className="h-full p-6">
                    <outcome.icon className="h-8 w-8 text-pine" />
                    <h3 className="mt-6 text-xl font-black text-charcoal">{outcome.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{outcome.text}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-3xl rounded-lg bg-cta-gradient p-8 text-center text-white shadow-lift md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/80">
              Prix
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.1] md:text-5xl">
              Audit découverte offert
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/84">
              Le premier échange de 30 minutes est offert. Il sert à cadrer votre situation, identifier les premiers gains et voir si une mission d’audit complète est pertinente.
            </p>
                  <Button asChild size="xl" variant="light" className="mt-8 w-full sm:w-auto">
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                Réserver mon audit gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
