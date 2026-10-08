# Sangam Shield

**Crowd command dashboard for Kumbh Mela and other mass gatherings.**
Built for *Hack for Social Cause: Youth Tech Challenge 2027* (theme: Disaster Mitigation, Kumbh Mela).

> **Status: Phase 1 prototype.** All crowd data is **simulated**. Real sensors (volunteer counters, CCTV counts) connect in Phase 2. See [docs/TECHNICAL_DESIGN.md](docs/TECHNICAL_DESIGN.md).

## The problem
Stampedes at large gatherings happen when density in a narrow place (bridge, ghat, lane) crosses about 4 people per m² and nobody sees it coming. Control rooms need to know *where*, *how soon*, and *what to do*.

## What it does
- Live map of 9 zones coloured by density (safe / busy / danger)
- **Predicts** which zone will reach danger in the next ~10 minutes
- **Diversion control**: apply a diversion and see the effect on that zone and its neighbours
- **Safe route** that avoids congested zones and updates live
- **SOS** to the nearest medical camp with ETA
- One-click **announcement text** for loudspeakers / Cell Broadcast
- English and Hindi

## Quick start (no build, no install)
```bash
git clone https://github.com/<your-username>/sangam-shield.git
cd sangam-shield
# Option A: just open index.html in a browser
# Option B: serve it locally
npx serve .
```
Then open the URL shown (usually http://localhost:3000).

**Try it:** click **Surge at Bridge** → wait for the alert → press **Apply diversion** → watch Bridge density fall. Open **Safe route** and pick Main Gate to Ghat A.

## Environment variables
The prototype needs **none**. `.env.example` lists the variables planned for Phase 2 (Firebase sync, Cell Broadcast gateway). Copy it to `.env` only when you build Phase 2. Never commit `.env`.

## Run the tests
```bash
npm install
npm test
```
Runs 7 automated smoke tests (jsdom) covering load, surge alert, diversion, safe route, SOS and language switch. Manual test cases: [tests/TEST_CASES.md](tests/TEST_CASES.md).

## Repository layout
```
index.html                 the whole prototype (HTML + CSS + JS, no dependencies)
data/sample_data.json      zones, areas, thresholds, sample sensor readings
docs/TECHNICAL_DESIGN.md   architecture, algorithms, diagrams
tests/smoke.test.js        automated tests
tests/TEST_CASES.md        manual test cases with expected results
.env.example               Phase 2 variables (not used by the prototype)
LICENSE                    MIT
```

## Deploy (free)
GitHub Pages: repository **Settings → Pages → Deploy from a branch → main / root**. Your site appears at `https://<your-username>.github.io/sangam-shield/`.

## Limitations (honest)
- Data is simulated; the prediction model is a simple trend line, not a trained model.
- Zone areas and the map are illustrative, not surveyed.
- Not a replacement for police and trained crowd managers. It supports their decisions.

## License
MIT. See [LICENSE](LICENSE).
