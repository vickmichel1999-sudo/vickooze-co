"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, Loader2, Mail, Sparkles } from "lucide-react";

import type { AuditAgentInput, AuditReport } from "@/lib/audit-agent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const emptyForm: AuditAgentInput = {
  companyName: "",
  email: "",
  sector: "",
  teamSize: "",
  currentTools: "",
  mainProcesses: "",
  repetitiveTasks: "",
  painPoints: "",
  monthlyVolume: "",
  businessGoals: "",
  constraints: ""
};

const demoForm: AuditAgentInput = {
  companyName: "PME exemple",
  email: "",
  sector: "Services B2B",
  teamSize: "18 salariés",
  currentTools: "Gmail, Google Sheets, HubSpot, Slack, Notion",
  mainProcesses:
    "Réception des leads, qualification commerciale, rédaction de propositions, suivi client, reporting hebdomadaire.",
  repetitiveTasks:
    "Relances prospects, saisie CRM, comptes rendus de rendez-vous, synthèses Slack, reporting des opportunités.",
  painPoints:
    "Les commerciaux oublient parfois les relances, le CRM n’est pas toujours à jour et la direction perd du temps à consolider les chiffres.",
  monthlyVolume: "Environ 90 leads entrants, 35 rendez-vous commerciaux et 20 propositions envoyées par mois.",
  businessGoals:
    "Réduire le temps administratif, améliorer le taux de relance, mieux qualifier les leads et gagner en visibilité sur le pipeline.",
  constraints:
    "Pas d’équipe technique interne. Les outils doivent rester simples et compatibles avec HubSpot et Google Workspace."
};

const fields: Array<{
  name: keyof AuditAgentInput;
  label: string;
  placeholder: string;
  textarea?: boolean;
  type?: string;
}> = [
  {
    name: "companyName",
    label: "Nom de l’entreprise",
    placeholder: "Ex: Cabinet Martin & Associés"
  },
  {
    name: "email",
    label: "Email du client (pour recevoir le rapport)",
    placeholder: "client@entreprise.com",
    type: "email"
  },
  {
    name: "sector",
    label: "Secteur d’activité",
    placeholder: "Ex: services B2B, industrie, immobilier, e-commerce..."
  },
  {
    name: "teamSize",
    label: "Taille de l’équipe",
    placeholder: "Ex: 12 salariés, dont 3 commerciaux"
  },
  {
    name: "currentTools",
    label: "Outils actuels",
    placeholder: "Ex: Gmail, HubSpot, Notion, Slack, Airtable, Excel..."
  },
  {
    name: "mainProcesses",
    label: "Processus principaux",
    placeholder: "Décris les étapes clés: acquisition, vente, support, opérations, reporting...",
    textarea: true
  },
  {
    name: "repetitiveTasks",
    label: "Tâches répétitives",
    placeholder: "Ex: relances, saisie CRM, devis, comptes rendus, réponses clients...",
    textarea: true
  },
  {
    name: "painPoints",
    label: "Manques et blocages ressentis",
    placeholder: "Qu’est-ce qui ralentit l’équipe aujourd’hui ? Où y a-t-il des oublis ou erreurs ?",
    textarea: true
  },
  {
    name: "monthlyVolume",
    label: "Volume mensuel approximatif",
    placeholder: "Ex: 80 leads/mois, 300 emails support, 40 devis, 25 RDV...",
    textarea: true
  },
  {
    name: "businessGoals",
    label: "Objectifs business",
    placeholder: "Ex: gagner 10h/semaine, améliorer le suivi commercial, réduire les délais...",
    textarea: true
  },
  {
    name: "constraints",
    label: "Contraintes",
    placeholder: "Ex: budget, confidentialité, outils imposés, pas d’équipe technique...",
    textarea: true
  }
];

function Field({
  field,
  value,
  onChange
}: {
  field: (typeof fields)[number];
  value: string;
  onChange: (value: string) => void;
}) {
  const className =
    "mt-2 w-full rounded-lg border border-charcoal/10 bg-white px-4 py-3 text-sm font-medium text-charcoal outline-none transition-colors placeholder:text-muted/55 focus:border-pine";

  return (
    <label className="block">
      <span className="text-sm font-black text-charcoal">{field.label}</span>
      {field.textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className={className}
        />
      ) : (
        <input
          type={field.type || "text"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          className={className}
        />
      )}
    </label>
  );
}

function ReportCard({ report }: { report: AuditReport }) {
  return (
    <div className="grid gap-6">
      <Card className="overflow-hidden border-0 bg-charcoal p-6 text-white md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-peach">
          Rapport généré
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[0.7fr_1fr] lg:items-center">
          <div>
            <p className="font-serif text-6xl leading-none text-peach">
              {report.maturityScore}
            </p>
            <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white/62">
              {report.maturityLabel}
            </p>
          </div>
          <p className="text-lg leading-8 text-white/78">{report.executiveSummary}</p>
        </div>
      </Card>

      <section>
        <h2 className="font-serif text-3xl leading-tight text-charcoal">Manques détectés</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {report.detectedGaps.map((gap) => (
            <Card key={gap.title} className="p-5">
              <h3 className="text-lg font-black text-charcoal">{gap.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{gap.impact}</p>
              <p className="mt-4 text-sm font-bold text-charcoal">{gap.evidence}</p>
              <p className="mt-4 text-sm leading-6 text-muted">{gap.recommendation}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-3xl leading-tight text-charcoal">
          Automatisations prioritaires
        </h2>
        <div className="mt-5 grid gap-5">
          {report.priorityAutomations.map((automation) => (
            <Card key={automation.title} className="p-5 md:p-6">
              <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <h3 className="text-2xl font-black text-charcoal">{automation.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{automation.currentProblem}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-cream px-3 py-2 text-xs font-black text-charcoal">
                      ROI {automation.roiPotential}
                    </span>
                    <span className="rounded-lg bg-cream px-3 py-2 text-xs font-black text-charcoal">
                      Difficulté {automation.difficulty}
                    </span>
                    <span className="rounded-lg bg-pine px-3 py-2 text-xs font-black text-white">
                      {automation.estimatedTimeSaved}
                    </span>
                  </div>
                </div>
                <div className="rounded-lg bg-cream p-5">
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-pine">
                    Solution proposée
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">{automation.aiSolution}</p>
                  <p className="mt-4 text-sm font-black text-charcoal">Premier pas</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{automation.firstStep}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {automation.recommendedTools.map((tool) => (
                      <span key={tool} className="rounded-lg bg-white px-3 py-2 text-xs font-black text-charcoal">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-serif text-3xl leading-tight text-charcoal">Processus recommandé</h2>
          <ul className="mt-5 grid gap-3">
            {report.recommendedProcess.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="font-serif text-3xl leading-tight text-charcoal">Questions à clarifier</h2>
          <ul className="mt-5 grid gap-3">
            {report.questionsToClarify.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section>
        <h2 className="font-serif text-3xl leading-tight text-charcoal">Roadmap 30 / 60 / 90 jours</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {report.roadmap.map((item) => (
            <Card key={item.period} className="p-5">
              <h3 className="text-xl font-black text-charcoal">{item.period}</h3>
              <ul className="mt-4 grid gap-3">
                {item.actions.map((action) => (
                  <li key={action} className="text-sm leading-6 text-muted">
                    {action}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <Card className="border-pine/30 bg-pine/10 p-6">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-pine">
          Proposition commerciale indicative
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-charcoal">
          {report.commercialOffer.title}
        </h2>
        <p className="mt-4 font-serif text-4xl leading-none text-pine">
          {report.commercialOffer.recommendedPrice}
        </p>
        <p className="mt-4 text-lg leading-8 text-muted">
          {report.commercialOffer.priceJustification}
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <p className="text-sm font-black text-charcoal">Inclus</p>
            <ul className="mt-3 grid gap-2">
              {report.commercialOffer.includedDeliverables.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-muted">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-black text-charcoal">Options possibles</p>
            <ul className="mt-3 grid gap-2">
              {report.commercialOffer.optionalUpsells.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-muted">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-serif text-3xl leading-tight text-charcoal">Prochaine étape</h2>
        <p className="mt-4 text-lg leading-8 text-muted">{report.nextStep}</p>
      </Card>
    </div>
  );
}

async function readApiJson(response: Response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    const preview = text.replace(/\s+/g, " ").slice(0, 180);
    throw new Error(
      response.status >= 500
        ? `Le serveur Vercel a renvoyé une erreur technique (${response.status}) au lieu d’un JSON. Réessaie avec moins de texte dans les champs, puis consulte les logs Vercel si ça persiste. Détail: ${preview}`
        : `Réponse serveur illisible (${response.status}). Détail: ${preview}`
    );
  }
}

export function AuditAgentForm() {
  const [form, setForm] = useState<AuditAgentInput>(emptyForm);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{
    status: "sent" | "queued" | "failed";
    recipient: string;
    message?: string;
  } | null>(null);
  const [provider, setProvider] = useState<"anthropic" | "openai" | null>(null);

  function updateField(name: keyof AuditAgentInput, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setReport(null);
    setEmailStatus(null);
    setProvider(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/audit-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await readApiJson(response);

      if (!response.ok) {
        throw new Error(data.error || "Impossible de générer l’audit.");
      }

      setReport(data.report);
      setProvider(data.provider === "openai" ? "openai" : "anthropic");
      setEmailStatus({
        status: data.emailSent ? "sent" : data.emailQueued ? "queued" : "failed",
        recipient: form.email,
        message: data.emailError
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Erreur inattendue.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
      <Card className="h-fit p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="eyebrow">Questionnaire</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-charcoal">
              Informations à auditer
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setForm(demoForm)}
            className="rounded-lg border border-charcoal/10 px-4 py-3 text-sm font-black text-charcoal transition-colors hover:border-pine hover:text-pine"
          >
            Remplir un exemple
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          {fields.map((field) => (
            <Field
              key={field.name}
              field={field}
              value={form[field.name]}
              onChange={(value) => updateField(field.name, value)}
            />
          ))}

          {error ? (
            <div className="rounded-lg border border-pine/30 bg-pine/10 p-4 text-sm font-bold leading-6 text-charcoal">
              {error}
            </div>
          ) : null}

          <Button type="submit" size="xl" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Génération de l’audit...
              </>
            ) : (
              <>
                Lancer l’audit IA
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </Card>

      <div>
        {report ? (
          <div className="grid gap-5">
            {provider ? (
              <Card className="flex items-start gap-4 border-charcoal/10 bg-white p-5">
                <Sparkles className="mt-0.5 h-6 w-6 shrink-0 text-pine" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-pine">
                    Rapport généré avec {provider === "openai" ? "OpenAI" : "Claude"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    L’agent utilise Claude en priorité et bascule sur OpenAI si le premier fournisseur
                    n’est pas disponible.
                  </p>
                </div>
              </Card>
            ) : null}
            {emailStatus?.status === "sent" ? (
              <Card className="flex items-start gap-4 border-pine/30 bg-pine/10 p-5">
                <Mail className="mt-0.5 h-6 w-6 shrink-0 text-pine" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-pine">
                    Rapport envoyé par email
                  </p>
                  <p className="mt-2 text-sm leading-6 text-charcoal">
                    Le rapport complet a été envoyé à <strong>{emailStatus.recipient}</strong> avec
                    la version Excel et PDF en pièces jointes. Pensez à vérifier vos spams.
                  </p>
                </div>
              </Card>
            ) : emailStatus?.status === "queued" ? (
              <Card className="flex items-start gap-4 border-pine/30 bg-pine/10 p-5">
                <Mail className="mt-0.5 h-6 w-6 shrink-0 text-pine" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-pine">
                    Envoi email lancé
                  </p>
                  <p className="mt-2 text-sm leading-6 text-charcoal">
                    Le rapport est prêt ci-dessous. Le PDF et l’Excel sont générés puis envoyés en
                    arrière-plan à <strong>{emailStatus.recipient}</strong>. Sur Resend sans domaine
                    vérifié, seuls les emails de test autorisés peuvent recevoir le message.
                  </p>
                </div>
              </Card>
            ) : emailStatus ? (
              <Card className="flex items-start gap-4 border-charcoal/15 bg-cream p-5">
                <Mail className="mt-0.5 h-6 w-6 shrink-0 text-charcoal" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-charcoal">
                    Rapport disponible ci-dessous
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    L’envoi par email n’a pas pu aboutir, mais le rapport reste consultable ici.
                    {emailStatus.message ? ` Détail: ${emailStatus.message}` : ""}
                  </p>
                </div>
              </Card>
            ) : null}
            <ReportCard report={report} />
          </div>
        ) : (
          <Card className="grid min-h-[620px] place-items-center bg-cream p-8 text-center">
            <div className="max-w-xl">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-pine text-white">
                <Sparkles className="h-7 w-7" />
              </div>
              <h2 className="mt-6 font-serif text-4xl leading-tight text-charcoal">
                Le rapport apparaîtra ici
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                L’agent analysera les manques, priorisera les automatisations, proposera un process de déploiement et préparera les prochaines questions à poser au dirigeant.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
