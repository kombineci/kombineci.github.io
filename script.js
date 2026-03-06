/**
 * Kombineci: Biletini Devret - Main Script
 *
 * Tüm DOM etkileşimleri index.html içindeki inline <script> bloğunda
 * çalışmaktadır. Bu dosyayı harici olarak kullanmak isterseniz:
 *
 * 1. index.html'deki inline <script> bloğunu silin
 * 2. <head> içine şunu ekleyin: <script src="script.js" defer></script>
 */

(function () {
  'use strict';

  // --- Mobile Menu ---
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

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

  // --- Smooth Scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href.length <= 1) return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks) navLinks.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // --- Back to Top ---
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 400) {
          toTop.classList.add('visible');
        } else {
          toTop.classList.remove('visible');
        }
      },
      { passive: true }
    );

    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Show More / Less Toggle ---
  document.querySelectorAll('.show-more-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      var targetId = this.getAttribute('data-target');
      var targetContent = document.getElementById(targetId);
      if (!targetContent) return;
      var isActive = targetContent.classList.toggle('active');
      this.textContent = isActive ? 'Kısalt' : 'Tümünü Göster';
    });
  });

  // --- Year Update ---
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
