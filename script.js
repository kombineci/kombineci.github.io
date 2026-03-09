(function () {
  'use strict';

  // ─────────────────────────────────────────
  // Mobile Menu
  // ─────────────────────────────────────────
  var menuToggle = document.getElementById('menuToggle');
  var navLinks   = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', function (e) {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ─────────────────────────────────────────
  // Smooth Scrolling
  // ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href.length <= 1) return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks)   navLinks.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ─────────────────────────────────────────
  // Back to Top
  // ─────────────────────────────────────────
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─────────────────────────────────────────
  // Show More / Less Toggle
  // ─────────────────────────────────────────
  document.querySelectorAll('.show-more-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      var targetId      = this.getAttribute('data-target');
      var targetContent = document.getElementById(targetId);
      if (!targetContent) return;
      var isActive = targetContent.classList.toggle('active');
      this.textContent = isActive ? 'Kısalt' : 'Tümünü Göster';
    });
  });

  // ─────────────────────────────────────────
  // Year Update
  // ─────────────────────────────────────────
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─────────────────────────────────────────
  // Çerez Onay Sistemi
  // ─────────────────────────────────────────
  var COOKIE_KEY = 'komb_cookie_consent';

  var banner       = document.getElementById('cookieBanner');
  var modal        = document.getElementById('cookieModal');
  var btnAccept    = document.getElementById('cookieAccept');
  var btnReject    = document.getElementById('cookieReject');
  var btnManage    = document.getElementById('cookieManage');
  var btnSave      = document.getElementById('cookieSave');
  var btnMClose    = document.getElementById('cookieModalClose');
  var footerBtn    = document.getElementById('footerCookieBtn');
  var funcCheck    = document.getElementById('funcCookie');
  var analyticsChk = document.getElementById('analyticsCookie');

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(COOKIE_KEY)); } catch(e) { return null; }
  }

  function saveConsent(functional, analytics) {
    var prefs = { functional: functional, analytics: analytics, ts: Date.now() };
    try { localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs)); } catch(e) {}
    hideBanner();
    hideModal();
    applyConsent(prefs);
  }

  function applyConsent(prefs) {
    // Analiz/işlevsel çerezleri yalnızca onay verilmişse yükle
    // İleride Firebase Analytics veya benzeri araç eklenirse burada aktif edilebilir.
    if (prefs && prefs.analytics) {
      // analytics araçları buraya
    }
  }

  function hideBanner() {
    if (banner) { banner.classList.remove('visible'); }
  }

  function showBanner() {
    if (banner) { banner.classList.add('visible'); }
  }

  function hideModal() {
    if (modal) { modal.hidden = true; }
  }

  function showModal() {
    if (modal) {
      var prefs = getConsent();
      if (funcCheck)    funcCheck.checked    = prefs ? !!prefs.functional : false;
      if (analyticsChk) analyticsChk.checked = prefs ? !!prefs.analytics  : false;
      modal.hidden = false;
    }
  }

  // Banner başlangıç durumu
  var existing = getConsent();
  if (!existing) {
    showBanner();
  } else {
    applyConsent(existing);
  }

  if (btnAccept) {
    btnAccept.addEventListener('click', function () { saveConsent(true, true); });
  }
  if (btnReject) {
    btnReject.addEventListener('click', function () { saveConsent(false, false); });
  }
  if (btnManage) {
    btnManage.addEventListener('click', function () { showModal(); });
  }
  if (btnSave) {
    btnSave.addEventListener('click', function () {
      saveConsent(
        funcCheck    ? funcCheck.checked    : false,
        analyticsChk ? analyticsChk.checked : false
      );
    });
  }
  if (btnMClose) {
    btnMClose.addEventListener('click', hideModal);
  }
  if (footerBtn) {
    footerBtn.addEventListener('click', showModal);
  }

  // Sözleşme içindeki inline çerez butonu
  document.querySelectorAll('.inline-cookie-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      showModal();
    });
  });

  // Modal dışına tıklayınca kapat
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) hideModal();
    });
  }

})();
