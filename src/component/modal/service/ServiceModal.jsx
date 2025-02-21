import PropTypes from "prop-types";
import SContainer from "../../SContainer.jsx";
import {Flex, Grid, Text, Stack, TextInput} from "@mantine/core";
import BookNowBtn from "../../BookNowBtn.jsx";
import ServiceModalCard from "./ServiceModalCard.jsx";
import {generalSignal} from "@/signal/generalSignal.js";
import {serviceModalSignal} from "@/signal/serviceModalSignal.js";
import classes from './ServiceModal.module.scss';
import {ServiceModalCardDataEnglish} from "@/static/service/ServiceModalCardDataEnglish.js";
import {ServiceModalCardDataSpanish} from "@/static/service/ServiceModalCardDataSpanish.js";
import useLanguage from "@/util/hook/useLanguage.jsx";

const serviceMap = {
    en: ServiceModalCardDataEnglish,
    es: ServiceModalCardDataSpanish
}

export default function ServiceModal() {
    const lang = useLanguage()
    const {screen, language} = generalSignal
    const {total,sendServiceRequest} = serviceModalSignal

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const email = formData.get('contact-email')
        sendServiceRequest(email).then()
    }

    return (
        <SContainer p={{base: '.5rem', md: '1rem'}} component='form' onSubmit={handleFormSubmit}>
            <Text c='gray.7'>{lang('service.modal.sub')}</Text>
            <Grid gutter='1rem'>
                {serviceMap[language].map((item, index) => {
                    return (
                        <Grid.Col key={index} span={{base: 12, md: 6, lg: 6}} display='flex'>
                            <ServiceModalCard item={item}/>
                        </Grid.Col>
                    )
                })}
                {/*<Grid.Col span={{base: 12, md: 6, lg: 6}} display='flex'>*/}
                {/*    <ComplementaryServices/>*/}
                {/*</Grid.Col>*/}
            </Grid>

            <Stack
                gap={0}
                pt='1rem'
                className={classes['price-container']}
            >
                <Text ta='end' size='xs'>{lang('service.service-grid.detail.info')}</Text>
                {screen < 768
                    && <Text ta='end' pt='1rem'>{lang('service.service-grid.detail.estimated')}<Text component='span' fw={800}>{`$${total}.00`}</Text></Text>
                }
                <Flex justify='flex-end' align='center' pt='1rem'>
                    <TextInput
                        required
                        placeholder={lang('service.service-grid.detail.inputPlaceholder')}
                        w='300px'
                        type='email'
                        name='contact-email'
                    />
                </Flex>
                <Flex
                    direction='row'
                    justify='flex-end'
                    align='center'
                    gap='2rem'
                    className={classes['btn-container']}
                >
                    {screen > 768
                        && <Text>{lang('service.service-grid.detail.estimated')} <Text component='span' fw={800}>{`$${total}.00`}</Text></Text>
                    }
                    <BookNowBtn
                        text='service.service-grid.detail.btn'
                        disabled={!total}
                        type='submit'
                        w={{base: '300px', sm: 'inherit'}}
                    />
                </Flex>
            </Stack>
        </SContainer>
    )
}

ServiceModal.propTypes = {
    modalRef: PropTypes.object
}

