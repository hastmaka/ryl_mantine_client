import PropTypes from "prop-types";
import {Center, Loader} from "@mantine/core";

export default function EzLoader ({h, centerProps, ...rest}) {
    return (
        <Center h={h} {...centerProps} bg='var(--mantine-color-body)'>
            <Loader color='teal' size="xl" type="dots" {...rest}/>
        </Center>
    )
}

EzLoader.propTypes = {
    h: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    centerProps: PropTypes.object,
}
