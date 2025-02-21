import PropTypes from "prop-types";

export default function EzGrid ({children, ...rest}) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1rem',
                ...rest
            }}
        >
            {children}
        </div>
    )
}

EzGrid.propTypes = {
    children: PropTypes.node.isRequired
}