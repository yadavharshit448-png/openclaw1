#!/usr/bin/env bash
set -euo pipefail
cd /home/Lenovo/android-autopilot
python3 -m http.server 8123 -d web
