import PropTypes from "prop-types";
import {Card, Image, Stack, Text} from "@mantine/core";
import classes from '../Services.module.scss';
import BookNowBtn from "@/component/BookNowBtn.jsx";
import {generalSignal} from "@/signal/generalSignal.js";
import useLanguage from "@/util/hook/useLanguage.jsx";

export default function ServiceCard({item}) {
    const lang = useLanguage()
    const {openModal, language} = generalSignal
    return (
        <Card className={classes['card-wrapper']}>
            <Card.Section className={classes.section} p='1rem'>
                <Image src={item.imgPath} alt={item.alt} fit='fill'/>
            </Card.Section>

            <Stack pt='1rem' gap={0} className={classes['card-body']}>



                <Text size="sm" c='var(--mantine-color-gray-7)' fw='900'>
                    {lang(item.title)}
                </Text>

                {item.name !== 'consulting' && <Text size='xs'>
                    {language === 'en' ? 'starting at' : 'empezando en'}
                </Text>}

                <Text size="lg" c='var(--mantine-color-primary-0)' fw='900'>
                    {lang(item.price)}
                </Text>

                {item.extra && <Text size='xs'>{lang(item.extra)}</Text>}
                
                <BookNowBtn
                    text='service.service-grid.btn'
                    w='clamp(10rem, 20vw, 12rem)'
                    mt='1rem'
                    onClick={() => {
                        openModal()
                    }}
                />

                <Text c="dimmed" size="sm" ta='justify' pt='1rem'>
                    {lang(item.text)}
                </Text>

            </Stack>
        </Card>
    )
}

ServiceCard.propTypes = {
    item: PropTypes.object.isRequired
}
