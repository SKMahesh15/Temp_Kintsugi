/**
 * Strip 2: Visibility
 * Removes elements that are hidden from the user via CSS or geometry.
 */

export const applyStrip2 = (elements) => {

    return elements.filter(el => {

        const style = window.getComputedStyle(el);

        // css hidden check
        if (style.display === 'none' ||
            style.visibility === 'hidden' ||
            style.opacity === '0' ||
            style.fontSize === '0px') {
            return false;
        }

        if(style.display === 'contente') return true;

        //geometry check(no width or height then invisible)
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) {
            return false;
        }

        return true;
    })
}