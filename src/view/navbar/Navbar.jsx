import classes from './Navbar.module.scss';
import {Image, Group, Anchor, Flex, Burger} from "@mantine/core";
import {MenuItemsData} from "@/static/MenuItemsData.js";
import useLanguage from "@/util/hook/useLanguage.jsx";
import {Icons} from "@/static/icons/Icons.jsx";
import {motionSignal} from "@/signal/motionSignal.js";
import {motion} from "framer-motion";
import {NavLink, useLocation} from "react-router-dom";
import {generalSignal} from "@/signal/generalSignal.js";
import {useDisclosure} from "@mantine/hooks";
import DropDown from "@/component/dropDown/DropDown.jsx";
import {autoScroll, isElementInView} from "@/util/index.js";

const locMap = {
    '/': 'who-we-are',
    '/services': 'more-requested',
    '/about-us': 'left-right',
    '/use-cases': 'more-relevant',
    '/testimonial': 'testimonial-happy-client',
    '/contact-us': 'be-in-touch',
}

const whats = `https://wa.me/17253037777?text=Im%20interested%20in%20your%20service.`

export default function Navbar() {
    const lang = useLanguage()
    const {hero} = motionSignal
    const {screen, activePath, language, setLanguage} = generalSignal
    const [opened, { toggle }] = useDisclosure();
    const {pathname} = useLocation();
    const isBlog = pathname.startsWith("/blog");

    return (
        <motion.header
            className={classes.header}
            style={{
                position: isBlog ? 'sticky' : hero.bottom < 80 ? 'fixed' : 'absolute',
                top: isBlog || hero.bottom < 80 ? 0 : 'calc(100vh - 80px)',
                backgroundColor: isBlog || hero.bottom < 80 ? 'rgba(7,86,103,0.9)' : 'rgba(7,86,103,0.2)',
                boxShadow: isBlog || hero.bottom < 80 ? '-1px 4.0px 16.0px hsl(0deg 0% 0% / 0.25)' : 'none',
                transition: "background-color 0.2s, boxShadow 0.2s, position 0.2s",
                width: '100%',
                left: 0,
                height: '80px',
                backdropFilter: 'saturate(180%) blur(20px)',
                zIndex: 198,
                display: 'flex',
                justifyContent: screen > 1070 ? 'center' : 'right',
                alignItems: 'center'
            }}
        >
            <Image
                src='/logo.svg'
                alt='logo image'
                className={classes.logo}
            />

            {screen > 1070
                ?
                <>
                    <Flex gap='1rem' component='ul' align='center'>
                        {MenuItemsData.map(({textPath, href}, index) =>
                            <li
                                key={index}
                                className={classes['list-container']}
                                onClick={() => {
                                    if(href === '#')setLanguage(language === 'en' ? 'es' : 'en')
                                }}
                            >
                                <NavLink
                                    to={href}
                                    className={({isActive}) =>
                                        (`${classes.link} ${isActive && classes['link-active']}`)
                                    }
                                >{lang(textPath)}</NavLink>
                            </li>
                        )}
                        {/*<Translate/>*/}
                    </Flex>

                    <Group className={classes.phone}>
                        {Icons.simple.whatsApp}
                        <Anchor href={whats} target="_blank" rel="noreferrer" underline="never" c="#ffffffe2">
                            725-303-7777
                        </Anchor>
                    </Group>
                </>
                :
                <Burger
                    aria-label="Toggle navigation"
                    mr='1rem'
                    color='#fff'
                    opened={opened}
                    onClick={async () => {
                        toggle()
                        let activeLocation = locMap[window.location.pathname],
                            is = await isElementInView('main-carousel');
                        if(!opened && is) autoScroll(activeLocation || activePath)
                    }}
                />
            }
            <DropDown opened={opened} setShown={toggle}/>
        </motion.header>
    )
}

Navbar.propTypes = {}
