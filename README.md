# Lord Tuna

Boutique landing-page studio.

**We build focused websites.**

Lord Tuna works with businesses, products and launches. The process starts with understanding the business, defining its language and the language of its audience, shaping the offer, writing the story, defining art direction, building, preparing and launching the page.

## Brand direction

**85% Editorial Lord / 15% Corporate Absurdism**

Serious work. Slightly unserious name.

## Product

- Landing pages
- Product / launch pages
- Compact business websites
- Professional sites

Not a fit for:
- Large e-commerce
- Marketplaces
- Customer dashboards
- Complex web apps
- Large corporate websites

## Current homepage rule

The homepage must stay within roughly **5–6 screens** on desktop.

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
