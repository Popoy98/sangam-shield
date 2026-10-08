# Test cases

Automated: `npm test` runs TC-01 to TC-07 below. Manual: follow the steps in a browser.

| ID | Test | Steps | Expected result |
|----|------|-------|-----------------|
| TC-01 | Page loads | Open `index.html` | Map shows 9 zones; stats row filled; status pill visible |
| TC-02 | Stats populated | Load page | "People on site" shows a number above 0 |
| TC-03 | Surge alert | Click **Surge at Bridge**, wait ~10 s | Alert "Bridge is overcrowded" appears; Danger zones count rises; pill turns Critical |
| TC-04 | Diversion works | Press **Apply diversion** on the Bridge alert, wait ~30 s | Bridge density falls below 4.0; "Diverted" tag shows on map |
| TC-05 | Safe route | Safe route tab, Main Gate to Ghat A, press **Find safest route** | Route listed with ETA; gold line drawn on map; route avoids any zone at 4+ |
| TC-06 | SOS | SOS tab, choose a zone, press **Send SOS** | Medical Camp ETA shown; route drawn; SOS entry added to Alerts |
| TC-07 | Language | Click **हिन्दी** | All labels, alerts and tips switch to Hindi |
| TC-08 | Prediction | Click **Shahi Snan peak**, then tap a zone and press **Add crowd** twice | A "will reach danger in about N min" alert may appear; "Next risk" stat shows a zone |
| TC-09 | Announcement | Tap a zone, press **Copy announcement** | Message "Copied" shown; pasted text names the zone and the alternative route |
| TC-10 | Reset by scenario | Click **Normal day** | Densities settle lower; most zones turn green or amber within ~20 s |

## Formula checks (use `data/sample_data.json`)
| Zone | Count | Area (m²) | Expected density | Expected status |
|------|-------|-----------|------------------|-----------------|
| Bridge | 2100 | 600 | 3.50 | Busy |
| Ghat A | 6200 | 1500 | 4.13 | Danger |
| Main Gate | 1980 | 900 | 2.20 | Safe |

Rule: `density = count / area`, safe below 2.5, danger from 4.0.
