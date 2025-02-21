import {useRef} from "react";
import {useTrackElementPosition} from "@/util/hook/index.js";
import {motionSignal} from "@/signal/motionSignal.js";
import EzFullCarousel from "@/component/EzFullCarousel.jsx";
import Slides from "@/component/slides/Slides.jsx";
import {TestimonialsCarouselData} from "@/static/carousel/TestimonialsCarouselData.js";
import {autoScroll} from "@/util/index.js";

export default function TestimonialCarousel() {
    const elementRef = useRef()
    useTrackElementPosition(
        elementRef, 'all',
        (v) => motionSignal.updateScrollPosition(v)
    )

    return (
        <EzFullCarousel forwardedRef={elementRef}>
            <Slides
                data={TestimonialsCarouselData}
                btnText='testimonial.carousel.btn'
                onClick={async () => {
                    autoScroll('testimonial-happy-client')
                }}
            />
        </EzFullCarousel>
    )
}
