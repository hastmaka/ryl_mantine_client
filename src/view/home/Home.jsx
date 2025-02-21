import HomeCarousel from "./1homeCarousel/HomeCarousel.jsx";
import WhoWeAre from "./2whoWeAre/WhoWeAre.jsx";
import HowWeWork from "./3howWeWork/HowWeWork.jsx";
import HowWeDoIt from "./4howWeDoIt/HowWeDoIt.jsx";
import WhyUs from "./5whyUs/WhyUs.jsx";
import AnimatePage from "../AnimatePage.jsx";

const component = [
    HomeCarousel,
    WhoWeAre,
    HowWeWork,
    HowWeDoIt,
    WhyUs
]

export default function Home() {
    return (
        <AnimatePage component={component}/>
    )
}
