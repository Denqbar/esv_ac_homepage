# ESV Aachen Homepage – Design Spec

**Datum:** 2026-06-13  
**Status:** Genehmigt (Vorstand ESV Aachen)

---

## Ziel

Modernisierung der Homepage des Eisenbahner Sportvereins Aachen 1922 e.V. (esv-aachen.de). Die neue Site soll das frische Logo von 2026 widerspiegeln und einen professionellen, sportlich-modernen Auftritt bieten.

---

## Design-Richtung: „Dynamisch"

Diagonale Schnitte zwischen Sektionen erzeugen einen energetischen Rhythmus. Wechsel zwischen dunklen (#111) und hellen (#f5f5f2) Bereichen. Gold (#E8A800) als durchgehendes Akzent-Element.

### Farbpalette

| Rolle | Farbe | Hex |
|---|---|---|
| Primär (dunkel) | Tiefes Schwarz | `#111111` |
| Sekundär (dunkel) | Dunkelgrau | `#1a1a1a` |
| Hintergrund (hell) | Warmweiß | `#f5f5f2` |
| Akzent | ESV-Gold | `#E8A800` |
| Text auf dunkel | Weiß | `#ffffff` |
| Text auf hell | Fast-Schwarz | `#1a1a1a` |

### Typografie

- **Headlines:** System-Sans, 900 weight, tight letter-spacing
- **Navigation:** 0.72rem, uppercase, 0.1em letter-spacing
- **Fließtext:** 0.88–1rem, line-height 1.7–1.8

### Logo-Einsatz

- Datei: `ESV LOGO 2026_black_frei.svg` (freigstelltes Logo, weiß + gold, transparenter Hintergrund)
- Logo ohne Kreis-Variante
- Nav: 94px Höhe
- Footer: 64px Höhe
- Wird unverändert verwendet

---

## Seitenstruktur

### Hauptseite (`index.html`) — One-Scroller

1. **Sticky Navigation**
   - Logo links (94px)
   - Links rechts: Sportarten · Vorstand · Kontakt · Satzung
   - Hintergrund: `#111`, Scrollt mit der Seite

2. **Hero-Sektion** (dunkel)
   - Vollbreite, Stockfoto-Hintergrund (Sport-Motiv, Opacity ~18%)
   - Dekorative vertikale Goldlinie links
   - Kicker: „Eisenbahner Sportverein Aachen · Seit 1922"
   - Headline: „Mehr als Sport."
   - Subtext + zwei CTA-Buttons (primär: gold, sekundär: ghost)
   - Kennzahlen rechts unten: 100+ Jahre · 4 Sportarten · 1922

3. **Über uns** (hell, diagonal eingeschnitten)
   - Zweispaltig: Text links, Sportfoto rechts
   - Goldener Badge auf dem Foto: „Seit 1922 in Aachen"

4. **Unsere Sportarten** (dunkel, diagonal)
   - 4 Karten nebeneinander (Grid)
   - Je: Icon, Name, Zeiten, Ort, Kontaktperson
   - Karten: goldener Balken oben, dunkler Hintergrund

   | Sportart | Details |
   |---|---|
   | Schießen | Di/Do 18–21 Uhr · Im Süsterfeld 14 · Ltr: Chr. Greven |
   | Fußball | Mehrere Zeiten/Orte · Ltr: G. Göthert |
   | Tennis | Ganzjährig · Soerser Weg 90 |
   | Schwimmen | Do & Fr · Mehrere Bäder · Ltr: P. Frauenrath |

5. **Vorstand** (hell, diagonal)
   - 3 Karten mit echten Fotos (rund, goldener Rand)
   - Martin Langner – 1. Vorsitzender
   - Dirk Michels – 2. Vorsitzender
   - Andreas Otten – Geschäftsführer & Kassenwart
   - Fotos: `vorsitz1.jpg`, `vorsitz2.jpg`, `gf.jpg`

6. **Kontakt** (dunkel)
   - E-Mail: `vorstand@esv-aachen.de` (als klickbarer Link)
   - Adresse: Kleinkölnstr. 17, 52062 Aachen
   - Kein Kontaktformular

7. **Footer** (dunkel)
   - Logo links (64px)
   - Links mittig: Satzung · Impressum · Datenschutz
   - Copyright rechts

### Unterseiten

| Datei | Inhalt |
|---|---|
| `satzung.html` | Vollständiger Satzungstext als HTML, gleiche Nav/Footer |
| `impressum.html` | Impressum, gleiche Nav/Footer |
| `datenschutz.html` | Datenschutzerklärung (DSGVO), gleiche Nav/Footer |

Die Navigation auf Unterseiten verlinkt zurück zur Hauptseite mit Anker (z.B. `index.html#sportarten`). Der Satzungstext wird von der aktuellen Website (esv-aachen.de) übernommen.

---

## Assets

| Datei | Verwendung |
|---|---|
| `ESV LOGO 2026_black_frei.svg` | Logo (weiß/gold, freigestellt) für alle dunklen Bereiche |
| `ESV LOGO 2026.svg` | Logo (schwarz/gold) — Reserve für helle Bereiche falls nötig |
| `vorsitz1.jpg` | Foto Martin Langner |
| `vorsitz2.jpg` | Foto Dirk Michels |
| `gf.jpg` | Foto Andreas Otten |
| Stock-Foto (Unsplash) | Hero-Hintergrund (Sport-Motiv), Über-uns-Bild |

---

## Technische Anforderungen

- Reines HTML/CSS/JS, kein Backend
- Kein Kontaktformular (E-Mail-Adresse genügt)
- Mobile-responsive (One-Scroller funktioniert auf allen Geräten)
- Satzung als eigene HTML-Seite (kein PDF-Link)
- Keine externen Abhängigkeiten außer ggf. Google Fonts
- Stockfotos von Unsplash (freie Lizenz)
