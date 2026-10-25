# Lord Tuna

Practical AI automation and commercial research for small B2B teams.

**AI automation for marketing, research and business hypothesis validation.**

Lord Tuna implements focused workflows for marketing operations, market and competitor research, B2B opportunity research, hypothesis validation and recurring reporting. Every project begins with a concrete task, agreed sources, explicit human review and a documented handover.

## Brand direction

**85% Editorial Lord / 15% Corporate Absurdism**

Serious work. Slightly unserious name.

## Services

- AI marketing automation
- AI-assisted market and competitor research
- B2B lead and opportunity research automation
- AI-assisted business hypothesis validation
- Marketing reporting automation
- Compact landing pages and business websites, especially for hypothesis tests

Not a fit for:
- Voice bots, HR automation or accounting automation
- Complex CRM transformations
- Fully autonomous decision-making or unsupervised public communication
- Guaranteed lead, sales or ranking promises

## Current homepage rule

The homepage keeps the existing six-part editorial composition: offer, work, services, process, scope/FAQ and contact.

## Languages

- English
- Русский
- Norsk
- Dansk
- Español
- 日本語
- Tok Pisin

> Why these languages? Because tuna travels.

## Contact

- Email: kirill.goncharik@gmail.com
- Telegram: @thelordtuna

## Analytics

The legacy production Google Analytics property was recovered and is reused unchanged:

- Measurement ID: `G-3T9E1F0K1L`
- Analytics loads only after consent.
- Tracked interactions: project views, language switches, email, Telegram and confirmed contact-form delivery.

## Contact delivery

The public form posts to `/api/contact`. The Pages Function sends through Resend and reports success only after Resend accepts the email.

Required production or preview environment variables:

- `RESEND_API_KEY`
- `CONTACT_FROM` — a verified Resend sender
- `CONTACT_TO` — optional; defaults to `kirill.goncharik@gmail.com`
