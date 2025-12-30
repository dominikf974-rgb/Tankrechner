(function(){
  const KEY = "consent_ads_v1"; // localStorage key

  function hasConsent(){
    return localStorage.getItem(KEY) === "yes";
  }
  function setConsent(val){
    localStorage.setItem(KEY, val ? "yes" : "no");
  }

  function ensureBanner(){
    if(document.getElementById("consentBanner")) return;

    const div = document.createElement("div");
    div.id = "consentBanner";
    div.innerHTML = `
      <div class="row">
        <div class="txt">
          🍪 Wir nutzen Werbung (Google AdSense), um den Rechner kostenlos anzubieten.
          Dafür können Cookies/ähnliche Technologien verwendet werden. Du kannst zustimmen oder ablehnen.
          <a href="/datenschutz.html">Mehr Infos</a>.
        </div>
        <div class="actions">
          <button class="btn secondary" id="consentNo" style="height:44px;min-width:140px">Ablehnen</button>
          <button class="btn" id="consentYes" style="height:44px;min-width:160px">Akzeptieren</button>
        </div>
      </div>
    `;
    document.body.appendChild(div);

    document.getElementById("consentYes").addEventListener("click", () => {
      setConsent(true);
      div.style.display = "none";
      loadAdsense();
    });
    document.getElementById("consentNo").addEventListener("click", () => {
      setConsent(false);
      div.style.display = "none";
    });
  }

  function showBannerIfNeeded(){
    ensureBanner();
    const banner = document.getElementById("consentBanner");
    if(!localStorage.getItem(KEY)) banner.style.display = "block";
  }

  // Loads AdSense only after consent
  function loadAdsense(){
    if(window.__adsenseLoaded) return;
    window.__adsenseLoaded = true;

    const client = document.documentElement.getAttribute("data-adsense-client");
    if(!client) return;

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    s.crossOrigin = "anonymous";
    s.onload = () => {
      // push all ad blocks
      document.querySelectorAll("ins.adsbygoogle").forEach(() => {
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e){}
      });
    };
    document.head.appendChild(s);
  }

  // Init on DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    if(hasConsent()) loadAdsense();
    else showBannerIfNeeded();
  });
})();
