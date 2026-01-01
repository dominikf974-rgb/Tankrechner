(function () {
  const HEADER_URL = "/assets/partials/header.html";
  const FOOTER_URL = "/assets/partials/footer.html";

  function fetchWithTimeout(url, ms = 7000) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    return fetch(url, { cache: "no-store", signal: ctrl.signal })
      .finally(() => clearTimeout(t));
  }

  async function loadInto(id, url, placeholderHtml) {
    const el = document.getElementById(id);
    if (!el) return false;

    if (placeholderHtml) el.innerHTML = placeholderHtml;

    try {
      const res = await fetchWithTimeout(url, 7000);
      if (!res.ok) return false;
      el.innerHTML = await res.text();
      return true;
    } catch (e) {
      return false;
    }
  }

  function setActiveTab() {
    const page = document.body.getAttribute("data-page") || "home";
    document.querySelectorAll('.tablink[data-page]').forEach(a => {
      if (a.getAttribute("data-page") === page) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function killHeaderSticky() {
    const wrap = document.getElementById("site-header");
    const hdr = wrap?.querySelector("header.site-header");
    if (!wrap || !hdr) return;

    // wrapper + header
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

    // IMPORTANT: auch alle Kinder (header-inner, nav, etc.)
    hdr.querySelectorAll("*").forEach(el => {
      el.style.setProperty("position", "static", "important");
      el.style.setProperty("top", "auto", "important");
      el.style.setProperty("bottom", "auto", "important");
      el.style.setProperty("left", "auto", "important");
      el.style.setProperty("right", "auto", "important");
      el.style.setProperty("inset", "auto", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("z-index", "auto", "important");
    });

    // sticky/fixed klassen kill
    hdr.classList.remove("sticky", "is-sticky", "fixed", "fixed-top", "sticky-top");
  }

  async function init() {
    // Debug Platzhalter (optional, hilft ohne F12)
    const headerPlaceholder =
      `<div style="padding:10px 14px;background:#fff;border-bottom:1px solid #eee">Header lädt…</div>`;
    const footerPlaceholder =
      `<div style="padding:10px 14px;background:#fff;border-top:1px solid #eee">Footer lädt…</div>`;

    const [hOk, fOk] = await Promise.all([
      loadInto("site-header", HEADER_URL, headerPlaceholder),
      loadInto("site-footer", FOOTER_URL, footerPlaceholder),
    ]);

    if (!hOk) {
      const wrap = document.getElementById("site-header");
      if (wrap) wrap.innerHTML =
        `<div style="padding:12px 14px;background:#fff;border-bottom:1px solid #eee">
          <b>Header konnte nicht geladen werden.</b><br>Pfad: <code>${HEADER_URL}</code>
        </div>`;
    }

    if (!fOk) {
      const wrap = document.getElementById("site-footer");
      if (wrap) wrap.innerHTML =
        `<div style="padding:12px 14px;background:#fff;border-top:1px solid #eee">
          <b>Footer konnte nicht geladen werden.</b><br>Pfad: <code>${FOOTER_URL}</code>
        </div>`;
    }

    // Active Tab erst nach Header laden
    setActiveTab();

    // Header sticky kill (sofort + next frame)
    killHeaderSticky();
    requestAnimationFrame(killHeaderSticky);

    // Beobachte nur den Headerbereich (leicht, kein Interval)
    const wrap = document.getElementById("site-header");
    if (wrap) {
      const mo = new MutationObserver(() => killHeaderSticky());
      mo.observe(wrap, { subtree: true, attributes: true, attributeFilter: ["class", "style"] });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
