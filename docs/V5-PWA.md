# SR-1177 — Installable web app

- Install App triggers beforeinstallprompt on supported browsers; manual installation instructions elsewhere (Safari/iOS, macOS, Android and desktop).
- Build generates branded 192/512 PNGs, maskable 512 and Apple touch 180 icons from the approved full-color logo. Header retains approved gold logo in dark mode.
- Build produces a revisioned service worker that precaches the complete same-origin local app shell. Navigation is network-first with offline index fallback; static assets cache-first. It does not cache API traffic or personal data. Updates activate after old clients close. No App Store or Google Play listing.
- Legacy drafts remain in session memory and can be exported. External links require connectivity. Verify browser installation, standalone launch and airplane-mode relaunch on devices.
