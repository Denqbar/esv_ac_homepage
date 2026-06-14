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
