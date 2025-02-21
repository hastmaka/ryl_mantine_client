import {Flex, Stack, Text} from "@mantine/core";
import EzTitle from "@/component/EzTitle.jsx";
import SContainer from "@/component/SContainer.jsx";
import useLanguage from "@/util/hook/useLanguage.jsx";
import MessageForm from "@/component/messageForm/MessageForm.jsx";

export default function BeInTouch() {
    const lang = useLanguage()

    return (
        <SContainer bg='#ffffff' id='be-in-touch'>
            <Flex
                py={{base: '2rem', md: '4rem'}}
                gap={{base: '1rem', md: '2rem'}}
                direction={{base: 'column', md: 'row'}}
            >
                <Stack gap={0} flex={1}>
                    <EzTitle h3={lang('contactUs.h3')} h4={lang('contactUs.h4')}/>

                    <Stack gap='1rem'  pt='2rem'>
                        <Text ta='justify'>{lang('contactUs.text')}</Text>
                        <Text>{lang('contactUs.email')}</Text>
                        <Text>{lang('contactUs.phone')}</Text>
                        <Text ta='justify'>{lang('contactUs.text1')}</Text>
                    </Stack>
                </Stack>


                <MessageForm/>
            </Flex>


        </SContainer>
    )
}
