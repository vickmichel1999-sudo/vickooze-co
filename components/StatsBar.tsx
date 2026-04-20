import { Zap } from "lucide-react";

const stats = ["+50 outils IA maîtrisés", "+10h/sem économisées", "Audit offert 30min"];

export function StatsBar() {
  return (
    <section className="bg-ink py-4 text-white">
      <div className="section-shell flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-8 lg:gap-14">
        {stats.map((stat) => (
          <div key={stat} className="flex items-center gap-3 text-sm font-bold md:text-base">
            <Zap className="h-5 w-5 fill-coral text-coral" />
            <span>{stat}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
