# Viewing generated apps

## Option 1: Build the static dashboard
```bash
cd ./android-autopilot
python3 scripts/build_static_dashboard.py
```

This writes:
- `site/index.html`

Open that file locally, or use GitHub Pages once enabled for:
- `https://yadavharshit448-png.github.io/openclaw1/`

## Option 2: Generate the next app
```bash
cd ./android-autopilot
python3 scripts/generate_next_app.py
```

Then rebuild the static dashboard:
```bash
python3 scripts/build_static_dashboard.py
```

## Option 3: Inspect app code folders
Generated apps live in:
- `apps/`

## Option 4: Git repository
This workspace is now connected to:
- `https://github.com/yadavharshit448-png/openclaw1`
