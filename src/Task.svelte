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
	$: daysleft = Math.floor(
		((new Date(due).getTime() - Date.now()) / 3600_000 +
			$Settings.general_daterefreshtime) /
			24
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
		//gems
		if ($Settings.gem_enable) {
			if (!task.done) {
				addGems(gemcount);
				updateValue("gems", gemcount);
			} else {
				addGems(-gemcount);
				updateValue("gems", undefined);
			}
		}

		updateValue("done", task.done ? false : Date.now());
	}

	// gems
	let gemcount;
	$: {
		if (task.gems !== undefined) gemcount = task.gems;
		else if (!due) gemcount = $Settings.gem_gems_notime;
		else if (daysleft == 0) gemcount = $Settings.gem_gems_ontime;
		else if (daysleft > 0) gemcount = $Settings.gem_gems_beforetime;
		else if (daysleft < 0) gemcount = $Settings.gem_gems_aftertime;
	}
</script>

<div
	class:fortomorrow={daysleft == 0}
	class:shouldbealreadydone={daysleft < 0}
	class:done
	id="task"
>
	<input type="button" id="done" on:click={handleDone} />

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

	{#if $Settings.gem_enable}
		<div id="gemcounter" class:gem-undefined={task.gems === undefined}>
			<i class="fa-regular fa-gem" />
			<div>{gemcount}</div>
		</div>
	{/if}

	<input type="date" bind:value={due} />

	<button type="button" id="delete" on:dblclick={deleteThisTask}>
		<i class="fa-trash-can fa-solid" />
	</button>
</div>

<style>
	#task {
		display: flex;
		/* padding: 1em 1.5em; */
		border-top: 1px solid lightgray;
		width: 100dvw;
		align-items: center;
	}

	#task > * {
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
		border: 2px solid #ddd;
		height: 1.5rem;
		width: 1.5rem;
		background-color: #eee;
	}
	#done:hover {
		background-color: #ccc;
	}
	.done #done {
		background-color: #19f;
	}
	.done #done:hover {
		background-color: #2af;
	}

	#gemcounter {
		background-color: lightblue;
		border-radius: 1rem;
		height: 2.5rem;
		width: 2.5rem;
		margin: 0 1rem;
		text-align: center;
		vertical-align: middle;
	}

	input[type="date"] {
		height: 3rem;
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
