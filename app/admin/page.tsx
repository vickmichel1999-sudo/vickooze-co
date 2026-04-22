import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  ExternalLink,
  Eye,
  MousePointerClick,
  Route,
  ScrollText,
  ShieldAlert,
  Users,
  type LucideIcon
} from "lucide-react";

import { AdminLogin } from "@/components/AdminLogin";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { Card } from "@/components/ui/card";
import { getAnalyticsSummary, type AnalyticsEvent } from "@/lib/analytics-store";
import { getAdminPassword, isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false
  }
};

const eventLabels: Record<AnalyticsEvent["type"], string> = {
  page_view: "Page vue",
  cta_click: "Clic",
  scroll_depth: "Scroll",
  calendly_view: "Agenda vu"
};

function formatTime(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function MetricCard({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-2">{label}</p>
          <p className="mt-3 font-serif text-4xl leading-none text-charcoal">{value}</p>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-pine text-white">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function EmptyState({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-dashed border-charcoal/15 bg-cream p-6 text-center text-sm font-bold text-muted">
      {title}
    </div>
  );
}

export default async function AdminPage() {
  const isAuthenticated = isAdminAuthenticated();

  if (!isAuthenticated) {
    return (
      <section className="bg-cream pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="section-shell text-center">
          <p className="eyebrow eyebrow-center">Admin</p>
          <h1 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
            Tableau de bord VICKOOZE & Co
          </h1>
          {!getAdminPassword() ? (
            <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-5 text-left text-sm font-bold leading-6 text-red-800">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
              Configurez ADMIN_PASSWORD dans Vercel pour activer l’accès admin en production.
            </div>
          ) : null}
          <AdminLogin />
          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-muted">
            En local, le mot de passe de test est <span className="font-black text-charcoal">vickooze-local</span>.
            En production, utilisez une variable d’environnement dédiée.
          </p>
        </div>
      </section>
    );
  }

  const summary = await getAnalyticsSummary();

  return (
    <section className="bg-cream pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="section-shell">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
              Comportement des visiteurs
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
              Une lecture simple des pages vues, clics importants, profondeurs de scroll et parcours
              récents pour ajuster le site après les premières visites.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/audit"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-charcoal/15 bg-white px-4 text-sm font-black text-charcoal transition-colors hover:border-pine hover:text-pine"
            >
              Voir la page Audit
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="/rendez-vous"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-charcoal/15 bg-white px-4 text-sm font-black text-charcoal transition-colors hover:border-pine hover:text-pine"
            >
              Agenda intégré
              <ExternalLink className="h-4 w-4" />
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        {summary.status === "not_configured" ? (
          <div className="mt-8 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-bold leading-6 text-amber-900">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
            Le tracking est prêt, mais le stockage production n’est pas configuré. Ajoutez
            UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN sur Vercel pour conserver les visites.
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <MetricCard label="Pages vues" value={summary.pageViews} icon={Eye} />
          <MetricCard label="Visiteurs" value={summary.visitors} icon={Users} />
          <MetricCard label="Sessions" value={summary.sessions} icon={Route} />
          <MetricCard label="Clics" value={summary.ctaClicks} icon={MousePointerClick} />
          <MetricCard label="Scroll moyen" value={`${summary.averageScrollDepth}%`} icon={ScrollText} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="flex items-center gap-2 text-xl font-black text-charcoal">
              <BarChart3 className="h-5 w-5 text-pine" />
              Pages les plus consultées
            </h2>
            <div className="mt-5 grid gap-3">
              {summary.topPages.length ? (
                summary.topPages.map((item) => (
                  <div key={item.path} className="flex items-center justify-between gap-4 rounded-lg bg-cream p-4">
                    <span className="font-bold text-charcoal">{item.path}</span>
                    <span className="font-mono text-sm font-black text-pine">{item.count}</span>
                  </div>
                ))
              ) : (
                <EmptyState title="Aucune page vue enregistrée pour l’instant." />
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="flex items-center gap-2 text-xl font-black text-charcoal">
              <MousePointerClick className="h-5 w-5 text-pine" />
              Clics qui comptent
            </h2>
            <div className="mt-5 grid gap-3">
              {summary.topClicks.length ? (
                summary.topClicks.map((item) => (
                  <div key={`${item.label}-${item.href}`} className="rounded-lg bg-cream p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold text-charcoal">{item.label}</span>
                      <span className="font-mono text-sm font-black text-pine">{item.count}</span>
                    </div>
                    {item.href ? <p className="mt-2 truncate text-xs font-bold text-muted">{item.href}</p> : null}
                  </div>
                ))
              ) : (
                <EmptyState title="Aucun clic enregistré pour l’instant." />
              )}
            </div>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="p-6">
            <h2 className="text-xl font-black text-charcoal">Sources et appareils</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-2">Sources</p>
                <div className="mt-3 grid gap-2">
                  {summary.referrers.length ? (
                    summary.referrers.map((item) => (
                      <div key={item.referrer} className="flex justify-between rounded-lg bg-cream px-4 py-3 text-sm font-bold">
                        <span>{item.referrer}</span>
                        <span className="text-pine">{item.count}</span>
                      </div>
                    ))
                  ) : (
                    <EmptyState title="Aucune source enregistrée." />
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-2">Appareils</p>
                <div className="mt-3 grid gap-2">
                  {summary.devices.length ? (
                    summary.devices.map((item) => (
                      <div key={item.device} className="flex justify-between rounded-lg bg-cream px-4 py-3 text-sm font-bold">
                        <span>{item.device}</span>
                        <span className="text-pine">{item.count}</span>
                      </div>
                    ))
                  ) : (
                    <EmptyState title="Aucun appareil enregistré." />
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="flex items-center gap-2 text-xl font-black text-charcoal">
              <Activity className="h-5 w-5 text-pine" />
              Activité récente
            </h2>
            <div className="mt-5 grid gap-3">
              {summary.recentEvents.length ? (
                summary.recentEvents.map((event) => (
                  <div key={event.id} className="grid gap-3 rounded-lg bg-cream p-4 md:grid-cols-[96px_120px_1fr]">
                    <span className="font-mono text-xs font-bold text-muted">{formatTime(event.createdAt)}</span>
                    <span className="text-sm font-black text-pine">{eventLabels[event.type]}</span>
                    <span className="truncate text-sm font-bold text-charcoal">
                      {event.label || event.path}
                      {event.scrollDepth ? ` · ${event.scrollDepth}%` : ""}
                    </span>
                  </div>
                ))
              ) : (
                <EmptyState title="Aucune activité enregistrée." />
              )}
            </div>
          </Card>
        </div>

        <Card className="mt-8 p-6">
          <h2 className="text-xl font-black text-charcoal">Parcours récents</h2>
          <div className="mt-5 grid gap-4">
            {summary.journeys.length ? (
              summary.journeys.map((journey) => (
                <div key={journey.sessionId} className="rounded-lg bg-cream p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-muted-2">
                      Session {journey.sessionId.slice(0, 8)}
                    </p>
                    <p className="text-xs font-bold text-muted">{formatTime(journey.startedAt)}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {journey.events.map((event) => (
                      <span
                        key={event.id}
                        className="rounded-full border border-charcoal/10 bg-white px-3 py-2 text-xs font-bold text-charcoal"
                      >
                        {event.type === "page_view" ? event.path : event.label || eventLabels[event.type]}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <EmptyState title="Aucun parcours disponible pour l’instant." />
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
