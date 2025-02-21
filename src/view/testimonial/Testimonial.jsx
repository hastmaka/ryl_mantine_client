import TestimonialCarousel from "./1testimonialCarousel/TestimonialCarousel.jsx";
import TestimonialHappyClient from "./2testimonialHappyClient/TestimonialHappyClient.jsx";
import AnimatePage from "../AnimatePage.jsx";
import TestimonialQuote from "./3testimonialQuote/TestimonialQuote.jsx";

const component = [
    TestimonialCarousel,
    TestimonialHappyClient,
    TestimonialQuote
]

export default function Testimonial() {
    return (
        <AnimatePage component={component}/>
    )
}
