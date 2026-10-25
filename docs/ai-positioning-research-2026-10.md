# AI positioning and search-intent research — 2026-10-25

## Data availability

- The connected Search Console tool was checked before editing, but the account returned `payment_required` because the GSC Wizard trial or subscription is inactive. Lord Tuna query and page data could not be retrieved in this iteration.
- Live search results and commercial service pages were reviewed in English and Russian.
- No keyword-volume source was available. This document makes no frequency claims and does not label any term as high-volume.
- Because first-party query data is unavailable, this release uses the existing localized homepages to test the new offer. It does not create five near-duplicate service pages.

## Intent split

Commercial intent is indicated by pages that offer scoping, implementation, delivery, a report, a sprint or a consultation. Informational/tool intent is indicated by queries about definitions, courses, prompts, software comparisons or DIY setup.

| Direction | Commercial cluster used | Informational/tool queries kept out of the commercial copy |
|---|---|---|
| Marketing automation | AI marketing automation services; AI marketing automation agency; ИИ-автоматизация маркетинга | what is AI marketing automation; AI marketing tools; AI marketing course; как настроить автоматизацию маркетинга |
| Market and competitor research | market research services; competitor research service; AI-assisted market research; анализ рынка и конкурентов | market research tools; competitor-analysis template; market research course; как провести анализ конкурентов |
| B2B opportunity research | B2B lead research services; B2B opportunity research; automated lead research; автоматизация поиска B2B-лидов | lead database; lead-generation software; scraping tutorial; как искать лиды самостоятельно |
| Hypothesis validation | business idea validation services; idea validation sprint; landing-page validation test; проверка бизнес-гипотезы | business idea validator tool; validation framework; startup course; как проверить идею бесплатно |
| Reporting automation | marketing reporting automation; automated marketing reports; marketing dashboard automation; автоматизация маркетинговой отчётности | reporting templates; dashboard software; Looker Studio tutorial; как сделать отчёт |

## Final naming and page ownership

| Service | Final name (EN / RU) | Primary search cluster | Target page in this release | Basis for choice |
|---|---|---|---|---|
| Marketing automation | **AI marketing automation** / **AI-автоматизация маркетинга** | AI marketing automation services / ИИ-автоматизация маркетинга | `/` and `/ru/`, service 01 | Exact commercial wording appears on implementation and agency pages. The visible copy narrows it to enquiry handling, notifications, drafts and reports, avoiding an “AI for everything” promise. |
| Market research | **AI-assisted market & competitor research** / **AI-ресёрч рынка и конкурентов** | market research services + competitor research service / анализ рынка и конкурентов | `/` and `/ru/`, service 02 | “AI market research services” is ambiguous: some results sell research about the AI industry. Adding “assisted” and “market & competitor” describes the buyer outcome and separates the service from AI-industry reports. |
| B2B opportunity research | **B2B lead & opportunity research automation** / **Автоматизация поиска B2B-лидов и запросов** | B2B lead research services + B2B opportunity research / поиск B2B-лидов | `/` and `/ru/`, service 03 | Commercial pages use both “lead research” and “opportunity research.” “Opportunity” covers published commercial requests and buying signals without promising meetings or automated sales. |
| Hypothesis validation | **AI-assisted business hypothesis validation** / **Проверка бизнес-гипотез с AI** | business idea validation services + landing-page validation test / проверка бизнес-гипотезы | `/` and `/ru/`, service 04 | Commercial intent is clear around validation sprints and test landing pages. “Hypothesis” fits established Russian commercial wording; “business idea validation” is the more natural English discovery phrase. |
| Reporting | **Marketing reporting automation** / **Автоматизация маркетинговой отчётности** | marketing reporting automation + automated marketing reports / автоматизация маркетинговой отчётности | `/` and `/ru/`, service 05 | The exact English phrase returns dedicated service pages. The scope explicitly separates deterministic metrics from AI commentary and human interpretation. |

## Competitive-page observations

- [Makeitfuture — AI marketing automation](https://www.makeitfuture.com/services/ai-marketing-automation) uses the exact service phrase and describes workflow mapping, human approvals, integrations and reporting.
- [Supasaito — marketing reporting automation](https://supasaito.com/en/solutions/marketing-reporting-automation/) frames reporting as connected sources, defined calculations, labelled AI commentary and agreed scope.
- [DemandNexus — B2B lead research](https://www.demandnexus.io/lead-research-services/) and [Radavia — B2B opportunity research](https://radavia.com/) support the distinction between sourced research and guaranteed sales activity.
- [Actyte — idea validation](https://actyte.com/idea-validation/) and [Langdon Digital — validation tests](https://langdondigital.com/validation-tests/) show commercial intent around competitor research, a test landing page, measurement and a decision report.
- [Divitio — ИИ-автоматизация маркетинга](https://divitio.ru/ai-avtomatizaciya/) confirms the Russian commercial phrase, while [NAVIBIZ — проверка бизнес-гипотезы](https://navibiz.ru/uslugi/analiz-rynka-i-konkurentov/proverka-biznes-gipotezy/) uses established Russian service wording for evidence-led hypothesis testing.
- [Myrado — лидогенерация B2B с AI](https://myradostudio.com/ru/ai-lead-generation/) shows Russian commercial demand around lead-search workflows, but Lord Tuna uses the narrower “поиск лидов и запросов” wording to avoid promising autonomous outreach or sales.

## Next evidence checkpoint

After Search Console access is restored and the new proposition has accumulated settled data, review query-to-page fit by language. Create a dedicated service page only when one cluster shows distinct commercial impressions and the homepage cannot answer the intent without becoming overloaded. Keep one canonical owner per cluster.
