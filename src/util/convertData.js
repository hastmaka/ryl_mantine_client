import {CrmController} from "../view/crm/CrmController.js";

const getValueFromStore = (store, value) => {
    if (store) {
        return store.find(item => item.value === value)?.label || '';
    }
}

export const valueToLabel = (storeName, value) => {
    let store = CrmController.getStore(storeName);
    return getValueFromStore(store, `${value}`);
}

export const getPrimary = (items, property) => {
    let primary = {};
    if ((items && items.length)) {
        primary = items.find(item => item[property]) || items[0];
    }
    return primary;
}

export const getFullAddress = (value) => {
    let address = '';
    if (typeof value === 'object') {
        let {address_street, address_apt, address_city, address_state, address_zip} = value;
        address = `${address_street}${address_apt ? ' ' + address_apt : ''}, ${address_city}, ${address_state}, ${address_zip}`
    }
    return address;
}

