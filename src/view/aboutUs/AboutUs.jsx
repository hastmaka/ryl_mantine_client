import AboutUsCarousel from "./1aboutUsCarousel/AboutUsCarousel.jsx";
import LeftRight from "./2LeftRight/LeftRight.jsx";
import AnimatePage from "../AnimatePage.jsx";
import AboutUsQuote from "./3aboutUsQuote/AboutUsQuote.jsx";

const component = [
    AboutUsCarousel,
    LeftRight,
    AboutUsQuote
]

export default function AboutUs() {
    return (
        <AnimatePage component={component}/>
    )
}

AboutUs.propTypes = {}
