import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  createAdminToken,
  getAdminPassword,
  isValidAdminPassword
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!getAdminPassword()) {
    return NextResponse.json(
      {
        ok: false,
        message: "ADMIN_PASSWORD doit être configuré dans les variables d’environnement."
      },
      { status: 503 }
    );
  }

  const payload = (await request.json()) as { password?: string };

  if (!payload.password || !isValidAdminPassword(payload.password)) {
    return NextResponse.json(
      { ok: false, message: "Mot de passe incorrect." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(ADMIN_COOKIE_NAME, createAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });

  return response;
}
