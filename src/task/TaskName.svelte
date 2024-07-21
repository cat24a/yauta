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
	import { updateValue } from "./util.js";

	export let task;

	let name = task.name;
	let thisthing;
</script>

<p
	class:done={task.done}
	contenteditable
	bind:this={thisthing}
	bind:innerText={name}
	on:keypress={event => {
		if (event.key == "Enter") {
			event.preventDefault();
			thisthing.blur();
		}
	}}
	on:blur={event => {
		updateValue(task, "name", name);
	}}
/>

<style>
	p {
		margin: 0;
		padding: 1.25em 0;
		flex-grow: 1;
		outline: none;
		word-break: break-word;
		flex-shrink: 1;
	}

	p.done {
		text-decoration: line-through;
	}
</style>
