import SContainer from "../../../component/SContainer.jsx";
import {Stack, Text} from "@mantine/core";
import EzTitle from "../../../component/EzTitle.jsx";
import useLanguage from "../../../util/hook/useLanguage.jsx";
import TestimonialHappyClientCarousel from "./TestimonialHappyClientCarousel.jsx";
import classes from "../Testimonial.module.scss";

export default function TestimonialHappyClient() {
    const lang = useLanguage()
    return (
        <>
            <SContainer bg='#ffffff' id='testimonial-happy-client'>
                <Stack py={{base: '2rem', md: '4rem'}} gap={0}>
                    <EzTitle h3={lang('testimonial.h3')} h4={lang('testimonial.h4')}/>

                    <Text
                        className={classes.text}
                        pt='1rem'
                    >{lang('testimonial.text')}</Text>

                    {/*<TestimonialHappyClientCarousel/>*/}

                </Stack>
            </SContainer>

            <section className={classes['carousel-container']}>
                <div className={classes['carousel-wrapper']}>
                    <TestimonialHappyClientCarousel/>
                </div>
            </section>
        </>
    )
}
