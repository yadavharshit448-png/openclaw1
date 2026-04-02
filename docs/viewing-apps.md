# Viewing generated apps

## Option 1: Open dashboard
Open:
- `/home/Lenovo/android-autopilot/web/index.html`

Or serve it:
```bash
cd /home/Lenovo/android-autopilot
python3 -m http.server 8123 -d web
```
Then visit:
- `http://127.0.0.1:8123`

## Option 2: Inspect app code folders
Generated apps live in:
- `/home/Lenovo/android-autopilot/apps/`

Current apps:
- `ship-ping`
- `deprecation-radar`

## Option 3: Git repository
This workspace is initialized as a git repo so you can push it to GitHub later.
