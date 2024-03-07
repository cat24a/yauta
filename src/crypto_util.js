import CryptoJS from "crypto-js";
import WordArray from "crypto-js/lib-typedarrays.js";
import {inflate, deflate} from "pako";

export function sha3(x) {
    return CryptoJS.SHA3(x).toString(CryptoJS.enc.Base64);
}
export function yautahash(user, pass) {
    const base = `${user}::${pass}::`;
    let i = 0;
    while(true) {
        if(!(CryptoJS.SHA3(base+i).words[15]&0xf0f0000f))
            return CryptoJS.SHA3(`${pass}::${i}`).toString(CryptoJS.enc.Base64);
        i++;
    }
}

export function aes(x, pass) {
    return CryptoJS.AES.encrypt(WordArray.create(deflate(JSON.stringify(x))), pass).toString();
}
export function unaes(x, pass) {
    return JSON.parse(inflate(wordArray2Uint8Array(CryptoJS.AES.decrypt(x, pass)), {to:"string"}));
}

function wordArray2Uint8Array(wordArray) { // made by ChatGPT
    const uint8ArrayConverted = new Uint8Array(wordArray.sigBytes);
    for (let i = 0; i < wordArray.sigBytes; i++) {
        uint8ArrayConverted[i] = (wordArray.words[(i >>> 2)] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    return uint8ArrayConverted;
}