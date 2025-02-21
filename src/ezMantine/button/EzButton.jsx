import PropTypes from "prop-types";
import button from './EzButton.module.scss'
import {Button, Tooltip} from "@mantine/core";

export default function EzButton({children, tooltip, ...rest}) {
    const btn = () => {
        return (
            <Button
                classNames={button}
                variant='outline'
                {...rest}
            >{children}</Button>
        )
    }

    if (tooltip) {
        return (
            <Tooltip color='dark.6' label={tooltip}>
                {btn()}
            </Tooltip>
        )
    } else return btn()
}

EzButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array,
        PropTypes.string
    ]),
    tooltip: PropTypes.string
}