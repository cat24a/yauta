import CryptoJS from "crypto-js";
import WordArray from "crypto-js/lib-typedarrays.js";
import {inflate, deflate} from "pako";

export function sha3(x) {
    return CryptoJS.SHA3(x).toString(CryptoJS.enc.Base64);
}
export function aes(x, pass) {
    return CryptoJS.AES.encrypt(WordArray.create(compress(JSON.stringify(x))), pass).toString();
}
export function unaes(x, pass) {
    return JSON.parse(decompress(wordArray2Uint8Array(CryptoJS.AES.decrypt(x, pass))));
}

/**
 * @param {string} data
 */
export function compress(data) {
    return deflate(data);
}

/**
 * @param {Uint8Array} data
 */
export function decompress(data) {
    return inflate(data, {to: "string"});
}

function wordArray2Uint8Array(wordArray) { // made by ChatGPT
    const uint8ArrayConverted = new Uint8Array(wordArray.sigBytes);
    for (let i = 0; i < wordArray.sigBytes; i++) {
        uint8ArrayConverted[i] = (wordArray.words[(i >>> 2)] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    return uint8ArrayConverted;
}