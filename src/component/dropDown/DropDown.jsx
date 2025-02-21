import PropTypes from "prop-types";
import {AnimatePresence, motion} from "framer-motion";
import {MenuItemsData} from "../../static/MenuItemsData.js";
import useLanguage from "../../util/hook/useLanguage.jsx";
import classes from "./DropDown.module.scss";
import {Text} from '@mantine/core';
import {generalSignal} from "../../signal/generalSignal.js";

const itemVariants = {
    closed: {
        opacity: 0
    },
    open: { opacity: 1 }
};
const showMenu = {
    open: {
        opacity: 1,
        y: 0,
        display: "flex",
        boxShadow: '0px 5px 5px -3px rgba(145, 158, 171, 0.2), 0px 8px 10px 1px rgba(145, 158, 171, 0.14), 0px 3px 14px 2px rgba(145, 158, 171, 0.12)',
        transition: {
            staggerChildren: 0.1,
            duration: .1,
        }
    },
    closed: {
        y: 0,
        opacity: 0,
        boxShadow: null,
        display: "none",
        transition: {
            staggerChildren: 0.1,
            staggerDirection: -1,
            duration: .1,
            delay: .6
        },
    },
};


export default function DropDown({opened, setShown}) {
    const lang = useLanguage()
    const {language, setLanguage} = generalSignal
    return (
        <div className={classes['drop-down-container']}>
            <AnimatePresence>
                {open && (
                    <motion.ul
                        variants={showMenu}
                        initial="closed"
                        animate={opened ? "open" : "closed"}
                    >
                        {MenuItemsData.map(({textPath, href}, index) =>
                            <motion.li
                                variants={itemVariants}
                                key={index}
                                onClick={() => {
                                    if(href === '#') {
                                        setLanguage(language === 'en' ? 'es' : 'en')
                                    } else {
                                        window.navigate(href)
                                    }
                                    setShown()
                                }}
                            >
                                <Text
                                    component='a'
                                    href={href}
                                >{lang(textPath)}</Text>
                            </motion.li>
                        )}
                        {/*<Translate variants={itemVariants}/>*/}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

DropDown.propTypes = {
    opened: PropTypes.bool.isRequired,
    setShown: PropTypes.func.isRequired
}