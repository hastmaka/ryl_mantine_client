import PropTypes from "prop-types";
import {Box, Paper, Stack} from "@mantine/core";
import EzCardHeader from "./EzCardHeader.jsx";

export default function EzCard({children, innerContainer, container, customHeader, ...rest}) {
    return (
        <Stack component={Paper} pos='relative' display='flex' gap={0} {...container}>
            {customHeader ? customHeader : rest?.title && <EzCardHeader {...rest}/>}
            <Box style={{padding: '1rem'}} {...innerContainer}>
                {children}
            </Box>
        </Stack>
    )
}

EzCard.propTypes = {
    children: PropTypes.node.isRequired,
    rest: PropTypes.object,
    innerContainer: PropTypes.object,
    container: PropTypes.object,
    customHeader: PropTypes.node
}
