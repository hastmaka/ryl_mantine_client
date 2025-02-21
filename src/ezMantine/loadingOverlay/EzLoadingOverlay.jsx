import PropTypes from "prop-types";
import {LoadingOverlay} from "@mantine/core";

function EzLoadingOverlayModal({visible}) {
    return (
        <LoadingOverlay
            zIndex={1200}
            mt={60}
            visible={visible}
            loaderProps={{ color: 'dark', type: 'dots' }}
        />
    )
}

function EzLoadingOverlayForm({visible}) {
    return (
        <LoadingOverlay
            visible={visible}
            loaderProps={{ color: 'dark', type: 'dots' }}
        />
    )
}

EzLoadingOverlayModal.propTypes = {
    visible: PropTypes.bool.isRequired
}

EzLoadingOverlayForm.propTypes = {
    visible: PropTypes.bool.isRequired
}

const EzLoadingOverlay = {
    modal: EzLoadingOverlayModal,
    form: EzLoadingOverlayForm
}

export default EzLoadingOverlay