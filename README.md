# Premier Movers

Booking site and dispatch dashboard for Premier Movers (Pottstown, PA).

- `index.html` – the whole front end (customer booking, dispatch, fleet map, crew app, assistant).
- `api/assistant.js` – Vercel function that sends assistant messages to Claude.

## Vercel settings
Environment variables:
- `ANTHROPIC_API_KEY` – Anthropic API key
- `DISPATCH_PIN` – passcode Arthur types the first time he uses the assistant
- `ANTHROPIC_MODEL` (optional) – defaults to `claude-sonnet-5-5`

Jobs are demo data that reset on refresh until a database is added.
