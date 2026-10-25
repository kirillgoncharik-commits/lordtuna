# Lord Tuna — Website Spec

## 1. Positioning

### Core proposition

**AI automation for marketing, research and business hypothesis validation.**

Lord Tuna implements focused AI workflows for small B2B companies, agencies, studios and expert businesses. The work connects AI to a concrete business task: finding and assessing commercial opportunities, researching markets and competitors, preparing test landing pages, or producing recurring marketing reports.

Guardrails:

- no autonomous-business claims;
- no guaranteed leads, sales, rankings or commercial outcomes;
- human review and decision ownership remain explicit;
- new scenarios are examples until verified client results exist.

Russian is the primary commercial language. Every existing localization remains available and conveys the same offer in natural local wording.

## 2. Services

1. **AI marketing automation** — enquiry processing, routing, notifications, reply drafts and recurring summaries. Workflow and integrations are defined before implementation.
2. **AI-assisted market and competitor research** — structured evidence about markets, competitors, offers and pricing, with sources and decision-ready conclusions.
3. **B2B lead and opportunity research automation** — monitoring agreed sources, deduplication, qualification and a personalized first-message draft for human review.
4. **AI-assisted business hypothesis validation** — audience and competitor research, offer formulation, a compact test landing page and response measurement.
5. **Marketing reporting automation** — data collection, recurring summaries, anomaly notifications and a prioritized action list.

Compact landing pages and business websites remain a secondary service, particularly when a hypothesis needs a real test page. Positioning, copy, responsive development, technical SEO preparation and analytics may be included.

Excluded from the offer: voice bots, HR automation, accounting, complex CRM transformations and unrelated automation categories.

## 3. Art direction

**85% Editorial Lord / 15% Corporate Absurdism**

Rules:

1. Preserve the existing paper, ink, muted and Tuna Red palette.
2. Preserve Newsreader, IBM Plex Sans and IBM Plex Mono.
3. Keep the existing logo, tuna engraving, components and editorial composition.
4. The joke is never the product.
5. One weird thing at a time.
6. Do not introduce a new visual concept or generic AI imagery.

## 4. Homepage structure

The homepage remains within roughly six editorial sections on desktop.

1. **Hero** — AI automation for marketing, research and hypothesis testing; primary CTA asks to discuss a specific task.
2. **Selected work** — existing sites shown only as positioning, copy, design and launch cases.
3. **Services** — five AI/research directions plus a secondary link to compact websites and landing pages.
4. **Process** — task → agreed scenario → implementation → verification → handover/support.
5. **Scope and FAQ** — estimate after scoping, required access, third-party costs, handover, support and no outcome guarantees.
6. **Contact** — service selector, contact details and a task-oriented message prompt.

## 5. Portfolio policy

Preserve all existing portfolio routes and project cards. Do not present website projects as proof of automation, AI implementation or sales growth unless a verified result is added later. Clearly label unimplemented automation scenarios as examples.

## 6. Pricing and scope

Do not show the earlier website price as a price for automation. New work is estimated after the task, data sources, integrations, approval rules and support requirements are understood.

Third-party data, AI models, automation platforms, research panels, advertising and ongoing support are approved and priced separately.

## 7. Languages

- `/` — English
- `/ru/` — Russian
- `/no/` — Norwegian
- `/da/` — Danish
- `/es/` — Spanish
- `/ja/` — Japanese
- `/tpi/` — Tok Pisin

Requirements:

- localized title, description, Open Graph text and page copy;
- canonical per locale;
- reciprocal hreflang across locale equivalents;
- `x-default` points to English;
- form and analytics-consent text are localized;
- natural terminology rather than literal translation.

## 8. Contact and analytics

The contact form posts to `/api/contact` and sends through the existing Resend integration.

- Preserve measurement ID `G-3T9E1F0K1L`.
- Preserve consent-gated analytics.
- Preserve project views, language switches, email, Telegram and confirmed form-submission events.
- Record the selected service as a lead category and analytics parameter without sending form contents to analytics.

## 9. SEO baseline

- retain current useful URLs and service/case pages;
- retain sitemap, robots, canonical and hreflang structure;
- use a distinct search-intent cluster for each primary service;
- avoid adding near-duplicate keyword pages without evidence;
- keep technical SEO and analytics inside relevant landing-page work;
- keep Google Ads and Meta as possible test inputs, not standalone primary services;
- structured data must match visible content and make no unverified claims.

## 10. Quality checks

- one H1 per indexable page;
- unique title and canonical;
- valid JSON-LD;
- every local href/src target exists;
- every canonical appears in the sitemap;
- no horizontal overflow at small mobile and desktop widths;
- contact categories accepted by the delivery endpoint;
- JavaScript syntax, contact tests and repository validation pass.
