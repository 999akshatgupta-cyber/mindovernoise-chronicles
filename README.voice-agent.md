# Vapi Voice Assistant Integration

This guide explains how to set up, run, and test the Vapi-powered voice assistant that ships with the MindOverNoise site.

## Prerequisites

- Node.js 18+
- npm (ships with Node.js)
- Access to the Vapi dashboard for regenerating public keys or updating assistant configuration

## Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Ensure the Vapi Web SDK is present (installed automatically via `package.json`):
   ```bash
   npm install @vapi-ai/web
   ```

## Environment configuration

1. Copy the example file and populate your secrets:
   ```bash
   cp .env.example .env
   ```

2. Fill in the values from the Vapi dashboard. `VITE_` prefixes are required for Vite to expose them to the client at build time:
   ```env
   VITE_VAPI_PUBLIC_KEY=d02f062d-96ad-4852-94b6-7f5e94632deb
   VITE_VAPI_ASSISTANT_ID=ed082ab7-dea6-433f-87ad-a81114ece5ca
   ```

> **Security reminder:** `.env` is ignored by Git. Do not commit real keys.

## Running locally

```bash
npm run dev
```

Open the site (default `http://localhost:8080`). A circular mic button appears in the bottom-right corner on every route.

## Using the assistant

1. Click the floating mic button to start the session. The browser will prompt for microphone access the first time.
2. Speak normally. Live transcripts appear inside the widget.
3. The assistant responds with synthesized speech and a textual reply.
4. Click the mic again to end the session.

The widget is mobile-friendly, accessible (`aria-live` for transcripts, focus-ring support), and uses Tailwind + shadcn components.

## Troubleshooting

| Issue | Resolution |
| --- | --- |
| Mic prompt never appears | Ensure the page is served over HTTPS (required on production) and that no browser policy blocks audio input. |
| Assistant fails to start with `NotAllowedError` | Permissions were denied. Re-enable microphone access from browser settings. |
| No audio playback on Safari | Safari requires a user gesture before autoplay. Clicking the mic button satisfies this. |
| Network/CORS errors | The Vapi SDK communicates directly with Vapi. If your deployment adds CSP/proxy layers, allow WebRTC/WebSocket connections to `*.vapi.ai`. |
| Env variables undefined | Confirm `.env` exists, values use the `VITE_` prefix, and restart the dev server after any change. |

## Known limitations

- Audio playback follows browser autoplay rules; additional user interaction may be required on strict setups.
- The widget currently surfaces transcripts and responses within the floating panel only.
- The integration relies on Vapis public Web SDK; if CORS or WebRTC restrictions exist in your environment, consider tunneling through the existing backend proxy (Anaten) as a fallback.

## Deployment notes

- The env variables must be added to your hosting target (Vercel/Netlify/etc.) under the same names.
- No backend secrets are needed; only public keys are used on the client.
- Confirm microphone permissions and autoplay behavior on Chrome, Edge, and Safari after deployment.

## Updating the assistant

If the assistant ID or public key changes:

1. Update `.env.example` (for documentation) and your local `.env`.
2. Redeploy with the new environment variables so Vite rebuilds with the updated values.

Thats it! The voice assistant is now fully integrated and production-ready.
