import {deepSignal} from "deepsignal/react";
import {getFromSessionStore, updateSessionStore} from "@/util/index.js";

if (!getFromSessionStore('theme')) {
    updateSessionStore('theme', 'light')
}

export const ThemeController = deepSignal({
    theme: getFromSessionStore('theme') || 'dark',

    toggleTheme: () => {
        const theme = ThemeController.theme
        ThemeController.theme = theme === 'dark' ? 'light' : 'dark'
        updateSessionStore('theme', ThemeController.theme)
    }
})
