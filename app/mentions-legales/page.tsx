import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, FOUNDER_NAME, SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site VICKOOZE & Co, cabinet de conseil en IA pour PME françaises.",
  alternates: {
    canonical: "/mentions-legales"
  }
};

const sections = [
  {
    title: "Éditeur du site",
    paragraphs: [
      `${SITE_NAME} est un cabinet de conseil en intelligence artificielle qui accompagne les PME françaises dans l’audit IA, l’implémentation d’agents IA et l’automatisation de leurs processus internes.`,
      `Directeur de la publication : ${FOUNDER_NAME}.`,
      `Site internet : ${SITE_URL}. Contact : ${CONTACT_EMAIL}.`
    ]
  },
  {
    title: "Informations administratives à compléter",
    paragraphs: [
      "Les informations ci-dessous doivent être remplacées par les données exactes de l’entreprise avant publication."
    ],
    bullets: [
      "Dénomination sociale : VICKOOZE & Co.",
      "Forme juridique : à compléter.",
      "Adresse du siège social : à compléter.",
      "Numéro SIREN ou RCS : à compléter.",
      "Numéro de TVA intracommunautaire : à compléter si applicable.",
      "Capital social : à compléter si applicable."
    ]
  },
  {
    title: "Hébergement",
    paragraphs: [
      "Le site est prévu pour être déployé sur Vercel. Les coordonnées exactes de l’hébergeur doivent être confirmées au moment du déploiement final.",
      "Hébergeur : à compléter selon la plateforme effectivement utilisée en production."
    ]
  },
  {
    title: "Propriété intellectuelle",
    paragraphs: [
      "L’ensemble des contenus présents sur ce site, incluant les textes, visuels, éléments graphiques, logos, structures de pages et composants, est protégé par le droit de la propriété intellectuelle.",
      "Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation écrite préalable de VICKOOZE & Co, est interdite."
    ]
  },
  {
    title: "Responsabilité",
    paragraphs: [
      "VICKOOZE & Co s’efforce de fournir des informations exactes et à jour. Toutefois, le site peut contenir des erreurs, omissions ou informations devenues obsolètes.",
      "Les informations publiées sur le site ont une vocation informative et ne constituent pas un engagement contractuel sans validation écrite dans une proposition commerciale."
    ]
  },
  {
    title: "Contact",
    paragraphs: [
      `Pour toute question relative au site ou à ces mentions légales, vous pouvez écrire à ${CONTACT_EMAIL}.`
    ]
  }
];

export default function LegalNoticePage() {
  return (
    <LegalPage
      eyebrow="Légal"
      title="Mentions légales"
      intro="Les informations essentielles concernant l’éditeur, l’hébergement et les droits liés au site VICKOOZE & Co."
      updatedAt="19 avril 2026"
      sections={sections}
    />
  );
}
