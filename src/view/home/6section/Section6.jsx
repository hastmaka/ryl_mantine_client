import PropTypes from "prop-types";
import classes from '../Home.module.scss'
import SContainer from "../../../component/SContainer.jsx";
import {Flex, Image, Stack, Text} from "@mantine/core";
import img from "/gallery/4.webp";
import Double from "../../../component/Double.jsx";
import BookNowBtn from "../../../component/BookNowBtn.jsx";

export default function Section6() {
    return (
        <SContainer>
            <Double>
                <Stack flex={1} justify='center' className={classes['btn-container']}>
                    <Text className={classes['section-title']}>PROFESSIONAL CHAUFFEUR</Text>
                    <Text className={classes['section-sub-title']}>With over 14 years in the transportation industry as a chauffeur, I offer extensive experience providing safe, reliable, and customer-focused service. Skilled in navigating diverse routes and vehicles, I ensure punctuality and comfort for all passengers, maintaining a commitment to professionalism and excellence throughout.</Text>
                    <BookNowBtn big/>
                </Stack>
                <Flex flex={1} pos='relative'>
                    {/*<Overlay*/}
                    {/*    gradient="radial-gradient(circle, rgba(0,212,255,0) 50%, rgba(255,255,255,1) 100%)"*/}
                    {/*    // opacity={.5}*/}
                    {/*/>*/}
                    <Image src={img} alt='section 6' className={classes.image}/>
                </Flex>
            </Double>
        </SContainer>
    )
}

Section6.propTypes = {}
