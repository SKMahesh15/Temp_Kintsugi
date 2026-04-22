// **Strip 9 — Duplicate Text Deduplication**

// Pass 1 — exact duplicate drop: normalize each node's `innerText` to lowercase with collapsed whitespace.
//  Drop exact duplicates where tag, depth, and normalized text are all identical.

// Pass 2 — frequency drop: count how many times each normalized text value appears across the entire output regardless of tag or depth.\
//  If a value appears more than 3 times, drop all occurrences except the first — **unless** the node's tag is in the interactive whitelist
//  (`a`, `button`, `input`, `select`, `textarea`) or has an `onclick` attribute. Interactive elements are fully exempt from Pass 2.
//  All 10 "Delete" buttons survive. All 5 "Submit" buttons survive.

// The threshold of 3 lives in `config.py` as a tunable constant.

import { INTERACTIVE_WHITELIST } from '../utils/interactive.js';
import { CONFIG } from '../../config/config.js';

export const applyStrip9 = (elements) => {
  const seenExact = new Set();
  const textFrequency = {};
  const firstOccurrenceTracked = new Set(); // Added to track Pass 2 first-instance preservation

  // for caluclating depth:
  const getDepth = (el) => {
    let depth = 0;
    let parent = el.parentElement;
    while (parent && parent !== document.body) {
        depth++;
        parent = parent.parentElement;
    }
    return depth;
  };

  const pass1 = elements.filter(el => {
    const text = el.innerText?.trim().toLowerCase().replace(/\s+/g, ' ') || "";
    const depth = getDepth(el); // Fixed typo from egetDepth
    const signature = `${el.tagName}-${text}-${depth}`; // custom signature

    if (text) {
      textFrequency[text] = (textFrequency[text] || 0) + 1;
    }

    if (seenExact.has(signature)) return false;
    seenExact.add(signature);
    return true;
  });

  return pass1.filter(el => {
    const text = el.innerText?.trim().toLowerCase().replace(/\s+/g, ' ') || "";
    const isInteractive = INTERACTIVE_WHITELIST.includes(el.tagName) || el.hasAttribute('onclick');

    // Rule: If it's a button/link, ALWAYS keep it (all 10 'Delete' buttons must survive)
    if (isInteractive) return true;

    // Rule: If non-interactive text repeats too much, it's likely boilerplate/noise
    if (textFrequency[text] > CONFIG.DEDUP_FREQUENCY_THRESHOLD) {
      // Keep only the first occurrence encountered
      if (firstOccurrenceTracked.has(text)) return false;
      firstOccurrenceTracked.add(text);
      return true;
    }

    return true;
  });
};