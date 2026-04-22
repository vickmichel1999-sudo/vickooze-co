"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type AnalyticsPayload = {
  type: "page_view" | "cta_click" | "scroll_depth" | "calendly_view";
  path?: string;
  title?: string;
  referrer?: string;
  label?: string;
  href?: string;
  scrollDepth?: number;
  sessionId?: string;
  visitorId?: string;
  viewport?: {
    width: number;
    height: number;
  };
};

const VISITOR_KEY = "vickooze_visitor_id";
const SESSION_KEY = "vickooze_session_id";

function getId(key: string) {
  const existing = window.localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  const nextValue = window.crypto.randomUUID();
  window.localStorage.setItem(key, nextValue);
  return nextValue;
}

function buildPayload(payload: AnalyticsPayload) {
  return {
    ...payload,
    path: payload.path || `${window.location.pathname}${window.location.search}`,
    title: document.title,
    referrer: document.referrer,
    visitorId: getId(VISITOR_KEY),
    sessionId: getId(SESSION_KEY),
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  };
}

function sendAnalyticsEvent(payload: AnalyticsPayload) {
  if (window.location.pathname.startsWith("/admin")) {
    return;
  }

  const body = JSON.stringify(buildPayload(payload));

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    return;
  }

  fetch("/api/analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body,
    keepalive: true
  }).catch(() => undefined);
}

export function SiteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    sendAnalyticsEvent({ type: "page_view" });
  }, [pathname]);

  useEffect(() => {
    const seenDepths = new Set<number>();
    const milestones = [25, 50, 75, 90];

    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollable <= 0) {
        return;
      }

      const depth = Math.round((window.scrollY / scrollable) * 100);
      const milestone = milestones.find((item) => depth >= item && !seenDepths.has(item));

      if (!milestone) {
        return;
      }

      seenDepths.add(milestone);
      sendAnalyticsEvent({
        type: "scroll_depth",
        scrollDepth: milestone
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const clickable = target.closest("a, button");

      if (!clickable) {
        return;
      }

      const label = clickable.textContent?.replace(/\s+/g, " ").trim();
      const href = clickable instanceof HTMLAnchorElement ? clickable.href : undefined;

      if (!label && !href) {
        return;
      }

      sendAnalyticsEvent({
        type: "cta_click",
        label,
        href
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
