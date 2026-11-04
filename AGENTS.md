# Project preferences

## Typography

Keep a small, consistent type scale. Use the shared `--text-*` variables in
`assets/site.css`; do not introduce one-off font sizes for individual components.

- Body text: `--text-body` (1rem / 16px at the default browser size).
- Supporting text, metadata, author names, and small links:
  `--text-small` (.875rem / 14px).
- Intentional exceptions requested by the user: affiliations use
  `--text-affiliation` (.9em relative to author text); BibTeX content uses
  `--text-citation` (.8em relative to its surrounding body text).
- Headings: `--text-subheading`, `--text-heading`, and `--text-title`.
- The homepage hero uses the responsive `--text-display` size.

Differentiate text with weight, color, spacing, and layout before changing its
size. Keep peer elements the same size, respecting the exceptions above.
Do not add arbitrary smaller font sizes at mobile breakpoints; let content wrap
and adjust the layout. Print sizes and the historical calculator's isolated
styles are separate from this shared screen typography.
