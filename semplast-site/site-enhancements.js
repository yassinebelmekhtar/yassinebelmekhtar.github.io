(() => {
  const MAP_URL = "https://share.google/rnWDULLRXrN5Y6Ynk";
  const ADDRESS = "العسل العالية 2، حد السوالم";
  const EMBED_URL = "https://www.google.com/maps?q=" + encodeURIComponent(ADDRESS) + "&output=embed";

  function ensureFooterMap() {
    document.querySelectorAll("footer").forEach((footer) => {
      const address = [...footer.querySelectorAll("p")].find((item) =>
        item.textContent.includes("العسل العالية 2")
      );
      if (!address) return;
      const column = address.parentElement;
      if (column.querySelector(".footer-map-link")) return;
      const link = document.createElement("a");
      link.className = "footer-map-link";
      link.href = MAP_URL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "الموقع على Google Maps ↗";
      address.insertAdjacentElement("afterend", link);
    });
  }

  function ensureContactMap() {
    if (!/contact(?:\.html)?\/?$/.test(window.location.pathname)) return;
    const mapLink = [...document.querySelectorAll(`a[href="${MAP_URL}"]`)]
      .find((link) => !link.closest("footer"));
    if (!mapLink) return;
    const card = mapLink.parentElement;
    if (card.querySelector(".contact-map")) return;

    const iframe = document.createElement("iframe");
    iframe.className = "contact-map";
    iframe.title = "Localisation SEHIMPLAST SARL AU — " + ADDRESS;
    iframe.src = EMBED_URL;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.setAttribute("allowfullscreen", "");
    mapLink.insertAdjacentElement("beforebegin", iframe);
  }

  function enhance() {
    ensureFooterMap();
    ensureContactMap();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhance, { once: true });
  } else {
    enhance();
  }
  window.addEventListener("load", enhance, { once: true });
  const observer = new MutationObserver(enhance);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 5000);
})();
