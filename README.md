# Day Calc App

A very barebones React + Express application that tracks how many *10-minute blocks* (≈ **1 %** of a 1 000-block “waking day”) you have consumed so far.

- **Frontend**: React (built with Vite) – progress bar + stats
- **Backend**: Express serves the static build under `dist/`
- **Process manager**: PM2
- **Port**: **3912**

---

## Quick-start

```bash
# 1. Install server deps (root)
$ npm install

# 2. Build the React UI (installs UI deps automatically)
$ npm run build

# 3. Launch with PM2 (hot-restarts on crash)
$ npm run pm2

# Check
$ pm2 status  # should show day-calc-app online
# Visit the app
$ open http://localhost:3912
```

If you prefer without PM2:

```bash
# after steps 1–2
$ npm start
```

---

## Development (frontend)

```bash
cd ui
npm install   # first time only
npm run dev   # runs Vite dev server with HMR
```

---

## Project tree (important bits)

```
.
├── server.js              # Express server (serves /dist)
├── ecosystem.config.js    # PM2 config (port 3912)
├── ui/                    # React source (Vite)
│   ├── src/App.jsx        # Main component – stopwatch logic
│   ├── src/App.css        # Styling / colors
│   └── ...
└── dist/                  # Built UI (created by `npm run build`)
```

Enjoy!
