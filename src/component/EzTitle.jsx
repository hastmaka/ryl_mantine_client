import PropTypes from "prop-types";
import {Text} from "@mantine/core";

const h3Style = {
    fontSize: 'clamp(1rem, 1rem + 1px, 1.2rem)',
    fontWeight: 800,
    color: 'var(--mantine-color-ratio-0)'
}

const h4Style = {
    fontSize: 'clamp(1.5rem, 1.5rem + 1px, 2.4rem)',
    fontWeight: 800
}

export default function EzTitle({h3, h4}) {
    return (
        <>
            {h3 && <Text style={{...h3Style}}>{h3}</Text>}
            {h4 && Array.isArray(h4) ? (
                h4.map((item, index) => (
                    <Text key={index} style={{...h4Style}}>{item}</Text>
                ))
            ) : (
                <Text style={{...h4Style}}>{h4}</Text>
            )}
        </>
    )
}

EzTitle.propTypes = {
    h3: PropTypes.string,
    h4: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
}
