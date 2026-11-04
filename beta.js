(function () {
  var buttons = document.querySelectorAll('.langs button');
  function show(lang) {
    ['en', 'pt', 'es'].forEach(function (l) { document.getElementById(l).hidden = lang !== l; });
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
  }
  buttons.forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.lang); }); });
  var asked = location.hash.slice(1), own = (navigator.language || '').toLowerCase().slice(0, 2);
  if (asked === 'en' || asked === 'pt' || asked === 'es') show(asked);
  else if (own === 'pt' || own === 'es') show(own);
})();
