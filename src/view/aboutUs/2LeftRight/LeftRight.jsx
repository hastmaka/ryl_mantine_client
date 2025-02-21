import {Box, Flex, Stack, Text} from "@mantine/core";
import SContainer from "../../../component/SContainer.jsx";
import {AboutUsData} from "../../../static/AboutUsData.js";
import useLanguage from "../../../util/hook/useLanguage.jsx";
import MotionImage from "./MotionImage.jsx";
export default function LeftRight() {
    const lang = useLanguage()

    return AboutUsData.map(({header, text, imgPath, alt}, index) => {
        const odd = index % 2 === 0
        return <SContainer
            bg={odd ? '#ffffff' : '#f9f9f9'}
            key={index}
            {...(odd && {id: 'left-right'})}
            innerProps={{p: 0}}
        >
            <Flex
                direction={{
                    base: 'column',
                    sm: odd ? 'row' : 'row-reverse',
                }}
                gap={{base: '1rem', md: '2rem'}}
                py={{base: '2rem', md: '4rem'}}
                {...(odd ? {pl: '1rem'}:{pr: '1rem'})}
            >
                <Stack
                    flex={1}
                    justify='center'
                    align='left'
                    gap={{base: '1rem', md: '2rem'}}
                >
                    <Text
                        fw={700}
                        size='clamp(1.5rem, 1.5rem + 1px, 2.4rem)'
                        c='var(--mantine-color-ratio-0)'
                        {...(!odd ? {pl: '1rem'}:{pr: '1rem'})}
                    >{lang(header)}</Text>
                    <Text
                        ta='justify'
                        {...(!odd ? {pl: '1rem'}:{pr: '1rem'})}
                    >{lang(text)}</Text>
                </Stack>
                <Box flex={1}>
                    <MotionImage
                        imgPath={imgPath}
                        alt={alt}
                        odd={odd}
                    />
                </Box>
            </Flex>
        </SContainer>
    })
}
