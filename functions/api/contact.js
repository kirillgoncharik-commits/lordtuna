export async function onRequestPost({ request, env }) {
  try {
    const form = await request.formData();

    // Honeypot.
    if (form.get('website')) {
      return Response.json({ ok: true });
    }

    const name = String(form.get('name') || '').trim();
    const contact = String(form.get('contact') || '').trim();
    const message = String(form.get('message') || '').trim();

    if (!name || !contact || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_FROM) {
      return Response.json(
        { error: 'Contact delivery is not configured yet' },
        { status: 503 }
      );
    }

    const to = env.CONTACT_TO || 'kirill.goncharik@gmail.com';
    const subject = `Call Tuna — ${name}`;
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
      return Response.json({ error: 'Delivery failed' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Unexpected error' }, { status: 500 });
  }
}