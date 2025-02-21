import PropTypes from "prop-types";

export function createArray(length, string) {
    return string
            ? Array.from({ length }, (_, index) => (index + 1 + string).toString())
            : Array.from({ length }, (_, index) => (index + 1).toString())
}

createArray.propTypes = {
    length: PropTypes.number.isRequired,
    string: PropTypes.string
}