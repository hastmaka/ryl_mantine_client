import PropTypes from "prop-types";
import classes from './EzCard.module.scss'
import {Flex} from "@mantine/core";
import ActionIconsToolTip from "@/component/ActionIconsToolTip.jsx";
import {IconPlus} from "@tabler/icons-react";
import EzText from "@/ezMantine/text/EzText.jsx";

export default function EzCardHeader({title, handleAdd, tooltip}) {
    return (
        <Flex justify='space-between' className={classes['card-header']}>
            <EzText>{title}</EzText>
            {handleAdd && <ActionIconsToolTip
                items={[{
                    tooltip,
                    variant: 'outline',
                    icon: <IconPlus onClick={handleAdd}/>
                }]}/>}
        </Flex>
    )
}

EzCardHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleAdd: PropTypes.func,
    tooltip: PropTypes.string
}
