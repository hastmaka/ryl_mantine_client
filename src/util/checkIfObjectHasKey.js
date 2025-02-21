import PropTypes from "prop-types";

export function checkIfObjectHasKey(obj, keys) {
    if (typeof obj !== 'object' || obj === null || !Array.isArray(keys)) {
        return false;
    }
    return keys.every(key => key in obj) || false;
}

checkIfObjectHasKey.propTypes = {
    obj: PropTypes.object.isRequired,
    key: PropTypes.array.isRequired,
}