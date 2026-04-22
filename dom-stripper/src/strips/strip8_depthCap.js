import { INTERACTIVE_WHITELIST } from '../utils/interactive.js';

/**
 * Strip 8: Depth Cap
 * Removes deeply nested nodes (Depth > 12) if they are anonymous wrappers.
 */
export const applyStrip8 = (elements) => {
  return elements.filter(el => {
    // calculate depth relative to <body>
    let depth = 0;
    let parent = el.parentElement;
    while (parent && parent !== document.body) {
      depth++;
      parent = parent.parentElement;
    }

    // if depth more than 12 it must havea  reason to exist or else it gay
    if (depth > 12) {
      const hasText = el.innerText?.trim().length > 0;
      const hasAttributes = el.hasAttributes();
      const isInteractive = INTERACTIVE_WHITELIST.includes(el.tagName);

      if (!hasText && !hasAttributes && !isInteractive) {
        return false; // drop anonymous wrapper at extreme depth
      }
    }

    return true;
  });
};