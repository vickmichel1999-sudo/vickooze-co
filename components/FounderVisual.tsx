import Image from "next/image";

import { Reveal } from "@/components/Reveal";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type FounderVisualProps = {
  caption: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function FounderVisual({
  caption,
  className,
  imageClassName,
  priority = false
}: FounderVisualProps) {
  return (
    <Reveal className={cn("relative", className)}>
      <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-charcoal/10 bg-cream shadow-soft md:min-h-[420px]">
        <Image
          src={PLACEHOLDER_IMAGES.founder}
          alt="Vick-Emmanuel Michel travaille sur une mission de conseil IA"
          fill
          priority={priority}
          sizes="(max-width: 1024px) 90vw, 560px"
          className={cn("object-cover object-center", imageClassName)}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal/82 via-charcoal/45 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/16 bg-charcoal/46 p-4 shadow-soft backdrop-blur">
        <p className="text-sm font-bold leading-6 text-white">{caption}</p>
      </div>
    </Reveal>
  );
}
