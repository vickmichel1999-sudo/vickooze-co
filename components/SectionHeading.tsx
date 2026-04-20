import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "mx-0 text-left",
        className
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-5 text-base leading-7 text-muted md:text-lg">{subtitle}</p> : null}
    </Reveal>
  );
}
