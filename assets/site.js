(() => {
  document.querySelectorAll('[data-analytics]').forEach((el) => {
    el.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', el.dataset.analytics, {
          link_url: el.href,
          page_path: location.pathname
        });
      }
    });
  });

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = 'Calling Tuna…';
    const button = form.querySelector('button');
    button.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Request failed');

      form.reset();
      status.textContent = status.dataset.success || 'Tuna called. A human will reply. His Lordship has been informed.';
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'call_tuna_submit', { page_path: location.pathname });
      }
    } catch (error) {
      status.textContent = 'The tuna line is temporarily unavailable. Try email or Telegram.';
    } finally {
      button.disabled = false;
    }
  });
})();