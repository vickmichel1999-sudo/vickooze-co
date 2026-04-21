export type AuditAgentInput = {
  companyName: string;
  email: string;
  sector: string;
  teamSize: string;
  currentTools: string;
  mainProcesses: string;
  repetitiveTasks: string;
  painPoints: string;
  monthlyVolume: string;
  businessGoals: string;
  constraints: string;
};

export type AuditGap = {
  title: string;
  impact: string;
  evidence: string;
  recommendation: string;
};

export type PriorityAutomation = {
  title: string;
  process: string;
  currentProblem: string;
  aiSolution: string;
  recommendedTools: string[];
  estimatedTimeSaved: string;
  difficulty: "Faible" | "Moyenne" | "Élevée";
  roiPotential: "Faible" | "Moyen" | "Fort";
  firstStep: string;
};

export type RoadmapItem = {
  period: string;
  actions: string[];
};

export type CommercialOffer = {
  title: string;
  recommendedPrice: string;
  priceJustification: string;
  includedDeliverables: string[];
  optionalUpsells: string[];
};

export type AuditReport = {
  executiveSummary: string;
  maturityScore: number;
  maturityLabel: string;
  detectedGaps: AuditGap[];
  priorityAutomations: PriorityAutomation[];
  recommendedProcess: string[];
  roadmap: RoadmapItem[];
  questionsToClarify: string[];
  risksAndSafeguards: string[];
  commercialOffer: CommercialOffer;
  nextStep: string;
};

export const AUDIT_AGENT_SYSTEM_PROMPT = `
Tu es l'agent d'audit IA de VICKOOZE & Co, cabinet de conseil en IA pour TPE/PME françaises de 5 à 50 salariés.

Ta mission:
- analyser les informations d'une TPE/PME;
- détecter les manques opérationnels, les pertes de temps et les processus fragiles;
- identifier les 3 à 5 automatisations ou agents IA à plus fort potentiel;
- proposer une méthode claire de déploiement;
- rester pragmatique, business et orienté ROI.

Règles:
- Réponds uniquement en français.
- Ne promets jamais un gain garanti. Parle en estimation ou potentiel.
- Priorise les cas d'usage simples, rapides à tester et connectés aux outils existants.
- Mentionne Make, n8n, Zapier, CRM, emails, Slack, Notion, Airtable ou Google Workspace seulement si pertinent.
- Privilégie les TPE/PME sans équipe technique interne.
- Si une information manque, formule une hypothèse raisonnable et ajoute une question dans questionsToClarify.
- Le résultat doit aider Vick-Emmanuel Michel à préparer un audit ou une proposition commerciale.
- Termine par une proposition commerciale indicative et justifiée.
- Pour le prix, reste cohérent pour une TPE/PME française:
  - mission simple: 900 à 1 500 €;
  - agent IA ou workflow standard: 1 500 à 3 000 €;
  - mission complète avec plusieurs automatisations: 3 000 à 7 000 €;
  - accompagnement mensuel optionnel: 490 à 1 500 €/mois.
- Le prix doit être présenté comme indicatif et à valider après cadrage humain.
`.trim();

export function buildAuditUserPrompt(input: AuditAgentInput) {
  return `
Voici les informations fournies par l'entreprise à auditer:

Nom de l'entreprise: ${input.companyName}
Secteur d'activité: ${input.sector}
Taille de l'équipe: ${input.teamSize}
Outils actuels: ${input.currentTools}
Processus principaux: ${input.mainProcesses}
Tâches répétitives: ${input.repetitiveTasks}
Douleurs / blocages: ${input.painPoints}
Volume mensuel approximatif: ${input.monthlyVolume}
Objectifs business: ${input.businessGoals}
Contraintes: ${input.constraints}

Produis un audit structuré avec:
1. un résumé exécutif;
2. un score de maturité IA sur 100;
3. les manques principaux;
4. les automatisations prioritaires;
5. le processus recommandé;
6. une roadmap 30 / 60 / 90 jours;
7. les questions à clarifier;
8. les risques et garde-fous;
9. une proposition commerciale indicative avec prix et justification;
10. la meilleure prochaine étape commerciale.
`.trim();
}

export const AUDIT_AGENT_RESPONSE_FORMAT = {
  type: "json_schema",
  name: "vickooze_ai_audit",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      executiveSummary: { type: "string" },
      maturityScore: { type: "number" },
      maturityLabel: { type: "string" },
      detectedGaps: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: { type: "string" },
            impact: { type: "string" },
            evidence: { type: "string" },
            recommendation: { type: "string" }
          },
          required: ["title", "impact", "evidence", "recommendation"]
        }
      },
      priorityAutomations: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: { type: "string" },
            process: { type: "string" },
            currentProblem: { type: "string" },
            aiSolution: { type: "string" },
            recommendedTools: {
              type: "array",
              items: { type: "string" }
            },
            estimatedTimeSaved: { type: "string" },
            difficulty: {
              type: "string",
              enum: ["Faible", "Moyenne", "Élevée"]
            },
            roiPotential: {
              type: "string",
              enum: ["Faible", "Moyen", "Fort"]
            },
            firstStep: { type: "string" }
          },
          required: [
            "title",
            "process",
            "currentProblem",
            "aiSolution",
            "recommendedTools",
            "estimatedTimeSaved",
            "difficulty",
            "roiPotential",
            "firstStep"
          ]
        }
      },
      recommendedProcess: {
        type: "array",
        items: { type: "string" }
      },
      roadmap: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            period: { type: "string" },
            actions: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["period", "actions"]
        }
      },
      questionsToClarify: {
        type: "array",
        items: { type: "string" }
      },
      risksAndSafeguards: {
        type: "array",
        items: { type: "string" }
      },
      commercialOffer: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          recommendedPrice: { type: "string" },
          priceJustification: { type: "string" },
          includedDeliverables: {
            type: "array",
            items: { type: "string" }
          },
          optionalUpsells: {
            type: "array",
            items: { type: "string" }
          }
        },
        required: [
          "title",
          "recommendedPrice",
          "priceJustification",
          "includedDeliverables",
          "optionalUpsells"
        ]
      },
      nextStep: { type: "string" }
    },
    required: [
      "executiveSummary",
      "maturityScore",
      "maturityLabel",
      "detectedGaps",
      "priorityAutomations",
      "recommendedProcess",
      "roadmap",
      "questionsToClarify",
      "risksAndSafeguards",
      "commercialOffer",
      "nextStep"
    ]
  }
} as const;
