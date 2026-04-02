# App generation pipeline

This workspace is now configured for app creation only.

## Goal
Continuously create Android app codebases without touching Google Play deployment yet.

## Flow
1. Ideation job creates ranked app ideas.
2. Best idea is saved as a markdown brief.
3. A matching JSON spec is created under `specs/`.
4. The scaffold script reads the JSON spec.
5. A new Expo React Native app is generated under `apps/<slug>/`.
6. The app is ready for local iteration, GitHub sync, EAS build later, and eventual Play submission.

## Key directories
- `ideas/`: human-readable app briefs
- `specs/`: machine-friendly app specs used by the scaffold script
- `apps/`: generated app codebases
- `scripts/`: automation scripts
- `prompts/`: reusable generation instructions

## Current default
- Keep generation autonomous
- Keep publishing disabled
- Prefer small, original utility apps
- Build one app at a time to avoid junk output

## Primary command
```bash
python3 scripts/scaffold_expo_app.py --spec specs/ship-ping.json
```

## Output
The script creates:
- `apps/<slug>/package.json`
- `apps/<slug>/app.json`
- `apps/<slug>/eas.json`
- `apps/<slug>/tsconfig.json`
- `apps/<slug>/App.tsx`
- `apps/<slug>/src/data/features.ts`
- `apps/<slug>/src/theme.ts`
- `apps/<slug>/README.md`

## Scaling path
Later we can add:
- automatic npm install
- git repo per app
- icon/screenshot generation
- EAS cloud build
- Play internal testing submit
