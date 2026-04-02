# Android Autopilot Implementation Plan

> For Hermes: use subagent-driven-development when executing app-by-app implementation.

Goal: build a repeatable system that continuously ideates Android apps, generates one app at a time, validates quality, and deploys to Google Play once credentials are connected.

Architecture: use Expo/React Native app templates plus EAS cloud build/submit so local Android SDK is not required. Use a quality gate and review-gated rollout by default to avoid Play policy violations and low-quality app spam. Use Hermes cron automation for recurring ideation.

Tech stack: Node.js 22, Expo, React Native, EAS Build, EAS Submit, GitHub Actions, JSON/YAML config.

---

### Task 1: Finalize publishing mode and policy
Objective: lock the safety and release constraints before any app is generated.
Files:
- Modify: config/policy.yaml
- Reference: config/policy.example.yaml

Steps:
1. Copy the example policy to config/policy.yaml.
2. Set mode to review_gated or fully_autonomous.
3. Set max_apps_per_week and package_name_prefix.
4. Confirm forbidden categories and quality gates.
5. Verify the file exists and is valid YAML.

### Task 2: Connect deployment credentials
Objective: make cloud build and Play submission possible.
Files:
- Secrets in GitHub/CI, not committed
- Reference: docs/play-console-checklist.md

Steps:
1. Create Expo token.
2. Create Google Play Android Publisher service account.
3. Grant Play Console permissions.
4. Store EXPO_TOKEN and GOOGLE_SERVICE_ACCOUNT_JSON in GitHub Actions secrets.
5. Verify `eas whoami` succeeds in CI inside the selected app folder under `apps/<slug>/`.
6. Use workflow_dispatch `app_path` input to build a specific app when needed.

### Task 3: Create the first production app repository
Objective: generate one real app end-to-end before scaling.
Files:
- Create: apps/<app-slug>/
- Create: apps/<app-slug>/app.json
- Create: apps/<app-slug>/eas.json
- Create: apps/<app-slug>/package.json
- Create: apps/<app-slug>/src/

Steps:
1. Pick one app brief from templates or the live idea queue.
2. Scaffold an Expo TypeScript app.
3. Implement only the V1 feature set from the brief.
4. Add tests and smoke checks.
5. Configure package name, icon, splash, and EAS profiles.
6. Run local lint/test.
7. Trigger EAS Android build.
8. Submit to internal testing first.

### Task 4: Add store listing asset generation workflow
Objective: standardize metadata needed for Play submission.
Files:
- Create: assets/store/<app-slug>/
- Create: listings/<app-slug>/store-listing.json

Steps:
1. Generate app title, short description, and full description.
2. Generate screenshot plan and feature graphic brief.
3. Add privacy-policy URL or draft.
4. Fill data safety and permission notes.
5. Review for originality and policy fit.

### Task 5: Automate recurring ideation
Objective: keep app opportunities flowing without waiting for manual brainstorming.
Files:
- Cron configuration in Hermes
- Optional backlog files under ideas/

Steps:
1. Schedule a daily or twice-weekly ideation job.
2. Generate 3 app concepts each run.
3. Score them for originality, demand, feasibility, and policy risk.
4. Promote only the highest-scoring idea into the build queue.
5. Keep the rest in backlog for later.

### Task 6: Scale only after the first shipped app passes
Objective: avoid multiplying bad assumptions.
Files:
- Modify: config/policy.yaml
- Modify: automation prompts/workflows as needed

Steps:
1. Review retention, crashes, policy feedback, and store listing quality.
2. Improve the template and workflow.
3. Only then increase max_apps_per_week.
4. Keep production rollout manual unless real-world quality remains strong.
