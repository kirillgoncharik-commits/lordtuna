export async function onRequestPost({ request, env }) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let fields;
    if (contentType.includes('application/json')) {
      fields = await request.json();
    } else {
      fields = Object.fromEntries((await request.formData()).entries());
    }

    const json = (body, status = 200) => Response.json(body, {
      status,
      headers: { 'Cache-Control': 'no-store' }
    });

    // Honeypot.
    if (fields.website || fields._honey) {
      return json({ ok: true });
    }

    const name = String(fields.name || '').trim();
    const contact = String(fields.contact || '').trim();
    const message = String(fields.message || '').trim();
    const startedAt = Number(fields.started_at || 0);
    const elapsed = Date.now() - startedAt;

    if (!name || !contact || !message) {
      return json({ ok: false, error: 'Missing required fields' }, 400);
    }

    if (name.length > 120 || contact.length > 180 || message.length > 5000) {
      return json({ ok: false, error: 'Field is too long' }, 400);
    }

    if (!startedAt || elapsed < 1800 || elapsed > 86_400_000) {
      return json({ ok: false, error: 'Please reload the page and try again' }, 400);
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_FROM) {
      return json({ ok: false, error: 'Contact delivery is not configured yet' }, 503);
    }

    const to = env.CONTACT_TO || 'kirill.goncharik@gmail.com';
    const safeName = name.replace(/[\r\n\t]+/g, ' ');
    const subject = `Call Tuna — ${safeName}`;
    const text = [
      'New Lord Tuna enquiry',
      '',
      `Name: ${name}`,
      `Contact: ${contact}`,
      '',
      message,
      '',
      `Received: ${new Date().toISOString()}`
    ].join('\n');

    const resend = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: [to],
        subject,
        text
      })
    });

    if (!resend.ok) {
      const detail = await resend.text();
      console.error('Resend error:', detail);
      return json({ ok: false, error: 'Delivery failed' }, 502);
    }

    const delivery = await resend.json().catch(() => ({}));
    return json({ ok: true, id: delivery.id || undefined });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: 'Unexpected error' }, {
      status: 500,
      headers: { 'Cache-Control': 'no-store' }
    });
  }
}
