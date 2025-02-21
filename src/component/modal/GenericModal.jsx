import PropTypes from "prop-types";
import {Stack} from "@mantine/core";
import EzText from "@/ezMantine/text/EzText.jsx";
import AcceptCancelBtns from "@/component/AcceptCancelBtns.jsx";

export default function GenericModal({text, cancel, accept}) {
    return (
        <Stack>
            <EzText size="sm">{text}</EzText>
            <AcceptCancelBtns
                handleAccept={accept}
                handleCancel={cancel}
            />
        </Stack>
    )
}

GenericModal.propTypes = {
    text: PropTypes.string.isRequired,
    cancel: PropTypes.func.isRequired,
    accept: PropTypes.func.isRequired,
}
