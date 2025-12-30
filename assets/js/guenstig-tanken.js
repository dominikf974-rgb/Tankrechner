(() => {
  const API_KEY = "DEIN_API_KEY_HIER"; // <- hier eintragen (unsicher)
  const $ = (id) => document.getElementById(id);

  const placeEl = $('gt-place');
  const radiusEl = $('gt-radius');
  const fuelEl = $('gt-fuel');
  const queryEl = $('gt-query');
  const listEl = $('gt-list');
  const statusEl = $('gt-status');

  const btnLocate = $('gt-locate');
  const btnLoad = $('gt-load');

  const map = L.map('gt-map').setView([51.1657, 10.4515], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  let userPos = null;
  let stations = [];

  function setStatus(t, err=false){
    statusEl.textContent = t || "";
    statusEl.style.color = err ? "#e53e3e" : "var(--muted)";
  }

  async function geocode(q){
    const url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(q);
    const res = await fetch(url);
    const data = await res.json();
    if(data?.length) return { lat:+data[0].lat, lng:+data[0].lon };
    return null;
  }

  function renderList(){
    const q = (queryEl.value || '').trim().toLowerCase();
    const filtered = q
      ? stations.filter(s => (s.name||'').toLowerCase().includes(q) || (s.brand||'').toLowerCase().includes(q))
      : stations;

    if(!filtered.length){
      listEl.innerHTML = "Keine Tankstellen gefunden.";
      return;
    }

    listEl.innerHTML = filtered.slice(0,30).map(s =>
      `<div style="padding:10px;border:1px solid rgba(0,0,0,.08);border-radius:10px;margin:8px 0;background:#fff">
        <b>${s.name}</b> (${s.brand || "-"})<br>
        Preis: <b>${s.price ?? "—"}</b> € | Distanz: ${s.dist?.toFixed(1) ?? "—"} km<br>
        ${s.street || ""} ${s.houseNumber || ""}, ${s.postCode || ""} ${s.place || ""}
      </div>`
    ).join('');
  }

  async function loadStations(lat, lng){
    const rad = Math.max(1, Math.min(25, Number(radiusEl.value) || 5));
    const fuel = fuelEl.value;

    const url = `https://creativecommons.tankerkoenig.de/json/list.php?lat=${lat}&lng=${lng}&rad=${rad}&sort=price&type=${fuel}&apikey=${API_KEY}`;

    setStatus("Lade Tankstellen…");
    const res = await fetch(url);
    const json = await res.json();

    if(!json.ok){
      setStatus("API Fehler: " + (json.message || "unknown"), true);
      return;
    }

    stations = json.stations || [];
    setStatus(`Gefunden: ${stations.length} Tankstellen`);
    renderList();
  }

  btnLocate.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        map.setView([userPos.lat, userPos.lng], 12);
        setStatus("Standort gesetzt. Jetzt „Tankstellen laden“.");
      },
      () => setStatus("Standort nicht verfügbar.", true),
      { enableHighAccuracy: true, timeout: 12000 }
    );
  });

  btnLoad.addEventListener('click', async () => {
    try{
      const place = (placeEl.value || '').trim();
      let lat, lng;

      if(place){
        const g = await geocode(place);
        if(!g){ setStatus("Ort nicht gefunden.", true); return; }
        lat = g.lat; lng = g.lng;
        map.setView([lat, lng], 12);
      } else if(userPos){
        lat = userPos.lat; lng = userPos.lng;
      } else {
        setStatus("Bitte Standort holen oder Ort eingeben.", true);
        return;
      }

      await loadStations(lat, lng);
    }catch(e){
      setStatus("Fehler: " + (e.message || "unknown"), true);
    }
  });

  queryEl.addEventListener('input', renderList);
})();
