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

import Settings from "./Settings.js";

let url;
let enabled;
let gems;
Settings.subscribe(settings => {
	url = settings.gem_url;
	enabled = settings.gem_enable;
	gems = settings.gem_amount;
});

export async function getGems() {
	if (enabled) {
		if (url) {
			const response = await fetch(url);
			return Number.parseInt(await response.text());
		} else {
			return gems;
		}
	} else {
		return 0;
	}
}

export async function addGems(amount) {
	if (enabled) {
		if (url) {
			await fetch(url, {
				method: "ADD",
				body: amount,
			});
		} else {
			Settings.update(old => ({
				...old,
				gem_amount: old.gem_amount + amount,
			}));
		}
	}
}
