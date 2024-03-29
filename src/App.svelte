<script>
	import Task from "./Task.svelte";
	import NewTaskButton from "./NewTaskButton.svelte";

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

		<h4>Done tasks:</h4>
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
