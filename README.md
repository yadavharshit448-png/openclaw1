# Android Autopilot

This workspace is for an autonomous Android app factory.

Live repo:
- https://github.com/yadavharshit448-png/openclaw1

Expected static dashboard URL after GitHub Pages is enabled:
- https://yadavharshit448-png.github.io/openclaw1/

Current default operating mode: continuous app ideation + app code generation. Publishing is intentionally deferred until later.

Why gated:
- Google Play requires a real developer account, app signing, listing assets, privacy declarations, and policy compliance.
- Fully autonomous spammy publishing risks Play Console suspension.
- Publishing cannot be completed from this environment until your credentials are connected.

Recommended stack:
- Expo + React Native for rapid Android app generation
- EAS Build for cloud Android builds (no local Android SDK required)
- EAS Submit + Google Play API for store submission
- GitHub Actions for CI/CD
- Hermes cron jobs for recurring ideation and pipeline operation

Repository layout:
- docs/implementation-plan.md: end-to-end plan
- docs/play-console-checklist.md: what you must connect later for Play
- docs/viewing-apps.md: how to inspect generated apps and static dashboard output
- config/policy.example.yaml: app quality/publishing policy template
- config/policy.yaml: active policy
- templates/app-brief.example.json: schema for generated app concepts
- prompts/app-factory-builder.md: reusable app generation prompt
- scripts/scaffold_expo_app.py: turns a JSON spec into an Expo app scaffold
- scripts/generate_next_app.py: creates the next app spec/scaffold
- scripts/build_static_dashboard.py: builds the GitHub Pages dashboard
- specs/: machine-readable app specs
- ideas/: human-readable app briefs
- apps/: generated app codebases
- site/: generated static dashboard output
- .github/workflows/eas-build-submit.yml: CI/CD pipeline template for later use
- .github/workflows/deploy-pages.yml: GitHub Pages deployment workflow

Current viewing/generation tools:
1. Static dashboard generated into `site/index.html` for GitHub Pages
2. Git repository tracking all generated apps locally
3. Local generator script to create the next app instantly: `python3 scripts/generate_next_app.py`

GitHub Actions build workflow:
- `.github/workflows/eas-build-submit.yml`
- Builds an app from `apps/<slug>/`, not from the repo root
- On manual runs, pass `app_path` such as `apps/api-price-watch`
- On pushes, it attempts to build the changed app directory automatically

GitHub secrets needed for Android builds:
1. `EXPO_TOKEN` required for EAS authentication and cloud builds
2. `GOOGLE_SERVICE_ACCOUNT_JSON` optional for Play internal testing submission

Future unblockers from you when we later connect publishing:
1. Expo account / EAS auth
2. Google Play Console developer access
3. Google service account JSON for Android Publisher API
4. App signing / keystore strategy
5. Brand/package naming rules
6. Whether you want review-gated or fully autonomous publishing
