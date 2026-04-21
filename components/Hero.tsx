import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, Bot, Check, TrendingUp } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL, FOUNDER_NAME, PLACEHOLDER_IMAGES } from "@/lib/constants";
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
    <section className="overflow-hidden bg-white pt-32 pb-16 md:pb-24">
      <div
        className={cn(
          "section-shell grid items-center gap-10 text-center md:gap-12",
          showVisual ? "lg:grid-cols-[1fr_0.92fr] lg:text-left" : "text-center"
        )}
      >
        <Reveal className={cn("mx-auto max-w-4xl lg:mx-0", !showVisual && "lg:mx-auto")}>
          <p className="eyebrow">{badge}</p>
          <h1
            className={cn(
              "mx-auto mt-7 max-w-3xl font-serif text-[44px] leading-[1.02] tracking-[-0.02em] text-charcoal sm:text-5xl md:text-[64px]",
              showVisual && "lg:mx-0"
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mx-auto mt-6 max-w-2xl text-base leading-7 text-muted md:text-xl md:leading-8",
              showVisual && "lg:mx-0"
            )}
          >
            {subtitle}
          </p>
          <div className={cn("mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3", showVisual && "lg:mx-0")}>
            {["Audit clair", "ROI estimé", "Déploiement simple"].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2 rounded-lg border border-charcoal/10 bg-cream-3 px-4 py-3 text-sm font-black text-charcoal">
                <Check className="h-4 w-4 text-pine" />
                {item}
              </div>
            ))}
          </div>
          <div className={cn("mt-9 flex flex-col gap-3 sm:flex-row", showVisual ? "lg:justify-start" : "justify-center")}>
            <Button asChild size="xl" className="w-full sm:w-auto">
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                {cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            {secondaryCta ? (
              <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        </Reveal>

        {showVisual ? (
          <Reveal delay={0.15} className="relative mx-auto min-h-[500px] w-full max-w-[560px]">
            <div className="absolute inset-y-0 right-0 w-[88%] overflow-hidden rounded-lg bg-charcoal shadow-soft">
              <Image
                src={PLACEHOLDER_IMAGES.founder}
                alt={`Portrait du fondateur ${FOUNDER_NAME}`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover object-[48%_42%] opacity-82 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/32 via-transparent to-transparent" />
            </div>

            <div className="absolute left-0 top-20 w-48 rounded-lg border border-charcoal/10 bg-peach/90 p-4 shadow-soft backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-charcoal/70">
                  Heures économisées
                </span>
                <TrendingUp className="h-4 w-4 text-pine" />
              </div>
              <p className="mt-3 text-3xl font-black text-charcoal">1 240h</p>
            </div>

            <div className="absolute right-0 bottom-28 w-44 rounded-lg border border-charcoal/10 bg-pine p-4 text-white shadow-soft">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-white" />
                <span className="text-sm font-bold">92% satisfaction</span>
              </div>
              <div className="mt-4 h-2 rounded-lg bg-white/25">
                <div className="h-2 w-[92%] rounded-lg bg-white" />
              </div>
            </div>

            <div className="absolute bottom-8 left-0 w-56 rounded-lg border border-white/10 bg-charcoal p-4 text-white shadow-soft">
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
