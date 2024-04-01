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
	gem_gems_beforetime: 12,
	gem_gems_ontime: 10,
	gem_gems_aftertime: 9,
	gem_gems_notime: 12,
};
