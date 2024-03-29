import Pako from "pako";

/**
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function sendApiRequest(data) {
	let response;
	try {
		response = await fetch("https://yauta.top/api.php", {
			method: "POST",
			body: Pako.gzip(JSON.stringify(data)),
		});
	} catch {
		return { error: "network_error" };
	}

	try {
		return await response.json();
	} catch {
		return { error: "api_error" };
	}
}
