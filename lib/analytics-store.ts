import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const REDIS_KEY = "vickooze:analytics:events";
const MAX_EVENTS = 500;
const LOCAL_ANALYTICS_PATH = path.join(process.cwd(), ".data", "analytics-events.jsonl");

export type AnalyticsEventType =
  | "page_view"
  | "cta_click"
  | "scroll_depth"
  | "calendly_view";

export type AnalyticsEvent = {
  id: string;
  createdAt: string;
  type: AnalyticsEventType;
  path: string;
  title?: string;
  referrer?: string;
  label?: string;
  href?: string;
  scrollDepth?: number;
  sessionId?: string;
  visitorId?: string;
  device?: "mobile" | "tablet" | "desktop";
  viewport?: {
    width: number;
    height: number;
  };
};

export type AnalyticsStorageStatus = "redis" | "local" | "not_configured";

export type AnalyticsSummary = {
  status: AnalyticsStorageStatus;
  totalEvents: number;
  pageViews: number;
  visitors: number;
  sessions: number;
  ctaClicks: number;
  averageScrollDepth: number;
  topPages: Array<{ path: string; count: number }>;
  topClicks: Array<{ label: string; href?: string; count: number }>;
  referrers: Array<{ referrer: string; count: number }>;
  devices: Array<{ device: string; count: number }>;
  recentEvents: AnalyticsEvent[];
  journeys: Array<{
    sessionId: string;
    visitorId?: string;
    startedAt: string;
    events: AnalyticsEvent[];
  }>;
};

function hasRedisConfig() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export function getAnalyticsStorageStatus(): AnalyticsStorageStatus {
  if (hasRedisConfig()) {
    return "redis";
  }

  if (process.env.NODE_ENV !== "production") {
    return "local";
  }

  return "not_configured";
}

function sanitizeText(value: unknown, maxLength = 220) {
  if (typeof value !== "string") {
    return undefined;
  }

  const clean = value.replace(/\s+/g, " ").trim();
  return clean ? clean.slice(0, maxLength) : undefined;
}

function sanitizePath(value: unknown) {
  const pathValue = sanitizeText(value, 180);
  return pathValue?.startsWith("/") ? pathValue : "/";
}

function sanitizeNumber(value: unknown, fallback = 0) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
}

export function normalizeAnalyticsEvent(payload: unknown): AnalyticsEvent | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const input = payload as Record<string, unknown>;
  const type = input.type;

  if (
    type !== "page_view" &&
    type !== "cta_click" &&
    type !== "scroll_depth" &&
    type !== "calendly_view"
  ) {
    return null;
  }

  const viewportInput =
    input.viewport && typeof input.viewport === "object"
      ? (input.viewport as Record<string, unknown>)
      : null;

  const width = sanitizeNumber(viewportInput?.width);
  const height = sanitizeNumber(viewportInput?.height);
  const device =
    width > 0 && width < 640
      ? "mobile"
      : width >= 640 && width < 1024
        ? "tablet"
        : "desktop";

  return {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    type,
    path: sanitizePath(input.path),
    title: sanitizeText(input.title),
    referrer: sanitizeText(input.referrer, 260),
    label: sanitizeText(input.label, 120),
    href: sanitizeText(input.href, 260),
    scrollDepth: input.scrollDepth === undefined ? undefined : sanitizeNumber(input.scrollDepth),
    sessionId: sanitizeText(input.sessionId, 80),
    visitorId: sanitizeText(input.visitorId, 80),
    device,
    viewport: width > 0 && height > 0 ? { width, height } : undefined
  };
}

async function redisCommand<T>(parts: Array<string | number>) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Redis is not configured");
  }

  const commandPath = parts.map((part) => encodeURIComponent(String(part))).join("/");
  const response = await fetch(`${url.replace(/\/$/, "")}/${commandPath}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Redis command failed with ${response.status}`);
  }

  const data = (await response.json()) as { result: T };
  return data.result;
}

async function readLocalEvents() {
  try {
    const file = await readFile(LOCAL_ANALYTICS_PATH, "utf8");
    return file
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as AnalyticsEvent)
      .reverse()
      .slice(0, MAX_EVENTS);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function appendLocalEvent(event: AnalyticsEvent) {
  await mkdir(path.dirname(LOCAL_ANALYTICS_PATH), { recursive: true });

  const events = await readLocalEvents();
  const nextEvents = [event, ...events].slice(0, MAX_EVENTS).reverse();

  await writeFile(
    LOCAL_ANALYTICS_PATH,
    `${nextEvents.map((item) => JSON.stringify(item)).join("\n")}\n`,
    "utf8"
  );
}

export async function storeAnalyticsEvent(event: AnalyticsEvent) {
  const status = getAnalyticsStorageStatus();

  if (status === "redis") {
    const encoded = Buffer.from(JSON.stringify(event), "utf8").toString("base64url");
    await redisCommand<number>(["LPUSH", REDIS_KEY, encoded]);
    await redisCommand<string>(["LTRIM", REDIS_KEY, 0, MAX_EVENTS - 1]);
    return status;
  }

  if (status === "local") {
    await appendLocalEvent(event);
  }

  return status;
}

export async function getAnalyticsEvents() {
  const status = getAnalyticsStorageStatus();

  if (status === "redis") {
    const encodedEvents = await redisCommand<string[]>(["LRANGE", REDIS_KEY, 0, MAX_EVENTS - 1]);
    return {
      status,
      events: encodedEvents
        .map((item) => JSON.parse(Buffer.from(item, "base64url").toString("utf8")) as AnalyticsEvent)
        .filter(Boolean)
    };
  }

  if (status === "local") {
    return {
      status,
      events: await readLocalEvents()
    };
  }

  return {
    status,
    events: []
  };
}

function countBy<T extends string>(
  events: AnalyticsEvent[],
  getter: (event: AnalyticsEvent) => T | undefined
) {
  const map = new Map<T, number>();

  events.forEach((event) => {
    const key = getter(event);

    if (!key) {
      return;
    }

    map.set(key, (map.get(key) || 0) + 1);
  });

  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([key, count]) => ({ key, count }));
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const { status, events } = await getAnalyticsEvents();
  const pageViewEvents = events.filter((event) => event.type === "page_view");
  const clickEvents = events.filter((event) => event.type === "cta_click");
  const scrollEvents = events.filter(
    (event) => event.type === "scroll_depth" && typeof event.scrollDepth === "number"
  );
  const visitorIds = new Set(events.map((event) => event.visitorId).filter(Boolean));
  const sessionIds = new Set(events.map((event) => event.sessionId).filter(Boolean));
  const scrollTotal = scrollEvents.reduce((sum, event) => sum + (event.scrollDepth || 0), 0);
  const pageCounts = countBy(pageViewEvents, (event) => event.path);
  const deviceCounts = countBy(events, (event) => event.device);
  const referrerCounts = countBy(pageViewEvents, (event) => {
    if (!event.referrer) {
      return "Accès direct";
    }

    try {
      return new URL(event.referrer).hostname;
    } catch {
      return event.referrer;
    }
  });
  const clickCounts = new Map<string, { label: string; href?: string; count: number }>();

  clickEvents.forEach((event) => {
    const label = event.label || event.href || "Clic sans libellé";
    const key = `${label}__${event.href || ""}`;
    const current = clickCounts.get(key);

    clickCounts.set(key, {
      label,
      href: event.href,
      count: (current?.count || 0) + 1
    });
  });

  const journeys = Array.from(sessionIds)
    .map((sessionId) => {
      const sessionEvents = events
        .filter((event) => event.sessionId === sessionId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      return {
        sessionId: sessionId as string,
        visitorId: sessionEvents[0]?.visitorId,
        startedAt: sessionEvents[0]?.createdAt || new Date().toISOString(),
        events: sessionEvents.slice(-8)
      };
    })
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    .slice(0, 8);

  return {
    status,
    totalEvents: events.length,
    pageViews: pageViewEvents.length,
    visitors: visitorIds.size,
    sessions: sessionIds.size,
    ctaClicks: clickEvents.length,
    averageScrollDepth: scrollEvents.length ? Math.round(scrollTotal / scrollEvents.length) : 0,
    topPages: pageCounts.map(({ key, count }) => ({ path: key, count })),
    topClicks: Array.from(clickCounts.values()).sort((a, b) => b.count - a.count).slice(0, 8),
    referrers: referrerCounts.map(({ key, count }) => ({ referrer: key, count })),
    devices: deviceCounts.map(({ key, count }) => ({ device: key, count })),
    recentEvents: events.slice(0, 18),
    journeys
  };
}
