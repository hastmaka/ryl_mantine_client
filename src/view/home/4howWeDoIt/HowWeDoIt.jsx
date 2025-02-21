import SContainer from "../../../component/SContainer.jsx";
import EzTitle from "../../../component/EzTitle.jsx";
import {Stack, Text} from "@mantine/core";
import useLanguage from "../../../util/hook/useLanguage.jsx";
import classes from '../Home.module.scss';
import {techIconsData, techIcons_2} from "../../../static/TechIconsData.js";
import RenderIcons from "./RenderIcons.jsx";

export default function HowWeDoIt() {
    const lang = useLanguage()
    return (
        <SContainer bg='#ffffff'>
            <Stack
                py={{base: '2rem', md: '4rem'}}
                gap={0}
            >
                <EzTitle
                    h3={lang('home.technologies-we-use.h3')}
                    h4={lang('home.technologies-we-use.h4')}
                />

                <Text pt='2rem' className={classes.text}>{lang('home.technologies-we-use.text')}</Text>

                {RenderIcons(techIconsData)}
                {RenderIcons(techIcons_2)}
            </Stack>
        </SContainer>
    )
}