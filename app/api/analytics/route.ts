import { NextResponse } from "next/server";

import { normalizeAnalyticsEvent, storeAnalyticsEvent } from "@/lib/analytics-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const event = normalizeAnalyticsEvent(payload);

    if (!event) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const status = await storeAnalyticsEvent(event);

    return NextResponse.json({ ok: true, status });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
