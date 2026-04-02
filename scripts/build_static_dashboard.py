#!/usr/bin/env python3
import json
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPECS = ROOT / 'specs'
APPS = ROOT / 'apps'
IDEAS = ROOT / 'ideas'
SITE = ROOT / 'site'


def load_apps():
    apps = []
    for spec_path in sorted(SPECS.glob('*.json')):
        spec = json.loads(spec_path.read_text(encoding='utf-8'))
        slug = spec['slug']
        app_dir = APPS / slug
        idea_name = None
        for md in sorted(IDEAS.glob('*.md')):
            text = md.read_text(encoding='utf-8', errors='ignore')
            if spec.get('app_name', '').lower() in text.lower() or slug in md.name:
                idea_name = md.name
                break
        apps.append({
            'slug': slug,
            'app_name': spec.get('app_name', slug),
            'tagline': spec.get('tagline', ''),
            'package_name': spec.get('package_name', ''),
            'target_user': spec.get('target_user', ''),
            'problem': spec.get('problem', ''),
            'solution': spec.get('solution', ''),
            'features': spec.get('feature_v1', []),
            'screens': spec.get('screens', []),
            'status': 'Scaffolded' if app_dir.exists() else 'Spec only',
            'spec_path': f'specs/{spec_path.name}',
            'readme_path': f'apps/{slug}/README.md' if (app_dir / 'README.md').exists() else None,
            'idea_name': idea_name,
        })
    return apps


def build():
    apps = load_apps()
    SITE.mkdir(parents=True, exist_ok=True)
    stats = {
        'specs': len(list(SPECS.glob('*.json'))),
        'apps': len([p for p in APPS.iterdir() if p.is_dir()]) if APPS.exists() else 0,
        'ideas': len(list(IDEAS.glob('*.md'))) if IDEAS.exists() else 0,
    }
    cards = []
    for app in apps:
        screens = ''.join(f"<span class='chip'>{escape(s.get('title','Screen'))}</span>" for s in app['screens'])
        features = ''.join(f"<li>{escape(item)}</li>" for item in app['features'])
        links = [f"<a class='btn secondary' href='../{escape(app['spec_path'])}'>Spec JSON</a>"]
        if app['readme_path']:
            links.append(f"<a class='btn secondary' href='../{escape(app['readme_path'])}'>App README</a>")
        if app['idea_name']:
            links.append(f"<a class='btn secondary' href='../ideas/{escape(app['idea_name'])}'>Idea brief</a>")
        cards.append(f"""
<section class='card'>
  <div class='row top'>
    <div>
      <h2>{escape(app['app_name'])}</h2>
      <p class='tagline'>{escape(app['tagline'])}</p>
    </div>
    <span class='status'>{escape(app['status'])}</span>
  </div>
  <p><strong>Slug:</strong> {escape(app['slug'])}</p>
  <p><strong>Package:</strong> {escape(app['package_name'])}</p>
  <p><strong>Target user:</strong> {escape(app['target_user'])}</p>
  <p><strong>Problem:</strong> {escape(app['problem'])}</p>
  <p><strong>Solution:</strong> {escape(app['solution'])}</p>
  <div class='chips'>{screens}</div>
  <h3>V1 features</h3>
  <ul>{features}</ul>
  <div class='links'>{''.join(links)}</div>
</section>
""")
    html = f"""<!doctype html>
<html>
<head>
  <meta charset='utf-8' />
  <meta name='viewport' content='width=device-width,initial-scale=1' />
  <title>Android Autopilot Dashboard</title>
  <style>
    :root {{ --bg:#081120; --card:#111827; --muted:#94a3b8; --text:#f8fafc; --accent:#38bdf8; --border:#1f2937; --ok:#22c55e; }}
    * {{ box-sizing:border-box; }}
    body {{ margin:0; background:linear-gradient(180deg,#081120,#0f172a); color:var(--text); font:16px/1.5 Inter,system-ui,sans-serif; }}
    .wrap {{ max-width:1150px; margin:0 auto; padding:32px 20px 60px; }}
    .hero {{ display:flex; justify-content:space-between; gap:16px; align-items:flex-start; margin-bottom:20px; flex-wrap:wrap; }}
    h1 {{ margin:0 0 8px; font-size:38px; }}
    .hero p, p {{ color:var(--muted); }}
    .stats {{ display:flex; gap:12px; flex-wrap:wrap; margin:18px 0 28px; }}
    .stat {{ background:rgba(17,24,39,.92); border:1px solid var(--border); border-radius:16px; padding:14px 16px; min-width:160px; }}
    .stat b {{ display:block; font-size:24px; color:var(--text); }}
    .grid {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(340px,1fr)); gap:18px; }}
    .card {{ background:rgba(17,24,39,.92); border:1px solid var(--border); border-radius:20px; padding:20px; box-shadow:0 12px 30px rgba(0,0,0,.25); }}
    .row.top {{ display:flex; justify-content:space-between; gap:10px; align-items:flex-start; }}
    h2 {{ margin:0; font-size:24px; }}
    h3 {{ margin:18px 0 8px; font-size:15px; color:var(--accent); text-transform:uppercase; letter-spacing:.08em; }}
    .tagline {{ color:#cbd5e1; margin:6px 0 0; }}
    .status {{ background:rgba(34,197,94,.14); color:#86efac; border:1px solid rgba(34,197,94,.4); border-radius:999px; padding:6px 10px; font-size:12px; font-weight:700; white-space:nowrap; }}
    ul {{ margin:0; padding-left:18px; color:var(--text); }}
    li {{ margin:5px 0; }}
    .chips {{ display:flex; flex-wrap:wrap; gap:8px; margin:12px 0; }}
    .chip {{ font-size:12px; color:#dbeafe; background:rgba(56,189,248,.12); border:1px solid rgba(56,189,248,.35); padding:6px 10px; border-radius:999px; }}
    .links {{ display:flex; gap:8px; flex-wrap:wrap; margin-top:16px; }}
    .btn {{ background:var(--accent); color:#082f49; border:none; border-radius:12px; padding:10px 14px; font-weight:800; text-decoration:none; display:inline-block; }}
    .btn.secondary {{ background:transparent; color:var(--text); border:1px solid var(--border); }}
    code {{ color:#bfdbfe; }}
  </style>
</head>
<body>
  <div class='wrap'>
    <div class='hero'>
      <div>
        <div style='color:#94a3b8'>Static GitHub Pages dashboard</div>
        <h1>Android Autopilot</h1>
        <p>This page is generated from the app factory repository and is safe to publish on GitHub Pages. It shows the current app specs and scaffolded apps without requiring a VM web server.</p>
      </div>
      <div>
        <a class='btn' href='../README.md'>Repository README</a>
      </div>
    </div>
    <div class='stats'>
      <div class='stat'><span>Total specs</span><b>{stats['specs']}</b></div>
      <div class='stat'><span>Generated apps</span><b>{stats['apps']}</b></div>
      <div class='stat'><span>Idea briefs</span><b>{stats['ideas']}</b></div>
    </div>
    <div class='grid'>{''.join(cards)}</div>
  </div>
</body>
</html>
"""
    (SITE / 'index.html').write_text(html, encoding='utf-8')
    (SITE / '.nojekyll').write_text('', encoding='utf-8')
    print(f'Built static dashboard at {SITE / "index.html"}')


if __name__ == '__main__':
    build()
