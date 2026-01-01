(function () {
  // Base: auf GitHub Pages kein führender Slash, auf Domain schon ok
  const BASE = window.location.hostname.includes("github.io") ? "" : "/";

  const HEADER_URL = BASE + "assets/partials/header.html";
  const FOOTER_URL = BASE + "assets/partials/footer.html";

  function fetchWithTimeout(url, ms = 8000) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    return fetch(url, { cache: "no-store", signal: ctrl.signal })
      .finally(() => clearTimeout(t));
  }

  async function loadInto(id, url) {
    const el = document.getElementById(id);
    if (!el) return false;

    try {
      const res = await fetchWithTimeout(url, 8000);
      if (!res.ok) return false;
      el.innerHTML = await res.text();
      return true;
    } catch (e) {
      return false;
    }
  }

  function killStickyHard() {
    const wrap = document.getElementById("site-header");
    const hdr = wrap?.querySelector("header.site-header");
    if (!wrap || !hdr) return;

    // falls irgendwas den Header versteckt hat:
    wrap.style.display = "block";
    hdr.style.display = "block";

    [wrap, hdr].forEach(el => {
      el.style.setProperty("position", "static", "important");
      el.style.setProperty("top", "auto", "important");
      el.style.setProperty("bottom", "auto", "important");
      el.style.setProperty("left", "auto", "important");
      el.style.setProperty("right", "auto", "important");
      el.style.setProperty("inset", "auto", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("z-index", "auto", "important");
    });

    hdr.classList.remove("sticky", "is-sticky", "fixed", "fixed-top", "sticky-top");
  }

  async function init() {
    // Header/Footer laden
    const results = await Promise.allSettled([
      loadInto("site-header", HEADER_URL),
      loadInto("site-footer", FOOTER_URL),
    ]);

    // Sticky kill erst NACH dem Laden
    killStickyHard();
    requestAnimationFrame(killStickyHard);

    const wrap = document.getElementById("site-header");
    if (wrap) {
      const mo = new MutationObserver(() => killStickyHard());
      mo.observe(wrap, { subtree: true, attributes: true, attributeFilter: ["class", "style"] });
    }

    // Active Tab markieren (nachdem Header da ist)
    const page = document.body.getAttribute("data-page") || "home";
    document.querySelectorAll('.tablink[data-page]').forEach(a => {
      if (a.getAttribute("data-page") === page) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    // Wenn Header nicht geladen wurde: kleine Fehlermeldung anzeigen (damit du es siehst)
    const headerOk = results[0].status === "fulfilled" && results[0].value === true;
    if (!headerOk && wrap) {
      wrap.innerHTML = `<div style="padding:12px 16px;background:#fff;border-bottom:1px solid rgba(15,23,42,.1)">
        <b>Header konnte nicht geladen werden.</b> Prüfe Datei-Pfad: <code>${HEADER_URL}</code>
      </div>`;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
