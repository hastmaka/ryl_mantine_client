import SContainer from "@/component/SContainer.jsx";
import EzTitle from "@/component/EzTitle.jsx";
import useLanguage from "@/util/hook/useLanguage.jsx";
import {Flex, Stack, Image, Text} from "@mantine/core";
import classes from '../Services.module.scss'
import {ServiceMoreRequestedData} from "@/static/ServiceMoreRequestedData.js";
import BookNowBtn from "@/component/BookNowBtn.jsx";
import {generalSignal} from "@/signal/generalSignal.js";

export default function MoreRequested() {
    const lang = useLanguage()
    const {openModal} = generalSignal
    return (
        <SContainer bg='#ffffff' id='more-requested'>
            <Stack
                py={{base: '2rem', md: '4rem'}}
                gap={0}
            >
                <EzTitle h3={lang('service.more-requested.h3')} h4={lang('service.more-requested.h4')}/>
                <Flex
                    direction={{base: 'column', xs: 'row'}}
                    justify='space-between'
                    gap='1rem'
                    component='ul'
                    pt={{base: '1rem', md: '2rem'}}
                >
                    {ServiceMoreRequestedData.map(({imgPath, title, alt, name}, index) =>
                        <li key={index} className={classes['service-card']}>
                            <Image src={imgPath} alt={alt}/>
                            <div className={classes.overlay}/>
                            <Text className={classes.title}>{lang(title)}</Text>
                            <BookNowBtn
                                className={classes.btn}
                                text='service.more-requested.btn'
                                onClick={() => openModal()}
                            />
                        </li>
                    )}
                </Flex>
            </Stack>
        </SContainer>
    )
}

MoreRequested.propTypes = {}
