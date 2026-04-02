# GitHub Pages static dashboard

This repository now uses a static dashboard, not a VM-hosted live web server.

## Build locally
```bash
cd /home/Lenovo/android-autopilot
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
To make it live, you still need to push this repository to GitHub and enable Pages for Actions.

Suggested steps after credentials are available:
```bash
cd /home/Lenovo/android-autopilot
git branch -M main
git remote add origin https://github.com/<your-username>/android-autopilot.git
git push -u origin main
```

Then in GitHub:
- Settings
- Pages
- Build and deployment
- Source: GitHub Actions

## What the static dashboard shows
- current app specs
- scaffolded app status
- target user/problem/solution
- V1 features
- links to spec JSON and app README files in the repo

## Why this is better here
Because the agent runs on a cloud VM, localhost dashboards are unreliable for your browser. GitHub Pages gives a stable public URL for a static view of generated apps.
