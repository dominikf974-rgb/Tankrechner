async function inject(url, hostId) {
  const host = document.getElementById(hostId);
  if (!host) return;
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) return;
  host.innerHTML = await res.text();
}

function markActiveNav() {
  const active = document.body.getAttribute("data-page") || "home";
  document.querySelectorAll(".navbtn[data-page]").forEach(a => {
    a.classList.toggle("active", a.dataset.page === active);
  });
}

function setupMobileMenu() {
  const btn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".tabs");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await inject("/assets/partials/header.html", "site-header");
  await inject("/assets/partials/footer.html", "site-footer");
  markActiveNav();
  setupMobileMenu();
});
