#!/usr/bin/env python3
import json
import subprocess
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / 'web'
SPECS = ROOT / 'specs'
APPS = ROOT / 'apps'
IDEAS = ROOT / 'ideas'


def load_apps():
    apps = []
    for spec_path in sorted(SPECS.glob('*.json')):
        spec = json.loads(spec_path.read_text(encoding='utf-8'))
        slug = spec['slug']
        app_dir = APPS / slug
        readme_rel = f"/files/apps/{slug}/README.md" if (app_dir / 'README.md').exists() else None
        idea_rel = None
        for md in IDEAS.glob('*.md'):
            text = md.read_text(encoding='utf-8', errors='ignore')
            if spec['app_name'].lower() in text.lower() or slug in md.name:
                idea_rel = f"/files/ideas/{md.name}"
                break
        apps.append({
            'slug': slug,
            'app_name': spec.get('app_name', slug),
            'tagline': spec.get('tagline', ''),
            'package_name': spec.get('package_name', ''),
            'target_user': spec.get('target_user', ''),
            'problem': spec.get('problem', ''),
            'solution': spec.get('solution', ''),
            'feature_v1': spec.get('feature_v1', []),
            'screens': spec.get('screens', []),
            'status': 'Scaffolded' if app_dir.exists() else 'Spec only',
            'spec_url': f"/files/specs/{spec_path.name}",
            'readme_url': readme_rel,
            'idea_url': idea_rel,
            'app_path': f"apps/{slug}/",
            'spec_path': f"specs/{spec_path.name}",
        })
    return apps


class Handler(BaseHTTPRequestHandler):
    def _send(self, status=200, content_type='text/plain; charset=utf-8', body=b''):
        self.send_response(status)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path in ['/', '/index.html']:
            body = (WEB / 'index.html').read_bytes()
            return self._send(200, 'text/html; charset=utf-8', body)
        if self.path == '/api/apps':
            payload = {
                'apps': load_apps(),
                'stats': {
                    'specs': len(list(SPECS.glob('*.json'))),
                    'apps': len([p for p in APPS.iterdir() if p.is_dir()]) if APPS.exists() else 0,
                    'ideas': len(list(IDEAS.glob('*.md'))) if IDEAS.exists() else 0,
                }
            }
            return self._send(200, 'application/json; charset=utf-8', json.dumps(payload).encode())
        if self.path.startswith('/files/'):
            rel = unquote(self.path[len('/files/'):])
            target = (ROOT / rel).resolve()
            if not str(target).startswith(str(ROOT.resolve())) or not target.exists() or not target.is_file():
                return self._send(404, body=b'Not found')
            mime = 'text/plain; charset=utf-8'
            if target.suffix == '.json':
                mime = 'application/json; charset=utf-8'
            elif target.suffix in ['.html', '.htm']:
                mime = 'text/html; charset=utf-8'
            return self._send(200, mime, target.read_bytes())
        return self._send(404, body=b'Not found')

    def do_POST(self):
        if self.path == '/api/generate-next':
            result = subprocess.run([sys.executable, str(ROOT / 'scripts' / 'generate_next_app.py')], capture_output=True, text=True, cwd=str(ROOT))
            if result.returncode != 0:
                return self._send(500, 'application/json; charset=utf-8', json.dumps({'ok': False, 'error': result.stderr or result.stdout}).encode())
            return self._send(200, 'application/json; charset=utf-8', json.dumps({'ok': True, 'result': json.loads(result.stdout)}).encode())
        return self._send(404, body=b'Not found')


def main():
    host = '0.0.0.0'
    port = 8123
    server = HTTPServer((host, port), Handler)
    print(f'Dashboard server running at http://{host}:{port}')
    server.serve_forever()


if __name__ == '__main__':
    main()
