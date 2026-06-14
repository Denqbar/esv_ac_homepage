(function () {
  const nav = `
<nav class="site-nav">
  <div class="logo">
    <a href="index.html"><img src="assets/logo.png" alt="ESV Aachen Logo"></a>
  </div>
  <button class="nav-burger" aria-label="Menü öffnen" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
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
    <a href="index.html"><img src="assets/logo.png" alt="ESV Aachen Logo"></a>
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

  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');

  burger.addEventListener('click', function () {
    const open = links.classList.toggle('open');
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
