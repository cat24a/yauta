import Settings from "./Settings.js";

let url;
let enabled;
Settings.subscribe(settings => {
	url = settings.gem_url;
	enabled = settings.gem_enable;
});

export async function getGems() {
	if (enabled) {
		const response = await fetch(url);
		return Number.parseInt(await response.text());
	}
}

export async function addGems(amount) {
	if (enabled) {
		await fetch(url, {
			method: "ADD",
			body: amount,
		});
	}
}
