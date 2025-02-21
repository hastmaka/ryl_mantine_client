import PropTypes from "prop-types";
import classes from './EzModal.module.scss'
import {CloseButton, Flex, Modal, Text} from "@mantine/core";
import {generalSignal} from "@/signal/generalSignal.js";
import {deepSignal} from "deepsignal/react";
import {useEffect, useRef} from "react";
import {serviceModalSignal} from "@/signal/serviceModalSignal.js";

const signal = deepSignal({
    scroll: false
})

export default function EzModal({header=true,title, children}) {
    const {modal, closeModal, updateModalDimensions, screen} = generalSignal
    const {resetServices, isSending} = serviceModalSignal
    const modalRef = useRef(null)

    //listener for scroll
    useEffect(() => {
        setTimeout(() => {
            const modalElement = modalRef.current?.children[1]?.children[0];
            if (!modalElement) return
            const checkForScrollbar = () => {
                signal.scroll = modalElement.scrollTop > 10
            };

            checkForScrollbar();
            modalElement.addEventListener('scroll', checkForScrollbar);

            return () => {
                modalElement.removeEventListener('scroll', checkForScrollbar)
            };
        }, 100)
    }, [modalRef, modal.open])

    //getting the modal dimensions to use it in the LoadingOverlay component
    useEffect(() => {
        if (modalRef.current && modal.open) {
            setTimeout(() => {
                let el = modalRef.current.children[1].children[0].getBoundingClientRect()
                updateModalDimensions({height: el.height, width: el.width})
            }, 200)
        }
    }, [modal.open, updateModalDimensions])

    return (
        <Modal
            ref={modalRef}
            id='service-modal'
            opened={modal.open}
            onClose={closeModal}
            withCloseButton={false}
            centered
            size='auto'
            {...(screen < 768 && {fullScreen: true})}
            classNames={{
                body: classes.body,
                content: classes.content
            }}
            style={{'--overflow-y': isSending ? 'hidden' : 'auto'}}
            transitionProps={{ transition: 'slide-up' }}
        >
            {header && <Flex
                h={60}
                p={{base: '.5rem 1rem', sm: '.5rem 1rem .5rem 2rem'}}
                align='center'
                justify='space-between'
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 400,
                    background: 'white',
                    boxShadow: signal.scroll ? '0 2px 10px 0 rgba(0,0,0,0.1)' : null,
                }}
            >
                <Text fw={800} c='gray.7'>{title}</Text>
                <CloseButton
                    autoFocus={false}
                    aria-label="Close modal"
                    onClick={() => {
                        closeModal()
                        resetServices()
                    }}
                />
            </Flex>}
            {children}
        </Modal>
    )
}

EzModal.propTypes = {
    header: PropTypes.bool,
    // children: PropTypes.oneOf([
    //     PropTypes.node,
    //     PropTypes.array,
    //     PropTypes.object,
    //     PropTypes.string,
    //     PropTypes.any
    // ]),
    title: PropTypes.string
}
