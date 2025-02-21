export const isElementInView = (elementId) => {
    const el = document.getElementById(elementId);
    if (!el) {
        console.warn(`Element with ID ${elementId} not found`);
        return false;
    }

    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right > 0
    )
}