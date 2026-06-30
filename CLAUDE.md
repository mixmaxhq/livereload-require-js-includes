# livereload-require-js-includes — repo card

> A map, not a manual. Keep it ~1 screen; point to detail, don't inline it.

## What it is
A client-side LiveReload plugin that intercepts JS/sourcemap change events and only triggers a page reload when the changed file is actually included via a `<script>` tag on the current page. Prevents spurious reloads when a shared dependency change affects build artifacts not used by the open page.

## serves
role: Dev-time browser plugin for LiveReload — filters JS reload events by page inclusion
referenced-by: [local development workflows in any Mixmax frontend repo that uses LiveReload]

## Code map
- Plugin entry point -> `index.js`
- Browser tests -> `spec/jasmine.html`, `spec/indexSpec.js`

## Conventions
- Pure browser globals — no module bundler; wraps itself in an IIFE and registers via `window.LiveReload.addPlugin()` or `window.LiveReloadPlugin_*` fallback.
- Distributed as both a Bower package (`livereload-require-js-includes`) and an npm package (`@mixmaxhq/livereload-require-js-includes`); `index.js` is the sole published file.
- Lint via `.jshintrc` (JSHint) — run `jshint index.js` before committing.

## Gotchas
- Path matching uses only the last path component (filename), not the full path — Windows paths with backslashes will not match correctly (known limitation, noted in README).
- Sourcemaps (`.map`) are intentionally captured and suppressed; the assumption is the accompanying JS file will always be reported changed too.

## Run / test
- Tests open in the browser: `npm test` (runs `open spec/jasmine.html`) — no headless runner.
- Lint: `npx jshint index.js`

## Load the matching domain card
- This repo is cross-cutting tooling — it owns no product domain, so there is no domain card to load. When working here, load the card of the consuming service/domain if the change is driven by its needs.
