import SContainer from "../../SContainer.jsx";
import EzTitle from "../../EzTitle.jsx";
import {Stack} from "@mantine/core";
import GenerateCase from "../../GenerateCase.jsx";
import {generalSignal} from "../../../signal/generalSignal.js";
import {caseEnglish} from "../../../static/case/caseEnglish.js";
import {caseSpanish} from "../../../static/case/caseSpanish.js";

const caseMap = {
    en: caseEnglish,
    es: caseSpanish
}

export default function CaseModal() {
    const {caseName, language} = generalSignal
    const activeCase = caseMap[language][caseName]
    return (
        <SContainer
            p={{
                base: '.5rem .5rem 1rem .5rem',
                md: '1rem 1rem 3rem 1rem'
            }}
        >
            <Stack gap={0}>
                <EzTitle
                    h3={activeCase.title}
                />
            </Stack>

            <GenerateCase data={activeCase.data}/>
        </SContainer>
    )
}

CaseModal.propTypes = {}



//dynamic import
// import PropTypes from "prop-types";
// import classes from './CaseModal.module.scss';
// import SContainer from "../../SContainer.jsx";
// import EzTitle from "../../EzTitle.jsx";
// import {Stack} from "@mantine/core";
// import GenerateCase from "../../GenerateCase.jsx";
// import { generalSignal } from "../../../signal/generalSignal.js";
// import { useEffect, useState } from "react";
// import EzLoading from "../../EzLoading.jsx";
//
// const caseMap = {
//     en: () => import("../../../static/case/caseEnglish.js"),
//     es: () => import("../../../static/case/caseSpanish.js")
// }
//
// const caseType = {
//     en: 'caseEnglish',
//     es: 'caseSpanish'
// }
//
// export default function CaseModal() {
//     const { caseName, language } = generalSignal;
//     const [caseData, setCaseData] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         setLoading(true);
//         caseMap[language]()
//             .then(module => {
//                 setCaseData(module[caseType[language]]);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error("Error loading case data:", err);
//                 setLoading(false);
//             });
//     }, [language]);
//
//     if (loading) {
//         return <EzLoading loading={loading}/>
//     }
//
//     return (
//         <SContainer
//             p={{
//                 base: '.5rem .5rem 1rem .5rem',
//                 md: '1rem 1rem 3rem 1rem'
//             }}
//         >
//             <Stack gap={0}>
//                 <EzTitle
//                     h3='CASE'
//                     h4='JMC LIMOUSINE'
//                 />
//             </Stack>
//
//             <GenerateCase data={caseData[caseName]} />
//         </SContainer>
//     )
// }
//
// CaseModal.propTypes = {}