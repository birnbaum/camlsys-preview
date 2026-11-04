(() => {
  const citation = document.getElementById('bibtex');
  if (!citation) return;

  const copyButton = document.querySelector('.citation-copy');
  const copyStatus = document.querySelector('.citation-copy-status');
  if (copyButton && copyStatus) {
    copyButton.hidden = false;
    let resetTimer;
    copyButton.addEventListener('click', async () => {
      clearTimeout(resetTimer);
      copyButton.classList.remove('copied');
      copyStatus.classList.add('sr-only');
      copyStatus.textContent = '';
      const code = citation.querySelector('code');
      try {
        await navigator.clipboard.writeText(code.textContent);
        copyButton.classList.add('copied');
        copyButton.setAttribute('aria-label', 'BibTeX copied');
        copyButton.title = 'BibTeX copied';
        copyStatus.textContent = 'BibTeX copied to clipboard.';
        resetTimer = setTimeout(() => {
          copyButton.classList.remove('copied');
          copyButton.setAttribute('aria-label', 'Copy BibTeX');
          copyButton.title = 'Copy BibTeX';
        }, 2000);
      } catch {
        citation.open = true;
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        copyButton.setAttribute('aria-label', 'Copy BibTeX');
        copyButton.title = 'Copy BibTeX';
        copyStatus.classList.remove('sr-only');
        copyStatus.textContent = 'Copy unavailable. Citation selected—press Ctrl+C or ⌘C to copy.';
      }
    });
  }

  const revealCitation = () => {
    if (window.location.hash === '#bibtex') {
      citation.open = true;
      citation.scrollIntoView();
    }
  };
  window.addEventListener('hashchange', revealCitation);
  revealCitation();
})();
