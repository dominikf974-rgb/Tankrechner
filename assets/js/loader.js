(function () {
  const HEADER_URL = "/assets/partials/header.html";
  const FOOTER_URL = "/assets/partials/footer.html";

  function loadInto(id, url, onDone) {
    const el = document.getElementById(id);
    if (!el) return;

    fetch(url, { cache: "no-store" })
      .then(res => res.ok ? res.text() : Promise.reject(res.status))
      .then(html => {
        el.innerHTML = html;
        if (typeof onDone === "function") onDone();
      })
      .catch(() => {
        // KEIN Endlos-Laden, keine Blockade – nur leise failen
        // optional: kleine Meldung
        // el.innerHTML = "";
      });
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

    // wrapper + header + alle kinder killen (falls irgendwas fixed setzt)
    const all = [wrap, hdr, ...hdr.querySelectorAll("*")];
    all.forEach(el => {
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

  function observeHeader() {
    const wrap = document.getElementById("site-header");
    if (!wrap) return;
    const mo = new MutationObserver(() => killHeaderSticky());
    mo.observe(wrap, { subtree: true, attributes: true, attributeFilter: ["class", "style"] });
  }

  function init() {
    // Header laden -> danach active tab + sticky kill + observer
    loadInto("site-header", HEADER_URL, () => {
      setActiveTab();
      killHeaderSticky();
      requestAnimationFrame(killHeaderSticky);
      observeHeader();
    });

    // Footer laden (Banner hängt da drin)
    loadInto("site-footer", FOOTER_URL);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
