//Walk every element before any strip runs. If `aria-hidden="true"` is present — mark for unconditional drop, do not preserve.
// Otherwise if element has `role`, any `aria-*` attribute, or `tabindex` — bypass all strips entirely. Resolve ID references inline:
// - `aria-describedby` → fetch `document.getElementById(id)?.innerText?.trim()`
// - `aria-labelledby` → fetch `document.getElementById(id)?.innerText?.trim()`
// Emit immediately as a semantic node with full attribute map. Do not pass through any further strips.

export const AOM_ATTRIBUTES = [
    'aria-label',
    'aria-labelledby',
    'aria-describedby',
    'role',
    'alt',
    'title',
    'tabindex',
    'placeholder'
]

// if atleast one element in the list of attributes is present on the element, then we can assume that this element has AOM data and should be preserved
export const hasAOMData = (el) => {
  if (Array.from(el.attributes).some(attr => attr.name.startsWith('aria-'))) return true;
  return AOM_ATTRIBUTES.some(attr => el.hasAttribute(attr));
};

// exporting the actual aom data
export const processAOMNode = (el) => {
  // force drop
  if (el.getAttribute('aria-hidden') === 'true'){
    el.dataset.stripSkip = "true";
    return null;
  }
  
  // bypass checks - if it has AOM data, we want to preserve it and not let any strip touch it. 
  if (!hasAOMData(el)) return null;

  // mark for preservation - this will prevent any strip from touching it, even if it's empty. We will handle it in the end when we emit the final node data.
  el.dataset.aomProtected = "true";

  const resolveId = (id) => id ? document.getElementById(id)?.innerText?.trim() ?? '' : '';

  return {
    tag: el.tagName.toLowerCase(),
    role: el.getAttribute('role') || '',
    ariaLabel: el.getAttribute('aria-label') || '',
    ariaDescription: resolveId(el.getAttribute('aria-describedby')),
    ariaLabelledBy: resolveId(el.getAttribute('aria-labelledby')),
    tabindex: el.getAttribute('tabindex') || '',
    alt: el.getAttribute('alt') || '',
    title: el.getAttribute('title') || '',
    placeholder: el.getAttribute('placeholder') || '',
    innerText: el.innerText?.trim() || '',
    isAOMNode: true
  };
};

// this file will beused by the strips to decide: can i delete this empty div?