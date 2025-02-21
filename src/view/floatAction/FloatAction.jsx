import {Affix, Button} from '@mantine/core'
import classes from './FloatAction.module.scss'
import {IconForms, IconLanguage} from "@tabler/icons-react";
import {createElement, useEffect, useMemo, useRef, useState} from "react";
import {generalSignal} from "@/signal/generalSignal.js";
import MessageForm from "@/component/messageForm/MessageForm.jsx";
import {motion} from "framer-motion";
import {deepSignal} from "deepsignal/react";

const MotionAffix = motion.create(Affix)

const signal = deepSignal({
    expanded: ''
})

export default function FloatAction() {
    // const [expanded, setExpanded] = useState('')
    const {setLanguage, language} = generalSignal
    const refs = useRef([]);

    const addRef = (ref, index) => {
        if (ref && !refs.current[index]) {
            refs.current[index] = ref; // Assign ref to the specific index
        }
    };

    const handleClickOutside = (event) => {
        if (refs.current.every((ref) => ref && !ref.contains(event.target))) {
            signal.expanded = '';
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {document.removeEventListener('click', handleClickOutside)};
    }, []);

    // useEffect(() => {console.log(signal.expanded)}, [signal.expanded])

    const ACTIONS = useMemo(() => [
        {
            name: 'language',
            text: language === 'en' ? 'Spanish' : 'English',
            icon: IconLanguage,
            onClick: () => {
                // if (screen < 600) signal.expanded = signal.expanded ? '' : name
                setLanguage(language === 'en' ? 'es' : 'en')
            }
        },
        {
            name: 'contact',
            text: language === 'en' ? 'Contact Us' : `Contáctenos`,
            icon: IconForms,
            onClick: () => {
                const modalOptions = {
                    modalId: 'contact-us-modal',
                    title: 'Contact Us',
                    children: <MessageForm action />,
                    onClose: () => (signal.expanded = '')
                };

                if (generalSignal.screen < 600) {
                    modalOptions.size = '370px';
                }

                openModal(modalOptions);
            }
        }
    ], [language, setLanguage, screen])

    return ACTIONS.map(({text, icon, onClick, name}, index) => (
        <MotionAffix
            ref={(ref) => addRef(ref, index)}
            key={index}
            position={{right: 0, top: 100 + index * 40}}
            onMouseEnter={() => signal.expanded = name}
            onMouseLeave={() => signal.expanded = ''}
            initial={{
                maxWidth: '80px',
                transform: 'translateX(60%)'
            }}
            animate={{
                maxWidth: signal.expanded === name ? '160px' : '80px',
                transform: signal.expanded === name ? 'translateX(0%)' : 'translateX(60%)',
                // backgroundColor: signal.expanded === index ? 'rgba(7, 86, 103, 0.8)' : 'rgba(7, 86, 103, 0.6)',
            }}
            whileHover={{
                maxWidth: '180px',
                transform: 'translateX(0%)',
            }}
            transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            <Button.Group>
                <span
                    className={classes.item}
                    onClick={() => signal.expanded = name}
                    style={{
                        cursor: 'pointer',
                        width: '40px',
                        height: '36px',
                        color: 'white',
                    }}
                >{createElement(icon, {width: '20px', height: '20px'})}</span>
                <Button
                    variant='light'
                    color='white'
                    className={classes.item}
                    onClick={onClick}
                >{text}</Button>
            </Button.Group>
        </MotionAffix>
    ))
}