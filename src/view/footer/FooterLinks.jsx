import PropTypes from "prop-types";
import {Grid, Stack, Text} from "@mantine/core";
import classes from "./Footer.module.scss";
import {NavLink} from "react-router-dom";
import {generalSignal} from "../../signal/generalSignal.js";

export default function FooterLinks({title, data, lang, openModal,...rest}) {
    return (
        <Stack gap='.5rem' {...rest}>
            <Text c='var(--mantine-color-ratio-0)'>{title}</Text>
            <Grid gap='1rem'>
                {data.map(({textPath, href, translate='yes'}, index) =>
                    <Grid.Col key={index} span={6} component='ul' className={classes['list-container']}>
                        <li
                            onClick={() => {
                                if (['/privacy-policy', '/terms-of-use'].includes(href)) {
                                    generalSignal.setLegal(href.split('/')[1])
                                    openModal()
                                }
                            }}
                        >
                            <NavLink
                                to={!['/privacy-policy', '/terms-of-use'].includes(href) ? href : '#'}
                                className={({isActive}) =>
                                    (`${classes.link} ${isActive && classes['link-active']}`)
                                }
                                translate={translate}
                            >{lang(textPath)}</NavLink>
                        </li>
                    </Grid.Col>
                )}
            </Grid>
        </Stack>
    )
}

FooterLinks.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    lang: PropTypes.func.isRequired,
    openModal: PropTypes.func
}
