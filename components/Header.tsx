"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CALENDLY_URL, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Services", href: "/#services", section: "services" },
  { label: "Méthode", href: "/#process", section: "process" },
  { label: "Audit IA", href: "/#audit", section: "audit" },
  { label: "À propos", href: "/#about", section: "about" },
  { label: "Contact", href: "/#contact", section: "contact" }
];

export function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("services");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const onScroll = () => {
      const current = navItems.reduce((active, item) => {
        const section = document.getElementById(item.section);

        if (section && section.offsetTop <= window.scrollY + 140) {
          return item.section;
        }

        return active;
      }, "services");

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-cream/88 backdrop-blur-xl">
      <div className="section-shell flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 whitespace-nowrap">
          <span className="relative h-7 w-7 rounded-full bg-coral before:absolute before:inset-1.5 before:rounded-full before:bg-cream after:absolute after:inset-2.5 after:rounded-full after:bg-coral" />
          <span className="font-serif text-xl leading-none text-charcoal">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative transition-colors hover:text-charcoal",
                activeSection === item.section
                  ? "text-charcoal after:absolute after:-bottom-[27px] after:left-0 after:right-0 after:h-0.5 after:bg-coral"
                  : ""
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="secondary">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
              Réserver un appel →
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-charcoal/10 bg-cream-3 text-charcoal md:hidden"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-charcoal/10 bg-cream px-5 py-5 shadow-soft md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-charcoal transition-colors hover:bg-cream-3 hover:text-coral"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="secondary" className="mt-3 w-full">
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                Réserver un appel →
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
