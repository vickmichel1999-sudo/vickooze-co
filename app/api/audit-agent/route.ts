import { NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";

import {
  AUDIT_CLARIFICATION_RESPONSE_FORMAT,
  AUDIT_CLARIFICATION_SYSTEM_PROMPT,
  AUDIT_AGENT_RESPONSE_FORMAT,
  AUDIT_AGENT_SYSTEM_PROMPT,
  buildAuditClarificationPrompt,
  buildAuditUserPrompt
} from "@/lib/audit-agent";
import type {
  AuditAgentInput,
  AuditClarificationAnswer,
  AuditClarificationReview,
  AuditReport
} from "@/lib/audit-agent";
import { createAuditPdf, createAuditWorkbook } from "@/lib/audit-report-assets";
import { sendAuditReportEmails } from "@/lib/audit-report-email";

export const runtime = "nodejs";
export const maxDuration = 60;

const ANTHROPIC_TIMEOUT_MS = 50_000;
const ANTHROPIC_API_VERSION = "2023-06-01";
const OPENAI_TIMEOUT_MS = 50_000;
type AuditProvider = "anthropic" | "openai";

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
  "timeLostPerWeek",
  "leadValue",
  "errorFrequency",
  "processOwner",
  "sampleWorkItem",
  "urgency",
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

function sanitizeClarificationAnswers(payload: unknown): AuditClarificationAnswer[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const source = payload as { clarificationAnswers?: unknown };

  if (!Array.isArray(source.clarificationAnswers)) {
    return [];
  }

  return source.clarificationAnswers
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const answerSource = item as Record<string, unknown>;
      const question =
        typeof answerSource.question === "string" ? answerSource.question.trim().slice(0, 280) : "";
      const answer =
        typeof answerSource.answer === "string" ? answerSource.answer.trim().slice(0, 2200) : "";

      if (question.length < 2 || answer.length < 2) {
        return null;
      }

      return {
        question,
        answer
      };
    })
    .filter((item): item is AuditClarificationAnswer => Boolean(item));
}

function extractAnthropicToolInput<T>(response: any, toolName: string): T | null {
  const toolUse = response.content?.find(
    (part: any) => part?.type === "tool_use" && part?.name === toolName
  );

  if (toolUse?.input && typeof toolUse.input === "object") {
    return toolUse.input as T;
  }

  const text = response.content
    ?.filter((part: any) => part?.type === "text" && typeof part?.text === "string")
    .map((part: any) => part.text)
    .join("\n");

  if (!text) {
    return null;
  }

  return JSON.parse(text) as T;
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

async function generateClarificationWithAnthropic(input: AuditAgentInput) {
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
      system: AUDIT_CLARIFICATION_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildAuditClarificationPrompt(input)
        }
      ],
      tools: [
        {
          name: "create_audit_clarification",
          description:
            "Retourne la décision de pré-analyse indiquant si le rapport peut être généré tout de suite ou s'il faut demander 1 à 3 précisions.",
          input_schema: AUDIT_CLARIFICATION_RESPONSE_FORMAT.schema
        }
      ],
      tool_choice: {
        type: "tool",
        name: "create_audit_clarification"
      },
      temperature: 0.2,
      max_tokens: 1500
    })
  });

  const data = await readJsonResponse(anthropicResponse);

  if (!anthropicResponse.ok) {
    const message =
      data?.error?.message ||
      "Impossible de générer l’audit avec Anthropic pour le moment. Vérifie la clé API et le modèle configuré.";
    throw new Error(message);
  }

  const clarification = extractAnthropicToolInput<AuditClarificationReview>(
    data,
    "create_audit_clarification"
  );

  if (!clarification) {
    throw new Error("Claude n’a pas renvoyé de pré-analyse exploitable.");
  }

  return clarification;
}

async function generateClarificationWithOpenAI(input: AuditAgentInput) {
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
          content: AUDIT_CLARIFICATION_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: buildAuditClarificationPrompt(input)
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: AUDIT_CLARIFICATION_RESPONSE_FORMAT.name,
          strict: AUDIT_CLARIFICATION_RESPONSE_FORMAT.strict,
          schema: AUDIT_CLARIFICATION_RESPONSE_FORMAT.schema
        }
      },
      temperature: 0.2,
      max_tokens: 1500
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
    throw new Error("OpenAI n’a pas renvoyé de pré-analyse exploitable.");
  }

  return JSON.parse(content) as AuditClarificationReview;
}

async function generateClarification(input: AuditAgentInput) {
  const providerErrors: string[] = [];

  if (process.env.OPENAI_API_KEY) {
    try {
      return {
        clarification: await generateClarificationWithOpenAI(input),
        provider: "openai"
      } satisfies {
        clarification: AuditClarificationReview;
        provider: AuditProvider;
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur OpenAI inconnue.";
      providerErrors.push(`OpenAI: ${message}`);
      console.error("OpenAI audit clarification failed, falling back to Anthropic", message);
    }
  } else {
    providerErrors.push("OpenAI: OPENAI_API_KEY est manquante.");
  }

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      return {
        clarification: await generateClarificationWithAnthropic(input),
        provider: "anthropic"
      } satisfies {
        clarification: AuditClarificationReview;
        provider: AuditProvider;
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur Anthropic inconnue.";
      providerErrors.push(`Anthropic: ${message}`);
      console.error("Anthropic audit clarification failed", message);
    }
  } else {
    providerErrors.push("Anthropic: ANTHROPIC_API_KEY est manquante.");
  }

  throw new Error(
    `Aucun fournisseur IA disponible pour pré-analyser l’audit. ${providerErrors.join(" ")}`
  );
}

async function generateReportWithAnthropic(
  input: AuditAgentInput,
  clarificationAnswers: AuditClarificationAnswer[] = []
) {
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
          content: buildAuditUserPrompt(input, clarificationAnswers)
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

  const report = extractAnthropicToolInput<AuditReport>(data, "create_audit_report");

  if (!report) {
    throw new Error("Claude n’a pas renvoyé de rapport exploitable.");
  }

  return report;
}

async function generateReportWithOpenAI(
  input: AuditAgentInput,
  clarificationAnswers: AuditClarificationAnswer[] = []
) {
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
          content: buildAuditUserPrompt(input, clarificationAnswers)
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

async function generateReport(
  input: AuditAgentInput,
  clarificationAnswers: AuditClarificationAnswer[] = []
) {
  const providerErrors: string[] = [];

  if (process.env.OPENAI_API_KEY) {
    try {
      return {
        report: await generateReportWithOpenAI(input, clarificationAnswers),
        provider: "openai"
      } satisfies { report: AuditReport; provider: AuditProvider };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur OpenAI inconnue.";
      providerErrors.push(`OpenAI: ${message}`);
      console.error("OpenAI audit generation failed, falling back to Anthropic", message);
    }
  } else {
    providerErrors.push("OpenAI: OPENAI_API_KEY est manquante.");
  }

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      return {
        report: await generateReportWithAnthropic(input, clarificationAnswers),
        provider: "anthropic"
      } satisfies { report: AuditReport; provider: AuditProvider };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur Anthropic inconnue.";
      providerErrors.push(`Anthropic: ${message}`);
      console.error("Anthropic audit generation failed", message);
    }
  } else {
    providerErrors.push("Anthropic: ANTHROPIC_API_KEY est manquante.");
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
  let payload: unknown;
  let clarificationAnswers: AuditClarificationAnswer[] = [];

  try {
    payload = await request.json();
    input = sanitizeInput(payload);
    clarificationAnswers = sanitizeClarificationAnswers(payload);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Données invalides." },
      { status: 400 }
    );
  }

  try {
    if (clarificationAnswers.length === 0) {
      const { clarification, provider } = await generateClarification(input);

      if (!clarification.readyForReport) {
        return NextResponse.json({
          status: "needs_clarification",
          clarification,
          provider
        });
      }
    }

    const { report, provider } = await generateReport(input, clarificationAnswers);
    const canSendEmail = Boolean(process.env.RESEND_API_KEY);

    if (canSendEmail) {
      waitUntil(sendReportInBackground(input, report));
    }

    return NextResponse.json({
      status: "completed",
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
