import PropTypes from "prop-types";

export function isNumber(str) {
    return !isNaN(str) && str.trim() !== ""; // Exclude empty strings
}

isNumber.propTypes = {
    value: PropTypes.string.isRequired,
}