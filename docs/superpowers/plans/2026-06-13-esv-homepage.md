# ESV Aachen Homepage – Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Statische, moderne One-Scroller-Homepage für den ESV Aachen 1922 e.V. mit dynamischem Design (schwarz/gold/weiß, diagonale Schnitte) und vier Unterseiten.

**Architecture:** Reines HTML/CSS/JS ohne Framework oder Build-System. Geteilte Stile in `assets/style.css`, geteilte Nav+Footer per `assets/nav.js` (innerHTML-Injection), Sektionen als semantische `<section>`-Elemente mit Anker-IDs.

**Tech Stack:** HTML5, CSS3 (Custom Properties, clip-path/gradients, CSS Grid/Flexbox), Vanilla JS (nur nav.js), Unsplash für Stockfotos

---

## Dateistruktur

```
/Volumes/2TB_external/Claude/ESV_Homepage/
├── index.html          ← Haupt-One-Scroller
├── satzung.html        ← Satzungstext
├── impressum.html      ← Impressum
├── datenschutz.html    ← Datenschutzerklärung
├── assets/
│   ├── logo.svg        ← ESV LOGO 2026_black_frei.svg (mit gecroptem viewBox)
│   ├── style.css       ← Alle geteilten Styles + CSS-Variablen
│   ├── nav.js          ← Injiziert Nav + Footer in jede Seite
│   ├── vorsitz1.jpg    ← Foto Martin Langner
│   ├── vorsitz2.jpg    ← Foto Dirk Michels
│   └── gf.jpg          ← Foto Andreas Otten
├── .gitignore
└── docs/
    └── superpowers/
        ├── specs/
        └── plans/
```

---

## Task 1: Git-Setup & Projektstruktur

**Files:**
- Create: `.gitignore`
- Create: `assets/` (Verzeichnis)

- [ ] **Git initialisieren**

```bash
cd /Volumes/2TB_external/Claude/ESV_Homepage
git init
```

- [ ] **.gitignore erstellen**

```
.DS_Store
.superpowers/
*.log
```

- [ ] **Assets-Verzeichnis anlegen und Dateien kopieren**

```bash
mkdir -p assets
cp "ESV LOGO 2026_black_frei.svg" assets/logo.svg
cp vorsitz1.jpg vorsitz2.jpg gf.jpg assets/
```

- [ ] **Logo-viewBox auf sichtbaren Bereich zuschneiden**

Datei `assets/logo.svg` öffnen und im öffnenden `<svg>`-Tag:
- `width="..."` entfernen
- `height="..."` entfernen  
- `viewBox="0 0 11046 7896"` ersetzen durch `viewBox="2991 2300 5610 4025"`

Der Bereich 2991/2300 bis 8601/6325 enthält das gesamte Logo (ESV-Zeichen + AACHEN + Slogan + 1922).

- [ ] **Erstes Commit**

```bash
git add .gitignore assets/
git commit -m "chore: init project, add assets"
```

---

## Task 2: Geteilte Styles (`assets/style.css`)

**Files:**
- Create: `assets/style.css`

- [ ] **style.css erstellen**

```css
/* ── Reset & Basis ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  background: #111;
  color: #fff;
  line-height: 1.6;
}
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }

/* ── CSS-Variablen ── */
:root {
  --dark:    #111111;
  --dark-2:  #1a1a1a;
  --light:   #f5f5f2;
  --gold:    #E8A800;
  --white:   #ffffff;
  --text-on-light: #1a1a1a;
  --text-muted-dark: rgba(255,255,255,0.55);
  --text-muted-light: #555555;
}

/* ── Navigation ── */
.site-nav {
  background: var(--dark);
  border-bottom: 1px solid #222;
  padding: 12px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}
.site-nav .logo img { height: 94px; width: auto; }
.nav-links { display: flex; gap: 32px; align-items: center; }
.nav-links a {
  color: #aaa;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--gold); }

/* ── Diagonale Schnitte ── */
.cut-to-light {
  height: 60px;
  background: linear-gradient(to bottom right, var(--dark) 50%, var(--light) 50%);
}
.cut-to-dark {
  height: 60px;
  background: linear-gradient(to top left, var(--dark-2) 50%, var(--light) 50%);
}
.cut-to-dark-2 {
  height: 60px;
  background: linear-gradient(to bottom right, var(--dark-2) 50%, var(--light) 50%);
}

/* ── Abschnitt-Typografie ── */
.section-eyebrow {
  font-size: 0.58rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
  display: block;
}
.section-h2 {
  font-size: 2.2rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 18px;
}
.section-p {
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--text-muted-light);
  margin-bottom: 14px;
}

/* ── Footer ── */
.site-footer {
  background: var(--dark);
  border-top: 1px solid #222;
  padding: 28px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.site-footer .logo img { height: 64px; width: auto; }
.footer-links { display: flex; gap: 24px; }
.footer-links a {
  font-size: 0.62rem;
  color: #555;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color 0.2s;
}
.footer-links a:hover { color: var(--gold); }
.footer-copy { font-size: 0.62rem; color: #444; }

/* ── Buttons ── */
.btn-primary {
  display: inline-block;
  background: var(--gold);
  color: #111;
  padding: 13px 28px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.88; }
.btn-ghost {
  display: inline-block;
  color: rgba(255,255,255,0.6);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s;
}
.btn-ghost:hover { color: #fff; border-color: #fff; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .site-nav { padding: 12px 20px; flex-wrap: wrap; gap: 12px; }
  .site-nav .logo img { height: 60px; }
  .nav-links { gap: 16px; flex-wrap: wrap; }
  .site-footer { padding: 24px 20px; flex-direction: column; align-items: flex-start; }
  .section-h2 { font-size: 1.6rem; }
}
```

- [ ] **Visuell prüfen** (noch leer, nur CSS — weiter zu Task 3)

- [ ] **Commit**

```bash
git add assets/style.css
git commit -m "feat: add shared styles and CSS variables"
```

---

## Task 3: Geteilte Navigation & Footer (`assets/nav.js`)

**Files:**
- Create: `assets/nav.js`

Nav und Footer werden per JS in jede Seite injiziert, damit Änderungen nur an einer Stelle nötig sind.

- [ ] **nav.js erstellen**

```js
(function () {
  const nav = `
<nav class="site-nav">
  <div class="logo">
    <a href="index.html"><img src="assets/logo.svg" alt="ESV Aachen Logo"></a>
  </div>
  <div class="nav-links">
    <a href="index.html#sportarten">Sportarten</a>
    <a href="index.html#vorstand">Vorstand</a>
    <a href="index.html#kontakt">Kontakt</a>
    <a href="satzung.html">Satzung</a>
    <a href="impressum.html">Impressum</a>
  </div>
</nav>`;

  const footer = `
<footer class="site-footer">
  <div class="logo">
    <a href="index.html"><img src="assets/logo.svg" alt="ESV Aachen Logo"></a>
  </div>
  <div class="footer-links">
    <a href="satzung.html">Satzung</a>
    <a href="impressum.html">Impressum</a>
    <a href="datenschutz.html">Datenschutz</a>
  </div>
  <div class="footer-copy">© 2026 ESV Aachen 1922 e.V.</div>
</footer>`;

  document.getElementById('site-nav').innerHTML = nav;
  document.getElementById('site-footer').innerHTML = footer;
})();
```

**Hinweis:** Jede HTML-Seite braucht `<div id="site-nav"></div>` am Anfang des `<body>` und `<div id="site-footer"></div>` am Ende, direkt vor `</body>`. Der `<script>`-Tag muss nach diesen divs kommen, da er DOM-Elemente beschreibt.

Auf Unterseiten (satzung.html etc.) muss der Pfad zu `assets/logo.svg` relativ zur Unterseite korrekt sein — da alle Seiten im Root liegen, ist `assets/logo.svg` von überall gleich.

- [ ] **Commit**

```bash
git add assets/nav.js
git commit -m "feat: add shared nav/footer injection script"
```

---

## Task 4: Hero-Sektion

**Files:**
- Create: `index.html` (Grundgerüst + Hero)

- [ ] **index.html mit Hero erstellen**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ESV Aachen 1922 e.V. – Eisenbahner Sportverein</title>
  <meta name="description" content="Eisenbahner Sportverein Aachen 1922 e.V. – Schießen, Fußball, Tennis und Schwimmen in Aachen.">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    /* ── Hero ── */
    .hero {
      background: var(--dark);
      padding: 80px 48px 120px;
      position: relative;
      overflow: hidden;
      min-height: 520px;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      background: url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=80')
                  center / cover no-repeat;
      opacity: 0.18;
    }
    .hero-line {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 5px;
      background: linear-gradient(to bottom, var(--gold), transparent);
    }
    .hero-line-2 {
      position: absolute;
      left: 14px; top: 0; bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, rgba(232,168,0,0.35), transparent);
    }
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 600px;
    }
    .hero-kicker {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      font-size: 0.62rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 22px;
    }
    .hero-kicker::before {
      content: '';
      display: block;
      width: 28px;
      height: 2px;
      background: var(--gold);
    }
    .hero-h1 {
      font-size: clamp(2.8rem, 5vw, 4.4rem);
      font-weight: 900;
      line-height: 0.95;
      letter-spacing: -0.02em;
      margin-bottom: 24px;
    }
    .hero-h1 em {
      color: var(--gold);
      font-style: normal;
      display: block;
    }
    .hero-sub {
      font-size: 1rem;
      color: var(--text-muted-dark);
      line-height: 1.75;
      margin-bottom: 36px;
      max-width: 440px;
    }
    .hero-btns { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
    .hero-stats {
      position: absolute;
      right: 48px;
      bottom: 80px;
      display: flex;
      gap: 40px;
      z-index: 2;
    }
    .stat-num {
      font-size: 2.4rem;
      font-weight: 900;
      color: var(--white);
      line-height: 1;
    }
    .stat-num span { color: var(--gold); }
    .stat-label {
      font-size: 0.55rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #666;
      margin-top: 4px;
    }
    @media (max-width: 768px) {
      .hero { padding: 60px 20px 80px; min-height: auto; }
      .hero-stats { position: static; margin-top: 40px; gap: 24px; }
    }
  </style>
</head>
<body>

<div id="site-nav"></div>

<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-line"></div>
  <div class="hero-line-2"></div>
  <div class="hero-content">
    <div class="hero-kicker">Eisenbahner Sportverein Aachen · Seit 1922</div>
    <h1 class="hero-h1">Mehr als<br><em>Sport.</em></h1>
    <p class="hero-sub">Vier Sportarten, eine starke Gemeinschaft. Der ESV Aachen vereint seit über 100 Jahren Sportbegeisterte aus Aachen und Umgebung.</p>
    <div class="hero-btns">
      <a href="#sportarten" class="btn-primary">Zu den Sportarten</a>
      <a href="#about" class="btn-ghost">Über uns</a>
    </div>
  </div>
  <div class="hero-stats">
    <div>
      <div class="stat-num">100<span>+</span></div>
      <div class="stat-label">Jahre Tradition</div>
    </div>
    <div>
      <div class="stat-num">4</div>
      <div class="stat-label">Sportarten</div>
    </div>
    <div>
      <div class="stat-num">1<span>922</span></div>
      <div class="stat-label">Gegründet</div>
    </div>
  </div>
</section>

<!-- Weitere Sektionen folgen in späteren Tasks -->

<div id="site-footer"></div>
<script src="assets/nav.js"></script>
</body>
</html>
```

- [ ] **Im Browser prüfen**

```bash
open /Volumes/2TB_external/Claude/ESV_Homepage/index.html
```

Erwartetes Bild: Dunkle Hero-Sektion mit Athletik-Hintergrundbild (gedimmt), goldene Vertikallinie links, große Headline, Kennzahlen rechts unten. Logo in Nav oben.

- [ ] **Commit**

```bash
git add index.html
git commit -m "feat: add hero section"
```

---

## Task 5: Über-uns-Sektion

**Files:**
- Modify: `index.html` (Abschnitt nach Hero einfügen)
- Modify: `assets/style.css` (About-Styles ergänzen)

- [ ] **About-Styles in style.css ergänzen** (am Ende der Datei)

```css
/* ── Über uns ── */
.about {
  background: var(--light);
  padding: 80px 48px 72px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}
.about .section-h2 { color: var(--text-on-light); }
.about .section-p { color: var(--text-muted-light); }
.about-img-wrap {
  position: relative;
  height: 340px;
  border-radius: 3px;
  overflow: hidden;
}
.about-img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
}
.about-img-badge {
  position: absolute;
  bottom: 18px; left: 18px;
  background: var(--gold);
  color: #111;
  padding: 9px 16px;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
@media (max-width: 768px) {
  .about { grid-template-columns: 1fr; padding: 60px 20px; gap: 32px; }
  .about-img-wrap { height: 240px; }
}
```

- [ ] **About-Sektion in index.html nach der Hero-Sektion einfügen** (vor `<div id="site-footer">`)

```html
<div class="cut-to-light"></div>

<section class="about" id="about">
  <div class="about-text">
    <span class="section-eyebrow">Über uns</span>
    <h2 class="section-h2">Tradition trifft Leidenschaft</h2>
    <p class="section-p">Der Eisenbahner Sportverein Aachen 1922 e.V. wurde als Sportgemeinschaft für Eisenbahner und ihre Familien gegründet. Heute steht der Verein allen offen, die Freude an Bewegung und Gemeinschaft haben.</p>
    <p class="section-p">Unter der Leitung unseres Vorstands pflegen wir vier aktive Sportabteilungen mit regelmäßigen Trainingsangeboten für alle Altersgruppen.</p>
  </div>
  <div class="about-img-wrap">
    <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
         alt="Sportliche Gemeinschaft">
    <div class="about-img-badge">Seit 1922 in Aachen</div>
  </div>
</section>
```

- [ ] **Im Browser prüfen**

```bash
open /Volumes/2TB_external/Claude/ESV_Homepage/index.html
```

Erwartetes Bild: Helle Sektion mit Text links, Foto rechts, diagonaler Übergang von dunkel nach hell.

- [ ] **Commit**

```bash
git add index.html assets/style.css
git commit -m "feat: add about section"
```

---

## Task 6: Sportarten-Sektion

**Files:**
- Modify: `index.html`
- Modify: `assets/style.css`

- [ ] **Sportarten-Styles in style.css ergänzen**

```css
/* ── Sportarten ── */
.sports {
  background: var(--dark);
  padding: 80px 48px;
}
.sports-header {
  text-align: center;
  margin-bottom: 48px;
}
.sports-header .section-h2 { color: var(--white); }
.sport-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  max-width: 1100px;
  margin: 0 auto;
}
.sport-card {
  background: var(--dark-2);
  border-top: 3px solid var(--gold);
  padding: 30px 22px 26px;
  transition: transform 0.2s;
}
.sport-card:hover { transform: translateY(-5px); }
.sport-icon { font-size: 2.2rem; margin-bottom: 14px; display: block; }
.sport-name {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--white);
  margin-bottom: 12px;
}
.sport-detail {
  font-size: 0.7rem;
  color: #777;
  line-height: 1.8;
}
.sport-detail strong { color: var(--gold); font-weight: 600; }
.sport-detail a { color: #777; border-bottom: 1px solid #444; }
.sport-detail a:hover { color: var(--gold); border-color: var(--gold); }
@media (max-width: 900px) {
  .sport-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .sport-grid { grid-template-columns: 1fr; }
  .sports { padding: 60px 20px; }
}
```

- [ ] **Sportarten-Sektion in index.html einfügen** (nach About, vor Footer)

```html
<div class="cut-to-dark"></div>

<section class="sports" id="sportarten">
  <div class="sports-header">
    <span class="section-eyebrow">Was wir bieten</span>
    <h2 class="section-h2">Unsere Sportarten</h2>
  </div>
  <div class="sport-grid">
    <div class="sport-card">
      <span class="sport-icon">🎯</span>
      <div class="sport-name">Schießen</div>
      <div class="sport-detail">
        <strong>Di &amp; Do</strong> 18–21 Uhr<br>
        Im Süsterfeld 14<br>
        Leitung: Chr. Greven &amp; Cl. Espe<br>
        <a href="http://schiessen.esv-aachen.de" target="_blank" rel="noopener">schiessen.esv-aachen.de</a>
      </div>
    </div>
    <div class="sport-card">
      <span class="sport-icon">⚽</span>
      <div class="sport-name">Fußball</div>
      <div class="sport-detail">
        <strong>Mehrere Trainingszeiten</strong><br>
        Verschiedene Standorte<br>
        Leitung: Günther Göthert<br>
        <a href="https://www.fupa.net" target="_blank" rel="noopener">FuPa.net</a>
      </div>
    </div>
    <div class="sport-card">
      <span class="sport-icon">🎾</span>
      <div class="sport-name">Tennis</div>
      <div class="sport-detail">
        <strong>Ganzjährig</strong> · Tageslicht<br>
        Soerser Weg 90
      </div>
    </div>
    <div class="sport-card">
      <span class="sport-icon">🏊</span>
      <div class="sport-name">Schwimmen</div>
      <div class="sport-detail">
        <strong>Do &amp; Fr</strong><br>
        Mehrere Schwimmbäder<br>
        Leitung: P. Frauenrath &amp; J. Billen
      </div>
    </div>
  </div>
</section>
```

- [ ] **Im Browser prüfen** — 4 Karten nebeneinander auf dunklem Hintergrund

```bash
open /Volumes/2TB_external/Claude/ESV_Homepage/index.html
```

- [ ] **Commit**

```bash
git add index.html assets/style.css
git commit -m "feat: add sports section"
```

---

## Task 7: Vorstand-Sektion

**Files:**
- Modify: `index.html`
- Modify: `assets/style.css`

- [ ] **Vorstand-Styles in style.css ergänzen**

```css
/* ── Vorstand ── */
.vorstand {
  background: var(--light);
  padding: 80px 48px;
}
.vorstand-header {
  text-align: center;
  margin-bottom: 48px;
}
.vorstand-header .section-h2 { color: var(--text-on-light); }
.board-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 720px;
  margin: 0 auto;
}
.board-card {
  background: var(--white);
  padding: 36px 24px;
  text-align: center;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  border-bottom: 3px solid var(--gold);
}
.board-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 3px solid var(--gold);
  overflow: hidden;
  margin: 0 auto 18px;
}
.board-avatar img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center top;
}
.board-name {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-on-light);
  margin-bottom: 5px;
}
.board-role {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
}
@media (max-width: 600px) {
  .board-grid { grid-template-columns: 1fr; max-width: 280px; }
  .vorstand { padding: 60px 20px; }
}
```

- [ ] **Vorstand-Sektion in index.html einfügen** (nach Sportarten, vor Footer)

```html
<div class="cut-to-light"></div>

<section class="vorstand" id="vorstand">
  <div class="vorstand-header">
    <span class="section-eyebrow">Wer wir sind</span>
    <h2 class="section-h2">Unser Vorstand</h2>
  </div>
  <div class="board-grid">
    <div class="board-card">
      <div class="board-avatar">
        <img src="assets/vorsitz1.jpg" alt="Martin Langner">
      </div>
      <div class="board-name">Martin Langner</div>
      <div class="board-role">1. Vorsitzender</div>
    </div>
    <div class="board-card">
      <div class="board-avatar">
        <img src="assets/vorsitz2.jpg" alt="Dirk Michels">
      </div>
      <div class="board-name">Dirk Michels</div>
      <div class="board-role">2. Vorsitzender</div>
    </div>
    <div class="board-card">
      <div class="board-avatar">
        <img src="assets/gf.jpg" alt="Andreas Otten">
      </div>
      <div class="board-name">Andreas Otten</div>
      <div class="board-role">Geschäftsführer &amp; Kassenwart</div>
    </div>
  </div>
</section>
```

- [ ] **Im Browser prüfen** — 3 Karten mit Fotos auf hellem Hintergrund

```bash
open /Volumes/2TB_external/Claude/ESV_Homepage/index.html
```

- [ ] **Commit**

```bash
git add index.html assets/style.css
git commit -m "feat: add board section with photos"
```

---

## Task 8: Kontakt-Sektion & index.html abschließen

**Files:**
- Modify: `index.html`
- Modify: `assets/style.css`

- [ ] **Kontakt-Styles in style.css ergänzen**

```css
/* ── Kontakt ── */
.kontakt {
  background: var(--dark-2);
  padding: 80px 48px;
  text-align: center;
}
.kontakt .section-h2 { color: var(--white); font-size: 2rem; }
.kontakt-sub {
  font-size: 0.92rem;
  color: var(--text-muted-dark);
  margin-bottom: 30px;
  line-height: 1.75;
}
.kontakt-email {
  display: inline-block;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--gold);
  border-bottom: 2px solid var(--gold);
  padding-bottom: 3px;
  margin-bottom: 32px;
  transition: opacity 0.2s;
}
.kontakt-email:hover { opacity: 0.8; }
.kontakt-address {
  font-size: 0.82rem;
  color: #555;
  line-height: 2;
}
@media (max-width: 768px) {
  .kontakt { padding: 60px 20px; }
}
```

- [ ] **Kontakt-Sektion in index.html einfügen** (nach Vorstand, vor Footer-div)

```html
<div class="cut-to-dark-2"></div>

<section class="kontakt" id="kontakt">
  <span class="section-eyebrow">Kontakt</span>
  <h2 class="section-h2">So erreichen Sie uns</h2>
  <p class="kontakt-sub">Fragen, Anliegen oder Interesse an einer Mitgliedschaft?<br>Wir freuen uns über Ihre Nachricht.</p>
  <a href="mailto:vorstand@esv-aachen.de" class="kontakt-email">vorstand@esv-aachen.de</a>
  <div class="kontakt-address">
    Eisenbahner Sportverein Aachen 1922 e.V.<br>
    Kleinkölnstr. 17 · 52062 Aachen
  </div>
</section>
```

- [ ] **Vollständigen index.html-Aufbau prüfen** — alle Sektionen scrollen lückenlos ineinander über

```bash
open /Volumes/2TB_external/Claude/ESV_Homepage/index.html
```

Durch-scrollen und prüfen: Hero → Über uns → Sportarten → Vorstand → Kontakt → Footer. Alle diagonalen Schnitte sauber, keine weißen Lücken zwischen Sektionen.

- [ ] **Commit**

```bash
git add index.html assets/style.css
git commit -m "feat: add contact section, complete index page"
```

---

## Task 9: Satzungsseite (`satzung.html`)

**Files:**
- Create: `satzung.html`
- Modify: `assets/style.css`

- [ ] **Unterseiten-Styles in style.css ergänzen**

```css
/* ── Unterseiten (Satzung, Impressum, Datenschutz) ── */
.subpage-hero {
  background: var(--dark);
  padding: 60px 48px 50px;
  border-bottom: 3px solid var(--gold);
}
.subpage-hero h1 {
  font-size: 2.4rem;
  font-weight: 900;
  color: var(--white);
  margin-bottom: 6px;
}
.subpage-hero .sub-kicker {
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
}
.subpage-content {
  background: var(--light);
  padding: 64px 48px 80px;
  max-width: 860px;
  margin: 0 auto;
}
.subpage-content h2 {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-on-light);
  margin: 36px 0 10px;
  padding-bottom: 6px;
  border-bottom: 2px solid var(--gold);
}
.subpage-content h2:first-child { margin-top: 0; }
.subpage-content p {
  font-size: 0.88rem;
  line-height: 1.85;
  color: var(--text-muted-light);
  margin-bottom: 12px;
}
.subpage-content ul {
  padding-left: 20px;
  margin-bottom: 12px;
}
.subpage-content li {
  font-size: 0.88rem;
  line-height: 1.85;
  color: var(--text-muted-light);
  margin-bottom: 4px;
}
.satzung-meta {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid #ddd;
  font-size: 0.75rem;
  color: #999;
  line-height: 1.8;
}
@media (max-width: 768px) {
  .subpage-hero { padding: 48px 20px 40px; }
  .subpage-content { padding: 48px 20px 60px; }
}
```

- [ ] **satzung.html erstellen**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Satzung – ESV Aachen 1922 e.V.</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

<div id="site-nav"></div>

<div style="background:var(--dark);">
  <div class="subpage-hero">
    <div class="sub-kicker">ESV Aachen 1922 e.V.</div>
    <h1>Satzung</h1>
  </div>
</div>

<div style="background:var(--light);">
  <div class="subpage-content">

    <h2>§ 1 Name, Sitz und Zweck</h2>
    <p>Der Verein führt den Namen „Eisenbahner-Sportverein Aachen 1922 e.V." mit Sitz in Aachen und ist im Vereinsregister eingetragen. Sein Zweck ist die Förderung des Sports und der sportlichen Jugendhilfe für Eisenbahner, deren Angehörige und andere Sportinteressierte. Der Verein arbeitet gemeinnützig und richtet alle Mittel ausschließlich auf satzungsmäßige Zwecke aus, ohne Mitgliedern finanzielle Vorteile zu verschaffen.</p>
    <p>Für besondere Leistungen können jährliche Ehrenamtspauschalen bis zu 840 € pro Mitglied gewährt werden, nach Ermessen des Vorstands.</p>

    <h2>§ 2 Erwerb der Mitgliedschaft</h2>
    <p>Jede natürliche Person kann durch schriftlichen Antrag an den Vorstand Mitglied werden. Minderjährige benötigen die Zustimmung der Erziehungsberechtigten. Die ersten 12 Monate gelten als Probezeit, in der der Vorstand die Mitgliedschaft formlos ohne Begründung beenden kann. Der Verein kennt drei Mitgliedschaftsarten: aktive Mitglieder, inaktive Mitglieder und Ehrenmitglieder. Die Ehrenmitgliedschaft setzt 60 Jahre Mitgliedschaft voraus oder kann für herausragende Verdienste durch Vorstandsbeschluss oder Antrag der Mitgliederversammlung verliehen werden.</p>

    <h2>§ 3 Verlust der Mitgliedschaft</h2>
    <p>Die Mitgliedschaft endet durch Austritt, Tod oder Ausschluss. Der Austritt ist dem Vorstand in Textform (E-Mail) zu erklären und wirkt zum Ende der laufenden Abrechnungsperiode. Der Vorstand kann Mitglieder ausschließen bei Verletzung satzungsmäßiger Pflichten, dreimonatigem Zahlungsrückstand trotz Mahnung, schwerwiegendem Fehlverhalten, Missachtung von Sicherheitsregeln der Anlagen oder ehrenrührigem Verhalten. Mitglieder können den Ausschluss innerhalb von zwei Wochen anfechten, indem sie die Überprüfung durch die Mitgliederversammlung beantragen.</p>

    <h2>§ 4 Beiträge</h2>
    <p>Die Mitgliedsbeiträge variieren je nach Abteilung. Die Jahresbeiträge sind im ersten Quartal fällig; Zahlungsvereinbarungen können mit dem Vorstand getroffen werden. Die Mitgliederversammlung legt die Beitragshöhe fest. Mitglieder erhalten keine Gewinnausschüttungen oder sonstige Vergütungen aus Vereinsmitteln.</p>

    <h2>§ 5 Vereinsorgane</h2>
    <p>Der Verein besteht aus drei Organen: der Mitgliederversammlung, dem Mitarbeiterkreis und dem Vorstand.</p>

    <h2>§ 6 Mitgliederversammlung</h2>
    <p>Die Mitgliederversammlung ist das höchste Organ und tritt jährlich im März zusammen. Außerordentliche Versammlungen finden bei Bedarf oder auf schriftlichen Antrag eines Zehntels der Mitglieder statt. Der Vorstand lädt mindestens zwei Wochen vorher per E-Mail unter Angabe von Ort, Zeit und Tagesordnung ein. Pflichttagesordnungspunkte sind Vorstandsberichte, Jahresabschluss, Entlastungsvoten, Wahlen und eingereichte Anträge.</p>
    <p>Die Versammlung ist unabhängig von der Teilnehmerzahl beschlussfähig. Den Vorsitz führt der 1. Vorsitzende. Mitglieder ab 18 Jahren haben je eine Stimme, ausschließlich persönlich. Beschlüsse werden mit einfacher Mehrheit gefasst; Satzungsänderungen erfordern Dreiviertelmehrheit. Änderungen des Vereinszwecks bedürfen der Einstimmigkeit einschließlich schriftlicher Zustimmung abwesender Mitglieder. Anträge zu nicht auf der Tagesordnung stehenden Punkten müssen mindestens acht Tage vor der Versammlung eingereicht oder als Dringlichkeitsanträge mit Dreiviertelmehrheit angenommen werden.</p>

    <h2>§ 7 Mitarbeiterkreis</h2>
    <p>Dem Mitarbeiterkreis gehören Vorstand, Abteilungsleiter, Trainer und Kassenprüfer an.</p>

    <h2>§ 8 Vorstand</h2>
    <p>Der Vorstand besteht aus dem 1. Vorsitzenden, dem 2. Vorsitzenden, dem Geschäftsführer (gleichzeitig stellvertretender 2. Vorsitzender) und dem Kassenwart. Der Geschäftsführer darf das Amt des Kassenwartes in Personalunion bekleiden. Abteilungsleiter werden von ihren Abteilungen nominiert und vom Vorstand bestätigt. Der 1. Vorsitzende und ein Stellvertreter vertreten den Verein gemeinsam rechtlich und nach außen. Vorstandsmitglieder werden von der Mitgliederversammlung gewählt und müssen mindestens 18 Jahre alt sein. Vakanzen werden bis zur nächsten Wahl durch Vorstandsbeschluss überbrückt. Wahlen erfolgen geheim; bei Einzelkandidaturen ist offene Abstimmung zulässig. Gewählt ist, wer die relative Mehrheit erhält. Vorstandssitzungen finden nach Bedarf oder auf schriftlichen Antrag statt; zwei Mitglieder bilden ein Quorum; Beschlüsse werden mit einfacher Mehrheit gefasst, bei Stimmengleichheit entscheidet der 1. Vorsitzende.</p>

    <h2>§ 9 Geschäftsführung</h2>
    <p>Gerichtsstand ist Aachen. Das Geschäftsjahr entspricht dem Kalenderjahr. Über alle Sitzungen ist ein Protokoll anzufertigen, das Schriftführer und Vorsitzender innerhalb von 14 Tagen unterzeichnen. Die Mitgliederversammlung bestellt zwei Kassenprüfer, die nicht dem Vorstand angehören dürfen. Die Kassenprüfer legen der Versammlung ihren Bericht vor; eine unmittelbare Wiederwahl ist einmalig zulässig.</p>

    <h2>§ 10 Auflösung</h2>
    <p>Die Auflösung des Vereins bedarf der Zustimmung der Mitgliederversammlung mit Dreiviertelmehrheit. Bei Auflösung fällt das gesamte Vereinsvermögen an den „Verband deutscher Eisenbahner-Sportvereine" zur ausschließlichen gemeinnützigen Verwendung.</p>

    <div class="satzung-meta">
      Zuletzt geändert: 12. März 2025<br>
      Frühere Änderungen: 20.04.1959 · 09.03.1961 · 26.03.1979 · 20.03.1980 · 26.03.1981 · 27.03.1984 · 03.03.1986 · 30.03.1994 · 29.03.1995 · 17.03.2010 · 23.03.2016 · 22.05.2024 · 12.03.2025
    </div>

  </div>
</div>

<div id="site-footer"></div>
<script src="assets/nav.js"></script>
</body>
</html>
```

- [ ] **Im Browser prüfen**

```bash
open /Volumes/2TB_external/Claude/ESV_Homepage/satzung.html
```

Erwartetes Bild: Dunkle Überschriftsleiste mit „Satzung", dann heller Inhaltsbereich mit allen Paragraphen, §-Zwischenüberschriften mit goldener Linie.

- [ ] **Commit**

```bash
git add satzung.html assets/style.css
git commit -m "feat: add Satzung page"
```

---

## Task 10: Impressum & Datenschutz

**Files:**
- Create: `impressum.html`
- Create: `datenschutz.html`

- [ ] **impressum.html erstellen**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Impressum – ESV Aachen 1922 e.V.</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

<div id="site-nav"></div>

<div style="background:var(--dark);">
  <div class="subpage-hero">
    <div class="sub-kicker">ESV Aachen 1922 e.V.</div>
    <h1>Impressum</h1>
  </div>
</div>

<div style="background:var(--light);">
  <div class="subpage-content">
    <h2>Angaben gemäß § 5 TMG</h2>
    <p>
      Eisenbahner Sportverein Aachen 1922 e.V.<br>
      Kleinkölnstr. 17<br>
      52062 Aachen
    </p>

    <h2>Vertreten durch</h2>
    <p>
      Martin Langner (1. Vorsitzender)<br>
      Dirk Michels (2. Vorsitzender)
    </p>

    <h2>Kontakt</h2>
    <p>E-Mail: <a href="mailto:vorstand@esv-aachen.de" style="color:var(--gold)">vorstand@esv-aachen.de</a></p>

    <h2>Registereintrag</h2>
    <p>Eingetragen im Vereinsregister beim Amtsgericht Aachen.</p>

    <h2>Haftungsausschluss</h2>
    <p>Für externe Links übernimmt der Verein keine Haftung. Die Inhalte verknüpfter Seiten liegen ausschließlich im Verantwortungsbereich der jeweiligen Betreiber.</p>
  </div>
</div>

<div id="site-footer"></div>
<script src="assets/nav.js"></script>
</body>
</html>
```

- [ ] **datenschutz.html erstellen**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Datenschutz – ESV Aachen 1922 e.V.</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

<div id="site-nav"></div>

<div style="background:var(--dark);">
  <div class="subpage-hero">
    <div class="sub-kicker">ESV Aachen 1922 e.V.</div>
    <h1>Datenschutzerklärung</h1>
  </div>
</div>

<div style="background:var(--light);">
  <div class="subpage-content">
    <h2>1. Verantwortlicher</h2>
    <p>Eisenbahner Sportverein Aachen 1922 e.V., Kleinkölnstr. 17, 52062 Aachen<br>
    E-Mail: <a href="mailto:vorstand@esv-aachen.de" style="color:var(--gold)">vorstand@esv-aachen.de</a></p>

    <h2>2. Erhebung und Verarbeitung personenbezogener Daten</h2>
    <p>Diese Website erhebt und verarbeitet keine personenbezogenen Daten über Besucher. Es werden keine Tracking-Cookies, Analyse-Tools oder Werbenetzwerke eingesetzt.</p>
    <p>Beim Aufruf dieser Website werden durch den Hosting-Anbieter technische Zugriffsdaten (IP-Adresse, Zeitstempel, aufgerufene Seite) in Server-Logfiles gespeichert. Diese Daten werden nicht mit anderen Daten zusammengeführt und nach spätestens 7 Tagen gelöscht.</p>

    <h2>3. Externe Links und Bilder</h2>
    <p>Diese Website enthält Bilder von Unsplash (unsplash.com). Beim Laden dieser Bilder kann Unsplash Ihre IP-Adresse verarbeiten. Weitere Informationen finden Sie in der Datenschutzerklärung von Unsplash.</p>

    <h2>4. Ihre Rechte</h2>
    <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit. Wenden Sie sich hierfür an: <a href="mailto:vorstand@esv-aachen.de" style="color:var(--gold)">vorstand@esv-aachen.de</a></p>

    <h2>5. Beschwerderecht</h2>
    <p>Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren. Zuständig ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW).</p>
  </div>
</div>

<div id="site-footer"></div>
<script src="assets/nav.js"></script>
</body>
</html>
```

- [ ] **Beide Seiten im Browser prüfen**

```bash
open /Volumes/2TB_external/Claude/ESV_Homepage/impressum.html
open /Volumes/2TB_external/Claude/ESV_Homepage/datenschutz.html
```

- [ ] **Commit**

```bash
git add impressum.html datenschutz.html
git commit -m "feat: add Impressum and Datenschutz pages"
```

---

## Task 11: Abschluss-QA & finale Prüfung

**Files:**
- Modify: ggf. `assets/style.css`, `index.html`, Unterseiten

- [ ] **Alle Seiten im Browser prüfen – Checkliste**

```bash
open /Volumes/2TB_external/Claude/ESV_Homepage/index.html
```

Prüfen:
- [ ] Sticky Nav bleibt beim Scrollen oben sichtbar
- [ ] Alle Anker-Links in der Nav (Sportarten, Vorstand, Kontakt) springen zu den richtigen Sektionen
- [ ] Alle diagonalen Schnitte zwischen Sektionen sind nahtlos (keine weißen Lücken)
- [ ] Vorstandsfotos werden korrekt angezeigt (rund, goldener Rand)
- [ ] Sportarten-Links (schiessen.esv-aachen.de, fupa.net) öffnen in neuem Tab
- [ ] E-Mail-Link öffnet Mail-Client
- [ ] Logo in Nav und Footer sichtbar und korrekt skaliert
- [ ] „Satzung"-Link in Nav öffnet satzung.html korrekt
- [ ] Auf satzung.html → Nav-Links gehen zurück zu index.html#sportarten etc.

- [ ] **Mobile-Ansicht prüfen** (Browser DevTools → iPhone-Ansicht)

Prüfen:
- [ ] Navigation bricht sauber um
- [ ] Sportarten-Grid wechselt auf 2 Spalten (768px) bzw. 1 Spalte (480px)
- [ ] Vorstand-Grid wechselt auf 1 Spalte
- [ ] Texte lesbar, Abstände angemessen
- [ ] Hero-Kennzahlen erscheinen unterhalb des Hero-Textes (nicht darüber)

- [ ] **Abschluss-Commit**

```bash
git add -A
git commit -m "feat: complete ESV Aachen homepage"
```
