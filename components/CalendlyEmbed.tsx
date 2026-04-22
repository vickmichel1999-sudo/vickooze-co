"use client";

import { useEffect } from "react";

import { CALENDLY_URL } from "@/lib/constants";

function getCalendlyEmbedUrl() {
  const url = new URL(CALENDLY_URL);
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("primary_color", "0f5b4a");
  return url.toString();
}

export function CalendlyEmbed() {
  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "calendly_view",
        path: window.location.pathname,
        title: document.title,
        referrer: document.referrer,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        visitorId: window.localStorage.getItem("vickooze_visitor_id") || undefined,
        sessionId: window.localStorage.getItem("vickooze_session_id") || undefined
      })
    }).catch(() => undefined);
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-charcoal/10 bg-white shadow-lift">
      <iframe
        title="Réserver un audit IA avec VICKOOZE & Co"
        src={getCalendlyEmbedUrl()}
        className="h-[760px] w-full border-0 md:h-[820px]"
        loading="lazy"
      />
    </div>
  );
}
