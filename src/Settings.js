import { writable } from 'svelte/store';

const initialsettings = {};

const Settings = writable(initialsettings);
export default Settings;