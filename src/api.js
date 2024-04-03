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
