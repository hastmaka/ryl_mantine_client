import {generalSignal} from "../signal/generalSignal.js";

export const autoScroll = (id, offsetTop=null) => {
    let el = document.getElementById(id),
        position = el.getBoundingClientRect(),
        offset = offsetTop || 78;
    generalSignal.setActivePath(id)
    window.scrollTo(position.left, position.top + window.scrollY - offset);
}