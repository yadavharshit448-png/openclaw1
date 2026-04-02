#!/usr/bin/env bash
set -euo pipefail
cd /home/Lenovo/android-autopilot

# Start dashboard server if not already running.
if ! pgrep -f "python3 scripts/dashboard_server.py" >/dev/null 2>&1; then
  nohup python3 scripts/dashboard_server.py > dashboard_server.log 2>&1 &
  sleep 2
fi

# Start localtunnel in background and capture the public URL.
nohup npx localtunnel --port 8123 > localtunnel.log 2>&1 &
sleep 10

echo "Dashboard local URL: http://127.0.0.1:8123"
echo "VM public IP / localtunnel password: 104.197.63.245"
echo "Tunnel URL (check localtunnel.log):"
cat localtunnel.log
