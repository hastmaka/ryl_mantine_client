import PropTypes from "prop-types";
import EzButton from "@/ezMantine/button/EzButton.jsx";
import {Flex} from "@mantine/core";

export default function AcceptCancelBtns({handleCancel, handleAccept}) {
    return (
        <Flex
            justify='flex-end'
            gap={16}
            pt='1rem'
            style={{borderTop: `1px solid var(--mantine-color-default-border)`}}
        >
            <EzButton onClick={handleCancel} c='red.7'>Cancel</EzButton>
            <EzButton onClick={handleAccept} c='teal.7'>Accept</EzButton>
        </Flex>
    )
}

AcceptCancelBtns.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    handleAccept: PropTypes.func.isRequired
}
