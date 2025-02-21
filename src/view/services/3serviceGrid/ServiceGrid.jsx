import SContainer from "@/component/SContainer.jsx";
import {Grid, Stack} from "@mantine/core";
import EzTitle from "@/component/EzTitle.jsx";
import useLanguage from "@/util/hook/useLanguage.jsx";
import ServiceCard from "./ServiceCard.jsx";
import {ServiceCardData} from "@/static/ServiceCardData.js";
import classes from '../Services.module.scss';

export default function ServiceGrid() {
    const lang = useLanguage()
    return (
        <SContainer className={classes['service-grid']}>
            <Stack py={{base: '2rem', md: '4rem'}} gap={0}>
                <EzTitle h3={lang('service.service-grid.h3')} h4={lang('service.service-grid.h4')}/>

                <Grid pt='2rem'>
                    {ServiceCardData.map((item, index) =>
                        <Grid.Col key={index} span={{ base: 12, xs: 6, lg: 4 }} style={{display: 'flex'}}>
                            <ServiceCard item={item}/>
                        </Grid.Col>
                    )}
                </Grid>
            </Stack>
        </SContainer>
    )
}
