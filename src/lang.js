import { readable, writable } from "svelte/store";

import Settings from "./Settings";

export const supported = ["en", "pl"];

let lang = {};
let langname;

const navlang = navigator.languages.filter(l => supported.includes(l))[0];

Settings.subscribe(async settings => {
	if (langname === (settings.general_lang || navlang)) return;
	langname = settings.general_lang || navlang;
	if (["", undefined, "en"].includes(langname)) {
		lang = {};
		return;
	}
	const response = await fetch(`/lang/${langname}.json`);
	if (!response.ok) return;
	lang = await response.json();
	translate.set(translateInternal);
	checkTranslation.set(checkTranslationInternal);
});

/**
 *
 * @param {string} string
 * @returns {string}
 */
function translateInternal(string) {
	if (string == undefined) return undefined;
	string = string.trim().replace(/\s+/g, " ");
	return lang[string] || string;
}

function checkTranslationInternal(string) {
	return lang[string.trim().replace(/\s+/g, " ")];
}

export const translate = writable(translateInternal);
export const checkTranslation = writable(checkTranslationInternal);
