import {Modal} from "@mantine/core";
import classes from './Modal.module.scss'
import toast from "@/ezMantine/toast/toast.jsx";
import {useLayoutEffect, useState} from "react";
import EzLoadingOverlay from "@/ezMantine/loadingOverlay/EzLoadingOverlay.jsx";
import {deepSignal} from "deepsignal/react";

const signal = deepSignal({
    loading: {},
    opened: {}
})

export default function ModalManager() {
    const [modals, setModals] = useState([])

    const openModal = (modal) => {
        if (!modal.modalId) throw new Error('modalId is required')
        setModals(prev => {
            //check if modal already exists
            if (prev.find(m => m.modalId === modal.modalId)) {
                throw new Error(`Modal with id ${modal.modalId} already exists`)
            }
            return [...prev, modal]
        });
        setTimeout(() => {
            signal.opened = {...signal.opened,[modal.modalId]: true}
        }, 10); // slight delay to trigger transition
    }
    const closeModal = (modalId) => {
        //animate out then safe remove the modal
        signal.opened = {...signal.opened,[modalId]: false}
        setTimeout(() => {
            setModals(prev => prev.filter(modal => modal.modalId !== modalId))
            signal.loading = {...signal.loading,[modalId]: false}
        }, 200)
    }
    const modalIsLoading = (modalId) => {
        signal.loading = {
            ...signal.loading,
            [modalId]: true
        }
    }

    //when make an operation in place and don't need to close the modal just update the loading state
    const modalIsDone = (modalId) => {
        signal.loading = {...signal.loading,[modalId]: false}
    }

    useLayoutEffect(() => {
        window.openModal = openModal
        window.closeModal = closeModal
        window.modalIsLoading = modalIsLoading
        window.modalIsDone = modalIsDone
        window.toast = toast
    }, [])

    return modals.map(({children, modalId, onClose, ...rest}, index) => {
        if (!onClose || typeof onClose !== 'function') throw new Error('onClose is required and must be a function')
        return <Modal
            key={index}
            opened={signal.opened[modalId]}
            onClose={() => {
                closeModal(modalId)
                if (onClose) onClose()
            }}
            closeOnClickOutside={false}
            centered={true}
            size='50%'
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            classNames={{
                header: classes.header,
                content: !rest?.fullScreen ? classes.content : classes['content-full'],
                close: classes.close,
                body: !rest?.fullScreen ? null : classes['body-full'],
            }}
            {...rest}
        >
            {signal.loading?.[modalId] && <EzLoadingOverlay.modal visible={signal.loading[modalId]} />}
            {children}
        </Modal>
    })
}

ModalManager.propTypes = {}
