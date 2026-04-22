// **Strip 7 — Inline Element Collapse**

// For `span`, `em`, `strong`, `b`, `i`, `u`, `small`, `sup`, `sub`, `abbr`, `cite`, `mark` — collapse text into nearest block-level parent only if ALL of the following are true:
// - Parent is a block-level element
// - Element has no `id`, no `class`, no `data-*`, and no other attributes of any kind
// - Element is not in the interactive whitelist

// If it has any attribute at all, keep as a standalone node. Attributes are potential selector anchors and must never be silently discarded.

import { INTERACTIVE_WHITELIST } from '../utils/interactive.js';

const COLLAPSIBLE_TAGS = ['span', 'em', 'strong', 'b', 'i', 'u', 'small', 'sup', 'sub', 'abbr', 'cite', 'mark'];

export const applyStrip7 = (elements) => {

    return elements.filter(el => {

        if(!COLLAPSIBLE_TAGS.includes(el.tagName.toLowerCase())) return true; // only target specific inline tags
        
        if(INTERACTIVE_WHITELIST.includes(el.tagName)) return true; // never collapse interactive elements

        if(el.hasAttributes()) return true; // if it has any attribute at all, keep as standalone node

        //if it passes all these test cases, then we drop the element from the list.
        return false;
    });
}