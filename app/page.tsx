import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { AgentDemo } from "@/components/AgentDemo";
import { Marquee } from "@/components/Marquee";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL, CONTACT_EMAIL, FOUNDER_NAME, PLACEHOLDER_IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Conseil IA, agents IA et automatisation pour PME",
  description:
    "VICKOOZE & Co accompagne les PME françaises avec audit IA, agents Claude, automatisation des processus et formation des équipes.",
  alternates: {
    canonical: "/"
  }
};

const heroMeta = [
  { value: "47", label: "missions IA cadrées" },
  { value: "6,2 M€", label: "ROI potentiel cartographié" },
  { value: "4.9/5", label: "satisfaction ateliers" }
];

const stats = [
  { value: "47", suffix: ".", label: "Entreprises et projets accompagnés depuis 2023" },
  { value: "6,2", suffix: "M€", label: "Économies et revenus potentiels identifiés" },
  { value: "14", suffix: "x", label: "Accélération moyenne sur les workflows automatisés" },
  { value: "~48", suffix: "h", label: "Délai moyen entre audit et premier prototype" }
];

const services = [
  {
    number: "01 / AUDIT",
    icon: "A",
    title: "Audit & cadrage stratégique",
    text:
      "Nous cartographions vos processus, identifions les 3 à 5 points où l'IA a le meilleur retour, et chiffrons précisément l'impact.",
    tags: ["2 semaines", "Livrable chiffré", "Comité direction"]
  },
  {
    number: "02 / BUILD",
    icon: "B",
    title: "Agents & automatisations sur mesure",
    text:
      "Nous construisons des agents Claude, workflows Make/n8n/Zapier et systèmes de reporting reliés à vos outils existants.",
    tags: ["4 à 12 semaines", "Claude · RAG · open source", "Déploiement Vercel/AWS"]
  },
  {
    number: "03 / ENABLE",
    icon: "F",
    title: "Formation & acculturation",
    text:
      "Nous formons vos équipes pour qu'elles sachent utiliser, piloter et améliorer les outils IA sans dépendre de nous au quotidien.",
    tags: ["1 à 3 jours", "Sur mesure", "Cas pratiques PME"]
  }
];

const auditBullets = [
  "Score de maturité IA et manques opérationnels",
  "Automatisations prioritaires avec ROI et difficulté",
  "Roadmap 30 / 60 / 90 jours",
  "Rapport PDF + Excel envoyé par email"
];

const testimonials = [
  {
    initials: "CL",
    quote:
      "En deux semaines, nous avons enfin compris où l'IA pouvait vraiment nous faire gagner du temps. La roadmap était claire, chiffrée et actionnable.",
    author: "Camille Lefèvre",
    role: "Directrice opérations · PME logistique"
  },
  {
    initials: "YB",
    quote:
      "L'audit a transformé une envie floue d'utiliser l'IA en plan concret : agents de relance, reporting automatique et formation des équipes.",
    author: "Yanis Boutros",
    role: "Co-fondateur · SaaS B2B"
  }
];

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-cream py-24 md:py-28">
        <div className="section-shell grid items-end gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Cabinet conseil IA · PME françaises</p>
            <h1 className="mt-8 max-w-5xl font-serif text-5xl font-medium leading-[0.98] text-charcoal sm:text-6xl lg:text-7xl xl:text-[92px]">
              L’IA qui <em className="font-normal italic text-coral">travaille</em> pour vos
              équipes, pas contre elles.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
              Audit, agents IA et automatisation des processus internes pour libérer vos équipes
              des tâches répétitives, sans recruter une équipe technique.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link href="/agent-audit">
                  Lancer l’audit IA gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="#process">Voir notre méthode</Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 border-t border-charcoal/10 pt-6">
              {heroMeta.map((item) => (
                <div key={item.label} className="text-sm leading-5 text-muted">
                  <strong className="mb-1 block font-serif text-2xl font-medium leading-none text-charcoal">
                    {item.value}
                  </strong>
                  {item.label}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-[4/5] overflow-hidden rounded border border-charcoal/10 bg-cream-3">
              <div className="hero-stripes absolute inset-0" />
              <span className="absolute left-5 top-5 border border-charcoal/10 bg-cream px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal">
                EST. 2023
              </span>
              <span className="absolute -right-[12%] -top-[12%] h-[46%] w-[46%] rounded-full bg-coral" />
              <span className="absolute bottom-[18%] left-[12%] h-[22%] w-[22%] rounded-full bg-charcoal" />
              <span className="absolute left-1/2 top-[38%] h-[10%] w-[10%] rounded-full bg-peach" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                <span>Fig. 01</span>
                <span>Indice de croissance</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      <section className="bg-cream py-0">
        <div className="section-shell">
          <div className="grid border-y border-charcoal/10 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 0.04}
                className="border-charcoal/10 px-6 py-9 md:border-l md:first:border-l-0"
              >
                <p className="font-serif text-5xl font-medium leading-none text-charcoal">
                  {stat.value}
                  <span className="text-coral">{stat.suffix}</span>
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase leading-5 tracking-[0.12em] text-muted">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-cream py-20 md:py-28">
        <div className="section-shell">
          <Reveal className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <p className="eyebrow">Services — 01</p>
            <h2 className="font-serif text-4xl font-medium leading-[1.02] text-charcoal md:text-6xl">
              Trois façons de nous mettre au travail.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded border border-charcoal/10 bg-charcoal/10 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.06}>
                <article className="min-h-full bg-cream p-8 transition-colors duration-200 hover:bg-cream-3">
                  <div className="flex items-start justify-between gap-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {service.number}
                    </p>
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-coral font-serif text-2xl text-white">
                      {service.icon}
                    </span>
                  </div>
                  <h3 className="mt-14 font-serif text-4xl font-medium leading-tight text-charcoal">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-base leading-7 text-muted">{service.text}</p>
                  <div className="mt-10 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-charcoal/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-cream-3 py-20 md:py-28">
        <div className="section-shell">
          <Reveal className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <p className="eyebrow">Méthode — 02</p>
            <h2 className="font-serif text-4xl font-medium leading-[1.02] text-charcoal md:text-6xl">
              Une méthode courte, mesurable, pensée pour les PME.
            </h2>
          </Reveal>

          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section id="audit" className="bg-cream py-20 md:py-28">
        <div className="section-shell">
          <Reveal className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <p className="eyebrow">Audit IA — 03</p>
            <h2 className="font-serif text-4xl font-medium leading-[1.02] text-charcoal md:text-6xl">
              Un agent d’audit pour transformer un échange en plan d’action.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="text-lg leading-8 text-muted">
                Après votre rendez-vous, vous me donnez les informations utiles sur l’entreprise.
                L’agent analyse les manques, priorise les automatisations et prépare un reporting
                professionnel à envoyer au client.
              </p>
              <ul className="mt-8 grid gap-4">
                {auditBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base font-medium text-charcoal">
                    <Check className="mt-1 h-5 w-5 shrink-0 rounded-full bg-coral p-1 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="xl" className="mt-10">
                <Link href="/agent-audit">
                  Démarrer mon audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </Reveal>

            <Reveal delay={0.12}>
              <AgentDemo />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream-3 py-20 md:py-28">
        <div className="section-shell">
          <Reveal className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <p className="eyebrow">Preuve — 04</p>
            <div>
              <h2 className="font-serif text-4xl font-medium leading-[1.02] text-charcoal md:text-6xl">
                Le sentiment recherché : clarté, vitesse, contrôle.
              </h2>
              <p className="mt-5 text-sm leading-6 text-muted">
                Exemples représentatifs à remplacer par vos vrais témoignages clients dès que vous
                en aurez.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.author} delay={index * 0.08}>
                <article className="rounded border border-charcoal/10 bg-cream-3 p-8">
                  <div className="font-serif text-7xl leading-none text-coral">&quot;</div>
                  <blockquote className="mt-5 font-serif text-2xl italic leading-snug text-charcoal">
                    {testimonial.quote}
                  </blockquote>
                  <div className="mt-10 flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-peach font-serif text-lg text-charcoal">
                      {testimonial.initials}
                    </span>
                    <div className="text-sm">
                      <strong className="block text-charcoal">{testimonial.author}</strong>
                      <span className="text-muted">{testimonial.role}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-cream py-20 md:py-28">
        <div className="section-shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded border border-charcoal/10 bg-peach">
              <Image
                src={PLACEHOLDER_IMAGES.founder}
                alt={`${FOUNDER_NAME}, fondateur de VICKOOZE & Co`}
                fill
                sizes="(max-width: 1024px) 92vw, 520px"
                className="object-cover object-[50%_42%] grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded bg-cream px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-charcoal">
                {FOUNDER_NAME} · Fondateur
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="eyebrow">Fondateur — 05</p>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.04] text-charcoal md:text-6xl">
              L’IA n’est pas une fin. C’est un <em className="italic text-coral">multiplicateur</em>.
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-8 text-muted">
              <p>
                Je suis Vick-Emmanuel Michel, fondateur de VICKOOZE & Co. J’aide les PME
                françaises à transformer leurs tâches répétitives en systèmes simples, mesurables
                et utilisables par leurs équipes.
              </p>
              <p>
                Mon approche est volontairement pragmatique : on commence par les irritants
                quotidiens, on chiffre le potentiel, puis on déploie des agents et automatisations
                connectés à vos outils existants.
              </p>
            </div>
            <p className="mt-8 font-serif text-2xl italic text-charcoal">— Vick-Emmanuel</p>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-charcoal py-20 text-cream md:py-28">
        <div className="absolute -right-32 -top-52 h-[500px] w-[500px] rounded-full bg-coral/40 blur-3xl" />
        <div className="section-shell relative">
          <Reveal>
            <p className="eyebrow text-cream/70">Prochaine étape</p>
            <h2 className="mt-6 max-w-5xl font-serif text-5xl font-medium leading-[1.02] text-cream md:text-7xl lg:text-[84px]">
              Un appel de 30 minutes, un <em className="italic text-peach">plan</em> clair à la
              sortie.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-cream/70">
              Partagez vos besoins, vos outils et vos blocages. Nous identifions les premières
              automatisations à tester et la meilleure façon de les déployer.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                  Réserver un créneau
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="xl" className="border border-cream/25 text-cream hover:bg-cream/10 hover:text-cream">
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
