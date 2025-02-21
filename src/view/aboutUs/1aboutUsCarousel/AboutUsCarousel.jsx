import {useRef} from "react";
import {useTrackElementPosition} from "@/util/hook/index.js";
import {motionSignal} from "@/signal/motionSignal.js";
import EzFullCarousel from "@/component/EzFullCarousel.jsx";
import Slides from "@/component/slides/Slides.jsx";
import {AboutUsCarouselData} from "@/static/carousel/AboutUsCarouselData.js";
import {autoScroll} from "@/util/index.js";

export default function AboutUsCarousel() {
    const elementRef = useRef()
    useTrackElementPosition(
        elementRef, 'all',
        (v) => motionSignal.updateScrollPosition(v)
    )

    return (
        <EzFullCarousel forwardedRef={elementRef}>
            <Slides
                data={AboutUsCarouselData}

                btnText='aboutUs.carousel.btn'
                onClick={async () => {
                    autoScroll('left-right')
                }}
            />
        </EzFullCarousel>
    )
}

AboutUsCarousel.propTypes = {}
