// Saurora: the moving first screen, the animal picker and the picture viewer. No cookies, no tracking.
(function () {
  // the first screen moves unless the player asked for less motion or less data
  var hero = document.querySelector('.hero video');
  if (hero) {
    var still = matchMedia('(prefers-reduced-motion: reduce)').matches ||
      (navigator.connection && navigator.connection.saveData);
    if (!still) {
      hero.src = hero.dataset.src;
      var p = hero.play();
      if (p && p.catch) p.catch(function () {});
    }
  }

  // the animal picker: one button per animal, arrow keys move between them
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.names button'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.stage [role=tabpanel]'));
  function pick(i, focus) {
    tabs.forEach(function (t, k) {
      var on = k === i;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panels[k].hidden = !on;
    });
    if (focus) tabs[i].focus();
    var rail = tabs[i].parentNode;
    if (rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: tabs[i].offsetLeft - (rail.clientWidth - tabs[i].offsetWidth) / 2, behavior: 'smooth' });
    }
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(i); });
    t.addEventListener('keydown', function (e) {
      var d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (d) { e.preventDefault(); pick((i + d + tabs.length) % tabs.length, true); }
    });
  });
  if (tabs.length) {
    pick(0);
    // load the other animals when the picker comes near, so a click shows them at once
    if ('IntersectionObserver' in window) {
      var seen = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        seen.disconnect();
        panels.forEach(function (panel) { var im = panel.querySelector('img'); if (im) im.loading = 'eager'; });
      }, { rootMargin: '400px' });
      seen.observe(document.querySelector('.picker'));
    }
  }

  // the picture viewer
  var view = document.querySelector('dialog.view');
  if (view && view.showModal) {
    var big = view.querySelector('img');
    document.querySelectorAll('.grid a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        big.src = a.href;
        big.alt = a.querySelector('img').alt;
        view.showModal();
      });
    });
    view.addEventListener('click', function () { view.close(); });
  }
})();
