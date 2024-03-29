<script>
	import Tasks from "./Tasks.js";
	import Settings from "./Settings.js";

	import { addGems } from "./gems.js";

	export let task;

	let done = task.done;
	let name = task.name;
	let due = task.due;

	$: updateValue("name", name);
	$: updateValue("due", due);

	let daysleft;
	$: daysleft = Math.round(
		(new Date(due).getTime() - Date.now()) / 24 / 3600_000
	);

	function updateValue(key, value) {
		if (task[key] === value) return;
		Tasks.update(data => {
			return [
				...data.filter(i => i.id != task.id),
				{ ...task, [key]: value },
			];
		});
	}

	function deleteThisTask() {
		Tasks.update(data => data.filter(i => i.id != task.id));
	}

	if (task.done && Date.now() - task.done > 7 * 24 * 3600_000)
		deleteThisTask();

	function handleDone() {
		updateValue("done", done ? Date.now() : false);

		//gems
		if ($Settings.gem_enable) {
			if (done) {
				let gemcount = 10;
				if (!due) gemcount = $Settings.gem_gems_notime;
				else if (daysleft == 0) gemcount = $Settings.gem_gems_ontime;
				else if (daysleft > 0) gemcount = $Settings.gem_gems_beforetime;
				else if (daysleft < 0) gemcount = $Settings.gem_gems_aftertime;
				addGems(gemcount);
				updateValue("gems", gemcount);
			} else {
				addGems(-(task.gems || $Settings.gem_gems_ontime));
			}
		}
	}
</script>

<div
	class:fortomorrow={daysleft == 0}
	class:shouldbealreadydone={daysleft < 0}
	class:done
>
	<input
		type="checkbox"
		id="done"
		bind:checked={done}
		on:change={handleDone}
	/>

	<p
		contenteditable
		bind:innerText={name}
		on:keypress={event => {
			if (event.key == "Enter") {
				event.preventDefault();
				event.target.blur(); // works
			}
		}}
	/>

	<input type="date" bind:value={due} />

	<button type="button" id="delete" on:dblclick={deleteThisTask}>
		<i class="fa-trash-can fa-solid" />
	</button>
</div>

<style>
	div {
		display: flex;
		/* padding: 1em 1.5em; */
		border-top: 1px solid lightgray;
		width: 100dvw;
	}

	div > * {
		flex-shrink: 0;
	}

	p {
		margin: 0;
		padding: 1.25em 0;
		flex-grow: 1;
		outline: none;
		word-break: break-word;
		flex-shrink: 1;
	}

	#done {
		margin: 1rem 1.5rem;
		border: 2px solid lightgray;
		height: 1.5rem;
		width: 1.5rem;
	}

	button {
		width: 3rem;
		height: 3rem;
		margin: 0.25rem;
		background-color: transparent;
		padding: none;
		border: none;
		border-radius: 0.5rem;
	}
	button:hover {
		background-color: #0002;
	}
	button i {
		font-size: 1.5rem;
	}

	.fortomorrow input[type="date"] {
		color: #a50;
	}

	.shouldbealreadydone input[type="date"] {
		color: #a00;
	}

	.done input[type="date"] {
		color: #555;
	}

	.done > * {
		color: #555;
	}
</style>
