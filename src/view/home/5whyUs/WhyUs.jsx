import SContainer from "../../../component/SContainer.jsx";
import {Flex, Stack, Text} from "@mantine/core";
import EzTitle from "../../../component/EzTitle.jsx";
import useLanguage from "../../../util/hook/useLanguage.jsx";
import MessageForm from "../../../component/messageForm/MessageForm.jsx";


export default function WhyUs() {
    const lang = useLanguage()

    return (
        <SContainer bg='#f9f9f9'>
            <Flex
                py={{base: '2rem', md: '4rem'}}
                gap={{base: '1rem', md: '2rem'}}
                direction={{base: 'column', md: 'row'}}
            >
                <Stack flex={1} gap={0}>
                    <EzTitle
                        h3={lang('home.why-us.h3')}
                        h4={lang('home.why-us.h4')}
                    />
                    <Text pt='2rem' ta='justify'>{lang('home.why-us.text')}</Text>
                </Stack>

                <MessageForm/>

            </Flex>
        </SContainer>
    )
}



