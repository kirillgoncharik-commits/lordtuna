(() => {
  const GA_ID = document.querySelector('meta[name="ga-measurement-id"]')?.content || '';
  const CONSENT_KEY = 'lt_analytics_consent';
  const ATTRIBUTION_KEY = 'lt_attribution_v1';
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const LEAD_CATEGORIES = new Set([
    'ai_marketing_automation',
    'market_research',
    'b2b_lead_research',
    'hypothesis_validation',
    'reporting_automation',
    'website_development',
    'professional_website'
  ]);

  function pageContext() {
    const path = location.pathname;
    const requestedDirection = new URLSearchParams(location.search).get('intent');
    let problemDirection = 'automation_research';
    if (requestedDirection && LEAD_CATEGORIES.has(requestedDirection)) {
      problemDirection = requestedDirection;
    } else if (path.includes('/professional-websites/')) {
      problemDirection = 'professional_website';
    } else if (path.includes('/landing-page-design/') || path.includes('/event-landing-pages/')) {
      problemDirection = 'website_development';
    }
    return {
      page_path: path,
      page_language: document.documentElement.lang || 'en',
      problem_direction: problemDirection
    };
  }

  function currentTouch() {
    const params = new URLSearchParams(location.search);
    const touch = {
      landing_page: location.pathname,
      referrer: document.referrer || '',
      timestamp: new Date().toISOString()
    };
    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) touch[key] = value.slice(0, 180);
    });
    return touch;
  }

  function readAttribution() {
    try {
      return JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) || 'null') || {};
    } catch (_) {
      return {};
    }
  }

  function persistAttribution() {
    const stored = readAttribution();
    const touch = currentTouch();
    let hasExternalReferrer = false;
    try {
      hasExternalReferrer = Boolean(touch.referrer) && new URL(touch.referrer).origin !== location.origin;
    } catch (_) {
      hasExternalReferrer = false;
    }
    const hasCampaign = UTM_KEYS.some((key) => touch[key]) || hasExternalReferrer;
    const attribution = {
      first: stored.first || touch,
      latest: hasCampaign ? touch : (stored.latest || touch)
    };
    try {
      localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    } catch (_) {
      // Analytics still works when storage is unavailable.
    }
    return attribution;
  }

  function attributionParameters() {
    const attribution = readAttribution();
    return {
      first_touch_source: attribution.first?.utm_source || undefined,
      first_touch_content: attribution.first?.utm_content || undefined,
      first_landing_page: attribution.first?.landing_page || undefined,
      latest_touch_source: attribution.latest?.utm_source || undefined,
      latest_touch_content: attribution.latest?.utm_content || undefined,
      latest_landing_page: attribution.latest?.landing_page || undefined
    };
  }

  function eventParameters(extra = {}) {
    return { ...pageContext(), ...attributionParameters(), ...extra };
  }

  function analyticsEnabled() {
    return window.lordTunaAnalyticsEnabled === true;
  }

  function loadAnalytics() {
    if (!/^G-[A-Z0-9]+$/i.test(GA_ID) || analyticsEnabled()) return;

    persistAttribution();
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('config', GA_ID, { anonymize_ip: true });

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(script);

    window.lordTunaAnalyticsEnabled = true;
  }

  function createConsentBanner() {
    if (!/^G-[A-Z0-9]+$/i.test(GA_ID)) return;
    const existing = localStorage.getItem(CONSENT_KEY);
    if (existing === 'granted') {
      loadAnalytics();
      return;
    }
    if (existing === 'denied') return;

    const language = document.documentElement.lang || 'en';
    const copy = {
      ru: ['Аналитика, не слежка.', 'Используем простую аналитику, чтобы понимать, чем люди действительно пользуются.', 'Нет, спасибо', 'Разрешить'],
      no: ['Analyse, ikke overvåking.', 'Vi bruker enkel analyse for å se hva folk faktisk bruker.', 'Nei takk', 'Tillat analyse'],
      da: ['Analyse, ikke overvågning.', 'Vi bruger enkel analyse til at se, hvad folk faktisk bruger.', 'Nej tak', 'Tillad analyse'],
      es: ['Analítica, no vigilancia.', 'Usamos analítica sencilla para saber qué utiliza realmente la gente.', 'No, gracias', 'Permitir analítica'],
      ja: ['監視ではなく、分析です。', '実際に使われている内容を知るために、シンプルなアクセス解析を利用します。', '許可しない', '分析を許可'],
      tpi: ['Analytics, i no pasin bilong was.', 'Mipela i yusim isi analytics long lukim wanem samting ol manmeri i yusim tru.', 'Nogat tenkyu', 'Larim analytics']
    }[language] || ['Analytics, not surveillance.', 'We use simple analytics to see what people actually use.', 'No thanks', 'Allow analytics'];

    const banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.innerHTML = `
      <div>
        <strong>${copy[0]}</strong>
        <span>${copy[1]}</span>
      </div>
      <div class="consent-actions">
        <button type="button" data-consent="deny">${copy[2]}</button>
        <button type="button" data-consent="allow">${copy[3]}</button>
      </div>`;

    document.body.appendChild(banner);

    banner.addEventListener('click', (event) => {
      const choice = event.target?.dataset?.consent;
      if (!choice) return;
      if (choice === 'allow') {
        localStorage.setItem(CONSENT_KEY, 'granted');
        loadAnalytics();
      } else {
        localStorage.setItem(CONSENT_KEY, 'denied');
      }
      banner.remove();
    });
  }

  document.querySelectorAll('[data-analytics]').forEach((el) => {
    el.addEventListener('click', () => {
      if (analyticsEnabled() && typeof window.gtag === 'function') {
        const eventName = el.dataset.analytics === 'email_click'
          ? 'click_email'
          : el.dataset.analytics === 'telegram_click'
            ? 'click_messenger'
            : el.dataset.analytics;
        window.gtag('event', eventName, eventParameters({
          link_domain: el.hostname || undefined,
          messenger: eventName === 'click_messenger' ? 'telegram' : undefined,
          project: el.dataset.project || undefined
        }));
      }
    });
  });

  document.querySelectorAll('.lang-menu a').forEach((el) => {
    el.addEventListener('click', () => {
      if (analyticsEnabled() && typeof window.gtag === 'function') {
        window.gtag('event', 'language_switch', eventParameters({
          destination: el.getAttribute('href')
        }));
      }
    });
  });

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    const startedAt = form.querySelector('input[name="started_at"]');
    if (startedAt) startedAt.value = String(Date.now());

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.textContent = 'Calling Tuna…';
      const button = form.querySelector('button');
      button.disabled = true;

      try {
        const formData = new FormData(form);
        const context = pageContext();
        const selectedService = String(formData.get('service') || '').trim();
        const messageLength = String(formData.get('message') || '').trim().length;
        const messageDepth = messageLength >= 300 ? 'detailed' : messageLength >= 120 ? 'medium' : 'short';
        formData.set('source_page', context.page_path);
        formData.set('lead_category', LEAD_CATEGORIES.has(selectedService) ? selectedService : context.problem_direction);
        if (analyticsEnabled()) {
          formData.set('attribution', JSON.stringify(readAttribution()));
        }
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.ok !== true) {
          throw new Error(data.message || data.error || 'Request failed');
        }

        form.reset();
        if (startedAt) startedAt.value = String(Date.now());
        status.textContent = status.dataset.success || 'Tuna called. A human will reply. His Lordship has been informed.';
        if (analyticsEnabled() && typeof window.gtag === 'function') {
          const parameters = eventParameters({
            message_depth: messageDepth,
            service_interest: LEAD_CATEGORIES.has(selectedService) ? selectedService : context.problem_direction
          });
          window.gtag('event', 'form_submit', parameters);
          window.gtag('event', 'generate_lead', { ...parameters, lead_source: 'contact_form' });
        }
      } catch (error) {
        status.textContent = status.dataset.error || 'The tuna line is temporarily unavailable. Try email or Telegram.';
      } finally {
        button.disabled = false;
      }
    });
  }

  createConsentBanner();
})();
