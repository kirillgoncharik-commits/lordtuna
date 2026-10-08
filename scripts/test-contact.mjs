import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../functions/api/contact.js', import.meta.url), 'utf8');
const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const { onRequestPost } = await import(moduleUrl);

function request(fields) {
  const body = new FormData();
  Object.entries(fields).forEach(([key, value]) => body.set(key, String(value)));
  return new Request('https://lordtuna.com/api/contact', { method: 'POST', body });
}

const valid = () => ({
  name: 'Ada Founder',
  contact: 'ada@example.com',
  message: 'A focused landing page for a new product.',
  started_at: Date.now() - 3000
});

const env = { RESEND_API_KEY: 'test-key', CONTACT_FROM: 'site@example.com', CONTACT_TO: 'team@example.com' };
const originalFetch = globalThis.fetch;

let deliveredPayload;
globalThis.fetch = async (_url, options) => {
  deliveredPayload = JSON.parse(options.body);
  return Response.json({ id: 'email_123' });
};

let response = await onRequestPost({ request: request(valid()), env });
assert.equal(response.status, 200);
assert.deepEqual(await response.json(), { ok: true, id: 'email_123' });
assert.deepEqual(deliveredPayload.to, ['team@example.com']);
assert.match(deliveredPayload.subject, /Ada Founder/);

response = await onRequestPost({ request: request({ ...valid(), message: '' }), env });
assert.equal(response.status, 400);

response = await onRequestPost({ request: request({ ...valid(), website: 'spam.example' }), env });
assert.equal(response.status, 200);

response = await onRequestPost({ request: request({ ...valid(), started_at: Date.now() }), env });
assert.equal(response.status, 400);

response = await onRequestPost({ request: request(valid()), env: {} });
assert.equal(response.status, 503);

globalThis.fetch = async () => new Response('upstream failed', { status: 500 });
response = await onRequestPost({ request: request(valid()), env });
assert.equal(response.status, 502);

globalThis.fetch = originalFetch;
console.log('Contact handler: success, validation, spam, configuration and delivery-failure paths passed.');
