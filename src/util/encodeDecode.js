import SimpleCrypto from "simple-crypto-js";

export const encodeDecode = (value, type) => {
    /**
     * Encode or decode a value
     * @param  {String} value value you want to encode or decode
     * @param  {String} type option are 'encode' or 'decode'
     * @returns {String} - The encoded or decoded value
     **/

    let secret = import.meta.env.VITE_REACT_APP_ENCRYPT_KEY,
        encoder = new SimpleCrypto(secret);

    if (type === 'encode') {
        return encoder.encrypt(value);
    } else {
        return encoder.decrypt(value);
    }
}