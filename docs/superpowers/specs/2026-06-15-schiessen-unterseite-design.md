# Design: Schießen-Unterseite (`schiessen.html`)

**Datum:** 2026-06-15  
**Status:** Approved

## Ziel

Integration aller Inhalte der bisherigen Abteilungsseite schiessen.esv-aachen.de in die neue ESV-Homepage als eigene Unterseite `schiessen.html`. Ausgenommen: Anmeldefunktion und Mitgliederportal.

## Verlinkung

- Die Schießen-Card auf `index.html` erhält einen „Mehr erfahren"-Button, der zu `schiessen.html` führt.
- Kein eigener Menüpunkt in der Hauptnavigation.

## Seitenstruktur

Gleiche visuelle Sprache wie `index.html`: SVG-Schnitte zwischen Sektionen, abwechselnd hell/dunkel, Gold-Akzente (`#F4BB19`), Nav und Footer via `nav.js`.

### 1. Hero (dunkel)
- Kicker: „Abteilung Schießen · ESV Aachen 1922 e.V."
- Titel: „Sportschützen"
- Kurztext: Willkommenstext aus der bestehenden Startseite (Hobby, Gemeinschaft, Offenheit)

### 2. Verein (hell)
- Abteilung des ESV, kein eigenständiger Verein
- Verbandsmitgliedschaften: Rheinischer Schützenbund, Deutscher Schützenbund (Kreis 061 Aachen Stadt, Bezirk 06 Aachen)
- Disziplinen: Luftpistole, 25m Sportpistole KK, 25m Pistole/Revolver (verschiedene Kaliber), Perkussionspistole/-revolver, Steinschlosspistole
- Munitionstypen: Luft/CO2, Nitropulver-Patronen, Schwarzpulver

### 3. Training (dunkel)
- 4 Trainingszeiten als Karten:
  - **Mo** 18–20 Uhr: Luftpistole (freies Training)
  - **Di** 18–21 Uhr: Luftpistole + Kleinkaliber bis max. .38 Wadcutter
  - **Do** 18–20 Uhr: Großkaliberdisziplinen / 18–21 Uhr: alle anderen inkl. Schwarzpulver
  - **So** 10:30–12:00 Uhr: Techniktraining Luftpistole
- Anlage: 25m-Stand (10 Schützenstände, Duelleinrichtung), 50m-Stand (5 Schützenstände, Seilzug), Vereinsheim
- Hinweise: Gäste willkommen, Vereinswaffen ausleihbar, Versicherungspflicht, An-/Abmeldung beim Schießleiter

### 4. News (hell)
- Dynamisch aus `assets/schiessen-news.json` geladen und gerendert (clientseitiges JS)
- Neueste Beiträge zuerst
- JSON-Format:
  ```json
  [
    {
      "datum": "2025-11-01",
      "titel": "Titel des Beitrags",
      "text": "Vollständiger Beitragstext..."
    }
  ]
  ```
- Initiale Beiträge (aus bestehender Site):
  1. Sachkunde für Sportschützen (Nov 2025)
  2. Neue Trainer C Lizenzen (Jan 2025)
  3. Techniktraining dienstags (Nov 2024)
  4. Willkommenstermine (Aug 2024)

### 5. Wiederladen (dunkel)
- Lehrgänge finden unregelmäßig statt; letzter Lehrgang 2026
- Wenn ein Lehrgang geplant ist, wird die Ausschreibung hier veröffentlicht (aktuell: keine)
- Kontakt bei Fragen: Clemens Espe — bds@esv-aachen.de

### 6. Kontakt (hell, wie index.html)
- Christoph Greven — Abteilungsleiter — schiessen@esv-aachen.de
- Clemens Espe — Stellv. Abteilungsleiter — bds@esv-aachen.de
- Adresse: Im Süsterfeld, 52072 Aachen

## Abteilungs-Indikator in der Nav

`nav.js` wird erweitert: liest `data-section`-Attribut am `<div id="site-nav">`. Wenn vorhanden, wird ein kleiner goldener Text zwischen Logo und Navigationslinks eingeblendet.

```html
<!-- nur auf schiessen.html -->
<div id="site-nav" data-section="Abteilung Schießen"></div>
```

- Desktop: zentriert zwischen Logo und Links, goldener Text, klein
- Mobile: ausgeblendet (zu wenig Platz)
- Alle anderen Seiten: kein Attribut → Nav unverändert

## Neue Dateien

| Datei | Zweck |
|---|---|
| `schiessen.html` | Unterseite Schießen-Abteilung |
| `assets/schiessen-news.json` | News-Daten, manuell pflegbar ohne HTML-Kenntnisse |

## Geänderte Dateien

| Datei | Änderung |
|---|---|
| `index.html` | „Mehr erfahren"-Button auf Schießen-Card |
| `assets/nav.js` | `data-section`-Unterstützung |
