import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";

type TestimonialProps = {
  name: string;
  company: string;
  quote: string;
};

export function Testimonial({ name, company, quote }: TestimonialProps) {
  return (
    <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex gap-1 text-coral" aria-label="5 étoiles">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-5 w-5 fill-coral" />
        ))}
      </div>
      <p className="mt-6 text-base leading-7 text-muted">“{quote}”</p>
      <div className="mt-8">
        <p className="font-bold text-charcoal">{name}</p>
        <p className="mt-1 text-sm text-muted">{company}</p>
      </div>
    </Card>
  );
}
