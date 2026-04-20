"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Message = {
  role: "bot" | "user";
  text?: string;
  chips?: string[];
  typing?: boolean;
  result?: boolean;
};

const conversation: Message[] = [
  {
    role: "bot",
    text: "Bonjour, je suis l'agent d'audit VICKOOZE. Quel processus vous coûte le plus de temps aujourd'hui ?"
  },
  {
    role: "user",
    text: "Les relances prospects, les comptes rendus et le reporting commercial."
  },
  {
    role: "bot",
    text: "Je vois trois signaux : perte de leads, saisie manuelle et manque de pilotage hebdomadaire.",
    chips: ["Service client", "Commercial", "Finance", "Ops"]
  },
  {
    role: "bot",
    text: "Je prépare une première matrice impact / effort.",
    typing: true
  },
  {
    role: "bot",
    result: true
  }
];

export function AgentDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || hasStarted) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let delay = 300;

    conversation.forEach((message) => {
      timers.push(
        setTimeout(() => {
          setMessages((current) => [...current, message]);
        }, delay)
      );
      delay += message.typing ? 2100 : message.chips ? 1900 : 1300;
    });

    return () => timers.forEach(clearTimeout);
  }, [hasStarted]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage() {
    const text = inputValue.trim();

    if (!text) {
      return;
    }

    setMessages((current) => [
      ...current,
      { role: "user", text },
      {
        role: "bot",
        text: "Parfait. Sur le vrai agent, ces informations déclenchent un rapport complet avec score de maturité, roadmap, prix indicatif, PDF et Excel."
      }
    ]);
    setInputValue("");
  }

  return (
    <div ref={rootRef} className="overflow-hidden rounded-md bg-charcoal text-cream shadow-soft">
      <div className="flex items-center justify-between border-b border-cream/10 px-5 py-4">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-coral" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/55">
          Agent d’audit · VK
        </span>
      </div>

      <div ref={bodyRef} className="min-h-[440px] space-y-5 overflow-hidden p-5">
        {messages.map((message, index) =>
          message.result ? (
            <div key={`result-${index}`} className="rounded-md bg-cream-3 p-5 text-charcoal">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Rapport express
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  ["Gain annuel", "€148k"],
                  ["Tickets auto.", "72%"],
                  ["Délai build", "6 sem."]
                ].map(([label, value]) => (
                  <div key={label} className="border-l border-charcoal/15 pl-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                      {label}
                    </p>
                    <p className="mt-2 font-serif text-3xl leading-none text-charcoal">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              key={`${message.role}-${index}`}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "bot" ? (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-coral font-serif text-sm text-white">
                  V
                </span>
              ) : null}
              <div
                className={cn(
                  "max-w-[82%] rounded-md px-4 py-3 text-sm leading-6",
                  message.role === "bot"
                    ? "bg-cream/10 text-cream"
                    : "bg-cream text-charcoal"
                )}
              >
                {message.text}
                {message.typing ? (
                  <span className="ml-2 inline-flex gap-1 align-middle">
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-coral" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-coral" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-coral" />
                  </span>
                ) : null}
                {message.chips ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {message.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-cream/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-cream/70"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              {message.role === "user" ? (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream/20 font-mono text-[10px] text-cream">
                  Me
                </span>
              ) : null}
            </div>
          )
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-cream/10 p-4">
        <span className="font-mono text-coral">›</span>
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
          className="min-w-0 flex-1 bg-transparent text-sm text-cream outline-none placeholder:text-cream/35"
          placeholder="Décrivez un process à auditer"
        />
        <button
          type="button"
          onClick={sendMessage}
          className="grid h-10 w-10 place-items-center rounded-full bg-coral text-lg leading-none text-white transition hover:-translate-y-0.5 hover:bg-coral-600"
          aria-label="Envoyer le message"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
