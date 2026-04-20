import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Bot, Sparkles, TrendingUp } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL, PLACEHOLDER_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type HeroProps = {
  badge: string;
  title: string;
  subtitle: string;
  cta?: string;
  secondaryCta?: {
    label: string;
    href: string;
  };
  showVisual?: boolean;
};

export function Hero({
  badge,
  title,
  subtitle,
  cta = "Prendre rendez-vous",
  secondaryCta,
  showVisual = true
}: HeroProps) {
  return (
    <section className="sparkle-field overflow-hidden bg-hero-gradient pt-32">
      <div
        className={cn(
          "section-shell grid min-h-[calc(100vh-48px)] items-center gap-12 pb-16 lg:pb-20",
          showVisual ? "lg:grid-cols-[1fr_0.92fr]" : "text-center"
        )}
      >
        <Reveal className={cn(!showVisual && "mx-auto max-w-4xl")}>
          <div className="inline-flex items-center gap-2 rounded-lg border border-charcoal/10 bg-white/70 px-4 py-2 text-sm font-bold text-charcoal shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-coral" />
            {badge}
          </div>
          <h1 className={cn("mt-7 max-w-3xl font-serif text-5xl leading-[1.05] text-charcoal md:text-[64px]", !showVisual && "mx-auto")}>
            {title}
          </h1>
          <p className={cn("mt-6 max-w-2xl text-lg leading-8 text-muted md:text-xl", !showVisual && "mx-auto")}>
            {subtitle}
          </p>
          <div className={cn("mt-9 flex flex-col gap-3 sm:flex-row", !showVisual && "justify-center")}>
            <Button asChild size="xl">
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                {cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            {secondaryCta ? (
              <Button asChild size="xl" variant="outline">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        </Reveal>

        {showVisual ? (
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-[520px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-charcoal/10 bg-white shadow-soft">
              <Image
                src={PLACEHOLDER_IMAGES.founder}
                alt="Portrait placeholder du fondateur Vick-Emmanuel Michel"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover"
              />
            </div>

            <div className="absolute -left-4 top-14 w-48 rounded-lg border border-charcoal/10 bg-white p-4 shadow-soft sm:-left-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  Heures économisées
                </span>
                <TrendingUp className="h-4 w-4 text-coral" />
              </div>
              <p className="mt-3 text-3xl font-black text-charcoal">1 240h</p>
            </div>

            <div className="absolute -right-3 bottom-28 w-44 rounded-lg border border-charcoal/10 bg-white p-4 shadow-soft sm:-right-8">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-coral" />
                <span className="text-sm font-bold text-charcoal">92% satisfaction</span>
              </div>
              <div className="mt-4 h-2 rounded-lg bg-cream">
                <div className="h-2 w-[92%] rounded-lg bg-coral" />
              </div>
            </div>

            <div className="absolute -bottom-4 left-8 right-8 rounded-lg border border-charcoal/10 bg-charcoal p-4 text-white shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/55">Automations</p>
                  <p className="mt-1 text-xl font-black">+38%</p>
                </div>
                <BarChart3 className="h-10 w-10 text-peach" />
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
