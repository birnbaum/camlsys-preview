(() => {
  const form = document.getElementById('alumni-search');
  if (!form) return;

  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/ł/g, 'l').replace(/ø/g, 'o').replace(/ß/g, 'ss')
    .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const query = form.querySelector('input');
  const buttons = [...form.querySelectorAll('[data-filter]')];
  const entries = [...document.querySelectorAll('#alumni-list .person')].map(element => ({
    element,
    category: element.dataset.category,
    review: element.dataset.review === 'true',
    text: normalize(['h3', '.alumni-role', '.alumni-destination']
      .map(selector => element.querySelector(selector)?.textContent || '').join(' '))
  }));
  let selected = 'all';

  function filter(syncURL = true) {
    const terms = normalize(query.value).split(' ').filter(Boolean);
    let count = 0;
    entries.forEach(entry => {
      const categoryMatch = selected === 'all' || (selected === 'review' ? entry.review : entry.category === selected);
      const match = categoryMatch && terms.every(term => entry.text.includes(term));
      entry.element.hidden = !match;
      if (match) count += 1;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
    document.getElementById('alumni-count').textContent = `${count} of ${entries.length} alumni`;
    document.getElementById('alumni-empty').hidden = count !== 0;
    if (syncURL) {
      const url = new URL(location.href);
      if (query.value) url.searchParams.set('alumni-q', query.value);
      else url.searchParams.delete('alumni-q');
      if (selected !== 'all') url.searchParams.set('alumni-filter', selected);
      else url.searchParams.delete('alumni-filter');
      if (url.href !== location.href) history.replaceState(null, '', url);
    }
  }

  function restore() {
    const params = new URLSearchParams(location.search);
    query.value = params.get('alumni-q') || '';
    const requested = params.get('alumni-filter');
    selected = buttons.some(button => button.dataset.filter === requested) ? requested : 'all';
    filter(false);
  }
  form.addEventListener('submit', event => event.preventDefault());
  query.addEventListener('input', () => filter());
  buttons.forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.filter;
    filter();
  }));
  window.addEventListener('popstate', restore);
  restore();
  form.hidden = false;
})();
