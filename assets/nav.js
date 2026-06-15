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
