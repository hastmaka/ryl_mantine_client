import UseCasesCarousel from "./1useCasesCarousel/UseCasesCarousel.jsx";
import MoreRelevant from "./2moreRelevant/MoreRelevant.jsx";
import AnimatePage from "../AnimatePage.jsx";
import UseCasesQuote from "./3useCasesQuote/UseCasesQuote.jsx";
import EzModal from "../../component/modal/EzModal.jsx";
import CaseModal from "../../component/modal/case/CaseModal.jsx";
import useLanguage from "../../util/hook/useLanguage.jsx";

const component = [
    UseCasesCarousel,
    MoreRelevant,
    UseCasesQuote
]

export default function UseCases() {
    const lang = useLanguage()
    return (
        <>
            <AnimatePage component={component}/>
            <EzModal title={lang('useCases.modal.title')}>
                <CaseModal/>
            </EzModal>
        </>
    )
}
