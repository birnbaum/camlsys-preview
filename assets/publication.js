(() => {
  const citation = document.getElementById('bibtex');
  if (!citation) return;

  const revealCitation = () => {
    if (window.location.hash === '#bibtex') {
      citation.open = true;
      citation.scrollIntoView();
    }
  };
  document.querySelector('.publication-bibtex-link')?.addEventListener('click', () => {
    citation.open = true;
  });
  window.addEventListener('hashchange', revealCitation);
  revealCitation();
})();
