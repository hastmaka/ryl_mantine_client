import {useRef} from "react";
import {useTrackElementPosition} from "@/util/hook/index.js";
import {motionSignal} from "@/signal/motionSignal.js";
import EzFullCarousel from "@/component/EzFullCarousel.jsx";
import {ServiceCarouselData} from "@/static/carousel/ServiceCarouselData.js";
import Slides from "@/component/slides/Slides.jsx";
import {autoScroll} from "@/util/index.js";

export default function ServiceCarousel() {
    const elementRef = useRef()
    useTrackElementPosition(
        elementRef,'all',
        (v) => motionSignal.updateScrollPosition(v)
    )

    return (
        <EzFullCarousel forwardedRef={elementRef}>
            <Slides
                data={ServiceCarouselData}
                btnText='service.carousel.btn'
                onClick={async () => {
                    autoScroll('more-requested')
                }}
            />
        </EzFullCarousel>
    )
}

