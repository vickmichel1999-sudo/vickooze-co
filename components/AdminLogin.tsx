"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });

    setIsLoading(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      setError(payload?.message || "Connexion impossible.");
      return;
    }

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-md rounded-lg border border-charcoal/10 bg-white p-6 text-left shadow-soft"
    >
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-pine text-white">
        <LockKeyhole className="h-5 w-5" />
      </div>
      <h2 className="mt-6 text-2xl font-black text-charcoal">Accès administrateur</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Entrez le mot de passe admin pour consulter les signaux comportementaux du site.
      </p>
      <label className="mt-6 block text-sm font-black text-charcoal" htmlFor="admin-password">
        Mot de passe
      </label>
      <input
        id="admin-password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="mt-2 min-h-12 w-full rounded-lg border border-charcoal/15 bg-cream px-4 text-base font-bold text-charcoal outline-none transition-colors focus:border-pine"
        autoComplete="current-password"
      />
      {error ? <p className="mt-3 text-sm font-bold text-red-600">{error}</p> : null}
      <Button className="mt-6 w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Connexion..." : "Se connecter"}
      </Button>
    </form>
  );
}
