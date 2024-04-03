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

const initialsettings = {};

const Settings = writable(initialsettings);
export default Settings;

export const defaults = {
	// general
	general_showsavingstate: true,
	general_daterefreshtime: 0,

	// dog settings
	dogmode: false,
	dogcheck: false,

	// gems
	gem_enable: false,
	gem_url: "PLEASE PRESS THE BUTTON ON THE RIGHT OR IT WON'T WORK",
	gem_show_badge: true,
	gem_gems_beforetime: 12,
	gem_gems_ontime: 10,
	gem_gems_aftertime: 9,
	gem_gems_notime: 12,
};
