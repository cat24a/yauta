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
	export let daysleft;

	let due = task.due;
	$: updateValue(task, "due", due);
</script>

<input
	class:fortomorrow={daysleft == 0}
	class:shouldbealreadydone={daysleft < 0}
	class:done={task.done}
	type="date"
	bind:value={due}
/>

<style>
	input {
		height: 3rem;
	}

	@media screen and (max-width: 50rem) {
		input {
			width: 4.5rem;
		}
	}

	input.fortomorrow {
		color: #a50;
	}

	input.shouldbealreadydone {
		color: #a00;
	}

	input.done {
		color: #555;
	}
</style>
