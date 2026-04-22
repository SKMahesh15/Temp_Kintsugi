import { generateXPath } from '../utils/xpath.js';

/**
 * Transforms a surviving DOM element into the final JSON output shape.
 */
export const emitNode = (el) => {
  const style = window.getComputedStyle(el);
  
  return {
    tag: el.tagName.toLowerCase(),
    innerText: el.innerText?.trim() || "",
    pseudoText: el._pseudoText || "",
    id: el.id || "",
    classes: Array.from(el.classList),
    dataAttributes: Object.fromEntries(
      Array.from(el.attributes)
        .filter(a => a.name.startsWith('data-'))
        .map(a => [a.name, a.value])
    ),
    role: el.getAttribute('role') || "",
    ariaLabel: el.getAttribute('aria-label') || "",
    ariaDescription: el.getAttribute('aria-description') || "", // Logic for labelleby/describedby handled in AOM Gate
    ariaLabelledBy: el.getAttribute('aria-labelledby') || "",
    tabindex: el.getAttribute('tabindex') || "",
    depth: el._depth || 0,
    zIndex: parseInt(style.zIndex) || 0,
    overlay: !!el._overlay,
    overlayWarning: el._overlayWarning || "",
    priority: el._priority || "low",
    xpath: generateXPath(el)
  };
};