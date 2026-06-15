# Schießen-Unterseite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Neue Unterseite `schiessen.html` mit allen Inhalten der Schießen-Abteilung, dynamischen News via JSON, Abteilungsindikator in der Nav, und Verlinkung von der Startseite.

**Architecture:** Statisches HTML/CSS/JS ohne Build-System. Gleiche Nav/Footer via `nav.js` (IIFE). CSS-Ergänzungen in `assets/style.css`. News werden clientseitig aus `assets/schiessen-news.json` per `fetch()` geladen. `nav.js` liest `data-section`-Attribut am `#site-nav`-Div und rendert optional einen Abteilungs-Label zwischen Logo und Links.

**Tech Stack:** Reines HTML5, CSS Custom Properties, Vanilla JS (ES5-kompatibel), JSON

---

## Dateiübersicht

| Datei | Aktion | Inhalt |
|---|---|---|
| `assets/nav.js` | Modify | `data-section`-Unterstützung hinzufügen |
| `assets/style.css` | Modify | CSS für Nav-Label, Trainings-Cards, News, Disziplinen-Tags, Kontakt-Persons |
| `assets/schiessen-news.json` | Create | Initiale News-Einträge (4 Beiträge) |
| `schiessen.html` | Create | Vollständige Unterseite (Hero, Verein, Training, News, Wiederladen, Kontakt) |
| `index.html` | Modify | „Mehr erfahren"-Button auf Schießen-Sport-Card |

---

## Task 1: nav.js — data-section-Indikator

**Files:**
- Modify: `assets/nav.js`
- Modify: `assets/style.css`

- [ ] **Schritt 1: nav.js erweitern**

Ersetze den Inhalt von `assets/nav.js` vollständig:

```javascript
(function () {
  var navDiv = document.getElementById('site-nav');
  var section = navDiv ? navDiv.getAttribute('data-section') : null;
  var sectionLabel = section
    ? '<span class="nav-section-label">' + section + '</span>'
    : '';

  var nav = '\n<nav class="site-nav">\n' +
    '  <div class="logo">\n' +
    '    <a href="index.html"><img src="assets/logo.png" alt="ESV Aachen Logo"></a>\n' +
    '  </div>\n' +
    sectionLabel + '\n' +
    '  <button class="nav-burger" aria-label="Menü öffnen" aria-expanded="false">\n' +
    '    <span></span><span></span><span></span>\n' +
    '  </button>\n' +
    '  <div class="nav-links">\n' +
    '    <a href="index.html#sportarten">Sportarten</a>\n' +
    '    <a href="index.html#vorstand">Vorstand</a>\n' +
    '    <a href="index.html#kontakt">Kontakt</a>\n' +
    '    <a href="satzung.html">Satzung</a>\n' +
    '    <a href="impressum.html">Impressum</a>\n' +
    '  </div>\n' +
    '</nav>';

  var footer = '\n<footer class="site-footer">\n' +
    '  <div class="logo">\n' +
    '    <a href="index.html"><img src="assets/logo.png" alt="ESV Aachen Logo"></a>\n' +
    '  </div>\n' +
    '  <div class="footer-links">\n' +
    '    <a href="satzung.html">Satzung</a>\n' +
    '    <a href="impressum.html">Impressum</a>\n' +
    '    <a href="datenschutz.html">Datenschutz</a>\n' +
    '  </div>\n' +
    '  <div class="footer-copy">&copy; 2026 ESV Aachen 1922 e.V.</div>\n' +
    '</footer>';

  document.getElementById('site-nav').innerHTML = nav;
  document.getElementById('site-footer').innerHTML = footer;

  var burger = document.querySelector('.nav-burger');
  var links = document.querySelector('.nav-links');

  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();
```

- [ ] **Schritt 2: CSS für .nav-section-label in style.css ergänzen**

Am Ende von `assets/style.css` einfügen (nach dem letzten bestehenden Block):

```css
/* ── Nav Section Label ── */
.nav-section-label {
  color: var(--gold);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  flex: 1;
  text-align: center;
}
@media (max-width: 768px) {
  .nav-section-label { display: none; }
}
```

- [ ] **Schritt 3: Visuell prüfen**

`index.html` im Browser öffnen — Nav muss unverändert aussehen (kein Label).
Dann eine temporäre `data-section`-Änderung an `index.html` testen:
```html
<div id="site-nav" data-section="Test"></div>
```
→ Goldener Label „TEST" erscheint zwischen Logo und Links. Danach Attribut wieder entfernen.

- [ ] **Schritt 4: Commit**

```bash
git add assets/nav.js assets/style.css
git commit -m "feat: add data-section label support to nav"
```

---

## Task 2: schiessen-news.json — initiale News-Daten

**Files:**
- Create: `assets/schiessen-news.json`

- [ ] **Schritt 1: JSON-Datei anlegen**

`assets/schiessen-news.json` mit folgendem Inhalt erstellen:

```json
[
  {
    "datum": "2025-11-01",
    "titel": "Sachkunde für Sportschützen",
    "text": "Kurs zum Erwerb der Sachkunde für Sportschützen nach Waffengesetz. Veranstaltungstage: 01., 02. und 08. November 2025, Beginn 9:00 Uhr, am Schießstand der Pankratius Sportschützen in Inden/Altdorf. Gebühren: 120,00 € für den kompletten Kurs, 40,00 € nur für den Aufsichtslehrgang."
  },
  {
    "datum": "2025-01-09",
    "titel": "Neue Trainer C Lizenzen",
    "text": "Zwei unserer Trainer haben ihre DOSB-Trainer-C-Lizenzen für Leistungssport erfolgreich abgeschlossen. Nach über 6.500 km Fahrstrecke und 27 Tagen Präsenzausbildung können sie nun zusätzlich Duell- und Schnellfeuertechnik unterrichten."
  },
  {
    "datum": "2024-11-01",
    "titel": "Techniktraining dienstags",
    "text": "Regelmäßiges Techniktraining dienstags von 17:00–18:00 Uhr mit Schwerpunkten in Sportpistole, Waffentechnik und Großkaliber-Waffen. Anfänger und erfahrene Schützen gleichermaßen willkommen."
  },
  {
    "datum": "2024-08-17",
    "titel": "Willkommenstermine für Interessierte",
    "text": "Jeden Monat bieten wir Einführungstermine für Interessierte an — jeden Montag ab 17:00 Uhr. Einfach vorbeikommen, reinschnuppern und den Verein kennenlernen. Keine Voranmeldung nötig."
  }
]
```

- [ ] **Schritt 2: Commit**

```bash
git add assets/schiessen-news.json
git commit -m "feat: add schiessen-news.json with initial news entries"
```

---

## Task 3: style.css — CSS für Schießen-Unterseite

**Files:**
- Modify: `assets/style.css`

- [ ] **Schritt 1: Verein-Sektion CSS einfügen**

Am Ende von `assets/style.css` (nach Task 1 CSS) einfügen:

```css
/* ── Schießen: Verein ── */
.verein-section { background: var(--light); padding: 4rem 2rem; }
.verein-inner { max-width: 800px; margin: 0 auto; }
.verein-subh {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-on-light);
  margin: 2rem 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.disziplinen-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.disziplin-tag {
  background: var(--gold);
  color: var(--dark);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.3rem 0.85rem;
  border-radius: 20px;
  letter-spacing: 0.02em;
}
```

- [ ] **Schritt 2: Training-Sektion CSS einfügen**

```css
/* ── Schießen: Training ── */
.training-section { background: var(--dark); padding: 4rem 2rem; }
.training-inner { max-width: 900px; margin: 0 auto; }
.training-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.training-card {
  background: var(--dark-2);
  border-top: 3px solid var(--gold);
  padding: 1.5rem;
}
.training-day {
  color: var(--gold);
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}
.training-time {
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.training-info {
  color: var(--text-muted-dark);
  font-size: 0.88rem;
  line-height: 1.5;
}
.training-anlage { margin-top: 2.5rem; }
.training-anlage-list {
  list-style: none;
  margin: 0.75rem 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.training-anlage-list li {
  color: var(--text-muted-dark);
  padding-left: 1rem;
  border-left: 2px solid var(--gold);
}
.training-anlage-list li strong { color: #fff; }
.training-hinweis {
  color: var(--text-muted-dark);
  font-size: 0.88rem;
  line-height: 1.6;
  margin-top: 1rem;
}
```

- [ ] **Schritt 3: News-Sektion CSS einfügen**

```css
/* ── Schießen: News ── */
.news-section { background: var(--light); padding: 4rem 2rem; }
.news-inner { max-width: 800px; margin: 0 auto; }
.news-list { display: flex; flex-direction: column; gap: 2rem; margin-top: 2rem; }
.news-item { border-left: 3px solid var(--gold); padding-left: 1.5rem; }
.news-date {
  color: var(--text-muted-light);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 0.25rem;
}
.news-titel {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-on-light);
  margin-bottom: 0.4rem;
}
.news-text {
  color: var(--text-muted-light);
  font-size: 0.93rem;
  line-height: 1.65;
}
```

- [ ] **Schritt 4: Wiederladen + Kontakt-Persons CSS einfügen**

```css
/* ── Schießen: Wiederladen ── */
.wiederladen-section { background: var(--dark); padding: 4rem 2rem; }
.wiederladen-inner { max-width: 800px; margin: 0 auto; }

/* ── Schießen: Kontakt Persons ── */
.kontakt-persons {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0 1.5rem;
}
.kontakt-person { text-align: center; }
.kontakt-name { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.2rem; }
.kontakt-rolle { color: var(--text-muted-dark); font-size: 0.88rem; margin-bottom: 0.5rem; }
```

- [ ] **Schritt 5: Commit**

```bash
git add assets/style.css
git commit -m "style: add CSS for Schießen subpage sections"
```

---

## Task 4: schiessen.html — vollständige Unterseite

**Files:**
- Create: `schiessen.html`

- [ ] **Schritt 1: schiessen.html anlegen**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Schießen – ESV Aachen 1922 e.V.</title>
  <meta name="description" content="Sportschützen beim ESV Aachen 1922 e.V. – Trainingszeiten, Disziplinen, Aktuelles und Kontakt.">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

<div id="site-nav" data-section="Abteilung Schießen"></div>

<main>

<div style="background:var(--dark);">
  <div class="subpage-hero">
    <div class="sub-kicker">Abteilung Schießen · ESV Aachen 1922 e.V.</div>
    <h1>Sportschützen</h1>
    <p style="color:var(--text-muted-dark);max-width:600px;margin:1rem auto 0;line-height:1.7;">Schießsport ist ein schönes, entspannendes und vielseitiges Hobby – zusammen mit verantwortungsbewussten Gleichgesinnten. Wir heißen alle willkommen, eine Eisenbahner-Karriere ist keine Voraussetzung.</p>
  </div>
</div>

<div class="cut-to-light"></div>

<section class="verein-section" id="verein">
  <div class="verein-inner">
    <span class="section-eyebrow">Über uns</span>
    <h2 class="section-h2">Die Abteilung</h2>
    <p class="section-p">Wir sind eine Abteilung des Eisenbahner Sportvereins Aachen 1922 e.V. – kein eigenständiger Verein. Als Mitglied des Rheinischen Schützenbunds und des Deutschen Schützenbunds (Kreis 061 Aachen Stadt, Bezirk 06 Aachen) richten wir uns nach deren Sportrichtlinien.</p>
    <p class="section-p">Unser Schwerpunkt liegt auf Kurzwaffendisziplinen (Pistole, Revolver); Langwaffenschießen ist ebenfalls möglich.</p>
    <h3 class="verein-subh">Unsere Disziplinen</h3>
    <div class="disziplinen-grid">
      <span class="disziplin-tag">Luftpistole</span>
      <span class="disziplin-tag">25m Sportpistole KK</span>
      <span class="disziplin-tag">25m Pistole / Revolver</span>
      <span class="disziplin-tag">Perkussionspistole</span>
      <span class="disziplin-tag">Perkussionsrevolver</span>
      <span class="disziplin-tag">Steinschlosspistole</span>
      <span class="disziplin-tag">Schwarzpulver</span>
    </div>
  </div>
</section>

<div class="cut-to-dark"></div>

<section class="training-section" id="training">
  <div class="training-inner">
    <span class="section-eyebrow">Mitmachen</span>
    <h2 class="section-h2">Training</h2>
    <div class="training-grid">
      <div class="training-card">
        <div class="training-day">Montag</div>
        <div class="training-time">18:00–20:00 Uhr</div>
        <div class="training-info">Luftpistole · Freies Training</div>
      </div>
      <div class="training-card">
        <div class="training-day">Dienstag</div>
        <div class="training-time">18:00–21:00 Uhr</div>
        <div class="training-info">Luftpistole + Kleinkaliber<br>bis max. .38 Wadcutter</div>
      </div>
      <div class="training-card">
        <div class="training-day">Donnerstag</div>
        <div class="training-time">18:00–20:00 Uhr</div>
        <div class="training-info">Großkaliberdisziplinen</div>
        <div class="training-time" style="margin-top:0.75rem;">18:00–21:00 Uhr</div>
        <div class="training-info">Alle anderen inkl. Schwarzpulver</div>
      </div>
      <div class="training-card">
        <div class="training-day">Sonntag</div>
        <div class="training-time">10:30–12:00 Uhr</div>
        <div class="training-info">Techniktraining Luftpistole</div>
      </div>
    </div>
    <div class="training-anlage">
      <h3 class="verein-subh" style="color:#fff;">Unsere Anlage</h3>
      <ul class="training-anlage-list">
        <li><strong>25-Meter-Stand</strong> — 10 Schützenstände mit Duelleinrichtung</li>
        <li><strong>50-Meter-Stand</strong> — 5 Schützenstände mit Seilzug (Freie Pistole, Gewehr)</li>
        <li><strong>Vereinsheim</strong> — Sozialraum für Mitglieder</li>
      </ul>
      <p class="training-hinweis">Gäste sind willkommen. Vereinswaffen können ausgeliehen werden. Munition ist vor Ort erhältlich. Bitte beim Schießleiter an- und abmelden. Versicherungspflicht beachten.</p>
    </div>
  </div>
</section>

<div class="cut-to-light"></div>

<section class="news-section" id="news">
  <div class="news-inner">
    <span class="section-eyebrow">Aktuelles</span>
    <h2 class="section-h2">News</h2>
    <div class="news-list" id="news-list"></div>
  </div>
</section>

<div class="cut-to-dark"></div>

<section class="wiederladen-section" id="wiederladen">
  <div class="wiederladen-inner">
    <span class="section-eyebrow">Munition &amp; Technik</span>
    <h2 class="section-h2">Wiederladen</h2>
    <p class="section-p" style="color:var(--text-muted-dark);">Wir bieten gelegentlich Lehrgänge zur Erlangung der Erlaubnis nach § 27 SprengG (Wiederladen, Schwarzpulver, Böllern) an. Der letzte Lehrgang fand 2026 statt. Lehrgänge werden nicht regelmäßig ausgerichtet — sobald ein neuer Termin geplant ist, erscheint die Ausschreibung hier.</p>
    <p class="section-p" style="color:var(--text-muted-dark);">Aktuell ist kein Lehrgang geplant. Bei Fragen:</p>
    <a href="mailto:bds@esv-aachen.de" class="kontakt-email">bds@esv-aachen.de</a>
  </div>
</section>

<div class="cut-to-dark-2"></div>

<section class="kontakt" id="kontakt">
  <span class="section-eyebrow">Kontakt</span>
  <h2 class="section-h2">Abteilungsleitung</h2>
  <div class="kontakt-persons">
    <div class="kontakt-person">
      <div class="kontakt-name">Christoph Greven</div>
      <div class="kontakt-rolle">Abteilungsleiter</div>
      <a href="mailto:schiessen@esv-aachen.de" class="kontakt-email">schiessen@esv-aachen.de</a>
    </div>
    <div class="kontakt-person">
      <div class="kontakt-name">Clemens Espe</div>
      <div class="kontakt-rolle">Stellv. Abteilungsleiter</div>
      <a href="mailto:bds@esv-aachen.de" class="kontakt-email">bds@esv-aachen.de</a>
    </div>
  </div>
  <div class="kontakt-address">
    Schießstand Im Süsterfeld<br>
    52072 Aachen
  </div>
</section>

</main>

<div id="site-footer"></div>

<button id="back-to-top" aria-label="Zurück nach oben" title="Zurück nach oben">&#8679;</button>

<script src="assets/nav.js"></script>
<script>
(function () {
  var btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 200);
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  fetch('assets/schiessen-news.json')
    .then(function (r) { return r.json(); })
    .then(function (news) {
      var container = document.getElementById('news-list');
      container.innerHTML = news.map(function (item) {
        var d = new Date(item.datum);
        var datum = d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
        return '<div class="news-item">' +
          '<div class="news-date">' + datum + '</div>' +
          '<h3 class="news-titel">' + item.titel + '</h3>' +
          '<p class="news-text">' + item.text + '</p>' +
          '</div>';
      }).join('');
    });
})();
</script>

</body>
</html>
```

- [ ] **Schritt 2: Seite im Browser öffnen und prüfen**

`schiessen.html` direkt im Browser öffnen (file://) oder über einen lokalen Webserver.

Checkliste:
- Nav zeigt goldenes Label „ABTEILUNG SCHIEßEN" zwischen Logo und Links
- Auf Mobile: Label nicht sichtbar, Hamburger-Menü funktioniert
- Alle 6 Sektionen sichtbar (Hero, Verein, Training, News, Wiederladen, Kontakt)
- News-Sektion: 4 Beiträge erscheinen (JSON wird lokal via fetch geladen — bei file:// ggf. lokalen Server nutzen: `python3 -m http.server 8080`)
- Trainings-Cards: 4 Karten mit goldener Oberkante
- Disziplinen: goldene Tags
- Kontakt: zwei Personen nebeneinander mit E-Mail-Links
- Back-to-top-Button funktioniert

- [ ] **Schritt 3: Commit**

```bash
git add schiessen.html
git commit -m "feat: add Schießen subpage with all sections"
```

---

## Task 5: index.html — „Mehr erfahren"-Button auf Schießen-Card

**Files:**
- Modify: `index.html`

- [ ] **Schritt 1: Button zur Schießen-Card hinzufügen**

In `index.html` die Schießen-Card (aktuell Zeilen ~69–78) so erweitern:

```html
    <div class="sport-card">
      <span class="sport-icon">🎯</span>
      <div class="sport-name">Schießen</div>
      <div class="sport-detail">
        <strong>Di &amp; Do</strong> 18–21 Uhr<br>
        Im Süsterfeld 14<br>
        Leitung: Christoph Greven<br>
        ✉️ <a href="mailto:schiessen@esv-aachen.de">schiessen@esv-aachen.de</a>
      </div>
      <a href="schiessen.html" class="sport-card-link">Mehr erfahren →</a>
    </div>
```

- [ ] **Schritt 2: CSS für .sport-card-link in style.css einfügen**

Am Ende von `assets/style.css` einfügen:

```css
/* ── Sport Card Link ── */
.sport-card-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--gold);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}
.sport-card-link:hover { border-bottom-color: var(--gold); }
```

- [ ] **Schritt 3: Im Browser prüfen**

`index.html` öffnen → Schießen-Card hat „Mehr erfahren →"-Link in Gold. Klick führt zu `schiessen.html`. Andere Sport-Cards unverändert.

- [ ] **Schritt 4: Commit und Push**

```bash
git add index.html assets/style.css
git commit -m "feat: add Mehr erfahren link on Schießen sport card"
git push
```
