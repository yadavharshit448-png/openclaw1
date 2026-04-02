# GitHub Pages static dashboard

This repository now uses a static dashboard, not a VM-hosted live web server.

## Build locally
```bash
cd ./android-autopilot
python3 scripts/build_static_dashboard.py
```

Output:
- `site/index.html`
- `site/.nojekyll`

## GitHub Actions deployment
Workflow file:
- `.github/workflows/deploy-pages.yml`

What it does on every push to `main`:
1. checks out the repo
2. runs `python3 scripts/build_static_dashboard.py`
3. uploads the `site/` folder as a Pages artifact
4. deploys it to GitHub Pages

## GitHub requirements
This repository is already pushed to GitHub:
- `https://github.com/yadavharshit448-png/openclaw1`

To make the dashboard live, enable Pages for Actions:
- open `https://github.com/yadavharshit448-png/openclaw1/settings/pages`
- under Build and deployment, set Source to `GitHub Actions`
- if GitHub asks for a fresh deployment, push to `main` again

Expected live URL:
- `https://yadavharshit448-png.github.io/openclaw1/`

## What the static dashboard shows
- current app specs
- scaffolded app status
- target user/problem/solution
- V1 features
- links to spec JSON and app README files in the repo

## Why this is better here
Because the agent runs on a cloud VM, localhost dashboards are unreliable for your browser. GitHub Pages gives a stable public URL for a static view of generated apps.
