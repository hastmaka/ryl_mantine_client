import Slides from "../../../component/slides/Slides.jsx";
import {useRef} from "react";
import {useTrackElementPosition} from "../../../util/hook/index.js";
import {motionSignal} from "../../../signal/motionSignal.js";
import EzFullCarousel from "../../../component/EzFullCarousel.jsx";
import {HomeCarouselData} from "../../../static/carousel/HomeCarouselData.js";

export default function HomeCarousel() {
    const elementRef = useRef()
    useTrackElementPosition(
        elementRef,'all',
        (v) => motionSignal.updateScrollPosition(v)
    )

    return (
        <EzFullCarousel forwardedRef={elementRef}>
            <Slides
                data={HomeCarouselData}
                btnText='home.carousel.btn'
                onClick={() => window.navigate('/services')}
            />
        </EzFullCarousel>
    )
}

HomeCarousel.propTypes = {}
