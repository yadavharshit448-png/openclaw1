#!/usr/bin/env python3
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPECS = ROOT / 'specs'
APPS = ROOT / 'apps'

IDEA_LIBRARY = [
  {
    "slug": "launch-checklist",
    "app_name": "Launch Checklist",
    "tagline": "Run product launches from your phone without missing critical steps.",
    "package_name": "com.harshitlabs.launchchecklist",
    "theme_seed": "#14b8a6",
    "target_user": "Indie founders and small product teams shipping launches, campaigns, and releases.",
    "problem": "Launch tasks get scattered across chats and docs, causing missed steps, late checks, and chaotic release day coordination.",
    "solution": "A mobile launch control room with structured pre-launch, launch-day, and post-launch checklists plus owners and status snapshots.",
    "feature_v1": [
      "Launch templates for product release, campaign, and feature rollout",
      "Owner and deadline fields for each checklist item",
      "Critical blocker section with severity tags",
      "Today view for tasks due now",
      "Launch notes and retro summary",
      "Offline-first sample data mode"
    ],
    "monetization": "Free for one launch board, then Pro for unlimited boards and templates.",
    "privacy_notes": [
      "Keep launch data local until sync is explicitly added.",
      "Do not add analytics before a privacy policy exists.",
      "Avoid collecting customer PII in checklist notes."
    ],
    "screens": [
      {"title": "Launch Board", "description": "See launch phases, owners, blockers, and completion status in one place."},
      {"title": "Today", "description": "Focus view for launch-critical tasks due today or overdue."},
      {"title": "Retro Notes", "description": "Capture what worked, what failed, and next improvements after launch."}
    ]
  },
  {
    "slug": "api-price-watch",
    "app_name": "API Price Watch",
    "tagline": "Track vendor pricing changes before your margins get hit.",
    "package_name": "com.harshitlabs.apipricewatch",
    "theme_seed": "#f97316",
    "target_user": "Bootstrapped SaaS founders and developers relying on paid APIs and cloud tools.",
    "problem": "Third-party API pricing changes can silently destroy unit economics if founders notice too late.",
    "solution": "A lightweight mobile tracker for vendor pricing, usage assumptions, margin notes, and renewal alerts.",
    "feature_v1": [
      "Vendor cards with current price and expected usage",
      "Margin impact estimator",
      "Renewal and pricing review reminders",
      "Scenario notes for alternative vendors",
      "Demo charts with local sample data"
    ],
    "monetization": "Free for a few vendors, subscription for unlimited tracking and future sync.",
    "privacy_notes": [
      "Store only pricing notes, not API secrets.",
      "No external sync in MVP.",
      "Add a privacy policy before notifications or cloud backup."
    ],
    "screens": [
      {"title": "Vendor Costs", "description": "Track important APIs and watch their pricing trends."},
      {"title": "Margin Impact", "description": "Estimate how vendor changes affect your business model."},
      {"title": "Alternatives", "description": "Save fallback vendor notes and switching ideas."}
    ]
  },
  {
    "slug": "support-replay",
    "app_name": "Support Replay",
    "tagline": "Turn recurring support pain into a fixable product backlog.",
    "package_name": "com.harshitlabs.supportreplay",
    "theme_seed": "#6366f1",
    "target_user": "Founders and small support/product teams handling user issues directly.",
    "problem": "Repeated support complaints live in inboxes and chats, making it hard to identify patterns and prioritize product fixes.",
    "solution": "A mobile-friendly issue pattern board that groups recurring user complaints into themes, evidence, and proposed fixes.",
    "feature_v1": [
      "Issue themes with frequency and severity",
      "Evidence snippets and notes",
      "Suggested fix backlog",
      "Weekly trend summary cards",
      "Offline sample dataset"
    ],
    "monetization": "Solo free tier, paid workspace features later.",
    "privacy_notes": [
      "Do not store raw sensitive customer data in MVP.",
      "Use synthetic/demo data by default.",
      "Add policy disclosures before any sync or analytics."
    ],
    "screens": [
      {"title": "Themes", "description": "See clustered complaint themes and most urgent friction points."},
      {"title": "Evidence", "description": "Attach notes and examples behind each recurring issue."},
      {"title": "Fix Backlog", "description": "Track candidate product fixes and expected impact."}
    ]
  }
]


def write_json(path: Path, obj: dict):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2) + '\n', encoding='utf-8')


def scaffold(spec_path: Path):
    result = subprocess.run([sys.executable, str(ROOT / 'scripts' / 'scaffold_expo_app.py'), '--spec', str(spec_path)], capture_output=True, text=True, cwd=str(ROOT))
    if result.returncode != 0:
        raise SystemExit(result.stderr or result.stdout)
    return result.stdout.strip()


def main():
    SPECS.mkdir(parents=True, exist_ok=True)
    APPS.mkdir(parents=True, exist_ok=True)
    built_apps = {p.name for p in APPS.iterdir() if p.is_dir()}
    spec_files = sorted(SPECS.glob('*.json'))

    for spec_path in spec_files:
        spec = json.loads(spec_path.read_text(encoding='utf-8'))
        if spec['slug'] not in built_apps:
            msg = scaffold(spec_path)
            print(json.dumps({"action": "scaffolded_existing_spec", "slug": spec['slug'], "spec_path": str(spec_path), "app_path": str(APPS / spec['slug']), "message": msg}))
            return

    existing_slugs = {json.loads(p.read_text(encoding='utf-8')).get('slug') for p in spec_files}
    next_idea = next((idea for idea in IDEA_LIBRARY if idea['slug'] not in existing_slugs), None)
    if next_idea is None:
        next_idea = IDEA_LIBRARY[-1].copy()
        suffix = len(existing_slugs) + 1
        next_idea['slug'] = f"{next_idea['slug']}-{suffix}"
        next_idea['app_name'] = f"{next_idea['app_name']} {suffix}"
        next_idea['package_name'] = f"{next_idea['package_name']}{suffix}"

    spec_path = SPECS / f"{next_idea['slug']}.json"
    write_json(spec_path, next_idea)
    msg = scaffold(spec_path)
    print(json.dumps({"action": "created_new_spec_and_app", "slug": next_idea['slug'], "spec_path": str(spec_path), "app_path": str(APPS / next_idea['slug']), "message": msg}))


if __name__ == '__main__':
    main()
