import type { LucideIcon } from "lucide-react";

type ProcessStepProps = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ProcessStep({ step, title, description, icon: Icon }: ProcessStepProps) {
  return (
    <div className="relative flex min-h-[250px] flex-col rounded-lg border border-charcoal/10 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="font-serif text-5xl leading-none text-coral">{step}</span>
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-cream text-coral">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <h3 className="mt-8 text-xl font-black text-charcoal">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}
