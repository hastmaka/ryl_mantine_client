import PropTypes from "prop-types";
import {Text} from "@mantine/core";

export default function EzText({fw, children, ...rest}) {
    const fwMap = {
        xs: 400,
        sm: 500,
        md: 600,
        lg: 700,
        xl: 800,
        xxl: 900,
    }
    return <Text fw={fwMap[fw]} {...rest}>{children}</Text>
}

EzText.propTypes = {
    fw: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
    children: PropTypes.node.isRequired
}