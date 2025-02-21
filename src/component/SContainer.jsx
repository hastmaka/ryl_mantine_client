import PropTypes from "prop-types";
import {Flex, Stack} from "@mantine/core";
import classes from './SContainer.module.scss';

export default function SContainer({children, innerProps,...rest}) {
    return (
        <Flex w='100%' component='section' {...rest}>
            <Stack
                maw='1120px'
                m='0 auto'
                flex={1}
                pos='relative'
                className={classes['s-container']}
                {...innerProps}
            >
                {children}
            </Stack>
        </Flex>
    )
}

SContainer.propTypes = {
    children: PropTypes.node.isRequired,
    innerProps: PropTypes.object
}
