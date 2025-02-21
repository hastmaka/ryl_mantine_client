import PropTypes from "prop-types";
import {Flex} from "@mantine/core";
import classes from './ToolBar.module.scss'

export default function ToolBar({children}) {

    return (
        <Flex
            justify='space-between'
            align='center'
            p='1rem'
            direction='row'
            // h={50}
            className={classes.toolbar}
        >
            {children}
        </Flex>

    );
}

ToolBar.propTypes = {
    children: PropTypes.node.isRequired
}