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

	import { deleteTask } from "./util.js";

	import DoneButton from "./DoneButton.svelte";
	import TaskName from "./TaskName.svelte";
	import GemCounter from "./GemCounter.svelte";
	import DateInput from "./DateInput.svelte";
	import DeleteButton from "./DeleteButton.svelte";

	export let task;

	let daysleft;
	$: daysleft = Math.floor(
		((new Date(task.due).getTime() - Date.now()) / 3600_000 +
			$Settings.general_daterefreshtime) /
			24
	);

	if (task.done && Date.now() - task.done > 7 * 24 * 3600_000)
		deleteTask(task);

	// gems
	let gemcount;
	$: {
		if (task.gems !== undefined) gemcount = task.gems;
		else if (!task.due) gemcount = $Settings.gem_gems_notime;
		else if (daysleft == 0) gemcount = $Settings.gem_gems_ontime;
		else if (daysleft > 0) gemcount = $Settings.gem_gems_beforetime;
		else if (daysleft < 0) gemcount = $Settings.gem_gems_aftertime;
	}
</script>

<div id="task">
	<DoneButton {task} {gemcount} />

	<TaskName {task} />

	<div id="buttons">
		{#if $Settings.gem_enable && $Settings.gem_show_badge}
			<GemCounter {gemcount} />
		{/if}

		<DateInput {task} {daysleft} />

		<DeleteButton {task} />
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

	#buttons {
		display: flex;
		flex-grow: 0;
		flex-shrink: 0;
		flex-direction: row;
		align-items: center;
		justify-content: end;
		flex-wrap: wrap;
	}
</style>
