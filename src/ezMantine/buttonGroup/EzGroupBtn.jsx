import PropTypes from "prop-types";
import classes from './EzGroupBtn.module.scss'
import {Group} from "@mantine/core";

export default function EzGroupBtn({children, className, ...rest}) {
    const onlyOne = children.length === 1
    return (
        <Group
            gap={0}
            className={`${onlyOne ? classes['only-one'] : classes['btn-container']} ${className}`}
            {...rest}
        >
            {children}
        </Group>
    )
}

EzGroupBtn.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}
