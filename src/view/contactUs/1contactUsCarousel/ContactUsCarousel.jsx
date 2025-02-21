import {useRef} from "react";
import {useTrackElementPosition} from "@/util/hook/index.js";
import {motionSignal} from "@/signal/motionSignal.js";
import EzFullCarousel from "@/component/EzFullCarousel.jsx";
import Slides from "@/component/slides/Slides.jsx";
import {ContactUsCarouselData} from "@/static/carousel/ContactUsCarouselData.js";
import {autoScroll} from "@/util/index.js";

export default function ContactUsCarousel() {
    const elementRef = useRef()
    useTrackElementPosition(
        elementRef, 'all',
        (v) => motionSignal.updateScrollPosition(v)
    )

    return (
        <EzFullCarousel forwardedRef={elementRef}>
            <Slides
                data={ContactUsCarouselData}

                btnText='contactUs.carousel.btn'
                onClick={async () => {
                    autoScroll('be-in-touch')
                }}
            />
        </EzFullCarousel>
    )
}
