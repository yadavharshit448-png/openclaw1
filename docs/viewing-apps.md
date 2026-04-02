# Viewing generated apps

## Option 1: Build the static dashboard
```bash
cd /home/Lenovo/android-autopilot
python3 scripts/build_static_dashboard.py
```

This writes:
- `/home/Lenovo/android-autopilot/site/index.html`

Open that file locally, or publish it with GitHub Pages.

## Option 2: Generate the next app
```bash
cd /home/Lenovo/android-autopilot
python3 scripts/generate_next_app.py
```

Then rebuild the static dashboard:
```bash
python3 scripts/build_static_dashboard.py
```

## Option 3: Inspect app code folders
Generated apps live in:
- `/home/Lenovo/android-autopilot/apps/`

## Option 4: Git repository
This workspace is initialized as a git repo so you can push it to GitHub later.
