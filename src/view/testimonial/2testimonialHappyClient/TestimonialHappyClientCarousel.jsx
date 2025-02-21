import {Anchor, Card, Flex, Image, Stack, Text} from "@mantine/core";
import useLanguage from "@/util/hook/useLanguage.jsx";
import {Carousel} from "@mantine/carousel";
import {TestimonialCarouselCardData} from "@/static/TestimonialCarouselCardData.js";
import classes from '../Testimonial.module.scss'

export default function TestimonialHappyClientCarousel() {
    const lang = useLanguage()
    return (
        <Carousel
            withIndicators
            // slideSize={screen > 786 ? '50%' : '100%'}
            slideGap="sm"
            loop
            align="start"
            slidesToScroll={1}
            classNames={{
                indicators: classes.indicators,
                control: classes.control,
                slide: classes.slide
            }}
        >
            {TestimonialCarouselCardData.map((item, index) =>
                <Carousel.Slide key={index}>
                    <Card className={classes['card-wrapper']}>
                        <Card.Section className={classes.section} p='1rem'>
                            <Image src={item.imgPath} alt={item.alt} fit='fill'/>
                        </Card.Section>

                        <Stack pt='1rem' className={classes['text-wrapper']}>
                            <Flex justify='center'>
                                <Anchor
                                    ta='center'
                                    w='fit-content'
                                    c='var(--mantine-color-blue-7)'
                                    href={item.siteRef}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >{item.siteName}</Anchor>
                            </Flex>

                            <Text className={classes.review}>{lang(item.text)}</Text>

                            <Text ta='end' fw={800}>{lang(item.who)}</Text>

                        </Stack>
                    </Card>
                </Carousel.Slide>
            )}
        </Carousel>
    )
}
