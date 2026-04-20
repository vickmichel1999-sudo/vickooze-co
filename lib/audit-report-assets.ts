import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

import type { AuditAgentInput, AuditReport } from "@/lib/audit-agent";

const COLORS = {
  charcoal: "1A1A1A",
  coral: "FF6B35",
  peach: "FF9B7A",
  cream: "F5EDE4",
  muted: "555555",
  white: "FFFFFF"
};

function cleanFilePart(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 48);
}

export function getReportFilename(input: AuditAgentInput, extension: "xlsx" | "pdf") {
  const company = cleanFilePart(input.companyName || "entreprise");
  return `audit-ia-vickooze-${company}.${extension}`;
}

function styleHeader(row: ExcelJS.Row) {
  row.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: COLORS.white } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: COLORS.charcoal }
    };
    cell.alignment = { vertical: "middle", wrapText: true };
    cell.border = {
      top: { style: "thin", color: { argb: "DDDDDD" } },
      left: { style: "thin", color: { argb: "DDDDDD" } },
      bottom: { style: "thin", color: { argb: "DDDDDD" } },
      right: { style: "thin", color: { argb: "DDDDDD" } }
    };
  });
}

function addTitle(sheet: ExcelJS.Worksheet, title: string, subtitle?: string) {
  sheet.mergeCells("A1:F1");
  sheet.getCell("A1").value = title;
  sheet.getCell("A1").font = { bold: true, size: 20, color: { argb: COLORS.charcoal } };
  sheet.getCell("A1").alignment = { vertical: "middle" };
  sheet.getRow(1).height = 34;

  if (subtitle) {
    sheet.mergeCells("A2:F2");
    sheet.getCell("A2").value = subtitle;
    sheet.getCell("A2").font = { size: 11, color: { argb: COLORS.muted } };
    sheet.getCell("A2").alignment = { wrapText: true };
    sheet.getRow(2).height = 34;
  }
}

function addKeyValueRows(sheet: ExcelJS.Worksheet, startRow: number, rows: Array<[string, string | number]>) {
  rows.forEach(([label, value], index) => {
    const row = sheet.getRow(startRow + index);
    row.getCell(1).value = label;
    row.getCell(2).value = value;
    row.getCell(1).font = { bold: true, color: { argb: COLORS.charcoal } };
    row.getCell(2).alignment = { wrapText: true };
    row.height = 28;
  });
}

export async function createAuditWorkbook(input: AuditAgentInput, report: AuditReport) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "VICKOOZE & Co";
  workbook.created = new Date();
  workbook.modified = new Date();

  const summary = workbook.addWorksheet("Synthese");
  summary.columns = [
    { width: 26 },
    { width: 58 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 }
  ];
  addTitle(summary, "Audit IA - Synthese executive", `Entreprise: ${input.companyName}`);
  addKeyValueRows(summary, 4, [
    ["Email client", input.email],
    ["Secteur", input.sector],
    ["Taille equipe", input.teamSize],
    ["Score maturite IA", `${report.maturityScore}/100 - ${report.maturityLabel}`],
    ["Prix indicatif", report.commercialOffer.recommendedPrice]
  ]);
  summary.mergeCells("A11:F11");
  summary.getCell("A11").value = "Resume executif";
  summary.getCell("A11").font = { bold: true, color: { argb: COLORS.white } };
  summary.getCell("A11").fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.coral } };
  summary.mergeCells("A12:F15");
  summary.getCell("A12").value = report.executiveSummary;
  summary.getCell("A12").alignment = { wrapText: true, vertical: "top" };
  summary.getRow(12).height = 90;

  const gaps = workbook.addWorksheet("Manques detectes");
  gaps.columns = [{ width: 30 }, { width: 34 }, { width: 42 }, { width: 44 }];
  addTitle(gaps, "Manques detectes");
  gaps.addRow([]);
  gaps.addRow(["Manque", "Impact", "Element observe", "Recommandation"]);
  styleHeader(gaps.getRow(4));
  report.detectedGaps.forEach((gap) => {
    const row = gaps.addRow([gap.title, gap.impact, gap.evidence, gap.recommendation]);
    row.alignment = { wrapText: true, vertical: "top" };
    row.height = 72;
  });

  const automations = workbook.addWorksheet("Automatisations");
  automations.columns = [
    { width: 28 },
    { width: 30 },
    { width: 36 },
    { width: 44 },
    { width: 28 },
    { width: 18 },
    { width: 16 },
    { width: 16 },
    { width: 36 }
  ];
  addTitle(automations, "Automatisations prioritaires");
  automations.addRow([]);
  automations.addRow([
    "Titre",
    "Process",
    "Probleme actuel",
    "Solution IA",
    "Outils recommandes",
    "Gain estime",
    "Difficulte",
    "ROI",
    "Premier pas"
  ]);
  styleHeader(automations.getRow(4));
  report.priorityAutomations.forEach((automation) => {
    const row = automations.addRow([
      automation.title,
      automation.process,
      automation.currentProblem,
      automation.aiSolution,
      automation.recommendedTools.join(", "),
      automation.estimatedTimeSaved,
      automation.difficulty,
      automation.roiPotential,
      automation.firstStep
    ]);
    row.alignment = { wrapText: true, vertical: "top" };
    row.height = 86;
  });

  const roadmap = workbook.addWorksheet("Roadmap");
  roadmap.columns = [{ width: 18 }, { width: 90 }];
  addTitle(roadmap, "Roadmap 30 / 60 / 90 jours");
  roadmap.addRow([]);
  roadmap.addRow(["Periode", "Actions"]);
  styleHeader(roadmap.getRow(4));
  report.roadmap.forEach((item) => {
    const row = roadmap.addRow([item.period, item.actions.map((action) => `- ${action}`).join("\n")]);
    row.alignment = { wrapText: true, vertical: "top" };
    row.height = 86;
  });

  const offer = workbook.addWorksheet("Offre commerciale");
  offer.columns = [{ width: 28 }, { width: 88 }];
  addTitle(offer, "Proposition commerciale indicative");
  addKeyValueRows(offer, 4, [
    ["Offre", report.commercialOffer.title],
    ["Prix indicatif", report.commercialOffer.recommendedPrice],
    ["Justification", report.commercialOffer.priceJustification],
    ["Prochaine etape", report.nextStep]
  ]);
  offer.getRow(6).height = 80;
  offer.getRow(7).height = 60;
  offer.addRow([]);
  offer.addRow(["Livrables inclus", report.commercialOffer.includedDeliverables.map((item) => `- ${item}`).join("\n")]);
  offer.addRow(["Options", report.commercialOffer.optionalUpsells.map((item) => `- ${item}`).join("\n")]);
  offer.getRow(10).height = 100;
  offer.getRow(11).height = 80;

  for (const sheet of workbook.worksheets) {
    sheet.views = [{ state: "frozen", ySplit: 4 }];
    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "E6E0DA" } },
          left: { style: "thin", color: { argb: "E6E0DA" } },
          bottom: { style: "thin", color: { argb: "E6E0DA" } },
          right: { style: "thin", color: { argb: "E6E0DA" } }
        };
      });
    });
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

function addPdfTitle(doc: PDFKit.PDFDocument, title: string, subtitle?: string) {
  doc
    .fillColor(`#${COLORS.coral}`)
    .fontSize(9)
    .text("VICKOOZE & Co - Audit IA", { characterSpacing: 1.6 });
  doc.moveDown(0.6);
  doc.fillColor(`#${COLORS.charcoal}`).fontSize(24).text(title, { lineGap: 4 });
  if (subtitle) {
    doc.moveDown(0.5);
    doc.fillColor(`#${COLORS.muted}`).fontSize(11).text(subtitle, { lineGap: 3 });
  }
  doc.moveDown(1);
}

function addPdfSection(doc: PDFKit.PDFDocument, title: string, body?: string) {
  doc.moveDown(0.8);
  doc.fillColor(`#${COLORS.charcoal}`).fontSize(16).text(title);
  if (body) {
    doc.moveDown(0.3);
    doc.fillColor(`#${COLORS.muted}`).fontSize(10.5).text(body, { lineGap: 3 });
  }
}

function addPdfBullets(doc: PDFKit.PDFDocument, items: string[]) {
  doc.moveDown(0.3);
  items.forEach((item) => {
    doc.fillColor(`#${COLORS.muted}`).fontSize(10.5).text(`• ${item}`, { lineGap: 3 });
  });
}

export async function createAuditPdf(input: AuditAgentInput, report: AuditReport) {
  const doc = new PDFDocument({ size: "A4", margin: 48, bufferPages: true });
  const chunks: Buffer[] = [];

  doc.on("data", (chunk: Buffer) => chunks.push(chunk));

  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  addPdfTitle(
    doc,
    `Rapport d'audit IA - ${input.companyName}`,
    `Score: ${report.maturityScore}/100 (${report.maturityLabel}) | Prix indicatif: ${report.commercialOffer.recommendedPrice}`
  );
  addPdfSection(doc, "Synthese executive", report.executiveSummary);

  addPdfSection(doc, "Manques detectes");
  report.detectedGaps.forEach((gap) => {
    doc.moveDown(0.4);
    doc.fillColor(`#${COLORS.charcoal}`).fontSize(11.5).text(gap.title);
    doc.fillColor(`#${COLORS.muted}`).fontSize(10).text(`${gap.impact} ${gap.recommendation}`, { lineGap: 2 });
  });

  doc.addPage();
  addPdfTitle(doc, "Automatisations prioritaires");
  report.priorityAutomations.forEach((automation, index) => {
    if (index > 0) doc.moveDown(0.9);
    doc.fillColor(`#${COLORS.coral}`).fontSize(9).text(`Priorite ${index + 1}`);
    doc.fillColor(`#${COLORS.charcoal}`).fontSize(14).text(automation.title);
    doc
      .fillColor(`#${COLORS.muted}`)
      .fontSize(10)
      .text(`Probleme: ${automation.currentProblem}`, { lineGap: 2 })
      .text(`Solution: ${automation.aiSolution}`, { lineGap: 2 })
      .text(
        `Gain estime: ${automation.estimatedTimeSaved} | Difficulté: ${automation.difficulty} | ROI: ${automation.roiPotential}`,
        { lineGap: 2 }
      );
  });

  doc.addPage();
  addPdfTitle(doc, "Roadmap et offre");
  report.roadmap.forEach((item) => {
    addPdfSection(doc, item.period);
    addPdfBullets(doc, item.actions);
  });

  addPdfSection(doc, "Proposition commerciale", report.commercialOffer.title);
  doc.fillColor(`#${COLORS.coral}`).fontSize(18).text(report.commercialOffer.recommendedPrice);
  doc.moveDown(0.4);
  doc.fillColor(`#${COLORS.muted}`).fontSize(10.5).text(report.commercialOffer.priceJustification, { lineGap: 3 });
  addPdfSection(doc, "Livrables inclus");
  addPdfBullets(doc, report.commercialOffer.includedDeliverables);
  addPdfSection(doc, "Prochaine etape", report.nextStep);

  doc.end();
  return done;
}
