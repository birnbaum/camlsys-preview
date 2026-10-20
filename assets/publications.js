(() => {
  const form = document.getElementById('publication-search');
  if (!form) return;

  // Search the rendered collection; no separate index or network request is needed.
  const normalize = (value) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/ł/g, 'l').replace(/ø/g, 'o').replace(/ß/g, 'ss')
    .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const query = form.elements.namedItem('q');
  const papers = [...document.querySelectorAll('.publication-entry')].map((element) => ({
    element,
    year: element.dataset.year,
    text: normalize([
      element.querySelector('h3').textContent,
      element.querySelector('.authors').textContent,
      element.querySelector('.venue').textContent,
      element.querySelector('.publication-note')?.textContent || '',
      element.dataset.authors, element.dataset.venue, element.dataset.articleTitle
    ].join(' '))
  }));
  const sections = [...document.querySelectorAll('.publication-year')];
  const yearLinks = [...document.querySelectorAll('.year-nav a')];
  const navigation = document.querySelector('.year-nav');
  const count = document.getElementById('publication-count');
  const empty = document.getElementById('publication-empty');
  function filter(syncURL = true) {
    const terms = normalize(query.value).split(' ').filter(Boolean);
    let matches = 0;
    const visibleYears = new Set();
    papers.forEach((paper) => {
      const match = terms.every((term) => paper.text.includes(term));
      paper.element.hidden = !match;
      if (match) { matches += 1; visibleYears.add(paper.year); }
    });
    sections.forEach((section) => { section.hidden = !visibleYears.has(section.querySelector('h2').id.replace('year-', '')); });
    yearLinks.forEach((link) => { link.hidden = !visibleYears.has(link.hash.replace('#year-', '')); });
    navigation.hidden = matches === 0;
    empty.hidden = matches !== 0;
    count.textContent = `${matches} of ${papers.length} publications`;

    if (syncURL) {
      const url = new URL(window.location.href);
      if (query.value) url.searchParams.set('q', query.value);
      else url.searchParams.delete('q');
      ['year', 'type', 'venue'].forEach((name) => url.searchParams.delete(name));
      if (url.href !== window.location.href) window.history.replaceState(null, '', url);
    }
  }

  function restore() {
    const params = new URLSearchParams(window.location.search);
    query.value = params.get('q') || '';
    filter(false);
  }

  form.addEventListener('submit', (event) => event.preventDefault());
  query.addEventListener('input', () => filter());
  window.addEventListener('popstate', restore);
  restore();
  form.hidden = false;
})();
