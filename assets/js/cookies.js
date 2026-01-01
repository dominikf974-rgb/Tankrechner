(() => {
  const KEY = "consent_marketing";

    // Reset per URL: /?resetconsent=1
  try{
    const p = new URLSearchParams(location.search);
    if(p.get("resetconsent") === "1"){
      localStorage.removeItem(KEY);
      localStorage.removeItem("cookie-consent");
      localStorage.removeItem("consent_ads_v1");
    }
  }catch(e){}


  function loadAdsOnce({ npa } = { npa: false }) {
    if (window.__adsLoaded) return;
    window.__adsLoaded = true;

    // Non-personalized Ads Flag VOR dem Laden setzen
    if (npa) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.requestNonPersonalizedAds = 1;
    }

    const s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4852698472752437";
    document.head.appendChild(s);

    s.onload = () => {
      try {
        document.querySelectorAll("ins.adsbygoogle").forEach(() => {
          try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
        });
      } catch (e) {}
    };
  }

  function init() {
    const banner = document.getElementById("cookieBanner");
    if (!banner) return setTimeout(init, 300); // footer wird evtl. nachgeladen

    const btnAccept = document.getElementById("cookieAccept");
    const btnReject = document.getElementById("cookieReject");
    if (!btnAccept || !btnReject) return;

    let consent = null;
    try { consent = localStorage.getItem(KEY); } catch (e) {}

    // bereits entschieden:
    if (consent === "1") {
      banner.classList.add("is-hidden");
      loadAdsOnce({ npa: false });
      return;
    }
    if (consent === "0") {
      banner.classList.add("is-hidden");
      loadAdsOnce({ npa: true });
      return;
    }

    // noch keine Entscheidung
    banner.classList.remove("is-hidden");

    btnAccept.onclick = () => {
      try { localStorage.setItem(KEY, "1"); } catch (e) {}
      banner.classList.add("is-hidden");
      loadAdsOnce({ npa: false });
    };

    btnReject.onclick = () => {
      try { localStorage.setItem(KEY, "0"); } catch (e) {}
      banner.classList.add("is-hidden");
      loadAdsOnce({ npa: true });
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
