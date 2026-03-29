# WIAL MVP Platform

Project built for the **Women in Computer Science x Opportunity Hack: Spring 2026 Hackathon** at **Arizona State University, Tempe**.

This project rethinks the WIAL web experience as a modern, chapter-aware platform: one shared public site, reusable chapter microsites, a searchable coach directory, and an admin workspace for provisioning and managing chapter experiences without creating a new codebase for every region.

## Hackathon

**Event:** Women in Computer Science x Opportunity Hack: Spring 2026 Hackathon  
**Theme:** Build technical solutions for nonprofit organizations and create technology that does good  
**Hackathon page:** https://www.ohack.dev/hack/2026_spring_wics_asu  
**Live project:** https://21-not-so-cool.vercel.app/  
**DevPost:** https://wics-ohack-sp26-hackathon.devpost.com/  
**Team Slack:** https://opportunity-hack.slack.com/app_redirect?channel=team-21-not-so-cool

## Team

**Team Name:** Not So Cool

- Sai Amulya Pingili
- Niharika Ravilla
- Dyuti Mengji

## Problem We Chose To Solve

WIAL has a global brand, regional chapters, coaches, certification pathways, and chapter-specific outreach needs, but those experiences should not require a brand-new website or engineering workflow every time a chapter launches.

We built an MVP that gives WIAL:

- a cleaner public-facing website
- reusable chapter microsites under a shared template
- a searchable coach discovery experience
- an admin workflow for chapter provisioning and access management
- a foundation for future payments, CMS-managed content, and smarter search

## What We Implemented

### Public website

- Branded landing page for WIAL with clearer messaging around Action Learning
- Dedicated marketing pages for:
  - `/about`
  - `/action-learning`
  - `/action-learning/benefits`
  - `/certification`
  - `/our-services`
  - `/contact`
  - `/newsletter`
- Shared layout with reusable header/footer and responsive styling

### Chapter microsite system

- Dynamic chapter routes powered by a shared template
- Working chapter pages at:
  - `/:chapter`
  - `/:chapter/about`
  - `/:chapter/contact`
- Chapter data can come from:
  - Supabase `chapters` records when configured
  - local fallback seed data when Supabase is not configured
- Existing seeded/fallback examples include chapters such as USA, Nigeria, Philippines, Brazil, and Canada depending on data source

### Coach discovery

- Searchable coach directory page
- Filtering by:
  - name / free text
  - chapter
  - certification level
- Coach detail page at `/coaches/[id]`
- Seed-data fallback so the experience still works in demo mode

### Admin workspace

- Auth-protected admin area under `/admin`
- Supabase-auth-based login flow
- Allowlisted admin authorization via `chapter_admins`
- Global admin view for:
  - provisioning new chapter sites
  - managing access records
  - reviewing active chapter routes
- Chapter lead experience with one-click chapter provisioning when pre-approved
- Live chapter content editing for chapter summary/about/contact content

### Backend and integration work

- App Router API routes for chapter provisioning and admin management
- Stripe checkout + webhook flow for enrollment/certification payments
- Sanity Studio route for future CMS-driven content editing
- Jina embedding endpoint scaffold for future semantic coach search
- Supabase SQL schema, seed data, and RLS files included in the repo

## Highlight Features

- **Reusable chapter architecture:** new chapter routes can be launched from shared templates instead of shipping a new site per region.
- **Provisioning workflow:** admins can create chapter records that immediately become public routes.
- **Role-aware admin access:** separates global admins from chapter leads and supports pre-approved one-click provisioning.
- **Coach directory with fallback data:** the app remains demoable even without a live database connection.
- **Extensible backend foundation:** Stripe, Sanity, embeddings, and Supabase schema are already started for future expansion.

## Route Architecture

### Public routes

| Route | Purpose |
| --- | --- |
| `/` | Main WIAL landing page |
| `/about` | High-level WIAL overview |
| `/action-learning` | Action Learning overview |
| `/action-learning/benefits` | Benefits-focused explainer page |
| `/certification` | Certification pathway overview |
| `/our-services` | WIAL services page |
| `/contact` | Main WIAL contact page |
| `/newsletter` | Newsletter signup UI |
| `/directory` | Seed-based coach directory experience |
| `/coaches` | Searchable coach directory driven by `/api/search` |
| `/coaches/[id]` | Individual coach profile page |
| `/payment/success` | Stripe payment confirmation page |

### Dynamic chapter routes

| Route | Purpose |
| --- | --- |
| `/:chapter` | Chapter landing page |
| `/:chapter/about` | Chapter-specific about page |
| `/:chapter/contact` | Chapter-specific contact page |

### Admin routes

| Route | Purpose |
| --- | --- |
| `/admin/login` | Admin authentication |
| `/admin` | Chapter provisioning and content editing dashboard |
| `/admin/access` | Global-admin access management workspace |
| `/admin/unauthorized` | Signed-in but not allowlisted |

### CMS route

| Route | Purpose |
| --- | --- |
| `/studio` | Embedded Sanity Studio |

### API routes

| Route | Purpose |
| --- | --- |
| `/api/search` | Coach search/filter endpoint |
| `/api/forms/submit` | Form submission demo endpoint |
| `/api/embed` | Jina embedding generation endpoint |
| `/api/stripe/checkout` | Creates Stripe checkout sessions |
| `/api/stripe/webhook` | Handles Stripe payment updates |
| `/api/admin/chapters` | Creates new chapter records |
| `/api/admin/chapters/[slug]` | Updates chapter content |
| `/api/admin/chapters/one-click` | Chapter-lead one-click provisioning |
| `/api/admin/chapter-admins` | Create admin/access records |
| `/api/admin/chapter-admins/[id]` | Update admin/access records |

## Technical Architecture

### Frontend

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Component-based UI under `src/components`

### Backend and data

- Supabase for authentication and relational data
- Supabase SQL files for schema + seeds in `supabase/`
- Stripe for payment checkout and webhook handling
- Sanity Studio for CMS extensibility
- OpenAI client helper included for future AI-enabled workflows
- Jina embeddings endpoint prepared for semantic search experiments

### Project structure

```text
src/
  app/                  Next.js App Router pages and API routes
  components/           UI components for marketing, admin, coaches, layout
  lib/                  Supabase, auth, chapter, Stripe, and helper logic
  sanity/               Sanity client and schema definitions
supabase/
  schema.sql            Core database schema
  seed.sql              Seed data for chapters, admins, and coaches
  rls.sql               Row-level security policies
studio/                 Sanity studio package files
```

## Data Model

The Supabase schema currently centers around four core tables:

- `chapters`
  Stores the public chapter microsite content and routing metadata.
- `chapter_admins`
  Stores allowlisted admins/chapter leads plus optional pre-approved provisioning profiles.
- `coaches`
  Stores coach profiles, certifications, locations, and embedding vectors.
- `payments`
  Stores Stripe-backed payment records and statuses.

This gives the project a clean path from public marketing site -> chapter microsite -> coach discovery -> authenticated admin operations.

## What Works Right Now vs. What Is Scaffolded

### Working in the current repo

- public marketing pages
- responsive site layout
- dynamic chapter routing
- chapter fallback data
- searchable coach directory using seed data
- auth-gated admin route flow
- admin provisioning/content management UI
- Supabase schema and seed setup

### Implemented but requires environment configuration

- live Supabase-backed chapter/content/admin workflows
- Stripe payments
- Sanity Studio content management
- coach detail pages backed by Supabase rows
- embedding generation via Jina API

### Present but still early-stage / extendable

- semantic search using stored vector embeddings
- newsletter submission integration
- richer form handling beyond the demo submit endpoint
- broader CMS-driven content usage on public pages

## How To Reproduce This Project

### 1. Clone and install

```bash
git clone https://github.com/2026-ASU-WiCS-Opportunity-Hack/21-not-so-cool.git
cd 21-not-so-cool
npm install
```

### 2. Create environment variables

Create a `.env.local` file in the project root.

Minimum variables for the base Next.js app:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
# or use NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY instead
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Optional integrations:

```bash
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
OPENAI_API_KEY=
JINA_EMBEDDING_TOKEN=
```

### 3. Set up Supabase

In your Supabase SQL editor, run the files in this order:

1. `supabase/schema.sql`
2. `supabase/seed.sql`
3. `supabase/rls.sql`

This creates the base tables and seeds example chapter/admin/coach data used by the app.

### 4. Start the app

```bash
npm run dev
```

Open `http://localhost:3000`.

### 5. Explore the main flows

- Visit `/` for the public site
- Visit `/coaches` for coach search
- Visit `/usa` or another seeded chapter slug for dynamic chapter pages
- Visit `/admin/login` for the admin flow
- Visit `/studio` if Sanity environment variables are configured

### 6. Test admin access

The app expects admins to be allowlisted in the `chapter_admins` table.

Seed data already includes example records such as:

- `admin@wial.org` as a global admin
- `canada.lead@wial.org` as a chapter lead
- `kenya.lead@wial.org` as a pre-approved one-click provisioning lead

If an email is allowlisted, that user can use the Create Account flow on `/admin/login` to bootstrap a Supabase auth user and then sign in.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Future Scope

- Replace fallback/seed-driven coach search with live Supabase + semantic vector search
- Connect newsletter signup to a real provider such as Constant Contact
- Make Sanity the primary content source for marketing pages
- Add richer chapter branding controls, media uploads, and localized content blocks
- Expand payments into a full certification/eLearning workflow
- Add analytics, audit logs, and stronger admin activity tracking
- Support subdomain-based chapter launches in addition to subdirectory routing
- Add production-ready test coverage and deployment documentation

## Why This Project Matters

This MVP is not just a redesign. It proposes a scalable operating model for a nonprofit/global-network website:

- one codebase
- one brand system
- many chapters
- fewer manual site updates
- a better path for coaches, chapter leads, and future growth

That makes it a strong fit for a hackathon focused on practical, mission-driven technology for organizations doing meaningful work.
