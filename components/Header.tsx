"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CALENDLY_URL, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Audit", href: "/audit" },
  { label: "Services", href: "/services" },
  { label: "Formation", href: "/formation" },
  { label: "À propos", href: "/a-propos" }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-charcoal/10 bg-cream/88 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-sans text-lg font-black text-charcoal">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-charcoal text-sm text-white">
            V
          </span>
          <span>{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-8 rounded-lg bg-white/60 px-6 py-3 text-sm font-bold text-charcoal/80 backdrop-blur md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-coral">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
              Prendre rendez-vous
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-charcoal/10 bg-white/70 text-charcoal md:hidden"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-charcoal/10 bg-cream/96 px-5 py-5 shadow-soft backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-bold text-charcoal transition-colors hover:bg-white hover:text-coral"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-3 w-full">
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                Prendre rendez-vous
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
