import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { CALENDLY_URL, CONTACT_EMAIL, LINKEDIN_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site VICKOOZE & Co : données collectées, finalités, durées de conservation et droits des utilisateurs.",
  alternates: {
    canonical: "/politique-confidentialite"
  }
};

const sections = [
  {
    title: "Responsable du traitement",
    paragraphs: [
      `${SITE_NAME} est responsable des traitements de données personnelles réalisés dans le cadre de ses échanges avec les visiteurs, prospects et clients.`,
      `Contact pour toute demande relative aux données personnelles : ${CONTACT_EMAIL}.`
    ]
  },
  {
    title: "Données susceptibles d’être traitées",
    paragraphs: [
      "Le site ne comporte pas de formulaire natif à ce stade. Certaines données peuvent toutefois être transmises lorsque vous écrivez par email, réservez un appel ou interagissez avec les liens externes."
    ],
    bullets: [
      "Données d’identification : nom, prénom, entreprise, fonction.",
      "Données de contact : adresse email, numéro de téléphone si fourni.",
      "Données liées au rendez-vous : créneau choisi, message, besoin exprimé.",
      "Données techniques de navigation si des outils de mesure d’audience ou de sécurité sont ajoutés ultérieurement."
    ]
  },
  {
    title: "Finalités",
    bullets: [
      "Répondre aux demandes envoyées par email.",
      "Organiser les appels découverte et audits IA.",
      "Préparer une proposition commerciale adaptée aux besoins exprimés.",
      "Assurer le suivi de la relation prospect ou client.",
      "Améliorer la clarté du site et la qualité des contenus proposés."
    ]
  },
  {
    title: "Bases légales",
    paragraphs: [
      "Selon les situations, les traitements reposent sur l’exécution de mesures précontractuelles, l’intérêt légitime de VICKOOZE & Co à répondre aux demandes professionnelles, le consentement lorsque celui-ci est requis, ou le respect d’une obligation légale."
    ]
  },
  {
    title: "Services tiers",
    paragraphs: [
      `La prise de rendez-vous peut être réalisée via Calendly : ${CALENDLY_URL}.`,
      `Le site peut également contenir un lien vers LinkedIn : ${LINKEDIN_URL}.`,
      "Ces services disposent de leurs propres politiques de confidentialité. Nous vous invitons à les consulter avant de leur transmettre des informations."
    ]
  },
  {
    title: "Durées de conservation",
    paragraphs: [
      "Les données sont conservées uniquement pendant la durée nécessaire aux finalités décrites ci-dessus.",
      "À titre indicatif, les données de prospects peuvent être conservées jusqu’à 3 ans après le dernier contact, sauf demande de suppression ou obligation légale contraire."
    ]
  },
  {
    title: "Destinataires",
    paragraphs: [
      "Les données sont destinées à VICKOOZE & Co et, lorsque cela est nécessaire, aux prestataires techniques utilisés pour l’hébergement, la prise de rendez-vous, la messagerie ou la gestion commerciale."
    ]
  },
  {
    title: "Vos droits",
    paragraphs: [
      "Vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou l’opposition au traitement de vos données personnelles dans les conditions prévues par la réglementation applicable.",
      `Pour exercer vos droits, contactez ${CONTACT_EMAIL}. Vous pouvez également introduire une réclamation auprès de la CNIL si vous estimez que vos droits ne sont pas respectés.`
    ]
  },
  {
    title: "Sécurité",
    paragraphs: [
      "VICKOOZE & Co met en œuvre des mesures raisonnables pour protéger les données personnelles contre la perte, l’accès non autorisé, la modification ou la divulgation.",
      "Ces mesures seront ajustées au fur et à mesure de l’évolution du site et des outils utilisés."
    ]
  }
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Données personnelles"
      title="Politique de confidentialité"
      intro="La manière dont VICKOOZE & Co traite les informations transmises par les visiteurs, prospects et clients."
      updatedAt="19 avril 2026"
      sections={sections}
    />
  );
}
