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
	import Task from "./Task.svelte";
	import NewTaskButton from "./NewTaskButton.svelte";
	import Literal from "./Literal.svelte";

	import Tasks from "./Tasks.js";
	import Settings from "./Settings.js";

	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";

	function superComplexCustomPolishTaskSorter(datestr) {
		if (!datestr) return 1.5;
		let days = Math.floor(
			((new Date(datestr).getTime() - Date.now()) / 3600_000 +
				$Settings.general_daterefreshtime) /
				24
		);
		if (days == 0) return Number.NEGATIVE_INFINITY;
		return days;
	}
</script>

<main>
	<ul>
		{#each $Tasks
			.filter(i => !i.done)
			.sort((a, b) => superComplexCustomPolishTaskSorter(a.due) - superComplexCustomPolishTaskSorter(b.due)) as task (task.id)}
			<li transition:scale animate:flip>
				<Task {task} />
			</li>
		{/each}
		<NewTaskButton />

		<h4><Literal>Done tasks:</Literal></h4>
		{#each $Tasks
			.filter(i => i.done)
			.sort((a, b) => b.done - a.done) as task (task.id)}
			<li transition:scale animate:flip>
				<Task {task} />
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		height: calc(100dvh - 2.5rem);
		display: flex;
		flex-direction: column;
	}

	ul {
		padding-left: 0;
		flex-grow: 1;
		margin: 0;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		overflow-y: scroll;
	}

	li {
		display: block;
	}
</style>
