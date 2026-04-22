/**
 * Strip 11 — Semantic Priority Tagging + Z-index Boost
 * Tags surviving nodes with a priority level for final sorting.
 */
const PRIORITY_MAP = {
  // Critical: Usually unique page identifiers or labels
  CRITICAL: ['H1', 'H2', 'H3', 'LABEL', 'CAPTION', 'FIGCAPTION'],
  // High: Main structural text and content
  HIGH: ['H4', 'H5', 'H6', 'P', 'LI', 'DT', 'DD'],
  // Medium: Data and primary interactions
  MEDIUM: ['TD', 'TH', 'BLOCKQUOTE', 'PRE', 'CODE', 'A'],
  // Low: General containers and structural markers
  LOW: ['DIV', 'SECTION', 'ARTICLE', 'SPAN', 'HEADER', 'FOOTER']
};

export const applyStrip11 = (elements) => {
  return elements.map(el => {
    let priority = 'low';

    const tag = el.tagName;
    if (PRIORITY_MAP.CRITICAL.includes(tag)) priority = 'critical';
    else if (PRIORITY_MAP.HIGH.includes(tag)) priority = 'high';
    else if (PRIORITY_MAP.MEDIUM.includes(tag)) priority = 'medium';

    // interaction? = bonus
    const isInteractive = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(tag) || el.hasAttribute('onclick');
    if (isInteractive) priority = 'critical'; 

    // z-index bons points
    const zIndex = parseInt(window.getComputedStyle(el).zIndex);
    if (!isNaN(zIndex) && zIndex > 10 && zIndex <= 100) {
      // Bump priority up one level if it's "on top" but not a full overlay
      if (priority === 'low') priority = 'medium';
      else if (priority === 'medium') priority = 'high';
      else if (priority === 'high') priority = 'critical';
    }

    el._priority = priority;
    return el;
  });
};