import PropTypes from "prop-types";

const updateSessionStore = (key, data) => {
    if (Array.isArray(key)) {
        key.forEach((key, value) => sessionStorage.setItem(key, JSON.stringify(value)));
    } else {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
};

const getFromSessionStore = (key) => {
    let val = sessionStorage.getItem(key),
        temp;
    if(val) {
        // temp = sC.decrypt(val);
        temp = JSON.parse(val);
    }
    return val ? temp : null
}

export {updateSessionStore, getFromSessionStore}

updateSessionStore.prototype = {
    key: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
}
