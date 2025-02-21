import {deepSignal} from "deepsignal/react";
import {effect} from "@preact/signals-react";

function init() {
    const lang = sessionStorage.getItem('lang')
    if(!lang) sessionStorage.setItem('lang', JSON.stringify('en'))
}

init()

export const generalSignal = deepSignal({
    screen: '',
    setScreen: (value) => generalSignal.screen = value,

    activePath: '',
    setActivePath: (value) => generalSignal.activePath = value,

    //language
    language: JSON.parse(sessionStorage.getItem('lang')),
    setLanguage: (value) => {
        generalSignal.language = value
        sessionStorage.setItem('lang', JSON.stringify(value))
    },

    modal: {
        open: false,
        dimensions: {
            height: 0,
            width: 0
        }
    },
    openModal(){generalSignal.modal.open = true},
    closeModal(){generalSignal.modal.open = false},
    updateModalDimensions(dimensions){generalSignal.modal.dimensions = dimensions},

    //case
    caseName: '',
    setCase: (value) => generalSignal.caseName = value,

    //legal
    legalName: '',
    setLegal: (value) => generalSignal.legalName = value,
})

// effect(() => {
//     console.log(generalSignal.language)
// })