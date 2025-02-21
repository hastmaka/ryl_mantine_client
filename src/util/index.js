import {isElementInView} from "@/util/isElementInView.js";
import {autoScroll} from "@/util/autoScroll.js";
import {updateSessionStore, getFromSessionStore} from "@/util/updateSessionStorage.js";

export {
    getFromSessionStore,
    updateSessionStore,
    autoScroll,
    isElementInView
}

export async function formatPhoneNumber() {
    return await import('./formatPhoneNumber.js')
}

export async function findDifferences() {
    return await import('./findDifferences.js')
}

export async function getCreateArray() {
    return await import('./createArray.js');
}

export async function getFormatDate() {
    return await import('./formatDate.js');
}

export async function getFormatMoney() {
    return await import('./formatMoney.js');
}

export async function getCapitalize() {
    return await import('./capitalize.js');
}

export async function getSendEmail() {
    return await import('../api/sendEmail.js');
}

export async function getSetCookie() {
    return await import('./cookie/Cookie.js');
}

export async function getGetCookie() {
    return await import('./cookie/Cookie.js');
}

export async function checkIfObjectHasKey() {
    return await import('./checkIfObjectHasKey.js');
}

export async function isNumber() {
    return await import('./isNumber.js');
}

export async function convertData() {
    return await import('./convertData.js');
}

export async function encodeDecode() {
    return await import('./encodeDecode.js');
}
