(() => {
  const controls = document.getElementById('alumni-controls');
  if (!controls) return;

  const buttons = [...controls.querySelectorAll('[data-filter]')];
  const entries = [...document.querySelectorAll('#alumni-list .person')].map(element => ({
    element,
    category: element.dataset.category,
    review: element.dataset.review === 'true'
  }));
  let selected = 'all';

  function filter(syncURL = true) {
    let count = 0;
    entries.forEach(entry => {
      const match = selected === 'all' || (selected === 'review' ? entry.review : entry.category === selected);
      entry.element.hidden = !match;
      if (match) count += 1;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
    document.getElementById('alumni-count').textContent = `${count} of ${entries.length} alumni`;
    document.getElementById('alumni-empty').hidden = count !== 0;
    if (syncURL) {
      const url = new URL(location.href);
      url.searchParams.delete('alumni-q');
      if (selected !== 'all') url.searchParams.set('alumni-filter', selected);
      else url.searchParams.delete('alumni-filter');
      if (url.href !== location.href) history.replaceState(null, '', url);
    }
  }

  function restore() {
    const params = new URLSearchParams(location.search);
    const requested = params.get('alumni-filter');
    selected = buttons.some(button => button.dataset.filter === requested) ? requested : 'all';
    filter();
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.filter;
    filter();
  }));
  window.addEventListener('popstate', restore);
  restore();
  controls.hidden = false;
})();
