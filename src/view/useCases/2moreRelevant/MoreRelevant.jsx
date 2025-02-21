import SContainer from "../../../component/SContainer.jsx";
import EzTitle from "../../../component/EzTitle.jsx";
import {Stack, Text} from "@mantine/core";
import useLanguage from "../../../util/hook/useLanguage.jsx";
import UseCasesGrid from "./UseCasesGrid.jsx";
import classes from '../UseCases.module.scss';

export default function MoreRelevant() {
    const lang = useLanguage()
    return (
        <SContainer bg='#ffffff' id='more-relevant'>
            <Stack py={{base: '2rem', md: '4rem'}} gap={0}>
                <EzTitle
                    h3={lang('useCases.more-relevant.h3')}
                    h4={lang('useCases.more-relevant.h4')}
                />

                <Text
                    className={classes.text}
                    pt='1rem'
                >{lang('useCases.more-relevant.text')}</Text>

                <UseCasesGrid/>
            </Stack>
        </SContainer>
    )
}
