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
	import Tasks from "./Tasks.js";
	import Settings from "./Settings.js";

	import { addGems } from "./gems.js";

	export let task;

	/**
	 * @type {HTMLDivElement}
	 */
	let taskNode;

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

	$: if (taskNode) taskNode.style.setProperty("--gem-count", gemcount);
	$: if (taskNode)
		taskNode.style.setProperty(
			"--gem-count-max",
			Math.max(
				$Settings.gem_gems_aftertime,
				$Settings.gem_gems_ontime,
				$Settings.gem_gems_beforetime,
				$Settings.gem_gems_notime
			).toString()
		);
</script>

<div
	class:fortomorrow={daysleft == 0}
	class:shouldbealreadydone={daysleft < 0}
	class:done
	id="task"
	bind:this={taskNode}
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

	<div id="buttons">
		<input type="date" bind:value={due} />

		{#if $Settings.gem_enable && $Settings.gem_show_badge}
			<div
				id="gemcounter"
				class:desktoponly={$Settings.gem_badge_desktoponly}
			>
				<i class="fa-regular fa-gem" />
				<div>{gemcount}</div>
			</div>
		{/if}

		<button type="button" id="delete" on:dblclick={deleteThisTask}>
			<i class="fa-trash-can fa-solid" />
		</button>
	</div>
</div>

<style>
	#task {
		display: flex;
		/* padding: 1em 1.5em; */
		border-top: 1px solid lightgray;
		width: 100dvw;
		align-items: center;
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
		flex-shrink: 0;
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

	#buttons {
		display: flex;
		flex-grow: 0;
		flex-shrink: 0;
		flex-direction: row;
		align-items: center;
		justify-content: end;
		flex-wrap: wrap;
	}

	#gemcounter {
		background-color: color-mix(
			in oklab,
			lightgray
				calc(100% - 100% * (var(--gem-count) / var(--gem-count-max))),
			#19f calc(100% * (var(--gem-count) / var(--gem-count-max)))
		);
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
	@media screen and (max-width: 50rem) {
		input[type="date"] {
			width: 5rem;
		}
		.desktoponly {
			display: none;
		}
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
