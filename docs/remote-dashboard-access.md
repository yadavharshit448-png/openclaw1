# Remote dashboard access from a cloud VM

If the dashboard runs on a Google Cloud VM, `127.0.0.1` will only work inside the VM.

## Best quick fix
Use a tunnel.

Run:
```bash
cd /home/Lenovo/android-autopilot
bash scripts/expose_dashboard.sh
```

This does two things:
1. starts the dashboard server on port 8123
2. starts a localtunnel public URL

## Important note about localtunnel
Many localtunnel pages now ask for a `Tunnel Password`.
Use the VM public IP as the password.

Current VM public IP:
- `104.197.63.245`

## Current access info
Current tunnel URL:
- `https://angry-bugs-heal.loca.lt`

If that URL expires, rerun `bash scripts/expose_dashboard.sh` and check:
- `/home/Lenovo/android-autopilot/localtunnel.log`

## Local dashboard still exists too
Inside the VM:
- `http://127.0.0.1:8123`
