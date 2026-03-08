# Voice Assistant Integration Tests

Use this checklist to verify the Vapi voice assistant widget after deployment.

## Manual test scenarios

1. **Initial load**
   - Page renders the floating mic button on every route.
   - No console errors or network failures.

2. **Microphone permission granted**
   - Click the mic button.
   - Browser prompts for microphone usage.
   - After allowing access, the session starts (indicator turns green).
   - Speaking produces live transcript entries.
   - Assistant voice reply plays automatically and textual response appears.

3. **Microphone permission denied**
   - Deny the mic prompt.
   - Widget shows a descriptive error banner.
   - Subsequent clicks either re-prompt (if browser allows) or keep showing the error message.

4. **Conversation flow**
   - Multiple turns of speech produce alternating user/assistant bubbles.
   - Transcript entries finalize (no endless "partial" state).
   - Stopping the session removes the active indicator and clears any loading state.

5. **Mobile view**
   - Test on a mobile device or responsive emulator.
   - Widget remains accessible (no overlap with other UI elements).
   - Mic button remains reachable and large enough to tap.

6. **Safari autoplay behavior**
   - Ensure clicking the mic satisfies Safaris autoplay requirement and audio plays without additional gestures.

7. **Network interruptions**
   - Simulate offline/unstable network via dev tools.
   - Confirm errors are surfaced and the widget recovers on reconnect.

## Automated checks (where applicable)

- `npm run lint` to ensure the component passes linting (no new warnings).
- `npm run build` to confirm Vite builds successfully with the new dependency.
- Add an E2E smoke test (Playwright/Cypress) that verifies the mic button renders and toggles ARIA attributes correctly (optional, depending on your test stack).

## Regression guardrails

- Monitor browser console for unhandled promise rejections or WebRTC errors.
- Confirm no sensitive keys are logged or exposed beyond the public key.
- Re-run this checklist after any SDK or assistant configuration changes.
