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

ANTHROPIC_API_KEY="sk-ant-..."
ANTHROPIC_MODEL="claude-sonnet-4-20250514"

RESEND_API_KEY="re_..."
RESEND_FROM="VICKOOZE & Co <onboarding@resend.dev>"
NOTIFICATION_EMAIL="Vicolango@gmail.com"
```

L’agent est disponible sur `http://localhost:3000/agent-audit`.
Les clés OpenAI, Anthropic et Resend sont utilisées uniquement côté serveur dans `app/api/audit-agent/route.ts`.

OpenAI génère le JSON du rapport en priorité. Si OpenAI échoue (crédit insuffisant, quota, timeout ou modèle indisponible), la route bascule automatiquement sur Anthropic. Le code du site transforme ensuite ce rapport en aperçu, PDF, Excel et email.

Sur Vercel, ajoute les mêmes variables dans Project Settings → Environment Variables, coche `Production`, `Preview` et `Development`, puis redéploie le site pour que les nouvelles clés soient prises en compte.

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
