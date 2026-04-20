"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const steps = [
  {
    phase: "Phase 01",
    title: "Diagnostic",
    shortTitle: "Diagnostic",
    description:
      "Nous analysons vos processus, outils et irritants pour repérer les pertes de temps visibles et cachées.",
    duration: "48h",
    progress: "12%"
  },
  {
    phase: "Phase 02",
    title: "Priorisation",
    shortTitle: "Priorisation",
    description:
      "Chaque opportunité est classée par impact, difficulté et retour potentiel pour éviter les gadgets.",
    duration: "3 jours",
    progress: "37%"
  },
  {
    phase: "Phase 03",
    title: "Prototype",
    shortTitle: "Prototype",
    description:
      "Nous créons un premier agent ou workflow connecté à vos outils pour prouver la valeur rapidement.",
    duration: "2 semaines",
    progress: "62%"
  },
  {
    phase: "Phase 04",
    title: "Déploiement",
    shortTitle: "Déploiement",
    description:
      "Vos équipes sont formées, les garde-fous sont documentés et les gains sont suivis dans le temps.",
    duration: "4 à 12 semaines",
    progress: "92%"
  }
];

export function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep];

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
      <div className="border-t border-charcoal/10">
        {steps.map((step, index) => {
          const isActive = index === activeStep;

          return (
            <button
              key={step.title}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveStep(index)}
              className={cn(
                "group w-full border-b border-charcoal/10 py-7 text-left transition-all duration-300",
                isActive ? "pl-2" : "pl-0 hover:pl-2"
              )}
            >
              <div className="grid gap-4 sm:grid-cols-[72px_1fr]">
                <span
                  className={cn(
                    "font-mono text-sm uppercase tracking-[0.14em]",
                    isActive ? "text-coral" : "text-muted-2"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-medium text-charcoal">{step.shortTitle}</h3>
                  <p
                    className={cn(
                      "overflow-hidden text-base leading-7 text-muted transition-all duration-300",
                      isActive ? "mt-3 max-h-28 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="sticky top-28 overflow-hidden rounded-md bg-charcoal p-7 text-cream shadow-soft">
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/55">
          <span>{active.phase}</span>
          <span>VK.CO · 2026</span>
        </div>
        <div className="grid min-h-[360px] content-center py-12">
          <h3 className="font-serif text-6xl leading-none text-cream md:text-7xl">
            {active.title}
            <br />
            <em className="text-peach">IA</em>
          </h3>
          <p className="mt-7 max-w-sm text-base leading-7 text-cream/70">{active.description}</p>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-cream/55">
            <span>Durée</span>
            <span>{active.duration}</span>
          </div>
          <div className="h-1 bg-cream/15">
            <div
              className="h-1 bg-coral transition-all duration-500"
              style={{ width: active.progress }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
