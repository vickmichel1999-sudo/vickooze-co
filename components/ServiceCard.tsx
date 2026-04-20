import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Check } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ServiceCardProps = {
  tag: string;
  title: string;
  description: string;
  checkpoints: string[];
  cta: string;
  href: string;
  icon: LucideIcon;
};

export function ServiceCard({
  tag,
  title,
  description,
  checkpoints,
  cta,
  href,
  icon: Icon
}: ServiceCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{tag}</p>
            <CardTitle className="mt-3 text-2xl md:text-[32px]">{title}</CardTitle>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-cream text-coral transition-colors group-hover:bg-coral group-hover:text-white">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="text-base leading-7 text-muted">{description}</p>
        <ul className="mt-6 space-y-3">
          {checkpoints.map((checkpoint) => (
            <li key={checkpoint} className="flex gap-3 text-sm leading-6 text-charcoal">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
              <span>{checkpoint}</span>
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-black text-coral transition-colors hover:text-charcoal"
        >
          {cta}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
