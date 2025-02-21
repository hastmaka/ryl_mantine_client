import useLanguage from "../../../util/hook/useLanguage.jsx";
import {Stack, Text} from "@mantine/core";
import SContainer from "../../../component/SContainer.jsx";

export default function Important() {
    const lang = useLanguage()
    return (
        <SContainer bg='#ffffff'>
            <Stack py={{base: '2rem', md: '4rem'}} gap='1rem'>
                <Text>{lang('service.important.text')}</Text>
                <Text>{lang('service.important.text1')}</Text>
                <Text>{lang('service.important.text2')}</Text>
            </Stack>
        </SContainer>

    )
}
