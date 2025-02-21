import {useRef} from "react";
import {useTrackElementPosition} from "@/util/hook/index.js";
import {motionSignal} from "@/signal/motionSignal.js";
import EzFullCarousel from "@/component/EzFullCarousel.jsx";
import Slides from "@/component/slides/Slides.jsx";
import {UseCasesCarouselData} from "@/static/carousel/UseCasesCarouselData.js";
import {autoScroll} from "@/util/index.js";

export default function UseCasesCarousel() {
    const elementRef = useRef()
    useTrackElementPosition(
        elementRef,'all',
        (v) => motionSignal.updateScrollPosition(v)
    )

    return (
        <EzFullCarousel forwardedRef={elementRef}>
            <Slides
                data={UseCasesCarouselData}
                btnText='useCases.carousel.btn'
                onClick={async () => {
                    autoScroll('more-relevant')
                }}
            />
        </EzFullCarousel>
    )
}
