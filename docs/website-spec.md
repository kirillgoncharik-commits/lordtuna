# Lord Tuna v2 — Website Spec

## 1. Positioning

### Core proposition
**We build focused websites.**

Landing pages for businesses, products and launches.

We understand the business first. We define its language and the language of its audience. Then we shape the offer, write the story, design the page and ship it.

### Brand lines
- Small websites. Serious business.
- Serious work. Slightly unserious name.
- We don't specialize in industries. We specialize in figuring out what you're selling — and how your audience talks about it.
- The expensive part isn't the code.

## 2. Art direction

**85% Editorial Lord / 15% Corporate Absurdism**

Rules:
1. The joke is never the product.
2. One weird thing at a time.
3. When visuals are funny, copy stays serious.
4. When copy is funny, layout stays serious.
5. Lord Tuna never acts excited.

Visual system:
- Paper: #F2EEE6
- Ink: #161616
- Muted: #68645E
- Tuna Red: #A74235
- Display: Newsreader
- UI/body: IBM Plex Sans
- Labels: IBM Plex Mono

No ocean aesthetic, no nautical motifs, no cartoon fish.

## 3. Homepage constraint

Homepage must fit in approximately **5–6 viewport screens** on desktop.

If the homepage needs more than six screens to explain the offer, the offer is not clear enough.

## 4. Homepage structure

### Screen 1 — Hero

**We build focused websites.**

Landing pages for businesses, products and launches.

We understand the business first. We define its language and the language of its audience. Then we shape the offer, write the story, design the page and ship it.

Primary CTA: **Start a project →**
Secondary CTA: **See our work ↓**

Micro:
- SMALL WEBSITES / SERIOUS BUSINESS
- Serious work. Slightly unserious name.

No tuna illustration in hero.

### Screen 2 — Selected work

Four project cards:
1. Kujo Video — AI video / Entertainment
2. merch.mt — B2B / Event merchandise
3. Goncharik Pro — Consulting / Personal brand
4. Petruseva.com — Psychology / Professional services

Statement:
**We don't specialize in industries. We specialize in figuring out what you're selling — and how your audience talks about it.**

### Screen 3 — What we do

**One business. One offer. One good page.**

Three product groups:
- Landing pages
- Compact business websites
- Launch pages

Compact Tuna moment:
**Lord Tuna believes most websites are too complicated.**
We tend to agree.

### Screen 4 — Tuna Flow

**We start with the business. Not with the website.**

1. UNDERSTAND — Business breakdown
2. DEFINE — Business & audience language
3. POSITION — Offer & positioning
4. STRUCTURE — Wireframe
5. WRITE — Copy
6. DIRECT — Art direction
7. BUILD — Design & development
8. PREPARE — SEO, analytics & QA
9. LAUNCH — Production

Micro:
*No 74-page discovery deck is produced during this process.*

### Screen 5 — Price + scope

**From €450.**

Typical project: **€450–750**, depending on thinking, writing and design effort.

Usually included:
- Business breakdown
- Business & audience language
- Positioning
- Page structure
- Copywriting
- Art direction
- Responsive design
- Development
- Technical SEO basics
- Analytics setup
- Domain & launch
- Two revision rounds

**We like**
Landing pages / product pages / service businesses / professional sites / campaign pages / launches / experiments.

**Not really**
Large e-commerce / marketplaces / dashboards / complex web apps / huge corporate websites / CMS architectures from hell / projects with seventeen decision makers.

Value line:
**The expensive part isn't the code.**

### Screen 6 — Call Tuna

Heading:
**CALL TUNA**

**Have a business. Need a page?**

A messy idea is enough to start.

Form fields:
- Name
- Email / Telegram
- What are you building?

Submit:
**Call Tuna →**

Alternatives:
- Email: kirill.goncharik@gmail.com
- Telegram: @thelordtuna

Success state:
**Tuna called.**
Your message is on its way.
*A human will reply. His Lordship has been informed.*

Footer language line:
English · Русский · Norsk · Español · 日本語 · Tok Pisin

Language legend:
**Why these languages? Because tuna travels.**

Micro:
*Languages selected using a highly scientific tuna-based methodology.*

Footer:
- Small websites. Serious business.
- © 2026 Lord Tuna
- No tuna were consulted in the making of this website.

## 5. Language routes

- / — English
- /ru/ — Russian
- /no/ — Norwegian
- /es/ — Spanish
- /ja/ — Japanese
- /tpi/ — Tok Pisin

Requirements:
- localized title and meta description
- canonical per locale
- hreflang across all locale equivalents
- x-default points to English
- do not machine-translate blindly; localize tone while preserving dry humor

## 6. Contact form

The short “Call Tuna” form must deliver messages to:

**kirill.goncharik@gmail.com**

Telegram shortcut:
**@thelordtuna**

Spam protection should be lightweight and invisible where possible.

## 7. Analytics

Critical migration rule:
- **reuse the current production Google Analytics property / measurement ID**
- do not create a fresh property unless explicitly requested
- add conversion events for:
  - call_tuna_submit
  - telegram_click
  - email_click
  - project_view
  - language_switch

Current GA ID is still to be recovered from the legacy production code before production launch.

## 8. SEO baseline

- sitemap.xml
- robots.txt
- canonical
- hreflang
- Open Graph
- Twitter cards
- Organization / ProfessionalService structured data where appropriate
- project/case-study structured content
- fast page load
- mobile-first
- descriptive headings
- no keyword stuffing

## 9. Portfolio case routes

Recommended:
- /work/kujo-video/
- /work/merch-mt/
- /work/goncharik-pro/
- /work/petruseva/

Each case should explain:
Business → Question → Language → Positioning → Structure → Work → Result.

## 10. Non-goals

Do not turn Lord Tuna into:
- a full-service agency
- a large-site development shop
- an e-commerce studio
- a generic “digital transformation” brand
- a joke-first fish website
