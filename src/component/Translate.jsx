import {generalSignal} from "../signal/generalSignal.js";
import {useGoogleTranslateScript} from "../util/hook/index.js";
import {Text, Portal} from "@mantine/core";
import classes from '../view/navbar/Navbar.module.scss';
import {motion} from "framer-motion";
import PropTypes from "prop-types";
import {getSetCookie} from "../util/index.js";

const setLanguage = async (value) => {
    const setCookie = await getSetCookie();
    setCookie('googtrans', `/en/${value}`, 'Session')
    generalSignal.setLanguage(value)
    window.location.reload()
}

export default function Translate({variants}) {
    const {language} = generalSignal
    // google translator
    useGoogleTranslateScript()

    return (
        <>
            <Portal>
                <div id="google_translate_element" style={{display: 'none', zIndex: -9999}}/>
            </Portal>

            <motion.li style={{height: '100%', listStyle: 'none'}} variants={variants}>
                <Text
                    component='a'
                    className={classes.link}
                    onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                    href='#'
                    translate='no'
                >{language === 'en' ? 'SPANISH' : 'ENGLISH'}</Text>
            </motion.li>
        </>
    )
}

Translate.propTypes = {
    variants: PropTypes.object
}
