import classes from './Footer.module.scss'
import {Flex, Image, Modal, Text} from "@mantine/core";
import SContainer from "@/component/SContainer.jsx";
import {FooterLegalItems, FooterMenuItems} from "@/static/MenuItemsData.js";
import useLanguage from "@/util/hook/useLanguage.jsx";
import FooterLinks from "./FooterLinks.jsx";
import {useDisclosure} from "@mantine/hooks";
import LegalModal from "@/component/modal/legal/LegalModal.jsx";

const bg = {
    backgroundColor: 'rgba(11,37,34,0.6)',
    backdropFilter: 'blur(2px)'
}

export default function Footer() {
    const lang = useLanguage()
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <SContainer bg='#ffffff' component='footer'>
                <Flex
                    py={{base: '2rem', md: '4rem'}}
                    gap={{base: '1rem', md: '2rem'}}
                    direction={{base: 'column', md: 'row'}}
                >
                    <Flex
                        flex={1}
                        justify={{base: 'center', md: 'flex-start'}}
                    >
                        <div className={classes.logo}>
                            <Image src='/full_logo_black.png' alt='logo'/>
                        </div>
                    </Flex>

                    <Flex
                        direction={{base: 'column', xs: 'row'}}
                        gap='1rem'
                    >
                        <FooterLinks title='SITE MAP' data={FooterMenuItems} lang={lang} flex={1}/>
                        <FooterLinks title='LEGAL' data={FooterLegalItems} lang={lang} flex={1} openModal={open}/>
                    </Flex>
                </Flex>
            </SContainer>

            <SContainer bg='#f9f9f9' component='section'>
                <Flex py='2rem' justify='center'>
                    <Text size='sm' ta='center'>{lang('footer.copyright')}</Text>
                </Flex>
            </SContainer>

            <Modal.Root
                opened={opened}
                onClose={close}
                fullScreen
                transitionProps={{ transition: 'slide-up' }}
            >
                <Modal.Overlay />
                <Modal.Content style={{...bg}}>
                    <Modal.Header style={{backgroundColor: 'rgba(19,66,62,0.9)', backdropFilter: 'blur(2px)'}}>
                        <Modal.Title>
                            <Text c='#FAFFFD'>Legal</Text>
                        </Modal.Title>
                        <Modal.CloseButton className={classes['modal-close-btn']}/>
                    </Modal.Header>
                    <Modal.Body>
                        <LegalModal/>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
        </>
    )
}
