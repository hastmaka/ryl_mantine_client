import PropTypes from 'prop-types'
import {ActionIcon, Flex} from '@mantine/core'
import EzText from "@/ezMantine/text/EzText.jsx";
import {IconLogout} from "@tabler/icons-react";
import {CrmController} from "@/view/crm/CrmController.js";

export default function ToolBar() {
    const {handleLogout} = CrmController
    return (
        <Flex justify='space-between' p='1rem'>
            <EzText>logo</EzText>
            <ActionIcon variant='transparent' onClick={handleLogout}>
                <IconLogout/>
            </ActionIcon>
        </Flex>
    );
}

ToolBar.propTypes = {}