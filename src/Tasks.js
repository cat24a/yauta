import { writable } from "svelte/store";

const taskStore = writable([]);

export default taskStore;