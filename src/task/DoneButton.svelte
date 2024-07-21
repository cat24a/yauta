<!--
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
-->

<script>
	import Settings from "../Settings.js";

	import { addGems } from "../gems.js";
	import { updateValue } from "./util.js";

	export let task;
	export let gemcount;

	function handleDone() {
		if ($Settings.gem_enable) {
			// gems
			if (!task.done) {
				addGems(gemcount);
				updateValue(task, "gems", gemcount);
			} else {
				addGems(-gemcount);
				updateValue(task, "gems", undefined);
			}
		}

		updateValue(task, "done", task.done ? false : Date.now());
	}
</script>

<button type="button" on:click={handleDone} class:done={task.done} />

<style>
	button {
		margin: 1rem 1.5rem;
		border: 2px solid #ddd;
		height: 1.5rem;
		width: 1.5rem;
		background-color: #eee;
		flex-shrink: 0;
	}
	button:hover {
		background-color: #ccc;
	}
	button.done {
		background-color: #19f;
	}
	button.done:hover {
		background-color: #2af;
	}
</style>
