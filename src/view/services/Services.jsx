import ServiceCarousel from "./1serviceCarousel/ServiceCarousel.jsx";
import MoreRequested from "./2moreRequested/MoreRequested.jsx";
import ServiceGrid from "./3serviceGrid/ServiceGrid.jsx";
import Important from "./4important/Important.jsx";
import AnimatePage from "../AnimatePage.jsx";
import ServiceQuote from "./5serviceQuote/serviceQuote.jsx";
import {Box, Center, CloseButton, LoadingOverlay, Text} from "@mantine/core";
import {generalSignal} from "@/signal/generalSignal.js";
import ServiceModal from "@/component/modal/service/ServiceModal.jsx";
import classes from './Services.module.scss';
import {serviceModalSignal} from "@/signal/serviceModalSignal.js";
import MotionCenter from "@/component/messageForm/MotionCenter.jsx";
import CanvasEffect from "./3serviceGrid/CanvasEffect.jsx";
import EzModal from "@/component/modal/EzModal.jsx";
import useLanguage from "@/util/hook/useLanguage.jsx";

const component = [
    ServiceCarousel,
    MoreRequested,
    ServiceGrid,
    Important,
    ServiceQuote
]

export default function Services() {
    const lang = useLanguage()
    const {modal, closeModal} = generalSignal
    const {isSending, messageSent, resetServices} = serviceModalSignal

    return (
        <>
            <AnimatePage component={component}/>
            <EzModal header={!messageSent} title={lang('service.modal.title')}>
                <LoadingOverlay
                    visible={isSending}
                    zIndex={1000}
                    overlayProps={{radius: "xs", blur: 2}}
                    loaderProps={{type: 'bars', color: 'teal'}}
                />
                {messageSent ? (
                    <>
                        <CanvasEffect/>
                        <CloseButton
                            className={classes['close-btn']}
                            onClick={(e) => {
                                e.stopPropagation()
                                closeModal()
                                resetServices()
                            }}
                        />
                        <Center className={classes['thanks-container']}>
                            <MotionCenter/>
                        </Center>
                        <Text className={classes.text} ta='center' size='xs'>
                            {lang('service.service-grid.detail.message-sent.effect')}
                        </Text>
                    </>
                    ) : (
                        isSending ? (
                            <Box
                                id='div'
                                h={`${modal.dimensions.height}px`}
                                w={`${modal.dimensions.width}px`}
                                pos='relative'
                            />
                        ) : (
                            <ServiceModal/>
                        )
                    )
                }
            </EzModal>
        </>
    )
}

