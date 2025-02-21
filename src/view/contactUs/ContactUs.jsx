import ContactUsCarousel from "./1contactUsCarousel/ContactUsCarousel.jsx";
import BeInTouch from "./2beInTouch/BeInTouch.jsx";
import AnimatePage from "../AnimatePage.jsx";
import ContactUsQuote from "./3contactUsQuote/ContactUsQuote.jsx";

const component = [
    ContactUsCarousel,
    BeInTouch,
    ContactUsQuote
]

export default function ContactUs() {
    return (
        <AnimatePage component={component}/>
    )
}

ContactUs.propTypes = {}
