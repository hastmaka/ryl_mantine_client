import {deepSignal} from "deepsignal/react";
import {effect} from "@preact/signals-react";


export const motionSignal = deepSignal({
    hero: {
        bottom: 1,
        top: undefined,
    },

    updateScrollPosition: (value) => {
        let id = value.target.id,
            rect = value.rect;
        motionSignal.hero = {
            ...motionSignal.hero,
            bottom: rect.bottom,
            top: rect.top,
            left: rect.left,
            right: rect.right,
            height: rect.height,
            width: rect.width,
            x: rect.x,
            y: rect.y
        }
    },
})

// effect(() => {
//     console.log(motionSignal.hero.bottom)
// })
