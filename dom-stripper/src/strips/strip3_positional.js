export const applyStrip3 = (elements) => {

  return elements.filter(el => {

    const style = window.getComputedStyle(el);
    const position = style.position;
    if (position !== 'absolute' && position !== 'fixed') return true;
    const left = parseFloat(style.left);
    const top = parseFloat(style.top);
    if (left < -999) return false;
    if (top < -999) return false;
    if (style.clip === 'rect(0px, 0px, 0px, 0px)') return false;
    if (style.clipPath === 'inset(100%)') return false;
    return true;
  });
};lik