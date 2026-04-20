const marqueeItems = [
  "Automatisation",
  "Agents Claude",
  "Audit & stratégie",
  "Formation équipes",
  "RAG & data",
  "Déploiement"
];

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden border-y border-charcoal/10 bg-cream py-5">
      <div className="marquee-track flex w-max items-center gap-8">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-8 font-serif text-2xl italic leading-none text-muted"
          >
            {item}
            <span className="font-sans text-lg not-italic text-coral">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
