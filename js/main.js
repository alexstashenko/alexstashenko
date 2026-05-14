// Nav: transparent over hero, solid elsewhere
(function () {
  var nav = document.querySelector('nav');
  if (!nav) return;
  var hero = document.querySelector('.hero');

  function update() {
    var solid = !hero || window.scrollY > 10;
    nav.classList.toggle('solid', solid);
    nav.classList.toggle('transparent', !solid);
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
})();

// Mobile menu
(function () {
  var btn = document.querySelector('.hamburger');
  var menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    menu.classList.toggle('open');
    btn.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();

// Series accordion
(function () {
  document.querySelectorAll('.series-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      toggle.closest('.series-item').classList.toggle('open');
    });
  });
})();

// Lightbox
(function () {
  var lb = document.getElementById('lightbox');
  if (!lb) return;

  var lbImg = lb.querySelector('.lb-img');
  var lbCounter = lb.querySelector('.lb-counter');
  var photos = [];
  var idx = 0;

  function openLb(list, i) {
    photos = list;
    idx = i;
    render();
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  function render() {
    lbImg.src = photos[idx].src;
    lbImg.alt = photos[idx].alt || '';
    lbCounter.textContent = (idx + 1) + ' / ' + photos.length;
  }

  function prev() { idx = (idx - 1 + photos.length) % photos.length; render(); }
  function next() { idx = (idx + 1) % photos.length; render(); }

  lb.querySelector('.lb-close').addEventListener('click', closeLb);
  lb.querySelector('.lb-prev').addEventListener('click', prev);
  lb.querySelector('.lb-next').addEventListener('click', next);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Touch swipe
  var tx = 0;
  lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
  });

  // Wire galleries — each .gallery-group is a set
  document.querySelectorAll('.gallery-group').forEach(function (group) {
    var imgs = Array.from(group.querySelectorAll('.photo-item img'));
    group.querySelectorAll('.photo-item').forEach(function (item, i) {
      item.addEventListener('click', function () { openLb(imgs, i); });
    });
  });
})();
