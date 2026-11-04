// First visit from elsewhere: the visitor's own language. No cookies; ?lang=en stays in English.
(function () {
  try {
    if (location.search.indexOf('lang=en') > -1) return;
    var r = document.referrer;
    if (r && new URL(r).hostname === location.hostname) return;
    var l = (navigator.language || '').toLowerCase();
    if (l.indexOf('pt') === 0) location.replace('pt/');
    else if (l.indexOf('es') === 0) location.replace('es/');
  } catch (e) {}
})();
