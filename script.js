// Цвета и значки синхронизированы с ENJIGIRLING, ключ localStorage — theme.
(() => {
  'use strict';
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  const meta = document.querySelector('meta[name="theme-color"]');
  const key = 'theme';

  function apply(isDark) {
    root.classList.toggle('theme-dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
    toggle.textContent = isDark ? '☀' : '☾';
    toggle.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить тёмную тему');
    toggle.setAttribute('title', isDark ? 'Светлая тема' : 'Тёмная тема');
    toggle.setAttribute('aria-pressed', String(isDark));
    if (meta) meta.setAttribute('content', isDark ? '#101010' : '#ffffff');
  }

  apply(root.classList.contains('theme-dark'));
  toggle.addEventListener('click', () => {
    const next = !root.classList.contains('theme-dark');
    apply(next);
    try { localStorage.setItem(key, next ? 'dark' : 'light'); }
    catch (_) { /* В приватном режиме сайт продолжает работать. */ }
  });
})();
