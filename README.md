# @nullvoxpopuli/ember-router-scroll@0.1.0 repro

Fresh `ember new` app (ember-cli 4.12.3, ember-source ~4.12, ember-auto-import 2.x)
plus `@nullvoxpopuli/ember-router-scroll@0.1.0` and one unit test that looks up
`service:router-scroll`.

## Problem 1: duplicate @ember/test-waiters, no tests run

    npm install --legacy-peer-deps
    npx ember test --launch Chrome

`@ember/test-helpers` (default blueprint, ^2.9) uses `@ember/test-waiters@3` (a v1 addon);
the addon depends on `^4.1.2` (a v2 addon), so npm installs both. Result:

    Global error: Uncaught Error: Could not find module `@ember/test-waiters`
    imported from `@ember/test-helpers/settled`

`ember dependency-lint` does not report it.

## Problem 2: "type": "module" breaks `extends Service`

`package.json` here has `"overrides": {"@ember/test-waiters": "^3.1.0"}` to get past problem 1.
Re-run `npx ember test --launch Chrome`:

    TypeError: Class extends value #<Object> is not a constructor or null

0.0.2 (no `"type": "module"` in package.json) works; 0.1.0 adds it, so webpack parses
`dist/**/*.js` as strict ESM and doesn't apply `__esModule` interop to the `@ember/service`
external, so the default import is the whole module object.

Workaround (makes the test pass), in `ember-cli-build.js`:

    autoImport: { webpack: { module: { rules: [{
      test: /node_modules[\\/]@nullvoxpopuli[\\/]ember-router-scroll[\\/].*\.js$/,
      type: 'javascript/auto',
    }] } } }
