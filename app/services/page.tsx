import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Check,
  CircleAlert,
  Clock3,
  FileText,
  GraduationCap,
  LineChart,
  MailCheck,
  MessageCircle,
  PlugZap,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow
} from "lucide-react";

import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BOOKING_PATH } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services IA à la demande",
  description:
    "Agents IA personnalisés, automatisation Make/n8n/Zapier, chatbots, qualification de leads, veille automatisée et formation IA pour TPE/PME.",
  alternates: {
    canonical: "/services"
  }
};

const painPoints = [
  {
    title: "Trop de tâches manuelles",
    text: "Emails, relances, reporting, devis et saisies CRM consomment des heures chaque semaine.",
    icon: Clock3
  },
  {
    title: "Des outils qui ne se parlent pas",
    text: "Vos données circulent entre Gmail, CRM, Notion, Airtable ou Slack sans logique automatisée.",
    icon: PlugZap
  },
  {
    title: "L’IA reste au stade du test",
    text: "Les équipes utilisent ChatGPT ponctuellement, mais rien n’est intégré aux vrais processus.",
    icon: CircleAlert
  }
];

const servicePillars = [
  {
    title: "Agents IA personnalisés",
    promise: "Un assistant fiable qui répond, trie, qualifie ou prépare le travail de vos équipes.",
    useCases: [
      "Assistant support client relié à votre base de connaissances",
      "Agent interne pour RH, opérations ou direction",
      "Agent commercial pour préparer relances et synthèses prospects"
    ],
    deliverables: [
      "Prompt système et règles métier",
      "Base de connaissance structurée",
      "Tests, garde-fous et documentation"
    ],
    icon: BrainCircuit
  },
  {
    title: "Automatisation de workflows",
    promise: "Des workflows Make, n8n ou Zapier qui suppriment les copier-coller et les oublis.",
    useCases: [
      "Email entrant vers CRM avec résumé IA",
      "Création automatique de tâches après un appel",
      "Reporting hebdomadaire envoyé à l’équipe"
    ],
    deliverables: [
      "Scénarios automatisés",
      "Connexions à vos outils existants",
      "Monitoring et procédure de reprise"
    ],
    icon: Workflow
  },
  {
    title: "Acquisition et relation client",
    promise: "Des systèmes pour mieux répondre, mieux qualifier et mieux relancer vos prospects.",
    useCases: [
      "Chatbot intelligent pour questions récurrentes",
      "Qualification automatique des leads",
      "Séquences d’emails personnalisées avec IA"
    ],
    deliverables: [
      "Scripts de qualification",
      "Scoring prospect",
      "Routage vers la bonne action commerciale"
    ],
    icon: Target
  },
  {
    title: "Contenu, veille et formation",
    promise: "Des routines IA pour produire, surveiller le marché et rendre vos équipes autonomes.",
    useCases: [
      "Fiches produits, emails et comptes rendus",
      "Veille concurrentielle automatisée",
      "Formation des équipes aux bons réflexes IA"
    ],
    deliverables: [
      "Templates réutilisables",
      "Synthèses régulières",
      "Ateliers pratiques et fiches méthode"
    ],
    icon: GraduationCap
  }
];

const services = [
  {
    title: "Création d’agents IA personnalisés",
    text: "Assistants adaptés à vos opérations, vos clients, vos règles métier et vos documents.",
    icon: Bot
  },
  {
    title: "Automatisation Make, n8n et Zapier",
    text: "Workflows connectés à votre CRM, vos emails, Slack, Notion, Airtable ou back-office.",
    icon: Workflow
  },
  {
    title: "Chatbots intelligents pour support client",
    text: "Réponses fiables, escalade humaine et base de connaissance propre.",
    icon: MessageCircle
  },
  {
    title: "Qualification automatique de leads",
    text: "Scoring, enrichissement, résumé et routage des prospects vers la bonne action.",
    icon: MailCheck
  },
  {
    title: "Génération de contenu IA",
    text: "Fiches produits, emails, comptes rendus, scripts commerciaux et documents internes.",
    icon: FileText
  },
  {
    title: "Veille concurrentielle automatisée",
    text: "Surveillance des signaux clés et synthèses régulières exploitables.",
    icon: Radar
  },
  {
    title: "Intégration IA dans vos outils",
    text: "Connexion avec vos outils actuels pour éviter d’ajouter une couche inutile.",
    icon: PlugZap
  },
  {
    title: "Formation équipes aux outils IA",
    text: "Ateliers concrets pour que vos collaborateurs deviennent autonomes.",
    icon: GraduationCap
  }
];

const outcomes = [
  "Un système IA branché à vos vrais processus",
  "Des tâches répétitives supprimées ou réduites",
  "Une documentation claire pour vos équipes",
  "Des indicateurs simples pour suivre le gain de temps"
];

const steps = [
  {
    title: "Cadrage",
    text: "Nous identifions le processus à plus fort impact et les outils à connecter.",
    icon: Route
  },
  {
    title: "Prototype",
    text: "Nous construisons une première version testable sur un cas réel.",
    icon: Sparkles
  },
  {
    title: "Déploiement",
    text: "Nous mettons en production le workflow, l’agent ou le chatbot validé.",
    icon: ShieldCheck
  },
  {
    title: "Optimisation",
    text: "Nous suivons les résultats, corrigeons les frictions et formons vos équipes.",
    icon: LineChart
  }
];

export default function ServicesPage() {
  return (
    <>
      <section className="overflow-hidden bg-white pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="section-shell grid items-center gap-10 text-center lg:grid-cols-[0.95fr_1.05fr] lg:text-left">
          <Reveal className="mx-auto max-w-3xl lg:mx-0">
            <p className="eyebrow">Services IA à la demande</p>
            <h1 className="mx-auto mt-5 max-w-3xl font-serif text-[44px] leading-[1.02] tracking-[-0.02em] text-charcoal sm:text-5xl md:text-[64px] lg:mx-0">
              Vos process sont prêts pour l’IA. Il manque le bon système.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8 lg:mx-0">
              Nous créons des agents IA, automatisations et workflows connectés à vos outils pour réduire les tâches répétitives, améliorer le suivi client et accélérer vos opérations.
            </p>

            <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-3 lg:mx-0">
              {["Agent IA", "Workflow", "Formation"].map((item) => (
                <div key={item} className="rounded-lg border border-charcoal/10 bg-cream px-4 py-3">
                  <p className="text-sm font-black text-charcoal">{item}</p>
                  <p className="mt-1 text-xs font-bold text-muted">livré sur mesure</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <Button asChild size="xl" className="w-full sm:w-auto">
                <Link href={BOOKING_PATH}>
                  Réserver un diagnostic
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
                <Link href="#services-concrets">Voir les services</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm font-bold text-muted">
              Idéal pour les TPE/PME de 5 à 50 salariés qui veulent automatiser sans embaucher une équipe technique.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mx-auto w-full max-w-[560px] lg:max-w-none">
            <div className="relative min-h-[420px] rounded-lg bg-charcoal p-5 text-left text-white shadow-soft sm:p-6 md:min-h-[500px]">
              <div className="absolute right-5 top-5 rounded-lg bg-pine px-4 py-3 text-sm font-black sm:right-6 sm:top-6">
                +10h/semaine
              </div>
              <div className="pt-16">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-peach">
                  Avant
                </p>
                <div className="mt-5 grid gap-3">
                  {["Relances oubliées", "CRM incomplet", "Reporting manuel"].map((item) => (
                    <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm font-bold text-white/74">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="my-8 h-px bg-white/10" />

                <p className="text-sm font-black uppercase tracking-[0.16em] text-peach">
                  Après
                </p>
                <div className="mt-5 grid gap-3">
                  {outcomes.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-lg bg-white p-4 text-charcoal">
                      <Check className="h-5 w-5 shrink-0 rounded-full bg-pine p-1 text-white" />
                      <span className="text-sm font-black">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Le problème</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              L’IA ne crée de la valeur que lorsqu’elle entre dans vos opérations
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Le vrai sujet n’est pas d’ajouter un nouvel outil. C’est de transformer vos tâches répétitives en systèmes simples, mesurables et utilisables par vos équipes.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {painPoints.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.05}>
                <Card className="h-full p-6">
                  <point.icon className="h-8 w-8 text-pine" />
                  <h3 className="mt-6 text-xl font-black text-charcoal">{point.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{point.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="services-concrets" className="bg-white py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Ce que vous pouvez nous confier</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Des services conçus pour livrer un résultat opérationnel
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Chaque mission part d’un cas d’usage précis : gagner du temps, mieux répondre, mieux qualifier, mieux produire ou mieux piloter.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8">
            {servicePillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.05}>
                <Card className="overflow-hidden border-0 bg-cream shadow-soft">
                  <div className="grid gap-8 p-5 sm:p-7 md:p-10 lg:grid-cols-[0.8fr_1fr]">
                    <div className="text-center lg:text-left">
                      <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-pine text-white lg:mx-0">
                        <pillar.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-6 font-serif text-3xl leading-[1.05] text-charcoal sm:text-4xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-5 text-lg leading-8 text-muted">{pillar.promise}</p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="rounded-lg bg-white p-5">
                        <p className="text-sm font-black uppercase tracking-[0.14em] text-pine">
                          Cas d’usage
                        </p>
                        <ul className="mt-4 grid gap-3">
                          {pillar.useCases.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                              <Check className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-lg bg-charcoal p-5 text-white">
                        <p className="text-sm font-black uppercase tracking-[0.14em] text-peach">
                          Livrables
                        </p>
                        <ul className="mt-4 grid gap-3">
                          {pillar.deliverables.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-6 text-white/74">
                              <Check className="mt-0.5 h-5 w-5 shrink-0 text-peach" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Catalogue de missions</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Les briques que nous pouvons déployer pour vous
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.035}>
                <Card className="group h-full p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:text-left">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-white text-pine transition-colors group-hover:bg-pine group-hover:text-white sm:mx-0">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-black leading-tight text-charcoal">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{service.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="section-shell">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Méthode de déploiement</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Une mission courte, cadrée et orientée résultat
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Vous gardez le contrôle : nous cadrons le besoin, construisons une première version, validons sur le terrain et formons vos équipes.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <div className="h-full rounded-lg border border-charcoal/10 p-6 text-center sm:text-left">
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-pine text-white">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="font-serif text-4xl text-peach">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-black text-charcoal">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <div className="rounded-lg bg-charcoal p-7 text-white md:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <div>
                  <p className="eyebrow text-peach">Action</p>
                  <h3 className="mt-4 font-serif text-4xl leading-[1.1] text-white">
                    Choisissons le premier process à automatiser
                  </h3>
                </div>
                <div>
                  <p className="text-lg leading-8 text-white/74">
                    Lors du diagnostic, nous regardons vos tâches répétitives, vos outils actuels et les gains possibles. Ensuite, vous repartez avec une recommandation claire : agent IA, workflow, chatbot, formation ou audit complet.
                  </p>
                  <Button asChild size="xl" variant="light" className="mt-6 w-full sm:w-auto">
                    <Link href={BOOKING_PATH}>
                      Réserver mon diagnostic
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
