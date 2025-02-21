import PropTypes from "prop-types";

export const capitalize = (str, capitalizeAll = false) => {
    //convert the value to string always
    let s = typeof str === "string" ? str.toString() : str
    // Convert the entire string to uppercase if capitalizeAll is true
    if (capitalizeAll) {return s.toUpperCase()}

    const result = s.replace(/([A-Z])/g, ' $1');
    return result.replace(/\b\w/g, (char) => char.toUpperCase());
}

capitalize.protoType = {
    str: PropTypes.string.isRequired
}