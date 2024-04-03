/*
    YAUTA (a todo app)
    Copyright (C) 2024  cat24a

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import CryptoJS from "crypto-js";
import WordArray from "crypto-js/lib-typedarrays.js";
import { inflate, deflate } from "pako";

export function sha3(x) {
	return CryptoJS.SHA3(x).toString(CryptoJS.enc.Base64);
}
export function yautahash(user, pass) {
	const base = `${user}::${pass}:::`;
	let i = 0;
	while (true) {
		if (!(CryptoJS.SHA3(base + i).words[15] & 0xf0f000ff)) {
			return `${user}::${pass}:::${i}`;
		}
		i++;
	}
}

export function aes(x, pass) {
	return CryptoJS.AES.encrypt(
		WordArray.create(deflate(JSON.stringify(x))),
		pass
	).toString();
}
export function unaes(x, pass) {
	return JSON.parse(
		inflate(wordArray2Uint8Array(CryptoJS.AES.decrypt(x, pass)), {
			to: "string",
		})
	);
}

function wordArray2Uint8Array(wordArray) {
	// made by ChatGPT
	const uint8ArrayConverted = new Uint8Array(wordArray.sigBytes);
	for (let i = 0; i < wordArray.sigBytes; i++) {
		uint8ArrayConverted[i] =
			(wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	}
	return uint8ArrayConverted;
}
