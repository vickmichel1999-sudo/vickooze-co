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

const ANTHROPIC_TIMEOUT_MS = 50_000;
const ANTHROPIC_API_VERSION = "2023-06-01";
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

function extractAnthropicReport(response: any): AuditReport | null {
  const toolUse = response.content?.find(
    (part: any) => part?.type === "tool_use" && part?.name === "create_audit_report"
  );

  if (toolUse?.input && typeof toolUse.input === "object") {
    return toolUse.input as AuditReport;
  }

  const text = response.content
    ?.filter((part: any) => part?.type === "text" && typeof part?.text === "string")
    .map((part: any) => part.text)
    .join("\n");

  if (!text) {
    return null;
  }

  return JSON.parse(text) as AuditReport;
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

async function generateReportWithAnthropic(input: AuditAgentInput) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY est manquante.");
  }

  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514";
  const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_API_VERSION,
      "Content-Type": "application/json"
    },
    signal: AbortSignal.timeout(ANTHROPIC_TIMEOUT_MS),
    body: JSON.stringify({
      model,
      system: AUDIT_AGENT_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildAuditUserPrompt(input)
        }
      ],
      tools: [
        {
          name: "create_audit_report",
          description:
            "Retourne le rapport d'audit IA structuré pour VICKOOZE & Co, prêt à être affiché et envoyé au prospect.",
          input_schema: AUDIT_AGENT_RESPONSE_FORMAT.schema
        }
      ],
      tool_choice: {
        type: "tool",
        name: "create_audit_report"
      },
      temperature: 0.2,
      max_tokens: 4200
    })
  });

  const data = await readJsonResponse(anthropicResponse);

  if (!anthropicResponse.ok) {
    const message =
      data?.error?.message ||
      "Impossible de générer l’audit avec Anthropic pour le moment. Vérifie la clé API et le modèle configuré.";
    throw new Error(message);
  }

  const report = extractAnthropicReport(data);

  if (!report) {
    throw new Error("Claude n’a pas renvoyé de rapport exploitable.");
  }

  return report;
}

async function generateReportWithOpenAI(input: AuditAgentInput) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY est manquante.");
  }

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    signal: AbortSignal.timeout(OPENAI_TIMEOUT_MS),
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: AUDIT_AGENT_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: buildAuditUserPrompt(input)
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: AUDIT_AGENT_RESPONSE_FORMAT.name,
          strict: AUDIT_AGENT_RESPONSE_FORMAT.strict,
          schema: AUDIT_AGENT_RESPONSE_FORMAT.schema
        }
      },
      temperature: 0.2,
      max_tokens: 4200
    })
  });

  const data = await readJsonResponse(openAiResponse);

  if (!openAiResponse.ok) {
    const message =
      data?.error?.message ||
      "Impossible de générer l’audit avec OpenAI pour le moment. Vérifie la clé API et le modèle configuré.";
    throw new Error(message);
  }

  const content = data?.choices?.[0]?.message?.content;

  if (typeof content !== "string" || content.length === 0) {
    throw new Error("OpenAI n’a pas renvoyé de rapport exploitable.");
  }

  return JSON.parse(content) as AuditReport;
}

async function generateReport(input: AuditAgentInput) {
  const providerErrors: string[] = [];

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      return {
        report: await generateReportWithAnthropic(input),
        provider: "anthropic"
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur Anthropic inconnue.";
      providerErrors.push(`Anthropic: ${message}`);
      console.error("Anthropic audit generation failed, falling back to OpenAI", message);
    }
  } else {
    providerErrors.push("Anthropic: ANTHROPIC_API_KEY est manquante.");
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      return {
        report: await generateReportWithOpenAI(input),
        provider: "openai"
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur OpenAI inconnue.";
      providerErrors.push(`OpenAI: ${message}`);
      console.error("OpenAI audit generation failed", message);
    }
  } else {
    providerErrors.push("OpenAI: OPENAI_API_KEY est manquante.");
  }

  throw new Error(
    `Aucun fournisseur IA disponible pour générer l’audit. ${providerErrors.join(" ")}`
  );
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

  try {
    const { report, provider } = await generateReport(input);
    const canSendEmail = Boolean(process.env.RESEND_API_KEY);

    if (canSendEmail) {
      waitUntil(sendReportInBackground(input, report));
    }

    return NextResponse.json({
      report,
      provider,
      emailSent: false,
      emailQueued: canSendEmail,
      emailError: canSendEmail ? undefined : "RESEND_API_KEY manquante."
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Une erreur inattendue est survenue pendant la génération de l’audit.";
    const status = message.includes("Aucun fournisseur IA disponible") ? 503 : 500;

    return NextResponse.json(
      {
        error: message
      },
      { status }
    );
  }
}
