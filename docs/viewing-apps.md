# Viewing generated apps

## Option 1: Open dashboard
Start the interactive dashboard server:
```bash
cd /home/Lenovo/android-autopilot
bash scripts/serve_dashboard.sh
```
Then visit:
- `http://127.0.0.1:8123`

The dashboard now lets you:
- browse generated apps
- open raw spec JSON and app READMEs
- trigger `Generate next app now`

## Option 2: Inspect app code folders
Generated apps live in:
- `/home/Lenovo/android-autopilot/apps/`

Current apps:
- `ship-ping`
- `deprecation-radar`

## Option 3: Git repository
This workspace is initialized as a git repo so you can push it to GitHub later.
