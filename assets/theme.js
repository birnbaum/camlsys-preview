(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try {
    preference = localStorage.getItem('camlsys-theme');
  } catch (_) { /* System preference still works when storage is unavailable. */ }
  if (preference !== 'light' && preference !== 'dark') preference = null;

  function applyTheme() {
    const theme = preference || (system.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    const button = document.querySelector('.theme-toggle');
    if (button) {
      const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
      button.setAttribute('aria-label', label);
      button.title = label;
    }
  }

  applyTheme();
  system.addEventListener('change', applyTheme);
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.hidden = false;
    applyTheme();
    button.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('camlsys-theme', preference); } catch (_) {}
      applyTheme();
    });
  });
})();
