import { Resend } from "resend";

import type { AuditAgentInput, AuditReport } from "@/lib/audit-agent";
import { getReportFilename } from "@/lib/audit-report-assets";

const FROM_EMAIL = process.env.RESEND_FROM || "VICKOOZE & Co <onboarding@resend.dev>";
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "Vicolango@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function list(items: string[]) {
  return `<ul style="padding-left:18px;margin:12px 0;color:#555;line-height:1.7;">${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul>`;
}

export function buildClientAuditEmail(input: AuditAgentInput, report: AuditReport) {
  const automations = report.priorityAutomations
    .slice(0, 3)
    .map(
      (automation) => `
        <tr>
          <td style="padding:14px;border-bottom:1px solid #eee;">
            <strong style="color:#1A1A1A;">${escapeHtml(automation.title)}</strong><br />
            <span style="color:#555;">${escapeHtml(automation.estimatedTimeSaved)} · ROI ${escapeHtml(
              automation.roiPotential
            )} · Difficulté ${escapeHtml(automation.difficulty)}</span>
          </td>
        </tr>`
    )
    .join("");

  return `
    <div style="margin:0;background:#F5EDE4;padding:32px;font-family:Inter,Arial,sans-serif;color:#1A1A1A;">
      <div style="max-width:680px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
        <div style="background:#1A1A1A;color:#fff;padding:28px 32px;">
          <p style="margin:0 0 10px;color:#FF9B7A;font-size:12px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;">VICKOOZE & Co</p>
          <h1 style="margin:0;font-size:30px;line-height:1.15;">Votre pré-audit IA est prêt</h1>
          <p style="margin:14px 0 0;color:#ddd;line-height:1.6;">${escapeHtml(input.companyName)} · ${escapeHtml(input.sector)}</p>
        </div>

        <div style="padding:30px 32px;">
          <p style="margin:0 0 18px;color:#555;line-height:1.7;">Bonjour,</p>
          <p style="margin:0 0 18px;color:#555;line-height:1.7;">
            Suite aux informations partagées, voici une première analyse des opportunités IA et automatisation pour votre entreprise.
          </p>

          <div style="background:#F5EDE4;border-left:4px solid #FF6B35;padding:18px;margin:24px 0;border-radius:8px;">
            <p style="margin:0;color:#FF6B35;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">Synthèse</p>
            <p style="margin:10px 0 0;color:#1A1A1A;line-height:1.7;">${escapeHtml(report.executiveSummary)}</p>
          </div>

          <table role="presentation" style="width:100%;border-collapse:collapse;margin:22px 0;border:1px solid #eee;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:18px;background:#1A1A1A;color:#fff;">
                <strong>Score maturité IA</strong><br />
                <span style="font-size:36px;color:#FF9B7A;font-weight:800;">${report.maturityScore}/100</span><br />
                <span style="color:#ddd;">${escapeHtml(report.maturityLabel)}</span>
              </td>
              <td style="padding:18px;background:#FF6B35;color:#fff;">
                <strong>Prix indicatif</strong><br />
                <span style="font-size:24px;font-weight:800;">${escapeHtml(report.commercialOffer.recommendedPrice)}</span><br />
                <span style="color:#ffe8de;">à valider après cadrage</span>
              </td>
            </tr>
            ${automations}
          </table>

          <h2 style="margin:24px 0 10px;font-size:22px;">Prochaine étape recommandée</h2>
          <p style="margin:0;color:#555;line-height:1.7;">${escapeHtml(report.nextStep)}</p>

          <h2 style="margin:24px 0 10px;font-size:22px;">Livrables inclus dans la proposition</h2>
          ${list(report.commercialOffer.includedDeliverables)}

          <p style="margin:24px 0 0;color:#555;line-height:1.7;">
            Vous trouverez en pièces jointes la version Excel et PDF du rapport.
          </p>
          <p style="margin:18px 0 0;color:#1A1A1A;line-height:1.7;">
            Vick-Emmanuel Michel<br />
            VICKOOZE & Co
          </p>
        </div>
      </div>
    </div>
  `;
}

export function buildNotificationEmail(input: AuditAgentInput, report: AuditReport) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#1A1A1A;line-height:1.7;">
      <h1>Nouveau rapport audit IA envoyé</h1>
      <p><strong>Entreprise:</strong> ${escapeHtml(input.companyName)}</p>
      <p><strong>Email client:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Secteur:</strong> ${escapeHtml(input.sector)}</p>
      <p><strong>Score:</strong> ${report.maturityScore}/100 - ${escapeHtml(report.maturityLabel)}</p>
      <p><strong>Prix indicatif:</strong> ${escapeHtml(report.commercialOffer.recommendedPrice)}</p>
      <h2>Top automatisations</h2>
      ${list(report.priorityAutomations.slice(0, 5).map((automation) => `${automation.title} - ${automation.estimatedTimeSaved}`))}
      <h2>Questions à clarifier</h2>
      ${list(report.questionsToClarify)}
    </div>
  `;
}

export async function sendAuditReportEmails({
  input,
  report,
  excelBuffer,
  pdfBuffer
}: {
  input: AuditAgentInput;
  report: AuditReport;
  excelBuffer: Buffer;
  pdfBuffer: Buffer;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { sent: false, error: "RESEND_API_KEY manquante." };
  }

  const resend = new Resend(apiKey);
  const excelFilename = getReportFilename(input, "xlsx");
  const pdfFilename = getReportFilename(input, "pdf");

  const attachments = [
    {
      filename: excelFilename,
      content: excelBuffer.toString("base64")
    },
    {
      filename: pdfFilename,
      content: pdfBuffer.toString("base64")
    }
  ];

  const clientResult = await resend.emails.send({
    from: FROM_EMAIL,
    to: input.email,
    subject: `Votre pré-audit IA - ${input.companyName}`,
    html: buildClientAuditEmail(input, report),
    attachments
  });

  if (clientResult.error) {
    return { sent: false, error: clientResult.error.message };
  }

  const notificationResult = await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFICATION_EMAIL,
    subject: `Nouveau lead audit IA - ${input.companyName}`,
    html: buildNotificationEmail(input, report),
    attachments
  });

  if (notificationResult.error) {
    return { sent: true, error: notificationResult.error.message };
  }

  return { sent: true };
}
