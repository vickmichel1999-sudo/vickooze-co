import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { CALENDLY_URL, CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Conditions générales d’utilisation",
  description:
    "Conditions générales d’utilisation du site VICKOOZE & Co, cabinet de conseil IA pour TPE/PME.",
  alternates: {
    canonical: "/cgu"
  }
};

const sections = [
  {
    title: "Objet",
    paragraphs: [
      `Les présentes conditions générales d’utilisation encadrent l’accès et l’utilisation du site ${SITE_NAME}.`,
      "Le site présente les offres de conseil en IA, d’audit, d’implémentation d’agents IA, d’automatisation et de formation proposées par VICKOOZE & Co."
    ]
  },
  {
    title: "Accès au site",
    paragraphs: [
      "Le site est accessible gratuitement à tout utilisateur disposant d’un accès à internet.",
      "VICKOOZE & Co peut suspendre, limiter ou interrompre l’accès au site pour maintenance, mise à jour ou amélioration du service."
    ]
  },
  {
    title: "Prise de rendez-vous",
    paragraphs: [
      `Les boutons de prise de rendez-vous affichent un module Calendly intégré au site. Un lien de secours peut ouvrir Calendly dans un nouvel onglet : ${CALENDLY_URL}.`,
      "L’utilisation de ce service externe est soumise aux conditions et politiques propres à Calendly. Les informations transmises lors de la réservation servent à organiser l’échange demandé."
    ]
  },
  {
    title: "Services présentés",
    paragraphs: [
      "Les descriptions des services sont fournies à titre informatif. Les prestations réellement réalisées, leurs délais, livrables et tarifs sont définis dans une proposition commerciale ou un accord écrit.",
      "VICKOOZE & Co se réserve le droit de faire évoluer ses offres, contenus et modalités d’accompagnement."
    ]
  },
  {
    title: "Comportements interdits",
    bullets: [
      "Utiliser le site à des fins frauduleuses, abusives ou contraires à la loi.",
      "Tenter de perturber le fonctionnement technique du site.",
      "Copier, extraire ou réutiliser les contenus du site sans autorisation.",
      "Usurper l’identité d’un tiers lors d’une demande de contact ou de rendez-vous."
    ]
  },
  {
    title: "Propriété intellectuelle",
    paragraphs: [
      "Les contenus du site restent la propriété de VICKOOZE & Co ou de leurs titulaires respectifs.",
      "Aucune licence d’utilisation n’est accordée à l’utilisateur en dehors de la consultation personnelle du site."
    ]
  },
  {
    title: "Limitation de responsabilité",
    paragraphs: [
      "VICKOOZE & Co ne peut être tenu responsable d’un dommage indirect résultant de l’utilisation du site, d’une indisponibilité temporaire ou d’une mauvaise interprétation des informations publiées.",
      "Les liens externes présents sur le site redirigent vers des services tiers sur lesquels VICKOOZE & Co n’exerce pas de contrôle."
    ]
  },
  {
    title: "Droit applicable",
    paragraphs: [
      "Ces conditions sont soumises au droit français, sous réserve des règles impératives applicables selon la situation juridique exacte de l’entreprise.",
      `Pour toute question, vous pouvez écrire à ${CONTACT_EMAIL}.`
    ]
  }
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Conditions d’utilisation"
      title="CGU"
      intro="Les règles d’utilisation du site VICKOOZE & Co et des contenus mis à disposition des visiteurs."
      updatedAt="19 avril 2026"
      sections={sections}
    />
  );
}
