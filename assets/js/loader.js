// Lade Header und Footer in die entsprechenden Divs
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    // Header laden
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');

    if (headerEl) {
      headerEl.innerHTML = `
        <nav>
          <div class="logo">
            <a href="/">Spritkosten-Rechner</a>
          </div>
          <ul class="nav-links">
            <li><a href="/faq.html">FAQ</a></li>
            <li><a href="/ratgeber.html">Ratgeber</a></li>
            <li><a href="/datenschutz.html">Datenschutz</a></li>
          </ul>
        </nav>
      `;
    }

    // Footer laden
    if (footerEl) {
      fetch('assets/partials/footer.html')
        .then(r => r.text())
        .then(html => { footerEl.innerHTML = html; })
        .catch(e => {
          console.warn('Footer konnte nicht geladen werden:', e);
          // Fallback Footer
          footerEl.innerHTML = `
            <div class="footer-grid">
              <div>
                <h4>Spritkosten-Rechner</h4>
                <p>Plane deine Fahrtkosten schnell und kostenlos.</p>
              </div>
              <div>
                <h4>Seiten</h4>
                <ul>
                  <li><a href="/faq.html">FAQ</a></li>
                  <li><a href="/ratgeber.html">Ratgeber</a></li>
                </ul>
              </div>
            </div>
          `;
        });
    }
  });
})();
