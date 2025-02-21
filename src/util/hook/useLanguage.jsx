// import {English} from "@/static/language/index.js";
// export default function useLanguage() {
//
//     return (path) => {
//         if (path) {
//             const pathArray = path.split(".");
//             let result = English
//
//             for (const key of pathArray) {
//                 result = result[key];
//             }
//
//             if (!result) {
//                 console.log(`can't find ${path} path`);
//             }
//
//             return result;
//         }
//     };
// }

import {English, Spanish} from "@/static/language/index.js";
import {generalSignal} from "@/signal/generalSignal.js";
import {useEffect, useState} from "react";

/** in case of manually handle language **/
const languageLibrary = {
    en: English,
    es: Spanish,
}
export default function useLanguage() {
    const {language} = generalSignal
    const [state, setState] = useState(language);

    useEffect(() => {
        setState(language);
    }, [language]);

    return (path) => {
        if (path) {
            const pathArray = path.split(".");
            let result = languageLibrary[state];

            for (const key of pathArray) {
                result = result[key];
            }

            if (!result) {
                console.log(`can't find ${path} path`);
            }

            return result;
        }
    };
}
