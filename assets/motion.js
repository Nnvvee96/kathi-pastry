/* ============================================================
   Katie's Pastry — motion layer
   intro curtain · header condense · fly-to-cart
   (filter animation lives in app.js; ambient/hover are CSS)
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- intro curtain (plays on every full load) ---------- */
  var intro = document.getElementById('intro');
  if (intro) {
    if (reduce) {
      intro.classList.add('skip');
    } else {
      var root = document.documentElement;
      root.style.overflow = 'hidden';
      var unlock = function () { root.style.overflow = ''; };
      intro.addEventListener('animationend', function (e) {
        if (e.animationName === 'introOut') { intro.style.display = 'none'; unlock(); }
      });
      // failsafe: never trap scroll if the animation event is missed
      setTimeout(function () { intro.style.display = 'none'; unlock(); }, 3200);
    }
  }

  /* ---------- header condense ---------- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- about scroll-story: line fills with scroll ---------- */
  var timeline = document.getElementById('timeline');
  var storyFill = document.getElementById('storyFill');
  if (timeline && storyFill) {
    var fillStory = function () {
      var r = timeline.getBoundingClientRect();
      var vh = window.innerHeight || 800;
      var readLine = vh * 0.55;
      var p = (readLine - r.top) / (r.height || 1);
      p = Math.max(0, Math.min(1, p));
      storyFill.style.height = (p * 100) + '%';
    };
    fillStory();
    window.addEventListener('scroll', fillStory, { passive: true });
    window.addEventListener('resize', fillStory);
  }

  /* ---------- fly-to-cart ---------- */
  var grid = document.getElementById('productGrid');
  var cartBtn = document.getElementById('openCart');
  if (grid && cartBtn && !reduce) {
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('[data-add]');
      if (!b) return;
      var card = b.closest('.product');
      if (!card) return;
      var slot = card.querySelector('image-slot');
      var src = null;
      try {
        var im = slot && slot.shadowRoot ? slot.shadowRoot.querySelector('.frame img') : null;
        if (im && im.src && /^https?:|^data:/.test(im.src) && im.style.display !== 'none') src = im.src;
      } catch (err) {}

      var ref = (slot || card).getBoundingClientRect();
      var dest = cartBtn.getBoundingClientRect();
      var size = Math.min(78, ref.width * 0.7) || 70;

      var f = document.createElement('div');
      f.className = 'fly-img';
      f.style.width = size + 'px';
      f.style.height = size + 'px';
      if (src) f.style.backgroundImage = 'url("' + src + '")';
      else { f.style.background = 'var(--berry)'; }

      var x0 = ref.left + ref.width / 2 - size / 2;
      var y0 = ref.top + ref.height / 2 - size / 2;
      var x1 = dest.left + dest.width / 2 - size / 2;
      var y1 = dest.top + dest.height / 2 - size / 2;
      var apexY = Math.min(y0, y1) - 90;

      document.body.appendChild(f);
      var anim = f.animate([
        { transform: 'translate(' + x0 + 'px,' + y0 + 'px) scale(1)', opacity: 1, borderRadius: '12px', offset: 0 },
        { transform: 'translate(' + ((x0 + x1) / 2) + 'px,' + apexY + 'px) scale(.66)', opacity: 1, offset: .55 },
        { transform: 'translate(' + x1 + 'px,' + y1 + 'px) scale(.16)', opacity: .25, borderRadius: '50%', offset: 1 }
      ], { duration: 720, easing: 'cubic-bezier(.5,0,.7,.4)', fill: 'forwards' });

      var done = function () {
        f.remove();
        cartBtn.classList.remove('pulse');
        void cartBtn.offsetWidth;
        cartBtn.classList.add('pulse');
        setTimeout(function () { cartBtn.classList.remove('pulse'); }, 560);
      };
      if (anim && anim.finished) anim.finished.then(done).catch(done);
      else { anim.onfinish = done; setTimeout(done, 780); }
    });
  }
})();
