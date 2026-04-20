import { NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";

import {
  AUDIT_AGENT_RESPONSE_FORMAT,
  AUDIT_AGENT_SYSTEM_PROMPT,
  buildAuditUserPrompt
} from "@/lib/audit-agent";
import type { AuditAgentInput, AuditReport } from "@/lib/audit-agent";
import { createAuditPdf, createAuditWorkbook } from "@/lib/audit-report-assets";
import { sendAuditReportEmails } from "@/lib/audit-report-email";

export const runtime = "nodejs";
export const maxDuration = 60;

const OPENAI_TIMEOUT_MS = 50_000;

const requiredFields: Array<keyof AuditAgentInput> = [
  "companyName",
  "email",
  "sector",
  "teamSize",
  "currentTools",
  "mainProcesses",
  "repetitiveTasks",
  "painPoints",
  "monthlyVolume",
  "businessGoals",
  "constraints"
];

function sanitizeInput(payload: unknown): AuditAgentInput {
  if (!payload || typeof payload !== "object") {
    throw new Error("Données invalides.");
  }

  const source = payload as Record<string, unknown>;
  const input = requiredFields.reduce((acc, field) => {
    const value = source[field];
    acc[field] = typeof value === "string" ? value.trim().slice(0, 2200) : "";
    return acc;
  }, {} as AuditAgentInput);

  const missing = requiredFields.filter((field) => input[field].length < 2);
  if (missing.length > 0) {
    throw new Error("Merci de compléter tous les champs avant de lancer l’audit.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    throw new Error("Merci d’indiquer une adresse email valide.");
  }

  return input;
}

function extractOutputText(response: any): string {
  if (typeof response.output_text === "string") {
    return response.output_text;
  }

  const chunks: string[] = [];
  for (const output of response.output ?? []) {
    for (const content of output.content ?? []) {
      if (typeof content.text === "string") {
        chunks.push(content.text);
      }
    }
  }

  return chunks.join("\n");
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `Réponse non JSON reçue du fournisseur IA (${response.status}). Début de réponse: ${text
        .replace(/\s+/g, " ")
        .slice(0, 180)}`
    );
  }
}

async function sendReportInBackground(input: AuditAgentInput, report: AuditReport) {
  try {
    const excelBuffer = await createAuditWorkbook(input, report);
    const pdfBuffer = await createAuditPdf(input, report);
    const emailResult = await sendAuditReportEmails({
      input,
      report,
      excelBuffer,
      pdfBuffer
    });

    if (!emailResult.sent || emailResult.error) {
      console.error("Audit report email issue", emailResult.error);
    }
  } catch (error) {
    console.error("Audit report background email failed", error);
  }
}

export async function POST(request: Request) {
  let input: AuditAgentInput;

  try {
    input = sanitizeInput(await request.json());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Données invalides." },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OPENAI_API_KEY est manquante. Ajoute ta clé OpenAI dans .env.local ou dans les variables d’environnement Vercel pour activer l’agent."
      },
      { status: 503 }
    );
  }

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  try {
    const openAiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      signal: AbortSignal.timeout(OPENAI_TIMEOUT_MS),
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content: AUDIT_AGENT_SYSTEM_PROMPT
          },
          {
            role: "user",
            content: buildAuditUserPrompt(input)
          }
        ],
        text: {
          format: AUDIT_AGENT_RESPONSE_FORMAT
        },
        temperature: 0.2,
        max_output_tokens: 4200
      })
    });

    const data = await readJsonResponse(openAiResponse);

    if (!openAiResponse.ok) {
      const message =
        data?.error?.message ||
        "Impossible de générer l’audit pour le moment. Vérifie la clé API et le modèle configuré.";
      return NextResponse.json({ error: message }, { status: openAiResponse.status });
    }

    const outputText = extractOutputText(data);
    if (!outputText) {
      return NextResponse.json(
        { error: "Le modèle n’a pas renvoyé de rapport exploitable." },
        { status: 502 }
      );
    }

    const report = JSON.parse(outputText) as AuditReport;
    const canSendEmail = Boolean(process.env.RESEND_API_KEY);

    if (canSendEmail) {
      waitUntil(sendReportInBackground(input, report));
    }

    return NextResponse.json({
      report,
      emailSent: false,
      emailQueued: canSendEmail,
      emailError: canSendEmail ? undefined : "RESEND_API_KEY manquante."
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Une erreur inattendue est survenue pendant la génération de l’audit."
      },
      { status: 500 }
    );
  }
}
