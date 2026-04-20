# VICKOOZE & Co

Site professionnel Next.js 14 pour le cabinet de conseil IA VICKOOZE & Co.

## Stack

- Next.js 14 avec App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Composants shadcn/ui locaux

## Lancer en local

```bash
npm install
npm run dev
```

Le site sera disponible sur `http://localhost:3000`.

## Activer l’agent d’audit IA

Crée un fichier `.env.local` à la racine du projet:

```bash
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4.1-mini"
```

L’agent est disponible sur `http://localhost:3000/agent-audit`.
La clé OpenAI est utilisée uniquement côté serveur dans `app/api/audit-agent/route.ts`.

Sur Vercel, ajoute les mêmes variables dans Project Settings → Environment Variables.

## Scripts utiles

```bash
npm run lint
npm run build
npm run start
```

## Déployer sur Vercel

1. Importer le dépôt dans Vercel.
2. Vérifier que le framework détecté est `Next.js`.
3. Laisser la commande de build par défaut: `npm run build`.
4. Déployer.

Le site contient déjà les fichiers SEO App Router:

- `app/layout.tsx` pour les metadata globales et Open Graph
- `app/sitemap.ts` pour `/sitemap.xml`
- `app/robots.ts` pour `/robots.txt`

## Modifier les placeholders

Les constantes principales sont dans `lib/constants.ts`:

```ts
export const CALENDLY_URL = "https://calendly.com/vickmichel1999/30min";
export const CONTACT_EMAIL = "contact@vickooze.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/vick-emmanuel-michel-1b66a2176/";
```

Valeurs actuellement configurées:

- Calendly: `https://calendly.com/vickmichel1999/30min`
- LinkedIn: `https://www.linkedin.com/in/vick-emmanuel-michel-1b66a2176/`

Les images placeholder sont dans `public/`:

- `public/founder-placeholder.svg`
- `public/founder-vick-emmanuel.jpg`
- `public/ai-dashboard-placeholder.svg`
- `public/og-image.svg`

Pour remplacer la photo du fondateur, ajoutez votre image dans `public/`, puis mettez à jour `PLACEHOLDER_IMAGES.founder` dans `lib/constants.ts`.

## Contenu à personnaliser

- Témoignages clients dans `app/page.tsx`
- Story fondateur dans `app/a-propos/page.tsx`
- Domaine final dans `SITE_URL` dans `lib/constants.ts`
- Liens légaux dans `components/Footer.tsx`

## Structure

```text
app/
  page.tsx
  a-propos/page.tsx
  agent-audit/page.tsx
  api/audit-agent/route.ts
  audit/page.tsx
  services/page.tsx
  formation/page.tsx
components/
  Header.tsx
  Footer.tsx
  Hero.tsx
  StatsBar.tsx
  ServiceCard.tsx
  Testimonial.tsx
  ProcessStep.tsx
  FinalCTA.tsx
  ui/
lib/
  constants.ts
  utils.ts
public/
```
