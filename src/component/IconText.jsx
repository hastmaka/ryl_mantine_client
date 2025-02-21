import PropTypes from "prop-types";
import {Group} from "@mantine/core";
import EzText from "@/ezMantine/text/EzText.jsx";
import {createElement} from "react";

export default function IconText({icon, text}) {
    return (
        <Group wrap='no-wrap'>
            {createElement(icon, {stroke: 1, style: {minHeight: '1.5rem', minWidth: '1.5rem'}})}
            <EzText>{text}</EzText>
        </Group>
    )
}

IconText.propTypes = {
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired
}
