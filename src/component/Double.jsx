import PropTypes from "prop-types";
import {Flex} from "@mantine/core";
import classes from './Double.module.scss'

export default function Double({children, reverse=false, ...rest}) {
    return (
        <Flex
            bg='#fff'
            className={`${reverse ? classes['double-container'] : classes['double-container-reverse']}`}
            {...rest}
        >
            {children}
        </Flex>
    )
}

Double.propTypes = {
    children: PropTypes.node.isRequired,
    reverse: PropTypes.bool,
}
