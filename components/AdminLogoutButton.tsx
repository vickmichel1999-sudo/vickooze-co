"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST"
    });
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-charcoal/15 bg-white px-4 text-sm font-black text-charcoal transition-colors hover:border-pine hover:text-pine"
    >
      <LogOut className="h-4 w-4" />
      Déconnexion
    </button>
  );
}
