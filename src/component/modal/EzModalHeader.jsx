import {CloseButton, Flex, Text} from "@mantine/core";
import {generalSignal} from "@/signal/generalSignal.js";
import {serviceModalSignal} from "@/signal/serviceModalSignal.js";

export default function EzModalHeader() {
    const {closeModal} = generalSignal
    const {resetServices} = serviceModalSignal
    return (
        <Flex
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
            <Text fw={800} c='gray.7'>SERVICES</Text>
            <CloseButton
                autoFocus={false}
                aria-label="Close modal"
                onClick={() => {
                    closeModal()
                    resetServices()
                }}
            />
        </Flex>
    )
}
