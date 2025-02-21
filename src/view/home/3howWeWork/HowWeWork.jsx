import SContainer from "../../../component/SContainer.jsx";
import {Flex, Grid, Stack, Text} from "@mantine/core";
import EzTitle from "../../../component/EzTitle.jsx";
import useLanguage from "../../../util/hook/useLanguage.jsx";
import {howWeWorkData} from "../../../static/howWeWorkData.js";

export default function HowWeWork() {
    const lang = useLanguage()
    return (
        <SContainer bg='radial-gradient(circle, #e7e7e7 6%, #fff 6%) 0 0 / 2rem 2rem'>
            <Flex
                direction={{base: 'column', md: 'row'}}
                py={{base: '2rem', md: '4rem'}}
                gap='1rem'
            >
                <Stack
                    gap={0}
                    flex={{base: null, md: '0 0 15%'}}
                >
                    <EzTitle
                        h3={lang('home.how-we-work.h3')}
                        h4={lang('home.how-we-work.h4')}
                    />
                </Stack>

                <Grid
                    flex={1}
                    gutter={{ base: 16, xs: 'md', md: 'xl', xl: 32 }}
                >
                    {howWeWorkData.map(({number, header, text}, index) => (
                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={index}>
                            <Stack>
                                <Flex direction='row' gap='.5rem'>
                                    <Text size='48px' fw={900} c='#00000020'>{lang(number)}</Text>
                                    <Text
                                        fw={700}
                                        size='clamp(1.2rem, 1.4rem + 1px, 1.4rem)'
                                        pt='8px'
                                    >{lang(header)}</Text>
                                </Flex>
                                <Text ta='justify'>{lang(text)}</Text>
                            </Stack>
                        </Grid.Col>
                    ))}

                </Grid>
            </Flex>
        </SContainer>
    )
}

HowWeWork.proptypes = {}
