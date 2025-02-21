import {Text} from "@mantine/core";
import SContainer from "../../SContainer.jsx";
import GenerateCase from "../../GenerateCase.jsx";
import {generalSignal} from "../../../signal/generalSignal.js";
import {legalEnglish} from "../../../static/legal/legalEnglish.js";

const caseMap = {
    en: legalEnglish,
    es: legalEnglish
}

export default function LegalModal() {
    const {legalName,language} = generalSignal
    const activeCase = caseMap[language][legalName]

    return (
        <SContainer innerProps={{py: '1rem'}}>
            <Text c='#fafffd' size='clamp(1.2rem, 1.5vw + 1px, 1.8rem)'>{activeCase.title}</Text>
            <GenerateCase data={activeCase.data} color='#fafffd'/>
        </SContainer>
    )
}

LegalModal.propTypes = {}
