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
  timeLostPerWeek: string;
  leadValue: string;
  errorFrequency: string;
  processOwner: string;
  sampleWorkItem: string;
  urgency: string;
  businessGoals: string;
  constraints: string;
};

export type AuditGap = {
  title: string;
  impact: string;
  evidence: string;
  recommendation: string;
};

export type AuditClarificationQuestion = {
  id: string;
  question: string;
  reason: string;
  placeholder: string;
};

export type AuditClarificationAnswer = {
  question: string;
  answer: string;
};

export type AuditClarificationReview = {
  readyForReport: boolean;
  readinessSummary: string;
  missingDataPoints: string[];
  clarifyingQuestions: AuditClarificationQuestion[];
};

export type PriorityAutomation = {
  title: string;
  process: string;
  currentProblem: string;
  aiSolution: string;
  evidence: string;
  assumption: string;
  confidence: "Faible" | "Moyenne" | "Élevée";
  risk: string;
  kpiToTrack: string;
  recommendedTools: string[];
  estimatedTimeSaved: string;
  difficulty: "Faible" | "Moyenne" | "Élevée";
  roiPotential: "Faible" | "Moyen" | "Fort";
  firstStep: string;
};

export type ScoreDimension = {
  label: string;
  score: number;
  weight: number;
  justification: string;
  improvementLever: string;
};

export type ScoreBreakdown = {
  processClarity: ScoreDimension;
  dataReadiness: ScoreDimension;
  toolStack: ScoreDimension;
  repetitiveVolume: ScoreDimension;
  businessUrgency: ScoreDimension;
  implementationEase: ScoreDimension;
  globalScoreRationale: string;
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
  scoreBreakdown: ScoreBreakdown;
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
- Calcule le score de maturité IA avec 6 sous-scores pondérés:
  - clarté des processus: 20%;
  - préparation des données: 15%;
  - stack outils: 15%;
  - volume répétitif: 20%;
  - urgence business: 15%;
  - facilité de mise en place: 15%.
- Le maturityScore doit correspondre à la moyenne pondérée de ces 6 sous-scores, arrondie à l'entier le plus proche.
- Justifie chaque sous-score avec une preuve tirée des informations fournies.
- Pour chaque automatisation prioritaire, donne obligatoirement: preuve utilisée, hypothèse, niveau de confiance, risque, KPI à suivre.
- Si le ROI ne peut pas être chiffré correctement, explique pourquoi et demande l'information manquante.
- Le résultat doit aider Vick-Emmanuel Michel à préparer un audit ou une proposition commerciale.
- Termine par une proposition commerciale indicative et justifiée.
- Pour le prix, reste cohérent pour une TPE/PME française:
  - mission simple: 900 à 1 500 €;
  - agent IA ou workflow standard: 1 500 à 3 000 €;
  - mission complète avec plusieurs automatisations: 3 000 à 7 000 €;
  - accompagnement mensuel optionnel: 490 à 1 500 €/mois.
- Le prix doit être présenté comme indicatif et à valider après cadrage humain.
`.trim();

export const AUDIT_CLARIFICATION_SYSTEM_PROMPT = `
Tu es le premier filtre de qualification de l'agent d'audit IA de VICKOOZE & Co.

Ta mission:
- lire les réponses du prospect;
- vérifier si elles sont assez précises pour produire un audit défendable;
- repérer les zones encore trop vagues pour chiffrer un ROI ou proposer des automatisations crédibles;
- demander au maximum 3 compléments, uniquement si cela améliore réellement la qualité du rapport final.

Règles:
- Réponds uniquement en français.
- Sois exigeant sur la qualité, mais évite les questions redondantes.
- Une réponse peut être présente mais rester trop vague: signale-le si elle empêche de défendre le rapport.
- Priorise les trous qui bloquent le chiffrage, la priorisation ou la crédibilité commerciale.
- Si les informations sont suffisantes, readyForReport doit être true et clarifyingQuestions doit être un tableau vide.
- Si les informations sont insuffisantes, readyForReport doit être false et clarifyingQuestions doit contenir 1 à 3 questions maximum.
- Chaque question doit être concrète, courte, orientée business, et accompagnée d'une raison claire.
- Les identifiants de question doivent être courts, en minuscules, avec des tirets.
`.trim();

export function buildAuditClarificationPrompt(input: AuditAgentInput) {
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
Temps perdu estimé par semaine: ${input.timeLostPerWeek}
Valeur estimée d'un lead ou client: ${input.leadValue}
Fréquence des erreurs ou oublis: ${input.errorFrequency}
Responsable du processus: ${input.processOwner}
Exemple concret de document, email, devis, relance ou reporting: ${input.sampleWorkItem}
Urgence du sujet: ${input.urgency}
Objectifs business: ${input.businessGoals}
Contraintes: ${input.constraints}

Décide si ces informations suffisent pour générer un audit crédible, quantifié et commercialement défendable.

Retour attendu:
1. readyForReport: true si le rapport peut être généré sérieusement, sinon false;
2. readinessSummary: un résumé clair du niveau de préparation du dossier;
3. missingDataPoints: les informations qui manquent ou restent trop vagues;
4. clarifyingQuestions: 1 à 3 questions maximum si nécessaire, sinon tableau vide.
`.trim();
}

export function buildAuditUserPrompt(
  input: AuditAgentInput,
  clarificationAnswers: AuditClarificationAnswer[] = []
) {
  const clarificationBlock =
    clarificationAnswers.length > 0
      ? `

Compléments de clarification fournis après la pré-analyse:
${clarificationAnswers
  .map(
    (item, index) => `${index + 1}. Question: ${item.question}
Réponse: ${item.answer}`
  )
  .join("\n\n")}
`
      : "";

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
Temps perdu estimé par semaine: ${input.timeLostPerWeek}
Valeur estimée d'un lead ou client: ${input.leadValue}
Fréquence des erreurs ou oublis: ${input.errorFrequency}
Responsable du processus: ${input.processOwner}
Exemple concret de document, email, devis, relance ou reporting: ${input.sampleWorkItem}
Urgence du sujet: ${input.urgency}
Objectifs business: ${input.businessGoals}
Contraintes: ${input.constraints}
${clarificationBlock}

Produis un audit structuré avec:
1. un résumé exécutif;
2. un score de maturité IA sur 100;
3. le détail des 6 sous-scores pondérés avec justification;
4. les manques principaux;
5. les automatisations prioritaires avec preuve, hypothèse, confiance, risque et KPI;
6. le processus recommandé;
7. une roadmap 30 / 60 / 90 jours;
8. les questions à clarifier;
9. les risques et garde-fous;
10. une proposition commerciale indicative avec prix et justification;
11. la meilleure prochaine étape commerciale.
`.trim();
}

const scoreDimensionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    label: { type: "string" },
    score: { type: "number" },
    weight: { type: "number" },
    justification: { type: "string" },
    improvementLever: { type: "string" }
  },
  required: ["label", "score", "weight", "justification", "improvementLever"]
} as const;

const clarificationQuestionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    question: { type: "string" },
    reason: { type: "string" },
    placeholder: { type: "string" }
  },
  required: ["id", "question", "reason", "placeholder"]
} as const;

export const AUDIT_CLARIFICATION_RESPONSE_FORMAT = {
  type: "json_schema",
  name: "vickooze_audit_clarification",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      readyForReport: { type: "boolean" },
      readinessSummary: { type: "string" },
      missingDataPoints: {
        type: "array",
        items: { type: "string" }
      },
      clarifyingQuestions: {
        type: "array",
        items: clarificationQuestionSchema
      }
    },
    required: [
      "readyForReport",
      "readinessSummary",
      "missingDataPoints",
      "clarifyingQuestions"
    ]
  }
} as const;

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
      scoreBreakdown: {
        type: "object",
        additionalProperties: false,
        properties: {
          processClarity: scoreDimensionSchema,
          dataReadiness: scoreDimensionSchema,
          toolStack: scoreDimensionSchema,
          repetitiveVolume: scoreDimensionSchema,
          businessUrgency: scoreDimensionSchema,
          implementationEase: scoreDimensionSchema,
          globalScoreRationale: { type: "string" }
        },
        required: [
          "processClarity",
          "dataReadiness",
          "toolStack",
          "repetitiveVolume",
          "businessUrgency",
          "implementationEase",
          "globalScoreRationale"
        ]
      },
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
            evidence: { type: "string" },
            assumption: { type: "string" },
            confidence: {
              type: "string",
              enum: ["Faible", "Moyenne", "Élevée"]
            },
            risk: { type: "string" },
            kpiToTrack: { type: "string" },
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
            "evidence",
            "assumption",
            "confidence",
            "risk",
            "kpiToTrack",
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
      "scoreBreakdown",
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
