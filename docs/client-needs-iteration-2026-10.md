# Client-needs iteration — October 2026

## What changed

- Reframed the hero around the client outcome: bring a rough idea, receive a published website.
- Made the product boundary explicit: a landing page or compact website, not a complex application.
- Reduced the public Tuna Flow to three client steps while keeping the nine-stage production map available inside a disclosure.
- Clarified the €450 starting price, typical scope, two revision rounds, timing agreement and handover.
- Replaced illustrative portfolio tiles with optimized captures of real project homepages.
- Removed the tuna illustration from the first screen; the character remains a secondary brand detail lower on the page.
- Routed every homepage form to `/api/contact`, added time-based and honeypot spam checks, and made success dependent on a confirmed Resend response.
- Restored the existing GA4 property `G-3T9E1F0K1L` and retained consent-aware interaction events.

## Deployment note

Email receipt cannot be verified end to end until the preview environment has `RESEND_API_KEY` and a verified `CONTACT_FROM`. The handler is covered locally with mocked delivery success and failure responses; a real preview submission is still required before production release.
