import {Center, Stack, Text} from "@mantine/core";
import classes from "./MessageForm.module.scss";
import {motion} from "framer-motion";
import useLanguage from "../../util/hook/useLanguage.jsx";

const MotionCenterContainer = motion.create(Center)

const animate = {
    initial: {
        opacity: 0,
        filter: 'blur(2px)'
    },
    transition: {
        duration: 1,
        delay: .2
    },
    whileInView: {
        opacity: 1,
        filter: 'blur(0px)'
    },
    viewport: {
        once: true
    }
}

export default function MotionCenter() {
    const lang = useLanguage()
    return (
        <MotionCenterContainer
            {...animate}
            flex={1}
            key='messageSentSuccessfully'
        >
            <Stack align='center' py='4rem'>
                <Text size='clamp(2.4rem, 2.5vw + 1px, 3.5rem)' className={classes['bg-color']}>
                    {lang('service.service-grid.detail.message-sent.title')}
                </Text>
                <Text size='clamp(1rem, 1.5vw + 1px, 1.8rem)' ta='center'>
                    {lang('service.service-grid.detail.message-sent.text1')}
                </Text>
                <Text size='clamp(1rem, 1.5vw + 1px, 1.8rem)' ta='center'>
                    {lang('service.service-grid.detail.message-sent.text2')}
                </Text>
            </Stack>
        </MotionCenterContainer>
    )
}
