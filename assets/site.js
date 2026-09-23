(() => {
  const GA_ID = document.querySelector('meta[name="ga-measurement-id"]')?.content || '';
  const CONSENT_KEY = 'lt_analytics_consent';

  function analyticsEnabled() {
    return window.lordTunaAnalyticsEnabled === true;
  }

  function setupHeroTuna() {
    const tuna = document.querySelector('[data-hero-tuna]');
    if (!tuna) return;

    const minimumVisibleMs = 2000;
    const scrollThresholdPx = 24;
    const startedAt = performance.now();
    let lastScrollY = window.scrollY;
    let totalScrollDistance = 0;
    let dismissalScheduled = false;
    let dismissed = false;

    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      tuna.classList.add('is-leaving');
      window.removeEventListener('scroll', onScroll);
      window.setTimeout(() => tuna.classList.add('is-hidden'), 420);
    }

    function scheduleDismissal() {
      if (dismissalScheduled || dismissed) return;
      dismissalScheduled = true;
      const remaining = minimumVisibleMs - (performance.now() - startedAt);
      if (remaining <= 0) {
        dismiss();
      } else {
        window.setTimeout(dismiss, remaining);
      }
    }

    function onScroll() {
      const currentScrollY = window.scrollY;
      totalScrollDistance += Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      if (totalScrollDistance < scrollThresholdPx) return;
      window.removeEventListener('scroll', onScroll);
      scheduleDismissal();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function loadAnalytics() {
    if (!/^G-[A-Z0-9]+$/i.test(GA_ID) || analyticsEnabled()) return;

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

    const banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.innerHTML = `
      <div>
        <strong>Analytics, not surveillance.</strong>
        <span>We use simple analytics to see what people actually use.</span>
      </div>
      <div class="consent-actions">
        <button type="button" data-consent="deny">No thanks</button>
        <button type="button" data-consent="allow">Allow analytics</button>
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
        window.gtag('event', el.dataset.analytics, {
          link_url: el.href,
          project: el.dataset.project || undefined,
          page_path: location.pathname
        });
      }
    });
  });

  document.querySelectorAll('.lang-menu a').forEach((el) => {
    el.addEventListener('click', () => {
      if (analyticsEnabled() && typeof window.gtag === 'function') {
        window.gtag('event', 'language_switch', {
          destination: el.getAttribute('href'),
          page_path: location.pathname
        });
      }
    });
  });

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.textContent = 'Calling Tuna…';
      const button = form.querySelector('button');
      button.disabled = true;

      try {
        const formData = new FormData(form);
        if (formData.get('_honey')) {
          form.reset();
          status.textContent = status.dataset.success || 'Tuna called. A human will reply. His Lordship has been informed.';
          return;
        }

        const payload = Object.fromEntries(formData.entries());
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.success === 'false' || data.success === false) {
          throw new Error(data.message || data.error || 'Request failed');
        }

        form.reset();
        status.textContent = status.dataset.success || 'Tuna called. A human will reply. His Lordship has been informed.';
        if (analyticsEnabled() && typeof window.gtag === 'function') {
          window.gtag('event', 'call_tuna_submit', { page_path: location.pathname });
        }
      } catch (error) {
        status.textContent = 'The tuna line is temporarily unavailable. Try email or Telegram.';
      } finally {
        button.disabled = false;
      }
    });
  }

  setupHeroTuna();
  createConsentBanner();
})();
