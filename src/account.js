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

import { writable } from "svelte/store";
import Tasks from "./Tasks.js";
import { sha3, aes, unaes } from "./crypto_util.js";
import { sendApiRequest } from "./api.js";
import Settings from "./Settings.js";
import { defaults as defaultSettings } from "./Settings.js";

export const needLogin = writable(false);
export const message = writable("logging in...");
export const isLoggedIn = writable(false);
let loginData = JSON.parse(localStorage.getItem("logindata"));
let session = "";
let dataChanged = false;
let data = {};
let saveTimeout;
let useYH = true;
export const done = writable(false);

export async function login() {
	message.set("logging in...");
	if (!loginData) {
		announceFail("login required");
		return;
	}
	useYH = true;
	let response = await sendApiRequest({
		user: sha3(loginData.user),
		pass: loginData.passhash,
		action: "new_session",
	});
	if (response.error) {
		response = await sendApiRequest({
			user: sha3(loginData.user),
			pass: sha3(loginData.pass),
			action: "new_session",
		});
		useYH = false;
	}
	if (response.error) {
		if ((response.error = "wrong_data")) announceFail("wrong password");
		else announceFail("server error");
		return;
	}
	session = response.session;
	data = unaes(response.data, useYH ? loginData.key : loginData.pass);
	Tasks.set(data.tasks || []);
	Settings.set({
		...defaultSettings,
		...(data.settings || {}),
	});
	dataChanged = false;
	needLogin.set(false);
	isLoggedIn.set(true);
	clearTimeout(saveTimeout);
	saveData();
	done.set(true);
}

export function setLoginData(newData) {
	loginData = newData;
}

function addStoredStore(store, name) {
	store.subscribe(newTasks => {
		dataChanged = true;
		data[name] = newTasks;
		done.set(false);
		console.log("registered changes");
	});
}

addStoredStore(Tasks, "tasks");
addStoredStore(Settings, "settings");

async function saveData() {
	if (dataChanged && session) {
		let response = await sendApiRequest({
			action: "update",
			user: sha3(loginData.user),
			pass: useYH ? loginData.passhash : sha3(loginData.pass),
			session,
			data: aes(data, useYH ? loginData.key : loginData.pass),
		});
		if (response.error) {
			announceFail(
				"disconnected because of login on another device - please, refresh the page",
				false
			);
			return;
		}
		console.log("saved");
		dataChanged = false;
		done.set(true);
	}
	saveTimeout = setTimeout(saveData, 1000);
}

function announceFail(message_, need_login_ = true) {
	console.log("login failed: ", message_);
	session = "";
	needLogin.set(need_login_);
	isLoggedIn.set(false);
	message.set(message_);
}
