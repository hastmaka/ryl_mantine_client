import PropTypes from "prop-types";
import EzButton from "@/ezMantine/button/EzButton.jsx";
import {Flex} from "@mantine/core";
import classes from "./SaveCancelBtns.module.scss";

export default function SaveCancelBtns({handleCancel, handleSave, rest}) {
    return (
        <Flex
            justify='flex-end'
            gap={16}
            pt='1rem'
            className={classes['save-cancel-btns']}
            {...rest}
        >
            <EzButton onClick={handleCancel} c='red.7'>Cancel</EzButton>
            <EzButton onClick={handleSave} c='teal.7'>Save</EzButton>
        </Flex>
    )
}

SaveCancelBtns.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    rest: PropTypes.object
}
