"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
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
        "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-charcoal/10 bg-white/92 shadow-sm backdrop-blur-xl"
          : "border-charcoal/8 bg-white/92 backdrop-blur-xl"
      )}
    >
      <div className="section-shell relative flex h-16 items-center justify-between gap-3 md:h-14 md:gap-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 text-[14px] font-black tracking-[-0.01em] text-charcoal sm:gap-3 sm:text-[15px]"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-charcoal font-serif text-sm italic text-white">
            V
          </span>
          <span className="truncate">{SITE_NAME}</span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-charcoal/10 bg-white/85 p-1.5 text-xs font-black text-charcoal/72 shadow-sm backdrop-blur md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-5 py-2 transition-colors hover:bg-cream-3 hover:text-pine",
                  isActive ? "text-pine" : ""
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="default">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
              Prendre rendez-vous
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-charcoal/10 bg-white/80 text-charcoal shadow-sm md:hidden"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-charcoal/10 bg-white/95 py-5 shadow-soft backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex w-full max-w-sm flex-col gap-2 px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-4 py-3 text-center text-base font-bold text-charcoal transition-colors hover:bg-cream hover:text-pine",
                  pathname === item.href ? "bg-pine text-white hover:bg-pine hover:text-white" : ""
                )}
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
