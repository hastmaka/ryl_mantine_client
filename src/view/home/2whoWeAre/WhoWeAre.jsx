import SContainer from "../../../component/SContainer.jsx";
import EzTitle from "../../../component/EzTitle.jsx";
import {Stack, Text, Image, Center, Flex} from "@mantine/core";
import useLanguage from "../../../util/hook/useLanguage.jsx";
import classes from '../Home.module.scss'

export default function WhoWeAre() {
    const lang = useLanguage()
    return (
        <SContainer bg='#ffffff' id='who-we-are'>
            <Flex
                py={{base: '2rem', md: '4rem'}}
                direction={{base: 'column', md: 'row'}}
                gap={{base: '1rem', md: '2rem'}}
            >
                <Stack gap={0} flex={1}>
                    <EzTitle
                        h3={lang('home.who-we-are.h3')}
                        h4={lang('home.who-we-are.h4')}
                    />
                    <Text pt='1rem' ta='justify'>{lang('home.who-we-are.text1')}</Text>
                    <Text pt='1rem' ta='justify'>{lang('home.who-we-are.text2')}</Text>
                </Stack>
                <Flex gap={0} flex={1} className={classes['images-container']}>
                    <div>
                        <Image className={classes.img_1} src='/view/home/generic-2-small.webp' alt='section 2'/>
                    </div>
                    <div>
                        <Image className={classes.img_2} src='/view/home/generic-3-small.webp' alt='section 3'/>
                    </div>
                    <div>
                        <Image className={classes.img_3} src='/view/home/generic-1-small.webp' alt='section 1'/>
                    </div>
                </Flex>
            </Flex>
        </SContainer>
    )
}

WhoWeAre.propTypes = {}
